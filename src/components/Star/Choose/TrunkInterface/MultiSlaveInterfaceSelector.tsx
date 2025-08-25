import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { LuCable, LuWifi, LuRouter, LuLink } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import type { TrunkInterfaceType, SlaveInterfaceMapping } from "../../StarContext/ChooseType";
import { getRouterByModel } from "../RouterModel/Constants";

interface MultiSlaveInterfaceSelectorProps {
  onComplete$?: PropFunction<() => void>;
}

export const MultiSlaveInterfaceSelector = component$((props: MultiSlaveInterfaceSelectorProps) => {
  const starContext = useContext(StarContext);
  const routerModels = starContext.state.Choose.RouterModels;
  const currentMappings = useSignal<SlaveInterfaceMapping[]>(
    starContext.state.Choose.TrunkInterface?.slaveMappings || []
  );
  
  // Get master router
  const masterRouter = routerModels.find(rm => rm.isMaster);
  const masterRouterData = masterRouter ? getRouterByModel(masterRouter.Model) : null;
  
  // Get slave routers
  const slaveRouters = routerModels.filter(rm => !rm.isMaster);
  
  // Get available interfaces for a router model
  const getAvailableInterfaces = (model: string, connectionType: TrunkInterfaceType) => {
    const routerData = getRouterByModel(model);
    if (!routerData) return [];
    
    let interfaces: string[] = [];
    if (connectionType === "wireless") {
      interfaces = routerData.interfaces.wireless || [];
    } else {
      interfaces = [
        ...(routerData.interfaces.ethernet || []),
        ...(routerData.interfaces.sfp || []),
      ];
    }
    
    return interfaces;
  };
  
  // Get already used master interfaces
  const getUsedMasterInterfaces = () => {
    return currentMappings.value.map(m => m.masterInterface);
  };
  
  // Handle interface mapping update for a slave
  const handleMappingUpdate = $((
    slaveIndex: number,
    slaveModel: string,
    field: keyof SlaveInterfaceMapping,
    value: string
  ) => {
    const newMappings = [...currentMappings.value];
    
    // Find existing mapping for this slave
    let mapping = newMappings.find(m => m.slaveRouterIndex === slaveIndex);
    
    if (!mapping) {
      // Create new mapping
      mapping = {
        slaveRouterIndex: slaveIndex,
        slaveRouterModel: slaveModel,
        slaveInterface: "",
        masterInterface: "",
        connectionType: "wired" as TrunkInterfaceType,
      };
      newMappings.push(mapping);
    }
    
    // Update the field
    (mapping as any)[field] = value;
    
    // Update signal
    currentMappings.value = newMappings;
    
    // Track the change
    track("trunk_interface_mapping_updated", {
      slave_model: slaveModel,
      field: field,
      value: value,
      total_slaves: slaveRouters.length,
    });
    
    // Update context
    starContext.updateChoose$({
      TrunkInterface: {
        ...starContext.state.Choose.TrunkInterface,
        slaveMappings: newMappings,
        masterInterfaces: [...new Set(newMappings.map(m => m.masterInterface).filter(Boolean))],
      },
    });
    
    // Check if all slaves are configured
    const allConfigured = slaveRouters.every((_, idx) => {
      const mapping = newMappings.find(m => m.slaveRouterIndex === idx);
      return mapping && mapping.masterInterface && mapping.slaveInterface;
    });
    
    if (allConfigured) {
      props.onComplete$?.();
    }
  });
  
  // Get icon for interface type
  const getInterfaceIcon = (interfaceName: string) => {
    if (interfaceName.startsWith("wifi")) {
      return <LuWifi class="h-4 w-4" />;
    } else if (interfaceName.startsWith("sfp")) {
      return <LuRouter class="h-4 w-4" />;
    } else {
      return <LuCable class="h-4 w-4" />;
    }
  };
  
  // Get current mapping for a slave
  const getSlaveMapping = (slaveIndex: number) => {
    return currentMappings.value.find(m => m.slaveRouterIndex === slaveIndex);
  };
  
  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Configure Trunk Connections`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary mx-auto mt-3 max-w-2xl">
          {$localize`Map each slave router to a master interface`}
        </p>
      </div>
      
      {/* Master Router Info */}
      {masterRouter && masterRouterData && (
        <div class="bg-surface/50 dark:bg-surface-dark/50 mx-auto max-w-4xl rounded-xl p-6">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 dark:bg-primary-500/20">
              <LuRouter class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-text dark:text-text-dark-default">
                {$localize`Master Router`}
              </h3>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                {masterRouter.Model}
              </p>
            </div>
          </div>
          
          {/* Available master interfaces summary */}
          <div class="bg-surface-secondary/30 dark:bg-surface-dark-secondary/30 rounded-lg p-4">
            <p class="mb-2 text-sm font-medium text-text dark:text-text-dark-default">
              {$localize`Available Interfaces:`}
            </p>
            <div class="flex flex-wrap gap-2">
              {[...new Set([
                ...(masterRouterData.interfaces.ethernet || []),
                ...(masterRouterData.interfaces.wireless || []),
                ...(masterRouterData.interfaces.sfp || []),
              ])].map(intf => {
                const usageCount = getUsedMasterInterfaces().filter(i => i === intf).length;
                return (
                  <span
                    key={intf}
                    class={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                      usageCount > 0
                        ? "bg-success/15 text-success dark:bg-success/20 dark:text-success-light"
                        : "bg-primary-500/10 text-primary-500 dark:bg-primary-500/15 dark:text-primary-400"
                    }`}
                  >
                    {getInterfaceIcon(intf)}
                    {intf}
                    {usageCount > 0 && ` (${usageCount} slave${usageCount > 1 ? 's' : ''})`}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Slave Router Configurations */}
      <div class="mx-auto max-w-4xl space-y-6">
        {slaveRouters.map((slaveRouter, index) => {
          const slaveRouterData = getRouterByModel(slaveRouter.Model);
          const currentMapping = getSlaveMapping(index);
          const connectionType = currentMapping?.connectionType || "wired";
          
          if (!slaveRouterData) return null;
          
          return (
            <div
              key={`slave-${index}`}
              class="bg-surface/50 dark:bg-surface-dark/50 overflow-hidden rounded-xl"
            >
              {/* Slave Router Header */}
              <div class="bg-surface-secondary/30 dark:bg-surface-dark-secondary/30 border-b border-border/20 p-4 dark:border-border-dark/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-500/15 dark:bg-secondary-500/20">
                      <LuRouter class="h-5 w-5 text-secondary-500 dark:text-secondary-400" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-text dark:text-text-dark-default">
                        {$localize`Slave Router ${index + 1}`}
                      </h4>
                      <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {slaveRouter.Model}
                      </p>
                    </div>
                  </div>
                  
                  {/* Connection Status */}
                  {currentMapping?.masterInterface && currentMapping.slaveInterface ? (
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success dark:bg-success/20 dark:text-success-light">
                      <LuLink class="h-3 w-3" />
                      {$localize`Configured`}
                    </span>
                  ) : (
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-medium text-warning dark:bg-warning/20 dark:text-warning-light">
                      {$localize`Pending`}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Configuration Fields */}
              <div class="space-y-4 p-4">
                {/* Connection Type Selection */}
                <div>
                  <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Connection Type`}
                  </label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      onClick$={() => handleMappingUpdate(index, slaveRouter.Model, "connectionType", "wired")}
                      class={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                        connectionType === "wired"
                          ? "border-primary-500 bg-primary-500/10 dark:bg-primary-500/15"
                          : "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 border-border dark:border-border-dark"
                      }`}
                    >
                      <LuCable class="h-5 w-5" />
                      <span class="text-sm font-medium">{$localize`Wired`}</span>
                    </button>
                    <button
                      onClick$={() => handleMappingUpdate(index, slaveRouter.Model, "connectionType", "wireless")}
                      class={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                        connectionType === "wireless"
                          ? "border-primary-500 bg-primary-500/10 dark:bg-primary-500/15"
                          : "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 border-border dark:border-border-dark"
                      }`}
                    >
                      <LuWifi class="h-5 w-5" />
                      <span class="text-sm font-medium">{$localize`Wireless`}</span>
                    </button>
                  </div>
                </div>
                
                {/* Interface Selections */}
                <div class="grid gap-4 md:grid-cols-2">
                  {/* Master Interface Selection */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                      {$localize`Master Interface`}
                    </label>
                    <select
                      value={currentMapping?.masterInterface || ""}
                      onChange$={(e) => handleMappingUpdate(
                        index, 
                        slaveRouter.Model, 
                        "masterInterface", 
                        (e.target as HTMLSelectElement).value
                      )}
                      class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                    >
                      <option value="">{$localize`Select interface...`}</option>
                      {masterRouter && getAvailableInterfaces(masterRouter.Model, connectionType).map(intf => {
                        const isUsed = getUsedMasterInterfaces().includes(intf) && 
                                      currentMapping?.masterInterface !== intf;
                        return (
                          <option 
                            key={intf} 
                            value={intf}
                          >
                            {`${intf}${isUsed ? " (shared with other slave)" : ""}`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  
                  {/* Slave Interface Selection */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                      {$localize`Slave Interface`}
                    </label>
                    <select
                      value={currentMapping?.slaveInterface || ""}
                      onChange$={(e) => handleMappingUpdate(
                        index, 
                        slaveRouter.Model, 
                        "slaveInterface", 
                        (e.target as HTMLSelectElement).value
                      )}
                      class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                    >
                      <option value="">{$localize`Select interface...`}</option>
                      {getAvailableInterfaces(slaveRouter.Model, connectionType).map(intf => (
                        <option key={intf} value={intf}>
                          {intf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Connection Summary */}
                {currentMapping?.masterInterface && currentMapping.slaveInterface && (
                  <div class="bg-info/10 dark:bg-info/15 mt-2 rounded-lg p-3">
                    <div class="flex items-center gap-2">
                      <LuLink class="h-4 w-4 text-info dark:text-info-light" />
                      <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {$localize`Connection:`} 
                        <span class="ml-1 font-medium text-text dark:text-text-dark-default">
                          {masterRouter?.Model} ({currentMapping.masterInterface}) 
                          <span class="mx-2">↔</span>
                          {slaveRouter.Model} ({currentMapping.slaveInterface})
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Overall Status */}
      <div class="bg-surface-secondary/50 dark:bg-surface-dark-secondary/50 mx-auto max-w-4xl rounded-xl p-4">
        <h3 class="mb-3 text-lg font-semibold text-text dark:text-text-dark-default">
          {$localize`Configuration Summary`}
        </h3>
        <div class="space-y-2">
          {currentMappings.value.length === 0 ? (
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`No connections configured yet`}
            </p>
          ) : (
            currentMappings.value.map((mapping, idx) => (
              <div key={idx} class="flex items-center gap-3 text-sm">
                <span class="text-success dark:text-success-light">✓</span>
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  {mapping.slaveRouterModel}: {mapping.masterInterface} ↔ {mapping.slaveInterface}
                  <span class="ml-2 text-xs opacity-75">
                    ({mapping.connectionType})
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
        
        {/* Completion Status */}
        {slaveRouters.length > 0 && (
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`Configured:`} {currentMappings.value.filter(m => m.masterInterface && m.slaveInterface).length} / {slaveRouters.length}
            </span>
            {currentMappings.value.filter(m => m.masterInterface && m.slaveInterface).length === slaveRouters.length && (
              <span class="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success dark:bg-success/20 dark:text-success-light">
                <LuLink class="h-3 w-3" />
                {$localize`All connections configured`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});