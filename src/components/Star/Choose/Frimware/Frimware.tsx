import {
  component$,
  $,
  useContext,
  type PropFunction,
  type QwikJSX,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";

export type FrimwareType = "MikroTik" | "OpenWRT";

interface FirmwareOption {
  id: number;
  title: FrimwareType;
  description: string;
  icon: QwikJSX.Element;
  features: string[];
  disabled?: boolean;
}

interface FrimwareProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const Frimware = component$((props: FrimwareProps) => {
  const starContext = useContext(StarContext);
  const selectedFirmware = starContext.state.Choose.Firmware;

  const handleSelect = $((firmware: FrimwareType, disabled?: boolean) => {
    if (disabled) return;
    
    // Track firmware selection
    track("firmware_selected", {
      firmware_type: firmware,
      step: "choose"
    });
    
    starContext.updateChoose$({
      Firmware: firmware,
    });
    props.onComplete$?.();
  });

  const firmwareOptions: FirmwareOption[] = [
    {
      id: 1,
      title: "MikroTik",
      description: $localize`Enterprise-grade networking solution with advanced features and robust security.`,
      icon: (
        <svg
          class="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      features: [
        $localize`Advanced Routing`,
        $localize`Enterprise Security`,
        $localize`Traffic Management`,
        $localize`Professional Support`,
      ],
      disabled: false,
    },
    {
      id: 2,
      title: "OpenWRT",
      description: $localize`Open-source firmware platform offering maximum flexibility and customization.`,
      icon: (
        <svg
          class="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      features: [
        $localize`Open Source`,
        $localize`Package Management`,
        $localize`Community Support`,
        $localize`Custom Scripting`,
      ],
      disabled: false,
    },
  ];

  return (
    <div class="space-y-8 px-4">
      <div class="text-center">
        <h2
          class="mb-3 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text 
          text-2xl font-bold text-transparent md:text-3xl"
        >
          {$localize`Choose Your Firmware`}
        </h2>
        <p class="mx-auto max-w-2xl text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select the firmware that best suits your needs`}
        </p>
      </div>

      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {firmwareOptions.map((option) => (
          <div
            key={option.id}
            onClick$={() => handleSelect(option.title, option.disabled)}
            class={`group relative p-8 backdrop-blur-xl
              ${option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              ${
                selectedFirmware === option.title && !option.disabled
                  ? "border-primary-500 bg-primary-500/10"
                  : "border-border/50 bg-white/40 dark:bg-surface-dark/40"
              } rounded-2xl border transition-all duration-300`}
          >
            <div
              class={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 
              to-secondary-500/5 opacity-0 ${!option.disabled && "group-hover:opacity-100"} transition-opacity duration-300`}
            />

            <div class="relative">
              {option.disabled ? (
                <div class="absolute right-4 top-4">
                  <span class="rounded-full bg-warning/10 px-2 py-1 text-sm text-warning dark:text-warning-light">
                    {$localize`Coming Soon`}
                  </span>
                </div>
              ) : (
                selectedFirmware === option.title && (
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
