import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Stat {
  number: string;
  label: string;
  icon: IconName;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

interface StatsDisplayProps {
  stats: Stat[];
}

export const StatsDisplay = component$<StatsDisplayProps>(({ stats }) => {
  const counters = useSignal<number[]>([]);
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    isVisible.value = true;

    // Initialize counters
    counters.value = stats.map(() => 0);

    // Animate counters
    stats.forEach((stat, index) => {
      const targetValue = parseFloat(stat.number.replace(/[^0-9.]/g, ''));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        counters.value = [...counters.value.slice(0, index),
                         targetValue * easeOutQuart,
                         ...counters.value.slice(index + 1)];

        if (currentStep >= steps) {
          clearInterval(interval);
          counters.value = [...counters.value.slice(0, index),
                           targetValue,
                           ...counters.value.slice(index + 1)];
        }
      }, stepDuration);
    });
  });

  return (
    <div class="mb-20">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-white mb-4">
          <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {$localize`Performance Metrics`}
          </span>
        </h3>
        <p class="text-gray-400">{$localize`Real-time statistics from our platform`}</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const StatIcon = getIcon(stat.icon);
          const displayValue = counters.value[index] || 0;

          // Format the display value based on the original format
          let formattedValue = displayValue.toFixed(stat.decimals || 0);

          // Add suffix/prefix from original
          if (stat.number.includes('+')) formattedValue += '+';
          if (stat.number.includes('%')) formattedValue += '%';
          if (stat.number.includes('/')) {
            const parts = stat.number.split('/');
            formattedValue += '/' + parts[1];
          }
          if (stat.number.includes(',')) {
            formattedValue = parseFloat(formattedValue).toLocaleString();
          }

          return (
            <div key={index} class="relative group">
              {/* Background Glow */}
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Stats Card */}
              <div class="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover:border-cyan-500/50 transition-all duration-300">
                {/* Animated Background Pattern */}
                <div class="absolute inset-0 opacity-5">
                  <div class="absolute inset-0 bg-grid-pattern bg-[size:20px_20px]" />
                </div>

                {/* Icon with Pulse */}
                <div class="relative mb-4">
                  <div class="relative inline-block">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-50 animate-pulse" />
                    <div class="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <StatIcon class="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div class="absolute -top-1 -right-1 flex items-center justify-center">
                    <div class="absolute w-3 h-3 bg-green-400 rounded-full animate-ping" />
                    <div class="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* Counter Display */}
                <div class="relative">
                  <div class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
                    <span class={`inline-block transform transition-all duration-300 ${
                      isVisible.value ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      {formattedValue}
                    </span>
                  </div>

                  {/* Progress Ring */}
                  <svg class="absolute -top-2 -right-2 w-16 h-16 -rotate-90 opacity-20">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                      class="text-white/10"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                      class="text-cyan-400"
                      stroke-dasharray={`${175.93}`}
                      stroke-dashoffset={`${175.93 - (175.93 * (displayValue / 100))}`}
                      stroke-linecap="round"
                      style="transition: stroke-dashoffset 2s ease-out;"
                    />
                  </svg>
                </div>

                {/* Label */}
                <div class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>

                {/* Hover Effect - Floating Particles */}
                <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div class={`absolute w-1 h-1 bg-cyan-400 rounded-full transition-all duration-1000 ${
                    isVisible.value ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                    style={`
                      left: ${20 + index * 10}%;
                      animation: float-up 3s ease-out infinite;
                      animation-delay: ${index * 0.2}s;
                    `}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated Connection Lines */}
      <div class="hidden md:block absolute inset-0 pointer-events-none">
        <svg class="absolute inset-0 w-full h-full opacity-10">
          <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="url(#gradient-line)" stroke-width="1" class="animate-pulse" />
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0" />
              <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
});