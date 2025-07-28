import { component$, useSignal, useStore } from "@builder.io/qwik";
import { RadioGroup } from "../index";
import type { AnimationConfig } from "../Radio.types";

/**
 * Advanced Animation examples showcasing enhanced tailwind config animations,
 * micro-interactions, and performance-optimized animation patterns
 */

export const MicroInteractionsExample = component$(() => {
  const selectedOption = useSignal("smooth");

  const animationOptions = [
    { 
      value: "smooth", 
      label: "Smooth Transitions",
      description: "Gentle ease-out animations for polished feel"
    },
    { 
      value: "bouncy", 
      label: "Bouncy Animation",
      description: "Spring-like animations with bounce effect"
    },
    { 
      value: "dramatic", 
      label: "Dramatic Effects",
      description: "Eye-catching animations with scale and rotation"
    },
    { 
      value: "minimal", 
      label: "Minimal Motion",
      description: "Subtle animations respecting motion preferences"
    },
  ];

  const getAnimationConfig = (type: string): AnimationConfig => {
    switch (type) {
      case "smooth":
        return {
          enabled: true,
          duration: 200,
          easing: "ease-out"
        };
      case "bouncy":
        return {
          enabled: true,
          duration: 350,
          easing: "ease-in-out"
        };
      case "dramatic":
        return {
          enabled: true,
          duration: 400,
          easing: "ease-in-out"
        };
      case "minimal":
        return {
          enabled: true,
          duration: 150,
          easing: "linear"
        };
      default:
        return {
          enabled: true,
          duration: 200,
          easing: "ease-out"
        };
    }
  };

  return (
    <div class="max-w-2xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Micro-Interactions & Animation Presets
      </h3>
      
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <RadioGroup
          name="animation-preset"
          label="Choose Animation Style"
          helperText="Each option demonstrates different animation characteristics"
          options={animationOptions}
          value={selectedOption.value}
          onChange$={(value) => {
            selectedOption.value = value;
          }}
          size="lg"
          spacing={{ gap: "lg" }}
          animation={getAnimationConfig(selectedOption.value)}
          staggeredAnimation={true}
          responsive={true}
          responsiveSizes={{
            mobile: "xl",
            tablet: "lg",
            desktop: "md"
          }}
          touchTarget={{
            minSize: 48,
            touchPadding: true,
            responsive: {
              mobile: 52,
              tablet: 48,
              desktop: 44
            }
          }}
        />
      </div>

      {/* Live Animation Demo */}
      <div class="rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 p-6 dark:from-primary-950 dark:to-secondary-950">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Live Animation Preview
        </h4>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div 
              class={[
                "h-4 w-4 rounded-full bg-primary-500 transition-all",
                selectedOption.value === "smooth" && "duration-200 ease-out motion-safe:animate-pulse",
                selectedOption.value === "bouncy" && "duration-350 ease-in-out motion-safe:animate-bounce",
                selectedOption.value === "dramatic" && "duration-400 ease-in-out motion-safe:animate-spin",
                selectedOption.value === "minimal" && "duration-150 linear motion-safe:animate-ping",
              ].filter(Boolean).join(" ")}
            ></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Animation Style: <strong>{selectedOption.value}</strong>
            </span>
          </div>
          
          <div class="text-xs text-gray-500 dark:text-gray-400">
            Configuration: {JSON.stringify(getAnimationConfig(selectedOption.value), null, 2)}
          </div>
        </div>
      </div>
    </div>
  );
});

