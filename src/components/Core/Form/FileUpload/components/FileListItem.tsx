import { component$, useTask$, useSignal, type QRL } from "@builder.io/qwik";
import { FilePreview } from "../FilePreview";
// import { ProgressBar } from '../../../DataDisplay/Progress/ProgressBar/ProgressBar';
import type { FileInfo } from "../FileUpload.types";

export interface FileListItemProps {
  file: FileInfo;
  showPreview?: boolean;
  showFileType?: boolean;
  showFileSize?: boolean;
  showProgress?: boolean;
  fileItemClass?: string;
  removeText?: string;
  disabled?: boolean;
  formatBytes$: QRL<(bytes: number) => string>;
  onRemove$: QRL<(fileId: string) => void>;
}

export const FileListItem = component$<FileListItemProps>((props) => {
  const {
    file,
    showPreview = true,
    showFileType = true,
    showFileSize = true,
    showProgress = true,
    fileItemClass = "",
    removeText = "Remove",
    disabled = false,
    formatBytes$,
    onRemove$,
  } = props;

  // Store serializable file metadata
  const fileName = useSignal("");
  const fileType = useSignal("");
  const fileSize = useSignal(0);

  // Extract necessary file metadata on component initialization
  useTask$(() => {
    // Access file properties safely with type casting
    const fileObj = file.file as unknown as File;
    fileName.value = fileObj.name;
    fileType.value = fileObj.type || "Unknown type";
    fileSize.value = fileObj.size;
  });

  return (
    <li
      class={`dark:bg-surface-dark-secondary flex items-center rounded-lg border border-gray-200 bg-white p-3 transition-all duration-200 hover:shadow-sm dark:border-gray-700 ${fileItemClass}`}
    >
      <div class="flex min-w-0 flex-1 items-start space-x-3">
        {/* File preview */}
        {showPreview && file.previewUrl && (
          <div class="h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
            <FilePreview
              url={file.previewUrl}
              fileName={fileName.value}
              fileType={fileType.value}
            />
          </div>
        )}

        {/* File details */}
        <div class="min-w-0 flex-1">
          <div class="mb-1 truncate text-sm font-medium text-gray-900 dark:text-gray-100">
            {fileName.value}
          </div>

          <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            {showFileType && <div class="uppercase">{fileType.value}</div>}

            {showFileType && showFileSize && <span>•</span>}

            {showFileSize && <div>{formatBytes$(fileSize.value)}</div>}
          </div>

          {/* Progress bar */}
          {showProgress &&
            (file.uploading || file.succeeded || file.failed) && (
              <div class="mt-2">
                <div class="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    class={`absolute left-0 top-0 h-full transition-all duration-300 ease-out ${
                      file.failed
                        ? "bg-error-500 dark:bg-error-400"
                        : file.succeeded
                          ? "bg-success-500 dark:bg-success-400"
                          : "bg-primary-500 dark:bg-primary-400"
                    }`}
                    style={{ width: `${file.progress || 0}%` }}
                  />
                </div>
                {file.error && (
                  <div class="mt-1 text-xs text-error-600 dark:text-error-400">
                    {file.error}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Remove button - Mobile optimized with proper touch target */}
        {!disabled && (
          <button
            type="button"
            class="flex-shrink-0 touch-manipulation rounded-full p-1.5 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-primary-400"
            onClick$={() => onRemove$(file.id)}
            aria-label={`Remove file`}
            title={removeText}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
});
