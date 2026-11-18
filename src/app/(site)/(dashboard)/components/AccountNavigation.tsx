import NavLink from "@/shared/components/NavLink/NavLink";
import { Bell, CarFront, FileText, House, ReceiptText, Settings, UserRound } from "lucide-react";

export default function AccountNavigation() {
  return (
    <nav aria-label="Account navigation" className="account-navigation">
      <p className="mb-5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        YOUR WORKSPACE
      </p>
      <div className="flex gap-6 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        <div className="shrink-0">
          <span aria-disabled="true" className="account-navigation-placeholder">
            <House className="size-5 shrink-0" aria-hidden="true" />
            <span>Dashboard</span>
            <span className="account-navigation-badge">Coming soon</span>
          </span>
        </div>

        <div className="shrink-0">
          <h2 className="account-navigation-heading">Garage</h2>
          <div className="flex gap-1 lg:flex-col">
            <NavLink href="/garrage">
              <CarFront className="size-5 shrink-0" aria-hidden="true" />
              My Garage
            </NavLink>
            <span aria-disabled="true" className="account-navigation-placeholder">
              <FileText className="size-5 shrink-0" aria-hidden="true" />
              <span>Documents</span>
              <span className="account-navigation-badge">Coming soon</span>
            </span>
            <span aria-disabled="true" className="account-navigation-placeholder">
              <ReceiptText className="size-5 shrink-0" aria-hidden="true" />
              <span>Expenses</span>
              <span className="account-navigation-badge">Coming soon</span>
            </span>
            <span aria-disabled="true" className="account-navigation-placeholder">
              <Bell className="size-5 shrink-0" aria-hidden="true" />
              <span>Reminders</span>
              <span className="account-navigation-badge">Coming soon</span>
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <h2 className="account-navigation-heading">Account</h2>
          <div className="flex gap-1 lg:flex-col">
            <NavLink href="/profile" additionalActivePaths={["/change-password"]}>
              <UserRound className="size-5 shrink-0" aria-hidden="true" />
              Profile &amp; security
            </NavLink>
            <span aria-disabled="true" className="account-navigation-placeholder">
              <Settings className="size-5 shrink-0" aria-hidden="true" />
              <span>Settings</span>
              <span className="account-navigation-badge">Coming soon</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
