import { component$ } from '@builder.io/qwik';
import { FileUpload } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default Variant</h3>
        <FileUpload
          label="Default variant"
          variant="default"
          helperText="Standard file upload with default styling"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Bordered Variant</h3>
        <FileUpload
          label="Bordered variant"
          variant="bordered"
          helperText="File upload with a more pronounced border"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Filled Variant</h3>
        <FileUpload
          label="Filled variant"
          variant="filled"
          helperText="File upload with a filled background"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <FileUpload
          label="Small file upload"
          size="sm"
          helperText="Compact size for tight spaces"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <FileUpload
          label="Medium file upload"
          size="md"
          helperText="Standard size for most use cases"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <FileUpload
          label="Large file upload"
          size="lg"
          helperText="Larger size for emphasis"
        />
      </div>
    </div>
  );
});
