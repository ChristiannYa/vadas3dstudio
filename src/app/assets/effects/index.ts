import { StaticImageData } from "next/image";

import duplexAugust from "./duplex-august";
import kitchenSketchup from "./kitchen-sketchup";
import kitchenSketchup2 from "./kitchen-sketchup-2";

interface EffectsGroupProps {
  id: number;
  image: StaticImageData;
}

export const duAgGroup: EffectsGroupProps[] = [
  { id: 1, image: duplexAugust.duAg1 },
  { id: 2, image: duplexAugust.duAg2 },
  { id: 3, image: duplexAugust.duAg3 },
  { id: 4, image: duplexAugust.duAg4 },
];

export const kitchenSketchupGroup: EffectsGroupProps[] = [
  { id: 1, image: kitchenSketchup.img1 },
  { id: 2, image: kitchenSketchup.img2 },
  { id: 3, image: kitchenSketchup.img3 },
  { id: 4, image: kitchenSketchup.img4 },
  { id: 5, image: kitchenSketchup.img5 },
];

export const kitchenSketchup2Group: EffectsGroupProps[] = [
  { id: 1, image: kitchenSketchup2.img1 },
  { id: 2, image: kitchenSketchup2.img2 },
  { id: 3, image: kitchenSketchup2.img3 },
  { id: 4, image: kitchenSketchup2.img4 },
];
