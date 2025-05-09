import React from "react";
import { AccentButton } from "@/app/definitions";

/**
 * @note - disabled is not in the interface because it is already
 * included through inheritance from the ButtonHTMLAttributes interface.
 * It is optional and can be passed in as a prop.
 */
export default function Button({
  children,
  type = "button",
  className,
  disabled,
  ...props
}: AccentButton) {
  return (
    <button
      type={type}
      className={`${className} width-grow-btn overflow-hidden py-2 px-3 relative ${
        disabled
          ? "disabled hover:cursor-default opacity-50"
          : "hover:cursor-pointer"
      }`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-[2]">{children}</span>
    </button>
  );
}
