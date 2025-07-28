import { $, useSignal, type QRL } from "@builder.io/qwik";

export interface UseFileInputOptions {
  disabled?: boolean;
  processFiles$: QRL<(fileList: FileList | File[]) => void>;
}

export function useFileInput(options: UseFileInputOptions) {
  const { disabled = false, processFiles$ } = options;
  const inputRef = useSignal<HTMLInputElement>();

  // Handle file input change
  const handleFileChange = $((event: Event): void => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      processFiles$(input.files);

      // Reset input value to allow selecting the same file again
      input.value = "";
    }
  });

  // Handle browse button click
  const handleBrowse = $(() => {
    if (disabled) return;

    if (inputRef.value) {
      inputRef.value.click();
    }
  });

  return {
    inputRef,
    handleFileChange,
    handleBrowse,
  };
}
