import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * FileUpload component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    // Main properties
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the file upload component",
      defaultValue: "auto-generated",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the file input element",
      defaultValue: "'file'",
    },
    {
      name: "value",
      type: "FileInfo[]",
      description:
        "Controlled value containing array of file information objects",
    },
    {
      name: "defaultValue",
      type: "FileInfo[]",
      description: "Default files to display when component is first mounted",
    },
    {
      name: "accept",
      type: "string | string[]",
      description: "File types to accept (e.g., 'image/*', ['.pdf', '.docx'])",
    },
    {
      name: "multiple",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to allow multiple file selection",
    },
    {
      name: "maxFiles",
      type: "number",
      description: "Maximum number of files that can be selected",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the file upload is required",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the file upload is disabled",
    },

    // Upload controls
    {
      name: "autoUpload",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to automatically upload files when selected",
    },
    {
      name: "showUploadButton",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to show the upload button (only applied when autoUpload is false)",
    },
    {
      name: "uploadButtonText",
      type: "string",
      defaultValue: "'Upload'",
      description: "Text for the upload button",
    },
    {
      name: "showClearAllButton",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a button to clear all selected files",
    },
    {
      name: "clearAllButtonText",
      type: "string",
      defaultValue: "'Clear All'",
      description: "Text for the clear all button",
    },

    // Validation properties
    {
      name: "maxFileSize",
      type: "number",
      description: "Maximum file size in bytes",
    },
    {
      name: "minFileSize",
      type: "number",
      description: "Minimum file size in bytes",
    },
    {
      name: "maxFileSizeExceededText",
      type: "string",
      description: "Error message when a file exceeds the maximum size",
    },
    {
      name: "minFileSizeText",
      type: "string",
      description: "Error message when a file is smaller than the minimum size",
    },
    {
      name: "validateFile$",
      type: "QRL<(file: File) => boolean | string>",
      description:
        "Custom validation function that returns true if valid or an error message if invalid",
    },

    // Display properties
    {
      name: "label",
      type: "string",
      description: "Label text for the file upload",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the file upload",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message to display",
    },
    {
      name: "successMessage",
      type: "string",
      description: "Success message to display after successful upload",
    },
    {
      name: "warningMessage",
      type: "string",
      description: "Warning message to display",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the file upload component",
    },
    {
      name: "variant",
      type: "'default' | 'bordered' | 'filled'",
      defaultValue: "'default'",
      description: "Visual variant of the file upload component",
    },
    {
      name: "layout",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: "Layout orientation of the file upload component",
    },
    {
      name: "state",
      type: "'default' | 'error' | 'success' | 'warning'",
      defaultValue: "'default'",
      description:
        "State of the file upload component, affecting its appearance",
    },
    {
      name: "browseButtonText",
      type: "string",
      defaultValue: "'Browse Files'",
      description: "Text for the browse button",
    },
    {
      name: "dropText",
      type: "string",
      defaultValue: "'Drag and drop files here or'",
      description: "Text displayed in the drop area",
    },
    {
      name: "removeText",
      type: "string",
      defaultValue: "'Remove'",
      description: "Text for the remove button on each file",
    },
    {
      name: "selectedFilesText",
      type: "string",
      defaultValue: "'{count} files selected'",
      description:
        "Template for the selected files count text, {count} will be replaced with the actual count",
    },
    {
      name: "dragAndDrop",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to enable drag and drop functionality",
    },

    // File display options
    {
      name: "showPreview",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show file previews (where supported)",
    },
    {
      name: "showFileList",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show the list of selected files",
    },
    {
      name: "showFileSize",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show file sizes in the file list",
    },
    {
      name: "showFileType",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show file types in the file list",
    },
    {
      name: "showProgress",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show upload progress",
    },

    // Styling properties
    {
      name: "containerClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for the container element",
    },
    {
      name: "dropAreaClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for the drop area",
    },
    {
      name: "browseButtonClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for the browse button",
    },
    {
      name: "fileListClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for the file list",
    },
    {
      name: "fileItemClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for each file item",
    },
    {
      name: "messageClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for helper/error messages",
    },
    {
      name: "labelClass",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS class for the label",
    },

    // Event callbacks
    {
      name: "onFilesSelected$",
      type: "QRL<(files: File[]) => void>",
      description: "Callback when files are selected",
    },
    {
      name: "onUploadStart$",
      type: "QRL<(file: FileInfo) => void>",
      description: "Callback when a file upload starts",
    },
    {
      name: "onUploadProgress$",
      type: "QRL<(file: FileInfo, progress: number) => void>",
      description: "Callback during file upload progress",
    },
    {
      name: "onUploadSuccess$",
      type: "QRL<(file: FileInfo, response?: any) => void>",
      description: "Callback when a file uploads successfully",
    },
    {
      name: "onUploadError$",
      type: "QRL<(file: FileInfo, error?: any) => void>",
      description: "Callback when a file upload fails",
    },
    {
      name: "onFileRemoved$",
      type: "QRL<(file: FileInfo) => void>",
      description: "Callback when a file is removed",
    },
    {
      name: "onComplete$",
      type: "QRL<(files: FileInfo[]) => void>",
      description: "Callback when all uploads are complete",
    },

    // Upload configuration
    {
      name: "uploadUrl",
      type: "string",
      description: "URL to upload files to",
    },
    {
      name: "uploadMethod",
      type: "'POST' | 'PUT'",
      defaultValue: "'POST'",
      description: "HTTP method for uploads",
    },
    {
      name: "uploadHeaders",
      type: "Record<string, string>",
      description: "HTTP headers to include with upload requests",
    },
    {
      name: "uploadFieldName",
      type: "string",
      description: "Form field name for the file in the upload request",
    },
    {
      name: "uploadFormData",
      type: "Record<string, string | Blob>",
      description: "Additional form data to include with the upload",
    },
    {
      name: "customUploader$",
      type: "QRL<(file: File, onProgress: (progress: number) => void) => Promise<any>>",
      description: "Custom function to handle file uploads",
    },
    {
      name: "formatBytes$",
      type: "QRL<(bytes: number) => string>",
      description: "Custom function to format file sizes",
    },
  ];

  const methods: MethodDetail[] = [
    // The FileUpload component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The FileUpload component provides a comprehensive interface for file
        selection and uploading, with extensive customization options for
        appearance, behavior, and validation.
      </p>
      <p class="mt-3">
        The component supports both controlled and uncontrolled usage patterns.
        For controlled usage, provide the value prop and handle file selection
        via callbacks. The FileInfo type represents files with additional
        metadata for tracking upload status.
      </p>
      <p class="mt-3">
        File validation can be performed using built-in options like maxFileSize
        and accept, or with custom validation through the validateFile$ prop.
        For handling the actual upload process, you can use the built-in
        uploader with uploadUrl or provide a customUploader$ function.
      </p>
    </APIReferenceTemplate>
  );
});
