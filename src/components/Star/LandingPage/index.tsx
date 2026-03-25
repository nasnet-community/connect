import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./Hero/HeroSection";
import { EnhancedFeatureShowcase } from "./Features/EnhancedFeatureShowcase";
import { RouterModelsSection } from "./Interactive/RouterModels/RouterModelsSection";

const PARTICLE_COUNT = 12;

const getParticleStyle = (index: number) => {
  const left = (index * 17 + 13) % 100;
  const top = (index * 29 + 7) % 100;
  const duration = 4 + (index % 5) * 0.6;

  return `
    left: ${left}%;
    top: ${top}%;
    animation-delay: ${index * 0.5}s;
    animation-duration: ${duration}s;
  `;
};

export const LandingPage = component$(() => {
  return (
    <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Animated Background Pattern */}
      <div
        class="pointer-events-none fixed inset-0 opacity-30 dark:opacity-20"
        aria-hidden="true"
      >
        <div class="absolute inset-0 animate-pulse-slow bg-grid-pattern bg-[size:50px_50px]" />
        <div class="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10" />
      </div>

      {/* Main Content */}
      <main class="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Enhanced Feature Showcase */}
        <EnhancedFeatureShowcase />

        {/* Router Models Interactive Gallery */}
        <RouterModelsSection />
      </main>

      {/* Floating Particles */}
      <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {Array.from({ length: PARTICLE_COUNT }, (_, i) => i).map((i) => (
          <div
            key={i}
            class={`absolute h-2 w-2 animate-float rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/30`}
            style={getParticleStyle(i)}
          />
        ))}
      </div>
    </div>
  );
});
