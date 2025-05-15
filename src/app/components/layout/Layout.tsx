"use client";

import { useAppSelector } from "@/hooks/redux";
import { selectCartTabStatus } from "@/lib/features/cart/cartSlice";
import Header from "./header/component";
import Footer from "./footer/component";
import Cart from "../page/cart/Cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cartTabStatus = useAppSelector(selectCartTabStatus);

  return (
    <>
      <div
        className={`h-fit transition-all duration-500 ${
          cartTabStatus
            ? "-translate-x-64 blur-xs no-doc-scroll pointer-events-none"
            : "blur-none"
        }`}
      >
        <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="h-full">{children}</main>
          <Footer />
        </div>
      </div>
      <Cart />
    </>
  );
}
