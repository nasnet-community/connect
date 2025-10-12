import { component$, useVisibleTask$, $, useSignal, useContext } from "@builder.io/qwik";
import { useEInterface } from "./useEInterface";
import type { Ethernet, BaseNetworksType } from "~/components/Star/StarContext";
import type { StepProps } from "~/types/step";
import { StarContext } from "~/components/Star/StarContext";
import {
  isInterfaceOccupied,
  getOccupiedInterfacesForRouter,
  getInterfaceUsage
} from "../../utils/InterfaceManagementUtils";

export default component$<StepProps>(({ isComplete, onComplete$ }) => {
  const starContext = useContext(StarContext);
  const {
    availableNetworks,
    selectedEInterfaces,
    getAvailableEInterfaces,
    getUsedWANInterfaces,
    addEInterface,
    updateEInterface,
    initializeFromContext,
    getDefaultNetwork,
  } = useEInterface();

  const availableEInterfaces = useSignal<Ethernet[]>([]);
  const usedWANInterfaces = useSignal<string[]>([]);
  const unsavedChanges = useSignal(false);
  const allInterfaces = useSignal<
    {
      name: string;
      inUse: boolean;
      usedBy: string;
      selected: boolean;
      network: BaseNetworksType;
    }[]
  >([]);

  const updateInterfacesList = $(async () => {
    const currentlySelected = new Map<string, BaseNetworksType>();
    selectedEInterfaces.value.forEach((intf) => {
      currentlySelected.set(intf.name, intf.bridge);
    });

    // Get default network based on DomesticLink setting
    const defaultNetwork = await getDefaultNetwork();

    // Get occupied interfaces for the master router only
    const masterRouter = starContext.state.Choose.RouterModels.find(rm => rm.isMaster);
    const occupiedInterfaces = masterRouter
      ? getOccupiedInterfacesForRouter(masterRouter)
      : [];

    const allIntfs = [...availableEInterfaces.value].map((name) => {
      const selected = currentlySelected.has(name);
      const isOccupied = isInterfaceOccupied(occupiedInterfaces, name);
      const usage = isOccupied ? (getInterfaceUsage(occupiedInterfaces, name) || "Other") : "";

      return {
        name,
        inUse: isOccupied,
        usedBy: isOccupied ? usage : "",
        selected,
        // Use default network for non-selected interfaces
        network: selected ? currentlySelected.get(name)! : defaultNetwork,
      };
    });

    // Mark WAN interfaces as used
    usedWANInterfaces.value.forEach((name) => {
      const existingIntf = allIntfs.find((intf) => intf.name === name);
      if (existingIntf) {
        existingIntf.inUse = true;
        existingIntf.usedBy = "WAN";
      } else {
        allIntfs.push({
          name: name as Ethernet,
          inUse: true,
          usedBy: "WAN",
          selected: false,
          network: "Foreign" as BaseNetworksType,
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

    await updateInterfacesList();
  });

  const handleNetworkChange = $(
    (interfaceName: string, newNetworkValue: string) => {
      const updatedInterfaces = [...allInterfaces.value];
      const interfaceIndex = updatedInterfaces.findIndex(
        (intf) => intf.name === interfaceName,
      );

      if (interfaceIndex >= 0) {
        const currentInterface = updatedInterfaces[interfaceIndex];

        if (currentInterface.inUse) return;

        const wasSelected = currentInterface.selected;
        const newNetwork = newNetworkValue as BaseNetworksType;

        updatedInterfaces[interfaceIndex] = {
          ...currentInterface,
          selected: true,
          network: newNetwork,
        };
        allInterfaces.value = updatedInterfaces;

        if (!wasSelected) {
          addEInterface(interfaceName as Ethernet, newNetwork);
        } else {
          updateEInterface(interfaceName as Ethernet, newNetwork);
        }

        unsavedChanges.value = true;
      }
    },
  );

  const handleSave = $(async () => {
    // Get default network based on DomesticLink setting
    const defaultNetwork = await getDefaultNetwork();

    // Always ensure all available interfaces are assigned to networks
    // This includes both explicitly selected interfaces and unselected ones
    for (const intf of allInterfaces.value) {
      if (!intf.inUse) {
        // If interface is already selected, keep its current network assignment
        // If interface is not selected, assign it to the default network
        const networkToAssign = intf.selected ? intf.network : defaultNetwork;

        // Check if this interface is already in the selected list
        const existingInterface = selectedEInterfaces.value.find(
          (selected) => selected.name === intf.name,
        );

        if (!existingInterface) {
          // Add new interface
          await addEInterface(intf.name as Ethernet, networkToAssign as BaseNetworksType);
        } else if (existingInterface.bridge !== networkToAssign) {
          // Update existing interface if network changed
          await updateEInterface(intf.name as Ethernet, networkToAssign as BaseNetworksType);
        }
      }
    }

    // Update the interface list to reflect all changes
    await updateInterfacesList();

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
                  {$localize`All available interfaces will be assigned to network bridges`}
                </p>
                <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                  {allInterfaces.value.filter((i) => !i.inUse).length}{" "}
                  {$localize`Available`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="p-6">
          {/* Interfaces Table */}
          <div class="overflow-hidden rounded-xl border border-border dark:border-border-dark">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="bg-surface-secondary dark:bg-surface-dark-secondary border-b border-border dark:border-border-dark">
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Interface`}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Status`}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Network`}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border dark:divide-border-dark">
                {allInterfaces.value.map((intf) => (
                  <tr
                    key={intf.name}
                    class="hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary bg-surface transition-colors dark:bg-surface-dark"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <span class="font-medium text-text dark:text-text-dark-default">
                          {intf.name}
                        </span>
                      </div>
                    </td>
                    <td class="text-text-secondary dark:text-text-dark-secondary px-6 py-4">
                      {intf.inUse ? (
                        <span class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          intf.usedBy === "WAN"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }`}>
                          {$localize`Used by ${intf.usedBy}`}
                        </span>
                      ) : intf.selected ? (
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          {$localize`Configured`}
                        </span>
                      ) : (
                        <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {$localize`Will be assigned`}
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
                            value={intf.network as string}
                            onChange$={(e) =>
                              handleNetworkChange(
                                intf.name,
                                (e.target as HTMLSelectElement).value,
                              )
                            }
                          >
                            {availableNetworks.value.map((network) => (
                              <option key={network as string} value={network as string}>
                                {network as string}
                              </option>
                            ))}
                          </select>
                          <div class="text-text-secondary dark:text-text-dark-secondary pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
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
              <div class="text-text-secondary dark:text-text-dark-secondary py-8 text-center">
                {$localize`No interfaces available.`}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div class="mt-6 flex justify-end">
            <button
              onClick$={handleSave}
              class="group rounded-lg bg-primary-500 px-6 py-2.5 font-medium 
                    text-white shadow-md shadow-primary-500/25 transition-all duration-200 
                    hover:bg-primary-600 focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 
                    active:scale-[0.98] dark:focus:ring-offset-surface-dark"
              disabled={isComplete || allInterfaces.value.length === 0}
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
