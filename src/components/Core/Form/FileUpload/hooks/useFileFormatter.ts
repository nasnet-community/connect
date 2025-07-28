import { $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseFileFormatterOptions {
  customFormatBytes$?: QRL<(bytes: number) => string>;
}

export function useFileFormatter(options: UseFileFormatterOptions = {}) {
  const { customFormatBytes$ } = options;

  // Format bytes to human readable format
  const formatBytes = $((bytes: number): string => {
    if (customFormatBytes$) {
      const result = customFormatBytes$(bytes) as unknown as string;
      return result;
    }

    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  });

  // Format text with replacements
  const formatText = $(
    (
      template: string,
      replacements: Record<string, string | number>,
    ): string => {
      let result = template;

      for (const key in replacements) {
        result = result.replace(`{${key}}`, String(replacements[key]));
      }

      return result;
    },
  );

  return {
    formatBytes,
    formatText,
  };
}
