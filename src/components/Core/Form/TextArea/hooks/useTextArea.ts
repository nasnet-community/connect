import {
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
  useComputed$,
} from "@builder.io/qwik";
import type { TextAreaProps } from "../TextArea.types";
import { useForm } from "../../Form/hooks/useForm";

export function useTextArea(props: TextAreaProps) {
  const {
    disabled = false,
    required = false,
    autoResize = false,
    resize = "vertical",
    minRows = 3,
    maxRows,
    showCharCount = false,
    state = "default",
    errorMessage,
    successMessage,
    warningMessage,
    value,
    name,
    size = "md",
    placeholder,
    helperText,
    containerClass = "",
    textareaClass = "",
    fullWidth = true,
    showClear = false,
    charCountFormatter$,
    maxLength,
  } = props;

  // Create refs for the textarea element
  const textareaRef = useSignal<HTMLTextAreaElement>();

  // Track character count
  const charCount = useSignal(0);

  // Track textarea height for auto-resize
  const textareaHeight = useSignal<string>("auto");

  // Get the form context if available
  const form = useForm();

  // Use form field value if available, otherwise use prop value
  const currentValue = useComputed$(() => {
    if (name && form && form.values) {
      return form.values[name] || "";
    }
    return value || "";
  });

  // Determine the effective state of the component based on form state and props
  const effectiveState = useSignal(state);

  // Get the base row height for calculations
  const baseRowHeight = useSignal(0);

  // Default character count display
  const defaultCharCount$ = $((count: number, max?: number) => {
    return max ? `${count}/${max}` : `${count} characters`;
  });

  // Update character count and component state
  useTask$(({ track }) => {
    const trackedValue = track(() => currentValue.value);
    if (typeof trackedValue === "string") {
      charCount.value = trackedValue.length;
    } else {
      charCount.value = 0;
    }

    // First check form error
    const formError = name && form ? form.errors[name] : undefined;

    // Then check props for state indicators
    const errMsg = track(() => errorMessage || formError);
    const warnMsg = track(() => warningMessage);
    const successMsg = track(() => successMessage);

    if (errMsg) {
      effectiveState.value = "error";
    } else if (warnMsg) {
      effectiveState.value = "warning";
    } else if (successMsg) {
      effectiveState.value = "success";
    } else {
      effectiveState.value = state;
    }
  });

  // Function to adjust height wrapped in $()
  const adjustTextareaHeight$ = $(() => {
    if (!textareaRef.value || !autoResize) return;

    // Reset height to get the correct scrollHeight
    textareaHeight.value = "auto";
    textareaRef.value.style.height = "auto";

    // Calculate the new height
    const scrollHeight = textareaRef.value.scrollHeight;
    const minHeight = baseRowHeight.value * minRows;
    const maxHeight = maxRows ? baseRowHeight.value * maxRows : Infinity;

    // Apply the height, constrained by minRows and maxRows
    const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
    textareaHeight.value = `${newHeight}px`;
    textareaRef.value.style.height = textareaHeight.value;
  });

  // Set up auto-resize logic
  useVisibleTask$(({ track }) => {
    track(() => textareaRef.value);

    if (!textareaRef.value) return;

    // Store the base height of a single line
    const style = window.getComputedStyle(textareaRef.value);
    const lineHeight = parseInt(style.lineHeight || "0");
    baseRowHeight.value = lineHeight || 20; // Fallback if lineHeight is 'normal'

    // Set initial height
    if (autoResize && textareaRef.value) {
      adjustTextareaHeight$();
    }
  });

  // Extract onInput$ and onChange$ to avoid serialization issues
  const onInput$ = props.onInput$;
  const onChange$ = props.onChange$;
  const onBlur$ = props.onBlur$;

  // Handler for textarea changes
  const handleInput$ = $((event: InputEvent) => {
    const target = event.target as HTMLTextAreaElement;

    // Update character count
    charCount.value = target.value.length;

    // Trigger auto-resize if enabled
    if (autoResize) {
      adjustTextareaHeight$();
    }

    // Update form field if available
    if (name && form && form.setFieldValue) {
      form.setFieldValue(name, target.value);
    }

    // Call the user's onInput$ handler if provided
    if (onInput$) {
      onInput$(event, target);
    }
  });

  // Handler for textarea changes
  const handleChange$ = $((event: Event) => {
    const target = event.target as HTMLTextAreaElement;

    // Call the user's onChange$ handler if provided
    if (onChange$) {
      onChange$(event, target);
    }
  });

  // Handler for blur events
  const handleBlur$ = $((event: FocusEvent) => {
    // Mark field as touched in form
    if (name && form && form.setFieldTouched) {
      form.setFieldTouched(name, true);
    }

    // Call the user's onBlur$ handler if provided
    if (onBlur$) {
      onBlur$(event);
    }
  });

  // Clear the textarea
  const handleClear$ = $(() => {
    if (textareaRef.value) {
      textareaRef.value.value = "";

      // Trigger a change event to update bindings
      textareaRef.value.dispatchEvent(new Event("input", { bubbles: true }));
      textareaRef.value.dispatchEvent(new Event("change", { bubbles: true }));

      // Update character count
      charCount.value = 0;

      // Update form field if available
      if (name && form && form.setFieldValue) {
        form.setFieldValue(name, "");
      }

      // Reset height if auto-resize is enabled
      if (autoResize) {
        textareaHeight.value = `${baseRowHeight.value * minRows}px`;
        if (textareaRef.value) {
          textareaRef.value.style.height = textareaHeight.value;
        }
      }

      // Focus the textarea after clearing
      textareaRef.value.focus();
    }
  });

  // Determine resize style
  const resizeClass = `resize-${resize === "auto" ? "vertical" : resize}`;

  // Determine container classes
  const containerClasses = [
    "space-y-1",
    fullWidth ? "w-full" : "",
    containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Size-specific styles
  const sizeStyles = {
    sm: "px-2 py-1.5 text-xs leading-4",
    md: "px-3 py-2 text-sm leading-5",
    lg: "px-4 py-3 text-base leading-6",
  }[size];

  // State-specific styles with proper dark mode support
  const defaultStateStyle = "border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400";
  
  const stateStyles =
    {
      default: defaultStateStyle,
      error:
        "border-error-300 dark:border-error-600 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500 dark:focus:ring-error-400",
      warning:
        "border-warning-300 dark:border-warning-600 focus:border-warning-500 dark:focus:border-warning-400 focus:ring-warning-500 dark:focus:ring-warning-400",
      success:
        "border-success-300 dark:border-success-600 focus:border-success-500 dark:focus:border-success-400 focus:ring-success-500 dark:focus:ring-success-400",
    }[effectiveState.value] || defaultStateStyle;

  // Determine textarea classes with proper responsive and dark mode support
  const textareaClasses = [
    // Base styles
    "block w-full rounded-md border shadow-sm transition-colors duration-200",
    "bg-white dark:bg-surface-dark-secondary",
    "text-gray-900 dark:text-gray-50",
    "placeholder-gray-400 dark:placeholder-gray-500",
    "focus:outline-none focus:ring-1",

    // Size styles
    sizeStyles,

    // State styles
    stateStyles,

    // Disabled styles
    disabled
      ? "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60"
      : "hover:border-gray-400 dark:hover:border-gray-500",

    // Custom class
    textareaClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Get form error if any
  const formError = name && form ? form.errors[name] : undefined;

  // Determine if we should show aria-describedby
  const hasDescribedBy = Boolean(
    helperText || errorMessage || warningMessage || successMessage || formError,
  );

  // Message display logic
  const displayedMessage =
    errorMessage || formError || warningMessage || successMessage || helperText;
  const messageType =
    errorMessage || formError
      ? "error"
      : warningMessage
        ? "warning"
        : successMessage
          ? "success"
          : "helper";

  return {
    textareaRef,
    charCount,
    textareaHeight,
    effectiveState,
    handleInput$,
    handleChange$,
    handleBlur$,
    handleClear$,
    defaultCharCount$,
    adjustTextareaHeight$,
    resizeClass,
    containerClasses,
    textareaClasses,
    disabled,
    required,
    showCharCount,
    placeholder,
    minRows,
    helperText,
    errorMessage: errorMessage || formError,
    warningMessage,
    successMessage,
    hasDescribedBy,
    displayedMessage,
    messageType,
    showClear,
    charCountFormatter$,
    maxLength,
    autoResize,
    currentValue,
  };
}
