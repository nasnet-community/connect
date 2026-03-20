import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import { LuDownload, LuSettings } from "@qwikest/icons/lucide";
import { SelectionCard } from "../shared/SelectionCard";
import { SelectionStepSection } from "../shared/SelectionStepSection";

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
    <SelectionStepSection
      title={$localize`OpenWRT Configuration`}
      description={$localize`Choose your current router situation`}
    >
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {options.map((option) => (
          <SelectionCard
            key={option.id}
            value={option.id}
            isSelected={selectedOption.value === option.id}
            icon={option.icon}
            title={option.title}
            description={option.description}
            features={option.features}
            onSelect$={handleOptionSelect}
            bodyClass="p-6"
            headingClass="text-xl"
            featureTextClass="text-sm"
            class="bg-surface/50 dark:bg-surface-dark/50"
          />
        ))}
      </div>
    </SelectionStepSection>
  );
});
