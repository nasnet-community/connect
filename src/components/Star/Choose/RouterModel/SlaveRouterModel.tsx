import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuUsers, LuLink } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { getSlaveRouters, type RouterData } from "./Constants";
import { type RouterInterfaces } from "../../StarContext/ChooseType";
import { ClassyRouterCard } from "./ClassyRouterCard";
import { ClassyTabs } from "./ClassyTabs";
import { RouterDetailsModal } from "./RouterDetailsModal";
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
  
  // Categorize routers by family
  const routerCategories = categorizeRouters(availableSlaveRouters);
  
  // Tab state
  const activeTab = useSignal<string>(routerCategories[0]?.id || "hAP");
  
  // Modal state
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);

  const handleSelect = $((model: string) => {
    const selectedRouter = availableSlaveRouters.find((r) => r.model === model);
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
        Wireless: {
          ...starContext.state.LAN.Wireless,
        },
      });
    }

    // Complete the step if at least one slave router is selected
    if (!isAlreadySelected || updatedModels.filter(rm => !rm.isMaster).length > 0) {
      props.onComplete$?.();
    }
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
        </div>
      </div>
    </div>
  );
});