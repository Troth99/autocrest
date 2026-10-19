import Image from "next/image";

const euCountries = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI",
  "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
];

type Props = {
  plate: string;
  countryCode: string | null;
};

export default function VehiclePlate({ plate, countryCode }: Props) {
  const country = countryCode?.trim().toUpperCase();

  return (
    <span
      aria-label={`Registration plate ${plate}${country ? `, country ${country}` : ""}`}
      className="inline-flex min-h-12 max-w-full overflow-hidden rounded-lg border border-slate-400 bg-slate-100 text-slate-950 shadow-sm"
    >
      {country && (
        <span className="flex w-10 shrink-0 flex-col items-center justify-center gap-0.5 bg-blue-800 py-1 text-white">
          {euCountries.includes(country) && (
            <Image
              src="/images/eu-stars.svg"
              alt=""
              width={28}
              height={20}
              className="h-5 w-7"
              aria-hidden="true"
            />
          )}
          <span className="text-[10px] font-bold leading-none tracking-wide">{country}</span>
        </span>
      )}
      <span className="self-center break-all px-3 py-2 font-mono text-xl font-bold tracking-wider sm:text-2xl">{plate}</span>
    </span>
  );
}
