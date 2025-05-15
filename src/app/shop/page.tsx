"use client";

import { pricingGuideList } from "@/lib/constants/pricing";
import ShopItem from "./ShopItem";

export default function Shop() {
  return (
    <div className="container-1000 pt-2 md:pt-4 pb-2 md:pb-10">
      <h1 className="font-dream-avenue font-[500] text-5xl lg:text-7xl text-center md:text-start mb-4">
        Pricing Guide
      </h1>
      <div className="flex flex-col gap-y-4">
        {pricingGuideList.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
