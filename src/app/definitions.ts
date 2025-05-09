import { StaticImageData } from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface UserData {
  isLoggedIn: boolean;
  user?: {
    id: number | string;
    name: string;
    last_name: string;
    email: string;
    created_at?: string;
  };
  authType?: "custom" | "nextauth";
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
