import type { Vehicle } from "@/features/garage/types/vehicle";

export type Field = {
  name: keyof Vehicle;
  label: string;
  type?: "text" | "number" | "date";
  placeholder?: string;
  required?: boolean;
  step?: string;
  options?: readonly string[];
};

export const sections: {
  title: string;
  description: string;
  fields: Field[];
}[] = [
  {
    title: "Basic information",
    description: "The essentials that identify your car.",
    fields: [
      {
        name: "make",
        label: "Make",
        placeholder: "e.g. Toyota",
        required: true,
      },
      {
        name: "model",
        label: "Model",
        placeholder: "e.g. Corolla",
        required: true,
      },
      {
        name: "manufacture_year",
        label: "Manufacture year",
        type: "number",
        placeholder: "e.g. 2020",
      },
      {
        name: "trim",
        label: "Trim / variant",
        placeholder: "e.g. 1.8 Hybrid Design",
      },
      {
        name: "nickname",
        label: "Nickname",
        placeholder: "A name for your car",
      },
      {
        name: "vehicle_use",
        label: "Vehicle use",
        options: ["personal", "business", "mixed"] satisfies NonNullable<
          Vehicle["vehicle_use"]
        >[],
      },
    ],
  },
  {
    title: "Registration",
    description: "Details from your vehicle registration documents.",
    fields: [
      {
        name: "plate",
        label: "Registration plate",
        placeholder: "e.g. CB1234AB",
      },
      {
        name: "vin",
        label: "VIN",
        placeholder: "Vehicle identification number",
      },
      {
        name: "registration_certificate_number",
        label: "Registration certificate number",
      },
      {
        name: "registration_country_code",
        label: "Registration country code",
        placeholder: "e.g. BG",
      },
      {
        name: "first_registration_date",
        label: "First registration date",
        type: "date",
      },
    ],
  },
  {
    title: "Engine and drivetrain",
    description: "Specifications for your car. Leave unknown details blank.",
    fields: [
      {
        name: "fuel_type",
        label: "Fuel type",
        options: [
          "petrol",
          "diesel",
          "electric",
          "hybrid",
          "plug_in_hybrid",
          "lpg",
          "cng",
          "other",
        ] satisfies NonNullable<Vehicle["fuel_type"]>[],
      },
      {
        name: "transmission",
        label: "Transmission",
        options: [
          "manual",
          "automatic",
          "semi_automatic",
        ] satisfies NonNullable<Vehicle["transmission"]>[],
      },
      {
        name: "drivetrain",
        label: "Drivetrain",
        options: ["fwd", "rwd", "awd", "4wd"] satisfies NonNullable<
          Vehicle["drivetrain"]
        >[],
      },
      {
        name: "engine_cc",
        label: "Engine capacity (cc)",
        type: "number",
        placeholder: "e.g. 1798",
      },
      {
        name: "power_hp",
        label: "Power (hp)",
        type: "number",
        placeholder: "e.g. 122",
        step: "any",
      },
      {
        name: "euro_standard",
        label: "Euro emissions standard",
        options: [
          "euro_1",
          "euro_2",
          "euro_3",
          "euro_4",
          "euro_5",
          "euro_6",
        ] satisfies NonNullable<Vehicle["euro_standard"]>[],
      },
    ],
  },
  {
    title: "Mileage",
    description: "Your current odometer reading, in kilometres.",
    fields: [
      {
        name: "mileage_km",
        label: "Current mileage (km)",
        type: "number",
        placeholder: "e.g. 85000",
        required: true,
      },
      {
        name: "mileage_recorded_at",
        label: "Mileage recorded on",
        type: "date",
      },
    ],
  },
  {
    title: "Purchase details",
    description: "Optional information about when you bought your car.",
    fields: [
      { name: "purchase_date", label: "Purchase date", type: "date" },
      {
        name: "purchase_price",
        label: "Purchase price",
        type: "number",
        step: "0.01",
      },
      {
        name: "purchase_currency_code",
        label: "Currency code",
        placeholder: "e.g. EUR",
      },
    ],
  },
];

export const optionLabels: Record<string, string> = {
  lpg: "LPG",
  cng: "CNG",
  fwd: "Front-wheel drive (FWD)",
  rwd: "Rear-wheel drive (RWD)",
  awd: "All-wheel drive (AWD)",
  "4wd": "Four-wheel drive (4WD)",
  plug_in_hybrid: "Plug-in hybrid",
  semi_automatic: "Semi-automatic",
};
