import React from "react";

export default function Badges() {
  return (
    <div className="w-full lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mt-2 lg:mt-0">
      <div className="gap-x-8 gap-y-2 lg:gap-0 px-0 lg:px-32 flex justify-center lg:justify-between max-lg:flex-wrap">
        <div className="intro-badge rotate-none lg:rotate-15">
          <p className="hidden lg:block">Animations</p>
          <p className="lg:hidden">3D Animations</p>
        </div>
        <div className="intro-badge rotate-none lg:-rotate-15">
          <p>Photo Real Renders</p>
        </div>
        <div className="intro-badge rotate-none lg:rotate-10">
          <p>VR Walkthroughs</p>
        </div>
      </div>
    </div>
  );
}
