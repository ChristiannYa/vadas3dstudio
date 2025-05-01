import { portfolioItems } from "@/app/constants/portfolio";
import Image from "next/image";

export default function PortfolioSection() {
  return (
    <section className="min-h-screen container-1600">
      <h1 className="text-center mb-4">Portfolio</h1>

      <div className="flex justify-center flex-wrap gap-x-4 gap-y-6">
        {portfolioItems.map((item, i) => (
          <div key={item.id} className="space-y-2">
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={226}
              className="w-full"
              priority={true}
            />
            <div className="leading-none flex items-start gap-x-3">
              <p className="text-5xl font-dream-avenue font-[300]">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </p>
              <div>
                <h3 className="text-2xl font-kanit">{item.title}</h3>
                <p className="text-gray-600 font-dm-sans font-[400]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
