import type { QRL, QwikIntrinsicElements } from "@builder.io/qwik";
import type { FormValidationRule } from "../Form/Form.types";

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaResize =
  | "none"
  | "vertical"
  | "horizontal"
  | "both"
  | "auto";
export type TextAreaState = "default" | "success" | "error" | "warning";

export interface TextAreaProps
  extends Omit<QwikIntrinsicElements["textarea"], "size"> {
  size?: TextAreaSize;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  state?: TextAreaState;
  containerClass?: string;
  textareaClass?: string;
  labelClass?: string;
  messageClass?: string;
  autoResize?: boolean;
  resize?: TextAreaResize;
  minRows?: number;
  maxRows?: number;
  showCharCount?: boolean;
  maxLength?: number;
  charCountFormatter$?: QRL<(current: number, max?: number) => string>;
  autofocus?: boolean;
  fullWidth?: boolean;
  showClear?: boolean;
  onInput$?: QRL<(event: InputEvent, element: HTMLTextAreaElement) => any>;
  onChange$?: QRL<(event: Event, element: HTMLTextAreaElement) => any>;
  onBlur$?: QRL<(event: FocusEvent) => any>;

  // Form integration properties
  name?: string;
  validate?: FormValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}
