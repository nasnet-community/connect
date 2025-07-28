import { component$, useSignal } from "@builder.io/qwik";
import { Radio } from "../Radio";

/**
 * Enhanced responsive Radio examples showcasing mobile optimization,
 * theme integration, and accessibility improvements
 */

export const MobileOptimizedRadio = component$(() => {
  const mobileChoice = useSignal("option1");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Mobile-Optimized Radio Buttons
      </h3>
      
      <div class="space-y-4">
        <Radio
          name="mobile-optimized"
          value="option1"
          label="Enhanced touch targets for mobile"
          size="lg"
          checked={mobileChoice.value === "option1"}
          onChange$={(value) => (mobileChoice.value = value)}
          touchTarget={{
            minSize: 44,
            touchPadding: true,
            responsive: {
              mobile: 48,
              tablet: 44,
              desktop: 40
            }
          }}
          animation={{
            enabled: true,
            duration: 200,
            easing: "ease-out"
          }}
        />
        
        <Radio
          name="mobile-optimized"
          value="option2"
          label="Smooth animations and transitions"
          size="lg"
          checked={mobileChoice.value === "option2"}
          onChange$={(value) => (mobileChoice.value = value)}
          variant="filled"
          animation={{
            enabled: true,
            duration: 250,
            easing: "ease-in-out"
          }}
        />
        
        <Radio
          name="mobile-optimized"
          value="option3"
          label="Enhanced focus states for accessibility"
          size="lg"
          checked={mobileChoice.value === "option3"}
          onChange$={(value) => (mobileChoice.value = value)}
          showFocusRing={true}
          highContrast={false}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected: <span class="font-medium">{mobileChoice.value}</span>
        </p>
      </div>
    </div>
  );
});

