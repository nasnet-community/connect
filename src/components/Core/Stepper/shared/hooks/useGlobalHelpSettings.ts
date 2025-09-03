import { 
  useContextProvider, 
  useContext,
  createContextId,
  $, 
  useSignal,
  type Signal,
  type QRL
} from "@builder.io/qwik";

/**
 * Global help settings interface for stepper components
 */
export interface GlobalHelpSettings {
  /** Whether to auto-show help modals when navigating to steps with help content */
  autoShowHelpOnStepChange: Signal<boolean>;
  
  /** Set the auto-show help setting to a specific value */
  setAutoShowHelp$: QRL<(value: boolean) => void>;
}

/**
 * Context ID for global help settings
 */
export const GlobalHelpSettingsContext = createContextId<GlobalHelpSettings>('global-help-settings');

/**
 * Provider hook for global help settings
 * Should be used at the application root or high-level container
 */
export const useProvideGlobalHelpSettings = (
  initialAutoShow: boolean = false
): GlobalHelpSettings => {
  // Signal for auto-show help state
  const autoShowHelpOnStepChange = useSignal(initialAutoShow);
  
  // Setter function
  const setAutoShowHelp$ = $((value: boolean) => {
    autoShowHelpOnStepChange.value = value;
  });
  
  // Create context value
  const contextValue: GlobalHelpSettings = {
    autoShowHelpOnStepChange,
    setAutoShowHelp$
  };
  
  // Provide the context
  useContextProvider(GlobalHelpSettingsContext, contextValue);
  
  return contextValue;
};

/**
 * Consumer hook for global help settings
 * Use this in components that need to read or modify global help settings
 * Note: This hook requires GlobalHelpSettingsProvider to be in the component tree
 */
export const useGlobalHelpSettings = (): GlobalHelpSettings => {
  return useContext(GlobalHelpSettingsContext);
};

