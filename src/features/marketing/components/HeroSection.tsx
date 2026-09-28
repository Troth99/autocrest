import Link from "next/link";
import { ArrowRight, CalendarClock, CarFront, FileText, Wrench } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 text-center sm:pb-20 sm:pt-24">
      <span className="eyebrow">YOUR DIGITAL GARAGE</span>
      <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-text-primary sm:text-6xl">
        Your car&apos;s life. <span className="text-accent-text">Finally in one place.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Track maintenance, documents, expenses, and what&apos;s next — without the mess of notes, invoices, and forgotten dates.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/register" className="button-primary button-base gap-2 px-5 py-3 text-sm">
          Start your garage <ArrowRight className="size-4" />
        </Link>
        <a href="#how-it-works" className="button-secondary button-base px-5 py-3 text-sm">
          See how it works
        </a>
      </div>

      <div className="content-card mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl p-4 text-left sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-400" />
            <span className="size-2 rounded-full bg-amber-300" />
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-semibold text-subtle">MY GARAGE</span>
          </div>
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-text">All clear</span>
        </div>

        <div className="grid gap-4 pt-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-hero-preview-border bg-hero-preview p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-info-soft text-info"><CarFront className="size-5" /></div>
                <p className="mt-4 text-lg font-semibold text-text-primary">BMW 320d</p>
                <p className="mt-1 text-sm text-muted">2018 · 142,380 km</p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">Healthy</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <PreviewStat icon={<Wrench />} label="Last service" value="12 days ago" />
              <PreviewStat icon={<FileText />} label="Documents" value="6 saved" />
              <PreviewStat icon={<CalendarClock />} label="Next due" value="In 24 days" />
            </div>
          </div>

          <div className="rounded-2xl border border-hero-next-border bg-hero-next p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-200">NEXT UP</p>
            <p className="mt-5 text-lg font-semibold text-text-primary">Technical inspection</p>
            <p className="mt-2 text-sm leading-6 text-muted">Due in 24 days. Keep the vehicle ready and avoid missing the deadline.</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[70%] rounded-full bg-linear-to-r from-sky-400 to-lime-300 shadow-hero-progress" /></div>
            <p className="mt-3 text-xs font-semibold text-accent-text">Reminder ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-input/55 p-3">
      <span className="text-info [&>svg]:size-4">{icon}</span>
      <p className="mt-3 text-xs text-muted">{label}</p>
      <p className="mt-1 text-xs font-semibold text-text-primary">{value}</p>
    </div>
  );
}
