import { Input } from "@/shared/components/ui/input";
import {
  optionLabels,
  type Field,
} from "@/features/garage/components/add-vehicle/vehicle-form-fields";

type Props = {
  field: Field;
};

const controlClass =
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-text-primary outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export default function VehicleFormField({ field }: Props) {
  return (
    <>
      <label
        htmlFor={field.name}
        className="grid gap-2 text-sm font-medium text-text-secondary"
      >
        <span>
          {field.label}
          {field.required && " *"}
        </span>
        {field.options ? (
          <select
            id={field.name}
            name={field.name}
            defaultValue=""
            className={controlClass}
          >
            <option value="" className="bg-panel text-text-primary">Not specified</option>
            {field.options.map((option) => (
              <option key={option} value={option} className="bg-panel text-text-primary">
                {optionLabels[option] ??
                  option
                    .replaceAll("_", " ")
                    .replace(/^./, (letter) => letter.toUpperCase())}
              </option>
            ))}
          </select>
        ) : (
          <Input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            placeholder={field.placeholder}
            required={field.required}
            min={field.type === "number" ? 0 : undefined}
            step={field.step}
          />
        )}
      </label>
    </>
  );
}
