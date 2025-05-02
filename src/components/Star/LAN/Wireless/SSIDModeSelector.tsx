import { component$, useContext, $ } from "@builder.io/qwik";
import { HiWifiOutline } from "@qwikest/icons/heroicons";
import type { Signal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";

interface SSIDModeSelectorProps {
  isMultiSSID: Signal<boolean>;
}

export const SSIDModeSelector = component$<SSIDModeSelectorProps>(
  ({ isMultiSSID }) => {
    const starContext = useContext(StarContext);
    
    // Handler for switching to Single SSID mode
    const switchToSingleMode = $(() => {
      isMultiSSID.value = false;
      
      // If we have an existing SingleMode configuration, keep it
      // If not, create a default one
      const singleMode = starContext.state.LAN.Wireless?.SingleMode || {
        SSID: "",
        Password: "",
        isHide: false,
        isDisabled: false
      };
      
      // Update the context to only include SingleMode
      starContext.updateLAN$({
        Wireless: {
          SingleMode: singleMode
          // Don't include MultiMode, which effectively removes it
        }
      });
    });
    
    // Handler for switching to Multi SSID mode
    const switchToMultiMode = $(() => {
      isMultiSSID.value = true;
      
      // If we have existing MultiMode configurations, keep them
      // Otherwise create a minimal structure with empty enabled networks
      const multiMode = starContext.state.LAN.Wireless?.MultiMode || {};
      
      // If there are no networks in the MultiMode, create at least one default network
      if (Object.keys(multiMode).length === 0) {
        const defaultNetwork = {
          SSID: "",
          Password: "",
          isHide: false,
          isDisabled: false
        };
        
        multiMode.Starlink = defaultNetwork;
      }
      
      // Update the context to only include MultiMode
      starContext.updateLAN$({
        Wireless: {
          MultiMode: multiMode
          // Don't include SingleMode, which effectively removes it
        }
      });
    });

    return (
      <div class="mb-8 flex space-x-4">
        <label
          class={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all
        ${
          !isMultiSSID.value
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
            : "border-border dark:border-border-dark"
        }`}
        >
          <input
            type="radio"
            name="ssidMode"
            checked={!isMultiSSID.value}
            onChange$={switchToSingleMode}
            class="hidden"
          />
          <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <span class="ml-2 text-text dark:text-text-dark-default">{$localize`Single SSID`}</span>
        </label>

        <label
          class={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all
        ${
          isMultiSSID.value
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
            : "border-border dark:border-border-dark"
        }`}
        >
          <input
            type="radio"
            name="ssidMode"
            checked={isMultiSSID.value}
            onChange$={switchToMultiMode}
            class="hidden"
          />
          <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <span class="ml-2 text-text dark:text-text-dark-default">{$localize`Multi SSID`}</span>
        </label>
      </div>
    );
  },
);
