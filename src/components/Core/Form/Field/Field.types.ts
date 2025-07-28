import type { QRL } from "@builder.io/qwik";

export type FieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio";
export type FieldSize = "sm" | "md" | "lg";

export interface FieldProps {
  type?: FieldType;
  label?: string;
  value?: string | boolean | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  class?: string;
  error?: string;
  helperText?: string;
  inline?: boolean;
  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onValueChange$?: QRL<(value: string | boolean | number) => void>;
  size?: FieldSize;
}
