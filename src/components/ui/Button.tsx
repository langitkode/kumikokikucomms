"use client";

import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-aka text-shiro border-aka hover:bg-aka-dark hover:border-aka-dark",
  secondary:
    "bg-shiro text-sumi border-shiro hover:bg-ash-light hover:border-ash-light",
  outline:
    "bg-transparent text-shiro border-ash hover:border-aka hover:text-aka",
  ghost: "bg-transparent text-ash hover:text-shiro border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-8 py-3.5 text-sm",
  lg: "px-10 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2.5
    border font-medium uppercase tracking-wider
    transition-all duration-200 cubic-bezier(0.6, 0, 0.4, 1)
    cursor-pointer
    hover:-translate-y-0.5
    active:translate-y-0
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {children}
      {icon && <span className="ml-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
