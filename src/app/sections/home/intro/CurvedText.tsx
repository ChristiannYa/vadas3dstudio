"use client";

import { FC } from "react";
import { CurvedTextProps } from "@/app/definitions";

const CurvedText: FC<CurvedTextProps> = ({ text, radius, textSize, color }) => {
  const characters = text.split("");
  const startAngle = -90; // Start at the top
  const spread = 360 / (text.length * 1);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
    >
      {characters.map((char, i) => {
        // Calculate the angle for this chatacter
        const angle = startAngle + i * spread;
        const radians = angle * (Math.PI / 180);

        // Calculate position
        const x = radius * (1 + 0.9 * Math.cos(radians)); // 0.9 adjusts the distance from center
        const y = radius * (1 + 0.9 * Math.sin(radians));

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              fontSize: `${textSize}px`,
              color: color,
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`, // +90 to align text tangent to circle
              transformOrigin: "center",
              display: "inline-block",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default CurvedText;
