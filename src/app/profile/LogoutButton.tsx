"use client";

import { logout } from "@/app/auth/log-in/actions";
import { useState } from "react";

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const result = await logout();

      if (result.success) {
        window.location.href = "/";
      } else {
        setError(result.error || "Logout Failed");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout failed: ", error);

      setError("An unexpected error occurred.");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm rounded-sm px-2 py-1"
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default LogoutButton;
