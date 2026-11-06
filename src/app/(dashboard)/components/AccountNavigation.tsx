import NavLink from "@/shared/components/NavLink/NavLink";
import { CarFront, House, Settings, UserRound } from "lucide-react";

export default function AccountNavigation() {
  return (
    <nav aria-label="Account navigation" className="account-navigation">
      <p className="mb-5 hidden px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle lg:block">
        YOUR WORKSPACE
      </p>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        <NavLink href="/profile" additionalActivePaths={["/change-password"]}>
          <UserRound className="size-5 shrink-0" />
          Profile
        </NavLink>
        <NavLink href="/garrage">
          <CarFront className="size-5 shrink-0" />
          My Garage
        </NavLink>
        {[
          { label: "Dashboard", icon: House },
          { label: "Settings", icon: Settings },
        ].map(({ label, icon: Icon }) => (
          <span
            key={label}
            aria-disabled="true"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-subtle"
          >
            <Icon className="size-5 shrink-0" />
            <span>
              {label}
              <span className="block text-[10px]">Coming soon</span>
            </span>
          </span>
        ))}
      </div>
    </nav>
  );
}
