"use client";

import AccountInfoData from "./AccountInfoData";
import OrderHistory from "./OrderHistory";

export default function Account() {
  return (
    <div className="h-full">
      <div className="h-full container-1600">
        <div className="h-full flex flex-col gap-4">
          <AccountInfoData />
          <OrderHistory />
        </div>
      </div>
    </div>
  );
}
