import { IndustriesServed } from "@/lib/constants/services";

export default function Industries() {
  return (
    <div>
      <h2 className="font-dm-sans font-[200] text-2xl lg:text-4xl mb-2">
        Industries Served
      </h2>
      <div className="space-y-1">
        {IndustriesServed.map((industry) => (
          <div key={industry.id}>
            <h3 className="font-raleway font-[400] dark:font-[400] text-xl lg:text-2xl text-start">
              {industry.industry}
            </h3>
            <p className="text-fg/60 dark:text-gray-400 font-raleway font-[400] text-lg lg:text-xl">
              {industry.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
