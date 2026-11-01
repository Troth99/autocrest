import { z } from "zod";

export const profileNameSchema = z
  .object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  })
  .superRefine(({ firstName, lastName }, context) => {
    if (firstName && !lastName) {
      context.addIssue({
        code: "custom",
        path: ["lastName"],
        message: "Enter your last name, or clear your first name.",
      });
    }
    if (lastName && !firstName) {
      context.addIssue({
        code: "custom",
        path: ["firstName"],
        message: "Enter your first name, or clear your last name.",
      });
    }
  });
