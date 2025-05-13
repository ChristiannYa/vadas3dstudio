import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { UsePasswordToggleResult, UserData } from "@/app/definitions";
import { logout as customLogout } from "@/app/auth/log-in/actions";

export function useUser() {
  // NextAuth session
  const { status: nextAuthStatus } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch user data when NextAuth is not in loading state
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
  }, [nextAuthStatus]);

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

export function usePasswordToggle(): UsePasswordToggleResult {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault(); // Crucial to prevent focus loss on mobile

    // Store current selection
    const selectionStart = inputRef.current?.selectionStart;
    const selectionEnd = inputRef.current?.selectionEnd;

    // Toggle state
    setShowPassword(!showPassword);

    // Restore focus and selection after state update
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();

        // Only set selection range if we have valid positions
        if (
          typeof selectionStart === "number" &&
          typeof selectionEnd === "number"
        ) {
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }, 0);
  };

  return {
    inputRef,
    showPassword,
    togglePasswordVisibility,
  };
}
