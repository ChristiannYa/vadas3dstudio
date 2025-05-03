import List from "./List";
import Industries from "./Industries";

export default function Services() {
  return (
    <section className="container-1600">
      <h1 className="section-title__mb">Services</h1>
      <div className="space-y-8">
        <List />
        <Industries />
      </div>
    </section>
  );
}
