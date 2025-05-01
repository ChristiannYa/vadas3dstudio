import Image from "next/image";
import * as collageImages from "@/app/assets/images/collage/index";

/**
 * @note - The width of the Image component works as follows:
 * `sizes="(max-width: 40rem) 100vw, 300px"`
 * - This means that the image will take up 100% of the viewport
 *   width on screens smaller than 768px, and 300px on larger screens.
 */
export default function Collage() {
  const images = Object.values(collageImages);

  return (
    <div className="container-1000">
      <div className="list columns-[300px] gap-4">
        {images.map((image, index) => (
          <div key={index} className="mb-4">
            <Image
              src={image}
              alt={`Collage ${index + 1}`}
              className="block"
              width={0}
              height={0}
              sizes="(max-width: 40rem) 100vw, 300px"
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "1rem",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
