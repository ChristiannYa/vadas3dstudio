import AnimatedLogo from "./AnimatedLogo";

export default function Paragraph() {
  return (
    <div className="flex items-center max-lg:flex-col lg:gap-x-8 max-lg:gap-y-6">
      <AnimatedLogo />
      <div className="lg:w-[45%]">
        <p className="font-montserrat-alternates text-fg text-xl lg:text-3xl text-center lg:text-end font-[300]">
          I&apos;m a passionate 3D artist specializing in photorealistic
          renderings, product visualizations, and architectural concepts. With a
          sharp eye for detail and a deep love for lighting, composition, and
          storytelling through design, I help turn abstract ideas into
          high-quality renders.
        </p>
      </div>
    </div>
  );
}
