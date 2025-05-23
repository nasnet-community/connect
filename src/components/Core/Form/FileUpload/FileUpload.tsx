import { component$ } from '@builder.io/qwik';
import type { FileUploadProps } from './FileUpload.types';
import { FormLabel } from '../FormLabel';
import { FormHelperText } from '../FormHelperText';
import { FormErrorMessage } from '../FormErrorMessage';
import { useFileUpload } from './hooks/useFileUpload';
import { useDropArea } from './hooks/useDropArea';
import { useFileInput } from './hooks/useFileInput';
import { DropArea } from './components/DropArea';
import { FileList } from './components/FileList';

export const FileUpload = component$<FileUploadProps>((props) => {
  const {
    id = `file-upload-${Math.random().toString(36).substring(2, 11)}`,
    name = 'file',
    size = 'md',
    variant = 'default',
    layout = 'horizontal',
    disabled = false,
    required = false,
    label,
    helperText,
    errorMessage,
    successMessage,
    warningMessage,
    browseButtonText = 'Browse Files',
    dropText = 'Drag and drop files here or',
    removeText = 'Remove',
    selectedFilesText = '{count} files selected',
    dragAndDrop = true,
    multiple = false,
    accept,
    autoUpload = false,
    showPreview = true,
    showFileList = true,
    showFileSize = true,
    showFileType = true,
    showProgress = true,
    containerClass = '',
    dropAreaClass = '',
    browseButtonClass = '',
    fileListClass = '',
    fileItemClass = '',
    messageClass = '',
    labelClass = '',
    showClearAllButton = false,
    clearAllButtonText = 'Clear All',
    showUploadButton = true,
    uploadButtonText = 'Upload',
  } = props;

  const { 
    files, 
    isUploading,
    formatBytes,
    formatText,
    processFiles,
    handleRemoveFile,
    handleClearAll,
    uploadFiles
  } = useFileUpload(props);
  
  const {
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave
  } = useDropArea({
    disabled,
    dragAndDrop,
    processFiles$: processFiles 
  });
  
  const {
    handleFileChange,
    handleBrowse
  } = useFileInput({
    disabled,
    processFiles$: processFiles
  });
  
  /**
   * Format the file count text
   * 
   * Note: We manually format the count here instead of using reactivity
   * to avoid Qwik serialization warnings with File objects
   */
  const getFilesCountText = (): string => {
    const fileCount = files.value.length;
    if (fileCount === 0) return '';
    
    // Cast to string to ensure proper type
    return formatText(selectedFilesText, { count: fileCount }) as unknown as string;
  };
  
  // Determine container classes
  const containerClasses = [
    'file-upload-container',
    `file-upload-${size}`,
    `file-upload-${variant}`,
    disabled ? 'file-upload-disabled' : '',
    containerClass
  ].filter(Boolean).join(' ');
  
  // Determine drop area classes
  const dropAreaClasses = [
    'file-upload-drop-area',
    isDragging.value ? 'file-upload-drag-active' : '',
    `file-upload-drop-area-${layout}`,
    disabled ? 'file-upload-drop-area-disabled' : '',
    dropAreaClass
  ].filter(Boolean).join(' ');
  
  // Determine browse button classes
  const browseButtonClasses = [
    'file-upload-browse-button',
    `file-upload-browse-button-${size}`,
    disabled ? 'file-upload-browse-button-disabled' : '',
    browseButtonClass
  ].filter(Boolean).join(' ');

  return (
    <div class={containerClasses}>
      {/* Label */}
      {label && (
        <FormLabel
          for={id}
          class={labelClass}
          required={required}
        >
          {label}
        </FormLabel>
      )}
      
      {/* Drop area and file input */}
      <DropArea
        id={id}
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        label={label}
        browseButtonText={browseButtonText}
        dropText={dropText}
        filesCountText={getFilesCountText()}
        dropAreaClass={dropAreaClasses}
        browseButtonClass={browseButtonClasses}
        isDragging={isDragging.value}
        hasFiles={files.value.length > 0}
        fileCount={files.value.length}
        onDrop$={handleDrop}
        onDragOver$={handleDragOver}
        onDragLeave$={handleDragLeave}
        onFileChange$={handleFileChange}
        onBrowse$={handleBrowse}
      />
      
      {/* File list */}
      {showFileList && files.value.length > 0 && (
        <FileList
          files={files.value}
          showPreview={showPreview}
          showFileType={showFileType}
          showFileSize={showFileSize}
          showProgress={showProgress}
          fileListClass={fileListClass}
          fileItemClass={fileItemClass}
          removeText={removeText}
          disabled={disabled}
          isUploading={isUploading.value}
          showClearAllButton={showClearAllButton}
          showUploadButton={showUploadButton && !autoUpload}
          clearAllButtonText={clearAllButtonText}
          uploadButtonText={uploadButtonText}
          formatBytes$={formatBytes}
          onRemoveFile$={handleRemoveFile}
          onClearAll$={handleClearAll}
          onUpload$={uploadFiles}
        />
      )}
      
      {/* Helper/Error/Success/Warning message */}
      {helperText && !errorMessage && !warningMessage && !successMessage && (
        <FormHelperText class={messageClass}>
          {helperText}
        </FormHelperText>
      )}
      
      {errorMessage && (
        <FormErrorMessage class={messageClass} data-state="error">
          {errorMessage}
        </FormErrorMessage>
      )}
      
      {!errorMessage && warningMessage && (
        <FormErrorMessage class={messageClass} data-state="warning">
          {warningMessage}
        </FormErrorMessage>
      )}
      
      {!errorMessage && !warningMessage && successMessage && (
        <FormErrorMessage class={messageClass} data-state="success">
          {successMessage}
        </FormErrorMessage>
      )}
    </div>
  );
});
