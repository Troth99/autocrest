"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export type FormValues = Record<string, string | undefined>;

type CallbackFunction<T extends FormValues> = (
  values: T,
) => void | Promise<void>;

type ValidateFunction<T extends FormValues> = (values: T) => Partial<T>;

export default function useForm<T extends FormValues>(
  callback: CallbackFunction<T>,
  initialValues: T,
  validateForm: ValidateFunction<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  const changeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const formHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    await callback(values);
  };

  const register = (fieldName: keyof T & string) => ({
    name: fieldName,
    value: values[fieldName] ?? "",
    onChange: changeHandler,
  });

  const setFieldValue = (fieldName: keyof T, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    register,
    formHandler,
    errors,
    setErrors,
    setFieldValue,
    reset,
  };
}