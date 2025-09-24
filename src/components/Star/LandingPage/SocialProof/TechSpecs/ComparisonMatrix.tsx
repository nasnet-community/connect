import { component$, useSignal } from "@builder.io/qwik";
import { LuCheck, LuX, LuZap } from "@qwikest/icons/lucide";

interface Feature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
  highlight?: boolean;
}

export const ComparisonMatrix = component$(() => {
  const selectedPlan = useSignal<'basic' | 'pro' | 'enterprise'>('pro');
  const hoveredFeature = useSignal<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: $localize`Basic`,
      price: $localize`Free`,
      color: 'from-gray-500 to-gray-600',
      features: $localize`Essential Features`,
    },
    {
      id: 'pro',
      name: $localize`Professional`,
      price: $localize`Premium`,
      color: 'from-cyan-500 to-blue-500',
      features: $localize`Advanced Features`,
      popular: true,
    },
    {
      id: 'enterprise',
      name: $localize`Enterprise`,
      price: $localize`Custom`,
      color: 'from-purple-500 to-pink-500',
      features: $localize`All Features`,
    },
  ];

  const features: Feature[] = [
    {
      name: $localize`Router Models Support`,
      basic: '5',
      pro: '17+',
      enterprise: $localize`Unlimited`,
      highlight: true,
    },
    {
      name: $localize`VPN Protocols`,
      basic: '2',
      pro: '6',
      enterprise: '6+',
      highlight: true,
    },
    {
      name: $localize`Multi-WAN Support`,
      basic: false,
      pro: true,
      enterprise: true,
    },
    {
      name: $localize`Load Balancing`,
      basic: $localize`Basic`,
      pro: $localize`Advanced`,
      enterprise: $localize`Enterprise`,
    },
    {
      name: $localize`Gaming Optimization`,
      basic: false,
      pro: true,
      enterprise: true,
      highlight: true,
    },
    {
      name: $localize`Port Forwarding`,
      basic: $localize`Manual`,
      pro: $localize`Auto + Manual`,
      enterprise: $localize`Full Control`,
    },
    {
      name: $localize`Network Segments`,
      basic: '2',
      pro: '4',
      enterprise: $localize`Unlimited`,
    },
    {
      name: $localize`Configuration Export`,
      basic: true,
      pro: true,
      enterprise: true,
    },
    {
      name: $localize`24/7 Support`,
      basic: false,
      pro: false,
      enterprise: true,
    },
    {
      name: $localize`API Access`,
      basic: false,
      pro: $localize`Limited`,
      enterprise: $localize`Full`,
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div class="flex justify-center">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
            <LuCheck class="w-5 h-5 text-white" />
          </div>
        </div>
      ) : (
        <div class="flex justify-center">
          <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <LuX class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      );
    }
    return (
      <div class="text-center">
        <span class="px-3 py-1 rounded-full bg-gradient-to-r from-white/10 to-white/5 text-sm font-semibold text-white backdrop-blur-sm">
          {value}
        </span>
      </div>
    );
  };

  return (
    <div class="relative">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-white mb-4">
          <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {$localize`Feature Comparison`}
          </span>
        </h3>
        <p class="text-gray-400">{$localize`Choose the perfect plan for your network needs`}</p>
      </div>

      {/* Plan Selector */}
      <div class="flex justify-center mb-8">
        <div class="inline-flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick$={() => selectedPlan.value = plan.id as 'basic' | 'pro' | 'enterprise'}
              class={`relative px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedPlan.value === plan.id
                  ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {plan.popular && (
                <div class="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs text-black font-bold rounded-full">
                  {$localize`POPULAR`}
                </div>
              )}
              <span>{plan.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div class="overflow-x-auto">
        <div class="min-w-[768px]">
          {/* Header */}
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="text-gray-400 text-sm font-semibold uppercase tracking-wider">
              {$localize`Features`}
            </div>
            {plans.map((plan) => (
              <div key={plan.id} class="text-center">
                <div class={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${plan.color} bg-opacity-20`}>
                  <h4 class="text-lg font-bold text-white mb-1">{plan.name}</h4>
                  <p class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {plan.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          <div class="space-y-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                class={`grid grid-cols-4 gap-4 p-4 rounded-xl transition-all duration-300 ${
                  hoveredFeature.value === feature.name
                    ? 'bg-white/10 shadow-lg shadow-cyan-500/10'
                    : 'bg-white/5'
                } ${feature.highlight ? 'border border-cyan-500/30' : ''}`}
                onMouseEnter$={() => hoveredFeature.value = feature.name}
                onMouseLeave$={() => hoveredFeature.value = null}
                style={`animation: slideInLeft ${300 + index * 50}ms ease-out`}
              >
                <div class="flex items-center">
                  <span class={`text-sm font-medium ${
                    feature.highlight ? 'text-cyan-400' : 'text-gray-300'
                  }`}>
                    {feature.highlight && <LuZap class="inline w-4 h-4 mr-2" />}
                    {feature.name}
                  </span>
                </div>
                <div class={`flex items-center justify-center ${
                  selectedPlan.value === 'basic' ? 'scale-110' : 'opacity-50'
                } transition-all duration-300`}>
                  {renderValue(feature.basic)}
                </div>
                <div class={`flex items-center justify-center ${
                  selectedPlan.value === 'pro' ? 'scale-110' : 'opacity-50'
                } transition-all duration-300`}>
                  {renderValue(feature.pro)}
                </div>
                <div class={`flex items-center justify-center ${
                  selectedPlan.value === 'enterprise' ? 'scale-110' : 'opacity-50'
                } transition-all duration-300`}>
                  {renderValue(feature.enterprise)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer group">
          <span class="text-lg">{$localize`Get Started with`} {plans.find(p => p.id === selectedPlan.value)?.name}</span>
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      {/* Background Animation */}
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-slide-right" />
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left" />
      </div>
    </div>
  );
});