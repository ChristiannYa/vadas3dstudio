import { authConstants } from "@/lib/constants/auth";
import { StaticImageData } from "next/image";
import { ButtonHTMLAttributes, ReactNode, RefObject } from "react";

export interface UserData {
  isLoggedIn: boolean;
  user?: {
    id: number | string;
    name: string;
    last_name: string;
    email: string;
    created_at?: string;
  };
  authType?: AuthType;
  provider?: AuthProvider;
}

export interface HomeButtonProps {
  className?: string;
  variant?: "header" | "profile";
}

export interface CurvedTextProps {
  text: string;
  radius: number;
  textSize: number;
  color: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

export interface CardFace {
  toggleFlip: () => void;
  closeModal: () => void;
  isFlipped: boolean;
}

export interface Qna {
  id: number;
  q: string;
  a: string;
}

export interface Service {
  id: number;
  category: {
    text: string;
    highlight?: boolean;
  }[];
  description: string;
  items: {
    id: number;
    title: string;
    description: string;
    details?: string[];
  }[];
}

export interface Industries {
  id: number;
  industry: string;
  description: string;
}

export interface AccentButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: "button" | "submit";
  className?: string;
}

export interface PricingGuide {
  id: number;
  title: string;
  description: string;
  features: string[];
  price: number;
}

export interface ShopItemProps {
  item: PricingGuide;
}

export interface CartItem {
  id: number;
  quantity: number;
  title: string;
  price: number;
}

export interface ItemProps {
  item: CartItem;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderWithItems {
  orderItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
}

export interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: number;
  orderItems: OrderItem[];
  total: number;
}

export interface OwnerNotificationEmailProps {
  customerName: string;
  customerEmail: string;
  orderId: number;
  orderItems: OrderItem[];
  total: number;
}

export interface StripeCheckoutMetadata {
  userId: string;
  cartItems: string;
  // Maintain type safety by using a string
  // representation of the CartItem
  [key: string]: string;
}

export interface ProfileLoaderProps {
  children: ReactNode;
}

export type AuthType =
  (typeof authConstants.AUTH.TYPES)[keyof typeof authConstants.AUTH.TYPES];

export type AuthProvider =
  (typeof authConstants.AUTH.PROVIDERS)[keyof typeof authConstants.AUTH.PROVIDERS];

export interface UsePasswordToggleResult {
  inputRef: RefObject<HTMLInputElement | null>;
  showPassword: boolean;
  togglePasswordVisibility: (e: React.MouseEvent) => void;
}

export interface CookieAccessor {
  get: (name: string) => { value?: string } | undefined;
}
