import VehicleFormField from "@/features/garage/components/add-vehicle/VehicleFormField";
import type { sections } from "@/features/garage/components/add-vehicle/vehicle-form-fields";

type Props = {
  section: (typeof sections)[number];
};

export default function VehicleFormSection({ section }: Props) {
  return (
    <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
      <legend className="sr-only">{section.title}</legend>
      <h2 className="section-title">{section.title}</h2>
      <p className="mt-1 text-sm text-muted">{section.description}</p>
      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.fields.map((field) => (
          <VehicleFormField key={field.name} field={field} />
        ))}
      </div>
    </fieldset>
  );
}
