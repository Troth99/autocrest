"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, Search } from "lucide-react";

type Option = {
  id: string;
  name: string;
};

type Props = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  errorId?: string;
};

export default function VehicleCatalogSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  errorId,
}: Props) {
  
  function getOptionLabel(item: Option) {
    return item.name;
  }

  function getOptionValue(item: Option) {
    return item.id;
  }

  function isSameOption(item: Option, selected: Option) {
    return item.id === selected.id;
  }

  function filterOptions(item: Option, query: string) {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return (
      item.id === "other" ||
      item.name.toLocaleLowerCase().includes(normalizedQuery)
    );
  }

  const renderOption = (item: Option) => {
    return (
      <Combobox.Item
        key={item.id}
        value={item}
        className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm outline-none data-highlighted:bg-info-soft data-selected:font-semibold"
      >
        {item.name}
        <Combobox.ItemIndicator>
          <Check className="size-4 text-info" />
        </Combobox.ItemIndicator>
      </Combobox.Item>
    );
  };

  const items: Option[] = [...options, { id: "other", name: "Other" }];
  const selectedItem = items.find((item) => item.id === value) ?? null;
  const searchLabel = `Search ${label.toLowerCase()}`;

  const handleValueChange = (item: Option | null) => {
    onChange(item?.id ?? "");
  };

  return (
    <Combobox.Root
      items={items}
      name={name}
      value={selectedItem}
      onValueChange={handleValueChange}
      itemToStringLabel={getOptionLabel}
      itemToStringValue={getOptionValue}
      isItemEqualToValue={isSameOption}
      filter={filterOptions}
      disabled={disabled}
    >
      <Combobox.Label className="text-sm font-medium text-text-secondary">
        {label} *
      </Combobox.Label>

      <Combobox.Trigger
        id={id}
        className="select-trigger"
        aria-required="true"
        aria-invalid={Boolean(errorId)}
        aria-describedby={errorId}
      >
        <span className="truncate">
          <Combobox.Value placeholder={placeholder} />
        </span>
        <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
      </Combobox.Trigger>

      <Combobox.Portal>
        <Combobox.Positioner
          side="bottom"
          align="start"
          sideOffset={6}
          className="z-50"
        >
          <Combobox.Popup className="w-(--anchor-width) min-w-52 overflow-hidden rounded-xl border border-line bg-popover text-text-primary shadow-xl">
            <div className="relative border-b border-line p-2">
              <Search
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <Combobox.Input
                aria-label={searchLabel}
                placeholder={`${searchLabel}...`}
                className="h-9 w-full rounded-lg border border-input bg-transparent pl-9 pr-3 text-sm outline-none focus-visible:border-ring"
              />
            </div>

            <Combobox.List className="max-h-[min(240px,var(--available-height))] overflow-y-auto overscroll-contain p-1">
              {renderOption}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
