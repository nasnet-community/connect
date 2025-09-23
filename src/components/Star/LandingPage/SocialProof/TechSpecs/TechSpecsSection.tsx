import { component$ } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { techSpecs, stats, testimonials, trustIndicators } from "../../data/techSpecsData";
import { TechSpecCard } from "./TechSpecCard";
import { StatsDisplay } from "./StatsDisplay";
import { TestimonialCard } from "./TestimonialCard";
import { TrustIndicators } from "./TrustIndicators";

export const TechSpecsSection = component$(() => {
  return (
    <section class="relative py-24 px-4 bg-gradient-to-br from-slate-50/80 to-purple-50/80 dark:from-slate-900/80 dark:to-purple-900/80">
      <div class="max-w-7xl mx-auto">
        {/* Section Header */}
        <div class="text-center mb-16">
          <Badge color="info" variant="outline" size="lg" class="mb-4">
            {$localize`Technical Excellence`}
          </Badge>
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            <span class="text-gray-900 dark:text-white">
              {$localize`Enterprise-Grade`}
            </span>
            <br />
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {$localize`Performance & Security`}
            </span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {$localize`Built for professionals who demand reliability, security, and performance in their network infrastructure.`}
          </p>
        </div>

        {/* Technical Specifications Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techSpecs.map((spec, index) => (
            <TechSpecCard
              key={spec.category}
              category={spec.category}
              icon={spec.icon}
              color={spec.color}
              specs={spec.specs}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <StatsDisplay stats={stats} />

        {/* Testimonials */}
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {$localize`Trusted by Professionals`}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <TrustIndicators indicators={trustIndicators} />
      </div>
    </section>
  );
});