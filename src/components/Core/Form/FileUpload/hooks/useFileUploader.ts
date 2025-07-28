/**
 * NOTE: This file contains code that triggers Qwik serialization warnings.
 *
 * These warnings appear because we're working with File objects inside closures.
 * File objects are not serializable by Qwik, but our component needs to handle them.
 *
 * We've structured the code to work despite these warnings by:
 * 1. Working with file IDs instead of direct File references where possible
 * 2. Only accessing File objects when needed during execution
 * 3. Adding explicit comments where serialization warnings are expected
 * 4. Using proper type casting to handle File objects
 *
 * These warnings don't affect functionality but indicate a known limitation
 * when working with browser File objects in Qwik.
 */
import { $, useSignal } from "@builder.io/qwik";
import type { QRL, Signal } from "@builder.io/qwik";
import type { FileInfo } from "../FileUpload.types";

/**
 * Options for the useFileUploader hook
 */
export interface UseFileUploaderOptions {
  files: Signal<FileInfo[]>;
  disabled?: boolean;
  uploadUrl?: string;
  uploadMethod?: "POST" | "PUT";
  uploadHeaders?: Record<string, string>;
  uploadFieldName?: string;
  uploadFormData?: Record<string, string | Blob>;
  customUploader$?: QRL<
    (file: File, onProgress: (progress: number) => void) => Promise<any>
  >;
  onUploadStart$?: QRL<(file: FileInfo) => void>;
  onUploadProgress$?: QRL<(file: FileInfo, progress: number) => void>;
  onUploadSuccess$?: QRL<(file: FileInfo, response?: any) => void>;
  onUploadError$?: QRL<(file: FileInfo, error?: any) => void>;
  onComplete$?: QRL<(files: FileInfo[]) => void>;
  updateFileStatus$: QRL<(fileId: string, updates: Partial<FileInfo>) => void>;
}

