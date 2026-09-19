import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/shared/components/FieldError/FieldError";
import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

type PasswordFieldProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
};

export function PasswordField({
  id,
  label,
  error,
  hint = "At least 8 characters",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-2">
      <div className="field-row">
        <label htmlFor={id}>{label}</label>
        {hint && <span className="field-hint">{hint}</span>}
      </div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          autoComplete="new-password"
          className="form-input pr-12"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((visible) => !visible)}
          className="absolute right-1 bottom-2.5 top-auto cursor-pointer"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      <FieldError message={error} />
    </div>
  );
}
