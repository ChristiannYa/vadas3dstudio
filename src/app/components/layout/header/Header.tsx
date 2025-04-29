import React from "react";
import {
  MobileNavbar,
  DesktopNavBar,
} from "@/app/components/layout/header/NavComponents";

export default function Header() {
  return (
    <header>
      <div className="max-md:relative container-1600 py-6 flex justify-center md:justify-between items-start md:items-center">
        <div>
          <p
            className={`font-poppins font-[400] text-3xl md:text-4xl uppercase`}
          >
            Vadastudio
          </p>
          <MobileNavbar />
        </div>
        <DesktopNavBar />
        <div
          className={`a dark:bg-custom-white dark:text-custom-black bg-custom-black text-custom-white rounded-full w-fit py-0.5 md:py-1.5 px-2 md:px-4 absolute md:static max-md:top-4 max-md:right-0`}
        >
          Store
        </div>
      </div>
    </header>
  );
}
