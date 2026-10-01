import { AvatarSkeleton } from "@/shared/components/skeletons/avatar-skeleton";
import { CardSkeleton } from "@/shared/components/skeletons/card-skeleton";
import { Skeleton } from "@/shared/components/skeletons/skeleton";
import { TextSkeleton } from "@/shared/components/skeletons/text-skeleton";

type FormSkeletonProps = {
  fields?: number;
  showAvatar?: boolean;
};

export function FormSkeleton({ fields = 4, showAvatar = false }: FormSkeletonProps) {
  return (
    <main
      className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 sm:py-14"
      role="status"
      aria-label="Loading form"
    >
      <Skeleton className="h-8 w-36" />
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-52" />
        <TextSkeleton className="max-w-md" />
      </div>
      <CardSkeleton className="mt-8 space-y-7">
        {showAvatar ? (
          <div className="space-y-4">
            <TextSkeleton lines={2} className="max-w-xs" />
            <div className="flex items-center gap-4">
              <AvatarSkeleton className="size-16 rounded-2xl" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        ) : null}
        <div className="border-t border-line" />
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: fields }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className={index % 2 === 0 ? "h-4 w-28" : "h-4 w-20"} />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <Skeleton className="h-9 w-full sm:w-20" />
          <Skeleton className="h-9 w-full sm:w-36" />
        </div>
      </CardSkeleton>
    </main>
  );
}
