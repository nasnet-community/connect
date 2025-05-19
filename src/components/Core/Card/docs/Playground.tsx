import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates/PlaygroundTemplate';
import { Card } from '~/components/Core/Card/Card';

export default component$(() => {
  return (
    <PlaygroundTemplate
      component={Card}
      properties={[
        {
          type: 'select',
          name: 'variant',
          label: 'Variant',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Bordered', value: 'bordered' },
            { label: 'Elevated', value: 'elevated' }
          ]
        },
        {
          type: 'boolean',
          name: 'hasHeader',
          label: 'Has Header',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'hasFooter',
          label: 'Has Footer',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'hasActions',
          label: 'Has Actions',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'loading',
          label: 'Loading',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'noPadding',
          label: 'No Padding',
          defaultValue: false
        }
      ]}
    >
      <div class="w-full max-w-xl mx-auto">
        <Card>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Card Playground</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Use the controls above to customize this card. Try different variants and settings 
              to see how the Card component behaves with various configurations.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mt-4">
              The Card component is a versatile container that can be used for various content types,
              from simple text to complex interactive elements.
            </p>
            
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">Last updated: May 18, 2025</span>
                <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PlaygroundTemplate>
  );
});
