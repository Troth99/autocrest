import { FileCheck2, ReceiptText, Wrench } from "lucide-react";

export default function VehicleMainActions() {
  return (
    <section aria-labelledby="vehicle-quick-actions" className="rounded-2xl border border-info-border bg-info-soft p-5 sm:p-6">
      <h2 id="vehicle-quick-actions" className="text-lg font-semibold">Manage your vehicle</h2>
      <p className="mt-1 text-sm text-muted">Keep servicing, expenses and documents together.</p>
      <div role="group" aria-label="Add vehicle records" className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Add service", icon: Wrench },
          { label: "Add expense", icon: ReceiptText },
          { label: "Add document", icon: FileCheck2 },
        ].map(({ label, icon: Icon }) => (
          <button key={label} type="button" disabled title={label + " is not connected yet"} className="vehicle-record-action">
            <Icon className="size-5 text-info" aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
    </section>
  );
}
