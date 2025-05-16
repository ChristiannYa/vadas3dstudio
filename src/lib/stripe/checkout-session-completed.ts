import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { CartItem, StripeCheckoutMetadata } from "@/app/definitions";
import { createOrderWithRetry } from "@/utils/stripe";

/**
 * Handles the checkout.session.completed webhook event from Stripe.
 *
 * User lookup strategy:
 * 1. First attempts to find a user by the email provided during
 *    checkout (session.customer_deatils.email)
 * 2. If no user is found with that email, falls back to using the
 *    authenticated user's email stored in the session metadata
 *    (metadata.userId)
 *
 * This two-step approach ensures orders are correctly associated with
 * users even if they enter a different email address during the Stripe
 * checkout process.
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const metadata = session.metadata as unknown as StripeCheckoutMetadata;
  const customerEmail = session.customer_details?.email;

  if (!customerEmail) {
    console.error("No customer email found in session");
    throw new Error("No customer email found in session");
  }

  if (!session.amount_total) {
    console.error("No amount total found in session");
    throw new Error("No amount total found in session");
  }

  if (!session.payment_intent) {
    console.error("No payment intent found in session");
    throw new Error("No payment intent found in session");
  }

  if (!metadata.cartItems) {
    console.error("No cart items found in session metadata");
    throw new Error("No cart items found in session metadata");
  }

  // Find the user by email
  let user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!user) {
    /*
      - Fallback: Try to find user by the authenticated user's email stored 
        in metadata
      - This handles cases where users enter a different email during checkout
    */
    if (metadata.userId) {
      user = await prisma.user.findUnique({
        where: { email: metadata.userId },
      });

      if (!user) {
        console.error(`User not found for email: ${customerEmail}`);
        throw new Error(`User not found for email: ${customerEmail}`);
      }
    } else {
      console.error(`User not found for email: ${customerEmail}`);
      throw new Error(`User not found for email: ${customerEmail}`);
    }
  }

  try {
    let cartItems: CartItem[] = [];

    try {
      cartItems = metadata.cartItems ? JSON.parse(metadata.cartItems) : [];
    } catch (error) {
      console.error(`Failed to parse cart items: ${error}`);
      throw new Error(`Failed to parse cart items: ${error}`);
    }

    // Check if order already exists to ensure idepontency
    const existingOrder = await prisma.order.findUnique({
      where: { payment_intent: session.payment_intent as string },
    });

    if (existingOrder) {
      return { success: true, userId: user.id, orderId: existingOrder.id };
    }

    // 1. Create an order record in the database
    const order = await createOrderWithRetry({
      data: {
        userId: user.id,
        total: session.amount_total / 100,
        payment_intent: session.payment_intent as string,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        },
        created_at: new Date(),
      },
      include: {
        orderItems: true,
      },
    });

    // 2. Send a confirmation email to the customer
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-order-emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: order?.id }),
        }
      );

      if (!response.ok) {
        console.error("Failed to send order emails:", await response.text());
      } else {
        console.log("Order emails sent successfully");
      }
    } catch (error) {
      console.error("Error sending order emails:", error);
      // Don't throw here - we don't want to fail the order creation if email sending fails
    }

    return { success: true, userId: user?.id, orderId: order?.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(`Error creating order: ${error}`);
  }
}
