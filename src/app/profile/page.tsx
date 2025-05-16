"use client";

import LogoutButton from "./LogoutButton";
import ProfileInfoData from "./ProfileInfoData";
import OrderHistory from "./OrderHistory";
import ProfileLoader from "./ProfileLoader";

export default function Profile() {
  return (
    <ProfileLoader>
      <div className="h-full">
        <div className="h-full container-1600">
          <div className="h-full grid grid-rows-[auto_1fr_50px]">
            <ProfileInfoData />
            <OrderHistory />
            <div className="flex justify-end items-end">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </ProfileLoader>
  );
}
