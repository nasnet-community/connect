import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { techSpecs, stats, testimonials, trustIndicators } from "../../data/techSpecsData";
import { TechSpecCard } from "./TechSpecCard";
import { StatsDisplay } from "./StatsDisplay";
import { TestimonialCard } from "./TestimonialCard";
import { TrustIndicators } from "./TrustIndicators";
import { TechRadarChart } from "./TechRadarChart";
import { ComparisonMatrix } from "./ComparisonMatrix";

export const TechSpecsSection = component$(() => {
  const activeCategory = useSignal(0);
  const isAnimated = useSignal(false);

  useVisibleTask$(() => {
    isAnimated.value = true;
  });

  return (
    <section class="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Animated Circuit Board Background */}
      <div class="absolute inset-0">
        <svg class="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L50 10 L50 50 L90 50" stroke="#8b5cf6" stroke-width="0.5" fill="none" opacity="0.5" />
              <path d="M90 10 L50 10 L50 50 L10 50" stroke="#3b82f6" stroke-width="0.5" fill="none" opacity="0.5" />
              <path d="M50 10 L50 90" stroke="#06b6d4" stroke-width="0.5" fill="none" opacity="0.5" />
              <path d="M10 50 L90 50" stroke="#06b6d4" stroke-width="0.5" fill="none" opacity="0.5" />
              <circle cx="10" cy="10" r="2" fill="#8b5cf6" opacity="0.8" />
              <circle cx="90" cy="10" r="2" fill="#3b82f6" opacity="0.8" />
              <circle cx="10" cy="90" r="2" fill="#06b6d4" opacity="0.8" />
              <circle cx="90" cy="90" r="2" fill="#8b5cf6" opacity="0.8" />
              <circle cx="50" cy="50" r="3" fill="#ec4899" opacity="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-circuit)" />
        </svg>
      </div>

      {/* Flowing Data Streams */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30 animate-slide-down" />
        <div class="absolute top-0 left-2/4 h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-30 animate-slide-down animation-delay-2000" />
        <div class="absolute top-0 left-3/4 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30 animate-slide-down animation-delay-4000" />
      </div>

      {/* Floating Binary Code */}
      <div class="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} class={`absolute text-xs font-mono text-cyan-300 animate-slide-down animation-delay-${i * 1000}`}
               style={`left: ${20 + i * 20}%; top: -20px;`}>
            <div>01101010</div>
            <div>11010110</div>
            <div>00101101</div>
            <div>10110011</div>
          </div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        {/* Futuristic Header */}
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 mb-6">
            <div class="w-20 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <Badge color="info" variant="outline" size="lg" class="backdrop-blur-md bg-white/5 border-cyan-500/50">
              {$localize`Technical Excellence`}
            </Badge>
            <div class="w-20 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          <h2 class="text-4xl md:text-6xl font-bold mb-8">
            <span class="block text-white mb-2">
              {$localize`Enterprise-Grade`}
            </span>
            <span class="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              {$localize`Performance & Security`}
            </span>
          </h2>

          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {$localize`Built for professionals who demand`}
            <span class="text-cyan-400 font-semibold"> {$localize`reliability`}</span>,
            <span class="text-purple-400 font-semibold"> {$localize`security`}</span>,
            {$localize` and`}
            <span class="text-pink-400 font-semibold"> {$localize`performance`}</span>
            {$localize` in their network infrastructure.`}
          </p>
        </div>

        {/* Category Tabs */}
        <div class="flex justify-center mb-12">
          <div class="inline-flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
            {techSpecs.map((spec, index) => (
              <button
                key={spec.category}
                onClick$={() => activeCategory.value = index}
                class={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory.value === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {spec.category}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Specifications Cards with 3D Effect */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {techSpecs.map((spec, index) => (
            <div
              key={spec.category}
              class={`transform transition-all duration-500 ${
                isAnimated.value ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={`transition-delay: ${index * 100}ms`}
            >
              <TechSpecCard
                category={spec.category}
                icon={spec.icon}
                color={spec.color}
                specs={spec.specs}
                index={index}
                isActive={activeCategory.value === index}
              />
            </div>
          ))}
        </div>

        {/* Tech Radar Chart */}
        <div class="mb-20">
          <TechRadarChart />
        </div>

        {/* Animated Stats with Counters */}
        <StatsDisplay stats={stats} />

        {/* Comparison Matrix */}
        <div class="mb-20">
          <ComparisonMatrix />
        </div>

        {/* Testimonials with Glassmorphism */}
        <div class="mb-20">
          <h3 class="text-3xl font-bold text-center mb-12 text-white">
            <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {$localize`Trusted by Industry Leaders`}
            </span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                class={`transform transition-all duration-500 ${
                  isAnimated.value ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                style={`transition-delay: ${600 + index * 100}ms`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators with Hover Effects */}
        <TrustIndicators indicators={trustIndicators} />
      </div>

      {/* Floating Tech Icons */}
      <div class="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            class="absolute animate-float"
            style={`
              left: ${10 + Math.random() * 80}%;
              top: ${10 + Math.random() * 80}%;
              animation-delay: ${i * 0.5}s;
              animation-duration: ${15 + Math.random() * 10}s;
            `}
          >
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
});