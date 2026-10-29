

function SkeletonDetails() {
    return (
        <div className="section-card space-y-5">
            <div className="h-6 w-40 rounded bg-info-soft" />
            <div className="grid grid-cols-2 gap-5">
                {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="h-3 w-16 rounded bg-info-soft" />
                        <div className="h-5 w-24 rounded bg-info-soft" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main
            role="status"
            aria-busy="true"
            className="page-shell"
        >
            <span className="sr-only">Loading vehicle details...</span>

            <div
                aria-hidden="true"
                className="space-y-6 motion-safe:animate-pulse"
            >
                <div className="section-card">
                    <div className="flex flex-wrap items-start gap-5">
                        <div className="w-full shrink-0 space-y-3 sm:w-72 lg:w-80">
                            <div className="aspect-16/10 rounded-xl bg-info-soft" />
                            <div className="h-10 w-36 rounded-lg bg-info-soft" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-4">
                            <div className="h-3 w-40 rounded bg-info-soft" />
                            <div className="h-10 w-64 max-w-full rounded-lg bg-info-soft" />
                            <div className="h-4 w-44 rounded bg-info-soft" />
                            <div className="h-10 w-32 rounded-lg bg-info-soft" />
                        </div>

                        <div className="w-full space-y-3 sm:w-44">
                            <div className="h-10 rounded-lg bg-info-soft" />
                            <div className="h-10 rounded-lg bg-info-soft" />
                            <div className="h-10 rounded-lg bg-info-soft" />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-3 w-16 rounded bg-info-soft" />
                                <div className="h-6 w-24 rounded bg-info-soft" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                    <div className="section-card space-y-6">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <div className="h-12 rounded-lg bg-info-soft" />
                            <div className="h-12 rounded-lg bg-info-soft" />
                            <div className="h-12 rounded-lg bg-info-soft" />
                        </div>

                        <div className="space-y-5 border-t border-line pt-6">
                            <div className="h-7 w-56 max-w-full rounded bg-info-soft" />
                            <div className="h-4 w-full rounded bg-info-soft" />
                            <div className="h-24 rounded-xl bg-info-soft" />
                            <div className="h-24 rounded-xl bg-info-soft" />
                            <div className="h-24 rounded-xl bg-info-soft" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <SkeletonDetails />
                        <SkeletonDetails />
                    </div>
                </div>
            </div>
        </main>
    );
}