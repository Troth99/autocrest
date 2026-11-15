"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/features/auth/services/auth.service";
import { type RegisterFormValues } from "@/features/auth/validators/register.validator";

type RegisterState = {
  errors: Partial<Record<keyof RegisterFormValues, string>>;
};

export default function useRegisterForm() {
  const router = useRouter();

  async function registerHandler(
    _previousState: RegisterState,
    formData: FormData,
  ): Promise<RegisterState> {
    const values = Object.fromEntries(formData.entries());

    try {
      const result = await registerUser(values);

      if (Object.keys(result.errors).length > 0) {
        return { errors: result.errors };
      }
    } catch (error) {
      console.error(error);

      return {
        errors: {
          email: "Could not create your account. Please try again.",
        },
      };
    }

    router.replace("/");
    router.refresh();

    return { errors: {} };
  }

  const [state, formAction, isSubmitting] = useActionState(registerHandler, {
    errors: {},
  });

  return { formAction, errors: state.errors, isSubmitting };
}
