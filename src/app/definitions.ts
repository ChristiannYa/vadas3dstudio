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
  category: {
    text: string;
    highlight?: boolean;
  }[];
  description: string;
  items: {
    title: string;
    description: string;
    details?: string[];
  }[];
}
