import React from "react";
import { LoginForm } from "@/app/auth/component";
import HomeButton from "@/app/components/navigation/HomeButton";

const LiDivisor = () => {
  return <span className="border-fg/50 border-l h-6 md:h-8"></span>;
};

export function MobileNavbar() {
  return (
    <nav className="md:hidden">
      <ul className="a flex justify-center items-center">
        <HomeButton variant="header" />
        <LiDivisor />
        <LoginForm />
      </ul>
    </nav>
  );
}

export function DesktopNavBar() {
  return (
    <nav className="hidden md:block">
      <ul className="a flex justify-center items-center">
        <HomeButton variant="header" />
        <LiDivisor />
        <LoginForm />
      </ul>
    </nav>
  );
}
