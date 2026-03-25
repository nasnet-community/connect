import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import type { QwikJSX } from "@builder.io/qwik";
import { LuNetwork, LuLink } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { SelectionCard } from "../shared/SelectionCard";
import { SelectionStepSection } from "../shared/SelectionStepSection";

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
  const selectedMode = starContext.state.Choose.RouterMode;
  const selectedRouters = starContext.state.Choose.RouterModels;

  const handleModeSelect = $((mode: RouterModeType, disabled?: boolean) => {
    if (disabled) return;

    // Update the selection
    starContext.updateChoose$({
      RouterMode: mode,
    });

    // Trigger completion immediately
    props.onComplete$?.();
  });

  const modeOptions: ModeOption[] = [
    {
      mode: "AP Mode",
      icon: <LuNetwork class="h-8 w-8" />,
      title: $localize`Single Router Mode`,
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
      title: $localize`Router + Access Point Mode`,
      description: $localize`Advanced network configuration`,
      features: [
        $localize`VLAN support`,
        $localize`Link aggregation`,
        $localize`Advanced QoS`,
        $localize`Enterprise-grade features`,
      ],
      disabled: false,
    },
  ];

  return (
    <SelectionStepSection
      title={$localize`Select Router Mode`}
      description={$localize`Choose how you want your router to operate in your network`}
    >
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {modeOptions.map((option) => (
          <SelectionCard
            key={option.mode}
            value={option.mode}
            isSelected={selectedMode === option.mode && !option.disabled}
            icon={option.icon}
            title={option.title}
            description={option.description}
            features={option.features}
            onSelect$={handleModeSelect}
            disabled={option.disabled}
            bodyClass="p-6"
            headingClass="text-xl"
            featureTextClass="text-sm"
            footer={
              option.mode === "Trunk Mode" ? (
                <div class="border-t border-border/20 pt-3 dark:border-border-dark/20">
                  <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 text-xs">
                    {$localize`Requires 2 routers (you'll select the second router next)`}
                  </p>
                </div>
              ) : undefined
            }
          />
        ))}
      </div>

      {/* Router selection status */}
      {selectedRouters.length > 0 && (
        <div class="bg-surface-secondary/50 dark:bg-surface-dark-secondary/50 mx-auto max-w-2xl rounded-xl p-4">
          <p class="text-text-secondary/90 dark:text-text-dark-secondary text-sm">
            {$localize`Current Router Selection:`}
            <span class="ml-2 font-medium text-text dark:text-text-dark-default">
              {selectedRouters[0].Model}
            </span>
          </p>
          {selectedMode === "Trunk Mode" && (
            <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-1 text-xs">
              {$localize`A second router will be selected in the next step`}
            </p>
          )}
        </div>
      )}
    </SelectionStepSection>
  );
});
