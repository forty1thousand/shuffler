import { twMerge } from "tailwind-merge";

interface LineProps extends React.ComponentProps<"div"> {
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function Line({
  variant = "horizontal",
  className,
  ...props
}: LineProps) {
  className = twMerge(variant == "horizontal" ? "h-px" : "w-px", className);

  return <div {...props} className={twMerge("bg-faint", className)} />;
}
