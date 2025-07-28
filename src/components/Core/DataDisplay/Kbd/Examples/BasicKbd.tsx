import { component$ } from "@builder.io/qwik";
import { Kbd } from "../Kbd";

export const BasicKbd = component$(() => {
  return (
    <div class="space-y-8">
      {/* Basic Usage */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Basic Usage</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Kbd>Enter</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Delete</Kbd>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Press <Kbd>Enter</Kbd> to submit the form
          </p>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Size Variants</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Kbd size="sm">A</Kbd>
            <span class="text-sm text-gray-600">Small</span>
          </div>
          <div class="flex items-center gap-4">
            <Kbd size="md">A</Kbd>
            <span class="text-sm text-gray-600">Medium (default)</span>
          </div>
          <div class="flex items-center gap-4">
            <Kbd size="lg">A</Kbd>
            <span class="text-sm text-gray-600">Large</span>
          </div>
        </div>
      </section>

      {/* Visual Variants */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Visual Variants</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Kbd variant="raised">Raised</Kbd>
            <span class="text-sm text-gray-600">Default 3D effect</span>
          </div>
          <div class="flex items-center gap-4">
            <Kbd variant="flat">Flat</Kbd>
            <span class="text-sm text-gray-600">Flat style</span>
          </div>
          <div class="flex items-center gap-4">
            <Kbd variant="outlined">Outlined</Kbd>
            <span class="text-sm text-gray-600">Outlined style</span>
          </div>
        </div>
      </section>

      {/* Special Keys */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Special Keys</h3>
        <div class="flex flex-wrap gap-3">
          <Kbd>F1</Kbd>
          <Kbd>F2</Kbd>
          <Kbd>F3</Kbd>
          <Kbd>Home</Kbd>
          <Kbd>End</Kbd>
          <Kbd>Page Up</Kbd>
          <Kbd>Page Down</Kbd>
          <Kbd>Print Screen</Kbd>
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Custom Styling</h3>
        <div class="flex gap-4">
          <Kbd class="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Custom
          </Kbd>
          <Kbd class="border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Gradient
          </Kbd>
        </div>
      </section>
    </div>
  );
});
