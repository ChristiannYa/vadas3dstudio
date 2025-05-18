// Uncomment the code when ready to enable checkout
/*
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAuthentication } from "@/utils/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  try {
    const { isAuthenticated } = await checkAuthentication();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "You must be logged in to view order details" },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // First, retrieve the session from Stripe to get the payment intent
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.payment_intent) {
      return NextResponse.json(
        { error: "No payment intent found for this session" },
        { status: 404 }
      );
    }

    // The payment_intent can be a string or object, handle both cases
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent.id;

    // Find the order with the matching payment_intent
    const order = await prisma.order.findFirst({
      where: { payment_intent: paymentIntentId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found for this session" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error retrieving order by session ID:", error);
    return NextResponse.json(
      { error: "Error retrieving order details" },
      { status: 500 }
    );
  }
}
*/

// Remove when ready to enable checkout
import { NextResponse } from "next/server";
import { checkAuthentication } from "@/utils/auth";

/**
 * Temporary placeholder for order retrieval by session
 * Returns a message that order retrieval is not available
 */
export async function GET() {
  try {
    // Check if user is authenticated
    const { isAuthenticated, userEmail } = await checkAuthentication();
    if (!isAuthenticated || !userEmail) {
      return NextResponse.json(
        { error: "You must be logged in to view orders" },
        { status: 401 }
      );
    }

    // Return a message that order retrieval is not available
    return NextResponse.json(
      {
        error:
          "Order retrieval is temporarily unavailable. Please contact vadas3dstudio@gmail.com for order inquiries.",
      },
      { status: 503 } // Service Unavailable
    );
  } catch (error) {
    const err = error as Error;
    console.error("Error retrieving order:", err);
    return NextResponse.json(
      { error: "Failed to retrieve order" },
      { status: 500 }
    );
  }
}
