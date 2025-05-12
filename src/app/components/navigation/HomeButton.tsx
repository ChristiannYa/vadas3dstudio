import Link from "next/link";
import { usePathname } from "next/navigation";

interface HomeButtonProps {
  className?: string;
  variant?: "header" | "profile";
}

const HomeButton = ({ className = "", variant }: HomeButtonProps) => {
  const pathname = usePathname();
  const baseClass = variant === "header" ? "nav__item" : "profile__home-btn";

  return (
    <Link
      href="/"
      className={`nav__item ${baseClass} ${className} ${
        pathname === "/" ? "active" : ""
      }`}
    >
      Home
    </Link>
  );
};

export default HomeButton;
