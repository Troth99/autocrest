import { FileCheck2, ReceiptText, Wrench } from "lucide-react";

export default function VehicleMainActions() {
  return (
    <div role="group" aria-label="Add vehicle records" className="grid gap-3 sm:grid-cols-3">
      {[
        { label: "Add service", icon: Wrench },
        { label: "Add expense", icon: ReceiptText },
        { label: "Add document", icon: FileCheck2 },
      ].map(({ label, icon: Icon }, index) => (
        <button key={label} type="button" disabled title={label + " is not connected yet"}
          className={`button-base justify-center gap-2 px-3 py-3.5 text-sm disabled:cursor-not-allowed ${index === 0 ? "button-primary" : "button-secondary border"}`}>
          <Icon className="size-5 shrink-0" aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  );
}
