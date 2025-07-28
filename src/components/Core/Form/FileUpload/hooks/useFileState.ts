import { $, useSignal, useTask$, noSerialize } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { FileInfo, FileUploadState } from "../FileUpload.types";

export interface UseFileStateOptions {
  value?: FileInfo[];
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  state?: FileUploadState;
  errorMessage?: string;
  warningMessage?: string;
  successMessage?: string;
  onFilesSelected$?: QRL<(files: File[]) => void>;
  onFileRemoved$?: QRL<(file: FileInfo) => void>;
}

export interface ProcessFilesOptions {
  validateFile: QRL<(file: File) => { valid: boolean; error?: string }>;
}

export function useFileState(options: UseFileStateOptions) {
  const {
    value,
    multiple = false,
    maxFiles,
    disabled = false,
    state = "default",
    errorMessage,
    warningMessage,
    successMessage,
    onFilesSelected$,
    onFileRemoved$,
  } = options;

  // File state signals
  const files = useSignal<FileInfo[]>(value || []);
  const effectiveState = useSignal<FileUploadState>(state);

  // Process files for upload
  const processFiles = $(
    (
      fileList: FileList | File[],
      processOptions: ProcessFilesOptions,
    ): void => {
      if (disabled) return;

      const { validateFile } = processOptions;
      const fileArray = Array.from(fileList);
      const newFiles: FileInfo[] = [];

      // Check if adding these files would exceed maxFiles
      if (maxFiles && files.value.length + fileArray.length > maxFiles) {
        effectiveState.value = "error";
        console.error(`Maximum of ${maxFiles} files allowed`);
        return;
      }

      // Process each file
      for (const file of fileArray) {
        const validation = validateFile(file) as unknown as {
          valid: boolean;
          error?: string;
        };

        if (validation.valid) {
          // Generate preview URL synchronously
          const previewUrl =
            file.type.startsWith("image/") || file.type === "application/pdf"
              ? URL.createObjectURL(file)
              : undefined;

          newFiles.push({
            file: noSerialize(file),
            id: Math.random().toString(36).substring(2, 11),
            progress: 0,
            uploading: false,
            succeeded: false,
            failed: false,
            previewUrl,
          });
        } else {
          effectiveState.value = "error";
          if (validation.error) {
            console.error(validation.error);
          }
        }
      }

      // Update files signal
      if (!multiple) {
        // Replace existing files if not multiple
        files.value = newFiles;
      } else {
        // Append to existing files if multiple
        files.value = [...files.value, ...newFiles];
      }

      // Call onFilesSelected callback if provided
      if (onFilesSelected$ && newFiles.length > 0) {
        onFilesSelected$(
          newFiles.map((fileInfo) => fileInfo.file as unknown as File),
        );
      }
    },
  );

  // Handle file removal
  const handleRemoveFile = $((fileId: string): void => {
    if (disabled) return;

    const fileToRemove = files.value.find((file) => file.id === fileId);

    if (fileToRemove) {
      // Revoke object URL if there's a preview
      if (fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      // Update files signal
      files.value = files.value.filter((file) => file.id !== fileId);

      // Call onFileRemoved callback if provided
      if (onFileRemoved$) {
        onFileRemoved$(fileToRemove);
      }
    }
  });

  // Handle clearing all files
  const handleClearAll = $(() => {
    if (disabled) return;

    // Revoke all object URLs for previews
    files.value.forEach((file) => {
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });

    files.value = [];
  });

  // Update file status in the list
  const updateFileStatus = $(
    (fileId: string, updates: Partial<FileInfo>): void => {
      const index = files.value.findIndex((f) => f.id === fileId);

      if (index !== -1) {
        const updatedFiles = [...files.value];
        updatedFiles[index] = { ...updatedFiles[index], ...updates };
        files.value = updatedFiles;
      }
    },
  );

  // Clean up object URLs on unmount
  useTask$(({ cleanup }) => {
    cleanup(() => {
      files.value.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    });
  });

  // Update effective state based on messages and files state
  useTask$(({ track }) => {
    // Track these dependencies
    track(() => errorMessage);
    track(() => warningMessage);
    track(() => successMessage);
    track(() => state);

    if (errorMessage) {
      effectiveState.value = "error";
    } else if (warningMessage) {
      effectiveState.value = "warning";
    } else if (successMessage) {
      effectiveState.value = "success";
    } else {
      effectiveState.value = state;
    }
  });

  return {
    files,
    effectiveState,
    processFiles,
    handleRemoveFile,
    handleClearAll,
    updateFileStatus,
  };
}
