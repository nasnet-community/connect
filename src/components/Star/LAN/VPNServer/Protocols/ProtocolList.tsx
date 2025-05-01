import { component$, type QRL } from "@builder.io/qwik";
import { HiShieldCheckOutline, HiChevronUpOutline, HiChevronDownOutline } from "@qwikest/icons/heroicons";
import { VPN_PROTOCOLS } from "./constants";
import type { VPNType } from "../../../StarContext/CommonType";

interface ProtocolListProps {
  expandedSections: Record<string, boolean>;
  enabledProtocols: Record<VPNType, boolean>;
  toggleSection$: QRL<(section: string) => void>;
  toggleProtocol$: QRL<(protocol: VPNType) => void>;
}

export const ProtocolList = component$<ProtocolListProps>(({
  expandedSections,
  enabledProtocols,
  toggleSection$,
  toggleProtocol$
}) => {
  return (
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="flex cursor-pointer items-center justify-between p-6" onClick$={() => toggleSection$('protocols')}>
        <div class="flex items-center gap-3">
          <HiShieldCheckOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {$localize`VPN Protocols`}
          </h3>
        </div>
        {expandedSections.protocols ? (
          <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {expandedSections.protocols && (
        <div class="border-t border-gray-200 p-6 dark:border-gray-700">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VPN_PROTOCOLS.map(protocol => (
              <div 
                key={protocol.id}
                class={`
                  flex flex-col justify-between rounded-lg border p-4 transition-all
                  ${enabledProtocols[protocol.id] 
                    ? 'border-primary-300 shadow-sm dark:border-primary-700' 
                    : 'border-gray-200 dark:border-gray-700'}
                `}
              >
                <div class="mb-4 flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <img 
                      src={protocol.logo} 
                      alt={protocol.name} 
                      class="h-8 w-8" 
                      onError$={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{protocol.name}</h4>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {protocol.description}
                    </p>
                  </div>
                </div>
                
                <label class="relative mt-auto inline-flex cursor-pointer items-center self-end">
                  <input
                    type="checkbox"
                    checked={enabledProtocols[protocol.id]}
                    onChange$={() => toggleProtocol$(protocol.id)}
                    class="peer sr-only"
                  />
                  <div
                    class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute 
                            after:left-[2px] after:top-[2px] after:h-5 
                            after:w-5 after:rounded-full after:border 
                            after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                            peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"
                  ></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {enabledProtocols[protocol.id]
                      ? $localize`Enabled`
                      : $localize`Disabled`}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}); 