import { $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type {
  FormOptions,
  FormFieldOptions,
  FormValidationRule,
  FormState,
} from "../Form.types";

/**
 * Hook for managing form state outside of the Form component.
 * This is useful for advanced use cases where you need more control over the form state.
 *
 * @param options - Form options
 * @returns Form state and methods
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   initialValues: {
 *     name: '',
 *     email: '',
 *   },
 *   validateOnSubmit: true,
 * });
 *
 * return (
 *   <form onSubmit$={form.handleSubmit$}>
 *     <input
 *       type="text"
 *       name="name"
 *       value={form.values.name}
 *       onInput$={(e) => form.setFieldValue('name', (e.target as HTMLInputElement).value)}
 *     />
 *     {form.errors.name && <div>{form.errors.name}</div>}
 *
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 * ```
 */
export function useForm(options: FormOptions = {}) {
  // Default options
  const defaultOptions = {
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnSubmit: true,
    revalidateOn: ["submit", "blur", "change"] as Array<
      "input" | "blur" | "change" | "submit"
    >,
    preventDefaultOnSubmit: true,
  };

  // Merged options
  const formOptions = {
    ...defaultOptions,
    ...options,
  };

  // Form state
  const state = useStore<FormState>({
    fields: {},
    values: {},
    errors: {},
    touched: {},
    dirtyFields: {},
    isValid: true,
    isDirty: false,
    isValidating: false,
    isSubmitting: false,
    submitCount: 0,
    status: "valid",
  });

  // Derived values for easier access
  const values = useStore<Record<string, any>>({});
  const errors = useStore<Record<string, string | undefined>>({});
  const touched = useStore<Record<string, boolean>>({});
  const isDirty = useSignal<boolean>(false);

  // Update form validation status - wrapped in $() to make it serializable
  const updateFormValidationStatus = $(() => {
    const hasErrors = Object.values(state.fields).some(
      (field) => !!field.error,
    );
    const isValidating = Object.values(state.fields).some(
      (field) => field.validating,
    );

    state.isValid = !hasErrors;
    state.isValidating = isValidating;
    state.status = isValidating
      ? "validating"
      : hasErrors
        ? "invalid"
        : "valid";
  });

  // Register a field
  const registerField = $((name: string, fieldOptions?: FormFieldOptions) => {
    if (state.fields[name]) return; // Field already registered

    const initialValue =
      fieldOptions?.initialValue !== undefined
        ? fieldOptions.initialValue
        : formOptions.initialValues?.[name] !== undefined
          ? formOptions.initialValues[name]
          : "";

    state.fields[name] = {
      value: initialValue,
      touched: false,
      dirty: false,
      validating: false,
      error: undefined,
    };

    // Update derived values
    values[name] = initialValue;
    errors[name] = undefined;
    touched[name] = false;
  });

  // Set field value
  const setFieldValue = $((name: string, value: any) => {
    if (!state.fields[name]) {
      registerField(name, { initialValue: value });
      return;
    }

    state.fields[name].value = value;
    state.fields[name].dirty = true;

    // Update derived values
    values[name] = value;
    isDirty.value = true;

    // Validate if needed
    const shouldValidate =
      (formOptions.validateOnChange ?? true) ||
      (state.fields[name].touched && (formOptions.validateOnBlur ?? true));

    if (shouldValidate) {
      validateField(name);
    }
  });

  // Set field touched state
  const setFieldTouched = $((name: string, isTouched: boolean = true) => {
    if (!state.fields[name]) return;

    state.fields[name].touched = isTouched;

    // Update derived values
    touched[name] = isTouched;

    if (isTouched && (formOptions.validateOnBlur ?? true)) {
      validateField(name);
    }
  });

  // Set field error
  const setFieldError = $((name: string, error: string | undefined) => {
    if (!state.fields[name]) return;

    state.fields[name].error = error;
    state.fields[name].validating = false;

    // Update derived values
    errors[name] = error;

    // Update form validation status
    updateFormValidationStatus();
  });

  // Validate a field
  const validateField = $(async (name: string): Promise<string | undefined> => {
    if (!state.fields[name]) return undefined;

    // Mark field as validating
    state.fields[name].validating = true;
    state.isValidating = true;

    let error: string | undefined = undefined;
    const fieldValue = state.fields[name].value;

    // Check if field is required
    const fieldOptions = formOptions.initialValues?.[name];
    if (fieldOptions && "required" in fieldOptions && fieldOptions.required) {
      if (
        fieldValue === "" ||
        fieldValue === null ||
        fieldValue === undefined
      ) {
        error = "This field is required";
      }
    }

    // Run field-specific validations
    if (
      !error &&
      fieldOptions &&
      "validate" in fieldOptions &&
      fieldOptions.validate
    ) {
      const validate = fieldOptions.validate as FormValidationRule[];
      for (const rule of validate) {
        const allValues = Object.entries(state.fields).reduce(
          (acc, [key, field]) => ({ ...acc, [key]: field.value }),
          {},
        );

        const validationResult = await rule.validator(fieldValue, allValues);
        if (validationResult) {
          error = rule.message || validationResult;
          break;
        }
      }
    }

    // Update field and derived state
    state.fields[name].error = error;
    state.fields[name].validating = false;
    errors[name] = error;

    // Update form validation status
    updateFormValidationStatus();

    return error;
  });

  // Validate all fields
  const validateForm = $(async (): Promise<boolean> => {
    state.isValidating = true;

    // Validate all fields in parallel
    const fieldNames = Object.keys(state.fields);
    const validationResults = await Promise.all(
      fieldNames.map((name) => validateField(name)),
    );

    // Check if any fields have errors
    const hasErrors = validationResults.some((error) => !!error);
    state.isValid = !hasErrors;

    // Update form status
    updateFormValidationStatus();

    return state.isValid;
  });

  // Reset form to initial values
  const resetForm = $(() => {
    // Reset all fields to initial values
    Object.keys(state.fields).forEach((name) => {
      const initialValue =
        formOptions.initialValues?.[name] !== undefined
          ? formOptions.initialValues[name]
          : "";

      state.fields[name] = {
        value: initialValue,
        touched: false,
        dirty: false,
        validating: false,
        error: undefined,
      };

      // Update derived values
      values[name] = initialValue;
      errors[name] = undefined;
      touched[name] = false;
    });

    // Reset form state
    state.isValid = true;
    state.isValidating = false;
    state.isSubmitting = false;
    state.status = "valid";
    isDirty.value = false;
  });

  // Handle form submission
  const handleSubmit$ = $(
    async (
      e?: SubmitEvent,
      onSubmitFn?: (values: Record<string, any>) => void | Promise<void>,
    ) => {
      // Prevent default if event is provided and option is set
      if (e && (formOptions.preventDefaultOnSubmit ?? true)) {
        e.preventDefault();
      }

      // Increment submit count and update state
      state.submitCount++;
      state.isSubmitting = true;

      // Mark all fields as touched
      Object.keys(state.fields).forEach((name) => {
        state.fields[name].touched = true;
        touched[name] = true;
      });

      // Validate form if needed
      let isValid = true;
      if (formOptions.validateOnSubmit ?? true) {
        isValid = await validateForm();
      }

      // Call onSubmit handler if valid and provided
      if (isValid && onSubmitFn) {
        try {
          await onSubmitFn(values);
        } catch (error) {
          console.error("Error in form submission handler:", error);
          isValid = false;
        }
      }

      // Update form state
      state.isSubmitting = false;

      return isValid;
    },
  );

  // Initialize form with initial values
  useTask$(({ track }) => {
    track(() => formOptions.initialValues);

    if (formOptions.initialValues) {
      Object.keys(formOptions.initialValues).forEach((name) => {
        registerField(name, {
          initialValue: formOptions.initialValues?.[name],
        });
      });
    }

    // Validate on mount if needed
    if (formOptions.validateOnMount) {
      validateForm();
    }
  });

  return {
    // State
    state,
    values,
    errors,
    touched,
    isDirty: isDirty.value,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    isValidating: state.isValidating,
    submitCount: state.submitCount,
    status: state.status,

    // Methods
    registerField,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    validateField,
    validateForm,
    resetForm,
    handleSubmit$,
  };
}

export default useForm;
