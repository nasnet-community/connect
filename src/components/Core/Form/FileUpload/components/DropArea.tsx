import { component$, type QRL } from "@builder.io/qwik";

export interface DropAreaProps {
  id: string;
  name?: string;
  accept?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  browseButtonText?: string;
  dropText?: string;
  filesCountText?: string;
  dropAreaClass?: string;
  browseButtonClass?: string;
  isDragging?: boolean;
  hasFiles?: boolean;
  fileCount?: number;
  onDrop$: QRL<(event: DragEvent) => void>;
  onDragOver$: QRL<(event: DragEvent) => void>;
  onDragLeave$: QRL<(event: DragEvent) => void>;
  onFileChange$: QRL<(event: Event) => void>;
  onBrowse$: QRL<() => void>;
}

export const DropArea = component$<DropAreaProps>((props) => {
  const {
    id,
    name = "file",
    accept,
    multiple = false,
    disabled = false,
    required = false,
    label,
    browseButtonText = "Browse Files",
    dropText = "Drag and drop files here or",
    filesCountText = "",
    dropAreaClass = "",
    browseButtonClass = "",
    isDragging = false,
    hasFiles = false,
    onDrop$,
    onDragOver$,
    onDragLeave$,
    onFileChange$,
    onBrowse$,
  } = props;

  return (
    <div
      class={`relative flex min-h-[160px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
        isDragging
          ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20"
          : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
      } dark:bg-surface-dark-secondary bg-gray-50 ${
        disabled
          ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
      } touch-manipulation active:scale-[0.98] sm:active:scale-100 ${dropAreaClass}`}
      onDrop$={onDrop$}
      onDragOver$={onDragOver$}
      onDragLeave$={onDragLeave$}
      aria-disabled={disabled}
    >
      <input
        type="file"
        id={id}
        name={name}
        accept={Array.isArray(accept) ? accept.join(",") : accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        onChange$={onFileChange$}
        class="sr-only"
        aria-label={label || "File upload"}
      />

      {/* Drop area content */}
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 ${
            isDragging
              ? "text-primary-500 dark:text-primary-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p
          class={`mb-3 text-sm text-gray-600 dark:text-gray-300 ${disabled ? "text-gray-400 dark:text-gray-500" : ""}`}
        >
          {dropText}
        </p>

        <button
          type="button"
          class={`sm:min-h-auto inline-flex min-h-[44px] items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            disabled
              ? "cursor-not-allowed bg-gray-400 text-white opacity-60 hover:bg-gray-400"
              : "touch-manipulation bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:bg-primary-600 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-800"
          } ${browseButtonClass}`}
          onClick$={onBrowse$}
          disabled={disabled}
        >
          {browseButtonText}
        </button>

        {hasFiles && filesCountText && (
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {filesCountText}
          </p>
        )}
      </div>
    </div>
  );
});
