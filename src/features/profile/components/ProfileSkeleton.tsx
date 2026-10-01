import { AvatarSkeleton } from "@/shared/components/skeletons/avatar-skeleton";
import { CardSkeleton } from "@/shared/components/skeletons/card-skeleton";
import { Skeleton } from "@/shared/components/skeletons/skeleton";
import { TextSkeleton } from "@/shared/components/skeletons/text-skeleton";

export default function ProfileSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14" role="status" aria-busy="true">
      <span className="sr-only">Loading profile...</span>
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-4 h-9 w-32 sm:h-10" />
      <TextSkeleton className="mt-2 max-w-xl" />
      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.5fr)] lg:items-start">
        <CardSkeleton className="space-y-5">
          <AvatarSkeleton size="lg" className="rounded-[1.7rem]" />
          <Skeleton className="h-8 w-2/3" />
          <div className="border-t border-line pt-5"><TextSkeleton lines={2} /></div>
          <div className="grid gap-2 pt-1">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardSkeleton>
        <div className="space-y-5">
          <CardSkeleton>
            <TextSkeleton lines={2} />
            <div className="divide-y divide-line border-y border-line">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex justify-between gap-6 py-4">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-2/5" />
                </div>
              ))}
            </div>
            <TextSkeleton lines={2} />
          </CardSkeleton>
          <CardSkeleton className="min-h-52" />
          <CardSkeleton lines={2} className="min-h-36" />
        </div>
      </div>
    </main>
  );
}
