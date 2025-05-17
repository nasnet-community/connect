import { component$, type QRL } from '@builder.io/qwik';

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
    name = 'file',
    accept,
    multiple = false,
    disabled = false,
    required = false,
    label,
    browseButtonText = 'Browse Files',
    dropText = 'Drag and drop files here or',
    filesCountText = '',
    dropAreaClass = '',
    browseButtonClass = '',
    isDragging = false,
    hasFiles = false,
    onDrop$,
    onDragOver$,
    onDragLeave$,
    onFileChange$,
    onBrowse$
  } = props;

  return (
    <div
      class={`file-upload-drop-area ${isDragging ? 'file-upload-drag-active' : ''} ${dropAreaClass}`}
      onDrop$={onDrop$}
      onDragOver$={onDragOver$}
      onDragLeave$={onDragLeave$}
      aria-disabled={disabled}
    >
      <input
        type="file"
        id={id}
        name={name}
        accept={Array.isArray(accept) ? accept.join(',') : accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        onChange$={onFileChange$}
        class="sr-only"
        aria-label={label || 'File upload'}
      />
      
      {/* Drop area content */}
      <div class="file-upload-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="file-upload-icon h-12 w-12 mb-2"
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
        
        <p class="file-upload-text">
          {dropText}
        </p>
        
        <button
          type="button"
          class={`file-upload-browse-button ${browseButtonClass}`}
          onClick$={onBrowse$}
          disabled={disabled}
        >
          {browseButtonText}
        </button>
        
        {hasFiles && filesCountText && (
          <p class="file-upload-count mt-2">
            {filesCountText}
          </p>
        )}
      </div>
    </div>
  );
}); 