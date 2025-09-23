import { component$ } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Indicator {
  name: string;
  icon: IconName;
}

interface TrustIndicatorsProps {
  indicators: Indicator[];
}

export const TrustIndicators = component$<TrustIndicatorsProps>(({ indicators }) => {
  return (
    <div class="text-center">
      <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {indicators.map((indicator, index) => {
          const IndicatorIcon = getIcon(indicator.icon);
          return (
            <div key={index} class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <IndicatorIcon class="h-5 w-5" />
              <span class="font-medium">{indicator.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});