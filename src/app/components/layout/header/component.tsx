"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "@/app/components/layout/header/Nav";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-6 lg:py-8">
      <div className="container-1600">
        <div className="flex sm:justify-between items-center max-md:flex-col gap-x-8 gap-y-1">
          <p
            className={`font-poppins font-[400] text-accent-1 dark:text-white-fg text-3xl md:text-4xl uppercase`}
          >
            Vadastudio
          </p>
          <div className="flex items-center gap-x-4 max-md:flex-col gap-y-2.5">
            <Nav />
            <Link
              href="/store"
              className={`a bg-accent-1 rounded-full w-fit py-0.5 md:py-1 px-2 md:px-4 ${
                pathname === "/store"
                  ? "text-white bg-black/50 dark:bg-white/50"
                  : ""
              }`}
            >
              Store
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
