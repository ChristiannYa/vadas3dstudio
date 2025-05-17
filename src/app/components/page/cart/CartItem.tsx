"use client";

import { useAppDispatch } from "@/hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ItemProps } from "@/app/definitions";
import {
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "@/lib/features/cart/cartSlice";

const CartItem = ({ item }: ItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full p-2">
      <div className="bg-accent-1 dark:bg-accent-1-hover rounded-xs px-2 py-1 flex justify-between items-center max-sm:flex-col max-sm:items-start">
        <div className="font-dm-sans space-y-1">
          <div className="flex gap-x-1 items-center">
            <h3 className="font-[500] text-black-fg dark:text-gray-700">
              {item.title}
            </h3>
            <p className="font-fira-code text-sm text-black-fg/70 dark:text-gray-700/65">
              *{item.quantity}
            </p>
          </div>
          <p className="text-black/90 dark:text-gray-700 border-l-2 leading-tight w-fit pl-1">
            ${item.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-x-3 max-md:mt-1">
          <div className="bg-white-fg/15 rounded-full p-1 flex gap-x-2 items-center">
            <button
              className="bg-white/55 hover:bg-white/70 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center"
              onClick={() => dispatch(decrementQuantity(item.id))}
            >
              <FontAwesomeIcon
                icon={faMinus}
                className="text-black-fg/90 text-[0.6rem]"
              />
            </button>
            <button
              className="bg-white/55 hover:bg-white/70 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center"
              onClick={() => dispatch(incrementQuantity(item.id))}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-black-fg/90 text-[0.6rem]"
              />
            </button>
          </div>
          <button
            onClick={() => dispatch(removeItemFromCart(item.id))}
            className="bg-white/55 hover:bg-white/70 rounded-full cursor-pointer w-[22px] h-[22px] flex justify-center items-center"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="text-black-fg/80 text-[0.6rem]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
