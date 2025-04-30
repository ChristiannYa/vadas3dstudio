import { tools } from "@/app/constants/skills";

/**
 * @note - The component has a margin to the right
 * because the title of the section has a default
 * spacer, so it compensates for that.
 */
export default function Tools() {
  return (
    <ul className="font-poppins flex flex-col gap-y-6 mr-4">
      {tools.map((tool) => (
        <li key={tool.index} className="tool">
          <tool.Icon />
          <span>{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}
