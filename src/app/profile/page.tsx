"use client";

import HomeButton from "../components/navigation/HomeButton";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/hooks/auth";
import { formatPossessive, formatDate } from "@/utils/ui";

export default function Profile() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-x-2 page-title">
          <p>Loading Profile Data</p>
          <span className="inline-block w-4 h-4 border-2 border-accent-1 border-t-amber-200 rounded-full animate-spin"></span>
        </div>
        <HomeButton className="-ml-2" />
      </div>
    );
  }

  if (error || !user?.isLoggedIn) {
    return (
      <div className="p-4 md:p-8">
        <div className="page-title text-red-500">Error loading profile</div>
        <p className="mb-4">Unable to load your profile information.</p>
        <HomeButton className="-ml-2" />
      </div>
    );
  }

  const { name, last_name, email, created_at } = user.user || {};

  return (
    <div className="container-1600 pb-6">
      <div className="mb-4 space-y-1.5">
        <h1 className="text-accent-1 text-2xl lg:text-3xl text-start font-[400] font-montserrat-alternates capitalize">
          {formatPossessive(name!)} Profile
        </h1>
        <HomeButton variant="profile" />
      </div>
      <div className="font-poppins font-[300] w-fit mb-4 space-y-1">
        <div className="flex items-center gap-x-1 flex-wrap">
          <p>First Name:</p>
          <p className="text-white/60">{name || "Not provided"}</p>
        </div>
        <div className="flex items-center gap-x-1 flex-wrap">
          <p>Last Name:</p>
          <p className="text-white/60">{last_name || "Not provided"}</p>
        </div>
        <div className="flex items-center gap-x-1 flex-wrap">
          <p>Email:</p>
          <p className="text-white/60">{email || "Not provided"}</p>
        </div>
        <div className="flex items-center gap-x-1 flex-wrap">
          <p>Date created:</p>
          <p className="text-white/60">
            {created_at ? formatDate(created_at.toLocaleString()) : "Unknown"}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}
