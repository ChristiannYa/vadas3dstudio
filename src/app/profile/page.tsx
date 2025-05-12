"use client";

import LogoutButton from "./LogoutButton";
import ProfileInfoData from "./ProfileInfoData";

export default function Profile() {
  return (
    <div className="h-full">
      <div className="h-full container-1600">
        <div className="h-full grid grid-rows-[auto_1fr]">
          <ProfileInfoData />
          <div className="flex justify-end items-end">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
