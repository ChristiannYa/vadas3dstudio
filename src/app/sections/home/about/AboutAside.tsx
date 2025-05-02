import Image from "next/image";
import aboutPhoto from "@/app/assets/images/about/about-photo.jpg";
import Tools from "./Tools";
import Skills from "./Skills";

/*
  Try to fix the small gap below the image
  that occurs on small screens.
*/
export default function AboutAside() {
  return (
    <aside className="lg:w-fit flex-shrink-0">
      <div className="space-y-2 lg:space-y-4 flex gap-x-2 lg:gap-x-5 lg:block">
        <div className="overflow-hidden lg:h-64 relative">
          <Image
            src={aboutPhoto}
            alt="About Photo"
            className="rounded-xl w-full object-cover"
            width={300}
            height={381}
          />
        </div>
        <div className="flex items-end gap-x-0.5 lg:gap-x-2">
          <h2 className="text-accent-1 font-[200] text-3xl sm:text-5xl lg:text-7xl font-dm-sans vt text-center">
            Skills
          </h2>
          <Tools />
          <Skills />
        </div>
      </div>
    </aside>
  );
}
