import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { pricingGuideList } from "@/lib/constants/pricing";
import { CartItem, StripeCheckoutMetadata } from "@/app/definitions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Creates a checkout session and return the session ID
 * which is used to initiate the redirection to Stripe checkout
 * @returns {string} session ID
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Get cart items from request
    const { items } = await request.json();

    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to checkout" },
        { status: 401 }
      );
    }

    // Create line items for Stripe checkout
    const lineItems = items.map((item: CartItem) => {
      const product = pricingGuideList.find(
        (product) => product.id === item.id
      );
      if (!product) {
        throw new Error(`Product not found: ${item.id}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    const metadataValues: StripeCheckoutMetadata = {
      userId: session.user.email,
      cartItems: JSON.stringify(items),
    };

    // Create Stripe checkout session
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/checkout/canceled`,
      metadata: metadataValues,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    // sessionId is used to redirect the user to Stripe checkout
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    const err = error as Error;
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred during checkout" },
      { status: 500 }
    );
  }
}
