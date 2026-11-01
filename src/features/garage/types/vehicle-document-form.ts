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
  values: VehicleDocumentFormValues;
  onFieldChange: (field: keyof VehicleDocumentFormValues, value: string) => void;
};
