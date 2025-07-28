import { component$, useSignal } from "@builder.io/qwik";
import { TextArea } from "../TextArea";

export default component$(() => {
  const value = useSignal(
    "Type here and watch the textarea grow as you add more content.\nTry adding multiple lines to see how it expands.",
  );

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Auto-resizing TextArea</h3>
        <TextArea
          label="Auto-resize Example"
          placeholder="Start typing to see the auto-resize effect..."
          autoResize
          minRows={2}
          maxRows={8}
          value={value.value}
          onInput$={(event, element) => {
            value.value = element.value;
          }}
          helperText="This textarea will auto-resize between 2 and 8 rows as you type"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Fixed-height TextArea (for comparison)
        </h3>
        <TextArea
          label="Fixed-height Example"
          placeholder="This textarea will not auto-resize..."
          minRows={3}
          value={value.value}
          onInput$={(event, element) => {
            value.value = element.value;
          }}
          helperText="This textarea maintains a fixed height regardless of content"
        />
      </div>
    </div>
  );
});
