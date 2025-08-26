import Image, { StaticImageData } from "next/image";
import { useEffect, useState, type FC } from "react";

interface ImageItem {
  id: number;
  image: StaticImageData;
}

interface AutomaticCarouselProps {
  images: ImageItem[];
  intervalSeconds: number;
  className?: string;
}

const AutomaticCarousel: FC<AutomaticCarouselProps> = ({
  images,
  intervalSeconds,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex;

        if (direction === "forward") {
          nextIndex = prevIndex + 1;
          // If we've reached the end, start going backward
          if (nextIndex >= images.length - 1) {
            setDirection("backward");
            return images.length - 1;
          }
          return nextIndex;
        } else {
          nextIndex = prevIndex - 1;
          // If we've reached the beginning, start going forward
          if (nextIndex <= 0) {
            setDirection("forward");
            return 0;
          }
          return nextIndex;
        }
      });
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [images.length, intervalSeconds, direction]);

  return (
    <div className={`bg-accent-2 relative overflow-hidden ${className}`}>
      {images.map((imageItem, index) => (
        <Image
          key={imageItem.id}
          src={imageItem.image}
          alt={`Carousel image ${imageItem.id}`}
          fill
          sizes="(max-width: 767px) 94vw, (max-width: 1023px) calc(94vw - 576px - 1.5rem), (max-width: 1600px) calc(94vw - 768px - 1.5rem), 808px"
          /*
            - Mobile: 94vw ("full" container width)
            - Tablet: 94vw - 576px - 1.5rem (container minus CallToAction width minus gap)
            - Desktop: 94vw - 768px - 1.5rem (container minus larger CallToAction minus gap)
            - Large screens: 808px (fixed size when container maxes out)
          */
          style={{
            objectFit: "cover",
            opacity: index === currentIndex ? 1 : 0,
            // transition: "opacity 0.s ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
          priority={index === 0} // Priority for first image only
          quality={100}
        />
      ))}
    </div>
  );
};

export default AutomaticCarousel;
