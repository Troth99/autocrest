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
  vehicleId: string;
  documentType: VehicleDocumentType;
  title: string;
  documentNumber: string | null;
  provider: string | null;
  issuedOn: string | null;
  validFrom: string | null;
  validUntil: string | null;
  // Metadata may be recorded before a file is uploaded.
  storagePath: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
