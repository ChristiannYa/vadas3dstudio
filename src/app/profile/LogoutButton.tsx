"use client";

import { useLogOut } from "@/hooks/auth";

const LogoutButton = () => {
  const { logOut, isLoggingOut, error } = useLogOut();

  return (
    <>
      <button
        onClick={() => logOut()}
        disabled={isLoggingOut}
        className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm rounded-sm w-fit h-fit px-2 py-1"
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default LogoutButton;
