import { component$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { useEInterface } from './useEInterface';
import type { Ethernet } from '../../StarContext/CommonType';
import type { Networks } from '../../StarContext/CommonType';
import type { StepProps } from '~/types/step';

export default component$<StepProps>(({ isComplete, onComplete$ }) => {
  const {
    availableNetworks,
    selectedEInterfaces,
    getAvailableEInterfaces,
    getUsedWANInterfaces,
    addEInterface,
    updateEInterface,
    initializeFromContext,
    getDefaultNetwork
  } = useEInterface();

  const availableEInterfaces = useSignal<Ethernet[]>([]);
  const usedWANInterfaces = useSignal<string[]>([]);
  const unsavedChanges = useSignal(false);
  const allInterfaces = useSignal<{
    name: string;
    inUse: boolean;
    usedBy: string;
    selected: boolean;
    network: Networks;
  }[]>([]);

  const updateInterfacesList = $(() => {
    const currentlySelected = new Map<string, Networks>();
    selectedEInterfaces.value.forEach(intf => {
      currentlySelected.set(intf.name, intf.bridge);
    });

    const allIntfs = [...availableEInterfaces.value].map(name => {
      const selected = currentlySelected.has(name);
      return {
        name,
        inUse: false,
        usedBy: '',
        selected,
        network: selected ? currentlySelected.get(name)! : 'VPN' as Networks
      };
    });

    usedWANInterfaces.value.forEach(name => {
      const existingIntf = allIntfs.find(intf => intf.name === name);
      if (existingIntf) {
        existingIntf.inUse = true;
        existingIntf.usedBy = 'WAN';
      } else {
        allIntfs.push({
          name: name as Ethernet, 
          inUse: true,
          usedBy: 'WAN',
          selected: false,
          network: 'Foreign' as Networks
        });
      }
    });

    allIntfs.sort((a, b) => a.name.localeCompare(b.name));
    
    allInterfaces.value = allIntfs;
  });

  useVisibleTask$(async () => {
    await initializeFromContext();
    
    const wanInterfaces = await getUsedWANInterfaces();
    usedWANInterfaces.value = wanInterfaces;
    
    const ethInterfaces = await getAvailableEInterfaces();
    availableEInterfaces.value = ethInterfaces;
    
    const defaultNetwork = await getDefaultNetwork();
    
    // Update all non-selected interfaces to use the default network
    allInterfaces.value = allInterfaces.value.map(intf => {
      if (!intf.selected && !intf.inUse) {
        return { ...intf, network: defaultNetwork };
      }
      return intf;
    });
    
    updateInterfacesList();
  });

  const handleNetworkChange = $((interfaceName: string, newNetworkValue: string) => {
    const updatedInterfaces = [...allInterfaces.value];
    const interfaceIndex = updatedInterfaces.findIndex(intf => intf.name === interfaceName);
    
    if (interfaceIndex >= 0) {
      const currentInterface = updatedInterfaces[interfaceIndex];
      
      if (currentInterface.inUse) return;
      
      const wasSelected = currentInterface.selected;
      const newNetwork = newNetworkValue as Networks;
      
      updatedInterfaces[interfaceIndex] = {
        ...currentInterface,
        selected: true,
        network: newNetwork
      };
      allInterfaces.value = updatedInterfaces;
      
      if (!wasSelected) {
        addEInterface(interfaceName as Ethernet, newNetwork);
      } else {
        updateEInterface(interfaceName as Ethernet, newNetwork);
      }
      
      unsavedChanges.value = true;
    }
  });

  const handleSave = $(() => {
    // If no changes were made but interfaces are available,
    // consider the default configuration as valid and proceed
    if (!unsavedChanges.value && allInterfaces.value.length > 0) {
      // Assign default configuration for all available interfaces
      allInterfaces.value.forEach(async (intf) => {
        if (!intf.inUse && !intf.selected) {
          const defaultNetwork = await getDefaultNetwork();
          addEInterface(intf.name as Ethernet, defaultNetwork);
        }
      });
    }
    
    unsavedChanges.value = false;
    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`LAN Interface Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Assign interfaces to network bridges`}
                </p>
                <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                  {allInterfaces.value.filter(i => i.selected).length} {$localize`Selected`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="p-6">
          {/* WAN Interfaces Warning */}
          {/* {usedWANInterfaces.value.length > 0 && (
            <div class="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/30">
              <h3 class="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
                {$localize`Some interfaces are already in use`}
              </h3>
              <p class="text-sm text-amber-700 dark:text-amber-400">
                {$localize`Interfaces used in the WAN section cannot be assigned to LAN networks. They are shown as disabled in the table below.`}
              </p>
            </div>
          )} */}
          
          {/* Interfaces Table */}
          <div class="overflow-hidden rounded-xl border border-border dark:border-border-dark">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-border bg-surface-secondary dark:border-border-dark dark:bg-surface-dark-secondary">
                  <th scope="col" class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Interface`}
                  </th>
                  <th scope="col" class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Status`}
                  </th>
                  <th scope="col" class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Network`}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border dark:divide-border-dark">
                {allInterfaces.value.map((intf) => (
                  <tr key={intf.name} class="bg-surface transition-colors hover:bg-surface-secondary dark:bg-surface-dark dark:hover:bg-surface-dark-secondary">
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        {/* <div class={`h-2.5 w-2.5 rounded-full ${
                          intf.inUse 
                            ? 'bg-red-500' 
                            : intf.selected 
                              ? 'bg-primary-500' 
                              : 'bg-text-secondary/50'
                        }`}></div> */}
                        <span class="font-medium text-text dark:text-text-dark-default">
                          {intf.name}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-text-secondary dark:text-text-dark-secondary">
                      {intf.inUse ? (
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          {$localize`Used by ${intf.usedBy}`}
                        </span>
                      ) : intf.selected ? (
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {$localize`In Use`}
                        </span>
                      ) : (
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          {$localize`Available`}
                        </span>
                      )}
                    </td>
                    <td class="px-6 py-4">
                      {intf.inUse ? (
                        <span class="text-text-secondary/50 dark:text-text-dark-secondary/50">
                          {$localize`Not Available`}
                        </span>
                      ) : (
                        <div class="relative">
                          <select
                            class="w-full cursor-pointer appearance-none rounded-lg border border-border
                                  bg-surface px-4 py-2.5 text-text focus:border-primary-500 focus:outline-none
                                  focus:ring-2 focus:ring-primary-500/50 dark:border-border-dark dark:bg-surface-dark
                                  dark:text-text-dark-default"
                            value={intf.network}
                            onChange$={(e) => handleNetworkChange(intf.name, (e.target as HTMLSelectElement).value)}
                          >
                            {availableNetworks.value.map((network) => (
                              <option key={network} value={network}>
                                {network}
                              </option>
                            ))}
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary dark:text-text-dark-secondary">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {allInterfaces.value.length === 0 && (
              <div class="text-center py-8 text-text-secondary dark:text-text-dark-secondary">
                {$localize`No interfaces available.`}
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div class="mt-6 flex justify-end">
            <button
              onClick$={handleSave}
              class="focus:ring-primary-500/50 group rounded-lg bg-primary-500 px-6 py-2.5 
                    font-medium text-white shadow-md shadow-primary-500/25 transition-all 
                    duration-200 hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 
                    active:scale-[0.98] dark:focus:ring-offset-surface-dark"
              disabled={isComplete || (allInterfaces.value.length === 0)}
            >
              <span class="flex items-center space-x-2">
                <span>{$localize`Save Settings`}</span>
                <svg
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
