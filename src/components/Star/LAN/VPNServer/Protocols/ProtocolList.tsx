import { component$, type QRL } from "@builder.io/qwik";
import { VPN_PROTOCOLS } from "./constants";
import type { VPNType } from "../../../StarContext/CommonType";
import { HiCheckCircleOutline } from "@qwikest/icons/heroicons";

interface ProtocolListProps {
  expandedSections: Record<string, boolean>;
  enabledProtocols: Record<VPNType, boolean>;
  toggleSection$: QRL<(section: string) => void>;
  toggleProtocol$: QRL<(protocol: VPNType) => void>;
}

export const ProtocolList = component$<ProtocolListProps>(({
  enabledProtocols,
  toggleProtocol$
}) => {
  return (
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {VPN_PROTOCOLS.map(protocol => (
        <div 
          key={protocol.id}
          class={`
            relative flex flex-col justify-between rounded-lg border-2 p-4 transition-all
            ${enabledProtocols[protocol.id] 
              ? 'border-primary-400 bg-primary-50 shadow-md dark:border-primary-500 dark:bg-primary-900/20' 
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
          `}
        >
          {/* Active Protocol indicator */}
          {enabledProtocols[protocol.id] && (
            <div class="absolute -right-2 -top-2 rounded-full bg-primary-500 p-1 shadow-sm dark:bg-primary-600">
              <HiCheckCircleOutline class="h-4 w-4 text-white" />
            </div>
          )}
          
          <div class="mb-4 flex items-start gap-3">
            <div class="flex-shrink-0">
              <img 
                src={protocol.logo} 
                alt={protocol.name} 
                class="h-8 w-8" 
                onError$={(e) => {
                  const target = e.target as HTMLInputElement;
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
          
          {/* Toggle Button */}
          <div 
            onClick$={() => toggleProtocol$(protocol.id)}
            class={`
              mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-medium
              ${enabledProtocols[protocol.id]
                ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}
              transition-colors
            `}
          >
            {enabledProtocols[protocol.id]
              ? $localize`Enabled`
              : $localize`Enable ${protocol.name}`}
          </div>
        </div>
      ))}
    </div>
  );
}); 