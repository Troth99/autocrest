export type VehicleDocumentType =
  | "registration_certificate"
  | "liability_insurance"
  | "comprehensive_insurance"
  | "technical_inspection"
  | "vignette"
  | "vehicle_tax"
  | "receipt"
  | "other";

export type VehicleDocument = {
  id: string;
  vehicle_id: string;
  document_type: VehicleDocumentType;
  title: string;
  document_number: string | null;
  provider: string | null;
  issued_on: string | null;
  valid_from: string | null;
  valid_until: string | null;
  // Metadata may be recorded before a file is uploaded.
  storage_path: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
