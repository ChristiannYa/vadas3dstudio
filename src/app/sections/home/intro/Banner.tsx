import React from "react";
import Badges from "./Badges";

export default function Banner() {
  return (
    <div className="md:relative py-2">
      <p
        className={`font-dm-sans text-[clamp(6.25rem,18vw,18.125rem)] leading-none text-center uppercase`}
      >
        3D Artist
      </p>
      <Badges />
    </div>
  );
}