export const ResponsiveSizingExample = component$(() => {
  const sizingChoice = useSignal("adaptive");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Responsive Sizing Configuration
      </h3>
      
      <div class="space-y-4">
        <Radio
          name="sizing"
          value="adaptive"
          label="Adaptive sizing (XL on mobile, MD on desktop)"
          responsive={true}
          responsiveSizes={{
            mobile: "xl",
            tablet: "lg", 
            desktop: "md"
          }}
          checked={sizingChoice.value === "adaptive"}
          onChange$={(value) => (sizingChoice.value = value)}
        />
        
        <Radio
          name="sizing"
          value="consistent"
          label="Consistent large sizing across all devices"
          size="lg"
          checked={sizingChoice.value === "consistent"}
          onChange$={(value) => (sizingChoice.value = value)}
        />
        
        <Radio
          name="sizing"
          value="compact"
          label="Compact sizing for dense layouts"
          size="sm"
          checked={sizingChoice.value === "compact"}
          onChange$={(value) => (sizingChoice.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Sizing Mode: <span class="font-medium">{sizingChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Resize your browser to see adaptive sizing in action
        </p>
      </div>
    </div>
  );
});

export const ThemeVariantsExample = component$(() => {
  const variantChoice = useSignal("default");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Theme Variants & Visual Styles
      </h3>
      
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Radio
          name="variants"
          value="default"
          label="Default variant"
          variant="default"
          size="md"
          checked={variantChoice.value === "default"}
          onChange$={(value) => (variantChoice.value = value)}
        />
        
        <Radio
          name="variants"
          value="outlined"
          label="Outlined variant"
          variant="outlined"
          size="md"
          checked={variantChoice.value === "outlined"}
          onChange$={(value) => (variantChoice.value = value)}
        />
        
        <Radio
          name="variants"
          value="filled"
          label="Filled variant"
          variant="filled"
          size="md"
          checked={variantChoice.value === "filled"}
          onChange$={(value) => (variantChoice.value = value)}
        />
        
        <Radio
          name="variants"
          value="minimal"
          label="Minimal variant"
          variant="minimal"
          size="md"
          checked={variantChoice.value === "minimal"}
          onChange$={(value) => (variantChoice.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Variant: <span class="font-medium">{variantChoice.value}</span>
        </p>
      </div>
    </div>
  );
});

export const AccessibilityExample = component$(() => {
  const a11yChoice = useSignal("standard");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Accessibility & Contrast Options
      </h3>
      
      <div class="space-y-4">
        <Radio
          name="accessibility"
          value="standard"
          label="Standard contrast"
          size="md"
          checked={a11yChoice.value === "standard"}
          onChange$={(value) => (a11yChoice.value = value)}
          showFocusRing={true}
          highContrast={false}
        />
        
        <Radio
          name="accessibility"
          value="high-contrast"
          label="High contrast mode"
          size="md"
          checked={a11yChoice.value === "high-contrast"}
          onChange$={(value) => (a11yChoice.value = value)}
          showFocusRing={true}
          highContrast={true}
        />
        
        <Radio
          name="accessibility"
          value="no-focus-ring"
          label="Without focus ring (not recommended)"
          size="md"
          checked={a11yChoice.value === "no-focus-ring"}
          onChange$={(value) => (a11yChoice.value = value)}
          showFocusRing={false}
        />
        
        <Radio
          name="accessibility"
          value="required"
          label="Required field example"
          size="md"
          required={true}
          checked={a11yChoice.value === "required"}
          onChange$={(value) => (a11yChoice.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          A11y Option: <span class="font-medium">{a11yChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Try navigating with keyboard (Tab/Arrow keys) to test focus states
        </p>
      </div>
    </div>
  );
});

export const AnimationControlExample = component$(() => {
  const animChoice = useSignal("smooth");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Animation & Transition Controls
      </h3>
      
      <div class="space-y-4">
        <Radio
          name="animation"
          value="smooth"
          label="Smooth animations (200ms ease-out)"
          size="md"
          checked={animChoice.value === "smooth"}
          onChange$={(value) => (animChoice.value = value)}
          animation={{
            enabled: true,
            duration: 200,
            easing: "ease-out"
          }}
        />
        
        <Radio
          name="animation"
          value="fast"
          label="Fast animations (100ms ease-in-out)"
          size="md"
          checked={animChoice.value === "fast"}
          onChange$={(value) => (animChoice.value = value)}
          animation={{
            enabled: true,
            duration: 100,
            easing: "ease-in-out"
          }}
        />
        
        <Radio
          name="animation"
          value="slow"
          label="Slow animations (400ms ease-in)"
          size="md"
          checked={animChoice.value === "slow"}
          onChange$={(value) => (animChoice.value = value)}
          animation={{
            enabled: true,
            duration: 400,
            easing: "ease-in"
          }}
        />
        
        <Radio
          name="animation"
          value="disabled"
          label="No animations (respects prefers-reduced-motion)"
          size="md"
          checked={animChoice.value === "disabled"}
          onChange$={(value) => (animChoice.value = value)}
          animation={{
            enabled: false
          }}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Animation Style: <span class="font-medium">{animChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Click options to see different animation timings
        </p>
      </div>
    </div>
  );
});

export const TouchTargetExample = component$(() => {
  const touchChoice = useSignal("standard");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Touch Target Optimization
      </h3>
      
      <div class="space-y-4">
        <Radio
          name="touch-targets"
          value="standard"
          label="Standard touch targets (44x44px minimum)"
          size="md"
          checked={touchChoice.value === "standard"}
          onChange$={(value) => (touchChoice.value = value)}
          touchTarget={{
            minSize: 44,
            touchPadding: true
          }}
        />
        
        <Radio
          name="touch-targets"
          value="large"
          label="Large touch targets (52x52px minimum)"
          size="md"
          checked={touchChoice.value === "large"}
          onChange$={(value) => (touchChoice.value = value)}
          touchTarget={{
            minSize: 52,
            touchPadding: true
          }}
        />
        
        <Radio
          name="touch-targets"
          value="responsive"
          label="Responsive touch targets (varies by device)"
          size="md"
          checked={touchChoice.value === "responsive"}
          onChange$={(value) => (touchChoice.value = value)}
          touchTarget={{
            minSize: 44,
            touchPadding: true,
            responsive: {
              mobile: 48,
              tablet: 44,
              desktop: 40
            }
          }}
        />
        
        <Radio
          name="touch-targets"
          value="compact"
          label="Compact (no touch padding)"
          size="md"
          checked={touchChoice.value === "compact"}
          onChange$={(value) => (touchChoice.value = value)}
          touchTarget={{
            minSize: 32,
            touchPadding: false
          }}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Touch Target: <span class="font-medium">{touchChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Touch targets ensure easy interaction on mobile devices
        </p>
      </div>
    </div>
  );
});

export default MobileOptimizedRadio;