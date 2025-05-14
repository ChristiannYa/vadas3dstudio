import { pricingGuideList } from "@/lib/constants/pricing";

export default function Store() {
  return (
    <div className="container-1000">
      <h1 className="font-dream-avenue font-[500] text-5xl lg:text-7xl text-center md:text-start mb-4">
        Pricing Guide
      </h1>
      <div className="flex flex-col gap-y-4">
        {pricingGuideList.map((item) => (
          <div
            key={item.id}
            className="bg-neutral-50 dark:bg-[#090909] text-center md:text-start px-4 py-2 relative"
          >
            <h2 className="text-accent-1 text-2xl lg:text-3xl font-kanit font-[200]">
              {item.title}
            </h2>
            <p className="text-fg/90 font-dm-sans font-[300] text-base lg:text-lg text-preset-3">
              {item.description}
            </p>
            <ul className="list-disc list-inside">
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-fg/60 dark:text-gray-400 font-dm-sans font-[300] text-base lg:text-lg text-preset-3"
                >
                  {feature}
                </li>
              ))}
            </ul>
            <p className="font-dm-sans text-lg">Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
