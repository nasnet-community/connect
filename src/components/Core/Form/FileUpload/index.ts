/**
 * FileUpload Component
 *
 * The FileUpload provides a versatile file uploading interface with drag-and-drop
 * support, file preview, progress tracking, and customizable validation.
 */

// Export components
export { FileUpload } from "./FileUpload";
export { FilePreview } from "./FilePreview";
export { DropArea } from "./components/DropArea";
export { FileList } from "./components/FileList";
export { FileListItem } from "./components/FileListItem";

// Export hooks
export { useFileUpload } from "./hooks/useFileUpload";
export { useDropArea } from "./hooks/useDropArea";
export { useFileInput } from "./hooks/useFileInput";
export { useFileState } from "./hooks/useFileState";
export { useFileFormatter } from "./hooks/useFileFormatter";
export { useFileValidation } from "./hooks/useFileValidation";
export { useFileUploader } from "./hooks/useFileUploader";

// Export types
export type {
  FileUploadProps,
  FileInfo,
  FileUploadSize,
  FileUploadVariant,
  FileUploadState,
  FileUploadLayout,
  FileTypes,
} from "./FileUpload.types";
