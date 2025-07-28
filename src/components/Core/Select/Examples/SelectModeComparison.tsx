import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const nativeValue = useSignal<string>("");
  const customValue = useSignal<string>("");

  const options = [
    { value: "react", label: "React", group: "Frontend Frameworks" },
    { value: "vue", label: "Vue.js", group: "Frontend Frameworks" },
    { value: "angular", label: "Angular", group: "Frontend Frameworks" },
    { value: "qwik", label: "Qwik", group: "Frontend Frameworks" },
    { value: "node", label: "Node.js", group: "Backend" },
    { value: "express", label: "Express.js", group: "Backend" },
    { value: "fastify", label: "Fastify", group: "Backend" },
    { value: "postgresql", label: "PostgreSQL", group: "Databases" },
    { value: "mongodb", label: "MongoDB", group: "Databases" },
    { value: "redis", label: "Redis", group: "Databases" },
  ];

  return (
    <div class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Native Mode */}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Native Mode
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Uses the browser's native select element. Best for simple use cases
              where you need consistent behavior across all devices and browsers.
            </p>
          </div>

          <Select
            mode="native"
            options={options}
            value={nativeValue.value}
            onChange$={(value) => (nativeValue.value = value as string)}
            placeholder="Choose a technology"
            label="Technology Stack (Native)"
            helperText="This uses the browser's native select element"
          />

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Selected: {nativeValue.value || "None"}
          </div>

          <div class="space-y-2 text-sm">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              Native Mode Benefits:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>Consistent across all platforms</li>
              <li>Better performance</li>
              <li>Built-in accessibility</li>
              <li>Automatic mobile optimization</li>
              <li>No JavaScript required for basic functionality</li>
            </ul>
          </div>
        </div>

        {/* Custom Mode */}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Custom Mode
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Custom-styled dropdown with advanced features like search, grouping,
              and enhanced mobile experience.
            </p>
          </div>

          <Select
            mode="custom"
            options={options}
            value={customValue.value}
            onChange$={(value) => (customValue.value = value as string)}
            placeholder="Choose a technology"
            label="Technology Stack (Custom)"
            helperText="This uses a custom-styled dropdown with search"
            searchable={true}
            clearable={true}
          />

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Selected: {customValue.value || "None"}
          </div>

          <div class="space-y-2 text-sm">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              Custom Mode Benefits:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>Searchable options</li>
              <li>Visual grouping</li>
              <li>Custom styling options</li>
              <li>Enhanced mobile experience</li>
              <li>Loading states and error handling</li>
              <li>Multiple selection support</li>
              <li>Clearable selections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Feature Comparison
        </h4>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-start py-2 text-gray-900 dark:text-gray-100">Feature</th>
                <th class="text-center py-2 text-gray-900 dark:text-gray-100">Native</th>
                <th class="text-center py-2 text-gray-900 dark:text-gray-100">Custom</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 dark:text-gray-400">
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Basic Selection</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Multiple Selection</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Search/Filter</td>
                <td class="text-center py-2">❌</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Option Grouping</td>
                <td class="text-center py-2">✅ (Basic)</td>
                <td class="text-center py-2">✅ (Enhanced)</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Custom Styling</td>
                <td class="text-center py-2">⚠️ (Limited)</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Loading States</td>
                <td class="text-center py-2">❌</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Clearable</td>
                <td class="text-center py-2">❌</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-700/50">
                <td class="py-2">Mobile Optimization</td>
                <td class="text-center py-2">✅ (OS Native)</td>
                <td class="text-center py-2">✅ (Enhanced)</td>
              </tr>
              <tr>
                <td class="py-2">Bundle Size Impact</td>
                <td class="text-center py-2">Minimal</td>
                <td class="text-center py-2">Moderate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <p class="text-sm text-blue-900 dark:text-blue-100">
            <strong>Recommendation:</strong> Use native mode for simple forms and better performance.
            Use custom mode when you need advanced features like search, enhanced styling, or loading states.
          </p>
        </div>
      </div>
    </div>
  );
});