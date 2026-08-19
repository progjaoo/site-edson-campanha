import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export function Skeleton({ className, variant = "light", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md",
        variant === "light" ? "skeleton-shimmer" : "skeleton-dark",
        className
      )}
      {...props}
    />
  );
}
