/**
 * Form Component
 *
 * The Form component provides a consistent way to handle form state, validation,
 * and submission with built-in integration with Qwik City.
 */

// Export components
export { Form } from "./Form";
export { FormField, useFormFieldContext } from "./FormField";
export { FormProvider, useFormContext, useFormField } from "./FormContext";

// Export hooks
export { useForm } from "./hooks/useForm";

// Export validation helpers
export * from "./formValidation";

// Export types
export type {
  FormProps,
  FormState,
  FormFields,
  FormFieldState,
  FormValidationStatus,
  FormValidationRule,
  FormFieldOptions,
  FormOptions,
  FormContextValue,
  FormFieldContextValue,
  FormControlProps,
} from "./Form.types";

// Utility components for form layouts
export const FormRow = "flex flex-row gap-4 w-full md:flex-row sm:flex-col";
export const FormActions = "flex justify-end gap-2 mt-6";
