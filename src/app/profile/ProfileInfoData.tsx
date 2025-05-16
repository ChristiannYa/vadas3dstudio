import { useUser } from "@/hooks/auth";
import {
  formatPossessive,
  formatDate,
  capitalizeFirstLetter,
} from "@/utils/ui";

export default function ProfileInfoData() {
  const { user } = useUser();
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
