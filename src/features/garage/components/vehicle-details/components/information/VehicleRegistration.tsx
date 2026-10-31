import { FileText } from "lucide-react";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";
import type { Vehicle } from "@/features/garage/types/vehicle";

export default function VehicleRegistration({ vehicle }: { vehicle: Vehicle }) {
  const fields = [
    ["Registration plate", vehicle.plate], ["Country", vehicle.registrationCountryCode],
    ["First registration", vehicle.firstRegistrationDate], ["VIN", vehicle.vin],
    ["Certificate number", vehicle.registrationCertificateNumber],
    ["Vehicle use", vehicle.vehicleUse],
  ] as const;
  return (
    <section className="section-card">
      <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight"><FileText className="size-5 text-info" aria-hidden="true" /> Registration &amp; documents</h2>
      <dl className="divide-y divide-line">
        {fields.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-4 py-2.5 text-sm">
            <dt className="text-muted">{label}</dt>
            <dd className="wrap-break-word font-medium">{formatVehicleValue(value)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">Document uploads and insurance records are coming soon.</p>
    </section>
  );
}
