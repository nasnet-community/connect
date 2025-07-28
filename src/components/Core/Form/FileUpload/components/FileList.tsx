import { component$, type QRL } from "@builder.io/qwik";
import type { FileInfo } from "../FileUpload.types";
import { FileListItem } from "./FileListItem";

export interface FileListProps {
  files: FileInfo[];
  showPreview?: boolean;
  showFileType?: boolean;
  showFileSize?: boolean;
  showProgress?: boolean;
  fileListClass?: string;
  fileItemClass?: string;
  removeText?: string;
  disabled?: boolean;
  isUploading?: boolean;
  showClearAllButton?: boolean;
  showUploadButton?: boolean;
  clearAllButtonText?: string;
  uploadButtonText?: string;
  formatBytes$: QRL<(bytes: number) => string>;
  onRemoveFile$: QRL<(fileId: string) => void>;
  onClearAll$: QRL<() => void>;
  onUpload$: QRL<() => Promise<void>>;
}

export const FileList = component$<FileListProps>((props) => {
  const {
    files,
    showPreview = true,
    showFileType = true,
    showFileSize = true,
    showProgress = true,
    fileListClass = "",
    fileItemClass = "",
    removeText = "Remove",
    disabled = false,
    isUploading = false,
    showClearAllButton = false,
    showUploadButton = true,
    clearAllButtonText = "Clear All",
    uploadButtonText = "Upload",
    formatBytes$,
    onRemoveFile$,
    onClearAll$,
    onUpload$,
  } = props;

  // Determine upload button classes
  const uploadButtonClasses = [
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
    "bg-primary-600 hover:bg-primary-700 focus:bg-primary-700",
    "dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:bg-primary-600",
    "text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    "min-h-[44px] sm:min-h-auto touch-manipulation",
    isUploading ? "opacity-75 cursor-wait" : "",
    disabled
      ? "cursor-not-allowed opacity-60 bg-gray-400 hover:bg-gray-400"
      : "active:scale-95",
  ]
    .filter(Boolean)
    .join(" ");

  // Determine clear button classes
  const clearButtonClasses = [
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
    "bg-gray-100 hover:bg-gray-200 focus:bg-gray-200",
    "dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600",
    "text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    "min-h-[44px] sm:min-h-auto touch-manipulation",
    disabled ? "cursor-not-allowed opacity-60" : "active:scale-95",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={`space-y-4 ${fileListClass}`}>
      <ul class="space-y-2">
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            showPreview={showPreview}
            showFileType={showFileType}
            showFileSize={showFileSize}
            showProgress={showProgress}
            fileItemClass={fileItemClass}
            removeText={removeText}
            disabled={disabled}
            formatBytes$={formatBytes$}
            onRemove$={onRemoveFile$}
          />
        ))}
      </ul>

      {/* Action buttons */}
      <div class="flex flex-col gap-2 sm:flex-row sm:gap-3">
        {showUploadButton && files.length > 0 && (
          <button
            type="button"
            class={uploadButtonClasses}
            onClick$={onUpload$}
            disabled={
              disabled ||
              isUploading ||
              files.every((f) => f.succeeded || f.failed)
            }
          >
            {isUploading ? "Uploading..." : uploadButtonText}
          </button>
        )}

        {showClearAllButton && files.length > 0 && (
          <button
            type="button"
            class={clearButtonClasses}
            onClick$={onClearAll$}
            disabled={disabled || isUploading}
          >
            {clearAllButtonText}
          </button>
        )}
      </div>
    </div>
  );
});
