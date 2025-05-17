"use client";

import React from "react";
import { useAppSelector, useCartTab } from "@/hooks/redux";
import { selectCartItemsLength } from "@/lib/features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "@/app/components/layout/header/Nav";

export default function Header() {
  const { handleCartTabStatus } = useCartTab();
  const cartItemsLength = useAppSelector(selectCartItemsLength);

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
            <button
              onClick={handleCartTabStatus}
              className="bg-black-fg dark:bg-white-fg rounded-full cursor-pointer w-8 h-8 flex justify-center items-center relative"
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                width={16}
                height={16}
                className="text-white-fg dark:text-black-fg"
              />
              <span className="bg-black-fg dark:bg-white-fg font-poppins text-white-fg dark:text-black-fg text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center absolute -top-1.5 -right-1.5">
                {cartItemsLength}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
