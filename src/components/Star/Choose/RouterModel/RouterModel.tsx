import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
// Removed unused icon imports
import { StarContext } from "../../StarContext/StarContext";
import { getMasterRouters, type RouterData } from "./Constants";
import { type RouterInterfaces } from "../../StarContext/ChooseType";
import { ClassyRouterCard } from "./ClassyRouterCard";
import { ClassyTabs } from "./ClassyTabs";
import { RouterDetailsModal } from "./RouterDetailsModal";
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
  
  // Categorize routers by family
  const routerCategories = categorizeRouters(masterRouters);
  
  // Tab state
  const activeTab = useSignal<string>(routerCategories[0]?.id || "hAP");
  
  // Modal state
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);

  const handleSelect = $((model: string) => {
    const selectedRouter = masterRouters.find((r) => r.model === model);
    if (!selectedRouter) return;

    // Track router model selection
    track("router_model_selected", {
      router_model: model,
      step: "choose",
      is_master: true,
    });

    const interfaces: RouterInterfaces = {};

    if (selectedRouter.interfaces.ethernet?.length) {
      interfaces.ethernet = selectedRouter.interfaces.ethernet;
    }

    if (selectedRouter.interfaces.wireless?.length) {
      interfaces.wireless = selectedRouter.interfaces.wireless;
    }

    if (selectedRouter.interfaces.sfp?.length) {
      interfaces.sfp = selectedRouter.interfaces.sfp;
    }

    if (selectedRouter.interfaces.lte?.length) {
      interfaces.lte = selectedRouter.interfaces.lte;
    }

    // Check if this router is already selected
    const existingModels = starContext.state.Choose.RouterModels;
    const isAlreadySelected = existingModels.some((rm) => rm.Model === model && rm.isMaster);

    if (isAlreadySelected) {
      // If already selected, just complete the step (don't deselect)
      props.onComplete$?.();
      return;
    }

    // Select as the master router (only one allowed at this step)
    starContext.updateChoose$({
      RouterModels: [
        {
          isMaster: true,
          Model: model as any, // Cast to RouterModel type
          Interfaces: interfaces,
        },
      ],
    });

    // Update wireless state
    if (selectedRouter) {
      starContext.updateLAN$({
        Wireless: {
          ...starContext.state.LAN.Wireless,
        },
      });
    }

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
        <div class="w-full px-4 sm:px-6 lg:px-8">
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center max-w-full mx-auto">
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
        </div>
      </div>
    </div>
  );
});