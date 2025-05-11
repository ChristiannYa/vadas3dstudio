"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserData } from "@/app/definitions";
import { logout as customLogout } from "@/app/auth/log-in/actions";

export function useUser() {
  // NextAuth session
  const { data: nextAuthSession, status: nextAuthStatus } = useSession();

  // Custom session data
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If NextAuth has a session, use that data
    if (nextAuthStatus === "authenticated" && nextAuthSession?.user) {
      const user = nextAuthSession.user;
      setUserData({
        isLoggedIn: true,
        user: {
          id: user.id || "",
          name: user.name?.split(" ")[0] || "",
          last_name: user.name?.split(" ").slice(1).join(" ") || "",
          email: user.email || "",
        },
        authType: "nextauth",
      });
      setLoading(false);
      return;
    }

    // If NextAuth is not loading, check for custom session via API
    if (nextAuthStatus !== "loading") {
      const fetchUser = async () => {
        try {
          const response = await fetch("/api/user");
          if (!response.ok) throw new Error("Failed to fetch user data");
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          console.error("Error fetching user:", err);
          setError(
            err instanceof Error
              ? err.message
              : "An error occurred while fetching user data"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [nextAuthStatus, nextAuthSession]);

  return {
    user: userData,
    loading: nextAuthStatus === "loading" || loading,
    error,
  };
}

export function useLogOut() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logOut = useCallback(async (redirectPath: string = "/") => {
    setIsLoggingOut(true);
    setError(null);

    try {
      // Handle custom session logout
      const customLogoutPromise = customLogout();

      // Handle NextAuth session logout
      const nextAuthLogoutPromise = signOut({ redirect: false });

      // Wait for both logout operations to complete
      await Promise.all([customLogoutPromise, nextAuthLogoutPromise]);

      // Redirect to specified path
      window.location.href = redirectPath;
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Logout failed:", err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  return { logOut, isLoggingOut, error };
}
