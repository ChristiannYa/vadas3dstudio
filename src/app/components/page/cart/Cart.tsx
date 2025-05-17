"use client";

import { useEffect, useRef } from "react";
import { useCheckout } from "@/hooks/checkout";
import { useAppDispatch, useAppSelector, useCartTab } from "@/hooks/redux";
import {
  selectCartItems,
  clearCart,
  selectCartTabStatus,
} from "@/lib/features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { handleCheckout, isLoading, error, clearError } = useCheckout();

  const dispatch = useAppDispatch();
  const cartRef = useRef<HTMLDivElement | null>(null);
  const cartItems = useAppSelector(selectCartItems);
  const statusTab = useAppSelector(selectCartTabStatus);
  const { handleCartTabStatus } = useCartTab();
  const noCartItems = cartItems.length === 0;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusTab &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        handleCartTabStatus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCartTabStatus, statusTab]);

  return (
    <>
      <div
        ref={cartRef}
        className={`bg-black-fg/10 dark:bg-white/5 backdrop-blur-xl transform transition-transform duration-500 w-[20.625rem] md:w-[25rem] h-full p-2 grid grid-rows-[60px_1fr_40px] fixed top-0 right-0 ${
          statusTab === false ? "translate-x-full" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-dream-avenue font-[500] text-3xl text-center">
            Your Bag
          </h2>
        </div>

        <div>
          {noCartItems ? (
            <p className="font-poppins font-[300] text-center">Empty</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <hr className="my-2 text-white/20" />
              <div className="px-3">
                <CartTotal />
              </div>
              <div className="mr-3 flex justify-end">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="bg-red-500 hover:bg-red-500/80 dark:hover:bg-red-600 text-white-fg dark:hover:text-red-100 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-[0.6rem]" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="font-dm-sans w-full flex gap-x-2">
          <button
            onClick={handleCartTabStatus}
            className="bg-neutral-900/95 hover:bg-neutral-900/90 dark:bg-neutral-900 dark:hover:bg-[#1d1d1d] text-white-fg cursor-pointer w-full py-1"
          >
            Close
          </button>
          <button
            onClick={() => handleCheckout(cartItems)}
            disabled={isLoading || noCartItems}
            className={`${
              isLoading || noCartItems
                ? "bg-neutral-300 dark:bg-neutral-600 cursor-default"
                : "bg-white hover:bg-neutral-100/95 dark:bg-white-fg dark:hover:bg-neutral-300 cursor-pointer"
            } text-black-fg w-full py-1`}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
      {error && (
        <aside className="error-popup w-[300px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 shadow-md fixed top-5 left-1/2 -translate-x-1/2 z-10 animate-slide-down">
          <p className="text-red-500 text-sm font-dm-sans px-4">{error}</p>
          <button
            onClick={clearError}
            className="bg-red-100 hover:bg-red-300 text-red-500 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center absolute top-2 right-2"
          >
            <FontAwesomeIcon icon={faXmark} width={10} height={10} />
          </button>
        </aside>
      )}
    </>
  );
};

export default Cart;
