"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CurvedText from "./CurvedText";

/**
 * @note - The video's wrapper the style attribute instead of className
 * because tailwind can't process video_wrapper_padding's value during
 * the build time. The style attribute is processed during the runtime
 * so it can process the value.
 */
export default function AnimatedLogo() {
  const containerRef = useRef(null);

  const [videoWidth, setVideoWidth] = useState(100);
  const [curvedTextRadius, setCurvedTextRadius] = useState(0);

  const [isLgScreen, setIsLgScreen] = useState(false);

  const video_wrapper_padding = Math.round(videoWidth / 4.5);
  const video_wrapper_borderWeight = 2;
  const video_outterPath_margin = 20;

  useEffect(() => {
    const updateDimensions = () => {
      const smScreen = window.innerWidth < 640;
      const lgScreen = window.innerWidth < 1024;

      setIsLgScreen(lgScreen);

      if (smScreen) {
        setVideoWidth(50);
      } else if (lgScreen) {
        setVideoWidth(70);
      } else {
        setVideoWidth(100);
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useGSAP(() => {
    // Container sizing
    const contentPaddingSize = videoWidth + video_wrapper_padding * 2;
    const containerSize = contentPaddingSize + video_wrapper_borderWeight * 2;

    // Calculate radius for curved text
    const radius = containerSize / 2 + video_outterPath_margin;
    setCurvedTextRadius(radius);

    // Animate the whole container with the curved text
    gsap.to(containerRef.current, {
      rotation: 360,
      duration: 16,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });
  }, [videoWidth]);

  return (
    <div
      className="an-lo w-full lg:w-[55%] flex max-md:justify-center items-center gap-x-4 relative"
      style={{
        ...(isLgScreen && { paddingBlock: `${video_outterPath_margin}px` }),
      }}
    >
      <div></div>
      <div
        className="bg-[#010101] rounded-full relative"
        style={{
          padding: `${video_wrapper_padding}px`,
          border: `solid ${video_wrapper_borderWeight}px ${"var(--fg)"}`,
        }}
      >
        <video
          width={videoWidth}
          autoPlay
          muted
          playsInline
          loop
          style={{ minWidth: `${videoWidth}px` }}
        >
          <source src="/videos/logo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Container for the curved text that will be rotated */}
        <div
          ref={containerRef}
          className="absolute inset-0 pointer-events-none"
        >
          {curvedTextRadius > 0 && (
            <CurvedText
              text="VISUALIZING CONCEPTS DESIGNING 3D REALITY."
              radius={curvedTextRadius}
              textSize={videoWidth < 70 ? 8 : 10}
              color="var(--color-accent-1)"
            />
          )}
        </div>
      </div>
    </div>
  );
}
