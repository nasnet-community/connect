import { component$, type QRL } from "@builder.io/qwik";

interface ActionButtonsProps {
  onSubmit: QRL<() => void>;
  isValid: boolean;
}

export const ActionButtons = component$<ActionButtonsProps>(
  ({ onSubmit, isValid }) => {
    return (
      <div class="mt-8 flex justify-end">
        <button
          onClick$={onSubmit}
          disabled={!isValid}
          class="rounded-lg bg-primary-500 px-6 py-2 text-white 
               transition-colors duration-200 hover:bg-primary-600 disabled:bg-gray-400"
        >
          {$localize`Save`}
        </button>
      </div>
    );
  },
);
