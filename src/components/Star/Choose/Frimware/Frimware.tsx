import {
  component$,
  $,
  useContext,
  type PropFunction,
  type QwikJSX,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import { SelectionCard } from "../shared/SelectionCard";

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
      step: "choose",
    });

    starContext.updateChoose$({
      Firmware: firmware,
    });

    if (props.onComplete$) {
      props.onComplete$();
    }
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
      disabled: true,
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
        <p class="text-text-secondary dark:text-text-dark-secondary mx-auto max-w-2xl">
          {$localize`Select the firmware that best suits your needs`}
        </p>
      </div>

      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {firmwareOptions.map((option) => (
          <SelectionCard
            key={option.id}
            value={option.title}
            isSelected={selectedFirmware === option.title && !option.disabled}
            icon={option.icon}
            title={option.title}
            description={option.description}
            features={option.features}
            onSelect$={handleSelect}
            disabled={option.disabled}
          />
        ))}
      </div>
    </div>
  );
});
