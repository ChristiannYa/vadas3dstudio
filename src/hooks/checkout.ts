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
        // User friendly error message
        setError("Unable to create checkout session. Please try again.");
        console.error("Error creating checkout session:", data.error);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      const { error: redirectError } = await stripe!.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (redirectError) {
        // User friendly error message
        setError("Unable to redirect to payment page. Please try again.");
        console.error("Redirect error:", redirectError.message);
      }
    } catch (err) {
      // User friendly error message
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
