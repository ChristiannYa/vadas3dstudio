"use client";

import { useUser } from "@/hooks/auth";
import { ReactNode } from "react";

interface ProfileLoaderProps {
  children: ReactNode;
}

export default function ProfileLoader({ children }: ProfileLoaderProps) {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-y-4">
          <span className="inline-block w-7 h-7 border-2 border-accent-1 border-t-amber-200 rounded-full animate-spin"></span>
          <p className="font-dm-sans">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user?.isLoggedIn) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-6 shadow-md max-w-md">
          <h2 className="text-red-600 dark:text-red-400 text-xl font-medium mb-2">
            Error Loading Profile
          </h2>
          <p className="text-red-500 dark:text-red-300">
            {error || "Unable to authenticate. Please try logging in again."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
