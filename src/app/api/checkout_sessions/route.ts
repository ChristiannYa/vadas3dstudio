import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { pricingGuideList } from "@/lib/constants/pricing";
import { CartItem, StripeCheckoutMetadata } from "@/app/definitions";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { authConstants } from "@/lib/constants/auth";
import prisma from "@/lib/prisma";

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

    // Check for authenticated user using both methods
    let userEmail: string | null = null;

    // First try custom session
    const cookieStore = await cookies();
    const jwtSessionCookie = cookieStore.get(
      authConstants.SESSION_COOKIE_NAME
    )?.value;

    if (jwtSessionCookie) {
      try {
        const session = await decrypt(jwtSessionCookie);
        if (session?.userId) {
          // Get user from custom session
          const user = await prisma.user.findUnique({
            where: { id: session.userId },
          });

          if (user) {
            userEmail = user.email;
          }
        }
      } catch (error) {
        console.error("Error with custom session:", error);
      }
    }

    // If custom session failed, try NextAuth
    if (!userEmail) {
      const session = await auth();
      if (session?.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          userEmail = user.email;
        }
      }
    }

    // If no user found through either method, return unauthorized
    if (!userEmail) {
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
          },
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    // Only include essential information: id, quantity, price, title
    const minimalCartItems = items.map((item: CartItem) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      title: item.title,
    }));

    const metadataValues: StripeCheckoutMetadata = {
      userId: userEmail,
      cartItems: JSON.stringify(minimalCartItems),
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
      customer_email: userEmail,
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
