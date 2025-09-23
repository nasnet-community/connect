import { component$ } from "@builder.io/qwik";

interface Stat {
  number: string;
  label: string;
}

interface BottomStatsProps {
  stats: Stat[];
}

export const BottomStats = component$<BottomStatsProps>(({ stats }) => {
  return (
    <div class="mt-16 text-center">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} class="text-center">
            <div class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});