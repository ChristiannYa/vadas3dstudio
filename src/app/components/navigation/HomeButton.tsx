import Link from "next/link";

interface HomeButtonProps {
  className?: string;
  variant?: "header" | "profile";
}

const HomeButton = ({ className = "", variant }: HomeButtonProps) => {
  const baseClass = variant === "header" ? "nav__item" : "profile__home-btn";

  return (
    <Link href="/" className={`nav__item ${baseClass} ${className}`}>
      Home
    </Link>
  );
};

export default HomeButton;
