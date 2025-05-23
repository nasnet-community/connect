import { component$, useTask$, useSignal, type QRL } from '@builder.io/qwik';
import { FilePreview } from '../FilePreview';
// import { ProgressBar } from '../../../DataDisplay/Progress/ProgressBar/ProgressBar';
import type { FileInfo } from '../FileUpload.types';

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
    fileItemClass = '',
    removeText = 'Remove',
    disabled = false,
    formatBytes$,
    onRemove$
  } = props;

  // Store serializable file metadata
  const fileName = useSignal('');
  const fileType = useSignal('');
  const fileSize = useSignal(0);

  // Extract necessary file metadata on component initialization
  useTask$(() => {
    // Access file properties safely with type casting
    const fileObj = file.file as unknown as File;
    fileName.value = fileObj.name;
    fileType.value = fileObj.type || 'Unknown type';
    fileSize.value = fileObj.size;
  });

  return (
    <li class={`file-upload-item ${fileItemClass}`}>
      <div class="file-upload-item-content">
        {/* File preview */}
        {showPreview && file.previewUrl && (
          <FilePreview
            url={file.previewUrl}
            fileName={fileName.value}
            fileType={fileType.value}
          />
        )}
        
        {/* File details */}
        <div class="file-upload-item-details">
          <div class="file-upload-item-name">
            {fileName.value}
          </div>
          
          {showFileType && (
            <div class="file-upload-item-type">
              {fileType.value}
            </div>
          )}
          
          {showFileSize && (
            <div class="file-upload-item-size">
              {formatBytes$(fileSize.value)}
            </div>
          )}
          
          {/* Progress bar */}
          {showProgress && (file.uploading || file.succeeded || file.failed) && (
            <div class="file-upload-progress">
              {/* <ProgressBar
                value={file.progress}
                color={file.failed ? 'error' : (file.succeeded ? 'success' : 'primary')}
                size="xs"
                showValue={false}
              /> */}
              {file.error && (
                <div class="file-upload-error">{file.error}</div>
              )}
            </div>
          )}
        </div>
        
        {/* Remove button */}
        {!disabled && (
          <button
            type="button"
            class="file-upload-remove-button"
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