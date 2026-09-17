
import shared from "../shared/HomeShared.module.css";
import styles from "./HeroSection.module.css";
import buttonStyles from "../../ui/Button.module.css";

export default function HeroSection() {

    return (
          <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <span className="inline-block rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1 text-xs font-medium text-sky-300">
          Prototype &middot; your vehicle, understood
        </span>
        <h1 className={`${styles.title} mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl`}>
          The vehicle&apos;s entire life,{" "}
          <span className={shared.accentText}>in one workspace</span>
        </h1>
        <p id="question" className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          What is happening to this vehicle, why is it happening, and what
          will be the effect of the next decision?
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#timeline"
            className={`${buttonStyles.primary} ${styles.action} rounded-full px-6 py-3 text-sm font-semibold`}
          >
            View sample timeline
          </a>
          <a
            href="#modules"
            className={`${styles.secondaryButton} rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200`}
          >
            System modules
          </a>
        </div>

        <article className={`${shared.card} mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl p-4 text-left sm:p-5`}>
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium text-slate-500">Vehicle preview</span>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">All clear</span>
          </div>
          <div className="grid gap-4 pt-5 sm:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-950/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">BMW 320d · AB 1234 CD</p>
              <div className="mt-3 flex items-end justify-between">
                <div><p className="text-sm text-slate-400">Vehicle health</p><p className="mt-1 text-3xl font-semibold text-white">86<span className="text-base text-slate-500">/100</span></p></div>
                <span className="text-xs font-medium text-lime-200">Good condition</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[86%] rounded-full bg-gradient-to-r from-sky-400 to-lime-300 shadow-[0_0_14px_rgba(213,243,107,.35)]" /></div>
            </div>
            <div className="rounded-2xl border border-amber-300/15 bg-amber-300/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-200">Next up</p>
              <p className="mt-4 text-sm font-medium text-white">Technical inspection</p>
              <p className="mt-1 text-xs text-slate-400">In 24 days</p>
              <p className="mt-5 text-xs font-medium text-lime-200">Open vehicle →</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-700/50 bg-slate-950/30 px-4 py-3 text-xs">
            <span className="text-slate-400">Latest event</span><span className="font-medium text-slate-200">Bumper repair · 1 240 лв.</span>
          </div>
        </article>
      </section>
    )
}
