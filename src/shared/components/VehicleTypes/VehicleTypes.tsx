import { vehicleTypes } from "@/shared/constants/vehicle-types";

export default function VehicleTypes() {
  return (
    <ul className="vehicle-types" aria-label="Vehicle types">
      {vehicleTypes.map(({ value, label, icon: Icon }) => (
        <li key={value} className="vehicle-types-item">
          <Icon className="h-7 w-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide">{label}</span>
        </li>
      ))}
    </ul>
  );
}
