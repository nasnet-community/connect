export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The FileUpload component can be easily integrated into any Qwik application. Import the component from your components directory and provide the necessary props for controlled input handling.

Basic integration example:
\`\`\`tsx
import { component$, useSignal } from '@builder.io/qwik';
import { FileUpload } from '~/components/Core/Form/FileUpload';
import type { FileInfo } from '~/components/Core/Form/FileUpload/FileUpload.types';

export default component$(() => {
  const files = useSignal<FileInfo[]>([]);
  
  return (
    <FileUpload
      label="Upload Documents"
      accept={['.pdf', '.docx']}
      multiple
      onFilesSelected$={(selectedFiles) => {
        console.log('Files selected:', selectedFiles);
      }}
    />
  );
});
\`\`\`
`;

export const customization = `
The FileUpload component is highly customizable through props. You can control its appearance, behavior, and validation rules to fit your application's needs.

Key customization areas:
- **Visual styling**: Use the variant, size, and layout props to adjust appearance
- **File handling**: Configure multiple, accept, maxFiles, and maxFileSize to control what files can be uploaded
- **User experience**: Customize dragAndDrop, showPreview, showFileSize, showProgress, and other display options
- **Behavior**: Use autoUpload for immediate uploads or showUploadButton for manual control
- **Text**: Customize labels, helper text, button text, and error messages

For custom upload handling, provide your own customUploader$ function:
\`\`\`tsx
const customUploader$ = $(async (file: File, onProgress: (progress: number) => void) => {
  // Your custom upload logic here
  // Report progress
  onProgress(50);
  
  // Return result when complete
  return { success: true, fileUrl: 'https://example.com/file' };
});

<FileUpload
  customUploader$={customUploader$}
  // other props
/>
\`\`\`
`;
