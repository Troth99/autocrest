import type { Vehicle } from "@/features/garage/types/vehicle";

export type VehicleDocumentFormValues = {
  customMake: string;
  customModel: string;
  plate: string;
  vin: string;
  registrationCertificateNumber: string;
  firstRegistrationDate: string;
  engineCc: string;
  powerHp: string;
  fuelType: string;
  euroStandard: string;
  colour: string;
  seats: string;
};

export type VehicleDocumentFieldProps = {
  values?: Partial<VehicleDocumentFormValues>;
  defaultValues?: Vehicle;
  onFieldChange?: (field: keyof VehicleDocumentFormValues, value: string) => void;
};
