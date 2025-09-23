import { component$ } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

interface BottomFeaturesProps {
  features: Feature[];
}

export const BottomFeatures = component$<BottomFeaturesProps>(({ features }) => {
  return (
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const FeatureIcon = getIcon(feature.icon);
        return (
          <div key={index} class="text-center">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FeatureIcon class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
});