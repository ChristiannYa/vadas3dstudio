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
      className={`${className} accent-btn hover:cursor-pointer overflow-hidden py-2 px-3 ${
        disabled ? "disabled" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
