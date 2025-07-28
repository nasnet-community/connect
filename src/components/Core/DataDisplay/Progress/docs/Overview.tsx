import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import { ProgressBar, Spinner } from "../index";

export default component$(() => {
  return (
    <OverviewTemplate
      title="Progress"
      description="Progress components provide visual feedback about ongoing operations and processes."
      importStatement="import { ProgressBar, Spinner } from '~/components/Core/DataDisplay/Progress';"
      features={[
        "Two types: ProgressBar and Spinner for different feedback needs",
        "Multiple sizes, colors, and variants for visual flexibility",
        "Indeterminate state for unknown progress durations",
        "Buffer state for operations with preparatory phases",
        "Accessible with proper ARIA attributes",
        "Customizable labels and value display options",
        "Animation control for performance optimization",
      ]}
    >
      <div class="flex flex-col gap-8 md:flex-row md:items-center">
        <div class="flex-1 space-y-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <div class="space-y-3">
            <h3 class="text-lg font-medium">ProgressBar</h3>
            <ProgressBar value={65} showValue />
            <ProgressBar
              value={40}
              buffer={80}
              color="primary"
              label="Downloading..."
            />
            <ProgressBar indeterminate color="success" />
          </div>
        </div>

        <div class="flex-1 space-y-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <div class="space-y-6">
            <h3 class="text-lg font-medium">Spinner</h3>
            <div class="flex items-center gap-8">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
            <div class="flex items-center gap-8">
              <Spinner variant="dots" color="primary" />
              <Spinner variant="circle" color="secondary" />
              <Spinner variant="bars" color="success" />
            </div>
          </div>
        </div>
      </div>
    </OverviewTemplate>
  );
});
