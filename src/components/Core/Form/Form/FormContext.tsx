import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type {
  FormContextValue,
  FormFieldOptions,
  FormOptions,
  FormState,
} from "./Form.types";

// Create a context ID for the form
export const FormContext = createContextId<FormContextValue>("connect.form");

// Hook to access the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

// Provider component for the form context
export const FormProvider = component$<FormOptions>((props) => {
  const {
    initialValues = {},
    onSubmit$,
    onReset$ = undefined,
    onValidate$ = undefined,
    onError$ = undefined,
    validateOnBlur = true,
    validateOnChange = false,
    validateOnSubmit = true,
    resetAfterSubmit = false,
  } = props;

  // Create form state
  const state = useStore<FormState>({
    fields: {},
    values: { ...initialValues },
    errors: {},
    touched: {},
    dirtyFields: {},
    isValid: true,
    isDirty: false,
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    status: "valid",
  });

  // Register a field in the form
  const registerField$ = $((name: string, options: FormFieldOptions = {}) => {
    const {
      validateOnBlur: fieldValidateOnBlur = validateOnBlur,
      validateOnChange: fieldValidateOnChange = validateOnChange,
      initialValue = state.values[name],
      validate,
    } = options;

    // If field already exists, just update options
    if (state.fields[name]) {
      state.fields[name] = {
        ...state.fields[name],
        validateOnBlur: fieldValidateOnBlur,
        validateOnChange: fieldValidateOnChange,
        validate,
      };
      return;
    }

    // Add new field to state
    state.fields[name] = {
      value: initialValue,
      error: undefined,
      touched: false,
      dirty: false,
      validating: false,
      validate,
      validateOnBlur: fieldValidateOnBlur,
      validateOnChange: fieldValidateOnChange,
    };

    // Initialize value if not already set
    if (initialValue !== undefined && state.values[name] === undefined) {
      state.values[name] = initialValue;
    }
  });

  // Unregister a field from the form
  const unregisterField$ = $((name: string) => {
    if (!state.fields[name]) return;

    // Update state objects without creating unused variables
    const newFields = { ...state.fields };
    delete newFields[name];
    state.fields = newFields;

    const newValues = { ...state.values };
    delete newValues[name];
    state.values = newValues;

    const newErrors = { ...state.errors };
    delete newErrors[name];
    state.errors = newErrors;

    const newTouched = { ...state.touched };
    delete newTouched[name];
    state.touched = newTouched;

    const newDirtyFields = { ...state.dirtyFields };
    delete newDirtyFields[name];
    state.dirtyFields = newDirtyFields;

    // Update validation status after field removal
    updateFormValidationStatus$(state);
  });

  // Handle form submission
  const handleSubmit$ = $(async (e?: Event) => {
    if (e) {
      e.preventDefault();
    }

    state.isSubmitting = true;
    state.submitCount++;

    try {
      // Validate all fields on submit if configured
      if (validateOnSubmit) {
        await validateForm$();
      }

      // Custom validation if provided
      if (onValidate$) {
        const customErrors = await onValidate$(state.values);
        if (customErrors) {
          // Apply custom validation errors
          for (const [fieldName, errorMessage] of Object.entries(
            customErrors,
          )) {
            setFieldError$(fieldName, errorMessage as string | undefined);
          }
        }
      }

      // Do not submit if form has errors
      if (!state.isValid) {
        if (onError$) {
          // Convert errors to Record<string, string> by filtering out undefined values
          const stringErrors: Record<string, string> = {};
          for (const [key, value] of Object.entries(state.errors)) {
            if (value !== undefined) {
              stringErrors[key] = value;
            }
          }
          await onError$(stringErrors);
        }
        state.isSubmitting = false;
        return;
      }

      // Call provided submit handler
      if (onSubmit$) {
        await onSubmit$(state.values);
      }

      // Reset form if configured
      if (resetAfterSubmit) {
        resetForm$();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      state.isSubmitting = false;
    }
  });

  // Create a QRL for the updateFormValidationStatus function
  const updateFormValidationStatus$ = $((formState: FormState) => {
    formState.isValidating = Object.values(formState.fields).some(
      (field) => field.validating,
    );

    const hasErrors = Object.values(formState.fields).some(
      (field) => !!field.error,
    );
    formState.isValid = !hasErrors;
    formState.status = hasErrors
      ? "invalid"
      : formState.isValidating
        ? "validating"
        : "valid";
  });

  // Reset form to initial state
  const resetForm$ = $(() => {
    state.values = { ...initialValues };
    state.errors = {};
    state.touched = {};
    state.dirtyFields = {};
    state.isSubmitting = false;
    state.isValidating = false;
    state.isDirty = false;
    state.isValid = true;
    state.status = "valid";

    // Reset each field state
    for (const fieldName in state.fields) {
      const field = state.fields[fieldName];
      field.value =
        initialValues[fieldName] !== undefined
          ? initialValues[fieldName]
          : undefined;
      field.error = undefined;
      field.touched = false;
      field.dirty = false;
      field.validating = false;
    }

    // Call onReset$ if provided
    if (onReset$) {
      onReset$(state.values);
    }
  });

  // Validate a single field
  const validateField$ = $(async (name: string) => {
    const field = state.fields[name];
    if (!field || !field.validate || field.validating) return;

    field.validating = true;
    updateFormValidationStatus$(state);

    try {
      if (Array.isArray(field.validate)) {
        // Run through all validation rules until one fails
        for (const validator of field.validate) {
          const result = await validator.validator(
            state.values[name],
            state.values,
          );
          if (result) {
            state.errors[name] = result;
            field.error = result;
            break;
          } else {
            state.errors[name] = undefined;
            field.error = undefined;
          }
        }
      } else {
        // Single validator function
        const result = await field.validate(state.values[name], state.values);
        state.errors[name] = result;
        field.error = result;
      }
    } catch (error) {
      console.error(`Error validating field ${name}:`, error);
      state.errors[name] = "Validation error";
      field.error = "Validation error";
    } finally {
      field.validating = false;
      updateFormValidationStatus$(state);
    }
  });

  // Validate all form fields
  const validateForm$ = $(async () => {
    const validationPromises: Promise<void>[] = [];

    // Start all field validations
    for (const fieldName in state.fields) {
      validationPromises.push(validateField$(fieldName));
    }

    // Wait for all validations to complete
    await Promise.all(validationPromises);

    return Object.keys(state.errors).length === 0;
  });

  // Set field value
  const setFieldValue$ = $((name: string, value: any) => {
    // Register field if not already registered
    if (!state.fields[name]) {
      registerField$(name, { initialValue: value });
    }

    // Update field and form state
    state.values[name] = value;

    if (state.fields[name]) {
      const field = state.fields[name];
      field.value = value;

      // Mark as dirty if value has changed
      if (!field.dirty) {
        field.dirty = true;
        state.dirtyFields[name] = true;
        state.isDirty = true;
      }

      // Validate on change if configured
      if (field.validateOnChange && field.validate) {
        validateField$(name);
      }
    }
  });

  // Set multiple field values at once
  const setValues$ = $((values: Record<string, any>) => {
    for (const key in values) {
      setFieldValue$(key, values[key]);
    }
  });

  // Mark field as touched
  const setFieldTouched$ = $((name: string, touched = true) => {
    if (!state.fields[name]) {
      registerField$(name);
    }

    state.touched[name] = touched;

    if (state.fields[name]) {
      state.fields[name].touched = touched;

      // Validate on blur if field is touched and configured to validate on blur
      if (
        touched &&
        state.fields[name].validateOnBlur &&
        state.fields[name].validate
      ) {
        validateField$(name);
      }
    }
  });

  // Set error for a specific field
  const setFieldError$ = $((name: string, error?: string) => {
    if (!state.fields[name]) {
      registerField$(name);
    }

    state.errors[name] = error;

    if (state.fields[name]) {
      state.fields[name].error = error;
      updateFormValidationStatus$(state);
    }
  });

  // Create context value object
  const formContext: FormContextValue = {
    state,
    registerField$,
    unregisterField$,
    setFieldValue$,
    setValues$,
    setFieldTouched$,
    setFieldError$,
    validateField$,
    validateForm$,
    resetForm$,
    handleSubmit$,
  };

  // Provide context to children
  useContextProvider(FormContext, formContext);

  return <Slot />;
});

// Context for individual form fields
export const FormFieldContext = createContextId<{ name: string }>(
  "connect.form-field",
);

// Hook to access the form field context
export const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      "useFormFieldContext must be used within a FormField component",
    );
  }
  return context;
};

// Hook to access a specific form field state
export const useFormField = (name: string) => {
  const form = useFormContext();

  // Register field on component creation (if not already registered)
  useTask$(({ track, cleanup }) => {
    track(() => name); // Re-run when name changes

    if (name) {
      form.registerField$(name);

      // Cleanup: unregister field when component is destroyed or name changes
      cleanup(() => {
        form.unregisterField$(name);
      });
    }
  });

  return {
    name,
    value: form.state.values[name],
    error: form.state.errors[name],
    touched: form.state.touched[name],
    dirty: !!form.state.dirtyFields[name],
    setFieldValue: (value: any) => form.setFieldValue$(name, value),
    setFieldTouched: (touched = true) => form.setFieldTouched$(name, touched),
    setFieldError: (error?: string) => form.setFieldError$(name, error),
    validateField: () => form.validateField$(name),
  };
};
