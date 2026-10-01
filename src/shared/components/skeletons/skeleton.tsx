import type { ComponentProps } from "react";
import { cn } from "cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("rounded-lg bg-text-primary/10 motion-safe:animate-pulse", className)}
      {...props}
    />
  );
}
