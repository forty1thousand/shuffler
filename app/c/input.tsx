import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export let Input = forwardRef<React.ComponentRef<"input">, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={twMerge(
        "shadow-sm font-light text-[15px] border border-faint [&:user-invalid]:border-destructive [&:user-invalid]:focus:border-destructive [&:user-invalid]:text-destructive",
        "[&:user-invalid]:placeholder-destructive/50 bg-transparent placeholder-muted rounded-lg px-1.5 py-1 focus:outline-ring outline-offset-1",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {}

export let Textarea = forwardRef<React.ComponentRef<"textarea">, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={twMerge(
        "shadow-sm font-light text-[15px] border border-faint [&:user-invalid]:border-destructive [&:user-invalid]:focus:border-destructive [&:user-invalid]:text-destructive",
        "[&:user-invalid]:placeholder-destructive/50 bg-transparent placeholder-muted rounded-t-lg rounded-bl-lg px-1.5 py-1 focus:outline-ring outline-offset-1",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
