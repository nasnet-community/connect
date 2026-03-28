import { component$, useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { Mode } from "~/components/Star/StarContext/ChooseType";
import type { StepProps } from "~/types/step";
import type { QwikJSX } from "@builder.io/qwik";
import { SelectionCard } from "../shared/SelectionCard";
import { SelectionStepSection } from "../shared/SelectionStepSection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

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
  const locale = useMessageLocale();
  const starContext = useContext(StarContext);
  const selectedMode = starContext.state.Choose.Mode;

  const handleSelectMode = $((mode: Mode) => {
    starContext.updateChoose$({ Mode: mode });
    props.onComplete$();
  });

  const modeOptions: ModeOption[] = [
    {
      id: 1,
      title: semanticMessages.star_setup_mode_easy_title({}, { locale }),
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
      description: semanticMessages.star_setup_mode_easy_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_setup_mode_easy_feature_quick({}, { locale }),
        semanticMessages.star_setup_mode_easy_feature_basic({}, { locale }),
        semanticMessages.star_setup_mode_easy_feature_security({}, { locale }),
        semanticMessages.star_setup_mode_easy_feature_simple({}, { locale }),
        semanticMessages.star_setup_mode_easy_feature_guided({}, { locale }),
      ],
      disabled: false,
    },
    {
      id: 2,
      title: semanticMessages.star_setup_mode_advanced_title({}, { locale }),
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
      description: semanticMessages.star_setup_mode_advanced_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_setup_mode_advanced_feature_multiwan(
          {},
          { locale },
        ),
        semanticMessages.star_setup_mode_advanced_feature_failover(
          {},
          { locale },
        ),
        semanticMessages.star_setup_mode_advanced_feature_vlan({}, { locale }),
        semanticMessages.star_setup_mode_advanced_feature_dhcp({}, { locale }),
        semanticMessages.star_setup_mode_advanced_feature_routing(
          {},
          { locale },
        ),
      ],
      disabled: false,
    },
  ];

  return (
    <SelectionStepSection
      title={semanticMessages.star_setup_mode_section_title({}, { locale })}
      description={semanticMessages.star_setup_mode_section_description(
        {},
        { locale },
      )}
      descriptionClass="mx-auto max-w-2xl text-text-secondary dark:text-text-dark-secondary"
    >
      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {modeOptions.map((option) => (
          <SelectionCard
            key={option.id}
            value={option.mode}
            isSelected={selectedMode === option.mode && !option.disabled}
            testId={`setup-mode-${option.mode}`}
            icon={option.icon}
            title={option.title}
            description={option.description}
            features={option.features}
            onSelect$={handleSelectMode}
            disabled={option.disabled}
          />
        ))}
      </div>
    </SelectionStepSection>
  );
});
