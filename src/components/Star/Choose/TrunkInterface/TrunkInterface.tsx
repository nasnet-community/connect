import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { LuCable, LuWifi, LuAlertCircle } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import type { TrunkInterfaceType } from "../../StarContext/ChooseType";
import { InterfaceSelector } from "./InterfaceSelector";
import { routers } from "../RouterModel/Constants";

interface TrunkInterfaceProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const TrunkInterface = component$((props: TrunkInterfaceProps) => {
  const starContext = useContext(StarContext);
  // Get the interface type from the first router model's MasterSlaveInterface
  const masterModel = starContext.state.Choose.RouterModels.find(rm => rm.isMaster);
  const _hasSelectedInterface = masterModel?.MasterSlaveInterface;
  const showInterfaceSelector = useSignal(false);
  const selectedInterfaceType = useSignal<TrunkInterfaceType | null>(null);
  const selectedBand = useSignal<"2.4G" | "5G" | null>(null);

  // Check if we have multiple slave routers
  const slaveRouters = starContext.state.Choose.RouterModels.filter(rm => !rm.isMaster);
  const _hasMultipleSlaves = slaveRouters.length > 1;

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

  // Check which bands are available across ALL routers
  const getAvailableBands = () => {
    const allRouters = starContext.state.Choose.RouterModels;
    let has24G = true;
    let has5G = true;

    for (const routerModel of allRouters) {
      const routerData = routers.find(r => r.model === routerModel.Model);
      if (!routerData || !routerData.interfaces.wireless) {
        has24G = false;
        has5G = false;
        break;
      }

      const wirelessInterfaces = routerData.interfaces.wireless;
      if (!wirelessInterfaces.includes("wifi2.4")) {
        has24G = false;
      }
      if (!wirelessInterfaces.includes("wifi5")) {
        has5G = false;
      }
    }

    return { has24G, has5G };
  };

  const wirelessCheck = checkWirelessCapability();
  const availableBands = getAvailableBands();

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

    // Store the selected interface type
    selectedInterfaceType.value = interfaceType;

    // For wired, show interface selector; for wireless, band selection will be shown
    if (interfaceType === "wired") {
      showInterfaceSelector.value = true;
    }
  });

  const handleBandSelect = $((band: "2.4G" | "5G") => {
    // Track band selection
    track("trunk_wireless_band_selected", {
      band: band,
      configuration: "trunk_mode",
      step: "choose",
    });

    // Update selected band state
    selectedBand.value = band;

    // Map band to interface name
    const interfaceName = band === "2.4G" ? "wifi2.4" : "wifi5";

    // Update all router models with the same wireless interface
    const updatedModels = starContext.state.Choose.RouterModels.map((model) => {
      return {
        ...model,
        MasterSlaveInterface: interfaceName as any
      };
    });

    starContext.updateChoose$({
      RouterModels: updatedModels,
    });

    // Trigger completion
    props.onComplete$?.();
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
          const isSelected = selectedInterfaceType.value === option.type;

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
                isSelected
                  ? "ring-2 ring-primary-500 bg-primary-500/5 dark:bg-primary-500/10"
                  : !isWirelessDisabled
                  ? "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/60 bg-surface/50 dark:bg-surface-dark/50"
                  : ""
              }
              `}
            >
              {/* Badges container - positioned at top right */}
              <div class="absolute right-4 top-4 z-10 flex gap-2">
                {/* Selected indicator */}
                {isSelected && !isWirelessDisabled && (
                  <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                )}

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
                {option.badge && !isWirelessDisabled && !isSelected && (
                  <div class={`rounded-full px-3 py-1 ${option.badgeClass}`}>
                    <span class="text-xs font-medium">{option.badge}</span>
                  </div>
                )}
              </div>

            <div class="space-y-6 p-6">
              {/* Icon container */}
              <div
                class={`trunk-icon flex h-16 w-16 items-center justify-center
                rounded-xl transition-all duration-500
                ${isSelected
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

      {/* Band Selection - shown after wireless trunk is selected */}
      {selectedInterfaceType.value === "wireless" && !showInterfaceSelector.value && (
        <div class="mt-8 space-y-6">
          <div class="text-center">
            <h3 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
              {$localize`Select Wireless Band`}
            </h3>
            <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-2 max-w-xl text-sm">
              {$localize`Choose the frequency band for your wireless trunk connection. Both routers will use the same band.`}
            </p>
          </div>

          <div class="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {/* 2.4G Band Card */}
            {availableBands.has24G && (
              <div
                onClick$={() => handleBandSelect("2.4G")}
                class={`band-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300
                  ${selectedBand.value === "2.4G"
                    ? "ring-2 ring-primary-500 bg-primary-500/5 dark:bg-primary-500/10"
                    : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/60"
                  }`}
              >
                {/* Selected indicator badge */}
                {selectedBand.value === "2.4G" && (
                  <div class="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                )}

                <div class="space-y-4 p-5">
                  {/* Band Header */}
                  <div class="flex items-start justify-between">
                    <div class={`flex h-12 w-12 items-center justify-center rounded-xl
                      ${selectedBand.value === "2.4G"
                        ? "bg-primary-500 text-white"
                        : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
                      }`}>
                      <LuWifi class="h-6 w-6" />
                    </div>
                    <span class="rounded-full bg-primary-500/15 px-3 py-1 text-xs font-medium text-primary-500 dark:bg-primary-500/25 dark:text-primary-400">
                      2.4 GHz
                    </span>
                  </div>

                  <div class="space-y-3">
                    <h4 class="text-lg font-semibold text-text dark:text-text-dark-default">
                      {$localize`2.4G Band`}
                    </h4>
                    <p class="text-sm text-text-secondary/90 dark:text-text-dark-secondary/95">
                      {$localize`Longer range, better penetration through walls`}
                    </p>

                    {/* Features */}
                    <div class="space-y-2 pt-2">
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Range: Up to 150 feet indoor`}
                      </div>
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Speed: Up to 300 Mbps`}
                      </div>
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Better for obstacles`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5G Band Card */}
            {availableBands.has5G && (
              <div
                onClick$={() => handleBandSelect("5G")}
                class={`band-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300
                  ${selectedBand.value === "5G"
                    ? "ring-2 ring-secondary-500 bg-secondary-500/5 dark:bg-secondary-500/10"
                    : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/60"
                  }`}
              >
                {/* Selected indicator badge */}
                {selectedBand.value === "5G" && (
                  <div class="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500 text-white">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                )}

                <div class="space-y-4 p-5">
                  {/* Band Header */}
                  <div class="flex items-start justify-between">
                    <div class={`flex h-12 w-12 items-center justify-center rounded-xl
                      ${selectedBand.value === "5G"
                        ? "bg-secondary-500 text-white"
                        : "bg-secondary-500/15 text-secondary-500 dark:bg-secondary-500/20 dark:text-secondary-400"
                      }`}>
                      <LuWifi class="h-6 w-6" />
                    </div>
                    <span class="rounded-full bg-secondary-500/15 px-3 py-1 text-xs font-medium text-secondary-500 dark:bg-secondary-500/25 dark:text-secondary-400">
                      5 GHz
                    </span>
                  </div>

                  <div class="space-y-3">
                    <h4 class="text-lg font-semibold text-text dark:text-text-dark-default">
                      {$localize`5G Band`}
                    </h4>
                    <p class="text-sm text-text-secondary/90 dark:text-text-dark-secondary/95">
                      {$localize`Higher speed, less interference`}
                    </p>

                    {/* Features */}
                    <div class="space-y-2 pt-2">
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-secondary-500 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Range: Up to 50 feet indoor`}
                      </div>
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-secondary-500 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Speed: Up to 1300 Mbps`}
                      </div>
                      <div class="flex items-center text-sm text-text-secondary/80 dark:text-text-dark-secondary/85">
                        <svg class="mr-2 h-4 w-4 text-secondary-500 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {$localize`Less crowded spectrum`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* No bands available warning */}
          {!availableBands.has24G && !availableBands.has5G && (
            <div class="mx-auto max-w-2xl rounded-xl bg-orange-50 p-4 dark:bg-orange-950/20">
              <div class="flex items-start gap-3">
                <LuAlertCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
                <div>
                  <h4 class="mb-1 text-sm font-semibold text-orange-800 dark:text-orange-200">
                    {$localize`No Common Wireless Bands Available`}
                  </h4>
                  <p class="text-sm text-orange-700 dark:text-orange-300">
                    {$localize`The selected routers don't share any common wireless bands. Wireless trunk requires all routers to support the same band.`}
                  </p>
                </div>
              </div>
            </div>
          )}
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

        .band-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
        }

        .band-card:active {
          transform: scale(0.98);
        }
      `}
      />

      {/* Interface Selector - shown after wired trunk is selected */}
      {showInterfaceSelector.value && selectedInterfaceType.value === "wired" && (
        <div class="mt-8">
          <InterfaceSelector
            interfaceType="wired"
            onComplete$={handleInterfaceSelectorComplete}
          />
        </div>
      )}
    </div>
  );
});
