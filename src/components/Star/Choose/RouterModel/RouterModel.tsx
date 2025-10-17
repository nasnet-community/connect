import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuPlus } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { getMasterRouters, type RouterData } from "./Constants";
import { type RouterInterfaces, type CPUArch } from "../../StarContext/ChooseType";
import { ClassyRouterCard } from "./ClassyRouterCard";
import { ClassyTabs } from "./ClassyTabs";
import { RouterDetailsModal } from "./RouterDetailsModal";
import { CustomRouterModal } from "./CustomRouterModal";
import { categorizeRouters } from "./RouterCategories";

interface RouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const RouterModel = component$((props: RouterModelProps) => {
  const starContext = useContext(StarContext);
  const selectedModels = starContext.state.Choose.RouterModels.map(
    (rm) => rm.Model,
  );
  const masterRouters = getMasterRouters();
  
  // Get custom routers from context
  const customRouters = starContext.state.Choose.RouterModels
    .filter((rm) => rm.isMaster && !masterRouters.some((r) => r.model === rm.Model))
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
  const allMasterRouters = [...customRouters, ...masterRouters];
  
  // Categorize routers by family
  const routerCategories = categorizeRouters(allMasterRouters);
  
  // Tab state
  const activeTab = useSignal<string>(routerCategories[0]?.id || "hAP");
  
  // Modal state
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);
  
  // Custom router modal state
  const isCustomRouterModalOpen = useSignal(false);

  const handleSelect = $((model: string) => {
    const selectedRouter = allMasterRouters.find((r) => r.model === model);
    if (!selectedRouter) return;

    // Track router model selection
    track("router_model_selected", {
      router_model: model,
      step: "choose",
      is_master: true,
    });

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

    // Check if this router is already selected
    const existingModels = starContext.state.Choose.RouterModels;
    const isAlreadySelected = existingModels.some((rm) => rm.Model === model && rm.isMaster);

    if (isAlreadySelected) {
      // If already selected, just complete the step (don't deselect)
      props.onComplete$?.();
      return;
    }

    // Check if this is a custom router
    const existingCustomRouterModel = starContext.state.Choose.RouterModels.find(
      (rm) => rm.Model === model
    );

    // Select as the master router (only one allowed at this step)
    starContext.updateChoose$({
      RouterModels: [
        {
          isMaster: true,
          Model: model as any, // Cast to RouterModel type
          Interfaces: interfaces,
          isCHR: existingCustomRouterModel?.isCHR,
          cpuArch: existingCustomRouterModel?.cpuArch,
        },
      ],
    });

    // Update wireless state
    if (selectedRouter) {
      starContext.updateLAN$({
        Wireless: starContext.state.LAN.Wireless || [],
      });
    }

    // Complete the step
    props.onComplete$?.();
  });

  const handleSaveCustomRouter = $((router: RouterData, isCHR: boolean, cpuArch: string) => {
    // Track custom router creation
    track("custom_router_created", {
      router_name: router.model,
      is_chr: isCHR,
      cpu_arch: cpuArch,
      step: "choose",
    });

    // Add the custom router to the context
    const newRouterModel = {
      isMaster: true,
      Model: router.model as any,
      Interfaces: router.interfaces,
      isCHR,
      cpuArch: cpuArch as CPUArch,
    };

    // Update the context with the new custom router selected
    starContext.updateChoose$({
      RouterModels: [newRouterModel],
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
          <div class="space-y-6">
            <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent">
              {$localize`Choose Your Router`}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {selectedModels.length === 0
                ? $localize`Discover the perfect MikroTik router for your network needs`
                : $localize`✓ Router selected successfully. Ready to continue to the next step.`}
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
                <div class="relative h-full rounded-3xl overflow-visible backdrop-blur-xl border-2 border-dashed border-primary-400/50 hover:border-primary-500 bg-gradient-to-br from-primary-50/20 via-secondary-50/20 to-primary-100/20 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-primary-800/20 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500">
                  <div class="relative h-full flex flex-col items-center justify-center p-8 space-y-6">
                    <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-400/20 to-secondary-400/20 group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-300">
                      <LuPlus class="h-12 w-12 text-primary-500 group-hover:text-primary-600 dark:text-primary-400 transition-colors" />
                    </div>
                    <div class="text-center space-y-2">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {$localize`Custom Router`}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                        {$localize`Configure your own router with custom interfaces and specifications`}
                      </p>
                    </div>
                    <div class="flex flex-wrap gap-2 justify-center">
                      <span class="px-3 py-1 rounded-full bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs font-medium">
                        {$localize`Flexible`}
                      </span>
                      <span class="px-3 py-1 rounded-full bg-secondary-500/10 text-secondary-700 dark:text-secondary-300 text-xs font-medium">
                        {$localize`CHR Support`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Router Cards */}
            {activeRouters.map((router, _index) => {
              const isSelected = selectedModels.includes(router.model as any);

              return (
                <div key={router.model} class="w-full">
                  <ClassyRouterCard
                    router={router}
                    isSelected={isSelected}
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
          _existingRouters={allMasterRouters}
        />
        </div>
      </div>
    </div>
  );
});