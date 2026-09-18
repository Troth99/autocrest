import styles from "../shared/HomeShared.module.css";

const timeline = [
  {
    date: "Mar 12, 2025",
    type: "Purchase",
    title: "Vehicle purchased by first owner",
    color: "#38bdf8",
  },
  {
    date: "Jul 04, 2025",
    type: "Accident",
    title: "Minor collision — damage to front bumper",
    color: "#f87171",
  },
  {
    date: "Jul 18, 2025",
    type: "Service",
    title: "Bumper repair, headlight replacement",
    color: "#34d399",
  },
  {
    date: "Nov 02, 2025",
    type: "Inspection",
    title: "Annual technical inspection — passed",
    color: "#fbbf24",
  },
];

export default function TimeLineSection() {
  return (
    <section id="timeline" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-2 text-2xl font-semibold text-white">
        Example: BMW 320d &middot; AB 1234 CD
      </h2>
      <p className="mb-10 text-sm text-slate-400">
        Sample timeline &mdash; static data for now, real events will come from
        the database
      </p>
      <ol className="relative ml-2 border-l border-slate-700 pl-8">
        {timeline.map((event) => (
          <li key={event.date} className={`${styles.card} relative mb-4 rounded-xl p-5`}>
            <span
                className={`${styles.dot} absolute left-[-2.325rem] top-6`}
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
  );
}
