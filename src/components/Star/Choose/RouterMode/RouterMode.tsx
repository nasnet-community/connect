import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import type { QwikJSX } from "@builder.io/qwik";
import { LuNetwork, LuLink } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { SelectionCard } from "../shared/SelectionCard";
import { SelectionStepSection } from "../shared/SelectionStepSection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

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
  const locale = useMessageLocale();
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
      title: semanticMessages.star_router_mode_ap_title({}, { locale }),
      description: semanticMessages.star_router_mode_ap_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_router_mode_ap_feature_wireless({}, { locale }),
        semanticMessages.star_router_mode_ap_feature_roaming({}, { locale }),
        semanticMessages.star_router_mode_ap_feature_easy({}, { locale }),
        semanticMessages.star_router_mode_ap_feature_home({}, { locale }),
      ],
      disabled: false,
    },
    {
      mode: "Trunk Mode",
      icon: <LuLink class="h-8 w-8" />,
      title: semanticMessages.star_router_mode_trunk_title({}, { locale }),
      description: semanticMessages.star_router_mode_trunk_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_router_mode_trunk_feature_vlan({}, { locale }),
        semanticMessages.star_router_mode_trunk_feature_link({}, { locale }),
        semanticMessages.star_router_mode_trunk_feature_qos({}, { locale }),
        semanticMessages.star_router_mode_trunk_feature_enterprise(
          {},
          { locale },
        ),
      ],
      disabled: false,
    },
  ];

  return (
    <SelectionStepSection
      title={semanticMessages.star_router_mode_section_title({}, { locale })}
      description={semanticMessages.star_router_mode_section_description(
        {},
        { locale },
      )}
    >
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {modeOptions.map((option) => (
          <SelectionCard
            key={option.mode}
            value={option.mode}
            isSelected={selectedMode === option.mode && !option.disabled}
            testId={`router-mode-${option.mode === "AP Mode" ? "single" : "trunk"}`}
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
                    {semanticMessages.star_router_mode_trunk_footer(
                      {},
                      { locale },
                    )}
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
            {semanticMessages.star_router_mode_current_selection(
              {},
              { locale },
            )}
            <span class="ml-2 font-medium text-text dark:text-text-dark-default">
              {selectedRouters[0].Model}
            </span>
          </p>
          {selectedMode === "Trunk Mode" && (
            <p class="text-text-secondary/90 dark:text-text-dark-secondary mt-1 text-xs">
              {semanticMessages.star_router_mode_trunk_next({}, { locale })}
            </p>
          )}
        </div>
      )}
    </SelectionStepSection>
  );
});
