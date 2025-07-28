import { component$ } from "@builder.io/qwik";
import { TextArea } from "../TextArea";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default State</h3>
        <TextArea label="Default TextArea" placeholder="Enter text here..." />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error State</h3>
        <TextArea
          label="Error TextArea"
          placeholder="Enter text here..."
          state="error"
          errorMessage="This field has an error that needs to be fixed."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Success State</h3>
        <TextArea
          label="Success TextArea"
          placeholder="Enter text here..."
          state="success"
          successMessage="Your input has been validated successfully."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Warning State</h3>
        <TextArea
          label="Warning TextArea"
          placeholder="Enter text here..."
          state="warning"
          warningMessage="Your input needs attention."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <TextArea
          label="Disabled TextArea"
          placeholder="This textarea is disabled"
          disabled
          value="You cannot edit this content"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Required Field</h3>
        <TextArea
          label="Required TextArea"
          placeholder="This field is required"
          required
          helperText="This field must be filled out before submitting."
        />
      </div>
    </div>
  );
});
