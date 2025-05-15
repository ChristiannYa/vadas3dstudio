import { useAppSelector } from "@/hooks/redux";
import { selectCartTotal } from "@/lib/features/cart/cartSlice";

const CartTotal = () => {
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className="font-poppins font-[300]">
      Total: ${cartTotal.toFixed(2)}
    </div>
  );
};

export default CartTotal;
