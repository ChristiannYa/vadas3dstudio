import { skills } from "@/app/constants/skills";
import Tools from "./Tools";

export default function Skills() {
  return (
    <div className="flex items-end">
      <h1 className="section-title vt text-center">Skills</h1>
      <Tools />
      <ul className="font-dm-sans">
        {skills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}
