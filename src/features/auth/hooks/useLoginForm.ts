"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "@/shared/hooks/useForm";
import { loginUser, logInWithFacebook, logInWithGoogle } from "@/features/auth/services/auth.service";
import { validateLoginForm, type LoginFormValues } from "@/features/auth/validators/login.validator";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};
export default function useLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, registerCheckbox, formHandler, errors, setErrors } =
    useForm(loginHandler, initialValues, validateLoginForm);

  async function loginHandler(values: LoginFormValues) {
    setIsSubmitting(true);

    try {
      await loginUser(values);
      router.replace("/verify-2fa");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrors({
        email: "Invalid email or password.",
        password: "Invalid email or password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function googleLoginHandler() {
    setIsSubmitting(true);

    try {
      await logInWithGoogle();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  async function facebookLoginHandler() {
    setIsSubmitting(true);

    try {
      await logInWithFacebook();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return { register, registerCheckbox, formHandler, errors, isSubmitting, googleLoginHandler, facebookLoginHandler };
}
