import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { LuRouter, LuWifi } from "@qwikest/icons/lucide";
import { routers, type RouterData } from "./Constants";
import { type RouterInterfaces } from "../../StarContext/ChooseType";

interface RouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const RouterModel = component$((props: RouterModelProps) => {
  const starContext = useContext(StarContext);
  const selectedMode = starContext.state.Choose.RouterMode;
  const selectedModels = starContext.state.Choose.RouterModels.map(rm => rm.Model);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <LuWifi class="h-8 w-8" />;
      case "router":
        return <LuRouter class="h-8 w-8" />;
      default:
        return <LuRouter class="h-8 w-8" />;
    }
  };

  const handleSelect = $((model: RouterData["model"]) => {
    const selectedRouter = routers.find((r) => r.model === model);
    if (!selectedRouter) return;

    // Track router model selection
    track("router_model_selected", {
      router_model: model,
      router_mode: selectedMode,
      step: "choose",
      is_addition: selectedMode === "Trunk Mode" && !selectedModels.includes(model)
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

    if (selectedMode === "AP Mode") {
      starContext.updateChoose$({
        RouterModels: [{
          isMaster: true,
          Model: model,
          Interfaces: interfaces
        }]
      });
    } else if (selectedMode === "Trunk Mode") {
      const existingModels = starContext.state.Choose.RouterModels;
      
      if (existingModels.some(rm => rm.Model === model)) {
        starContext.updateChoose$({
          RouterModels: existingModels.filter(rm => rm.Model !== model)
        });
      } else if (existingModels.length < 2) {
        const newModelConfig = {
          isMaster: existingModels.length === 0, 
          Model: model,
          Interfaces: interfaces
        };
        
        starContext.updateChoose$({
          RouterModels: [...existingModels, newModelConfig]
        });
      }
    }

    if (selectedRouter) {
      starContext.updateLAN$({
        Wireless: {
          ...starContext.state.LAN.Wireless,
        }
      });
    }

    if (
      (selectedMode === "AP Mode" && starContext.state.Choose.RouterModels.length === 1) ||
      (selectedMode === "Trunk Mode" && starContext.state.Choose.RouterModels.length === 2)
    ) {
      props.onComplete$?.();
    }
  });

  const getSelectionIndex = (model: string) => {
    return starContext.state.Choose.RouterModels.findIndex(rm => rm.Model === model);
  };

  const pluralize = (num: number, singular: string, plural: string) => {
    return num === 1 ? singular : plural;
  };

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="mb-8 text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          Select Router Model
        </h2>
        <p class="mt-3 text-text-secondary/90 dark:text-text-dark-secondary">
          {selectedMode === "AP Mode"
            ? "Choose a router for your network"
            : `Select ${2 - selectedModels.length} more ${pluralize(2 - selectedModels.length, "router", "routers")} for trunk configuration`}
        </p>
      </div>

      {/* Router Cards */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routers.map((router) => (
          <div
            key={router.model}
            onClick$={() => handleSelect(router.model)}
            class={`group relative cursor-pointer rounded-2xl transition-all duration-300
              ${
                selectedModels.includes(router.model)
                  ? "ring-primary-500 bg-primary-500/5 ring-2 dark:bg-primary-500/10"
                  : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/50"
              }
              ${
                selectedMode === "Trunk Mode" &&
                selectedModels.length === 2 &&
                !selectedModels.includes(router.model)
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            `}
          >
            {/* Selection Badge */}
            {selectedModels.includes(router.model) && (
              <div class="absolute right-4 top-4 rounded-full bg-success/10 px-3 py-1 dark:bg-success/20">
                <span class="text-xs font-medium text-success dark:text-success-light">
                  {selectedMode === "Trunk Mode"
                    ? `Router ${getSelectionIndex(router.model) + 1}`
                    : "Selected"}
                </span>
              </div>
            )}

            <div class="space-y-6 p-6">
              {/* Icon */}
              <div
                class={`flex h-16 w-16 items-center justify-center rounded-xl
                transition-all duration-300 group-hover:scale-110
                ${
                  selectedModels.includes(router.model)
                    ? "bg-primary-500 text-white"
                    : "bg-primary-500/10 text-primary-500 dark:bg-primary-500/5"
                }`}
              >
                {getIcon(router.icon)}
              </div>

              {/* Content */}
              <div class="space-y-4">
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                    {router.title}
                  </h3>
                  <p class="text-text-secondary/90 dark:text-text-dark-secondary">
                    {router.description}
                  </p>
                </div>

                {/* Specs */}
                <div class="space-y-2">
                  {Object.entries(router.specs).map(([key, value]) => (
                    <div
                      key={key}
                      class="flex items-center justify-between text-sm"
                    >
                      <span class="text-text-secondary/90 dark:text-text-dark-secondary">
                        {key}:
                      </span>
                      <span class="font-medium text-text dark:text-text-dark-default">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div class="space-y-2 border-t border-border/20 pt-4 dark:border-border-dark/20">
                  {router.features.map((feature) => (
                    <div key={feature} class="flex items-center text-sm">
                      <svg
                        class="mr-3 h-5 w-5 text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span class="text-text-secondary/90 dark:text-text-dark-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedModels.length > 0 && (
        <div class="mt-8 rounded-xl bg-surface-secondary/50 p-4 dark:bg-surface-dark-secondary/50">
          <p class="text-sm text-text-secondary/90 dark:text-text-dark-secondary">
            {selectedMode === "AP Mode"
              ? "Selected Router: "
              : "Selected Routers: "}
            <span class="font-medium text-text dark:text-text-dark-default">
              {selectedModels.join(" + ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
});
