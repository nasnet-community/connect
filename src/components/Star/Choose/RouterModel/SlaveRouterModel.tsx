import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuUsers, LuLink, LuPlus } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { getSlaveRouters, type RouterData } from "./Constants";
import { type RouterInterfaces, type CPUArch } from "../../StarContext/ChooseType";
import { ClassyRouterCard } from "./ClassyRouterCard";
import { ClassyTabs } from "./ClassyTabs";
import { RouterDetailsModal } from "./RouterDetailsModal";
import { CustomRouterModal } from "./CustomRouterModal";
import { categorizeRouters } from "./RouterCategories";

interface SlaveRouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const SlaveRouterModel = component$((props: SlaveRouterModelProps) => {
  const starContext = useContext(StarContext);
  const masterRouter = starContext.state.Choose.RouterModels.find(
    (rm) => rm.isMaster,
  );
  
  // Get all slave routers (non-master routers)
  const slaveRouters = starContext.state.Choose.RouterModels.filter(
    (rm) => !rm.isMaster,
  );
  const slaveModels = slaveRouters.map(rm => rm.Model);
  const availableSlaveRouters = getSlaveRouters();
  
  // Get custom routers from context (both master and slaves)
  const customRouters = starContext.state.Choose.RouterModels
    .filter((rm) => !availableSlaveRouters.some((r) => r.model === rm.Model))
    .map((rm) => {
      // Convert back to RouterData format for display
      return {
        model: rm.Model,
        title: rm.Model,
        description: rm.isCHR ? $localize`Custom Cloud Hosted Router` : $localize`Custom Router`,
        icon: "router",
        specs: {
          CPU: rm.cpuArch || "Custom",
          RAM: "N/A",
          Storage: "N/A",
          Ports: "Custom",
          "Wi-Fi": "Custom",
          Speed: "Custom",
        },
        features: [],
        isWireless: !!rm.Interfaces.Interfaces.wireless?.length,
        isLTE: !!rm.Interfaces.Interfaces.lte?.length,
        isSFP: !!rm.Interfaces.Interfaces.sfp?.length,
        interfaces: rm.Interfaces,
        canBeMaster: true,
        canBeSlave: true,
        images: ["/images/routers/placeholder.png"],
      } as RouterData;
    });
  
  // Merge custom and predefined routers
  const allSlaveRouters = [...customRouters, ...availableSlaveRouters];
  
  // Categorize routers by family
  const routerCategories = categorizeRouters(allSlaveRouters);
  
  // Tab state
  const activeTab = useSignal<string>(routerCategories[0]?.id || "hAP");
  
  // Modal state
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);
  
  // Custom router modal state
  const isCustomRouterModalOpen = useSignal(false);

  const handleSelect = $((model: string) => {
    const selectedRouter = allSlaveRouters.find((r) => r.model === model);
    if (!selectedRouter) return;

    // Use the full RouterInterfaces structure from the selected router
    const interfaces: RouterInterfaces = {
      Interfaces: {
        ethernet: [...(selectedRouter.interfaces.Interfaces.ethernet || [])],
        wireless: [...(selectedRouter.interfaces.Interfaces.wireless || [])],
        sfp: [...(selectedRouter.interfaces.Interfaces.sfp || [])],
        lte: [...(selectedRouter.interfaces.Interfaces.lte || [])],
      },
      OccupiedInterfaces: [],
    };

    // Check if this model is already selected as slave
    const isAlreadySelected = slaveRouters.some((rm) => rm.Model === model);
    
    // Check if this is a custom router
    const existingCustomRouterModel = starContext.state.Choose.RouterModels.find(
      (rm) => rm.Model === model
    );
    
    let updatedModels = [...starContext.state.Choose.RouterModels];
    
    if (isAlreadySelected) {
      // Remove this slave router
      updatedModels = updatedModels.filter(
        (rm) => !(rm.Model === model && !rm.isMaster)
      );
    } else {
      // Add as new slave router
      updatedModels.push({
        isMaster: false,
        Model: model as any, // Cast to RouterModel type
        Interfaces: interfaces,
        isCHR: existingCustomRouterModel?.isCHR,
        cpuArch: existingCustomRouterModel?.cpuArch,
      });
    }
    
    starContext.updateChoose$({
      RouterModels: updatedModels,
    });

    // Track router model selection
    track("slave_router_model_selected", {
      master_router: masterRouter?.Model || "",
      slave_router: model,
      action: isAlreadySelected ? "removed" : "added",
      total_slave_routers: isAlreadySelected ? slaveRouters.length - 1 : slaveRouters.length + 1,
      step: "choose",
    });

    // Update wireless state
    if (selectedRouter) {
      starContext.updateLAN$({
        Wireless: starContext.state.LAN.Wireless || [],
      });
    }

    // Complete the step if at least one slave router is selected
    if (!isAlreadySelected || updatedModels.filter(rm => !rm.isMaster).length > 0) {
      props.onComplete$?.();
    }
  });

  const handleSaveCustomRouter = $((router: RouterData, isCHR: boolean, cpuArch: string) => {
    // Track custom router creation
    track("custom_slave_router_created", {
      router_name: router.model,
      is_chr: isCHR,
      cpu_arch: cpuArch,
      step: "choose",
    });

    // Add the custom router as a slave
    const newRouterModel = {
      isMaster: false,
      Model: router.model as any,
      Interfaces: router.interfaces,
      isCHR,
      cpuArch: cpuArch as CPUArch,
    };

    // Update the context with the new custom router
    const updatedModels = [...starContext.state.Choose.RouterModels, newRouterModel];
    starContext.updateChoose$({
      RouterModels: updatedModels,
    });

    // Close the modal
    isCustomRouterModalOpen.value = false;

    // Complete the step
    props.onComplete$?.();
  });

  // Get routers for active tab
  const activeCategory = routerCategories.find(cat => cat.id === activeTab.value);
  const activeRouters = activeCategory?.routers || [];

  return (
    <div class="w-full p-4">
      <div class="rounded-lg bg-surface p-6 shadow-md transition-all dark:bg-surface-dark">
        <div class="container mx-auto space-y-12">
        {/* Elegant Header */}
        <div class="text-center space-y-8">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-warning-200/40 dark:border-warning-700/40 shadow-lg">
            <LuUsers class="h-5 w-5 text-warning-600 dark:text-warning-400" />
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {$localize`Multi-Router Setup`}
            </span>
          </div>
          
          <div class="space-y-6">
            <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-warning-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {$localize`Choose Slave Routers`}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {$localize`Build a powerful trunk configuration with multiple router nodes`}
            </p>
            
            {/* Master Router Info */}
            {masterRouter && (
              <div class="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-secondary-200/40 dark:border-secondary-700/40 shadow-md">
                <LuLink class="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {$localize`Master Router:`}
                </span>
                <span class="font-bold text-gray-900 dark:text-white">
                  {masterRouter.Model}
                </span>
              </div>
            )}
            
            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              {$localize`You can select multiple slave routers to expand your network capacity`}
            </p>
          </div>
        </div>

        {/* Elegant Tab Navigation */}
        <ClassyTabs
          categories={routerCategories}
          activeCategory={activeTab.value}
          onSelect$={(categoryId) => {
            activeTab.value = categoryId;
          }}
        />

        {/* Elegant Router Cards Grid */}
        <div class="w-full">
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center max-w-full mx-auto">
            {/* Custom Router Card - Always shown first */}
            <div class="w-full">
              <div
                onClick$={() => {
                  isCustomRouterModalOpen.value = true;
                }}
                class="group relative h-full min-h-[320px] cursor-pointer transition-all duration-300 ease-out hover:scale-105"
              >
                <div class="relative h-full rounded-3xl overflow-visible backdrop-blur-xl border-2 border-dashed border-warning-400/50 hover:border-warning-500 bg-gradient-to-br from-warning-50/20 via-primary-50/20 to-warning-100/20 dark:from-warning-900/20 dark:via-primary-900/20 dark:to-warning-800/20 hover:shadow-2xl hover:shadow-warning-500/20 transition-all duration-500">
                  <div class="relative h-full flex flex-col items-center justify-center p-8 space-y-6">
                    <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-warning-400/20 to-primary-400/20 group-hover:from-warning-500/30 group-hover:to-primary-500/30 transition-all duration-300">
                      <LuPlus class="h-12 w-12 text-warning-500 group-hover:text-warning-600 dark:text-warning-400 transition-colors" />
                    </div>
                    <div class="text-center space-y-2">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {$localize`Custom Slave Router`}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                        {$localize`Add a custom slave router with specific interfaces`}
                      </p>
                    </div>
                    <div class="flex flex-wrap gap-2 justify-center">
                      <span class="px-3 py-1 rounded-full bg-warning-500/10 text-warning-700 dark:text-warning-300 text-xs font-medium">
                        {$localize`Flexible`}
                      </span>
                      <span class="px-3 py-1 rounded-full bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs font-medium">
                        {$localize`CHR Support`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Router Cards */}
            {activeRouters.map((router, _index) => {
              const isSelected = slaveModels.includes(router.model as any);
              const isMasterRouter = router.model === masterRouter?.Model;

              return (
                <div key={router.model} class="w-full">
                  <ClassyRouterCard
                    router={router}
                    isSelected={isSelected}
                    badge={isMasterRouter ? $localize`Also Master` : isSelected ? $localize`Slave Router` : undefined}
                    badgeVariant={isMasterRouter ? "info" : isSelected ? "success" : "default"}
                    onSelect$={$((model: string) => {
                      handleSelect(model);
                    })}
                    onViewDetails$={$((router: RouterData) => {
                      selectedRouter.value = router;
                      isModalOpen.value = true;
                    })}
                  />
                </div>
              );
            })}
          </div>
        </div>


        {/* Router Details Modal */}
        <RouterDetailsModal
          router={selectedRouter.value}
          isOpen={isModalOpen}
          onClose$={() => {
            isModalOpen.value = false;
            selectedRouter.value = null;
          }}
        />

        {/* Custom Router Modal */}
        <CustomRouterModal
          isOpen={isCustomRouterModalOpen.value}
          onClose$={() => {
            isCustomRouterModalOpen.value = false;
          }}
          onSave$={handleSaveCustomRouter}
          _existingRouters={allSlaveRouters}
        />
        </div>
      </div>
    </div>
  );
});