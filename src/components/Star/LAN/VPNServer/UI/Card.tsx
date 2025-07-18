import { component$, Slot, $, type QRL } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../../VPNServer/VPNServer";

export type CardVariant = "default" | "bordered" | "elevated";

export interface CardProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Icon component or element to display in the header
   */
  icon?: any;
  
  /**
   * Whether the card feature is enabled
   */
  enabled?: boolean;
  
  /**
   * Handler for toggling the enabled state
   */
  onToggle$?: QRL<(enabled: boolean) => void>;
  
  /**
   * Whether this card is within a VPN protocol step
   */
  isProtocolStep?: boolean;
  
  /**
   * Visual variant for the card
   */
  variant?: CardVariant;
  
  /**
   * Whether the card is loading data
   */
  loading?: boolean;
  
  /**
   * Additional CSS classes
   */
  class?: string;
}

export const Card = component$<CardProps>(({ 
  title,
  icon,
  enabled = true,
  onToggle$,
  isProtocolStep = true,
  variant = "default",
  loading = false,
  class: className = ""
}) => {
  // Try to get the stepper context - this may be undefined if we're not in a stepper
  const stepperContext = useStepperContext(VPNServerContextId);
  
  // Create a safe handler for toggling that won't trigger step recalculation
  const handleToggle = $((isChecked: boolean) => {
    if (onToggle$) {
      try {
        // Lock step recalculation during toggle operations 
        if (stepperContext && isProtocolStep) {
          // Set flag to prevent step recalculation and store active step
          stepperContext.data.preventStepRecalculation = true;
          
          // Store current step index to return to later
          stepperContext.data.savedStepIndex = stepperContext.activeStep.value;
        }
        
        // Call the toggle handler
        onToggle$(isChecked);
        
        // Schedule reset of the flag after toggle completes
        if (stepperContext && isProtocolStep) {
          // Use longer timeout to ensure all related operations complete
          setTimeout(() => {
            stepperContext.data.preventStepRecalculation = false;
          }, 500);
        }
      } catch (error) {
        console.error("Error in toggle handler:", error);
        // Always reset flag on error
        if (stepperContext && isProtocolStep) {
          stepperContext.data.preventStepRecalculation = false;
        }
      }
    }
  });
  
  // Base classes for card styling
  const baseClasses = "w-full overflow-hidden rounded-lg transition-all";
  
  // Variant-specific classes
  const variantClasses = {
    default: "border border-border shadow-sm bg-white dark:border-border-dark dark:bg-surface-dark",
    bordered: "border-2 border-border-emphasis bg-white dark:border-border-dark-emphasis dark:bg-surface-dark",
    elevated: "border border-border shadow-md bg-white dark:border-border-dark dark:bg-surface-dark"
  };
  
  // Define classes for loading state
  const loadingClass = loading ? "relative" : "";

  // Combine all classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    loadingClass,
    className
  ].filter(Boolean).join(" ");

  return (
    <div class={cardClasses}>
      {/* Loading overlay */}
      {loading && (
        <div class="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-surface-dark/70">
          <div class="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      )}
      
      {/* Card header */}
      <div class="flex items-center justify-between border-b border-border px-5 py-4 dark:border-border-dark">
        <div class="flex items-center gap-3">
          {icon && <div class="text-primary-500 dark:text-primary-400">{icon}</div>}
          <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
            {title}
          </h3>
        </div>
        
        {onToggle$ && (
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={enabled}
              class="peer sr-only"
              onChange$={(_, target) => handleToggle(target.checked)}
              data-protocol-toggle={isProtocolStep ? "true" : undefined}
            />
            <div class="h-6 w-11 rounded-full bg-surface-lighter after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:border-border-dark dark:bg-surface-dark-lighter dark:peer-focus:ring-primary-700 dark:peer-checked:after:border-primary-500"></div>
          </label>
        )}
      </div>
      
      {/* Card Content */}
      <div class="px-5 py-4">
        <Slot />
      </div>
    </div>
  );
}); 