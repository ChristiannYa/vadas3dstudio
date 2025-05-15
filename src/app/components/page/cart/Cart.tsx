"use client";

import { useAppDispatch, useAppSelector, useCartTab } from "@/hooks/redux";
import {
  selectCartItems,
  clearCart,
  selectCartTabStatus,
  toggleOrderStatus,
} from "@/lib/features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const statusTab = useAppSelector(selectCartTabStatus);
  const { handleCartTabStatus } = useCartTab();

  return (
    <div
      className={`bg-black-fg/10 dark:bg-white/5 backdrop-blur-xl transform transition-transform duration-500 w-80 md:w-96 h-full p-2 grid grid-rows-[60px_1fr_40px] fixed top-0 right-0 ${
        statusTab === false ? "translate-x-full" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-dream-avenue font-[500] text-3xl text-center">
          Your Cart
        </h2>
      </div>

      <div>
        {cartItems.length === 0 ? (
          <p className="font-poppins text-center">Empty</p>
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
          onClick={() => {
            if (cartItems.length < 1) {
              return;
            }
            dispatch(toggleOrderStatus());
            handleCartTabStatus();
          }}
          className="bg-white hover:bg-neutral-100/95 dark:bg-white-fg dark:hover:bg-neutral-300 text-black-fg cursor-pointer w-full py-1"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
