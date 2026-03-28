import {
  $,
  component$,
  useContext,
  useSignal,
  type PropFunction,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { getMasterRouters, type RouterData } from "./Constants";
import {
  type RouterInterfaces,
  type CPUArch,
} from "../../StarContext/ChooseType";
import { RouterDetailsModal } from "./RouterDetailsModal";
import { CustomRouterModal } from "./CustomRouterModal";
import { categorizeRouters } from "./RouterCategories";
import { RouterSelectionSection } from "./RouterSelectionSection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface RouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const RouterModel = component$((props: RouterModelProps) => {
  const locale = useMessageLocale();
  const starContext = useContext(StarContext);
  const masterRouters = getMasterRouters();
  const selectedModels = starContext.state.Choose.RouterModels.filter(
    (rm) => rm.isMaster,
  ).map((rm) => rm.Model);

  const customRouters = starContext.state.Choose.RouterModels.filter(
    (rm) =>
      rm.isMaster && !masterRouters.some((router) => router.model === rm.Model),
  ).map((rm) => {
    return {
      model: rm.Model,
      title: rm.Model,
      description: rm.isCHR
        ? semanticMessages.router_custom_chr_title({}, { locale })
        : semanticMessages.router_custom_title({}, { locale }),
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

  const allMasterRouters = [...customRouters, ...masterRouters];
  const routerCategories = categorizeRouters(allMasterRouters);
  const activeTab = useSignal<string>(routerCategories[0].id);
  const isModalOpen = useSignal(false);
  const selectedRouter = useSignal<RouterData | null>(null);
  const isCustomRouterModalOpen = useSignal(false);

  const handleSelect = $(async (model: string) => {
    const selectedRouterData = allMasterRouters.find(
      (router) => router.model === model,
    );
    if (!selectedRouterData) return;

    track("router_model_selected", {
      router_model: model,
      step: "choose",
      is_master: true,
    });

    const interfaces: RouterInterfaces = {
      Interfaces: {
        ethernet: [
          ...(selectedRouterData.interfaces.Interfaces.ethernet || []),
        ],
        wireless: [
          ...(selectedRouterData.interfaces.Interfaces.wireless || []),
        ],
        sfp: [...(selectedRouterData.interfaces.Interfaces.sfp || [])],
        lte: [...(selectedRouterData.interfaces.Interfaces.lte || [])],
      },
      OccupiedInterfaces: [],
    };

    const existingModels = starContext.state.Choose.RouterModels;
    const isAlreadySelected = existingModels.some(
      (rm) => rm.Model === model && rm.isMaster,
    );

    if (isAlreadySelected) {
      window.requestAnimationFrame(() => props.onComplete$?.());
      return;
    }

    const existingCustomRouterModel =
      starContext.state.Choose.RouterModels.find((rm) => rm.Model === model);

    await starContext.updateChoose$({
      RouterModels: [
        {
          isMaster: true,
          Model: model as any,
          Interfaces: interfaces,
          isCHR: existingCustomRouterModel?.isCHR,
          cpuArch: existingCustomRouterModel?.cpuArch,
        },
      ],
    });

    starContext.state.LAN.Wireless = starContext.state.LAN.Wireless || [];
    window.requestAnimationFrame(() => props.onComplete$?.());
  });

  const handleSaveCustomRouter = $(
    async (router: RouterData, isCHR: boolean, cpuArch: string) => {
      track("custom_router_created", {
        router_name: router.model,
        is_chr: isCHR,
        cpu_arch: cpuArch,
        step: "choose",
      });

      const newRouterModel = {
        isMaster: true,
        Model: router.model as any,
        Interfaces: router.interfaces,
        isCHR,
        cpuArch: cpuArch as CPUArch,
      };

      await starContext.updateChoose$({ RouterModels: [newRouterModel] });

      isCustomRouterModalOpen.value = false;
      window.requestAnimationFrame(() => props.onComplete$?.());
    },
  );

  const activeCategory = routerCategories.find(
    (category) => category.id === activeTab.value,
  );
  const activeRouters = activeCategory?.routers || [];

  return (
    <>
      <RouterSelectionSection
        title={semanticMessages.router_model_choose_title({}, { locale })}
        categories={routerCategories}
        activeCategory={activeTab.value}
        selectionStateKey={selectedModels.join("|")}
        onSelectCategory$={$((categoryId: string) => {
          activeTab.value = categoryId;
        })}
        customCardTitle={semanticMessages.router_custom_title({}, { locale })}
        customCardDescription={semanticMessages.router_model_custom_description(
          {},
          { locale },
        )}
        customCardTags={[
          semanticMessages.router_model_tag_flexible({}, { locale }),
          semanticMessages.router_model_tag_chr_support({}, { locale }),
        ]}
        onCustomCardClick$={$(() => {
          isCustomRouterModalOpen.value = true;
        })}
        routerItems={activeRouters.map((router) => ({
          router,
          isSelected: selectedModels.includes(router.model as any),
        }))}
        onSelectRouter$={handleSelect}
        onViewDetails$={$((router: RouterData) => {
          selectedRouter.value = router;
          isModalOpen.value = true;
        })}
      />

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
        _existingRouters={allMasterRouters}
      />
    </>
  );
});
