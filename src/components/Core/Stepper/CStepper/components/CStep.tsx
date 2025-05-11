import { component$ } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import type { QRL } from "@builder.io/qwik";

export interface CStepProps {
  step: CStepMeta;
  isActive: boolean;
  index: number;
  onClick$: QRL<(index: number) => void>;
}

export const CStep = component$((props: CStepProps) => {
  const { step, isActive, index, onClick$ } = props;
  
  // Check if the step has validation errors
  const hasErrors = step.validationErrors && step.validationErrors.length > 0;
  
  return (
    <div 
      class={`flex-1 cursor-pointer ${
        step.isDisabled ? 'opacity-50 cursor-not-allowed' :
        isActive 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-gray-500'
      }`}
      preventdefault:click={step.isDisabled}
      onClick$={step.isDisabled ? undefined : () => onClick$(index)}
      role="tab"
      id={`step-tab-${index}`}
      aria-selected={isActive}
      aria-controls={`cstepper-step-${index}`}
      aria-disabled={step.isDisabled}
      tabIndex={isActive ? 0 : -1}
      preventdefault:keydown={step.isDisabled}
      onKeyDown$={step.isDisabled ? undefined : (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick$(index);
          e.preventDefault();
        }
      }}
    >
      <div class="flex items-center">
        <div 
          class={`flex h-8 w-8 items-center justify-center rounded-full ${
            hasErrors
              ? 'bg-red-100 dark:bg-red-900/30' 
              : isActive
                ? 'bg-primary-100 dark:bg-primary-900/30' 
                : 'bg-gray-200 dark:bg-gray-700'
          }`}
          aria-hidden="true"
        >
          {hasErrors ? (
            <span class="text-sm font-medium text-red-600 dark:text-red-400">!</span>
          ) : (
            <span class={`text-sm font-medium ${
              isActive 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>{index + 1}</span>
          )}
        </div>
        <div class="ml-2">
          <span class="text-sm font-medium">{step.title}</span>
          {step.isOptional && (
            <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
          )}
        </div>
      </div>
    </div>
  );
}); 