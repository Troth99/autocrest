import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/shared/components/skeletons/skeleton";

type TextSkeletonProps = ComponentProps<"div"> & { lines?: number };

export function TextSkeleton({ lines = 1, className, ...props }: TextSkeletonProps) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className={cn("h-4 w-full", lines > 1 && index === lines - 1 && "w-3/4")} />
      ))}
    </div>
  );
}
