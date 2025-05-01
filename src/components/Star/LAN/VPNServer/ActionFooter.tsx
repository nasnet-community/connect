import { component$, type Signal, type QRL } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

interface ActionFooterProps {
  isValid: Signal<boolean>;
  saveSettings$: QRL<(onComplete$?: PropFunction<() => void>) => void>;
  onComplete$?: PropFunction<() => void>;
}

export const ActionFooter = component$<ActionFooterProps>(({
  isValid,
  saveSettings$,
  onComplete$
}) => {
  return (
    <div class="mt-8 flex justify-end">
      <button
        onClick$={() => saveSettings$(onComplete$)}
        disabled={!isValid.value}
        class={`rounded-lg px-6 py-2 transition-colors duration-200
        ${
          isValid.value
            ? "cursor-pointer bg-primary-500 text-white hover:bg-primary-600"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
        }`}
      >
        {$localize`Save`}
      </button>
    </div>
  );
}); 