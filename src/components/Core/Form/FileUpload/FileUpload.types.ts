import type { QRL, NoSerialize } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadVariant = "default" | "bordered" | "filled";
export type FileUploadState = "default" | "error" | "success" | "warning";
export type FileUploadLayout = "horizontal" | "vertical";
export type FileTypes = string[] | string;

export interface FileInfo {
  file: NoSerialize<File>;
  id: string;
  progress: number;
  uploading: boolean;
  succeeded: boolean;
  failed: boolean;
  error?: string;
  previewUrl?: string;
}

export interface FileUploadProps
  extends Omit<QwikIntrinsicElements["div"], "onChange$"> {
  id?: string;
  name?: string;
  size?: FileUploadSize;
  variant?: FileUploadVariant;
  layout?: FileUploadLayout;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  browseButtonText?: string;
  dropText?: string;
  removeText?: string;
  selectedFilesText?: string;
  dragAndDrop?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  minFileSize?: number;
  maxFileSizeExceededText?: string;
  minFileSizeText?: string;
  autoUpload?: boolean;
  showPreview?: boolean;
  showFileList?: boolean;
  showFileSize?: boolean;
  showFileType?: boolean;
  showProgress?: boolean;
  containerClass?: string;
  dropAreaClass?: string;
  browseButtonClass?: string;
  fileListClass?: string;
  fileItemClass?: string;
  messageClass?: string;
  labelClass?: string;
  accept?: FileTypes;
  onFilesSelected$?: QRL<(files: File[]) => void>;
  onUploadStart$?: QRL<(file: FileInfo) => void>;
  onUploadProgress$?: QRL<(file: FileInfo, progress: number) => void>;
  onUploadSuccess$?: QRL<(file: FileInfo, response?: any) => void>;
  onUploadError$?: QRL<(file: FileInfo, error?: any) => void>;
  onFileRemoved$?: QRL<(file: FileInfo) => void>;
  uploadUrl?: string;
  uploadMethod?: "POST" | "PUT";
  uploadHeaders?: Record<string, string>;
  uploadFieldName?: string;
  uploadFormData?: Record<string, string | Blob>;
  validateFile$?: QRL<(file: File) => boolean | string>;
  customUploader$?: QRL<
    (file: File, onProgress: (progress: number) => void) => Promise<any>
  >;
  onComplete$?: QRL<(files: FileInfo[]) => void>;
  value?: FileInfo[];
  defaultValue?: FileInfo[];
  showClearAllButton?: boolean;
  clearAllButtonText?: string;
  state?: FileUploadState;
  showUploadButton?: boolean;
  uploadButtonText?: string;
  formatBytes$?: QRL<(bytes: number) => string>;
}
