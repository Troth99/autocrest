"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown, Globe } from "lucide-react";
import type { FocusEventHandler } from "react";
import { getCountryCallingCode, type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

function CountryFlag({ country }: { country?: Country }) {
  const Flag = country ? flags[country] : undefined;

  return (
    <span aria-hidden="true" className="flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-xs [&>svg]:size-full">
      {Flag ? <Flag title={country ?? ""} /> : <Globe className="text-muted" />}
    </span>
  );
}

type Props = {
  value?: Country;
  onChange: (value?: Country) => void;
  options: { value?: Country; label: string; divider?: boolean }[];
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
};

export default function PhoneCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  onFocus,
  onBlur,
}: Props) {
  return (
    <Select.Root
      value={value ?? ""}
      onValueChange={(country) =>
        onChange((country || undefined) as Country | undefined)
      }
      disabled={disabled || readOnly}
    >
      <Select.Trigger
        aria-label="Phone country"
        title={options.find((option) => option.value === value)?.label}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-input bg-input/30 px-2.5 text-sm text-text-primary outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
      >
        <CountryFlag country={value} />
        <span>{value ?? "INT"}</span>
        <ChevronDown className="size-3.5 text-muted" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          align="start"
          sideOffset={6}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <Select.Popup className="max-h-[min(18rem,var(--available-height))] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-line bg-popover p-1.5 text-popover-foreground shadow-xl outline-none">
            <Select.List>
              {options
                .filter((option) => !option.divider)
                .map((option) => (
                  <Select.Item
                    key={option.value ?? "international"}
                    value={option.value ?? ""}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none data-highlighted:bg-info-soft data-highlighted:text-info"
                  >
                    <CountryFlag country={option.value} />
                    <Select.ItemText className="min-w-0 flex-1">
                      {option.label}
                    </Select.ItemText>
                    {option.value ? (
                      <span className="text-xs text-muted">
                        +{getCountryCallingCode(option.value)}
                      </span>
                    ) : null}
                    <Select.ItemIndicator>
                      <Check className="size-3.5" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
