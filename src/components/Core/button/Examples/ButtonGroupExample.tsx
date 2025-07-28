import { component$ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiPlusMini,
  HiPencilMini,
  HiTrashMini,
  HiArrowDownTrayMini,
  HiArrowUpTrayMini,
  HiShareMini,
} from "@qwikest/icons/heroicons";

export const HorizontalButtonGroupExample = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex gap-2">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline">Reset</Button>
      </div>

      <div class="flex gap-3">
        <Button size="sm" variant="primary">
          Small
        </Button>
        <Button size="sm" variant="secondary">
          Group
        </Button>
        <Button size="sm" variant="outline">
          Example
        </Button>
      </div>

      <div class="flex gap-4">
        <Button size="lg" variant="primary">
          Large
        </Button>
        <Button size="lg" variant="secondary">
          Button
        </Button>
        <Button size="lg" variant="outline">
          Group
        </Button>
      </div>
    </div>
  );
});

export const ButtonGroupWithIconsExample = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex gap-2">
        <Button variant="primary" leftIcon>
          <span q:slot="leftIcon">
            <HiPlusMini class="h-4 w-4" />
          </span>
          Create
        </Button>
        <Button variant="secondary" leftIcon>
          <span q:slot="leftIcon">
            <HiPencilMini class="h-4 w-4" />
          </span>
          Edit
        </Button>
        <Button variant="error" leftIcon>
          <span q:slot="leftIcon">
            <HiTrashMini class="h-4 w-4" />
          </span>
          Delete
        </Button>
      </div>

      <div class="flex gap-2">
        <Button variant="outline" rightIcon>
          Download
          <span q:slot="rightIcon">
            <HiArrowDownTrayMini class="h-4 w-4" />
          </span>
        </Button>
        <Button variant="outline" rightIcon>
          Upload
          <span q:slot="rightIcon">
            <HiArrowUpTrayMini class="h-4 w-4" />
          </span>
        </Button>
        <Button variant="outline" rightIcon>
          Share
          <span q:slot="rightIcon">
            <HiShareMini class="h-4 w-4" />
          </span>
        </Button>
      </div>
    </div>
  );
});

export const MixedVariantGroupExample = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex gap-2">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="ghost">More Options</Button>
      </div>

      <div class="flex gap-2">
        <Button variant="success">Confirm</Button>
        <Button variant="warning">Proceed with Caution</Button>
        <Button variant="error">Cancel</Button>
      </div>

      <div class="flex gap-2">
        <Button variant="info">Information</Button>
        <Button variant="outline">Alternative</Button>
        <Button variant="ghost">Additional</Button>
      </div>
    </div>
  );
});

export const ResponsiveButtonGroupExample = component$(() => {
  return (
    <div class="space-y-4">
      {/* Stacks on mobile, horizontal on larger screens */}
      <div class="flex flex-col gap-2 sm:flex-row">
        <Button variant="primary" responsive>
          Save Changes
        </Button>
        <Button variant="secondary" responsive>
          Discard
        </Button>
        <Button variant="outline" responsive>
          Preview
        </Button>
      </div>

      {/* Full width on mobile, auto width on larger screens */}
      <div class="flex flex-col gap-2 sm:flex-row">
        <Button variant="primary" class="w-full sm:w-auto">
          Mobile Full
        </Button>
        <Button variant="secondary" class="w-full sm:w-auto">
          Desktop Auto
        </Button>
        <Button variant="outline" class="w-full sm:w-auto">
          Responsive
        </Button>
      </div>

      {/* Grid layout that adjusts columns */}
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Button variant="primary" fullWidth>
          Option 1
        </Button>
        <Button variant="secondary" fullWidth>
          Option 2
        </Button>
        <Button variant="outline" fullWidth>
          Option 3
        </Button>
      </div>
    </div>
  );
});

export const ButtonGroupSizesExample = component$(() => {
  return (
    <div class="space-y-6">
      {/* Small button group */}
      <div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Small Button Group
        </p>
        <div class="flex gap-2">
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="sm" variant="secondary">
            Button
          </Button>
          <Button size="sm" variant="outline">
            Group
          </Button>
        </div>
      </div>

      {/* Medium button group */}
      <div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Medium Button Group
        </p>
        <div class="flex gap-3">
          <Button size="md" variant="primary">
            Medium
          </Button>
          <Button size="md" variant="secondary">
            Button
          </Button>
          <Button size="md" variant="outline">
            Group
          </Button>
        </div>
      </div>

      {/* Large button group */}
      <div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Large Button Group
        </p>
        <div class="flex gap-4">
          <Button size="lg" variant="primary">
            Large
          </Button>
          <Button size="lg" variant="secondary">
            Button
          </Button>
          <Button size="lg" variant="outline">
            Group
          </Button>
        </div>
      </div>
    </div>
  );
});

export const CompactButtonGroupExample = component$(() => {
  return (
    <div class="space-y-4">
      {/* Compact group with no spacing */}
      <div class="flex">
        <Button variant="outline" class="rounded-r-none border-r-0">
          Left
        </Button>
        <Button variant="outline" class="rounded-none">
          Center
        </Button>
        <Button variant="outline" class="rounded-l-none border-l-0">
          Right
        </Button>
      </div>

      {/* Segmented control style */}
      <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
        <Button
          variant="ghost"
          class="rounded-r-none border-r border-gray-300 dark:border-gray-600"
        >
          Day
        </Button>
        <Button variant="primary" class="rounded-none">
          Week
        </Button>
        <Button
          variant="ghost"
          class="rounded-l-none border-l border-gray-300 dark:border-gray-600"
        >
          Month
        </Button>
      </div>
    </div>
  );
});
