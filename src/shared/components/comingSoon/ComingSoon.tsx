import Link from "next/link";
import { ArrowLeft, Sparkles, Clock3 } from "lucide-react";

type ComingSoonProps = {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export default function ComingSoon({
  title = "Something new is on the way",
  description = "We’re working on this feature. Check back soon to see what’s new.",
  backHref,
  backLabel = "Go back",
}: ComingSoonProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-panel px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto mb-8 flex size-28 items-center justify-center rounded-full border border-info-border bg-info-soft">
        <Sparkles className="size-14 stroke-[1.25] text-info" aria-hidden="true" />
        <span className="absolute -bottom-1 -right-1 flex size-10 items-center justify-center rounded-xl border border-line bg-popover text-accent-text shadow-lg">
          <Clock3 className="size-5" aria-hidden="true" />
        </span>
      </div>
      <span className="eyebrow">Coming soon</span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
      <p className="section-description mx-auto mt-4 max-w-sm">{description}</p>
      {backHref && (
        <Link href={backHref} className="action-button mt-8 justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-info">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </Link>
      )}
    </section>
  );
}
