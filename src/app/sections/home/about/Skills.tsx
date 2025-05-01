import { skills } from "@/app/constants/skills";

export default function Skills() {
  return (
    <ul className="font-dm-sans max-sm:text-sm leading-5">
      {skills.map((skill, index) => (
        <li key={index}> &#8226; {skill.name}</li>
      ))}
    </ul>
  );
}
