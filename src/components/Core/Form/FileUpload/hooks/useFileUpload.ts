import { $ } from "@builder.io/qwik";
import type { FileUploadProps } from "../FileUpload.types";
import { useFileState } from "./useFileState";
import { useFileFormatter } from "./useFileFormatter";
import { useFileValidation } from "./useFileValidation";
import { useFileUploader } from "./useFileUploader";

export function useFileUpload(props: FileUploadProps) {
  const {
    disabled = false,
    multiple = false,
    maxFiles,
    maxFileSize,
    minFileSize,
    maxFileSizeExceededText = "File exceeds maximum size of {maxSize}",
    minFileSizeText = "File size must be at least {minSize}",
    autoUpload = false,
    validateFile$,
  } = props;

  // Use formatter hook for bytes and text formatting
  const { formatBytes, formatText } = useFileFormatter({
    customFormatBytes$: props.formatBytes$,
  });

  // Use validation hook for file validation
  const { validateFile } = useFileValidation({
    maxFileSize,
    minFileSize,
    maxFileSizeExceededText,
    minFileSizeText,
    validateFile$,
    formatBytes$: formatBytes,
    formatText$: formatText,
  });

  // Use file state hook for managing file state
  const {
    files,
    effectiveState,
    processFiles,
    handleRemoveFile,
    handleClearAll,
    updateFileStatus,
  } = useFileState({
    value: props.value,
    multiple,
    maxFiles,
    disabled,
    state: props.state,
    errorMessage: props.errorMessage,
    warningMessage: props.warningMessage,
    successMessage: props.successMessage,
    onFilesSelected$: props.onFilesSelected$,
    onFileRemoved$: props.onFileRemoved$,
  });

  // Use file uploader hook for upload functionality
  const { isUploading, uploadFiles } = useFileUploader({
    files,
    disabled,
    uploadUrl: props.uploadUrl,
    uploadMethod: props.uploadMethod || "POST",
    uploadHeaders: props.uploadHeaders || {},
    uploadFieldName: props.uploadFieldName || "file",
    uploadFormData: props.uploadFormData,
    customUploader$: props.customUploader$,
    onUploadStart$: props.onUploadStart$,
    onUploadProgress$: props.onUploadProgress$,
    onUploadSuccess$: props.onUploadSuccess$,
    onUploadError$: props.onUploadError$,
    onComplete$: props.onComplete$,
    updateFileStatus$: updateFileStatus,
  });

  // Process files with validation
  const processFilesWithValidation = $((fileList: FileList | File[]): void => {
    processFiles(fileList, { validateFile });

    // Auto upload if enabled and new files were added
    if (autoUpload && fileList.length > 0) {
      uploadFiles();
    }
  });

  return {
    files,
    effectiveState,
    isUploading,
    formatBytes,
    formatText,
    processFiles: processFilesWithValidation,
    handleRemoveFile,
    handleClearAll,
    uploadFiles,
  };
}
