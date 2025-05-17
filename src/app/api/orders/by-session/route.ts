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
