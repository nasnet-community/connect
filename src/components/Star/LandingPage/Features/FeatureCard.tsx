import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import { getIcon, type IconName } from "../utils/iconMapper";

interface Feature {
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  features: string[];
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = component$<FeatureCardProps>(({ feature, index }) => {
  const FeatureIcon = getIcon(feature.icon);

  return (
    <Card
      class={`
        group relative overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-md
        border border-white/20 hover:border-white/40 transition-all duration-500
        hover:transform hover:scale-105 hover:shadow-2xl
        animate-fade-in-up
        ${index === 1 ? 'animation-delay-200' : ''}
        ${index === 2 ? 'animation-delay-500' : ''}
        ${index >= 3 ? 'animation-delay-1000' : ''}
      `}
    >
      {/* Gradient Background */}
      <div class={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Content */}
      <div class="relative p-6">
        {/* Icon */}
        <div class="mb-4">
          <div class={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
            <FeatureIcon class="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Title */}
        <div class="mb-3">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {feature.title}
          </h3>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">
            {feature.subtitle}
          </p>
        </div>

        {/* Description */}
        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Feature Pills */}
        <div class="flex flex-wrap gap-2">
          {feature.features.map((item, idx) => (
            <span
              key={idx}
              class="px-3 py-1 text-xs font-medium bg-white/10 dark:bg-black/10 rounded-full border border-white/20 text-gray-700 dark:text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Hover Effect Arrow */}
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
});