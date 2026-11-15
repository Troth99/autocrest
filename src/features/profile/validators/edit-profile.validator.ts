import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const editProfileSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  phone: z.string().refine((value) => !value || isValidPhoneNumber(value), {
    message: "Please enter a valid phone number.",
  }),
  city: z.string(),
  avatarUrl: z.string(),
  bio: z.string(),
});
