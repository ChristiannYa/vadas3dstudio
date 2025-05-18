"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const email = searchParams.get("email");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error === "EmailExists") {
      setErrorMessage(
        `The email ${email} is already registered with a password. Please use your password to log in.`
      );
    } else if (error === "AccessDenied") {
      setErrorMessage(
        "Access denied. This email may already be registered with a different authentication method."
      );
    } else if (error) {
      setErrorMessage(`Authentication error: ${error}`);
    }
  }, [error, email]);

  return (
    <div className="p-4 flex justify-center items-center">
      <aside className="error-popup w-[350px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
        <div className="h-full flex flex-col items-center justify-center space-y-2">
          <p className="font-dm-sans text-red-500 text-lg">{errorMessage}</p>
          <Link
            href="/"
            className="bg-red-100 hover:bg-red-300 text-red-500 rounded-sm cursor-pointer px-1.5 py-0.5"
          >
            Home
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
