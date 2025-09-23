import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./Hero/HeroSection";
import { EnhancedFeatureShowcase } from "./Features/EnhancedFeatureShowcase";
import { RouterModelsSection } from "./Interactive/RouterModels/RouterModelsSection";
import { VPNCapabilities } from "./Interactive/VPNCapabilities/VPNCapabilities";
import { TechSpecsSection } from "./SocialProof/TechSpecs/TechSpecsSection";

export const LandingPage = component$(() => {
  return (
    <div class="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div class="fixed inset-0 opacity-30 dark:opacity-20">
        <div class="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] animate-pulse-slow" />
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 animate-gradient-xy" />
      </div>

      {/* Main Content */}
      <main class="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Enhanced Feature Showcase */}
        <EnhancedFeatureShowcase />

        {/* Router Models Interactive Gallery */}
        <RouterModelsSection />

        {/* VPN Capabilities */}
        <VPNCapabilities />

        {/* Technical Specifications */}
        <TechSpecsSection />
      </main>


      {/* Floating Particles */}
      <div class="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            class={`absolute w-2 h-2 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full animate-float`}
            style={`
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              animation-delay: ${i * 0.5}s;
              animation-duration: ${4 + Math.random() * 4}s;
            `}
          />
        ))}
      </div>
    </div>
  );
});