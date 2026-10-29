

import PhoneInput from "react-phone-number-input";
import PhoneCountrySelect from "./PhoneCountrySelect";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
};

export default function PhoneEditSelector({ value, onChange, error }: Props) {
    return (
          <div className="form-field">
            <label htmlFor="phone">Phone number</label>

            <PhoneInput
              id="phone"
              name="phone"
              defaultCountry="BG"
              international
              countryCallingCodeEditable={false}
              countrySelectComponent={PhoneCountrySelect}
              className="flex min-w-0 items-center gap-2 [&_.PhoneInputInput]:min-w-0"
              value={value || undefined}
              onChange={(nextValue) => onChange(nextValue ?? "")}

              inputComponent="input"
              placeholder="Phone number"
            />
            <div role="alert" className="min-h-5 text-sm text-destructive">
              {error}
            </div>
          </div>
    );
}
