import { $, component$, useContext, useSignal, useTask$, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { getSlaveRouters, type RouterData } from "./Constants";
import { type RouterInterfaces, type CPUArch } from "../../StarContext/ChooseType";
import { RouterDetailsModal } from "./RouterDetailsModal";
import { CustomRouterModal } from "./CustomRouterModal";
import { categorizeRouters } from "./RouterCategories";
import { RouterSelectionSection } from "./RouterSelectionSection";

interface SlaveRouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const SlaveRouterModel = component$((props: SlaveRouterModelProps) => {
  const starContext = useContext(StarContext);
  const masterRouter = starContext.state.Choose.RouterModels.find((rm) => rm.isMaster);
  const slaveRouters = starContext.state.Choose.RouterModels.filter((rm) => !rm.isMaster);
  const slaveModels = useSignal<string[]>([]);
  const availableSlaveRouters = getSlaveRouters();

  useTask$(({ track }) => {
    track(() =>
      starContext.state.Choose.RouterModels
        .map((routerModel) => `${routerModel.Model}:${routerModel.isMaster}`)
        .join("|"),
    );

    slaveModels.value = starContext.state.Choose.RouterModels
      .filter((rm) => !rm.isMaster)
      .map((rm) => rm.Model);
  });

  const customRouters = starContext.state.Choose.RouterModels
    .filter((rm) => !availableSlaveRouters.some((router) => router.model === rm.Model))
    .map((rm) => {
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

  const allSlaveRouters = [...customRouters, ...availableSlaveRouters];
  const routerCategories = categorizeRouters(allSlaveRouters);
  const activeTab = useSignal<string>(routerCategories[0]?.id || "hAP");
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);
  const isCustomRouterModalOpen = useSignal(false);

  const handleSelect = $((model: string) => {
    const selectedRouterData = allSlaveRouters.find((router) => router.model === model);
    if (!selectedRouterData) return;

    const interfaces: RouterInterfaces = {
      Interfaces: {
        ethernet: [...(selectedRouterData.interfaces.Interfaces.ethernet || [])],
        wireless: [...(selectedRouterData.interfaces.Interfaces.wireless || [])],
        sfp: [...(selectedRouterData.interfaces.Interfaces.sfp || [])],
        lte: [...(selectedRouterData.interfaces.Interfaces.lte || [])],
      },
      OccupiedInterfaces: [],
    };

    const isAlreadySelected = slaveRouters.some((rm) => rm.Model === model);
    const existingCustomRouterModel = starContext.state.Choose.RouterModels.find(
      (rm) => rm.Model === model,
    );

    let updatedModels = [...starContext.state.Choose.RouterModels];

    if (isAlreadySelected) {
      slaveModels.value = slaveModels.value.filter((existingModel) => existingModel !== model);
      updatedModels = updatedModels.filter((rm) => !(rm.Model === model && !rm.isMaster));
    } else {
      slaveModels.value = [...slaveModels.value, model];
      updatedModels.push({
        isMaster: false,
        Model: model as any,
        Interfaces: interfaces,
        isCHR: existingCustomRouterModel?.isCHR,
        cpuArch: existingCustomRouterModel?.cpuArch,
      });
    }

    starContext.state.Choose.RouterModels = updatedModels;
    if (!isAlreadySelected) {
      props.onComplete$?.();
    }

    track("slave_router_model_selected", {
      master_router: masterRouter?.Model || "",
      slave_router: model,
      action: isAlreadySelected ? "removed" : "added",
      total_slave_routers: isAlreadySelected ? slaveRouters.length - 1 : slaveRouters.length + 1,
      step: "choose",
    });

    starContext.state.LAN.Wireless = starContext.state.LAN.Wireless || [];
  });

  const handleSaveCustomRouter = $((router: RouterData, isCHR: boolean, cpuArch: string) => {
    track("custom_slave_router_created", {
      router_name: router.model,
      is_chr: isCHR,
      cpu_arch: cpuArch,
      step: "choose",
    });

    const newRouterModel = {
      isMaster: false,
      Model: router.model as any,
      Interfaces: router.interfaces,
      isCHR,
      cpuArch: cpuArch as CPUArch,
    };

    const updatedModels = [...starContext.state.Choose.RouterModels, newRouterModel];
    slaveModels.value = [...slaveModels.value, router.model];
    starContext.state.Choose.RouterModels = updatedModels;

    isCustomRouterModalOpen.value = false;
    props.onComplete$?.();
  });

  const activeCategory = routerCategories.find((category) => category.id === activeTab.value);
  const activeRouters = activeCategory?.routers || [];

  return (
    <>
      <RouterSelectionSection
        title={$localize`Choose Slave Routers`}
        categories={routerCategories}
        activeCategory={activeTab.value}
        onSelectCategory$={$((categoryId: string) => {
          activeTab.value = categoryId;
        })}
        customCardTitle={$localize`Custom Slave Router`}
        customCardDescription={$localize`Add a custom slave router with specific interfaces`}
        customCardTags={[$localize`Flexible`, $localize`CHR Support`]}
        onCustomCardClick$={$(() => {
          isCustomRouterModalOpen.value = true;
        })}
        routerItems={activeRouters.map((router) => ({
          router,
          isSelected: slaveModels.value.includes(router.model as any),
          badge: router.model === masterRouter?.Model ? $localize`Also Master` : undefined,
          badgeVariant: router.model === masterRouter?.Model ? "info" as const : undefined,
          toggleOnSelect: true,
        }))}
        onSelectRouter$={handleSelect}
        onViewDetails$={$((router: RouterData) => {
          selectedRouter.value = router;
          isModalOpen.value = true;
        })}
      >
        <div q:slot="header-content" class="mx-auto mt-4 max-w-xl space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
          {masterRouter && (
            <p>
              {$localize`Master Router:`}{" "}
              <span class="font-semibold text-text dark:text-text-dark-default">{masterRouter.Model}</span>
            </p>
          )}
          <p>{$localize`You can select multiple slave routers to expand your network capacity`}</p>
        </div>
      </RouterSelectionSection>

      <RouterDetailsModal
        router={selectedRouter.value}
        isOpen={isModalOpen}
        onClose$={() => {
          isModalOpen.value = false;
          selectedRouter.value = null;
        }}
      />

      <CustomRouterModal
        isOpen={isCustomRouterModalOpen.value}
        onClose$={() => {
          isCustomRouterModalOpen.value = false;
        }}
        onSave$={handleSaveCustomRouter}
        _existingRouters={allSlaveRouters}
      />
    </>
  );
});
