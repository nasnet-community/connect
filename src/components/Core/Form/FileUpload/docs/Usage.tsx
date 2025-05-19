import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * FileUpload component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Provide clear instructions",
      description: "Use labels and helper text to clearly communicate what types of files are accepted.",
      code: `<FileUpload 
  label="Upload product images"
  helperText="Upload JPG, PNG, or WebP images up to 5MB"
  accept="image/jpeg,image/png,image/webp"
  maxFileSize={5 * 1024 * 1024}
/>`,
      type: "do"
    },
    {
      title: "Show file previews when appropriate",
      description: "Enable previews for visual content like images to help users confirm they've selected the correct files.",
      code: `<FileUpload 
  label="Upload your profile picture"
  accept="image/*"
  showPreview={true}
  helperText="Select an image to use as your profile picture"
/>`,
      type: "do"
    },
    {
      title: "Communicate upload progress",
      description: "For larger files, display upload progress to keep users informed about the status of their upload.",
      code: `<FileUpload 
  label="Upload video"
  accept="video/*"
  showProgress={true}
  helperText="Upload progress will be shown while your video is being uploaded"
/>`,
      type: "do"
    },
    {
      title: "Implement appropriate validation",
      description: "Set restrictions on file types, sizes, and quantities based on your application's requirements.",
      code: `<FileUpload 
  label="Upload documents"
  accept={['.pdf', '.docx', '.doc']}
  maxFileSize={10 * 1024 * 1024}
  maxFiles={5}
  multiple
  validateFile$={(file) => {
    // Custom validation logic
    if (file.name.includes('confidential')) {
      return "Files with 'confidential' in the name are not allowed";
    }
    return true;
  }}
/>`,
      type: "do"
    },
    {
      title: "Don't rely solely on client-side validation",
      description: "Always implement server-side validation as client-side can be bypassed.",
      code: `// Client-side validation alone is insufficient
<FileUpload 
  accept="image/*"
  maxFileSize={5 * 1024 * 1024}
/>

// Server-side validation must also be implemented in your API endpoints`,
      type: "dont"
    },
    {
      title: "Don't overload with too many files",
      description: "Set reasonable limits on the number of files that can be uploaded at once.",
      code: `// Avoid allowing unlimited file uploads
<FileUpload 
  multiple
  // Missing maxFiles prop can lead to performance issues
/>

// Better approach
<FileUpload 
  multiple
  maxFiles={10}
  helperText="Upload up to 10 files"
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use appropriate file type restrictions",
      description: "Set the accept prop to limit file selection to the types your application can handle."
    },
    {
      title: "Implement auto-upload for single file scenarios",
      description: "When only one file is expected, using autoUpload can streamline the user experience."
    },
    {
      title: "Add retry capabilities for failed uploads",
      description: "Allow users to retry failed uploads rather than requiring them to select files again."
    },
    {
      title: "Balance aesthetic and function",
      description: "Choose the layout, variant, and size that best fits your application's design while maintaining usability."
    },
    {
      title: "Use layout appropriate for the number of files",
      description: "Vertical layout often works better for multiple file uploads, while horizontal can be suitable for single file uploads."
    },
    {
      title: "Provide meaningful error messages",
      description: "When files fail validation or upload, explain why and suggest corrective actions."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Ensure keyboard navigability",
      description: "All controls should be accessible via keyboard navigation (Tab, Enter, Space)."
    },
    {
      title: "Use descriptive labels",
      description: "Provide clear labels and instructions that screen readers can announce."
    },
    {
      title: "Make error messages programmatically associated",
      description: "Ensure error messages are properly linked to the upload control with aria attributes."
    },
    {
      title: "Support screen reader announcements of progress",
      description: "Use appropriate ARIA attributes for upload progress to keep screen reader users informed."
    },
    {
      title: "Provide alternative methods",
      description: "Always include the file browser button, not just drag and drop, as it's more accessible."
    },
    {
      title: "Use high contrast text and controls",
      description: "Ensure all UI elements have sufficient contrast for users with visual impairments."
    }
  ];

  const performanceTips = [
    "Implement file size limits to prevent excessive memory usage",
    "Consider using separate endpoints for uploading multiple files rather than one large request",
    "Optimize image previews by creating appropriate sized thumbnails rather than loading full images",
    "Use the autoUpload prop judiciously as it can lead to unnecessary uploads of files users don't intend to keep",
    "Implement client-side compression for image uploads when appropriate",
    "Consider chunked uploading for very large files to improve reliability"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The FileUpload component provides a versatile interface for uploading files in web applications.
        It supports various file validation options, display configurations, and upload methods to adapt
        to different use cases.
      </p>
      <p class="mt-2">
        When implementing file uploads, consider your users' needs and technical constraints.
        Balance the convenience of features like drag-and-drop and auto-upload with performance
        considerations and accessibility requirements. Always implement both client-side and server-side
        validation to ensure security and data integrity.
      </p>
    </UsageTemplate>
  );
}); 