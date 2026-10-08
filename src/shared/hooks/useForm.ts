"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";

export type FormValues = Record<string, string | boolean | undefined>;

type CheckboxFieldName<T extends FormValues> = {
  [K in keyof T]: T[K] extends boolean | undefined ? K : never;
}[keyof T] &
  string;

type CallbackFunction<T extends FormValues> = (
  values: T,
) => void | Promise<void>;

type ValidateFunction<T extends FormValues> = (values: T) => Partial<T>;

export default function useForm<T extends FormValues>(
  callback: CallbackFunction<T>,
  initialValues: T,
  validateForm?: ValidateFunction<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  const changeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    // Destructure the name and value from the event target from the input element in form
    const { name, value } = event.target;

    // Update the value for the field, ensuring that we handle checkboxes correctly
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    // Clear the error for the field when the user starts typing
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const formHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateForm?.(values) ?? {};
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    await callback(values);
  };

  const register = <K extends keyof T & string>(fieldName: K) => ({
    name: fieldName,
    // Ensure the value is a string for text-based inputs
    value: typeof values[fieldName] === "string" ? values[fieldName] : "",
    onChange: changeHandler,
  });

  const setFieldValue = <K extends keyof T>(fieldName: K, value: T[K]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  };

  const setFormValues = useCallback(
    (nextValues: Partial<{ [K in keyof T]: T[K] | null }>) => {
      setValues((currentValues) => {
        const updatedValues = { ...currentValues };

        for (const key of Object.keys(currentValues) as (keyof T)[]) {
          const value = nextValues[key];
          if (value === undefined) continue;

          updatedValues[key] = (value ?? "") as T[typeof key];
        }

        return updatedValues;
      });
      setErrors({});
    },
    [],
  );

  const registerCheckbox = (fieldName: CheckboxFieldName<T>) => ({
    name: fieldName,
    checked: values[fieldName] === true,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setFieldValue(fieldName, event.target.checked as T[typeof fieldName]),
  });

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
    setFormValues,
    registerCheckbox,
    reset,
  };
}
