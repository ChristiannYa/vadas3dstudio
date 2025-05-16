"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux";
import { clearCart } from "@/lib/features/cart/cartSlice";

export default function CheckoutSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());

    // Get the session ID from the URL
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      // If no session ID is provided, redirect to home
      router.push("/");
      return;
    }

    // You could verify the session with your backend here
    // For now, we'll just simulate a successful order
    //  Todo: Add backend verification
    setIsLoading(false);

    // In a real implementation, you would fetch the order details
    // from your backend using the session ID
    setOrderNumber(Math.floor(Math.random() * 10000));
  }, [searchParams, router, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-dream-avenue mb-4">
            Processing your order...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-1 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-300/10 rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl font-dream-avenue mb-4">Thank You!</h1>
        <p className="text-lg mb-6">Your order has been received.</p>

        {orderNumber && (
          <p className="mb-6 font-medium">
            Order Number: <span className="text-accent-1">#{orderNumber}</span>
          </p>
        )}

        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          We&apos;ve sent a confirmation email with your order details.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/profile"
            className="bg-accent-1 hover:bg-accent-1/90 text-white py-2 px-4 rounded transition"
          >
            View Your Orders
          </Link>

          <Link href="/" className="text-accent-1 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
