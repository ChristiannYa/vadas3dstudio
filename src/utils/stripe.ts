import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Stripe, loadStripe } from "@stripe/stripe-js";

/**
 * Loads Stripe.js using the singleton pattern.
 * This ensures that the Stripe instance is loaded only once,
 * even if the function is called multiple times.
 *
 * @returns Stripe instance
 */
let stripePromise: Promise<Stripe | null>;
export default function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

/**
 * Creates an order with retry mechanism in case of database connectivity issues
 * @param data Order creation data
 * @param maxRetries Maximum number of retry attempts
 * @returns Created order or undefined if all retries fail
 */
export async function createOrderWithRetry(
  data: Prisma.OrderCreateArgs,
  maxRetries = 3
) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await prisma.order.create(data);
    } catch (error) {
      retries++;
      if (retries >= maxRetries) throw error;

      // Exponential backoff: wait longer between each retry
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retries))
      );
      console.log(
        `Retrying order creation (attempt ${retries}/${maxRetries})...`
      );
    }
  }
}
