"use client";

import { useUser } from "@/hooks/auth";
import { useOrders } from "@/hooks/user";
import { ProfileLoaderProps } from "../definitions";

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
      <div className="p-4 flex justify-center items-center">
        <aside className="error-popup w-[300px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-red-500 text-sm font-dm-sans">
              {userDataError ||
                userOrdersError ||
                "An error ocurred while fetching user data. Please try again."}
            </h2>
          </div>
        </aside>
      </div>
    );
  }

  return <>{children}</>;
}
