import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import type { QwikJSX } from "@builder.io/qwik";
import { LuNetwork, LuLink } from "@qwikest/icons/lucide";
import { StarContext } from "../StarContext";

export type RouterModeType = "AP Mode" | "Trunk Mode";

interface RouterModeProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

interface ModeOption {
  mode: RouterModeType;
  icon: QwikJSX.Element;
  title: string;
  description: string;
  features: string[];
  disabled?: boolean;
}

export const RouterMode = component$((props: RouterModeProps) => {
  const starContext = useContext(StarContext);
  const selectedMode = starContext.state.Choose.RouterMode.Mode;

  const handleModeSelect = $((mode: RouterModeType, disabled?: boolean) => {
    if (disabled) return;
    starContext.updateChoose$({
      RouterMode: { Mode: mode },
    });
    props.onComplete$?.();
  });

  const modeOptions: ModeOption[] = [
    {
      mode: "AP Mode",
      icon: <LuNetwork class="h-8 w-8" />,
      title: $localize`Access Point Mode`,
      description: $localize`Extend your network coverage seamlessly`,
      features: [
        $localize`Wireless network extension`,
        $localize`Seamless roaming`,
        $localize`Easy setup`,
        $localize`Perfect for home use`,
      ],
      disabled: false,
    },
    {
      mode: "Trunk Mode",
      icon: <LuLink class="h-8 w-8" />,
      title: $localize`Trunk Mode`,
      description: $localize`Advanced network configuration`,
      features: [
        $localize`VLAN support`,
        $localize`Link aggregation`,
        $localize`Advanced QoS`,
        $localize`Enterprise-grade features`,
      ],
      disabled: true,
    },
  ];

  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Select Router Mode`}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-text-secondary/90 dark:text-text-dark-secondary/95">
          {$localize`Choose how you want your router to operate in your network`}
        </p>
      </div>

      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {modeOptions.map((option) => (
          <div
            key={option.mode}
            onClick$={() => handleModeSelect(option.mode, option.disabled)}
            class={`group relative overflow-hidden rounded-2xl transition-all duration-300
              ${option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              ${
                selectedMode === option.mode && !option.disabled
                  ? "ring-primary-500 bg-primary-500/10 ring-2 dark:bg-primary-500/15"
                  : "bg-surface/50 hover:bg-surface-secondary/50 dark:bg-surface-dark/50 dark:hover:bg-surface-dark-secondary/60"
              }
            `}
          >
            {option.disabled ? (
              <div class="absolute right-4 top-4 rounded-full bg-warning/10 px-3 py-1 text-warning dark:text-warning-light">
                <span class="text-xs font-medium">{$localize`Coming Soon`}</span>
              </div>
            ) : (
              selectedMode === option.mode && (
                <div class="absolute right-4 top-4 rounded-full bg-success/15 px-3 py-1 dark:bg-success/25">
                  <span class="text-xs font-medium text-success dark:text-success-light">
                    {$localize`Selected`}
                  </span>
                </div>
              )
            )}

            <div class="space-y-6 p-6">
              <div
                class={`flex h-16 w-16 items-center justify-center rounded-xl
                transition-all duration-300 ${!option.disabled && "group-hover:scale-110"}
                ${
                  selectedMode === option.mode && !option.disabled
                    ? "bg-primary-500 text-white"
                    : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
                }`}
              >
                {option.icon}
              </div>

              <div class="space-y-4">
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                    {option.title}
                  </h3>
                  <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                    {option.description}
                  </p>
                </div>

                <div class="space-y-3">
                  {option.features.map((feature) => (
                    <div
                      key={feature}
                      class="flex items-center text-text-secondary/90 dark:text-text-dark-secondary/95"
                    >
                      <svg
                        class="mr-3 h-5 w-5 text-primary-500 dark:text-primary-400"
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
                      <span class="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!option.disabled && (
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-500/10 
                to-secondary-500/10 opacity-0 transition-opacity 
                group-hover:opacity-100 dark:from-primary-500/15 dark:to-secondary-500/15"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
