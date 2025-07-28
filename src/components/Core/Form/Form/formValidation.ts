import { $ } from "@builder.io/qwik";
import type { FormValidationRule } from "./Form.types";

export const required = (
  message = "This field is required",
): FormValidationRule => ({
  validator: $((value) => {
    if (value === undefined || value === null || value === "") {
      return message;
    }
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    return undefined;
  }),
  message,
});

export const pattern = (
  pattern: RegExp,
  message = "Invalid format",
): FormValidationRule => ({
  validator: $((value) => {
    if (!value || pattern.test(value)) {
      return undefined;
    }
    return message;
  }),
  message,
});

export const email = (
  message = "Invalid email address",
): FormValidationRule => ({
  validator: $((value) => {
    if (!value) return undefined;

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return message;
    }
    return undefined;
  }),
  message,
});

export const minLength = (
  min: number,
  message?: string,
): FormValidationRule => ({
  validator: $((value) => {
    if (!value) return undefined;

    if (String(value).length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return undefined;
  }),
  message,
});

export const maxLength = (
  max: number,
  message?: string,
): FormValidationRule => ({
  validator: $((value) => {
    if (!value) return undefined;

    if (String(value).length > max) {
      return message || `Must be at most ${max} characters`;
    }
    return undefined;
  }),
  message,
});

export const min = (min: number, message?: string): FormValidationRule => ({
  validator: $((value) => {
    if (value === undefined || value === null || value === "") return undefined;

    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min) {
      return message || `Must be at least ${min}`;
    }
    return undefined;
  }),
  message,
});

export const max = (max: number, message?: string): FormValidationRule => ({
  validator: $((value) => {
    if (value === undefined || value === null || value === "") return undefined;

    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max) {
      return message || `Must be at most ${max}`;
    }
    return undefined;
  }),
  message,
});

export const matches = (
  field: string,
  message?: string,
): FormValidationRule => ({
  validator: $((value, values) => {
    if (!value) return undefined;

    if (value !== values[field]) {
      return message || `Must match ${field}`;
    }
    return undefined;
  }),
  message,
});

export const compose = (rules: FormValidationRule[]): FormValidationRule => ({
  validator: $(async (value, values) => {
    for (const rule of rules) {
      const result = await rule.validator(value, values);
      if (result) {
        return result;
      }
    }
    return undefined;
  }),
});

/**
 * Creates a custom validator based on predefined validation types.
 * This avoids serialization issues by not capturing external functions.
 */
export const custom = (
  validationType:
    | "email"
    | "required"
    | "minLength"
    | "maxLength"
    | "min"
    | "max"
    | "pattern"
    | "matches",
  options: any,
  message = "Invalid value",
): FormValidationRule => {
  // Use existing validators based on the type
  switch (validationType) {
    case "email":
      return email(message);
    case "required":
      return required(message);
    case "minLength":
      return minLength(options, message);
    case "maxLength":
      return maxLength(options, message);
    case "min":
      return min(options, message);
    case "max":
      return max(options, message);
    case "pattern":
      return pattern(options, message);
    case "matches":
      return matches(options, message);
    default:
      // Default empty validator
      return {
        validator: $(() => undefined),
        message,
      };
  }
};

/**
 * Creates custom validators that check for specific conditions.
 * Each condition is pre-defined and doesn't require passing custom functions.
 */
export const customValidators = {
  username: (
    message = "Username can only contain letters, numbers, and underscores",
  ): FormValidationRule => ({
    validator: $((value) => {
      if (!value) return undefined;
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return message;
      }
      return undefined;
    }),
    message,
  }),

  password: (
    message = "Password must include at least one uppercase letter, one lowercase letter, and one number",
  ): FormValidationRule => ({
    validator: $((value) => {
      if (!value) return undefined;
      // Check for password requirements - at least one uppercase, one lowercase, and one number
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
        return message;
      }
      return undefined;
    }),
    message,
  }),

  url: (message = "Please enter a valid URL"): FormValidationRule => ({
    validator: $((value) => {
      if (!value) return undefined;
      try {
        new URL(value);
        return undefined;
      } catch {
        return message;
      }
    }),
    message,
  }),

  // Add more custom validators as needed
};
