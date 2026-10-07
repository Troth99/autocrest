"use client";

import {
  Bell,
  CarFront,
  ChevronDown,
  Fuel,
  Plus,
  ReceiptText,
  Search,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function GarageSearch() {
  return (
    <form
      action="/garrage"
      role="search"
      className="order-last w-full md:order-0 md:max-w-md md:flex-1 lg:max-w-xl"
    >
      <label htmlFor="garage-search" className="sr-only">
        Search your garage by vehicle name or plate
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          id="garage-search"
          name="q"
          type="search"
          maxLength={100}
          placeholder="Search your garage…"
          className="form-input py-2.5 pl-12 pr-14"
        />
        <button
          type="submit"
          aria-label="Search garage"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted transition-colors hover:bg-info-soft hover:text-info focus-visible:outline-2 focus-visible:outline-focus"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default function GarageHeaderTools() {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="action-button cursor-pointer gap-2 px-3 py-2.5 transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-focus sm:px-4">
          <Plus className="size-4" aria-hidden="true" />
          Add
          <ChevronDown className="size-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-64 rounded-2xl p-2"
        >
          <DropdownMenuItem
            onClick={() => router.push("/cars/add")}
            className="cursor-pointer gap-3 rounded-xl px-3 py-3"
          >
            <CarFront className="size-5" /> Add vehicle
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {[
            { label: "Fuel entry", icon: Fuel },
            { label: "Expense", icon: ReceiptText },
            { label: "Service record", icon: Wrench },
          ].map(({ label, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              disabled
              className="gap-3 rounded-xl px-3 py-3"
            >
              <Icon className="size-5" />
              {label}
              <span className="ml-auto text-[10px]">Coming soon</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Reminders"
          className="cursor-pointer rounded-xl p-2.5 text-muted transition-colors hover:bg-info-soft hover:text-info focus-visible:outline-2 focus-visible:outline-focus"
        >
          <Bell className="size-5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-72 rounded-2xl p-4"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 text-sm text-text-primary">
              Vehicle reminders
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <p className="mt-2 text-sm leading-6 text-muted">
            Maintenance, insurance, and inspection reminders are coming soon.
          </p>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
