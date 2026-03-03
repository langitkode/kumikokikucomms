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
    "bg-gradient-to-r from-neon-orange to-neon-pink text-night-dark hover:shadow-lg hover:shadow-neon-orange/30",
  secondary:
    "bg-night-mid text-text-primary border border-neon-blue hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20",
  outline:
    "bg-transparent text-text-primary border border-neon-orange hover:bg-neon-orange hover:text-night-dark hover:shadow-lg hover:shadow-neon-orange/30",
  ghost: "bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:border-neon-pink/30 hover:border",
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
