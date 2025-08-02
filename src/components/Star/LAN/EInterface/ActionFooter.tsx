import { component$ } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiInformationCircleOutline,
  HiArrowPathOutline,
} from "@qwikest/icons/heroicons";
import type { PropFunction } from "@builder.io/qwik";

interface ActionFooterProps {
  onSave$?: PropFunction<() => void>;
  onReset$?: PropFunction<() => void>;
  onCancel$?: PropFunction<() => void>;
  isSaveDisabled?: boolean;
}

export const ActionFooter = component$<ActionFooterProps>(
  ({ onSave$, onReset$, isSaveDisabled = false }) => {
    return (
      <div class="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:justify-between dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center text-gray-500 dark:text-gray-400">
          <HiInformationCircleOutline class="mr-2 h-5 w-5" />
          <span class="text-sm">
            {$localize`Configure interface settings before saving`}
          </span>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          {onReset$ && (
            <button
              type="button"
              onClick$={onReset$}
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 
                bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm 
                transition-colors hover:bg-gray-50
                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <HiArrowPathOutline class="h-5 w-5" />
              <span>{$localize`Reset`}</span>
            </button>
          )}

          <button
            type="button"
            onClick$={onSave$}
            disabled={isSaveDisabled}
            class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 
            text-center text-sm font-medium text-white hover:bg-primary-600 
            focus:outline-none focus:ring-4 focus:ring-primary-300 
            disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 
            md:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 
            dark:focus:ring-primary-800 dark:disabled:bg-gray-700"
          >
            <HiCheckCircleOutline class="h-5 w-5" />
            <span>{$localize`Save Settings`}</span>
          </button>
        </div>
      </div>
    );
  },
);
