import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

interface CodeProps {
  configPreview: string;
  onPythonDownload$: PropFunction<() => void>;
  onROSDownload$: PropFunction<() => void>;
}

export const Code = component$<CodeProps>(
  ({ configPreview, onROSDownload$ }) => {
    // export const Code = component$<CodeProps>(({ configPreview, onPythonDownload$, onROSDownload$ }) => {

    return (
      <div class="rounded-lg bg-surface-secondary p-6 shadow-md dark:bg-surface-dark-secondary">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-text-secondary dark:text-text-dark-secondary">{$localize`Configuration`}</span>
          <div class="space-x-4">
            {/* <button
            onClick$={onPythonDownload$}
            class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            {$localize`Download .py`}
          </button> */}
            <button
              onClick$={onROSDownload$}
              class="rounded-md bg-secondary-500 px-4 py-2 text-white transition-colors hover:bg-secondary-600"
            >
              {$localize`Download .rsc`}
            </button>
          </div>
        </div>
        <pre class="max-h-[500px] overflow-x-auto overflow-y-auto rounded-md bg-surface-tertiary p-4 scrollbar-thin dark:bg-surface-dark">
          <code class="whitespace-pre text-sm text-text dark:text-text-dark-default">
            {configPreview}
          </code>
        </pre>
      </div>
    );
  },
);
