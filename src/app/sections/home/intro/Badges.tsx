import React from "react";

export default function Badges() {
  return (
    <div className="w-full lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
      <div className="font-raleway flex justify-between px-2 lg:px-28">
        <div className="intro-badge rotate-none lg:rotate-15">
          <p>VR Walkthroughs</p>
        </div>
        <div className="intro-badge rotate-none lg:-rotate-15">
          <p>Photo Real Renders</p>
        </div>
        <div className="intro-badge rotate-none lg:rotate-10">
          <p>3D Animations</p>
        </div>
      </div>
    </div>
  );
}
