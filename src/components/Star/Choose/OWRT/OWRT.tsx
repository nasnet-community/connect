import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import { LuDownload, LuSettings } from "@qwikest/icons/lucide";

type OpenWRTOption = "stock" | "already-installed";

interface OpenWRTOptionData {
  id: OpenWRTOption;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

interface OWRTFISProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
  onOptionSelect$?: PropFunction<(option: OpenWRTOption) => void>;
}

export const OWRT = component$((props: OWRTFISProps) => {
  const selectedOption = useSignal<OpenWRTOption | undefined>(undefined);

  const handleOptionSelect = $((option: OpenWRTOption) => {
    selectedOption.value = option;
    props.onOptionSelect$?.(option);
    props.onComplete$?.();
  });

  const options: OpenWRTOptionData[] = [
    {
      id: "stock",
      title: $localize`I have a router with the original (stock) firmware`,
      description: $localize`Install OpenWrt on your router with stock firmware`,
      icon: <LuDownload class="h-8 w-8" />,
      features: [
        $localize`Firmware installation guide`,
        $localize`Backup original firmware`,
        $localize`Step-by-step installation`,
        $localize`Recovery instructions`,
      ],
    },
    {
      id: "already-installed",
      title: $localize`I already have OpenWrt`,
      description: $localize`Configure your existing OpenWrt installation`,
      icon: <LuSettings class="h-8 w-8" />,
      features: [
        $localize`Configuration guide`,
        $localize`Network setup`,
        $localize`Package management`,
        $localize`Advanced settings`,
      ],
    },
  ];

  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`OpenWRT Configuration`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-3 max-w-2xl">
          {$localize`Choose your current router situation`}
        </p>
      </div>

      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.id}
            onClick$={() => handleOptionSelect(option.id)}
            class={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300
              ${
                selectedOption.value === option.id
                  ? "bg-primary-500/10 ring-2 ring-primary-500 dark:bg-primary-500/15"
                  : "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/60 bg-surface/50 dark:bg-surface-dark/50"
              }
            `}
          >
            {/* Selected indicator badge */}
            {selectedOption.value === option.id && (
              <div class="absolute right-4 top-4 z-10 rounded-full bg-success/15 px-3 py-1 dark:bg-success/25">
                <span class="text-xs font-medium text-success dark:text-success-light">
                  {$localize`Selected`}
                </span>
              </div>
            )}

            <div class="space-y-6 p-6">
              {/* Option icon container */}
              <div
                class={`flex h-16 w-16 items-center justify-center rounded-xl
                transition-all duration-300 group-hover:scale-110
                ${
                  selectedOption.value === option.id
                    ? "bg-primary-500 text-white"
                    : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
                }`}
              >
                {option.icon}
              </div>

              <div class="space-y-4">
                {/* Option title and description */}
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                    {option.title}
                  </h3>
                  <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                    {option.description}
                  </p>
                </div>

                {/* Option features list */}
                <div class="space-y-3">
                  {option.features.map((feature) => (
                    <div
                      key={feature}
                      class="text-text-secondary/90 dark:text-text-dark-secondary/95 flex items-center"
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

            {/* Hover effect gradient overlay */}
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary-500/10 
              to-secondary-500/10 opacity-0 transition-opacity duration-500
              group-hover:opacity-100 dark:from-primary-500/15 dark:to-secondary-500/15"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
