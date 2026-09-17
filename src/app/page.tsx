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

const timeline = [
  { date: "Mar 12, 2025", type: "Purchase", title: "Vehicle purchased by first owner", color: "#38bdf8" },
  { date: "Jul 04, 2025", type: "Accident", title: "Minor collision — damage to front bumper", color: "#f87171" },
  { date: "Jul 18, 2025", type: "Service", title: "Bumper repair, headlight replacement", color: "#34d399" },
  { date: "Nov 02, 2025", type: "Inspection", title: "Annual technical inspection — passed", color: "#fbbf24" },
];

export default function Home() {
  return (
    <div className="dt-hero min-h-screen text-zinc-100">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-wide text-zinc-200">
          Vehicle Lifecycle <span className="dt-glow-text">Digital Twin</span>
        </span>
        <div className="hidden gap-6 text-sm text-zinc-400 sm:flex">
          <a href="#modules" className="hover:text-zinc-100">Modules</a>
          <a href="#timeline" className="hover:text-zinc-100">Timeline</a>
          <a href="#question" className="hover:text-zinc-100">The idea</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-12 text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-zinc-400">
          Prototype &middot; connected to Supabase
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          The vehicle&apos;s entire life,{" "}
          <span className="dt-glow-text">in one workspace</span>
        </h1>
        <p id="question" className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          What is happening to this vehicle, why is it happening, and what
          will be the effect of the next decision?
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#timeline"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105"
          >
            View sample timeline
          </a>
          <a
            href="#modules"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
          >
            System modules
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="dt-card rounded-2xl px-4 py-5">
              <div className="text-2xl font-semibold text-zinc-50">{s.value}</div>
              <div className="mt-1 text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-2 text-center text-2xl font-semibold text-zinc-50">
          What the app connects
        </h2>
        <p className="mb-10 text-center text-sm text-zinc-500">
          Every module is linked to the vehicle and to the other modules
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {modules.map((m) => (
            <div key={m.label} className="dt-card rounded-2xl p-6">
              <span className="dt-dot mb-4" style={{ background: m.color }} />
              <h3 className="text-base font-semibold text-zinc-50">{m.label}</h3>
              <p className="mt-2 text-sm text-zinc-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-2 text-2xl font-semibold text-zinc-50">
          Example: BMW 320d &middot; AB 1234 CD
        </h2>
        <p className="mb-10 text-sm text-zinc-500">
          Sample timeline — static data for now, real events will come from the database
        </p>
        <ol className="relative ml-2 border-l border-white/10 pl-8">
          {timeline.map((event) => (
            <li key={event.date} className="dt-card relative mb-4 rounded-xl p-5">
              <span
                className="dt-dot absolute left-[-2.325rem] top-6"
                style={{ background: event.color }}
              />
              <time className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {event.date} &middot; {event.type}
              </time>
              <p className="mt-1 text-base text-zinc-100">{event.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-600">
        Prototype — the interface is not yet connected to real database data.
      </footer>
    </div>
  );
}

