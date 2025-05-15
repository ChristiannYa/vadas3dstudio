import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

/**
 * Utility function to load Stripe.js using the singleton pattern.
 * This ensures that the Stripe instance is loaded only once,
 * even if the function is called multiple times.
 *
 * @returns Stripe instance
 */
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;
