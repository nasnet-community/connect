import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Spec {
  label: string;
  value: string;
  highlight?: boolean;
}

interface TechSpecCardProps {
  category: string;
  icon: IconName;
  color: string;
  specs: Spec[];
  index: number;
}

export const TechSpecCard = component$<TechSpecCardProps>(({ category, icon, color, specs, index }) => {
  const Icon = getIcon(icon);
  return (
    <Card
      class={`
        p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20
        hover:border-white/40 transition-all duration-300 group
        animate-fade-in-up
        ${index === 1 ? 'animation-delay-200' : ''}
        ${index === 2 ? 'animation-delay-500' : ''}
        ${index >= 3 ? 'animation-delay-1000' : ''}
      `}
    >
      {/* Category Header */}
      <div class="mb-4">
        <div class={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
          <Icon class="h-5 w-5 text-white" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
          {category}
        </h3>
      </div>

      {/* Specs List */}
      <div class="space-y-3">
        {specs.map((spec, idx) => (
          <div key={idx} class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {spec.label}
            </span>
            <span class={`text-sm font-semibold ${
              spec.highlight
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
});