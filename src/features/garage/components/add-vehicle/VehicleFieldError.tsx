import { FieldError } from "@/shared/components/FieldError/FieldError";

export default function VehicleFieldError({ field, message }: { field: string; message?: string }) {
  if (!message) return null;

  return (
    <div id={`${field}-error`} role="alert">
      <FieldError message={message} />
    </div>
  );
}
