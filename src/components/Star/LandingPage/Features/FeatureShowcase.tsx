import { component$ } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { LuTrendingUp } from "@qwikest/icons/lucide";
import { features } from "../data/featuresData";
import { FeatureCard } from "./FeatureCard";

export const FeatureShowcase = component$(() => {
  return (
    <section class="relative py-24 px-4">
      <div class="max-w-7xl mx-auto">
        {/* Section Header */}
        <div class="text-center mb-16">
          <Badge color="primary" variant="outline" size="lg" class="mb-4">
            {$localize`Features`}
          </Badge>
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {$localize`Everything You Need`}
            </span>
            <br />
            <span class="text-gray-900 dark:text-white">
              {$localize`In One Platform`}
            </span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {$localize`Professional network configuration made simple. From basic setups to enterprise-grade deployments, our platform handles it all.`}
          </p>
        </div>

        {/* Feature Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div class="text-center mt-16">
          <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-white/20">
            <LuTrendingUp class="h-5 w-5 text-purple-500" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Join 10,000+ network professionals using our platform`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});