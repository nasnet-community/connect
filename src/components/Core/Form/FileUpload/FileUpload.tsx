import { component$ } from "@builder.io/qwik";
import type { FileUploadProps } from "./FileUpload.types";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";
import { useFileUpload } from "./hooks/useFileUpload";
import { useDropArea } from "./hooks/useDropArea";
import { useFileInput } from "./hooks/useFileInput";
import { DropArea } from "./components/DropArea";
import { FileList } from "./components/FileList";

export const FileUpload = component$<FileUploadProps>((props) => {
  const {
    id = `file-upload-${Math.random().toString(36).substring(2, 11)}`,
    name = "file",
    size = "md",
    layout = "horizontal",
    disabled = false,
    required = false,
    label,
    helperText,
    errorMessage,
    successMessage,
    warningMessage,
    browseButtonText = "Browse Files",
    dropText = "Drag and drop files here or",
    removeText = "Remove",
    selectedFilesText = "{count} files selected",
    dragAndDrop = true,
    multiple = false,
    accept,
    autoUpload = false,
    showPreview = true,
    showFileList = true,
    showFileSize = true,
    showFileType = true,
    showProgress = true,
    containerClass = "",
    dropAreaClass = "",
    browseButtonClass = "",
    fileListClass = "",
    fileItemClass = "",
    messageClass = "",
    labelClass = "",
    showClearAllButton = false,
    clearAllButtonText = "Clear All",
    showUploadButton = true,
    uploadButtonText = "Upload",
  } = props;

  const {
    files,
    isUploading,
    formatBytes,
    formatText,
    processFiles,
    handleRemoveFile,
    handleClearAll,
    uploadFiles,
  } = useFileUpload(props);

  const { isDragging, handleDrop, handleDragOver, handleDragLeave } =
    useDropArea({
      disabled,
      dragAndDrop,
      processFiles$: processFiles,
    });

  const { handleFileChange, handleBrowse } = useFileInput({
    disabled,
    processFiles$: processFiles,
  });

  /**
   * Format the file count text
   *
   * Note: We manually format the count here instead of using reactivity
   * to avoid Qwik serialization warnings with File objects
   */
  const getFilesCountText = (): string => {
    const fileCount = files.value.length;
    if (fileCount === 0) return "";

    // Cast to string to ensure proper type
    return formatText(selectedFilesText, {
      count: fileCount,
    }) as unknown as string;
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "space-y-3",
      dropArea: "p-4 min-h-[120px]",
      text: "text-sm",
      button: "px-3 py-1.5 text-xs",
    },
    md: {
      container: "space-y-4",
      dropArea: "p-6 min-h-[160px]",
      text: "text-base",
      button: "px-4 py-2 text-sm",
    },
    lg: {
      container: "space-y-5",
      dropArea: "p-8 min-h-[200px]",
      text: "text-lg",
      button: "px-5 py-2.5 text-base",
    },
  }[size];

  // Determine container classes
  const containerClasses = [
    "w-full",
    sizeConfig.container,
    disabled ? "opacity-60 cursor-not-allowed" : "",
    containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine drop area classes with mobile optimization
  const dropAreaClasses = [
    "relative border-2 border-dashed rounded-lg transition-all duration-200 flex flex-col items-center justify-center",
    sizeConfig.dropArea,
    isDragging.value
      ? "border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20"
      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
    "bg-gray-50 dark:bg-surface-dark-secondary",
    layout === "horizontal" ? "flex-row space-x-4 px-6" : "text-center",
    disabled
      ? "cursor-not-allowed border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
      : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50",
    // Mobile optimizations
    "touch-manipulation active:scale-[0.98] sm:active:scale-100",
    dropAreaClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine browse button classes with mobile touch targets
  const browseButtonClasses = [
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200",
    "bg-primary-600 hover:bg-primary-700 focus:bg-primary-700",
    "dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:bg-primary-600",
    "text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
    sizeConfig.button,
    disabled
      ? "cursor-not-allowed opacity-60 bg-gray-400 hover:bg-gray-400"
      : "active:scale-95 touch-manipulation",
    // Ensure minimum touch target on mobile
    "min-h-[44px] sm:min-h-auto",
    browseButtonClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={containerClasses}>
      {/* Label */}
      {label && (
        <FormLabel for={id} class={labelClass} required={required}>
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
        <FormHelperText class={messageClass}>{helperText}</FormHelperText>
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