export function useFileUploader(options: UseFileUploaderOptions) {
  const {
    files,
    disabled = false,
    uploadUrl,
    uploadMethod = "POST",
    uploadHeaders = {},
    uploadFieldName = "file",
    uploadFormData,
    customUploader$,
    onUploadStart$,
    onUploadProgress$,
    onUploadSuccess$,
    onUploadError$,
    onComplete$,
    updateFileStatus$,
  } = options;

  // Track uploading state
  const isUploading = useSignal(false);

  // Handle uploading files
  const uploadFiles = $(async () => {
    if (disabled || !files.value.length || isUploading.value) return;

    isUploading.value = true;

    // Store file IDs that need to be uploaded
    const fileIdsToUpload: string[] = [];

    // Mark files as uploading and collect IDs
    files.value.forEach((file) => {
      if (!file.succeeded && !file.failed) {
        updateFileStatus$(file.id, {
          uploading: true,
          progress: 0,
        });
        fileIdsToUpload.push(file.id);
      }
    });

    // Upload each file that hasn't been uploaded yet
    const promises = fileIdsToUpload.map((fileId) => uploadFileById(fileId));

    await Promise.all(promises);

    isUploading.value = false;

    // Call onComplete callback if provided
    if (onComplete$) {
      onComplete$(files.value);
    }
  });

  // Upload a file by ID to avoid serialization issues
  const uploadFileById = $(async (fileId: string) => {
    // Note: Accessing files.value within this closure will show serialization warnings
    // because File objects inside FileInfo cannot be serialized by Qwik.
    // This is expected and doesn't affect functionality, as we're using the ID to
    // access the current state at execution time.
    const fileInfo = files.value.find((f) => f.id === fileId);
    if (!fileInfo || fileInfo.succeeded || fileInfo.failed) return;

    // Call onUploadStart callback if provided
    if (onUploadStart$) {
      onUploadStart$(fileInfo);
    }

    try {
      // Use custom uploader if provided
      if (customUploader$) {
        await uploadWithCustomUploader(fileId);
      }
      // Use built-in upload if URL provided
      else if (uploadUrl) {
        await uploadToServer(fileId);
      }
      // Simulate upload if no real upload mechanism provided
      else {
        await simulateUpload(fileId);
      }
    } catch (error) {
      // Mark as failed
      updateFileStatus$(fileId, {
        uploading: false,
        failed: true,
        error: error instanceof Error ? error.message : "Upload failed",
      });

      // Call onUploadError callback if provided
      if (onUploadError$) {
        const fileInfo = files.value.find((f) => f.id === fileId);
        if (fileInfo) {
          onUploadError$(fileInfo, error);
        }
      }
    }
  });

  // Upload with custom uploader
  const uploadWithCustomUploader = $(async (fileId: string) => {
    if (!customUploader$) return;

    // Get file info by ID for this specific closure
    // Note: Serialization warning expected here due to File object
    const fileInfo = files.value.find((f) => f.id === fileId);
    if (!fileInfo) return;

    // Create a safe copy of the file for the closure
    const fileToUpload = fileInfo.file as unknown as File;

    const handleProgress = (progress: number) => {
      // Update progress
      updateFileStatus$(fileId, { progress });

      // Call onUploadProgress callback if provided
      if (onUploadProgress$) {
        const currentFileInfo = files.value.find((f) => f.id === fileId);
        if (currentFileInfo) {
          onUploadProgress$(currentFileInfo, progress);
        }
      }
    };

    // Use custom uploader
    const response = await customUploader$(fileToUpload, handleProgress);

    // Mark as succeeded
    updateFileStatus$(fileId, {
      uploading: false,
      succeeded: true,
      progress: 100,
    });

    // Call onUploadSuccess callback if provided
    if (onUploadSuccess$) {
      const currentFileInfo = files.value.find((f) => f.id === fileId);
      if (currentFileInfo) {
        onUploadSuccess$(currentFileInfo, response);
      }
    }
  });

  // Upload a file to server
  const uploadToServer = $(async (fileId: string) => {
    if (!uploadUrl) return;

    // Get file info by ID for this specific closure
    // Note: Serialization warning expected here due to File object
    const fileInfo = files.value.find((f) => f.id === fileId);
    if (!fileInfo) return;

    // Create a safe copy of the file for the closure
    const fileToUpload = fileInfo.file as unknown as File;

    const formData = new FormData();
    formData.append(uploadFieldName, fileToUpload);

    // Add additional form data if provided
    if (uploadFormData) {
      Object.entries(uploadFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const xhr = new XMLHttpRequest();

    // Set up progress tracking
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);

        // Update progress
        updateFileStatus$(fileId, { progress });

        // Call onUploadProgress callback if provided
        if (onUploadProgress$) {
          const currentFileInfo = files.value.find((f) => f.id === fileId);
          if (currentFileInfo) {
            onUploadProgress$(currentFileInfo, progress);
          }
        }
      }
    });

    // Wait for the request to complete
    await new Promise<void>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Mark as succeeded
          updateFileStatus$(fileId, {
            uploading: false,
            succeeded: true,
            progress: 100,
          });

          // Call onUploadSuccess callback if provided
          if (onUploadSuccess$) {
            const currentFileInfo = files.value.find((f) => f.id === fileId);
            if (currentFileInfo) {
              try {
                const response = JSON.parse(xhr.responseText);
                onUploadSuccess$(currentFileInfo, response);
              } catch (e) {
                onUploadSuccess$(currentFileInfo, xhr.responseText);
              }
            }
          }

          resolve();
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network Error"));
      };

      xhr.open(uploadMethod, uploadUrl);

      // Add headers
      Object.entries(uploadHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.send(formData);
    });
  });

  // Simulate file upload for demo purposes
  const simulateUpload = $(async (fileId: string) => {
    const totalSteps = 10;

    for (let step = 1; step <= totalSteps; step++) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const progress = Math.round((step / totalSteps) * 100);

      // Update progress
      updateFileStatus$(fileId, { progress });

      // Call onUploadProgress callback if provided
      if (onUploadProgress$) {
        const currentFileInfo = files.value.find((f) => f.id === fileId);
        if (currentFileInfo) {
          onUploadProgress$(currentFileInfo, progress);
        }
      }
    }

    // Mark as succeeded
    updateFileStatus$(fileId, {
      uploading: false,
      succeeded: true,
      progress: 100,
    });

    // Call onUploadSuccess callback if provided
    if (onUploadSuccess$) {
      const currentFileInfo = files.value.find((f) => f.id === fileId);
      if (currentFileInfo) {
        onUploadSuccess$(currentFileInfo, { success: true });
      }
    }
  });

  return {
    isUploading,
    uploadFiles,
  };
}
