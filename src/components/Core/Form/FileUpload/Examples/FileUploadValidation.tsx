import { component$, $ } from "@builder.io/qwik";
import { FileUpload } from "../index";

export default component$(() => {
  // File size validation (max 5MB)
  const validateFileSize$ = $((file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size should not exceed 5MB";
    }
    return true;
  });

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Accept Images Only</h3>
        <FileUpload
          label="Upload images"
          accept="image/*"
          helperText="Only image files are allowed (JPG, PNG, GIF, etc.)"
          multiple
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Accept Specific File Types</h3>
        <FileUpload
          label="Upload documents"
          accept={[".pdf", ".doc", ".docx", ".txt"]}
          helperText="Only PDF, Word, and text files are allowed"
          multiple
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Maximum File Size</h3>
        <FileUpload
          label="Upload files (max 5MB)"
          maxFileSize={5 * 1024 * 1024} // 5MB in bytes
          maxFileSizeExceededText="File exceeds the maximum allowed size of 5MB"
          helperText="Files should not exceed 5MB in size"
          multiple
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Custom File Validation</h3>
        <FileUpload
          label="Upload files with custom validation"
          validateFile$={validateFileSize$}
          helperText="Custom validation checks if files are less than 5MB"
          multiple
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Maximum Number of Files</h3>
        <FileUpload
          label="Upload up to 3 files"
          maxFiles={3}
          helperText="You can upload a maximum of 3 files"
          multiple
        />
      </div>
    </div>
  );
});
