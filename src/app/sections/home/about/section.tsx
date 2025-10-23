import Paragraph from "./Paragraph";
import Collage from "./Collage";
import Skills from "./Skills";
import Tools from "./Tools";
import Image from "next/image";
import aboutPhoto from "@/app/assets/images/about/about-photo.jpg";

export default function AboutSection() {
  return (
    <section className="container-1000">
      <div className="space-y-4">
        <p className="text-center">
          <span className="font-syncopate text-shine text-center text-4xl leading-0 mb-6">
            About Me
          </span>
        </p>
        <div className="container-600">
          <div className="mb-6 flex flex-col items-center  gap-x-4 gap-y-4">
            <div className="rounded-full overflow-hidden h-52 w-52 flex-none">
              <Image
                src={aboutPhoto}
                alt="About Photo"
                className="object-cover"
                width={300}
                height={381}
              />
            </div>
            <Paragraph />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-y-0.5 lg:gap-y-2">
            <p className="text-center mb-1">
              <span className="font-syncopate text-3xl text-shine text-center leading-0">
                Skills
              </span>
            </p>
            <Tools />
          </div>
          <Skills />
        </div>
        <Collage />
      </div>
    </section>
  );
}
