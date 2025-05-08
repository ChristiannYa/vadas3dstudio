"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/definitions";

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
