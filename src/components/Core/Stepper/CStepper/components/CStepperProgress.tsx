import { component$ } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import { CStep } from "./CStep";
import type { QRL } from "@builder.io/qwik";

export interface CStepperProgressProps {
  steps: CStepMeta[];
  activeStep: number;
  onStepClick$: QRL<(index: number) => void>;
}

export const CStepperProgress = component$((props: CStepperProgressProps) => {
  const { steps, activeStep, onStepClick$ } = props;
  
  return (
    <div class="pb-4">
      {/* Step tabs */}
      <div 
        class="flex items-center justify-between" 
        role="tablist" 
        aria-label="Progress steps"
      >
        {steps.map((step, index) => (
          <CStep 
            key={step.id}
            step={step}
            isActive={activeStep >= index}
            index={index}
            onClick$={onStepClick$}
          />
        ))}
      </div>
      
      {/* Progress lines between steps */}
      <div 
        class="mt-4 grid" 
        style={{ 
          gridTemplateColumns: `repeat(${steps.length - 1}, 1fr)`, 
          gap: '8px' 
        }}
        role="presentation"
      >
        {Array.from({ length: steps.length - 1 }).map((_, idx) => (
          <div key={idx} class="flex-grow">
            <div 
              class={`h-1 w-full rounded ${
                activeStep > idx 
                  ? 'bg-primary-500 dark:bg-primary-400' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-hidden="true"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}); 