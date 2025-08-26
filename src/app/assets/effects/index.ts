import { StaticImageData } from "next/image";
import duAg1 from "./duplex-august-1.jpg";
import duAg2 from "./duplex-august-2.jpg";
import duAg3 from "./duplex-august-3.jpg";
import duAg4 from "./duplex-august-4.jpg";

interface EffectsGroupProps {
  id: number;
  image: StaticImageData;
}

export const duAgGroup: EffectsGroupProps[] = [
  { id: 1, image: duAg1 },
  { id: 2, image: duAg2 },
  { id: 3, image: duAg3 },
  { id: 4, image: duAg4 },
];
