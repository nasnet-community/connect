import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail } from '~/components/Docs/templates/APIReferenceTemplate';
import CodeExample from '~/components/Docs/CodeExample';

export const SpacerAPIReference = component$(() => {
  const spacerProps: PropDetail[] = [
    {
      name: "size",
      type: "SpacerSize | Responsive<SpacerSize>",
      defaultValue: "'md'",
      description: "Size of the spacer. Can be a single value or a responsive object."
    },
    {
      name: "isFlexible",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to make the spacer flex-grow to fill available space."
    },
    {
      name: "horizontal",
      type: "boolean",
      defaultValue: "false",
      description: "Creates a horizontal spacer with specified width."
    },
    {
      name: "vertical",
      type: "boolean",
      defaultValue: "true",
      description: "Creates a vertical spacer with specified height. This is the default behavior."
    },
    {
      name: "hideOnMobile",
      type: "boolean",
      defaultValue: "false",
      description: "Hides the spacer on mobile screens (below 640px)."
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the spacer element."
    },
    {
      name: "id",
      type: "string",
      description: "ID attribute for the spacer element."
    }
  ];

  return (
    <APIReferenceTemplate props={spacerProps}>
      <div>
        <p class="mb-4">
          The Spacer component provides a consistent way to add whitespace between elements
          in your layouts. It supports both vertical and horizontal spacing with various size options.
        </p>
        
        <h3 class="text-lg font-semibold mb-2 mt-5">Type Definitions</h3>
        <CodeExample
          code={`// Available spacer sizes
export type SpacerSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

// Spacer component props
export interface SpacerProps {
  size?: SpacerSize | {
    base?: SpacerSize;
    sm?: SpacerSize;
    md?: SpacerSize;
    lg?: SpacerSize;
    xl?: SpacerSize;
    '2xl'?: SpacerSize;
  };
  isFlexible?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
  class?: string;
  id?: string;
  hideOnMobile?: boolean;
}`}
          language="tsx"
        />

        <h3 class="text-lg font-semibold mb-2 mt-5">Size Values Reference</h3>
        <p class="mb-2">
          The Spacer size values correspond to the following CSS values:
        </p>
        
        <div class="overflow-x-auto mb-6">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tailwind Class (Vertical)
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tailwind Class (Horizontal)
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Pixel Value
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'none'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-0</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-0</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0px</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'xs'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-1</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-1</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0.25rem (4px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'sm'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-2</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-2</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">0.5rem (8px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'md'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-4</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-4</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1rem (16px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'lg'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-6</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-6</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1.5rem (24px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'xl'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-8</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-8</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2rem (32px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'2xl'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-10</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-10</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2.5rem (40px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'3xl'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-12</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-12</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">3rem (48px)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">'4xl'</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">h-16</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">w-16</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">4rem (64px)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="text-lg font-semibold mb-2 mt-5">Accessibility</h3>
        <p class="mb-4">
          The Spacer component follows these accessibility best practices:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Uses <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">aria-hidden="true"</code> to hide it from screen readers</li>
          <li>Uses <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">role="none"</code> to indicate it has no interactive role</li>
          <li>Provides responsive options to adapt to different viewport sizes</li>
        </ul>
      </div>
    </APIReferenceTemplate>
  );
});

export default SpacerAPIReference;
