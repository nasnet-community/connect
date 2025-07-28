import { component$, useSignal, useStyles$ } from "@builder.io/qwik";

// Define CSS for animations
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
    50% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
  }
  
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  .animate-fade-out { animation: fadeOut 0.3s ease-in; }
  .animate-slide-in-up { animation: slideInUp 0.3s ease-out; }
  .animate-slide-in-down { animation: slideInDown 0.3s ease-out; }
  .animate-slide-in-left { animation: slideInLeft 0.3s ease-out; }
  .animate-slide-in-right { animation: slideInRight 0.3s ease-out; }
  .animate-spin { animation: spin 1s linear infinite; }
  .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .animate-bounce { animation: bounce 1s infinite; }
  
  .transition-height { transition-property: height; }
  .transition-spacing { transition-property: margin, padding; }
  .transition-width { transition-property: width; }
  .transition-size { transition-property: width, height; }
`;

export const ShadowSample = component$<{
  name: string;
  description: string;
}>(({ name, description }) => {
  return (
    <div class="mb-6 p-4">
      <div
        class={`${name} flex h-32 w-full items-center justify-center rounded-lg bg-white p-6 dark:bg-neutral-800`}
      >
        <div>
          <div class="font-medium">{name}</div>
          <div class="max-w-xs text-center text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
});

export const BorderRadiusSample = component$<{
  name: string;
  value: string;
}>(({ name, value }) => {
  return (
    <div class="mb-6">
      <div
        class={`${name} flex h-24 w-full items-center justify-center bg-primary-500 font-medium text-white`}
      >
        <div>
          <div>{name}</div>
          <div class="text-sm opacity-80">{value}</div>
        </div>
      </div>
    </div>
  );
});

export const AnimationSample = component$<{
  name: string;
  description: string;
}>(({ name, description }) => {
  const isAnimating = useSignal(false);

  return (
    <div class="mb-6 p-2">
      <div class="flex flex-col items-center rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div
          class={`mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-primary-500 text-white ${isAnimating.value ? name : ""}`}
          onClick$={() => {
            isAnimating.value = false;
            setTimeout(() => {
              isAnimating.value = true;
            }, 10);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </div>

        <div class="font-medium">{name}</div>
        <div class="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </div>
        <button
          class="mt-3 rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
          onClick$={() => {
            isAnimating.value = false;
            setTimeout(() => {
              isAnimating.value = true;
            }, 10);
          }}
        >
          Replay Animation
        </button>
      </div>
    </div>
  );
});

export const TransitionSample = component$<{
  name: string;
  property: string;
  description: string;
}>(({ name, property, description }) => {
  const isExpanded = useSignal(false);

  return (
    <div class="mb-6 p-2">
      <div class="flex flex-col items-center rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div
          class={`mb-4 flex items-center justify-center rounded-md bg-secondary-500 text-white transition-all duration-300 ease-in-out ${name}`}
          style={{
            width: isExpanded.value ? "100%" : "4rem",
            height: isExpanded.value ? "6rem" : "4rem",
            padding: isExpanded.value ? "1rem" : "0.5rem",
          }}
        >
          <div class="text-center">{property}</div>
        </div>

        <div class="font-medium">{name}</div>
        <div class="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </div>
        <button
          class="mt-3 rounded bg-secondary-100 px-3 py-1.5 text-sm font-medium text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200"
          onClick$={() => {
            isExpanded.value = !isExpanded.value;
          }}
        >
          {isExpanded.value ? "Collapse" : "Expand"}
        </button>
      </div>
    </div>
  );
});

export const EffectTokensVisual = component$(() => {
  useStyles$(animationStyles);

  return (
    <div class="space-y-12">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Shadow Tokens</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ShadowSample
            name="shadow-sm"
            description="Very subtle shadow for subtle elevation (0 1px 2px 0 rgb(0 0 0 / 0.05))"
          />
          <ShadowSample
            name="shadow"
            description="Default shadow for standard elements (0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1))"
          />
          <ShadowSample
            name="shadow-md"
            description="Medium shadow for elements at medium elevation (0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))"
          />
          <ShadowSample
            name="shadow-lg"
            description="Large shadow for floating elements (0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))"
          />
          <ShadowSample
            name="shadow-xl"
            description="Extra large shadow for modals and overlays (0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1))"
          />
          <ShadowSample
            name="shadow-2xl"
            description="2x extra large shadow for maximum elevation (0 25px 50px -12px rgb(0 0 0 / 0.25))"
          />
          <ShadowSample
            name="shadow-inner"
            description="Inner shadow for inset effects (inset 0 2px 4px 0 rgb(0 0 0 / 0.05))"
          />
          <ShadowSample
            name="shadow-none"
            description="No shadow for flat elements (none)"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Border Radius Tokens</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <BorderRadiusSample name="rounded-none" value="0px" />
          <BorderRadiusSample name="rounded-sm" value="0.125rem (2px)" />
          <BorderRadiusSample name="rounded" value="0.25rem (4px)" />
          <BorderRadiusSample name="rounded-md" value="0.375rem (6px)" />
          <BorderRadiusSample name="rounded-lg" value="0.5rem (8px)" />
          <BorderRadiusSample name="rounded-xl" value="0.75rem (12px)" />
          <BorderRadiusSample name="rounded-2xl" value="1rem (16px)" />
          <BorderRadiusSample name="rounded-3xl" value="1.5rem (24px)" />
          <BorderRadiusSample name="rounded-full" value="9999px" />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Directional Border Radius</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
          <BorderRadiusSample
            name="rounded-t-lg"
            value="Top corners: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-r-lg"
            value="Right corners: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-b-lg"
            value="Bottom corners: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-l-lg"
            value="Left corners: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-tl-lg"
            value="Top-left corner: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-tr-lg"
            value="Top-right corner: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-bl-lg"
            value="Bottom-left corner: 0.5rem (8px)"
          />
          <BorderRadiusSample
            name="rounded-br-lg"
            value="Bottom-right corner: 0.5rem (8px)"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Animation Tokens</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <AnimationSample
            name="animate-fade-in"
            description="Fade in animation (0.3s ease-out)"
          />
          <AnimationSample
            name="animate-fade-out"
            description="Fade out animation (0.3s ease-in)"
          />
          <AnimationSample
            name="animate-slide-in-up"
            description="Slide in from bottom (0.3s ease-out)"
          />
          <AnimationSample
            name="animate-slide-in-down"
            description="Slide in from top (0.3s ease-out)"
          />
          <AnimationSample
            name="animate-slide-in-left"
            description="Slide in from left (0.3s ease-out)"
          />
          <AnimationSample
            name="animate-slide-in-right"
            description="Slide in from right (0.3s ease-out)"
          />
          <AnimationSample
            name="animate-spin"
            description="Spinning animation (1s linear infinite)"
          />
          <AnimationSample
            name="animate-ping"
            description="Ping animation for notifications (1s cubic-bezier infinite)"
          />
          <AnimationSample
            name="animate-pulse"
            description="Pulsing animation for loading states (2s cubic-bezier infinite)"
          />
          <AnimationSample
            name="animate-bounce"
            description="Bouncing animation for attention (1s infinite)"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Transition Properties</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
          <TransitionSample
            name="transition"
            property="All Properties"
            description="Default transition (all properties, 150ms ease-in-out)"
          />
          <TransitionSample
            name="transition-height"
            property="Height"
            description="Height transition only"
          />
          <TransitionSample
            name="transition-spacing"
            property="Margin & Padding"
            description="Spacing (margin, padding) transitions"
          />
          <TransitionSample
            name="transition-width"
            property="Width"
            description="Width transition only"
          />
          <TransitionSample
            name="transition-size"
            property="Width & Height"
            description="Size (width, height) transitions"
          />
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">How to Use This Component</h3>
        <p class="mb-3">
          This component provides a visual reference for effect tokens (shadows,
          border radius, animations, transitions) in the design system. It can
          be imported and used in documentation or Storybook.
        </p>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { EffectTokensVisual } from 'path/to/EffectTokensVisual';

// In your component or documentation
<EffectTokensVisual />`}
        </pre>
      </div>
    </div>
  );
});

export default EffectTokensVisual;
