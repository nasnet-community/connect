import { component$, type QRL } from '@builder.io/qwik';
import type { FileInfo } from '../FileUpload.types';
import { FileListItem } from './FileListItem';

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
    fileListClass = '',
    fileItemClass = '',
    removeText = 'Remove',
    disabled = false,
    isUploading = false,
    showClearAllButton = false,
    showUploadButton = true,
    clearAllButtonText = 'Clear All',
    uploadButtonText = 'Upload',
    formatBytes$,
    onRemoveFile$,
    onClearAll$,
    onUpload$
  } = props;

  // Determine upload button classes
  const uploadButtonClasses = [
    'file-upload-upload-button',
    isUploading ? 'file-upload-upload-button-loading' : '',
    disabled ? 'file-upload-upload-button-disabled' : '',
  ].filter(Boolean).join(' ');
  
  // Determine clear button classes
  const clearButtonClasses = [
    'file-upload-clear-button',
    disabled ? 'file-upload-clear-button-disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div class={`file-upload-list ${fileListClass}`}>
      <ul class="file-upload-items">
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
      <div class="file-upload-actions">
        {showUploadButton && files.length > 0 && (
          <button
            type="button"
            class={uploadButtonClasses}
            onClick$={onUpload$}
            disabled={disabled || isUploading || files.every(f => f.succeeded || f.failed)}
          >
            {isUploading ? 'Uploading...' : uploadButtonText}
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