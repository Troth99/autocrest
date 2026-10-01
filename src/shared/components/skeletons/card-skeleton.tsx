import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/shared/components/skeletons/skeleton";
import { TextSkeleton } from "@/shared/components/skeletons/text-skeleton";

type CardSkeletonProps = ComponentProps<"div"> & { lines?: number };

export function CardSkeleton({ lines = 3, children, className, ...props }: CardSkeletonProps) {
  return (
    <div className={cn("card-base space-y-6", className)} {...props}>
      {children ?? (
        <>
          <Skeleton className="h-6 w-1/2" />
          <TextSkeleton lines={lines} />
        </>
      )}
    </div>
  );
}
