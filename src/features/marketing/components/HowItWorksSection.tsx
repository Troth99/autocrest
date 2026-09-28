import { BellRing, CarFront, ClipboardList } from "lucide-react";

const steps = [
  { step: "01", title: "Add your vehicle", description: "Start with the basics: make, model, year, mileage, and VIN when you have it.", icon: CarFront },
  { step: "02", title: "Record everything", description: "Keep services, repairs, expenses, documents, and mileage in one clear timeline.", icon: ClipboardList },
  { step: "03", title: "Stay prepared", description: "See what is due next and get reminders before important dates arrive.", icon: BellRing },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">SIMPLE BY DESIGN</span>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">One clear place for your car&apos;s life</h2>
        <p className="mt-4 text-sm leading-6 text-muted sm:text-base">No automotive expertise needed. Just capture what happens and let AutoCrest keep it organised.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map(({ step, title, description, icon: Icon }) => (
          <article key={step} className="content-card rounded-3xl p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-info-soft text-info"><Icon className="size-5" /></span>
              <span className="text-xs font-bold tracking-[0.16em] text-accent-text">{step}</span>
            </div>
            <h3 className="mt-7 text-lg font-semibold tracking-[-0.025em] text-text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
