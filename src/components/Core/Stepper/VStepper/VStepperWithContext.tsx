import { component$, $ } from "@builder.io/qwik";
import { VStepper } from "./VStepper";
import type { VStepperProps } from "./types";
import { useProvideVStepperContext, VStepperContextId } from "./hooks/useVStepperContext";

/**
 * VStepper wrapper component that properly handles context setup
 * Use this when you need context support with VStepper
 */
export const VStepperWithContext = component$((props: VStepperProps) => {
  // Create a dummy scroll function for context
  const dummyScrollToStep$ = $((index: number) => {
    // This will be overridden by the actual VStepper implementation
    console.log('Scrolling to step:', index);
  });

  // Setup context - must be called unconditionally at the top level
  // Use provided contextId or fall back to default, and provide default values if not given
  const contextId = props.contextId || VStepperContextId;
  const contextValue = props.contextValue || {};
  const activeStep = props.activeStep || 0;
  
  // Always call the context provider hook (hooks must be called unconditionally)
  useProvideVStepperContext(
    contextId,
    props.steps,
    activeStep,
    contextValue,
    dummyScrollToStep$
  );

  return <VStepper {...props} />;
}); 