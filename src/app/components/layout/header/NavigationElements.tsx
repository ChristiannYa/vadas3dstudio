import React from "react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400"],
  subsets: ["latin"],
});

const LiDivisor = () => {
  return <span className="border-fg/50 border-l h-7 md:h-10"></span>;
};

export function MobileNavbar() {
  return (
    <nav className={`${raleway.className} md:hidden`}>
      <ul className="flex justify-center items-center gap-3">
        <li>Home</li>
        <LiDivisor />
        <li>Login</li>
      </ul>
    </nav>
  );
}

export function DesktopNavBar() {
  return (
    <nav className={`${raleway.className} hidden md:block`}>
      <ul className="flex justify-center items-center gap-3">
        <li>Home</li>
        <LiDivisor />
        <li>Login</li>
      </ul>
    </nav>
  );
}
