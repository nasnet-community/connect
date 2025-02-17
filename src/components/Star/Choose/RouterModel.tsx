import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import type { QwikJSX } from "@builder.io/qwik";
import { StarContext } from "../StarContext";
import { LuRouter, LuWifi } from "@qwikest/icons/lucide";

interface RouterModelProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

interface RouterData {
  model: "hAP AX2" | "hAP AX3" | "RB5009";
  icon: QwikJSX.Element;
  title: string;
  description: string;
  specs: {
    [key: string]: string;
  };
  features: string[];
  isWireless: boolean;
}

export const RouterModel = component$((props: RouterModelProps) => {
  const starContext = useContext(StarContext);
  const selectedMode = starContext.state.Choose.RouterMode.Mode;
  const selectedModels = starContext.state.Choose.RouterModel.Model;

  const routers: RouterData[] = [
    {
      model: "hAP AX2",
      icon: <LuWifi class="h-8 w-8" />,
      title: $localize`hAP AX2`,
      description: $localize`Dual-band Wi-Fi 6 home access point`,
      specs: {
        CPU: $localize`Quad-Core 1.8 GHz`,
        RAM: $localize`1 GB`,
        Ports: $localize`5x Gigabit`,
        "Wi-Fi": $localize`Wi-Fi 6 (802.11ax)`,
        Speed: $localize`2.4 GHz: 574 Mbps, 5 GHz: 1201 Mbps`,
      },
      features: [
        $localize`Dual-band Wi-Fi 6`,
        $localize`IPsec hardware acceleration`,
        $localize`MU-MIMO support`,
        $localize`Compact design`,
      ],
      isWireless: true,
    },
    {
      model: "hAP AX3",
      icon: <LuWifi class="h-8 w-8" />,
      title: $localize`hAP AX3`,
      description: $localize`High-performance Wi-Fi 6 router`,
      specs: {
        CPU: $localize`Quad-Core 2.0 GHz`,
        RAM: $localize`1 GB`,
        Ports: $localize`5x Gigabit`,
        "Wi-Fi": $localize`Wi-Fi 6 (802.11ax)`,
        Speed: $localize`2.4 GHz: 600 Mbps, 5 GHz: 1800 Mbps`,
      },
      features: [
        $localize`Advanced Wi-Fi 6`,
        $localize`Enhanced coverage`,
        $localize`Higher throughput`,
        $localize`Better multi-device handling`,
      ],
      isWireless: true,
    },
    {
      model: "RB5009",
      icon: <LuRouter class="h-8 w-8" />,
      title: $localize`RB5009`,
      description: $localize`Enterprise-grade router`,
      specs: {
        CPU: $localize`Quad-Core 2.2 GHz`,
        RAM: $localize`1 GB`,
        Ports: $localize`8x Gigabit + SFP+`,
        "Wi-Fi": $localize`None`,
        Speed: $localize`Up to 10 Gbps (SFP+)`,
      },
      features: [
        $localize`Enterprise performance`,
        $localize`SFP+ port`,
        $localize`Advanced routing`,
        $localize`High reliability`,
      ],
      isWireless: false,
    },
  ];

  const handleSelect = $((model: RouterData["model"]) => {
    const newModels =
      selectedMode === "AP Mode"
        ? [model]
        : selectedModels.includes(model)
          ? selectedModels.filter((m) => m !== model)
          : [...selectedModels, model].slice(0, 2);

    const selectedRouter = routers.find((r) => r.model === model);

    starContext.updateChoose$({
      RouterModel: {
        Model: newModels,
        Interfaces: starContext.state.Choose.RouterModel.Interfaces,
      },
    });

    starContext.updateLAN$({
      Wireless: {
        ...starContext.state.LAN.Wireless,
        isWireless: selectedRouter?.isWireless ?? false,
      },
    });

    if (
      (selectedMode === "AP Mode" && newModels.length === 1) ||
      (selectedMode === "Trunk Mode" && newModels.length === 2)
    ) {
      props.onComplete$?.();
    }
  });

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="mb-8 text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Select Router Model`}
        </h2>
        <p class="mt-3 text-text-secondary/90 dark:text-text-dark-secondary">
          {selectedMode === "AP Mode"
            ? $localize`Choose a router for your network`
            : $localize`Select ${2 - selectedModels.length} more router${2 - selectedModels.length !== 1 ? "s" : ""} for trunk configuration`}
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
                    ? $localize`Router ${selectedModels.indexOf(router.model) + 1}`
                    : $localize`Selected`}
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
                {router.icon}
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
              ? $localize`Selected Router: `
              : $localize`Selected Routers: `}
            <span class="font-medium text-text dark:text-text-dark-default">
              {selectedModels.join(" + ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
});
