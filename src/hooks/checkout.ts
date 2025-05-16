import { useState } from "react";
import getStripe from "@/utils/stripe";
import { CartItem } from "@/app/definitions";

/**
 * Hook that calls the API route to create a CheckoutSession
 * facilitating the redirect to Stripe.
 */
export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);

  const handleCheckout = async (items: CartItem[]) => {
    if (items.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.error) {
        setError("Unable to create checkout session. Please try again.");
        console.error("Error creating checkout session:", data.error);
        return;
      }

      try {
        console.log("Getting Stripe instance...");
        const stripe = await getStripe();

        if (!stripe) {
          throw new Error("Failed to initialize Stripe");
        }

        console.log("Redirecting to checkout with session ID:", data.sessionId);
        const { error: redirectError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (redirectError) {
          setError("Unable to redirect to payment page. Please try again.");
          console.error("Redirect error:", redirectError.message);
        }
      } catch (stripeError) {
        setError("Payment system unavailable. Please try again later.");
        console.error("Stripe initialization error:", stripeError);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Checkout error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleCheckout,
    clearError,
  };
}
