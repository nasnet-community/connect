import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import Divider from "../Divider";

export default component$(() => {
  return (
    <OverviewTemplate>
      <div class="space-y-6">
        <h2 class="text-xl font-semibold">Introduction</h2>
        <p>
          The Divider component is a simple yet versatile element used to create
          visual separation between different sections of content. It provides a
          clean way to organize content and improve readability by establishing
          clear boundaries.
        </p>

        <h2 class="mt-8 text-xl font-semibold">Key Features</h2>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>
            <span class="font-medium">Multiple Orientations:</span> Support for
            both horizontal and vertical layouts
          </li>
          <li>
            <span class="font-medium">Thickness Options:</span> Thin, medium,
            and thick variants to match visual hierarchy
          </li>
          <li>
            <span class="font-medium">Style Variants:</span> Solid, dashed, and
            dotted line styles
          </li>
          <li>
            <span class="font-medium">Color Options:</span> Theme-aware color
            variants that adapt to dark mode
          </li>
          <li>
            <span class="font-medium">Label Support:</span> Optional text labels
            with customizable positioning
          </li>
          <li>
            <span class="font-medium">Configurable Spacing:</span> Control the
            vertical or horizontal space the divider occupies
          </li>
          <li>
            <span class="font-medium">Accessibility:</span> Proper ARIA
            attributes for screen readers
          </li>
        </ul>

        <h2 class="mt-8 text-xl font-semibold">When to use</h2>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>
            When you need to create a visual separation between content sections
          </li>
          <li>To establish a clear hierarchy in dense content layouts</li>
          <li>As a subtle way to group related items together</li>
          <li>When you want to add section labels in a clean, minimal way</li>
          <li>To visually separate items in a list or menu</li>
        </ul>

        <h2 class="mt-8 text-xl font-semibold">When not to use</h2>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>
            When content sections already have clear visual boundaries (like
            cards)
          </li>
          <li>
            When you need complex separators with icons or interactive elements
          </li>
          <li>
            When the layout already uses sufficient white space for separation
          </li>
          <li>
            In very dense interfaces where extra visual elements might create
            clutter
          </li>
        </ul>

        <h2 class="mt-8 text-xl font-semibold">Basic Example</h2>
        <div class="mt-4 space-y-6 rounded-md border bg-gray-50 p-6 dark:bg-gray-800">
          <div>
            <p class="mb-2">Horizontal divider (default)</p>
            <Divider />
          </div>

          <div>
            <p class="mb-2">Divider with label</p>
            <Divider label="Section" />
          </div>

          <div class="flex h-20">
            <div class="w-1/2">
              <p>Left content</p>
            </div>
            <Divider orientation="vertical" />
            <div class="w-1/2 pl-4">
              <p>Right content</p>
            </div>
          </div>
        </div>
      </div>
    </OverviewTemplate>
  );
});
