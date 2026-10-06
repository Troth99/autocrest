import { LoaderCircle } from "lucide-react";
import { Skeleton } from "@/shared/components/skeletons/skeleton";

export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14"
      role="status"
      aria-busy="true"
    >
      <div className="mb-8">
        <Skeleton className="h-7 w-40 rounded-full" />
        <Skeleton className="mt-4 h-9 w-48 sm:h-10" />
        <Skeleton className="mt-2 h-6 w-full max-w-lg" />
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="content-card flex items-center gap-4 rounded-2xl p-5"
          >
            <Skeleton className="size-11 shrink-0 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="mt-1 h-4 w-40 max-w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="panel-card flex min-h-60 flex-col items-center justify-center px-6 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-info-soft text-info">
          <LoaderCircle
            className="size-7 motion-safe:animate-spin"
            aria-hidden="true"
          />
        </span>
        <h2 className="section-title mt-5">Loading your vehicles...</h2>
        <p className="section-description mt-2">Getting your garage ready.</p>
      </div>
    </main>
  );
}
