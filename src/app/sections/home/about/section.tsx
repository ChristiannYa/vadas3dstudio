import AboutAside from "./AboutAside";
import Paragraph from "./Paragraph";

export default function AboutSection() {
  return (
    <section className="container-1000">
      <div className="flex lg:items-end max-lg:flex-col gap-x-4 gap-y-4">
        <AboutAside />
        <Paragraph />
      </div>
    </section>
  );
}
