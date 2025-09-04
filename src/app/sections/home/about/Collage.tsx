import {
  duAgGroup,
  kitchenSketchupGroup,
  kitchenSketchup2Group,
} from "@/app/assets/effects";
import AutomaticCarousel from "@/app/shop/AutomaticCarousel";

/**
 * @note - The width of the Image component works as follows:
 * `sizes="(max-width: 40rem) 100vw, 300px"`
 * - This means that the image will take up 100% of the viewport
 *   width on screens smaller than 768px, and 300px on larger screens.
 */
export default function Collage() {
  return (
    <div className="list columns-[350px] gap-2">
      <AutomaticCarousel
        images={kitchenSketchupGroup}
        intervalSeconds={2}
        className="mb-2 w-full aspect-[7/4]"
      />
      <AutomaticCarousel
        images={kitchenSketchup2Group}
        intervalSeconds={2}
        className="mb-2 w-full aspect-[7/4]"
      />
      <AutomaticCarousel
        images={duAgGroup}
        intervalSeconds={2}
        className="mb-2 w-full aspect-[7/4]"
      />
    </div>
  );
}
