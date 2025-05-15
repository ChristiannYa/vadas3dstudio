import { AppDispatch, AppStore, RootState } from "@/lib/store";
import { useDispatch, useSelector, useStore } from "react-redux";
import { toggleCartTabStatus } from "@/lib/features/cart/cartSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useCartTab = () => {
  const dispatch = useAppDispatch();

  const handleCartTabStatus = () => {
    dispatch(toggleCartTabStatus());
  };

  return { handleCartTabStatus };
};
