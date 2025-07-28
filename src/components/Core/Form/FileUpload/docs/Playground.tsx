import { component$, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { FileUpload } from "../FileUpload";
import type { FileInfo } from "../FileUpload.types";

/**
 * FileUpload component playground using the standard template
 */
export default component$(() => {
  // Mock custom uploader for demonstration
  const mockUpload$ = $(
    async (file: File, onProgress: (progress: number) => void) => {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise<void>((resolve) => setTimeout(resolve, 100));
        onProgress(i);
      }
      return { success: true };
    },
  );

  // Define the FileUploadDemo component that will be controlled by the playground
  const FileUploadDemo = component$<{
    label: string;
    helperText: string;
    errorMessage: string;
    size: "sm" | "md" | "lg";
    variant: "default" | "bordered" | "filled";
    layout: "horizontal" | "vertical";
    multiple: boolean;
    required: boolean;
    disabled: boolean;
    dragAndDrop: boolean;
    showPreview: boolean;
    showFileSize: boolean;
    showFileType: boolean;
    showProgress: boolean;
    autoUpload: boolean;
    showUploadButton: boolean;
    showClearAllButton: boolean;
    browseButtonText: string;
    dropText: string;
    acceptTypes: string;
  }>((props) => {
    return (
      <div class="w-full">
        <FileUpload
          label={props.label}
          helperText={props.helperText || undefined}
          errorMessage={props.errorMessage || undefined}
          size={props.size}
          variant={props.variant}
          layout={props.layout}
          multiple={props.multiple}
          required={props.required}
          disabled={props.disabled}
          dragAndDrop={props.dragAndDrop}
          showPreview={props.showPreview}
          showFileSize={props.showFileSize}
          showFileType={props.showFileType}
          showProgress={props.showProgress}
          autoUpload={props.autoUpload}
          showUploadButton={props.showUploadButton}
          showClearAllButton={props.showClearAllButton}
          browseButtonText={props.browseButtonText}
          dropText={props.dropText}
          accept={props.acceptTypes || undefined}
          customUploader$={mockUpload$}
          onFilesSelected$={(selectedFiles: File[]) => {
            console.log("Files selected:", selectedFiles);
          }}
          onComplete$={(uploadedFiles: FileInfo[]) => {
            console.log("Upload complete:", uploadedFiles);
          }}
        />
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "label",
      label: "Label",
      defaultValue: "Upload Files",
    },
    {
      type: "text",
      name: "helperText",
      label: "Helper Text",
      defaultValue: "Drag and drop files or click to browse",
    },
    {
      type: "text",
      name: "errorMessage",
      label: "Error Message",
      defaultValue: "",
    },
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
      defaultValue: "md",
    },
    {
      type: "select",
      name: "variant",
      label: "Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Bordered", value: "bordered" },
        { label: "Filled", value: "filled" },
      ],
      defaultValue: "default",
    },
    {
      type: "select",
      name: "layout",
      label: "Layout",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
      defaultValue: "horizontal",
    },
    {
      type: "boolean",
      name: "multiple",
      label: "Multiple Files",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "required",
      label: "Required",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "dragAndDrop",
      label: "Drag and Drop",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showPreview",
      label: "Show Preview",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showFileSize",
      label: "Show File Size",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showFileType",
      label: "Show File Type",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showProgress",
      label: "Show Progress",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "autoUpload",
      label: "Auto Upload",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showUploadButton",
      label: "Show Upload Button",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showClearAllButton",
      label: "Show Clear All Button",
      defaultValue: false,
    },
    {
      type: "text",
      name: "browseButtonText",
      label: "Browse Button Text",
      defaultValue: "Browse Files",
    },
    {
      type: "text",
      name: "dropText",
      label: "Drop Text",
      defaultValue: "Drag and drop files here or",
    },
    {
      type: "text",
      name: "acceptTypes",
      label: "Accept Types",
      defaultValue: "",
    },
  ];

  return (
    <PlaygroundTemplate component={FileUploadDemo} properties={properties} />
  );
});
