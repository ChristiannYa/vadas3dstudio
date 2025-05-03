import AboutAside from "./AboutAside";
import Paragraph from "./Paragraph";
import Collage from "./Collage";

export default function AboutSection() {
  return (
    <section className="container-1000">
      <div className="space-y-4">
        <div className="flex lg:items-end max-lg:flex-col gap-x-4 gap-y-4">
          <AboutAside />
          <Paragraph />
        </div>
        <Collage />
      </div>
    </section>
  );
}
