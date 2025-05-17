import { useUser } from "@/hooks/auth";
import {
  formatPossessive,
  formatDate,
  capitalizeFirstLetter,
} from "@/utils/ui";

export default function ProfileInfoData() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div>
        <div className="bg-gray-200 dark:bg-gray-700/40 text-2xl text-transparent rounded-md animate-pulse pointer-events-none w-[320px] h-[14px] mb-3"></div>

        <div className="text-transparent leading-none w-fit mb-4 space-y-3">
          <div className="bg-gray-200 dark:bg-gray-700/30 rounded-md animate-pulse w-[250px] h-[12px]"></div>
          <div className="bg-gray-200 dark:bg-gray-700/30 rounded-md animate-pulse w-[250px] h-[12px]"></div>
          <div className="bg-gray-200 dark:bg-gray-700/30 rounded-md animate-pulse w-[250px] h-[12px]"></div>
          <div className="bg-gray-200 dark:bg-gray-700/30 rounded-md animate-pulse w-[250px] h-[12px]"></div>
        </div>
      </div>
    );
  }

  const { name, last_name, email, created_at } = user?.user || {};

  const profileFields = [
    {
      label: "First name:",
      value: capitalizeFirstLetter(name) || "Not provided",
    },
    {
      label: "Last name:",
      value: capitalizeFirstLetter(last_name) || "Not provided",
    },
    { label: "Email:", value: email || "Not provided" },
    {
      label: "Account created:",
      value: created_at ? formatDate(created_at.toLocaleString()) : "Unknown",
    },
  ];

  return (
    <div>
      <h1 className="text-accent-1 text-2xl text-start font-[400] font-montserrat-alternates capitalize mb-0.5">
        {formatPossessive(name!)} Account information
      </h1>
      <div className="font-poppins font-[300] w-fit mb-4 space-y-1">
        {profileFields.map((field, index) => (
          <div key={index} className="flex items-center gap-x-1 flex-wrap">
            <p>{field.label}</p>
            <p className="text-black/60 dark:text-white/60">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
