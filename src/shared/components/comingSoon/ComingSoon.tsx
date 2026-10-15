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
    <section className="coming-soon-panel">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent" aria-hidden="true" />
      <div className="coming-soon-icon">
        <Sparkles className="size-14 stroke-[1.25] text-info" aria-hidden="true" />
        <span className="coming-soon-badge">
          <Clock3 className="size-5" aria-hidden="true" />
        </span>
      </div>
      <span className="eyebrow">Coming soon</span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
      <p className="section-description mx-auto mt-4 max-w-sm">{description}</p>
      {backHref && (
        <Link href={backHref} className="coming-soon-action">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </Link>
      )}
    </section>
  );
}
