import { component$, $ } from "@builder.io/qwik";
import { HiPlusCircleOutline } from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";
import { useTunnel } from "./useTunnel";
import { TunnelHeader } from "./TunnelHeader";
import { TunnelList } from "./TunnelList";
import { ActionFooter } from "./ActionFooter";
import { IPIPProtocol } from "./Protocols/IPIP/IPIP";
import { EOIPProtocol } from "./Protocols/EOIP/EOIP"; 
import { GREProtocol } from "./Protocols/GRE/GRE";
import { VXLANProtocol } from "./Protocols/VXLAN/VXLAN";
import type { PropFunction } from "@builder.io/qwik";
import type { BaseTunnelConfig, TunnelType } from "../../StarContext/LANType";

export const Tunnel = component$<StepProps>(({ onComplete$ }) => {
  const {
    tunnelEnabled,
    tunnels,
    tunnelTypes,
    selectedTunnelType,
    expandedSections,
    isValid,
    toggleSection,
    addTunnel,
    selectTunnelType,
    saveSettings,
  } = useTunnel();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const selectTunnelType$ = $((type: TunnelType) => selectTunnelType(type));
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) => saveSettings(onComplete));

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="space-y-8">
        {/* Header with Enable/Disable Toggle */}
        <TunnelHeader tunnelEnabled={tunnelEnabled} />

        {tunnelEnabled.value && (
          <>
            {/* Tunnel List */}
            {tunnels.length > 0 && (
              <TunnelList 
                tunnels={tunnels} 
                expandedSections={expandedSections} 
                toggleSection$={toggleSection$} 
              />
            )}
            
            {/* Add new tunnel section */}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="p-6">
                <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {$localize`Add New Tunnel`}
                </h3>
                
                <div class="mb-4">
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Tunnel Type`}
                  </label>
                  <select
                    value={selectedTunnelType.value}
                    onChange$={(e) => selectTunnelType$((e.target as HTMLSelectElement).value as TunnelType)}
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{$localize`Select Tunnel Type`}</option>
                    {tunnelTypes.map((type: TunnelType) => (
                      <option key={type} value={type}>
                        {type.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick$={addTunnel}
                  disabled={!selectedTunnelType.value}
                  class="inline-flex items-center gap-2 rounded-lg border border-gray-300 
                      bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm 
                      transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <HiPlusCircleOutline class="h-5 w-5" />
                  <span>{$localize`Add Tunnel`}</span>
                </button>
              </div>
            </div>
            
            {/* IPIP Tunnels */}
            {tunnels.filter((t: BaseTunnelConfig) => t.type === 'ipip').length > 0 && <IPIPProtocol />}
            
            {/* EOIP Tunnels */}
            {tunnels.filter((t: BaseTunnelConfig) => t.type === 'eoip').length > 0 && <EOIPProtocol />}
            
            {/* GRE Tunnels */}
            {tunnels.filter((t: BaseTunnelConfig) => t.type === 'gre').length > 0 && <GREProtocol />}
            
            {/* VXLAN Tunnels */}
            {tunnels.filter((t: BaseTunnelConfig) => t.type === 'vxlan').length > 0 && <VXLANProtocol />}
          </>
        )}

        {/* Save Button */}
        <ActionFooter 
          isValid={isValid} 
          saveSettings$={saveSettings$} 
          onComplete$={onComplete$}
        />
      </div>
    </div>
  );
}); 