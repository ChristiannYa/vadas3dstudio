import { portfolioItems } from "@/app/constants/portfolio";
import Image from "next/image";

export default function PortfolioSection() {
  return (
    <section className="min-h-screen container-1600">
      <h1 className="section-title__mb text-center">Portfolio</h1>

      <div className="flex justify-center flex-wrap gap-3 ">
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
              <div className="space-y-1">
                <h3 className="text-xl lg:text-2xl font-kanit font-[200] leading-none">
                  {item.title}
                </h3>
                <p className="text-fg/60 dark:text-gray-500 font-dm-sans font-[300] text-base lg:text-lg text-preset-3 leading-none">
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
