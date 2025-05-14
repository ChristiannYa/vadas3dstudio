"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "@/app/components/layout/header/Nav";

export default function Header() {
  return (
    <header className="py-6 lg:py-8">
      <div className="container-1600">
        <div className="flex sm:justify-between items-center max-md:flex-col gap-x-8 gap-y-1">
          <p
            className={`font-poppins font-[400] text-accent-1 dark:text-white-fg text-3xl md:text-4xl uppercase`}
          >
            Vadastudio
          </p>
          <div className="flex items-center max-md:flex-col gap-y-2.5 gap-x-3">
            <Nav />
            <div className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="bg-accent-1 rounded-full p-2"
              />
              <span className="bg-white-fg font-poppins text-black-fg text-sm rounded-full w-[20px] h-[20px] flex items-center justify-center absolute -top-1.5 -right-1.5">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
