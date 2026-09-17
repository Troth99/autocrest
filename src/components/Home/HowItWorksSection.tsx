

const steps = [
  { step: "01", title: "Log an event", desc: "Any accident, service visit, or ownership change gets added to the vehicle's timeline." },
  { step: "02", title: "Everything links up", desc: "Damages, costs, parts, and deadlines attach automatically to that event." },
  { step: "03", title: "See the bigger picture", desc: "Understand current status and simulate the effect of the next decision." },
];


export default function HowItWorksSection() {
    return (
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
    )
}