import React from "react";
import { Poppins, Raleway } from "next/font/google";
import {
  MobileNavbar,
  DesktopNavBar,
} from "@/app/components/layout/header/NavigationElements";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header>
      <div className="max-md:relative container-1600 py-8 flex justify-center md:justify-between items-start md:items-center">
        <div>
          <p
            className={`${poppins.className} font-[400] text-3xl md:text-4xl uppercase`}
          >
            vadastudio
          </p>
          <MobileNavbar />
        </div>
        <DesktopNavBar />
        <div
          className={`${raleway.className} border border-fg text-xs md:text-sm uppercase dark:text-fg rounded-full w-fit py-0.5 md:py-1.5 px-2 md:px-4 absolute md:static max-md:top-4 max-md:right-0`}
        >
          Store
        </div>
      </div>
    </header>
  );
}
