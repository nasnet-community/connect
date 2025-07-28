import { component$, $, useSignal } from "@builder.io/qwik";
import { FileUpload } from "../index";
import type { FileInfo } from "../FileUpload.types";

export default component$(() => {
  const uploadedFiles = useSignal<FileInfo[]>([]);

  // Handler for when upload is complete
  const handleComplete$ = $((files: FileInfo[]) => {
    console.log("Upload complete with files:", files);
    uploadedFiles.value = files;
  });

  // Mock custom uploader
  const customUploader$ = $(
    async (file: File, onProgress: (progress: number) => void) => {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        onProgress(i);
      }

      // Return a mock response
      return {
        success: true,
        fileUrl: URL.createObjectURL(file),
        message: "File uploaded successfully",
      };
    },
  );

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Auto Upload Mode</h3>
        <FileUpload
          label="Auto upload files"
          autoUpload
          showProgress
          multiple
          onComplete$={handleComplete$}
          helperText="Files are automatically uploaded when selected"
          customUploader$={customUploader$}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Preview</h3>
        <FileUpload
          label="Files with preview"
          showPreview
          showFileSize
          showFileType
          multiple
          accept="image/*"
          helperText="Image files will be displayed with previews"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Manual Upload with Button</h3>
        <FileUpload
          label="Manual upload"
          showUploadButton
          showProgress
          uploadButtonText="Start Upload"
          multiple
          customUploader$={customUploader$}
          onComplete$={handleComplete$}
          helperText="Select files and click the upload button to start"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Complete File Management</h3>
        <FileUpload
          label="Complete file management"
          showPreview
          showFileSize
          showFileType
          showProgress
          showClearAllButton
          clearAllButtonText="Remove All"
          showUploadButton
          uploadButtonText="Upload Selected"
          multiple
          customUploader$={customUploader$}
          onComplete$={handleComplete$}
          helperText="Complete file management with all controls"
        />
      </div>
    </div>
  );
});
