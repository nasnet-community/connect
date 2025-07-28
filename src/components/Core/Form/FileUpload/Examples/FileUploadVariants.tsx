import { component$ } from "@builder.io/qwik";
import { FileUpload } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default Variant</h3>
        <FileUpload
          label="Default variant"
          variant="default"
          helperText="Standard file upload with default styling"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Bordered Variant</h3>
        <FileUpload
          label="Bordered variant"
          variant="bordered"
          helperText="File upload with a more pronounced border"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Filled Variant</h3>
        <FileUpload
          label="Filled variant"
          variant="filled"
          helperText="File upload with a filled background"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <FileUpload
          label="Small file upload"
          size="sm"
          helperText="Compact size for tight spaces"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <FileUpload
          label="Medium file upload"
          size="md"
          helperText="Standard size for most use cases"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <FileUpload
          label="Large file upload"
          size="lg"
          helperText="Larger size for emphasis"
        />
      </div>
    </div>
  );
});
