import { component$ } from "@builder.io/qwik";
import { TextArea } from "../TextArea";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">No Resize</h3>
        <TextArea
          label="No Resize"
          placeholder="This textarea cannot be resized by the user"
          resize="none"
          helperText="resize='none'"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Vertical Resize (Default)</h3>
        <TextArea
          label="Vertical Resize"
          placeholder="This textarea can be resized vertically only"
          resize="vertical"
          helperText="resize='vertical'"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Horizontal Resize</h3>
        <TextArea
          label="Horizontal Resize"
          placeholder="This textarea can be resized horizontally only"
          resize="horizontal"
          helperText="resize='horizontal'"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Both Directions Resize</h3>
        <TextArea
          label="Resize Both Directions"
          placeholder="This textarea can be resized in both directions"
          resize="both"
          helperText="resize='both'"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Auto Resize (Browser Default)
        </h3>
        <TextArea
          label="Auto Resize (Browser Default)"
          placeholder="This textarea uses the browser's default resize behavior"
          resize="auto"
          helperText="resize='auto'"
        />
      </div>
    </div>
  );
});
