import { StaticImageData } from "next/image";

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

export interface Qna {
  id: number;
  q: string;
  a: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
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
