"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
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
    "bg-gradient-to-r from-orange-primary to-orange-dark text-white font-semibold shadow-xl shadow-orange-primary/25 hover:shadow-orange-primary/40",
  secondary:
    "bg-white/90 text-charcoal font-medium shadow-lg hover:shadow-xl hover:bg-white",
  ghost:
    "bg-transparent text-white border border-orange-primary/30 hover:border-orange-primary hover:bg-orange-primary/10 hover:shadow-lg hover:shadow-orange-primary/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
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
    rounded-2xl
    transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
    cursor-pointer
    tracking-wide
    hover:-translate-y-0.5
    active:translate-y-0
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
        {icon && <span className="ml-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
      {icon && <span className="ml-0.5">{icon}</span>}
    </button>
  );
}
