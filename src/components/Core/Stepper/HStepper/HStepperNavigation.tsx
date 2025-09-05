import { component$, type QRL } from "@builder.io/qwik";
import { HelpSettingsToggle } from "./HStepperProgress";

interface NavigationProps {
  activeStep: number;
  totalSteps: number;
  isCurrentStepComplete: boolean;
  onPrevious$: QRL<() => void>;
  onNext$: QRL<() => void>;
  
  // Help system props
  hasHelp?: boolean;
  onShowHelp$?: QRL<() => void>;
  helpButtonLabel?: string;
  isHelpOpen?: boolean;
}

export const HStepperNavigation = component$((props: NavigationProps) => {
  const isFirst = props.activeStep === 0;
  const isLast = props.activeStep === props.totalSteps - 1;
  
  // Help system props
  const {
    hasHelp = false,
    onShowHelp$,
    helpButtonLabel = 'Get help for this step',
    isHelpOpen = false
  } = props;

  return (
    <div class="mt-8 grid grid-cols-3 items-center gap-4">
      {/* Left - Previous Button */}
      <div class="justify-self-start">
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
      </div>

      {/* Center - Help Controls */}
      <div class="justify-self-center">
        <div class="flex flex-col items-center gap-2">
          {/* Help Button */}
          {hasHelp && onShowHelp$ && (
            <button
              type="button"
              onClick$={() => onShowHelp$ && onShowHelp$()}
              class={`
                inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 group
                ${isHelpOpen
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-300 dark:bg-primary-900/50 dark:text-primary-300 dark:border-primary-600'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 dark:hover:border-primary-700'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              `}
              aria-label={helpButtonLabel}
              title={helpButtonLabel}
            >
              <svg 
                class={`w-6 h-6 transition-transform duration-200 ${isHelpOpen ? 'scale-110' : 'group-hover:scale-110'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              
              {/* Pulse animation for attention */}
              {!isHelpOpen && (
                <span class="absolute -top-1 -right-1 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
              )}
            </button>
          )}
          
          {/* Global Help Settings Toggle */}
          <HelpSettingsToggle 
            size="sm" 
            class="text-xs text-gray-600 dark:text-gray-400"
          />
        </div>
      </div>

      {/* Right - Next/Complete Button */}
      <div class="justify-self-end">
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
    </div>
  );
});
