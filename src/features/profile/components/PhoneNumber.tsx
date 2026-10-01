import { parsePhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import countryNames from "react-phone-number-input/locale/en.json";

export default function PhoneNumber({ value }: { value: string | null }) {
  const phoneNumber = value ? parsePhoneNumber(value, "BG") : undefined;
  const country = phoneNumber?.country;
  const Flag = country ? flags[country] : undefined;
  const countryName = country ? countryNames[country] : "";

  return (
    <span className="inline-flex items-center gap-2">
      {Flag ? (
        <span title={countryName} className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs [&>svg]:size-full">
          <Flag title={countryName} />
        </span>
      ) : null}
      <span>{phoneNumber?.formatInternational() ?? (value || "Not added")}</span>
    </span>
  );
}
