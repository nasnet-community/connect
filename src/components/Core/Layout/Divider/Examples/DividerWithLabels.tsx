import { component$ } from "@builder.io/qwik";
import { Divider } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider with Label Positions</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Center Position (Default)
            </p>
            <Divider label="Section Divider" labelPosition="center" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Start Position
            </p>
            <Divider label="Section Divider" labelPosition="start" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              End Position
            </p>
            <Divider label="Section Divider" labelPosition="end" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider with Styled Labels</h3>
        <div class="space-y-6">
          <div>
            <Divider
              label={
                <span class="font-semibold text-primary-600 dark:text-primary-400">
                  Primary Colored Label
                </span>
              }
              color="primary"
            />
          </div>

          <div>
            <Divider
              label={
                <span class="rounded bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Badge Style Label
                </span>
              }
              color="secondary"
            />
          </div>

          <div>
            <Divider
              label={
                <span class="flex items-center gap-2">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1-4h-2V8h2v8z" />
                  </svg>
                  Label With Icon
                </span>
              }
              variant="dashed"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Combining Multiple Properties
        </h3>
        <div class="space-y-6">
          <Divider
            label="Custom Divider"
            thickness="medium"
            color="primary"
            variant="dashed"
            spacing="lg"
          />
        </div>
      </div>
    </div>
  );
});
