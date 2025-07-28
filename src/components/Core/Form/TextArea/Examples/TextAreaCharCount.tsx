import { component$, useSignal, $ } from "@builder.io/qwik";
import { TextArea } from "../TextArea";

export default component$(() => {
  const value = useSignal("");

  // Custom character count formatter
  const customFormatter = $((current: number, max?: number) => {
    if (max) {
      const remaining = max - current;
      const percentUsed = Math.round((current / max) * 100);
      return `${current}/${max} characters (${percentUsed}%) - ${remaining} remaining`;
    }
    return `${current} characters`;
  });

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">
          TextArea with Character Count
        </h3>
        <TextArea
          label="Limited Input (100 characters)"
          placeholder="Start typing to see the character counter..."
          maxLength={100}
          showCharCount
          value={value.value}
          onInput$={(event, element) => {
            value.value = element.value;
          }}
          helperText="You can type up to 100 characters in this field"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          TextArea with Custom Counter Format
        </h3>
        <TextArea
          label="Custom Counter Format"
          placeholder="Type to see custom character count format..."
          maxLength={200}
          showCharCount
          charCountFormatter$={customFormatter}
          value={value.value}
          onInput$={(event, element) => {
            value.value = element.value;
          }}
          helperText="This example uses a custom formatter for the character count"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Character Count without Limit
        </h3>
        <TextArea
          label="Unlimited Counter"
          placeholder="Type to see character count without a limit..."
          showCharCount
          value={value.value}
          onInput$={(event, element) => {
            value.value = element.value;
          }}
          helperText="This counter shows the character count without imposing a limit"
        />
      </div>
    </div>
  );
});
