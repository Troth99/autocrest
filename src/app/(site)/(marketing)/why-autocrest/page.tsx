import { OwnershipSection } from "@/features/marketing";

export default function WhyAutoCrestPage() {
  return (
    <main className="marketing-home w-full py-10 text-text-primary">
      <div className="mx-auto max-w-[112rem] px-4 sm:px-6">
        <h1 className="page-title">Why AutoCrest</h1>
        <p className="mt-3 section-description">
          Keep your vehicles, service history and important details together.
        </p>
      </div>
      <OwnershipSection />
    </main>
  );
}
