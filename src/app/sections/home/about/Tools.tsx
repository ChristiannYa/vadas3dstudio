import { tools } from "@/app/constants/skills";

/**
 * @note - The component (`ul`) has an additional margin to
 * the right because the title of the section has a
 * default spacer below it, so it compensates for that.
 */
export default function Tools() {
  return (
    <ul className="font-poppins flex flex-col gap-y-5.5 mr-2">
      {tools.map((tool) => (
        <li key={tool.index} className="tool w-fit relative">
          <tool.icon className="w-5 h-5 lg:w-6 lg:h-6" />
          <span className="bg-accent-1 text-fg text-xs lg:text-sm rounded-xs whitespace-nowrap pointer-events-none py-0.5 px-1.5 absolute -top-8 left-1/2">
            {tool.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
