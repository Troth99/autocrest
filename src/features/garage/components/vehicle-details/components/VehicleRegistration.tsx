import { ClipboardList } from "lucide-react";

// Static preview data and layout.
const registration = [
    { label: "Registration plate", value: "CB1234AB" },
    { label: "Country", value: "Bulgaria (BG)" },
    { label: "First registration", value: "15 May 2018" },
    { label: "VIN", value: "Not provided" },
    { label: "Certificate number", value: "Not provided" },
    { label: "Vehicle use", value: "Personal" },
];

export default function VehicleRegistration() {
  return (
    <section className="section-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3"><ClipboardList className="size-5 text-info" aria-hidden="true" /><h2 className="text-lg font-semibold">Registration & documents</h2></div>
        </div>
        <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {registration.map(({ label, value }) => (
                <div key={label}><dt className="detail-label">{label}</dt><dd className="detail-value">{value}</dd></div>
            ))}
        </dl>
    </section>
  );
}
