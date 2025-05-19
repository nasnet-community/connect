import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicFileUpload from '../Examples/BasicFileUpload';
import FileUploadLayouts from '../Examples/FileUploadLayouts';
import FileUploadStates from '../Examples/FileUploadStates';
import FileUploadValidation from '../Examples/FileUploadValidation';
import FileUploadVariants from '../Examples/FileUploadVariants';
import AdvancedFileUpload from '../Examples/AdvancedFileUpload';

/**
 * FileUpload component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic File Upload",
      description: "A standard file upload component with drag and drop support. This example demonstrates the basic implementation with minimal configuration.",
      component: <BasicFileUpload />
    },
    {
      title: "File Upload Layouts",
      description: "Different layout options for the file upload component, including horizontal and vertical orientations, custom text, styling, and with/without drag and drop.",
      component: <FileUploadLayouts />
    },
    {
      title: "File Upload States",
      description: "Various states of the FileUpload component including default, error, success, warning, disabled, and required states.",
      component: <FileUploadStates />
    },
    {
      title: "File Upload Validation",
      description: "File validation options including file type restrictions, size limits, custom validation functions, and limiting the number of files.",
      component: <FileUploadValidation />
    },
    {
      title: "File Upload Variants",
      description: "Visual variants of the file upload component including default, bordered, and filled styles, as well as different size options.",
      component: <FileUploadVariants />
    },
    {
      title: "Advanced File Upload",
      description: "Advanced features such as auto-upload, file previews, progress indicators, manual upload controls, and complete file management capabilities.",
      component: <AdvancedFileUpload />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The FileUpload component provides a versatile interface for file uploading with numerous customization options.
        These examples showcase different configurations from basic implementations to advanced use cases with 
        various layouts, states, validation rules, visual variants, and features.
      </p>
    </ExamplesTemplate>
  );
}); 