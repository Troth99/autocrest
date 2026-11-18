import { CarFront, FileText, Images } from "lucide-react";

const benefits = [
  {
    title: "Multiple vehicle types",
    description:
      "Cars, motorcycles, ATVs, vans, trucks, campers, trailers, and more - all in one garage.",
    icon: CarFront,
  },
  {
    title: "Private photos",
    description:
      "Keep photos of your vehicle, work, and important details in one place.",
    icon: Images,
  },
  {
    title: "Downloadable reports",
    description:
      "Export service history, costs, and key details in a clear PDF.",
    icon: FileText,
  },
];

export default function OwnershipSection() {
  return (
    <section
      id="timeline"
      aria-labelledby="ownership-title"
      className="marketing-section"
    >
      <h2
        id="ownership-title"
        className="marketing-section-title"
      >
        Built around your ownership.
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {benefits.map(({ title, description, icon: Icon }) => (
          <article key={title} className="section-card h-full">
            <Icon
              className="size-7 text-accent-text"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3 className="mt-3 text-lg font-semibold text-text-primary">{title}</h3>
            <p className="marketing-copy mt-1">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
