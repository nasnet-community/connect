import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import { LuCable, LuWifi, LuRouter } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import type { TrunkInterfaceType, OccupiedInterface } from "../../StarContext/ChooseType";
import { routers } from "../RouterModel/Constants";
import {
  addOccupiedInterface,
} from "../../utils/InterfaceManagementUtils";
import type { InterfaceType } from "../../StarContext/CommonType";

interface InterfaceSelectorProps {
  interfaceType: TrunkInterfaceType;
  selectedBand?: "2.4G" | "5G" | null;
  onComplete$?: PropFunction<() => void>;
}

export const InterfaceSelector = component$((props: InterfaceSelectorProps) => {
  const starContext = useContext(StarContext);
  const routerModels = starContext.state.Choose.RouterModels;
  // Get the current master slave interface from the first router model
  const _selectedTrunkInterface = starContext.state.Choose.RouterModels[0]?.MasterSlaveInterface;

  // Get available interfaces based on router models and interface type
  const getAvailableInterfaces = () => {
    const interfaces: { master: string[]; slave?: string[] } = {
      master: [],
      slave: [],
    };

    // Find master and slave routers by their isMaster flag
    const masterRouter = routerModels.find(rm => rm.isMaster);
    const slaveRouter = routerModels.find(rm => !rm.isMaster);

    // Process master router interfaces
    if (masterRouter) {
      const routerData = routers.find((r) => r.model === masterRouter.Model);
      if (routerData) {
        if (props.interfaceType === "wireless") {
          let wirelessInterfaces = routerData.interfaces.Interfaces.wireless || [];

          // Filter based on selected band if provided
          if (props.selectedBand) {
            const targetInterface = props.selectedBand === "2.4G" ? "wifi2.4" : "wifi5";
            wirelessInterfaces = wirelessInterfaces.filter(iface => iface === targetInterface);
          }

          interfaces.master = wirelessInterfaces;
        } else {
          interfaces.master = [
            ...(routerData.interfaces.Interfaces.ethernet || []),
            ...(routerData.interfaces.Interfaces.sfp || []),
          ];
        }
      }
    }

    // Process slave router interfaces
    if (slaveRouter) {
      const routerData = routers.find((r) => r.model === slaveRouter.Model);
      if (routerData) {
        if (props.interfaceType === "wireless") {
          let wirelessInterfaces = routerData.interfaces.Interfaces.wireless || [];

          // Filter based on selected band if provided
          if (props.selectedBand) {
            const targetInterface = props.selectedBand === "2.4G" ? "wifi2.4" : "wifi5";
            wirelessInterfaces = wirelessInterfaces.filter(iface => iface === targetInterface);
          }

          interfaces.slave = wirelessInterfaces;
        } else {
          interfaces.slave = [
            ...(routerData.interfaces.Interfaces.ethernet || []),
            ...(routerData.interfaces.Interfaces.sfp || []),
          ];
        }
      }
    }

    return interfaces;
  };

  const availableInterfaces = getAvailableInterfaces();
  const isTrunkMode = starContext.state.Choose.RouterMode === "Trunk Mode";

  const handleInterfaceSelect = $(
    (interfaceName: string, isSlaveInterface: boolean = false) => {
      // Track interface selection
      track("trunk_interface_port_selected", {
        interface_type: props.interfaceType,
        interface_name: interfaceName,
        is_slave: isSlaveInterface,
        router_mode: starContext.state.Choose.RouterMode,
      });

      console.log(`Interface selection: ${interfaceName}, isSlaveInterface: ${isSlaveInterface}`);

      // Update the MasterSlaveInterface and check completion in single state update
      const updatedModels = starContext.state.Choose.RouterModels.map((model) => {
        const updatedModel = { ...model };

        // In Trunk Mode, use isMaster flag for identification
        if (isTrunkMode) {
          if (!isSlaveInterface && model.isMaster) {
            // Master interface selection for master router
            console.log(`Setting master router (${model.Model}) MasterSlaveInterface to: ${interfaceName}`);
            updatedModel.MasterSlaveInterface = interfaceName as any;
          } else if (isSlaveInterface && !model.isMaster) {
            // Slave interface selection for slave router
            console.log(`Setting slave router (${model.Model}) MasterSlaveInterface to: ${interfaceName}`);
            updatedModel.MasterSlaveInterface = interfaceName as any;
          }
        } else {
          // Non-trunk mode: only update the master router
          if (!isSlaveInterface && model.isMaster) {
            updatedModel.MasterSlaveInterface = interfaceName as any;
          }
        }

        return updatedModel;
      });

      // Check if configuration is complete after this update
      const masterRouter = updatedModels.find(rm => rm.isMaster);
      const slaveRouter = isTrunkMode ? updatedModels.find(rm => !rm.isMaster) : null;
      const masterInterface = masterRouter?.MasterSlaveInterface;
      const slaveInterface = slaveRouter?.MasterSlaveInterface;

      console.log(`After interface selection - Master: ${masterInterface}, Slave: ${slaveInterface}`);

      // Final models with OccupiedInterfaces updated if both interfaces are selected
      const finalModels = updatedModels.map((model) => {
        const finalModel = { ...model };

        // Only update OccupiedInterfaces if configuration is complete
        if (masterInterface && slaveInterface) {
          // Start with clean OccupiedInterfaces to prevent accumulation
          const cleanOccupied: OccupiedInterface[] = [];

          // Each router should only track its own interface
          if (finalModel.MasterSlaveInterface) {
            const interfaceToAdd = finalModel.MasterSlaveInterface;
            const role = finalModel.isMaster ? "Master" : "Slave";

            console.log(`Adding ${interfaceToAdd} to ${role} router (${finalModel.Model}) OccupiedInterfaces`);
            finalModel.Interfaces.OccupiedInterfaces = addOccupiedInterface(
              cleanOccupied,
              interfaceToAdd as InterfaceType,
              "Trunk",
              role
            );
          } else {
            finalModel.Interfaces.OccupiedInterfaces = cleanOccupied;
          }

          // Validation: warn if OccupiedInterfaces doesn't match MasterSlaveInterface
          if (finalModel.MasterSlaveInterface) {
            const occupied = finalModel.Interfaces.OccupiedInterfaces;
            const hasInterface = occupied.some(item => item.interface === finalModel.MasterSlaveInterface);

            const routerType = finalModel.isMaster ? 'Master' : 'Slave';
            if (!hasInterface) {
              console.warn(`Warning: ${routerType} router (${finalModel.Model}) has MasterSlaveInterface ${finalModel.MasterSlaveInterface} but it's not in OccupiedInterfaces`);
              console.warn(`OccupiedInterfaces:`, occupied);
            } else {
              console.log(`✓ ${routerType} router (${finalModel.Model}) correctly has ${finalModel.MasterSlaveInterface} in OccupiedInterfaces`);
            }
          }
        } else {
          // Keep existing OccupiedInterfaces if configuration is not complete
          // (Don't clear them in case they were set from a previous configuration)
        }

        return finalModel;
      });

      // Single state update with complete information
      starContext.updateChoose$({
        RouterModels: finalModels,
      });

      // Trigger completion callback if both interfaces are now selected
      if (masterInterface && slaveInterface) {
        console.log(`Configuration complete - Master: ${masterInterface}, Slave: ${slaveInterface}`);
        props.onComplete$?.();
      }
    }
  );

  const getInterfaceIcon = (interfaceName: string) => {
    if (interfaceName.startsWith("wifi")) {
      return <LuWifi class="h-5 w-5" />;
    } else if (interfaceName.startsWith("sfp")) {
      return <LuRouter class="h-5 w-5" />;
    } else {
      return <LuCable class="h-5 w-5" />;
    }
  };


  const renderInterfaceSection = (
    title: string,
    interfaces: string[],
    selectedInterface?: string,
    isSlaveInterface: boolean = false
  ) => {
    if (interfaces.length === 0) return null;

    const routerModel = isSlaveInterface
      ? routerModels.find(rm => !rm.isMaster)?.Model
      : routerModels.find(rm => rm.isMaster)?.Model;

    return (
      <div class="space-y-4">
        {/* Compact Section Header */}
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-text dark:text-text-dark-default">
            {title}
          </h3>
          {routerModel && (
            <span class="inline-flex items-center gap-1.5 rounded-lg bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-500 dark:bg-primary-500/15 dark:text-primary-400">
              <LuRouter class="h-3 w-3" />
              {routerModel}
            </span>
          )}
        </div>

        {/* Compact Interface Grid */}
        <div class={`grid gap-2 ${
          interfaces.length > 9 ? "max-h-[400px] overflow-y-auto pr-2" : ""
        } ${
          interfaces.length === 1 
            ? "grid-cols-1 max-w-md mx-auto" 
            : interfaces.length <= 4 
            ? "grid-cols-1 sm:grid-cols-2" 
            : "grid-cols-2 lg:grid-cols-3"
        }`}>
          {interfaces.map((interfaceName, index) => (
            <div
              key={interfaceName}
              onClick$={() => handleInterfaceSelect(interfaceName, isSlaveInterface)}
              style={`animation-delay: ${index * 30}ms`}
              class={`
                interface-card group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200
                ${
                  selectedInterface === interfaceName
                    ? "bg-primary-500/10 ring-2 ring-primary-500 dark:bg-primary-500/15 selected-card"
                    : "hover:bg-surface-secondary/60 dark:hover:bg-surface-dark-secondary/70 bg-surface/60 dark:bg-surface-dark/60"
                }
              `}
            >
              {/* Compact Card Content */}
              <div class="flex items-center gap-3 p-3">
                {/* Icon */}
                <div
                  class={`
                    flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200
                    ${
                      selectedInterface === interfaceName
                        ? "bg-primary-500 text-white"
                        : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
                    }
                  `}
                >
                  {getInterfaceIcon(interfaceName)}
                </div>

                {/* Content */}
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-semibold text-text dark:text-text-dark-default truncate">
                      {interfaceName}
                    </h4>
                    {/* Compact Selection Indicator */}
                    {selectedInterface === interfaceName ? (
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-success dark:text-success-light"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div class="h-5 w-5 flex-shrink-0 rounded-full border-2 border-text-secondary/20 dark:border-text-dark-secondary/20" />
                    )}
                  </div>
                  
                  {/* Compact Info */}
                  <div class="mt-1 flex items-center gap-2">
                    {interfaceName.startsWith("wifi") && (
                      <span class="text-xs text-text-secondary/70 dark:text-text-dark-secondary/70">
                        {interfaceName.includes("5") ? "5 GHz" : "2.4 GHz"} • WiFi 6
                      </span>
                    )}
                    {interfaceName.startsWith("sfp") && (
                      <span class="text-xs text-text-secondary/70 dark:text-text-dark-secondary/70">
                        10 Gbps • Fiber
                      </span>
                    )}
                    {interfaceName.startsWith("ether") && (
                      <span class="text-xs text-text-secondary/70 dark:text-text-dark-secondary/70">
                        1 Gbps • Port {interfaceName.replace("ether", "")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div
                class={`absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent 
                opacity-0 transition-opacity duration-200
                ${selectedInterface === interfaceName ? "opacity-100" : "group-hover:opacity-100"}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div class="space-y-6">
      {/* Compact Header */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          {props.interfaceType === "wireless"
            ? $localize`Select Wireless Interface`
            : $localize`Select Wired Interface`}
        </h2>
        <p class="text-text-secondary/80 dark:text-text-dark-secondary/85 mx-auto mt-2 max-w-xl text-sm">
          {isTrunkMode
            ? $localize`Choose interfaces on both routers for trunk connection`
            : $localize`Choose the interface for the connection`}
        </p>
      </div>

      {/* Interface sections */}
      <div class="mx-auto max-w-4xl space-y-6">
        {/* Master router interfaces */}
        {renderInterfaceSection(
          isTrunkMode ? $localize`Master Router Interface` : $localize`Router Interface`,
          availableInterfaces.master,
          starContext.state.Choose.RouterModels.find(rm => rm.isMaster)?.MasterSlaveInterface
        )}

        {/* Slave router interfaces (only in Trunk Mode) */}
        {isTrunkMode &&
          availableInterfaces.slave &&
          renderInterfaceSection(
            $localize`Slave Router Interface`,
            availableInterfaces.slave,
            starContext.state.Choose.RouterModels.find(rm => !rm.isMaster)?.MasterSlaveInterface,
            true
          )}
      </div>

      {/* Compact Selection Status */}
      {isTrunkMode && (
        <div class="bg-info/10 dark:bg-info/15 rounded-lg p-3">
          <div class="flex items-center gap-2.5">
            <svg
              class="h-4 w-4 flex-shrink-0 text-info dark:text-info-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="text-xs text-text-secondary dark:text-text-dark-secondary">
              {(() => {
                const masterInterface = starContext.state.Choose.RouterModels.find(rm => rm.isMaster)?.MasterSlaveInterface;
                const slaveInterface = starContext.state.Choose.RouterModels.find(rm => !rm.isMaster)?.MasterSlaveInterface;

                return masterInterface && slaveInterface ? (
                  <span class="font-medium text-success dark:text-success-light">
                    {$localize`Trunk ready`}: {masterInterface} ↔ {slaveInterface}
                  </span>
                ) : (
                  <span>
                    {$localize`Select interfaces on both routers to complete configuration`}
                  </span>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .interface-card {
          transition: all 0.2s ease;
          animation: fadeIn 0.3s ease-out;
          animation-fill-mode: both;
          border: 1px solid transparent;
        }
        
        .interface-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .interface-card.selected-card {
          position: relative;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
        }
        
        .interface-card.selected-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--primary-500, #3b82f6), var(--secondary-500, #8b5cf6));
          border-radius: 1rem 0 0 1rem;
        }
        
        .interface-card:active {
          transform: scale(0.98);
        }
        
        /* Custom scrollbar for compact grid */
        .grid::-webkit-scrollbar {
          width: 6px;
        }
        
        .grid::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.03);
          border-radius: 3px;
        }
        
        .grid::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.12);
          border-radius: 3px;
        }
        
        .grid::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .interface-card {
            animation: none;
          }
        }
      `}
      />
    </div>
  );
});