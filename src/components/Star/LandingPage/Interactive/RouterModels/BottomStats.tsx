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
      <div class="mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} class="text-center">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
              {stat.number}
            </div>
            <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
