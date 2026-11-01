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
  vehicleId: string;
  category: VehicleExpenseCategory;
  title: string;
  amount: number;
  currencyCode: string;
  incurredOn: string;
  mileageKm: number | null;
  vendor: string | null;
  serviceRecordId: string | null;
  documentId: string | null;
  receiptStoragePath: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
