import { component$ } from "@builder.io/qwik";
import { Input } from "~/components/Core/Input";

export const InputSizes = component$(() => {
  return (
    <div class="space-y-6 p-6">
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Input Sizes
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Different input sizes optimized for various use cases and devices. 
          All sizes include mobile-optimized touch targets.
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Small (sm) - Compact layouts
          </h4>
          <Input
            size="sm"
            label="Small Input"
            placeholder="Compact size for dense layouts"
          />
        </div>

        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Medium (md) - Default size
          </h4>
          <Input
            size="md"
            label="Medium Input"
            placeholder="Default size for most use cases"
          />
        </div>

        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Large (lg) - Prominent display
          </h4>
          <Input
            size="lg"
            label="Large Input"
            placeholder="Larger size for important fields"
          />
        </div>

        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Extra Large (xl) - Hero sections
          </h4>
          <Input
            size="xl"
            label="Extra Large Input"
            placeholder="Maximum size for hero sections and landing pages"
          />
        </div>
      </div>

      <div class="mt-8">
        <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          Size Comparison
        </h4>
        <div class="grid gap-3">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
          <Input size="xl" placeholder="Extra Large" />
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
          📱 Mobile Optimization
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          All sizes include mobile-optimized minimum heights to ensure 
          touch-friendly interaction on mobile devices. The sizes automatically 
          adjust based on screen size using responsive design principles.
        </p>
      </div>

      <div class="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">Size Guidelines:</h4>
        <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li><strong>sm:</strong> Dense layouts, sidebar forms, inline editing</li>
          <li><strong>md:</strong> Standard forms, most common use case</li>
          <li><strong>lg:</strong> Important fields, checkout forms, signup</li>
          <li><strong>xl:</strong> Hero sections, landing pages, search bars</li>
        </ul>
      </div>
    </div>
  );
});