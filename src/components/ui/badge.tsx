import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-brand-blue text-white",
        secondary: "bg-brand-yellow text-brand-dark",
        outline: "border border-brand-blue/25 text-brand-blue",
        muted: "bg-brand-light text-slate-600",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
