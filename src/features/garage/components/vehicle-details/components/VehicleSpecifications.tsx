import { Cog } from "lucide-react";

// Static preview data and layout.
const specifications = [
    { label: "Make", value: "Volkswagen" },
    { label: "Model", value: "Golf" },
    { label: "Manufacture year", value: "2018" },
    { label: "Trim / variant", value: "1.4 TSI Comfortline" },
    { label: "Fuel type", value: "Petrol" },
    { label: "Transmission", value: "Manual" },
    { label: "Drivetrain", value: "Front-wheel drive" },
    { label: "Engine capacity", value: "1,395 cc" },
    { label: "Power", value: "125 hp" },
    { label: "Emissions standard", value: "Euro 6" },
    { label: "Colour", value: "Grey" },
    { label: "Seats", value: "5" },
];

export default function VehicleSpecifications() {
  return (
    <section className="section-card">
        <div className="mb-6 flex items-center gap-3"><Cog className="size-5 text-info" aria-hidden="true" /><h2 className="text-lg font-semibold">Vehicle specifications</h2></div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {specifications.map(({ label, value }) => (
                <div key={label}><dt className="detail-label">{label}</dt><dd className="detail-value">{value}</dd></div>
            ))}
        </dl>
    </section>
  );
}
