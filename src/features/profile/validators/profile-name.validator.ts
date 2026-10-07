import { z } from "zod";

export const profileNameSchema = z
  .object({
    first_name: z.string().trim(),
    last_name: z.string().trim(),
  })
  .superRefine(({ first_name, last_name }, context) => {
    if (first_name && !last_name) {
      context.addIssue({
        code: "custom",
        path: ["last_name"],
        message: "Enter your last name, or clear your first name.",
      });
    }
    if (last_name && !first_name) {
      context.addIssue({
        code: "custom",
        path: ["first_name"],
        message: "Enter your first name, or clear your last name.",
      });
    }
  });
