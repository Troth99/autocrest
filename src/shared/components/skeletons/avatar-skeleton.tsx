import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/shared/components/skeletons/skeleton";

const sizes = { sm: "size-8", md: "size-10", lg: "size-20" };
type AvatarSkeletonProps = ComponentProps<"div"> & { size?: keyof typeof sizes };

export function AvatarSkeleton({ size = "md", className, ...props }: AvatarSkeletonProps) {
  return <Skeleton className={cn("shrink-0 rounded-full", sizes[size], className)} {...props} />;
}