export const ResponsiveAnimationsExample = component$(() => {
  const preferences = useStore({
    reduceMotion: false,
    animationSpeed: "normal",
    device: "desktop",
  });

  const motionOptions = [
    { value: "false", label: "Enable All Animations" },
    { value: "true", label: "Respect Reduced Motion" },
  ];

  const speedOptions = [
    { value: "slow", label: "Slow (400ms)" },
    { value: "normal", label: "Normal (200ms)" },
    { value: "fast", label: "Fast (100ms)" },
  ];

  const deviceOptions = [
    { value: "mobile", label: "📱 Mobile Device" },
    { value: "tablet", label: "📲 Tablet Device" },
    { value: "desktop", label: "🖥️ Desktop Device" },
  ];

  const getAnimationDuration = () => {
    switch (preferences.animationSpeed) {
      case "slow": return 400;
      case "fast": return 100;
      default: return 200;
    }
  };

  const getDeviceAnimations = (): AnimationConfig => {
    switch (preferences.device) {
      case "mobile":
        return {
          enabled: !preferences.reduceMotion,
          duration: getAnimationDuration(),
          easing: "ease-out"
        };
      case "tablet":
        return {
          enabled: !preferences.reduceMotion,
          duration: getAnimationDuration() * 1.2,
          easing: "ease-in-out"
        };
      default:
        return {
          enabled: !preferences.reduceMotion,
          duration: getAnimationDuration(),
          easing: "ease-out"
        };
    }
  };

  return (
    <div class="max-w-3xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Responsive & Accessible Animations
      </h3>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Motion Preferences */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <RadioGroup
            name="motion-preference"
            label="Motion Preference"
            helperText="Accessibility setting"
            options={motionOptions}
            value={preferences.reduceMotion.toString()}
            onChange$={(value) => {
              preferences.reduceMotion = value === "true";
            }}
            size="sm"
            animation={{
              enabled: !preferences.reduceMotion,
              duration: 150,
              easing: "ease-out"
            }}
          />
        </div>

        {/* Animation Speed */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <RadioGroup
            name="animation-speed"
            label="Animation Speed"
            helperText="Performance tuning"
            options={speedOptions}
            value={preferences.animationSpeed}
            onChange$={(value) => {
              preferences.animationSpeed = value;
            }}
            size="sm"
            animation={getDeviceAnimations()}
          />
        </div>

        {/* Device Type */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <RadioGroup
            name="device-type"
            label="Device Type"
            helperText="Optimization target"
            options={deviceOptions}
            value={preferences.device}
            onChange$={(value) => {
              preferences.device = value;
            }}
            size="sm"
            animation={getDeviceAnimations()}
            staggeredAnimation={!preferences.reduceMotion}
          />
        </div>
      </div>

      {/* Animation Showcase */}
      <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Live Animation Showcase
        </h4>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Fade Animation */}
          <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div 
              class={[
                "mb-2 h-8 w-8 rounded-full bg-primary-500",
                !preferences.reduceMotion ? "motion-safe:animate-fade-in" : "",
                preferences.device === "mobile" ? "touch:active:scale-95" : "",
              ].filter(Boolean).join(" ")}
            ></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Fade In</span>
          </div>

          {/* Scale Animation */}
          <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div 
              class={[
                "mb-2 h-8 w-8 rounded-full bg-secondary-500",
                !preferences.reduceMotion ? "motion-safe:animate-scale-up hover:motion-safe:animate-lift" : "",
                preferences.device === "mobile" ? "touch:active:scale-90" : "",
              ].filter(Boolean).join(" ")}
            ></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Scale Up</span>
          </div>

          {/* Slide Animation */}
          <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div 
              class={[
                "mb-2 h-8 w-8 rounded-full bg-success-500",
                !preferences.reduceMotion ? "motion-safe:animate-slide-right" : "",
                preferences.device === "desktop" ? "can-hover:hover:animate-lift" : "",
              ].filter(Boolean).join(" ")}
            ></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Slide Right</span>
          </div>
        </div>

        {/* Configuration Display */}
        <div class="mt-6 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
          <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Current Configuration:</p>
          <pre class="text-xs text-gray-600 dark:text-gray-400">
            {JSON.stringify({
              reduceMotion: preferences.reduceMotion,
              animationSpeed: preferences.animationSpeed,
              device: preferences.device,
              computedConfig: getDeviceAnimations(),
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
});

export const StaggeredAnimationsExample = component$(() => {
  const animationState = useStore({
    triggerStagger: false,
    staggerType: "cascade",
    itemCount: 6,
  });

  const staggerOptions = [
    { value: "cascade", label: "Cascade Effect" },
    { value: "wave", label: "Wave Pattern" },
    { value: "spiral", label: "Spiral Animation" },
    { value: "random", label: "Random Timing" },
  ];

  const countOptions = [
    { value: "4", label: "4 Items" },
    { value: "6", label: "6 Items" },
    { value: "8", label: "8 Items" },
    { value: "12", label: "12 Items" },
  ];

  const generateItems = () => {
    return Array.from({ length: animationState.itemCount }, (_, i) => ({
      value: `item-${i}`,
      label: `Option ${i + 1}`,
    }));
  };

  const getStaggerDelay = (index: number) => {
    switch (animationState.staggerType) {
      case "cascade":
        return `${index * 100}ms`;
      case "wave":
        return `${Math.sin(index * 0.5) * 200 + 100}ms`;
      case "spiral":
        return `${(index * index * 50) % 500}ms`;
      case "random":
        return `${Math.random() * 300 + 50}ms`;
      default:
        return `${index * 100}ms`;
    }
  };

  return (
    <div class="max-w-3xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Staggered Animations & Timing Control
      </h3>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Configuration Controls */}
        <div class="space-y-4">
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <RadioGroup
              name="stagger-type"
              label="Stagger Pattern"
              options={staggerOptions}
              value={animationState.staggerType}
              onChange$={(value) => {
                animationState.staggerType = value;
              }}
              size="sm"
              spacing={{ gap: "sm" }}
            />
          </div>

          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <RadioGroup
              name="item-count"
              label="Number of Items"
              options={countOptions}
              value={animationState.itemCount.toString()}
              onChange$={(value) => {
                animationState.itemCount = parseInt(value);
              }}
              size="sm"
              direction="horizontal"
            />
          </div>

          <button
            class="w-full rounded-md bg-primary-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
            onClick$={() => {
              animationState.triggerStagger = !animationState.triggerStagger;
            }}
          >
            Trigger Stagger Animation
          </button>
        </div>

        {/* Animation Preview */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Animation Preview
          </h4>
          
          <div class="space-y-2">
            {generateItems().map((item, index) => (
              <div
                key={item.value}
                class={[
                  "flex items-center space-x-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800",
                  animationState.triggerStagger ? "motion-safe:animate-fade-in motion-safe:animate-slide-right" : "",
                ].filter(Boolean).join(" ")}
                style={{
                  animationDelay: getStaggerDelay(index),
                  animationFillMode: "both",
                }}
              >
                <div class="h-3 w-3 rounded-full bg-primary-500"></div>
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
                <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {getStaggerDelay(index)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real Implementation Example */}
      <div class="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-950 dark:to-indigo-950">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Real Implementation with RadioGroup
        </h4>
        
        <RadioGroup
          name="staggered-demo"
          label="Choose Your Preference"
          helperText="Watch the staggered animation as items appear"
          options={generateItems()}
          value=""
          onChange$={(value) => {
            console.log("Selected:", value);
          }}
          size="md"
          spacing={{ gap: "md" }}
          staggeredAnimation={true}
          animation={{
            enabled: true,
            duration: 300,
            easing: "ease-out"
          }}
          responsive={true}
          responsiveSizes={{
            mobile: "lg",
            tablet: "md",
            desktop: "sm"
          }}
        />
      </div>
    </div>
  );
});

export default MicroInteractionsExample;