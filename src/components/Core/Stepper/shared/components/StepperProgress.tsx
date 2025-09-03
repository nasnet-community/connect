import { component$, type QRL, type JSX } from "@builder.io/qwik";
import type { BaseStepMeta } from "../types";

export interface StepperProgressProps<S extends BaseStepMeta = BaseStepMeta> {
  steps: S[];
  activeStep: number;
  onStepClick$?: QRL<(step: number) => void>;
  customIcons?: Record<number, JSX.Element>;
  useNumbers?: boolean;
  allowSkipSteps?: boolean;
  allowNonLinearNavigation?: boolean;
  layout?: 'horizontal' | 'vertical';
  stepperType?: 'content' | 'vertical' | 'horizontal';
}

/**
 * Shared progress indicator component for all stepper types
 * Provides consistent progress visualization across different steppers
 */
export const StepperProgress = component$<StepperProgressProps>((props) => {
  const {
    steps,
    activeStep,
    onStepClick$,
    customIcons,
    useNumbers = false,
    allowSkipSteps = false,
    allowNonLinearNavigation = false,
    layout = 'horizontal',
    stepperType = 'content'
  } = props;

  const getProgressClass = () => {
    const baseClass = layout === 'vertical' 
      ? 'flex flex-col space-y-4'
      : 'flex items-center justify-between relative';
    
    const typeClass = `stepper-progress-${stepperType}`;
    
    return `${baseClass} ${typeClass}`;
  };

  const getStepClass = (index: number, isClickable: boolean) => {
    const isActive = index === activeStep;
    const isComplete = steps[index]?.isComplete;
    
    const baseClass = layout === 'vertical'
      ? 'flex items-center space-x-4'
      : 'relative flex flex-col items-center';
    
    const stateClass = isActive
      ? 'text-primary-600 dark:text-primary-400'
      : isComplete
        ? 'text-green-600 dark:text-green-400'
        : 'text-gray-400 dark:text-gray-600';
    
    const cursorClass = isClickable ? 'cursor-pointer' : 'cursor-default';
    
    return `${baseClass} ${stateClass} ${cursorClass}`;
  };

  const getStepIconClass = (index: number, isClickable: boolean) => {
    const isActive = index === activeStep;
    const isComplete = steps[index]?.isComplete;
    
    const baseClass = 'flex items-center justify-center w-10 h-10 rounded-full transition-colors';
    
    const stateClass = isActive
      ? 'bg-primary-600 text-white dark:bg-primary-500'
      : isComplete
        ? 'bg-green-600 text-white dark:bg-green-500'
        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    
    const hoverClass = isClickable
      ? 'hover:ring-2 hover:ring-primary-400 dark:hover:ring-primary-600'
      : '';
    
    return `${baseClass} ${stateClass} ${hoverClass}`;
  };

  const getConnectorClass = (index: number) => {
    const isComplete = steps[index]?.isComplete;
    
    const baseClass = layout === 'vertical'
      ? 'absolute left-5 top-12 h-full w-0.5'
      : 'absolute top-5 w-full h-0.5';
    
    const positionClass = layout === 'vertical'
      ? ''
      : 'left-1/2 -translate-x-1/2';
    
    const stateClass = isComplete
      ? 'bg-green-600 dark:bg-green-500'
      : 'bg-gray-300 dark:bg-gray-700';
    
    return `${baseClass} ${positionClass} ${stateClass}`;
  };

  return (
    <div class={getProgressClass()} role="navigation" aria-label="Progress">
      {steps.map((step, index) => {
        // Compute clickable state based on props
        const isClickable = (() => {
          if (!onStepClick$) return false;
          if (allowNonLinearNavigation || allowSkipSteps) return true;
          if (index <= activeStep) return true;
          if (index === activeStep + 1 && steps[activeStep]?.isComplete) return true;
          return false;
        })();
        
        return (
          <div
            key={step.id}
            class={layout === 'vertical' ? 'relative' : 'flex-1 relative'}
          >
            <div
              class={getStepClass(index, isClickable)}
              onClick$={async () => {
                if (isClickable && onStepClick$) {
                  await onStepClick$(index);
                }
              }}
              role="button"
              tabIndex={isClickable ? 0 : -1}
              aria-current={index === activeStep ? 'step' : undefined}
              aria-label={`${step.title}${step.isComplete ? ' (Complete)' : ''}${index === activeStep ? ' (Current)' : ''}`}
            >
              {/* Step Icon */}
              <div class={getStepIconClass(index, isClickable)}>
              {customIcons && customIcons[index] ? (
                customIcons[index]
              ) : step.isComplete ? (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : useNumbers || step.icon === undefined ? (
                <span class="text-sm font-semibold">{index + 1}</span>
              ) : (
                step.icon
              )}
            </div>

            {/* Step Label */}
            <div class={layout === 'vertical' ? 'flex-1' : 'mt-2 text-center'}>
              <p class={`text-sm font-medium ${
                index === activeStep
                  ? 'text-primary-700 dark:text-primary-300'
                  : step.isComplete
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-400'
              }`}>
                {step.title}
              </p>
              {step.description && layout === 'vertical' && (
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {step.description}
                </p>
              )}
              {/* Status indicators */}
              {(step.isOptional || step.skippable) && (
                <div class="mt-1 flex gap-1">
                  {step.isOptional && (
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Optional
                    </span>
                  )}
                  {step.skippable && (
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Skippable
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div class={getConnectorClass(index)} aria-hidden="true" />
            )}
          </div>
        );
      })}
      
      {/* Progress bar for horizontal layout */}
      {layout === 'horizontal' && (
        <div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700" aria-hidden="true">
          <div 
            class="h-full bg-green-600 dark:bg-green-500 transition-all duration-300"
            style={{
              width: `${(steps.filter((_, i) => i < activeStep && steps[i].isComplete).length / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
});