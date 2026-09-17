import Link from "next/link";

const modules = [
  { label: "Events", desc: "A full timeline of everything that happened to the vehicle.", color: "#60a5fa" },
  { label: "Damages", desc: "Insurance claims and their processing status.", color: "#f87171" },
  { label: "Service records", desc: "History of visits, repairs, and labor performed.", color: "#34d399" },
  { label: "Parts", desc: "Parts used, suppliers, and prices.", color: "#fbbf24" },
  { label: "Costs", desc: "Every cost, categorized and summarized.", color: "#a78bfa" },
  { label: "Deadlines", desc: "Insurance, inspections, warranties — what's coming up.", color: "#f472b6" },
  { label: "Organizations", desc: "Insurers, service centers, parts suppliers.", color: "#38bdf8" },
];

const stats = [
  { value: "1", label: "vehicle in this demo" },
  { value: "4", label: "events in the timeline" },
  { value: "7", label: "connected modules" },
];

const steps = [
  { step: "01", title: "Log an event", desc: "Any accident, service visit, or ownership change gets added to the vehicle's timeline." },
  { step: "02", title: "Everything links up", desc: "Damages, costs, parts, and deadlines attach automatically to that event." },
  { step: "03", title: "See the bigger picture", desc: "Understand current status and simulate the effect of the next decision." },
];

const timeline = [
  { date: "Mar 12, 2025", type: "Purchase", title: "Vehicle purchased by first owner", color: "#38bdf8" },
  { date: "Jul 04, 2025", type: "Accident", title: "Minor collision — damage to front bumper", color: "#f87171" },
  { date: "Jul 18, 2025", type: "Service", title: "Bumper repair, headlight replacement", color: "#34d399" },
  { date: "Nov 02, 2025", type: "Inspection", title: "Annual technical inspection — passed", color: "#fbbf24" },
];

const footerColumns = [
  {
    heading: "Product",
    links: ["Modules", "Timeline", "Pricing", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API", "Status", "Support"],
  },
];

function TwinIllustration() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="mx-auto h-auto w-full max-w-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="160" cy="140" rx="120" ry="10" fill="#38bdf8" opacity="0.08" />
      <path
        d="M40 108c0-8 6-14 14-16l18-4 14-22c3-5 9-8 15-8h60c8 0 15 4 19 11l12 20 20 5c8 2 14 9 14 17v10c0 6-5 11-11 11H51c-6 0-11-5-11-11v-13Z"
        fill="#1e293b"
        stroke="#38bdf8"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <rect x="96" y="66" width="90" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.4" />
      <circle cx="88" cy="118" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="88" cy="118" r="4" fill="#38bdf8" />
      <circle cx="222" cy="118" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="222" cy="118" r="4" fill="#38bdf8" />
      {[
        [70, 40],
        [160, 20],
        [250, 46],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={160} y2={80} stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="3 3" />
          <circle cx={x} cy={y} r="5" fill="#38bdf8" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <div className="dt-hero min-h-screen text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-700/40 bg-slate-950/60 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sm font-bold text-sky-400">
              VT
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-200">
              Vehicle Lifecycle <span className="dt-accent-text">Digital Twin</span>
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#modules" className="hover:text-slate-100">Modules</a>
            <a href="#how-it-works" className="hover:text-slate-100">How it works</a>
            <a href="#timeline" className="hover:text-slate-100">Timeline</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden text-sm font-medium text-slate-300 hover:text-slate-100 sm:block">
              Sign in
            </a>
            <a
              href="#timeline"
              className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-transform hover:scale-105"
            >
              Get started
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <span className="inline-block rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1 text-xs font-medium text-sky-300">
          Prototype &middot; connected to Supabase
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          The vehicle&apos;s entire life,{" "}
          <span className="dt-accent-text">in one workspace</span>
        </h1>
        <p id="question" className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          What is happening to this vehicle, why is it happening, and what
          will be the effect of the next decision?
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#timeline"
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-transform hover:scale-105"
          >
            View sample timeline
          </a>
          <a
            href="#modules"
            className="rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
          >
            System modules
          </a>
        </div>

        <div className="mx-auto mt-14 max-w-md">
          <TwinIllustration />
        </div>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="dt-card rounded-2xl px-4 py-5">
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-2 text-center text-2xl font-semibold text-white">
          What the app connects
        </h2>
        <p className="mb-10 text-center text-sm text-slate-400">
          Every module is linked to the vehicle and to the other modules
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {modules.map((m) => (
            <div key={m.label} className="dt-card rounded-2xl p-6">
              <span className="dt-dot mb-4" style={{ background: m.color, color: m.color }} />
              <h3 className="text-base font-semibold text-white">{m.label}</h3>
              <p className="mt-2 text-sm text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-2 text-center text-2xl font-semibold text-white">
          How it works
        </h2>
        <p className="mb-10 text-center text-sm text-slate-400">
          Three steps from a single event to the full picture
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="dt-card rounded-2xl p-6">
              <span className="dt-accent-text text-xs font-bold tracking-widest">{s.step}</span>
              <h3 className="mt-2 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Example: BMW 320d &middot; AB 1234 CD
        </h2>
        <p className="mb-10 text-sm text-slate-400">
          Sample timeline &mdash; static data for now, real events will come from the database
        </p>
        <ol className="relative ml-2 border-l border-slate-700 pl-8">
          {timeline.map((event) => (
            <li key={event.date} className="dt-card relative mb-4 rounded-xl p-5">
              <span
                className="dt-dot absolute left-[-2.325rem] top-6"
                style={{ background: event.color, color: event.color }}
              />
              <time className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {event.date} &middot; {event.type}
              </time>
              <p className="mt-1 text-base text-slate-100">{event.title}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sm font-bold text-sky-400">
                VT
              </span>
              <p className="mt-3 max-w-[16rem] text-sm text-slate-400">
                A digital twin for every vehicle&apos;s history, status, and next decision.
              </p>
            </div>
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-semibold text-slate-100">{col.heading}</h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-slate-100">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700/40 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>&copy; 2026 Vehicle Lifecycle Digital Twin. Prototype build.</span>
            <span>Not yet connected to real database data.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

