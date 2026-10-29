"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "@/shared/hooks/useForm";
import { loginUser, registerUser } from "@/features/auth/services/auth.service";
import { validateRegisterForm, type RegisterFormValues } from "@/features/auth/validators/register.validator";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function useRegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { register, formHandler, errors, setErrors } = useForm(
    registerHandler,
    initialValues,
    validateRegisterForm,
  );

  async function registerHandler(values: RegisterFormValues) {
    setIsSubmitting(true);

    try {
      await registerUser({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
     
      router.push('/')
      router.refresh()

    } catch (error) {
      setErrors({
        email:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { register, formHandler, errors, isSubmitting };
}
