import AnimatedLogo from "./AnimatedLogo";

export default function Paragraph() {
  return (
    <div className="flex items-center max-lg:flex-col lg:gap-x-8 max-lg:gap-y-6">
      <AnimatedLogo />
      <div className="font-montserrat-alternates uppercase lg:w-[45%]">
        <p className="text-accent-1 text-xl lg:text-2xl text-center lg:text-end font-[500]">
          Need 2D floor plans or 3D renderings that actually impress?
        </p>
        <p className="text-fg text-xl lg:text-2xl text-center lg:text-end font-[300]">
          At Vada&apos;s 3D Studio we create high quality visuals and
          photorealistic 3D renderings with a quick turnaround tailored to your
          style and timeline. Whether you are an Architect or a design
          professional, our team is ready to help.
        </p>
      </div>
    </div>
  );
}
