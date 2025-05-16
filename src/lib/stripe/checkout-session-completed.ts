import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { CartItem, StripeCheckoutMetadata } from "@/app/definitions";
import { createOrderWithRetry } from "@/utils/stripe";

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
  console.log(`Looking for user with email: ${customerEmail}`);
  let user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!user) {
    console.error(
      `⚠️ USER NOT FOUND: Email used in checkout (${customerEmail}) does not match any user in the database`
    );

    // Try to find the user by the userId in metadata
    if (metadata.userId) {
      console.log(`Trying to find user by metadata userId: ${metadata.userId}`);
      user = await prisma.user.findUnique({
        where: { email: metadata.userId },
      });

      if (user) {
        console.log(
          `Found user by metadata userId: ${user.id} (${user.email})`
        );
      } else {
        console.error(
          `User not found by metadata userId either: ${metadata.userId}`
        );
        throw new Error(`User not found for email: ${customerEmail}`);
      }
    } else {
      throw new Error(`User not found for email: ${customerEmail}`);
    }
  }

  console.log(`Found user: ${user.id} (${user.email})`);

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
      console.log(
        `Order already exists for payment intent: ${session.payment_intent}`
      );
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

    console.log(`Order created: ${order?.id} for user: ${user.id}`);

    // 2. Send a confirmation email to the customer
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/send-order-emails`,
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
