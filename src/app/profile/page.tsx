"use client";

import LogoutButton from "./LogoutButton";
import ProfileInfoData from "./ProfileInfoData";
import OrderHistory from "./OrderHistory";

export default function Profile() {
  return (
    <div className="h-full">
      <div className="h-full container-1600">
        <div className="h-full flex flex-col gap-4">
          <ProfileInfoData />
          <OrderHistory />
          <div className="flex justify-end items-end">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
