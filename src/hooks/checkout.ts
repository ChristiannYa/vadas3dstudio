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
        setError(data.error);
        console.error("Error creating checkout session:", data.error);
        return;
      }

      try {
        const stripe = await getStripe();

        if (!stripe) {
          console.error("Stripe initialization failed");
          throw new Error("Failed to initialize Stripe");
        }

        const { error: redirectError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (redirectError) {
          console.error("Redirect error:", redirectError.message);
          setError("Unable to redirect to payment page. Please try again.");
        }
      } catch (stripeError) {
        console.error("Stripe initialization error:", stripeError);
        setError("Payment system unavailable. Please try again later.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Checkout error:", errorMessage);
      setError("An unexpected error occurred. Please try again later.");
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
