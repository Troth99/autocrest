import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "One timeline instead of scattered notes and invoices",
  "Clear reminders before important deadlines",
  "A better picture of what owning your car really costs",
  "A shareable history when you are ready to sell",
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="eyebrow">BUILT FOR CLARITY</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">Know what happened. Know what comes next.</h2>
          <p className="mt-5 text-sm leading-7 text-muted sm:text-base">AutoCrest turns everyday vehicle ownership into a history you can understand, trust, and use to make the next decision.</p>
          <ul className="mt-7 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm leading-6 text-text-secondary">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-text"><Check className="size-3.5" /></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-panel p-6 shadow-[0_18px_40px_rgb(0_0_0/18%),inset_0_1px_rgb(255_255_255/4%)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-info">YOUR NEXT DECISION</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-text-primary">Service due soon</h3>
          <p className="mt-2 text-sm leading-6 text-muted">Oil and filter service is due in approximately 1,200 km.</p>
          <div className="mt-7 space-y-4 border-l border-line pl-5">
            <TimelineItem date="12 days ago" title="Mileage updated" detail="142,380 km recorded" />
            <TimelineItem date="2 months ago" title="Oil and filter service" detail="240.00 BGN logged" />
            <TimelineItem date="6 months ago" title="Insurance document added" detail="Valid until 18 Sep 2027" />
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-accent/20 bg-accent/10 px-6 py-10 text-center sm:mt-24 sm:px-10 sm:py-14">
        <h2 className="text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">Start building your car&apos;s story.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">Bring every important detail together and always know what your vehicle needs next.</p>
        <Link href="/register" className="button-primary button-base mt-7 gap-2 px-5 py-3 text-sm">Create your free garage <ArrowRight className="size-4" /></Link>
      </div>
    </section>
  );
}

function TimelineItem({ date, title, detail }: { date: string; title: string; detail: string }) {
  return (
    <div className="relative">
      <span className="absolute -left-[1.7rem] top-1.5 size-2 rounded-full bg-info shadow-[0_0_10px_currentColor]" />
      <p className="text-xs font-semibold text-subtle">{date}</p>
      <p className="mt-1 text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-muted">{detail}</p>
    </div>
  );
}
