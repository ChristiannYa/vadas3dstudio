import collage1 from "./collage-1.jpg";
import collage2 from "./collage-2.jpg";
import collage3 from "./collage-3.jpg";
import collage4 from "./collage-4.jpg";
import { StaticImageData } from "next/image";

export const collageImages: { id: number; image: StaticImageData }[] = [
  { id: 1, image: collage1 },
  { id: 2, image: collage2 },
  { id: 3, image: collage3 },  
  { id: 4, image: collage4 },
];
