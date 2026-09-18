import styles from "../shared/HomeShared.module.css";

//to replace with dynamic data from the database in the future
const modules = [
  {
    label: "Events",
    desc: "A full timeline of everything that happened to the vehicle.",
    color: "#60a5fa",
  },
  {
    label: "Damages",
    desc: "Insurance claims and their processing status.",
    color: "#f87171",
  },
  {
    label: "Service records",
    desc: "History of visits, repairs, and labor performed.",
    color: "#34d399",
  },
  {
    label: "Parts",
    desc: "Parts used, suppliers, and prices.",
    color: "#fbbf24",
  },
  {
    label: "Costs",
    desc: "Every cost, categorized and summarized.",
    color: "#a78bfa",
  },
  {
    label: "Deadlines",
    desc: "Insurance, inspections, warranties — what's coming up.",
    color: "#f472b6",
  },
  {
    label: "Organizations",
    desc: "Insurers, service centers, parts suppliers.",
    color: "#38bdf8",
  },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-2 text-center text-2xl font-semibold text-white">
        What the app connects
      </h2>
      <p className="mb-10 text-center text-sm text-slate-400">
        Every module is linked to the vehicle and to the other modules
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {modules.map((m) => (
          <div key={m.label} className={`${styles.card} rounded-2xl p-6`}>
            <span
              className={`${styles.dot} mb-4`}
              style={{ background: m.color, color: m.color }}
            />
            <h3 className="text-base font-semibold text-white">{m.label}</h3>
            <p className="mt-2 text-sm text-slate-400">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
