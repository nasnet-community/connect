import { component$ } from "@builder.io/qwik";
import { Divider } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider Colors</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Default</p>
            <Divider color="default" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Primary</p>
            <Divider color="primary" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Secondary
            </p>
            <Divider color="secondary" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Muted</p>
            <Divider color="muted" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider Spacing</h3>
        <div class="space-y-6 border border-dashed border-gray-300 p-4 dark:border-gray-600">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">None Spacing</p>
            <Divider spacing="none" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              No margin around divider
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Extra Small Spacing
            </p>
            <Divider spacing="xs" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              4px margin around divider
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Small Spacing
            </p>
            <Divider spacing="sm" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              8px margin around divider
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Medium Spacing (Default)
            </p>
            <Divider spacing="md" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              16px margin around divider
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Large Spacing
            </p>
            <Divider spacing="lg" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              24px margin around divider
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Extra Large Spacing
            </p>
            <Divider spacing="xl" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              32px margin around divider
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
