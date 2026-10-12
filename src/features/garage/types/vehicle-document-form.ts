export type VehicleDocumentFormValues = {
  custom_make: string;
  custom_model: string;
  plate: string;
  vin: string;
  registration_certificate_number: string;
  first_registration_date: string;
  engine_cc: string;
  power_hp: string;
  fuel_type: string;
  euro_standard: string;
  colour: string;
  seats: string;
};

export type VehicleDocumentFieldProps = {
  values: VehicleDocumentFormValues;
  onFieldChange: (field: keyof VehicleDocumentFormValues, value: string) => void;
};
