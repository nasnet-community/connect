import { $, useSignal, type QRL } from "@builder.io/qwik";

export interface UseDropAreaOptions {
  disabled?: boolean;
  dragAndDrop?: boolean;
  processFiles$: QRL<(fileList: FileList | File[]) => void>;
}

export function useDropArea(options: UseDropAreaOptions) {
  const { disabled = false, dragAndDrop = true, processFiles$ } = options;

  const dropAreaRef = useSignal<HTMLDivElement>();
  const isDragging = useSignal(false);

  // Handle file drop
  const handleDrop = $((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    isDragging.value = false;

    if (disabled || !dragAndDrop) return;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      processFiles$(event.dataTransfer.files);
    }
  });

  // Handle drag over
  const handleDragOver = $((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled || !dragAndDrop) return;

    isDragging.value = true;
  });

  // Handle drag leave
  const handleDragLeave = $((event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled || !dragAndDrop) return;

    // Only set isDragging to false if we're leaving the drop area (not a child element)
    if (
      dropAreaRef.value &&
      !dropAreaRef.value.contains(event.relatedTarget as Node)
    ) {
      isDragging.value = false;
    }
  });

  return {
    dropAreaRef,
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
}
