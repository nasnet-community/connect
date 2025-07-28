import { component$ } from "@builder.io/qwik";
import { ProgressBar } from "~/components/Core/DataDisplay/Progress";

export const BasicProgressBar = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Progress Bar</h3>
        <ProgressBar value={60} />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">
          Progress Bar with Value Display
        </h3>
        <ProgressBar value={75} showValue />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Progress Bar with Custom Label</h3>
        <ProgressBar value={85} label="Uploading files" showValue />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Indeterminate Progress Bar</h3>
        <ProgressBar indeterminate />
      </div>
    </div>
  );
});
