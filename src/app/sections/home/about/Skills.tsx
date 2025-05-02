import { skills } from "@/app/constants/skills";

export default function Skills() {
  return (
    <ul className="font-dm-sans max-sm:text-sm leading-5">
      {skills.map((skill, index) => (
        <li key={index}>
          {" "}
          <span className="text-accent-1">&#8226;</span> {skill.name}
        </li>
      ))}
    </ul>
  );
}
