import { ShopItemProps } from "@/app/definitions";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  addItemToCart,
  removeItemFromCart,
  selectIsItemInCart,
} from "@/lib/features/cart/cartSlice";

export default function ShopItem({ item }: ShopItemProps) {
  const dispatch = useAppDispatch();

  const isItemInBag = useAppSelector((state) =>
    selectIsItemInCart(state, item.id)
  );

  const handleAddToBag = () => {
    if (!isItemInBag) {
      dispatch(addItemToCart(item));
      return;
    }

    dispatch(removeItemFromCart(item.id));
  };

  return (
    <div
      key={item.id}
      className="bg-neutral-50 dark:bg-[#090909] text-center md:text-start px-4 py-2 relative"
    >
      <h2 className="text-accent-1 text-2xl lg:text-3xl font-kanit font-[200]">
        {item.title}
      </h2>
      <p className="text-fg/90 font-dm-sans font-[300] text-base lg:text-lg text-preset-3">
        {item.description}
      </p>
      <ul className="list-disc list-inside rounded-xl max-md:mx-auto">
        {item.features.map((feature, index) => (
          <li
            key={index}
            className="text-fg/75 dark:text-gray-400 font-dm-sans font-[300] text-base lg:text-lg text-preset-3"
          >
            {feature}
          </li>
        ))}
      </ul>
      <div className="max-md:mt-0.5 font-dm-sans flex gap-x-1 items-center max-md:justify-center">
        <p className="text-lg">Price: ${item.price}</p>
        {item.image && <p className="text-gray-500 text-sm">(Per image)</p>}
      </div>
      <button
        onClick={handleAddToBag}
        className={`rounded-sm cursor-pointer max-md:mt-1.5 md:absolute bottom-4 right-4 w-[84px] py-1 ${
          isItemInBag
            ? "bg-accent-1/90 hover:bg-accent-1 dark:bg-accent-1 dark:hover:bg-accent-1-hover"
            : "bg-black-fg hover:bg-black-fg/90 dark:bg-white-fg dark:hover:bg-white-fg/90 text-white-fg dark:text-black-fg"
        }`}
      >
        <p className="text-sm">{isItemInBag ? "✓ In Bag" : "Add to bag"}</p>
      </button>
    </div>
  );
}
