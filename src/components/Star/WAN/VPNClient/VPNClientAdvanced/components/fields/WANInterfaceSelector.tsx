import { component$, useContext, useComputed$, type QRL } from "@builder.io/qwik";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { WANInterfaceType } from "~/components/Star/StarContext/Utils/VPNClientType";

export interface WANInterfaceSelectorProps {
  selectedInterface?: WANInterfaceType;
  onSelect$: QRL<(wanInterface: WANInterfaceType) => void>;
  disabled?: boolean;
}

export const WANInterfaceSelector = component$<WANInterfaceSelectorProps>(
  ({ selectedInterface, onSelect$, disabled = false }) => {
    const starContext = useContext(StarContext);

    // Get available WAN interfaces with priority: Foreign > Domestic
    // Also create a map to track WANType for each interface
    const wanInterfaceData = useComputed$(() => {
      const options: Array<{ value: string; label: string; group?: string }> = [];
      const typeMap: Record<string, 'Domestic' | 'Foreign' | 'VPN'> = {};

      // Add Foreign WAN interfaces first (priority)
      const foreignWANConfigs = starContext.state.WAN.WANLink.Foreign?.WANConfigs || [];
      foreignWANConfigs.forEach((config, index) => {
        const interfaceName = config.name || `Foreign Link ${index + 1}`;
        options.push({
          value: interfaceName,
          label: interfaceName,
          group: "Foreign WAN"
        });
        typeMap[interfaceName] = 'Foreign';
      });

      // Add Domestic WAN interfaces second
      const domesticWANConfigs = starContext.state.WAN.WANLink.Domestic?.WANConfigs || [];
      domesticWANConfigs.forEach((config, index) => {
        const interfaceName = config.name || `Domestic Link ${index + 1}`;
        options.push({
          value: interfaceName,
          label: interfaceName,
          group: "Domestic WAN"
        });
        typeMap[interfaceName] = 'Domestic';
      });

      return { options, typeMap };
    });

    return (
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            {$localize`WAN Interface`}
          </div>
        </label>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {$localize`Select which WAN interface this VPN will use for connection`}
        </p>

        {wanInterfaceData.value.options.length > 0 ? (
          <UnifiedSelect
            options={wanInterfaceData.value.options}
            value={selectedInterface?.WANName || ""}
            placeholder={$localize`Select WAN Interface`}
            onChange$={(value) => {
              if (value) {
                const interfaceName = value as string;
                const wanType = wanInterfaceData.value.typeMap[interfaceName];
                if (wanType) {
                  onSelect$({
                    WANType: wanType,
                    WANName: interfaceName
                  });
                }
              }
            }}
            disabled={disabled}
            mode="custom"
            size="md"
            class="w-full"
          />
        ) : (
          <div class="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{$localize`No WAN interfaces available. Please configure WAN links first.`}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
