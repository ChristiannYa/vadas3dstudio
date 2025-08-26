import { IndustriesServed } from "@/lib/constants/services";

export default function Industries() {
  return (
    <div>
      <h2 className="font-syncopate text-accent-1 text-2xl lg:text-3xl mb-2">
        Industries Served
      </h2>
      <div className="space-y-1">
        {IndustriesServed.map((industry) => (
          <div key={industry.id}>
            <h3 className="font-syncopate font-[400] dark:font-[400] text-xl text-start">
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
