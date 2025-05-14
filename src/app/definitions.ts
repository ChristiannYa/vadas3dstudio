import { authConstants } from "@/lib/constants/auth";
import { StaticImageData } from "next/image";
import { ButtonHTMLAttributes, ReactNode, RefObject } from "react";

export type AuthType =
  (typeof authConstants.AUTH.TYPES)[keyof typeof authConstants.AUTH.TYPES];

export type AuthProvider =
  (typeof authConstants.AUTH.PROVIDERS)[keyof typeof authConstants.AUTH.PROVIDERS];

export interface UsePasswordToggleResult {
  inputRef: RefObject<HTMLInputElement | null>;
  showPassword: boolean;
  togglePasswordVisibility: (e: React.MouseEvent) => void;
}

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
  price: string;
}
