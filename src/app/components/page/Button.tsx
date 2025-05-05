import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} accent-btn hover:cursor-pointer overflow-hidden py-2 px-3`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
