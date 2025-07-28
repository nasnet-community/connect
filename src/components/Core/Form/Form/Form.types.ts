import type { QRL } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";

export type FormValidationStatus = "valid" | "invalid" | "validating";

export interface FormFieldState {
  value: any;
  touched: boolean;
  dirty: boolean;
  error?: string;
  validating: boolean;
  validate?:
    | FormValidationRule[]
    | QRL<
        (
          value: any,
          formValues: Record<string, any>,
        ) => string | undefined | Promise<string | undefined>
      >;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export type FormFields = Record<string, FormFieldState>;

export interface FormState {
  fields: FormFields;
  values: Record<string, any>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  dirtyFields: Record<string, boolean>;
  isValid: boolean;
  isDirty: boolean;
  isValidating: boolean;
  isSubmitting: boolean;
  submitCount: number;
  status: FormValidationStatus;
}

export interface FormValidationRule {
  validator: QRL<
    (
      value: any,
      formValues: Record<string, any>,
    ) => string | undefined | Promise<string | undefined>
  >;
  message?: string;
}

export interface FormFieldOptions {
  initialValue?: any;
  required?: boolean;
  validate?:
    | FormValidationRule[]
    | QRL<
        (
          value: any,
          formValues: Record<string, any>,
        ) => string | undefined | Promise<string | undefined>
      >;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface FormOptions {
  id?: string;
  initialValues?: Record<string, any>;
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  resetAfterSubmit?: boolean;
  children?: any;
  onSubmit$?: QRL<(values: Record<string, any>) => void | Promise<void>>;
  onReset$?: QRL<(values: Record<string, any>) => void | Promise<void>>;
  onValidate$?: QRL<
    (
      values: Record<string, any>,
    ) => Record<string, string> | void | Promise<Record<string, string> | void>
  >;
  onError$?: QRL<(errors: Record<string, string>) => void | Promise<void>>;
}

export interface FormProps extends FormOptions {
  id?: string;
  name?: string;
  action?: string;
  method?: "get" | "post" | "put" | "delete";
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  noValidate?: boolean;
  autocomplete?: "on" | "off";
  class?: string;

  // Form validation event handlers
  onValidate$?: QRL<
    (
      values: Record<string, any>,
    ) => Record<string, string> | void | Promise<Record<string, string> | void>
  >;
  onError$?: QRL<(errors: Record<string, string>) => void | Promise<void>>;

  // Qwik City Form specific props
  qwikAction?: ActionStore<any, any, boolean>;
  spaReset?: boolean;
  reloadDocument?: boolean;
}

export interface FormContextValue {
  state: FormState;
  registerField$: QRL<(name: string, options?: FormFieldOptions) => void>;
  unregisterField$: QRL<(name: string) => void>;
  setFieldValue$: QRL<(name: string, value: any) => void>;
  setValues$: QRL<(values: Record<string, any>) => void>;
  setFieldTouched$: QRL<(name: string, touched: boolean) => void>;
  setFieldError$: QRL<(name: string, error?: string) => void>;
  validateField$: QRL<(name: string) => Promise<void>>;
  validateForm$: QRL<() => Promise<boolean>>;
  resetForm$: QRL<() => void>;
  handleSubmit$: QRL<(e?: Event) => Promise<void>>;
}

export interface FormFieldContextValue {
  name: string;
  value?: any;
  error?: string;
  touched: boolean;
  required: boolean;
  disabled: boolean;
  onChange$: QRL<(e: any) => void>;
  onBlur$: QRL<(e: any) => void>;
  onFocus$: QRL<(e: any) => void>;
}

export interface FormControlProps {
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  helperText?: string;
  error?: string;
  success?: boolean;
  warning?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validate?:
    | FormValidationRule[]
    | QRL<
        (
          value: any,
          formValues: Record<string, any>,
        ) => string | undefined | Promise<string | undefined>
      >;
}
