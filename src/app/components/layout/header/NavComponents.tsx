import React from "react";

const LiDivisor = () => {
  return <span className="border-fg/50 border-l h-6 md:h-8"></span>;
};

export function MobileNavbar() {
  return (
    <nav className="md:hidden">
      <ul className="a flex justify-center items-center">
        <li>Home</li>
        <LiDivisor />
        <li>Login</li>
      </ul>
    </nav>
  );
}

export function DesktopNavBar() {
  return (
    <nav className="hidden md:block">
      <ul className="a flex justify-center items-center">
        <li>Home</li>
        <LiDivisor />
        <li>Login</li>
      </ul>
    </nav>
  );
}
