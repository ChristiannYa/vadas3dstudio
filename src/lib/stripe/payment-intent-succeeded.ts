import Stripe from "stripe";

export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<{ success: boolean }> {
  // TODO: Implement logic to handle payment intent succeeded event
  console.log(`Payment intent succeeded: ${paymentIntent.id}`);

  return { success: true };
}
