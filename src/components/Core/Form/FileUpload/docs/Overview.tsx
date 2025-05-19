import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * FileUpload component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Drag and drop file selection with traditional file browser fallback",
    "Single and multiple file upload support",
    "File validation with size limits, type filtering, and custom validation",
    "Progress indicators for upload status",
    "File previews for images and other supported file types",
    "Automatic and manual upload modes",
    "Customizable layouts, variants, and sizes",
    "Complete file management with list view and actions"
  ];

  const whenToUse = [
    "When collecting file attachments in forms",
    "When users need to upload images, documents, or other files",
    "When you need to preview files before submission",
    "When you want to display upload progress to users",
    "When implementing document management interfaces",
    "When collecting multiple files with validation requirements"
  ];

  const whenNotToUse = [
    "When a simpler input is sufficient (e.g., avatar upload may use a more specialized component)",
    "When file uploads aren't necessary and text input would suffice",
    "When handling very large files that require specialized chunking solutions",
    "When custom file manipulation or processing is required before upload",
    "When direct access to file system directories is needed (consider a desktop application instead)"
  ];

  return (
    <OverviewTemplate
      title="FileUpload Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The FileUpload component provides a user-friendly interface for uploading files within
        a web application. It combines drag-and-drop functionality with traditional file browser
        selection to accommodate different user preferences.
      </p>
      <p class="mt-2">
        This component handles the complete file upload lifecycle, including selection,
        validation, preview, upload progress tracking, and management. It offers extensive
        customization options through props for different appearance styles, layouts, and behaviors.
      </p>
      <p class="mt-2">
        FileUpload supports both automatic and manual upload modes, allowing for immediate
        uploading on file selection or giving users control over when to initiate the upload
        process. With built-in support for file previews, progress indicators, and error handling,
        it provides a comprehensive solution for file management in web applications.
      </p>
    </OverviewTemplate>
  );
}); 