import { component$ } from "@builder.io/qwik";
import { HiCheckCircleOutline, HiInformationCircleOutline } from "@qwikest/icons/heroicons";
import type { PropFunction, QRL } from "@builder.io/qwik";

interface ActionFooterProps {
  isValid: { value: boolean };
  saveSettings$: QRL<(onComplete?: PropFunction<() => void>) => void>;
  onComplete$: PropFunction<() => void>;
}

export const ActionFooter = component$<ActionFooterProps>(({ isValid, saveSettings$, onComplete$ }) => {
  return (
    <div class="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:justify-between">
      <div class="flex items-center text-gray-500 dark:text-gray-400">
        <HiInformationCircleOutline class="mr-2 h-5 w-5" />
        <span class="text-sm">
          {$localize`Configure tunnel settings before saving`}
        </span>
      </div>

      <button
        onClick$={() => saveSettings$(onComplete$)}
        disabled={!isValid.value}
        class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 
          text-center text-sm font-medium text-white hover:bg-primary-600 
          focus:outline-none focus:ring-4 focus:ring-primary-300 
          disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 
          dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
          dark:disabled:bg-gray-700 md:w-auto"
      >
        <HiCheckCircleOutline class="h-5 w-5" />
        <span>{$localize`Save Settings`}</span>
      </button>
    </div>
  );
}); 