import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { getMasterRouters, type RouterData } from "./Constants";
import { type RouterInterfaces } from "../../StarContext/ChooseType";
import { RouterCard } from "./RouterCard";
import { RouterDetailsModal } from "./RouterDetailsModal";

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

  return (
    <div class="space-y-8">
      {/* Enhanced Header with gradient animation */}
      <div class="mb-8 text-center relative">
        {/* Background decoration */}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-96 h-96 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        
        <div class="relative">
          <h2 class="bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl animate-gradient bg-300%">
            {$localize`Select Router Model`}
          </h2>
          <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-3 text-lg">
            {selectedModels.length === 0
              ? $localize`Choose your router model to get started`
              : $localize`✓ Router selected. Continue to next step`}
          </p>
        </div>
      </div>

      {/* Router Cards Grid with staggered animation */}
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr">
        {masterRouters.map((router, index) => {
          const isSelected = selectedModels.includes(router.model as any);

          return (
            <div
              key={router.model}
              class="opacity-0 animate-fade-in-up"
              style={`animation-delay: ${index * 50}ms; animation-fill-mode: forwards;`}
            >
              <RouterCard
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

      {/* Enhanced Selection Summary */}
      {selectedModels.length > 0 && (
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-primary-500/10 backdrop-blur-sm border border-primary-500/20 p-6 animate-fade-in">
          {/* Animated background pattern */}
          <div class="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div class="relative flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-success/20 animate-pulse">
                <svg class="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="text-text-secondary/90 dark:text-text-dark-secondary text-sm font-medium">
                  {$localize`Selected Router Model`}
                </p>
                <p class="text-text dark:text-text-dark-default text-lg font-bold">
                  {selectedModels[0]}
                </p>
              </div>
            </div>
            
            <div class="text-right">
              <p class="text-xs text-text-secondary/70 dark:text-text-dark-secondary/70">
                {$localize`Ready to continue`}
              </p>
              <div class="flex items-center gap-1 mt-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    class="w-2 h-2 rounded-full bg-success animate-pulse"
                    style={`animation-delay: ${i * 200}ms`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
  );
});