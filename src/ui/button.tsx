import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-zinc-800",
  secondary: "bg-white text-black border border-zinc-200 hover:bg-zinc-50",
  ghost: "bg-transparent text-black hover:bg-zinc-100",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type, asChild, ...props },
    ref,
  ) => {
    const mergedClassName = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
      variantClass[variant],
      sizeClass[size],
      className,
    );

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;

      return React.cloneElement(child, {
        className: cn(mergedClassName, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={mergedClassName}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
