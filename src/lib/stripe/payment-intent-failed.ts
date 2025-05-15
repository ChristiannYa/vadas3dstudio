import Stripe from "stripe";

export async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
): Promise<{ success: boolean }> {
  // TODO: Implement logic to handle payment intent failed event
  console.log(`Payment intent failed: ${paymentIntent.id}`);

  return { success: true };
}
