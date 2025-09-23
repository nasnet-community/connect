import { component$ } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Stat {
  number: string;
  label: string;
  icon: IconName;
}

interface StatsDisplayProps {
  stats: Stat[];
}

export const StatsDisplay = component$<StatsDisplayProps>(({ stats }) => {
  return (
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, index) => {
        const StatIcon = getIcon(stat.icon);
        return (
          <div key={index} class="text-center group">
            <div class="mb-3">
              <StatIcon class="h-8 w-8 mx-auto text-purple-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
              {stat.number}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
});