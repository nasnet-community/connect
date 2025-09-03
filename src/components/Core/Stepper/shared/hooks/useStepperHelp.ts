import { useSignal, useVisibleTask$, useComputed$, $, type QRL, type Signal } from "@builder.io/qwik";
import type { BaseStepMeta } from "../types/base";
import { useGlobalHelpSettings } from "./useGlobalHelpSettings";

/**
 * Check if a step has help content
 * Utility function moved outside hook to avoid closure serialization issues
 */
const stepHasHelp = (step: BaseStepMeta): boolean => {
  return !!(
    step.hasHelp !== false && (
      step.helpTitle ||
      step.helpContent ||
      step.helpData
    )
  );
};

export interface UseStepperHelpOptions {
  /**
   * Enable keyboard shortcuts for help modal
   * Default: true
   */
  enableKeyboardShortcuts?: boolean;
  
  /**
   * Auto-show help for first step if available
   * Default: false
   */
  autoShowHelpOnFirstStep?: boolean;
  
  /**
   * Global help key (default: '?')
   */
  helpKey?: string;
  
  /**
   * Callback when help modal opens
   */
  onHelpOpen$?: QRL<(stepId: number) => void>;
  
  /**
   * Callback when help modal closes
   */
  onHelpClose$?: QRL<(stepId: number) => void>;
}

export interface UseStepperHelpReturn {
  /** Whether the help modal is currently open */
  isHelpOpen: Signal<boolean>;
  
  /** ID of the step whose help is being shown */
  helpStepId: Signal<number | null>;
  
  /** Open help for a specific step */
  openHelp$: QRL<(stepId?: number) => void>;
  
  /** Close the help modal */
  closeHelp$: QRL<() => void>;
  
  /** Toggle help modal for current or specified step */
  toggleHelp$: QRL<(stepId?: number) => void>;
  
  /** Check if a step has help content */
  stepHasHelp$: QRL<(step: BaseStepMeta) => boolean>;
  
  /** Current step has help - computed signal */
  currentStepHasHelp: Signal<boolean>;
  
  /** Get help content for a step */
  getStepHelpContent$: QRL<(step: BaseStepMeta) => any>;
}

/**
 * Hook for managing stepper help modal functionality
 * Provides state management, keyboard shortcuts, and utilities
 */
export const useStepperHelp = (
  steps: Signal<BaseStepMeta[]>,
  activeStep: Signal<number>,
  options: UseStepperHelpOptions = {}
): UseStepperHelpReturn => {
  const {
    enableKeyboardShortcuts = true,
    autoShowHelpOnFirstStep = false,
    helpKey = '?',
    onHelpOpen$,
    onHelpClose$
  } = options;

  // Help modal state
  const isHelpOpen = useSignal(false);
  const helpStepId = useSignal<number | null>(null);
  
  // Get global settings at hook level (not inside useVisibleTask$)
  // Context should always be available since provider is set up in StarContainer
  const globalSettings = useGlobalHelpSettings();
  
  // Create QRL version for external use
  const stepHasHelp$ = $((step: BaseStepMeta): boolean => {
    return stepHasHelp(step);
  });
  
  // Computed signal for current step help availability
  const currentStepHasHelp = useComputed$(() => {
    const current = steps.value[activeStep.value];
    return current ? stepHasHelp(current) : false;
  });

  // Get help content for a step
  const getStepHelpContent$ = $((step: BaseStepMeta) => {
    if (!stepHasHelp(step)) return null;
    
    // Return help data if available, otherwise construct from properties
    return step.helpData || {
      title: step.helpTitle,
      content: step.helpContent
    };
  });

  // Open help for specific step
  const openHelp$ = $((stepId?: number) => {
    const targetStepId = stepId ?? activeStep.value;
    const targetStep = steps.value[targetStepId];
    
    if (!targetStep || !stepHasHelp(targetStep)) {
      console.warn(`No help content available for step ${targetStepId}`);
      return;
    }
    
    helpStepId.value = targetStepId;
    isHelpOpen.value = true;
    
    // Call onHelpOpen callback if provided
    if (onHelpOpen$) {
      onHelpOpen$(targetStepId);
    }
  });

  // Close help modal
  const closeHelp$ = $(() => {
    const currentStepId = helpStepId.value;
    
    isHelpOpen.value = false;
    helpStepId.value = null;
    
    // Call onHelpClose callback if provided
    if (onHelpClose$ && currentStepId !== null) {
      onHelpClose$(currentStepId);
    }
  });

  // Toggle help modal
  const toggleHelp$ = $((stepId?: number) => {
    if (isHelpOpen.value) {
      closeHelp$();
    } else {
      openHelp$(stepId);
    }
  });

  // Setup keyboard shortcuts
  useVisibleTask$(({ cleanup }) => {
    if (!enableKeyboardShortcuts) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as any)?.contentEditable === 'true'
      ) {
        return;
      }
      
      // Handle help key press
      if (event.key === helpKey || (event.shiftKey && event.key === '/')) {
        event.preventDefault();
        toggleHelp$();
      }
      
      // Handle Escape to close help
      if (event.key === 'Escape' && isHelpOpen.value) {
        event.preventDefault();
        closeHelp$();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    cleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Auto-show help on first step if enabled
  useVisibleTask$(({ track }) => {
    if (!autoShowHelpOnFirstStep) return;
    
    track(() => activeStep.value);
    track(() => steps.value.length);
    
    // Only show on first step, first time
    if (activeStep.value === 0 && steps.value.length > 0) {
      const firstStep = steps.value[0];
      if (stepHasHelp(firstStep) && !isHelpOpen.value) {
        // Small delay to allow step to render
        setTimeout(() => openHelp$(0), 500);
      }
    }
  });

  // Global auto-show help on step changes
  useVisibleTask$(({ track }) => {
    // Track changes to global settings and active step
    const autoShow = track(() => globalSettings.autoShowHelpOnStepChange.value);
    const currentStepIndex = track(() => activeStep.value);
    const stepsLength = track(() => steps.value.length);
    
    // Only proceed if global auto-show is enabled
    if (!autoShow || stepsLength === 0) return;
    
    // Get the current step
    const currentStep = steps.value[currentStepIndex];
    if (!currentStep) return;
    
    // Check if current step has help and modal is not already open
    if (stepHasHelp(currentStep) && !isHelpOpen.value) {
      // Small delay to allow step to render and prevent conflicts with first-step auto-show
      setTimeout(() => {
        // Double-check that modal is still closed and step hasn't changed
        if (!isHelpOpen.value && activeStep.value === currentStepIndex) {
          openHelp$(currentStepIndex);
        }
      }, 600); // Slightly longer delay than first-step auto-show
    }
  });

  return {
    isHelpOpen,
    helpStepId,
    openHelp$,
    closeHelp$,
    toggleHelp$,
    stepHasHelp$,
    currentStepHasHelp,
    getStepHelpContent$
  };
};