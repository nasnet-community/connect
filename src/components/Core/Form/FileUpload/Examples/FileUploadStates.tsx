import { component$ } from '@builder.io/qwik';
import { FileUpload } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default State</h3>
        <FileUpload
          label="Default state"
          helperText="Standard file upload with no specific state"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error State</h3>
        <FileUpload
          label="Error state"
          state="error"
          errorMessage="There was an error uploading your files"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Success State</h3>
        <FileUpload
          label="Success state"
          state="success"
          successMessage="Files uploaded successfully"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Warning State</h3>
        <FileUpload
          label="Warning state"
          state="warning"
          warningMessage="Some files might be too large"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Disabled State</h3>
        <FileUpload
          label="Disabled file upload"
          helperText="This file upload component cannot be used"
          disabled
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Required Field</h3>
        <FileUpload
          label="Required file upload"
          helperText="You must upload at least one file"
          required
        />
      </div>
    </div>
  );
});
