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
    throw new Error("No customer email found in session");
  }

  if (!session.amount_total) {
    throw new Error("No amount total found in session");
  }

  if (!session.payment_intent) {
    throw new Error("No payment intent found in session");
  }

  if (!metadata.cartItems) {
    throw new Error("No cart items found in session metadata");
  }

  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!user) {
    throw new Error(`User not found for email: ${customerEmail}`);
  }

  try {
    let cartItems: CartItem[] = [];
    try {
      cartItems = metadata.cartItems ? JSON.parse(metadata.cartItems) : [];
    } catch (error) {
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

    return { success: true, userId: user?.id, orderId: order?.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(`Error creating order: ${error}`);
  }

  // 2. Send a confirmation email to the customer
  // TODO: Implement email sending functionality

  // 3. Update any other relevant data
  // TODO: Update user data, inventory, etc.
}
