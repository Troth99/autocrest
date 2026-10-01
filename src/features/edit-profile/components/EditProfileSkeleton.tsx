import { Skeleton } from "@/shared/components/skeletonLoading/skeleton";
import { skeletonClasses } from "@/shared/components/skeletonLoading/skeleton-classes";

export default function EditProfileSkeleton() {
  //to check it in later
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 sm:py-14">
      <Skeleton className={skeletonClasses.backLink} />

      <div className="mt-6 space-y-3">
        <Skeleton className={skeletonClasses.badge} />
        <Skeleton className={skeletonClasses.title} />
        <Skeleton className={skeletonClasses.description} />
      </div>

      <div className="mt-6 border-t border-line" />
      <div className="card-base mt-8 space-y-7">
        <section>
          <Skeleton className={skeletonClasses.label} />
          <div className="mt-2">
            <Skeleton className={skeletonClasses.description} />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className={skeletonClasses.avatar} />
            <Skeleton className={skeletonClasses.input} />
          </div>
        </section>

        <div className="border-t border-line" />

        <section className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className={skeletonClasses.label} />
              <Skeleton className={skeletonClasses.input} />
            </div>
          ))}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className={skeletonClasses.label} />
            <Skeleton className={skeletonClasses.textarea} />
          </div>
        </section>

        <div className="flex justify-end border-t border-line pt-6">
          <Skeleton className={skeletonClasses.button} />
        </div>
      </div>
    </main>
  );
}
