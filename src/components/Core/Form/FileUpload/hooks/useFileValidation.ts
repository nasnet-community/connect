import { $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseFileValidationOptions {
  maxFileSize?: number;
  minFileSize?: number;
  maxFileSizeExceededText?: string;
  minFileSizeText?: string;
  validateFile$?: QRL<(file: File) => boolean | string>;
  formatBytes$: QRL<(bytes: number) => string>;
  formatText$: QRL<
    (template: string, replacements: Record<string, string | number>) => string
  >;
}

export function useFileValidation(options: UseFileValidationOptions) {
  const {
    maxFileSize,
    minFileSize,
    maxFileSizeExceededText = "File exceeds maximum size of {maxSize}",
    minFileSizeText = "File size must be at least {minSize}",
    validateFile$,
    formatBytes$,
    formatText$,
  } = options;

  // Validate file against constraints
  const validateFile = $((file: File): { valid: boolean; error?: string } => {
    if (maxFileSize && file.size > maxFileSize) {
      // Handle max size validation
      const formattedSize = formatBytes$(maxFileSize) as unknown as string;
      const errorMessage = formatText$(maxFileSizeExceededText, {
        maxSize: formattedSize,
      }) as unknown as string;

      return {
        valid: false,
        error: errorMessage,
      };
    }

    if (minFileSize && file.size < minFileSize) {
      // Handle min size validation
      const formattedSize = formatBytes$(minFileSize) as unknown as string;
      const errorMessage = formatText$(minFileSizeText, {
        minSize: formattedSize,
      }) as unknown as string;

      return {
        valid: false,
        error: errorMessage,
      };
    }

    if (validateFile$) {
      // Handle custom validation
      const result = validateFile$(file) as unknown as string | boolean;

      if (typeof result === "string") {
        return { valid: false, error: result };
      }

      if (result === false) {
        return { valid: false, error: "Invalid file" };
      }
    }

    return { valid: true };
  });

  return {
    validateFile,
  };
}
