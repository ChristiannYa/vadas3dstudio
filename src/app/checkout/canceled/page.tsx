"use client";

import Link from "next/link";

export default function CheckoutCanceledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-black-fg/30 shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-yellow-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl font-dream-avenue mb-4">Order Canceled</h1>
        <p className="text-lg mb-6">Your checkout was canceled.</p>

        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          No charges were made. Your items are still in your cart if you&apos;d
          like to try again.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/shop"
            className="bg-accent-1 hover:bg-accent-1/90 text-white py-2 px-4 rounded transition"
          >
            Return to Shop
          </Link>

          <Link href="/" className="text-accent-1 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
