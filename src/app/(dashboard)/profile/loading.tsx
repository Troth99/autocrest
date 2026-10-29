

import { Skeleton } from "@/shared/components/skeletons/skeleton";

export default function Loading() {
    return (
        <main
            role="status"
            aria-busy="true"
            className="mx-auto w-full max-w-310 px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        >
            <div className="mb-8">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="mt-4 h-10 w-40" />
                <Skeleton className="mt-3 h-5 w-full max-w-sm" />
            </div>

            <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
                <div className="content-card rounded-3xl p-6">
                    <Skeleton className="size-20" />
                    <Skeleton className="mt-5 h-6 w-36" />
                    <Skeleton className="mt-3 h-4 w-full" />
                    <Skeleton className="mt-8 h-10 w-full" />
                    <Skeleton className="mt-3 h-10 w-full" />
                </div>

                <div className="content-card rounded-3xl p-6">
                    <Skeleton className="h-7 w-44" />
                    <Skeleton className="mt-3 h-4 w-full max-w-sm" />

                    <div className="mt-8 space-y-5">
                        <Skeleton className="h-9 w-full" />
                        <Skeleton className="h-9 w-full" />
                        <Skeleton className="h-9 w-full" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>
            </div>
        </main>
    );
}