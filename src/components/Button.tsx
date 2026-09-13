import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type Props = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-ink text-bg hover:bg-white border border-transparent",
  secondary: "bg-surface text-ink border border-border-strong hover:bg-surface-hover hover:border-accent-blue/50",
  ghost: "bg-transparent text-ink-dim border border-transparent hover:text-ink hover:bg-surface",
};

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-1.5 text-xs",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: Props) {
  const { as, variant = "primary", size = "md", icon, children, className = "", ...rest } = props;
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (as === "a") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {icon}
      {children}
    </button>
  );
}
