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

export interface Service {
  category: string;
  description: string;
  items: {
    title: string;
    description: string;
    details?: string[];
  }[];
}
