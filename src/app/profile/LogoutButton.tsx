import { logout } from "@/app/auth/log-in/actions";

const LogoutButton = () => {
  return (
    <button
      onClick={() => logout()}
      className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm rounded-sm px-2 py-1"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
