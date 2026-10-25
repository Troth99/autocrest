import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, ReceiptText, Wrench } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="marketing-hero">
      <Image src="/images/garage/bmw.jpg" alt="BMW, ready for the next journey" fill priority sizes="100vw" className="-z-20 object-cover object-[65%_center]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950 via-slate-950/85 to-slate-950/10" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-xl text-white">
          <span className="eyebrow">YOUR DIGITAL GARAGE</span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.06] tracking-[-0.05em] text-white sm:text-6xl">Your vehicle&apos;s life.<br /><span className="text-violet-200">Finally in one place.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">Track maintenance, documents, expenses, and what&apos;s next, without the mess of notes, invoices, and forgotten dates.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/register" className="button-primary button-base gap-2 px-6 py-3.5 text-sm">Start your garage <ArrowRight className="size-4" /></Link><a href="#how-it-works" className="button-base border border-white/25 bg-slate-950/50 px-6 py-3.5 text-sm text-white">See how it works</a></div>
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-7">{[{ label: "Maintenance", detail: "Keep your history", icon: Wrench }, { label: "Documents", detail: "Stay organised", icon: FileText }, { label: "Expenses", detail: "See your costs", icon: ReceiptText }].map(({ label, detail, icon: Icon }) => <div key={label}><span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-info-soft text-info"><Icon className="size-5" /></span><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-slate-300">{detail}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}
