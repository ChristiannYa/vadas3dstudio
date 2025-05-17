"use client";

import { useLogOut } from "@/hooks/auth";

const LogoutButton = ({ className }: { className?: string }) => {
  const { logOut, isLoggingOut, error } = useLogOut();

  return (
    <>
      <button
        onClick={() => logOut()}
        disabled={isLoggingOut}
        className={`${className}`}
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default LogoutButton;
