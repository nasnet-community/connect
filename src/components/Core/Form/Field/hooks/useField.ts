import { $, useComputed$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export type FieldType = "text" | "password" | "email" | "number" | "tel" | "url" | "date" | "time" | "datetime-local" | "checkbox" | "radio";
export type FieldSize = "sm" | "md" | "lg";

export interface UseFieldProps {
  type?: FieldType;
  id?: string;
  value?: string | boolean | number;
  error?: string;
  helperText?: string;
  inline?: boolean;
  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  onValueChange$?: QRL<(value: string | boolean | number) => void>;
  size?: FieldSize;
}

export function useField(props: UseFieldProps) {
  const {
    type = "text",
    id,
    onInput$,
    onChange$,
    onValueChange$,
    error,
    helperText,
    inline = false,
    size = "md"
  } = props;

  // Generate unique ID for the input if not provided
  const inputId = id || `field-${Math.random().toString(36).substring(2, 9)}`;
  
  // Determine size-specific classes
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  }[size];
  
  // Handle input events
  const handleInput$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onInput$) {
      onInput$(event, element);
    }
    
    // Process value and call the simplified handler if provided
    if (onValueChange$) {
      const newValue = type === "checkbox" ? element.checked : 
                     type === "number" ? parseFloat(element.value) : 
                     element.value;
      onValueChange$(newValue);
    }
  });
  
  // Handle change events
  const handleChange$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onChange$) {
      onChange$(event, element);
    }
    
    // Call the simplified handler for change events if no input handler
    if (onValueChange$ && !onInput$) {
      const newValue = type === "checkbox" ? element.checked : 
                     type === "number" ? parseFloat(element.value) : 
                     element.value;
      onValueChange$(newValue);
    }
  });
  
  // Compute if the field is a checkbox or radio
  const isToggleInput = type === "checkbox" || type === "radio";
  
  // Compute the container class based on inline mode
  const containerClass = useComputed$(() => 
    inline ? "flex items-center gap-3" : "w-full"
  );

  return {
    inputId,
    sizeClasses,
    handleInput$,
    handleChange$,
    isToggleInput,
    containerClass: containerClass.value,
    hasHelperText: !!helperText && !error,
    hasError: !!error
  };
} 