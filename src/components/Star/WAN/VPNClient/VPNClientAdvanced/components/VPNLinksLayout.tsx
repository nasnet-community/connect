import { component$, Slot, useContext, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export const VPNLinksLayout = component$(() => {
  const starContext = useContext(StarContext);

  const foreignWANLinks = useComputed$(() => {
    // Get Foreign WAN configs from the WANLink structure
    const foreignWANConfigs = starContext.state.WAN.WANLink.Foreign.WANConfigs || [];
    return foreignWANConfigs.map((config, index) => ({
      id: config.name || `foreign-${index}`,
      name: config.name || `Foreign Link ${index + 1}`,
      interfaceType: config.InterfaceConfig.InterfaceName,
    }));
  });

  return (
    <div class="flex flex-col gap-6 lg:flex-row">
      {/* Main content area */}
      <div class="flex-1">
        <Slot />
      </div>

      {/* Side panel with WAN links info */}
      <div class="lg:w-80">
        <div class="sticky top-4 space-y-4">
          <div class="rounded-lg bg-surface p-4 shadow-sm dark:bg-surface-dark">
            <h3 class="text-text-default mb-3 text-lg font-medium dark:text-text-dark-default">
              {$localize`Foreign WAN Links`}
            </h3>

            {foreignWANLinks.value.length > 0 ? (
              <div class="space-y-2">
                {foreignWANLinks.value.map((link) => (
                  <div
                    key={link.id}
                    class="flex items-center justify-between rounded bg-background
                           p-2 dark:bg-background-dark"
                  >
                    <div class="flex items-center gap-2">
                      <div class="h-2 w-2 rounded-full bg-green-500"></div>
                      <span class="text-text-default text-sm dark:text-text-dark-default">
                        {link.name}
                      </span>
                    </div>
                    <span class="text-text-muted dark:text-text-dark-muted text-xs">
                      {link.interfaceType}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p class="text-text-muted dark:text-text-dark-muted text-sm">
                {$localize`No foreign WAN links configured`}
              </p>
            )}

            <div class="mt-4 border-t border-border pt-4 dark:border-border-dark">
              <p class="text-text-muted dark:text-text-dark-muted text-sm">
                {$localize`Minimum VPNs required: ${foreignWANLinks.value.length || 1}`}
              </p>
            </div>
          </div>

          <div class="rounded-lg bg-info-50 p-4 dark:bg-info-900/20">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-info-600 dark:text-info-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-info-700 dark:text-info-300">
                  {$localize`Each foreign WAN link should have at least one VPN client configured for optimal redundancy.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
