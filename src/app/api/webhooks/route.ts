// Uncomment the code when ready to enable the webhook
/*
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Stripe } from "stripe";
import {
  handleCheckoutSessionCompleted,
  handlePaymentIntentSucceeded,
  handlePaymentIntentFailed,
} from "@/lib/stripe";
 */

/*
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// This is needed because Stripe needs the raw body to validate the webhook
export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle the event
  try {
    let result;

    switch (event.type) {
      case "checkout.session.completed":
        try {
          result = await handleCheckoutSessionCompleted(
            event.data.object as Stripe.Checkout.Session
          );
        } catch (error) {
          console.error(`Error handling checkout session completed: ${error}`);
          throw error;
        }
        break;

      case "payment_intent.succeeded":
        try {
          result = await handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent
          );
        } catch (error) {
          console.error("Error in handlePaymentIntentSucceeded:", error);
          throw error;
        }
        break;

      case "payment_intent.payment_failed":
        try {
          result = await handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent
          );
        } catch (error) {
          console.error("Error in handlePaymentIntentFailed:", error);
          throw error;
        }
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
        result = { success: true, unhandled: true };
    }

    return NextResponse.json({ received: true, result });
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook handler failed: ${error.message}`);

    return NextResponse.json(
      { error: `Webhook handler failed: ${error.message}` },
      { status: 500 }
    );
  }
}

// This disables the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
*/

// Remove when ready to enable webhooks
import { NextResponse } from "next/server";

/**
 * Temporary placeholder for webhook handler
 * Returns a message that webhooks are not being processed
 */
export async function POST() {
  return NextResponse.json({
    message: "Webhook processing is temporarily disabled.",
  });
}

// This disables the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
