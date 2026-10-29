import { parsePhoneNumber } from "react-phone-number-input";

export function normalizePhoneNumber(value: string | null | undefined): string {
  return value ? (parsePhoneNumber(value, "BG")?.number ?? "") : "";
}
