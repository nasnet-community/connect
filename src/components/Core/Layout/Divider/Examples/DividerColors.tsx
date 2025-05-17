import { component$ } from '@builder.io/qwik';
import { Divider } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Divider Colors</h3>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Default</p>
            <Divider color="default" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Primary</p>
            <Divider color="primary" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Secondary</p>
            <Divider color="secondary" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Muted</p>
            <Divider color="muted" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Divider Spacing</h3>
        <div class="space-y-6 border border-dashed border-gray-300 dark:border-gray-600 p-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">None Spacing</p>
            <Divider spacing="none" />
            <p class="text-sm text-gray-500 dark:text-gray-400">No margin around divider</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Extra Small Spacing</p>
            <Divider spacing="xs" />
            <p class="text-sm text-gray-500 dark:text-gray-400">4px margin around divider</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Small Spacing</p>
            <Divider spacing="sm" />
            <p class="text-sm text-gray-500 dark:text-gray-400">8px margin around divider</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Medium Spacing (Default)</p>
            <Divider spacing="md" />
            <p class="text-sm text-gray-500 dark:text-gray-400">16px margin around divider</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Large Spacing</p>
            <Divider spacing="lg" />
            <p class="text-sm text-gray-500 dark:text-gray-400">24px margin around divider</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Extra Large Spacing</p>
            <Divider spacing="xl" />
            <p class="text-sm text-gray-500 dark:text-gray-400">32px margin around divider</p>
          </div>
        </div>
      </div>
    </div>
  );
});
