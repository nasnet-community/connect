import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { LuCable, LuWifi, LuAlertCircle } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import type { TrunkInterfaceType } from "../../StarContext/ChooseType";
import { InterfaceSelector } from "./InterfaceSelector";
import { MultiSlaveInterfaceSelector } from "./MultiSlaveInterfaceSelector";
import { routers } from "../RouterModel/Constants";

interface TrunkInterfaceProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const TrunkInterface = component$((props: TrunkInterfaceProps) => {
  const starContext = useContext(StarContext);
  const selectedInterface = starContext.state.Choose.TrunkInterface;
  const showInterfaceSelector = useSignal(false);
  
  // Check if we have multiple slave routers
  const slaveRouters = starContext.state.Choose.RouterModels.filter(rm => !rm.isMaster);
  const hasMultipleSlaves = slaveRouters.length > 1;

  // Check wireless capability for all selected routers
  const checkWirelessCapability = () => {
    const allRouters = starContext.state.Choose.RouterModels;
    const routersWithoutWifi = allRouters.filter(routerModel => {
      const routerData = routers.find(r => r.model === routerModel.Model);
      return !routerData || !routerData.isWireless || !routerData.interfaces.wireless?.length;
    });
    return {
      hasWirelessCapability: routersWithoutWifi.length === 0,
      routersWithoutWifi: routersWithoutWifi
    };
  };

  const wirelessCheck = checkWirelessCapability();

  const handleInterfaceTypeSelect = $((interfaceType: TrunkInterfaceType) => {
    // Prevent wireless selection if routers don't have wireless capability
    if (interfaceType === "wireless" && !wirelessCheck.hasWirelessCapability) {
      return;
    }

    // Track trunk interface type selection
    track("trunk_interface_type_selected", {
      interface_type: interfaceType,
      configuration: "trunk_mode",
      step: "choose",
    });

    starContext.updateChoose$({
      TrunkInterface: {
        ...starContext.state.Choose.TrunkInterface,
        type: interfaceType,
      },
    });
    
    // Show interface selector after type selection
    showInterfaceSelector.value = true;
  });

  const handleInterfaceSelectorComplete = $(() => {
    props.onComplete$?.();
  });

  const interfaceOptions = [
    {
      type: "wired" as TrunkInterfaceType,
      icon: <LuCable class="h-8 w-8" />,
      title: $localize`Wired Trunk`,
      description: $localize`High-speed cable-based trunk connection for maximum performance`,
      features: [
        $localize`Up to 10 Gbps throughput`,
        $localize`Ultra-low latency (<1ms)`,
        $localize`Rock-solid reliability`,
        $localize`Ideal for backbone links`,
      ],
      badge: $localize`Recommended`,
      badgeClass:
        "bg-primary-500/15 text-primary-500 dark:bg-primary-500/25 dark:text-primary-400",
    },
    {
      type: "wireless" as TrunkInterfaceType,
      icon: <LuWifi class="h-8 w-8" />,
      title: $localize`Wireless Trunk`,
      description: $localize`Point-to-point wireless trunk for flexible deployments`,
      features: [
        $localize`No cabling required`,
        $localize`Quick deployment`,
        $localize`802.11ax/ac support`,
        $localize`Ideal for bridging buildings`,
      ],
    },
  ];

  return (
    <div class="space-y-8">
      {/* Header section */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Select Trunk Interface`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-3 max-w-2xl">
          {$localize`Choose how your trunk will connect to the upstream network`}
        </p>
      </div>

      {/* Options grid */}
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {interfaceOptions.map((option) => {
          const isWirelessDisabled = option.type === "wireless" && !wirelessCheck.hasWirelessCapability;
          
          return (
            <div
              key={option.type}
              onClick$={() => handleInterfaceTypeSelect(option.type)}
              class={`trunk-interface-card group relative overflow-hidden rounded-2xl transition-all duration-500
                ${isWirelessDisabled 
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" 
                  : "cursor-pointer"
                }
                ${
                  selectedInterface?.type === option.type
                    ? "bg-primary-500/10 ring-2 ring-primary-500 dark:bg-primary-500/15"
                    : !isWirelessDisabled && "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/60 bg-surface/50 dark:bg-surface-dark/50"
                }
              `}
            >
              {/* Badges container - positioned at top right */}
              <div class="absolute right-4 top-4 z-10 flex gap-2">
                {/* Wireless disabled warning */}
                {isWirelessDisabled && (
                  <div class="rounded-full bg-orange-500/15 px-3 py-1 dark:bg-orange-500/25 flex items-center gap-1">
                    <LuAlertCircle class="h-3 w-3 text-orange-600 dark:text-orange-400" />
                    <span class="text-xs font-medium text-orange-600 dark:text-orange-400">
                      {$localize`No Wi-Fi`}
                    </span>
                  </div>
                )}

                {/* Recommended badge */}
                {option.badge && !isWirelessDisabled && (
                  <div class={`rounded-full px-3 py-1 ${option.badgeClass}`}>
                    <span class="text-xs font-medium">{option.badge}</span>
                  </div>
                )}

                {/* Selected indicator */}
                {selectedInterface?.type === option.type && (
                  <div class="rounded-full bg-success/15 px-3 py-1 dark:bg-success/25">
                    <span class="text-xs font-medium text-success dark:text-success-light">
                      {$localize`Selected`}
                    </span>
                  </div>
                )}
              </div>

            <div class="space-y-6 p-6">
              {/* Icon container */}
              <div
                class={`trunk-icon flex h-16 w-16 items-center justify-center
                rounded-xl transition-all duration-500
                ${
                  selectedInterface?.type === option.type
                    ? "bg-primary-500 text-white"
                    : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
                }`}
              >
                {option.icon}
              </div>

              <div class="space-y-4">
                {/* Title and description */}
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                    {option.title}
                  </h3>
                  <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                    {option.description}
                  </p>
                </div>

                {/* Features list */}
                <div class="space-y-3">
                  {option.features.map((feature) => (
                    <div
                      key={feature}
                      class="text-text-secondary/90 dark:text-text-dark-secondary/95 flex items-center"
                    >
                      <svg
                        class="mr-3 h-5 w-5 text-primary-500 dark:text-primary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span class="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover effect gradient overlay */}
            <div
              class="card-overlay absolute inset-0 bg-gradient-to-br 
              from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity
              duration-500 dark:from-primary-500/15 dark:to-secondary-500/15"
            />
          </div>
        );
        })}
      </div>

      {/* Wireless capability warning */}
      {!wirelessCheck.hasWirelessCapability && (
        <div class="mx-auto max-w-3xl mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-xl">
          <div class="flex items-start gap-3">
            <LuAlertCircle class="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 class="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-1">
                {$localize`Wireless Trunk Not Available`}
              </h4>
              <p class="text-sm text-orange-700 dark:text-orange-300 mb-2">
                {$localize`The following router(s) don't have Wi-Fi capability required for wireless trunk:`}
              </p>
              <ul class="text-sm text-orange-700 dark:text-orange-300 list-disc list-inside space-y-1">
                {wirelessCheck.routersWithoutWifi.map((router) => (
                  <li key={router.Model}>{router.Model}</li>
                ))}
              </ul>
              <p class="text-xs text-orange-600 dark:text-orange-400 mt-2">
                {$localize`Please select routers with Wi-Fi capability or use wired trunk instead.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for hover effects */}
      <style
        dangerouslySetInnerHTML={`
        .trunk-interface-card:hover {
          transform: scale(1.01);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .trunk-interface-card:hover .trunk-icon {
          transform: scale(1.1);
        }
        
        .trunk-interface-card:hover .card-overlay {
          opacity: 1;
        }
      `}
      />

      {/* Interface Selector - shown after interface type selection */}
      {showInterfaceSelector.value && selectedInterface?.type && (
        <div class="mt-8">
          {hasMultipleSlaves || slaveRouters.length > 0 ? (
            // Use MultiSlaveInterfaceSelector for multiple slaves or when we have any slaves
            <MultiSlaveInterfaceSelector
              onComplete$={handleInterfaceSelectorComplete}
            />
          ) : (
            // Use original InterfaceSelector for backward compatibility (single interface)
            <InterfaceSelector
              interfaceType={selectedInterface.type}
              onComplete$={handleInterfaceSelectorComplete}
            />
          )}
        </div>
      )}
    </div>
  );
});
