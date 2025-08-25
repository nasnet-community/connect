import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { getSlaveRouters, type RouterData } from "./Constants";
import { type RouterInterfaces } from "../../StarContext/ChooseType";
import { RouterCard } from "./RouterCard";
import { RouterDetailsModal } from "./RouterDetailsModal";

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
  
  // Modal state
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);


  const handleSelect = $((model: string) => {
    const selectedRouter = availableSlaveRouters.find((r) => r.model === model);
    if (!selectedRouter) return;

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

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="mb-8 text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Select Slave Router(s)`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-3">
          {$localize`Choose one or more routers for trunk configuration`}
        </p>
        {masterRouter && (
          <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-2 text-sm">
            {$localize`Master Router:`}{" "}
            <span class="font-medium text-text dark:text-text-dark-default">
              {masterRouter.Model}
            </span>
          </p>
        )}
        <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-2 text-xs">
          {$localize`You can select multiple slave routers, including the same model as the master`}
        </p>
      </div>

      {/* Router Cards */}
      <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {availableSlaveRouters.map((router) => {
          const isSelected = slaveModels.includes(router.model as any);
          const isMasterRouter = router.model === masterRouter?.Model;

          return (
            <RouterCard
              key={router.model}
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
          );
        })}
      </div>

      {/* Selection Summary */}
      {(slaveRouters.length > 0 || masterRouter) && (
        <div class="bg-surface-secondary/50 dark:bg-surface-dark-secondary/50 mt-8 rounded-xl p-4">
          <p class="text-text-secondary/90 dark:text-text-dark-secondary text-sm mb-2">
            {$localize`Trunk Configuration:`}
          </p>
          <div class="space-y-1">
            <p class="font-medium text-text dark:text-text-dark-default">
              {$localize`Master:`} {masterRouter?.Model || $localize`Not selected`}
            </p>
            {slaveRouters.length > 0 ? (
              <p class="font-medium text-text dark:text-text-dark-default">
                {$localize`Slave(s):`} {slaveModels.join(", ")}
              </p>
            ) : (
              <p class="text-text-secondary/90 dark:text-text-dark-secondary text-sm italic">
                {$localize`No slave routers selected yet`}
              </p>
            )}
          </div>
          {slaveRouters.length === 0 && (
            <p class="text-warning/90 dark:text-warning-light/90 mt-2 text-xs">
              {$localize`Please select at least one slave router to continue`}
            </p>
          )}
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