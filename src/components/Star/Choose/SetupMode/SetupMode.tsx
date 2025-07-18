import { component$, useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { Mode } from "~/components/Star/StarContext/ChooseType";
import type { StepProps } from "~/types/step";
import type { QwikJSX } from "@builder.io/qwik";

interface ModeOption {
  id: number;
  title: string;
  mode: Mode;
  icon: QwikJSX.Element;
  description: string;
  features: string[];
  disabled?: boolean;
}

export const SetupMode = component$((props: StepProps) => {
  const starContext = useContext(StarContext);
  const selectedMode = starContext.state.Choose.Mode;

  const handleSelectMode = $((mode: Mode, disabled?: boolean) => {
    if (disabled) return;
    starContext.updateChoose$({ Mode: mode });
    props.onComplete$?.();
  });

  const modeOptions: ModeOption[] = [
    {
      id: 1,
      title: $localize`Easy Mode`,
      mode: "easy",
      icon: (
        <svg 
          class="h-8 w-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={1.5} 
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      description: $localize`Simplified setup with basic options. Perfect for beginners and standard home network configurations.`,
      features: [
        $localize`Quick setup process`,
        $localize`Basic network configuration`,
        $localize`Automated security settings`,
        $localize`Simple interface management`,
        $localize`Guided step-by-step setup`
      ],
      disabled: false,
    },
    {
      id: 2,
      title: $localize`Advanced Mode`,
      mode: "advance",
      icon: (
        <svg 
          class="h-8 w-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={1.5} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      ),
      description: $localize`Full access to all router features and configurations. Ideal for network professionals and complex setups.`,
      features: [
        $localize`Complete control over all settings`,
        $localize`Advanced networking options`,
        $localize`Custom firewall configurations`,
        $localize`Detailed interface management`,
        $localize`Advanced QoS and routing options`
      ],
      disabled: false,
    }
  ];

  return (
    <div class="space-y-8 px-4">
      <div class="text-center">
        <h2 class="mb-3 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text 
                   text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Choose Your Setup Mode`}
        </h2>
        <p class="mx-auto max-w-2xl text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select the setup mode that best fits your needs and experience level`}
        </p>
      </div>

      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {modeOptions.map((option) => (
          <div
            key={option.id}
            onClick$={() => handleSelectMode(option.mode, option.disabled)}
            class={`group relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl transition-all duration-300
              ${option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              ${
                selectedMode === option.mode && !option.disabled
                  ? "border-primary-500 bg-primary-500/10 ring-2 ring-primary-500"
                  : "border-border/50 bg-white/40 hover:bg-primary-500/5 dark:bg-surface-dark/40"
              } border`}
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary-500/5 
                    to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div class="relative">
              {option.disabled ? (
                <div class="absolute right-4 top-4">
                  <span class="rounded-full bg-warning/10 px-2 py-1 text-sm text-warning dark:text-warning-light">
                    {$localize`Coming Soon`}
                  </span>
                </div>
              ) : (
                selectedMode === option.mode && (
                  <div class="absolute right-4 top-4">
                    <span class="rounded-full bg-success/10 px-2 py-1 text-sm text-success">
                      {$localize`Selected`}
                    </span>
                  </div>
                )
              )}

              <div
                class={`mb-6 w-fit rounded-xl bg-primary-500/10 p-4 dark:bg-primary-500/5 
                       ${!option.disabled && "group-hover:scale-110"} transition-transform duration-300`}
              >
                <div class="text-primary-500 dark:text-primary-400">
                  {option.icon}
                </div>
              </div>

              <h3
                class={`mb-3 text-2xl font-semibold text-text dark:text-text-dark-default 
                      ${!option.disabled && "group-hover:text-primary-500 dark:group-hover:text-primary-400"} 
                      transition-colors duration-300`}
              >
                {option.title}
              </h3>
              <p class="mb-6 text-text-secondary dark:text-text-dark-secondary">
                {option.description}
              </p>

              <div class="space-y-3">
                {option.features.map((feature) => (
                  <div
                    key={feature}
                    class="flex items-center text-text-secondary dark:text-text-dark-secondary"
                  >
                    <svg
                      class="mr-3 h-5 w-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
