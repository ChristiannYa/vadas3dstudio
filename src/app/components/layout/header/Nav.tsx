"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginForm } from "@/app/auth/component";

const LiDivisor = () => {
  return <span className="border-fg/50 border-l h-6 md:h-8"></span>;
};

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="a flex justify-center items-center">
        <Link
          href="/"
          className={`nav__item ${pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <LiDivisor />
        <Link
          href="/shop"
          className={`nav__item ${pathname === "/shop" ? "active" : ""}`}
        >
          <p>Shop</p>
        </Link>
        <LiDivisor />
        <LoginForm />
      </ul>
    </nav>
  );
}
