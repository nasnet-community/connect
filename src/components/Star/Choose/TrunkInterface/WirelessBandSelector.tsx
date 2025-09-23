import { $, component$, type PropFunction } from "@builder.io/qwik";
import { LuWifi, LuAlertCircle } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import type { RouterModels } from "../../StarContext/ChooseType";
import { routers } from "../RouterModel/Constants";

interface WirelessBandSelectorProps {
  selectedBand: "2.4G" | "5G" | null;
  onBandSelect$: PropFunction<(band: "2.4G" | "5G") => void>;
  routerModels: RouterModels[];
  isVisible?: boolean;
}

export const WirelessBandSelector = component$((props: WirelessBandSelectorProps) => {
  // Check which bands are available across ALL routers
  const getAvailableBands = () => {
    const allRouters = props.routerModels;
    let has24G = true;
    let has5G = true;

    for (const routerModel of allRouters) {
      const routerData = routers.find(r => r.model === routerModel.Model);
      if (!routerData || !routerData.interfaces.Interfaces.wireless) {
        has24G = false;
        has5G = false;
        break;
      }

      const wirelessInterfaces = routerData.interfaces.Interfaces.wireless || [];
      if (!wirelessInterfaces.includes("wifi2.4")) {
        has24G = false;
      }
      if (!wirelessInterfaces.includes("wifi5")) {
        has5G = false;
      }
    }

    return { has24G, has5G };
  };

  const availableBands = getAvailableBands();

  const handleBandSelect = $((band: "2.4G" | "5G") => {
    // Track band selection
    track("trunk_wireless_band_selected", {
      band: band,
      configuration: "trunk_mode",
      step: "choose",
    });

    // Call the parent callback
    props.onBandSelect$(band);
  });

  // Don't render if not visible
  if (!props.isVisible) {
    return null;
  }

  return (
    <div class="space-y-6">
      <div class="text-center">
        <h3 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          {$localize`Select Wireless Band`}
        </h3>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-2 max-w-xl text-sm">
          {$localize`Choose the frequency band for your wireless trunk connection. All routers will use the same band.`}
        </p>
      </div>

      <div class="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {/* 2.4G Band Card */}
        {availableBands.has24G && (
          <div
            onClick$={() => handleBandSelect("2.4G")}
            class={`band-card group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300
              ${props.selectedBand === "2.4G"
                ? "ring-2 ring-primary-500 bg-primary-500/5 dark:bg-primary-500/10"
                : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/60"
              }`}
          >
            {/* Selected indicator badge */}
            {props.selectedBand === "2.4G" && (
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
                  ${props.selectedBand === "2.4G"
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
              ${props.selectedBand === "5G"
                ? "ring-2 ring-secondary-500 bg-secondary-500/5 dark:bg-secondary-500/10"
                : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/60"
              }`}
          >
            {/* Selected indicator badge */}
            {props.selectedBand === "5G" && (
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
                  ${props.selectedBand === "5G"
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

      {/* Custom CSS for hover effects */}
      <style
        dangerouslySetInnerHTML={`
        .band-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
        }

        .band-card:active {
          transform: scale(0.98);
        }
      `}
      />
    </div>
  );
});