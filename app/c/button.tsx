import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

let primary =
  "bg-primary hover:bg-primary/80 active:bg-primary/60 text-background";
let seethru =
  "border border-faint bg-transparent hover:bg-faint/40 active:bg-faint/75";
let destructive =
  "bg-destructive hover:bg-destructive/90 active:bg-destructive/80 text-background";
let text =
  "text-left text-subtle hover:bg-faint/50 active:bg-faint/75 shadow-none";

let variants = {
  primary,
  seethru,
  destructive,
  text,
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: keyof typeof variants;
}

export let Button = forwardRef<React.ComponentRef<"button">, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      variant = "seethru",
      ...props
    },
    ref
  ) => {
    className = twMerge(variants[variant], className);

    return (
      <button
        ref={ref}
        className={twMerge(
          "flex justify-center items-center rounded-lg shadow-sm transition p-2 text-sm disabled:opacity-50 disabled:pointer-events-none outline-outline outline-1",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
