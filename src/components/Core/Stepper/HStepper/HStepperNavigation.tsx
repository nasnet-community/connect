import { component$, type QRL } from "@builder.io/qwik";

interface NavigationProps {
  activeStep: number;
  totalSteps: number;
  isCurrentStepComplete: boolean;
  onPrevious$: QRL<() => void>;
  onNext$: QRL<() => void>;
}

export const HStepperNavigation = component$((props: NavigationProps) => {
  const isFirst = props.activeStep === 0;
  const isLast = props.activeStep === props.totalSteps - 1;

  return (
    <div class="mt-8 flex items-center justify-between">
      <button
        onClick$={props.onPrevious$}
        disabled={isFirst}
        class={`rounded-lg px-6 py-2.5 font-medium transition-all duration-300
          ${
            isFirst
              ? "cursor-not-allowed bg-surface-secondary/50 text-text-secondary/50"
              : "bg-surface text-text-secondary shadow-md hover:bg-surface-secondary"
          }`}
      >
        {$localize`Previous`}
      </button>

      {!isLast ? (
        <button
          onClick$={props.onNext$}
          disabled={!props.isCurrentStepComplete}
          class={`rounded-lg px-8 py-2.5 font-medium transition-all duration-300
            ${
              props.isCurrentStepComplete
                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:opacity-90"
                : "cursor-not-allowed bg-primary-500/50 text-white/50"
            }`}
        >
          {$localize`Next`}
        </button>
      ) : (
        <button
          disabled={!props.isCurrentStepComplete}
          class={`rounded-lg px-8 py-2.5 font-medium transition-all duration-300
            ${
              props.isCurrentStepComplete
                ? "bg-gradient-to-r from-success to-success-dark text-white shadow-lg hover:opacity-90"
                : "cursor-not-allowed bg-success/50 text-white/50"
            }`}
        >
          {$localize`Complete`}
        </button>
      )}
    </div>
  );
});
