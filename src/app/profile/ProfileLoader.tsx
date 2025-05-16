"use client";

import { useUser } from "@/hooks/auth";
import { useOrders } from "@/hooks/user";
import { ReactNode } from "react";

interface ProfileLoaderProps {
  children: ReactNode;
}

export default function ProfileLoader({ children }: ProfileLoaderProps) {
  const {
    user: userData,
    loading: userDataIsLoading,
    error: userDataError,
  } = useUser();

  const { loading: userOrdersAreLoading, error: userOrdersError } = useOrders();

  if (userDataIsLoading || userOrdersAreLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-y-4">
          <span className="inline-block w-6.5 h-6.5 border-2 border-accent-1 border-t-amber-200 rounded-full animate-spin"></span>
          <p className="font-dm-sans">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (userDataError || !userData?.isLoggedIn || userOrdersError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-6 shadow-md max-w-md">
          <h2 className="text-red-600 dark:text-red-400 text-xl font-medium mb-2">
            {userDataError ||
              userOrdersError ||
              "Unable to authenticate. Please try logging in again."}
          </h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
