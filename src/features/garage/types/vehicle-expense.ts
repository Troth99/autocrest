export type VehicleExpenseCategory =
  | "fuel"
  | "charging"
  | "maintenance"
  | "repair"
  | "tyres"
  | "insurance"
  | "inspection"
  | "vignette"
  | "tax"
  | "parking"
  | "toll"
  | "other";

// Expenses are the source of financial totals. Related records link here
// rather than duplicating amounts and causing double counting.
export type VehicleExpense = {
  id: string;
  vehicle_id: string;
  category: VehicleExpenseCategory;
  title: string;
  amount: number;
  currency_code: string;
  incurred_on: string;
  mileage_km: number | null;
  vendor: string | null;
  service_record_id: string | null;
  document_id: string | null;
  receipt_storage_path: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
