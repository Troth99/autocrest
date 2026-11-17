const steps = [
  {
    title: "Add your vehicle",
    description: "Create a home for each vehicle with the key details.",
  },
  {
    title: "Record the work",
    description: "Add services, repairs and costs as they happen.",
  },
  {
    title: "See what comes next",
    description: "Keep track of upcoming service and stay in control.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="marketing-section">
      <h2 id="how-it-works-title" className="marketing-section-title">
        From scattered records to a story.
      </h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-0">
        {steps.map(({ title, description }, index) => (
          <li key={title} className="relative px-4 text-center">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-4 hidden h-px bg-info-border md:block"
                aria-hidden="true"
              />
            )}
            <span
              className="relative mx-auto flex size-8 items-center justify-center rounded-full border border-info bg-background text-sm font-semibold text-accent-text"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-text-primary">{title}</h3>
            <p className="marketing-copy mx-auto mt-1 max-w-xs">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
