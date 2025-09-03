import { component$ } from "@builder.io/qwik";
import { Toggle } from "~/components/Core/Toggle/Toggle";
import { useGlobalHelpSettings } from "../hooks/useGlobalHelpSettings";

export interface HelpSettingsToggleProps {
  /** Optional custom label for the toggle */
  label?: string;
  
  /** Size of the toggle component */
  size?: "sm" | "md" | "lg";
  
  /** Position of the label relative to toggle */
  labelPosition?: "left" | "right";
  
  /** Additional CSS classes */
  class?: string;
  
  /** Show help icon next to label */
  showIcon?: boolean;
}

/**
 * Global Help Settings Toggle Component
 * 
 * Provides a toggle control that enables/disables auto-show help functionality
 * across all stepper types (HStepper, VStepper, CStepper) in the application.
 */
export const HelpSettingsToggle = component$<HelpSettingsToggleProps>((props) => {
  const {
    label = "Auto-show help",
    size = "sm",
    labelPosition = "right",
    class: className = "",
    showIcon = true
  } = props;
  
  // Get global help settings (context is guaranteed to be available)
  const globalSettings = useGlobalHelpSettings();
  
  return (
    <div class={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <svg 
          class="w-4 h-4 text-gray-500 dark:text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      )}
      
      <Toggle
        checked={globalSettings.autoShowHelpOnStepChange.value}
        onChange$={globalSettings.setAutoShowHelp$}
        label={label}
        labelPosition={labelPosition}
        size={size}
        aria-label="Toggle auto-show help on step changes"
        aria-describedby="help-toggle-description"
      />
      
      {/* Hidden description for screen readers */}
      <span id="help-toggle-description" class="sr-only">
        When enabled, help modals will automatically appear when navigating to steps that have help content available across all stepper components
      </span>
    </div>
  );
});