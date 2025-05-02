import React from "react";
import Badges from "./Badges";

export default function Banner() {
  return (
    <div className="lg:relative py-2">
      <p
        className={`font-dm-sans text-accent-1 text-[clamp(6.25rem,18vw,18.125rem)] text-center uppercase leading-none`}
      >
        <span className="td-text text-white">3D</span> Artist
      </p>
      <Badges />
    </div>
  );
}
