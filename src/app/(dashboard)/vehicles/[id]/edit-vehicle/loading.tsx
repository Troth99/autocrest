function SkeletonField() {
    return (
        <div className="space-y-2">
            <div className="h-3 w-1/2 rounded bg-info-soft" />
            <div className="h-11 rounded-lg bg-info-soft" />
        </div>
    );
}

function SkeletonSection() {
    return (
        <div className="section-card space-y-5">
            <div className="h-5 w-36 rounded bg-info-soft" />
            <div className="grid grid-cols-2 gap-4">
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main role="status" className="page-shell">
            <span className="sr-only">Loading edit form...</span>
            <div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse">
                <div className="h-10 w-64 max-w-full rounded-lg bg-info-soft" />
                <div className="grid gap-5 xl:grid-cols-2">
                    <SkeletonSection />
                    <SkeletonSection />
                    <SkeletonSection />
                    <SkeletonSection />
                </div>
            </div>
        </main>
    );
}
