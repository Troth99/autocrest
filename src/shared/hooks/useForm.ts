"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";

export type FormValues = Record<string, string | boolean | undefined>;

// Restrict registerCheckbox to boolean field names.
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
  // T describes the form fields inferred from initialValues.
  const [values, setValues] = useState<T>(initialValues);
  // Errors use the same field names; Partial allows fields without errors to be omitted.
  const [errors, setErrors] = useState<Partial<T>>({});

  // Shared change handler for inputs, textareas, and selects. Checkboxes use registerCheckbox.
  const changeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    // name identifies the field, and value contains its new value.
    const { name, value } = event.target;

    // Keep the other fields and update only the changed field.
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    // Clear this field's error when its value changes.
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const formHandler = async (event: SyntheticEvent<HTMLFormElement>) => {
    // Pass formHandler to onSubmit to prevent the default page reload.
    event.preventDefault();

    // If no validator is provided, continue with no validation errors.
    const formErrors = validateForm?.(values) ?? {};
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      // Stop submission if validation returns any errors.
      return;
    }

    // Pass the form values to the callback, rather than the submit event.
    await callback(values);
  };

  // {...register("provider")} supplies name, value, and onChange to the field.
  const register = <K extends keyof T & string>(fieldName: K) => ({
    name: fieldName,
    // Always supply a string value to keep the field controlled by React.
    value: typeof values[fieldName] === "string" ? values[fieldName] : "",
    onChange: changeHandler,
  });

  // Update a single field directly without a DOM event.
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

  // Populate multiple existing fields at once, for example after a document scan.
  const setFormValues = useCallback(
    (nextValues: Partial<{ [K in keyof T]: T[K] | null }>) => {
      setValues((currentValues) => {
        const updatedValues = { ...currentValues };

        for (const key of Object.keys(currentValues) as (keyof T)[]) {
          const value = nextValues[key];
          // undefined preserves the current value; null replaces it with an empty string.
          if (value === undefined) continue;

          updatedValues[key] = (value ?? "") as T[typeof key];
        }

        return updatedValues;
      });
      setErrors({});
    },
    [],
  );

  // Checkboxes use checked (boolean) instead of value (string).
  const registerCheckbox = (fieldName: CheckboxFieldName<T>) => ({
    name: fieldName,
    checked: values[fieldName] === true,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setFieldValue(fieldName, event.target.checked as T[typeof fieldName]),
  });

  // Restore the initial values and clear all errors.
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
