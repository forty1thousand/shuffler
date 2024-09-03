import { twMerge } from "tailwind-merge";

interface PaperProps extends React.ComponentPropsWithoutRef<"div"> {}

export function Paper({ className, ...props }: PaperProps) {
  return (
    <div
      className={twMerge("border border-faint rounded-md", className)}
      {...props}
    />
  );
}
