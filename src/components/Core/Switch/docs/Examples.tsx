import { component$ } from "@builder.io/qwik";
import {
  BasicSwitch,
  SizeSwitch,
  LabeledSwitch,
  DisabledSwitch,
  ResponsiveSwitch,
  CustomStyledSwitch,
  FormIntegrationSwitch,
  ThemeAwareSwitch,
  SemanticVariants,
  AccessibilityFeatures,
  AdvancedResponsive,
} from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Switch</h2>
        <p>
          The basic Switch component toggles between on and off states. It
          provides visual feedback for the current state and includes
          accessibility support.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <BasicSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const BasicSwitch = component$(() => {
  const isChecked = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Switch 
          checked={isChecked.value} 
          onChange$={(checked) => isChecked.value = checked} 
          aria-label="Toggle feature"
        />
        <span>Feature is {isChecked.value ? 'enabled' : 'disabled'}</span>
      </div>
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Switch Sizes</h2>
        <p>
          The Switch component comes in different sizes to fit various UI
          contexts. Use the <code>size</code> prop to control the switch's
          dimensions.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <SizeSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const SizeSwitch = component$(() => {
  const smallChecked = useSignal(false);
  const mediumChecked = useSignal(true);
  const largeChecked = useSignal(false);
  
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch 
            checked={smallChecked.value} 
            onChange$={(checked) => smallChecked.value = checked} 
            size="sm"
            aria-label="Small switch"
          />
          <span>Small size</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={mediumChecked.value} 
            onChange$={(checked) => mediumChecked.value = checked} 
            size="md"
            aria-label="Medium switch"
          />
          <span>Medium size (default)</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={largeChecked.value} 
            onChange$={(checked) => largeChecked.value = checked} 
            size="lg"
            aria-label="Large switch"
          />
          <span>Large size</span>
        </div>
      </div>
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Labeled Switch</h2>
        <p>
          Add labels to your switches for better clarity. Labels can be
          associated with switches using ARIA attributes for improved
          accessibility.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <LabeledSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const LabeledSwitch = component$(() => {
  const darkModeEnabled = useSignal(false);
  const notificationsEnabled = useSignal(true);
  
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <label id="dark-mode-label" class="font-medium">Dark Mode</label>
          <Switch 
            checked={darkModeEnabled.value} 
            onChange$={(checked) => darkModeEnabled.value = checked} 
            aria-labelledby="dark-mode-label"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <label id="notifications-label" class="font-medium">Notifications</label>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications about updates and activity
            </p>
          </div>
          <Switch 
            checked={notificationsEnabled.value} 
            onChange$={(checked) => notificationsEnabled.value = checked} 
            aria-labelledby="notifications-label"
          />
        </div>
      </div>
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Disabled Switch</h2>
        <p>
          Switches can be disabled when they're not available for interaction.
          Use the <code>disabled</code> prop to indicate that a switch is not
          currently operable.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <DisabledSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$ } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const DisabledSwitch = component$(() => {
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch 
            checked={false} 
            disabled
            aria-label="Disabled off switch"
          />
          <span>Disabled (off state)</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={true} 
            disabled
            aria-label="Disabled on switch"
          />
          <span>Disabled (on state)</span>
        </div>
      </div>
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Responsive Switch</h2>
        <p>
          The Switch component adapts to different screen sizes and input methods,
          providing optimal touch targets on mobile devices and appropriate sizing
          on desktop screens.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <ResponsiveSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const ResponsiveSwitch = component$(() => {
  const mobileOptimized = useSignal(true);
  const adaptiveLayout = useSignal(false);
  const touchGestures = useSignal(true);

  return (
    <div class="space-y-6">
      {/* Mobile optimized layout */}
      <div class="flex flex-col gap-4 sm:grid sm:grid-cols-3">
        <Switch
          checked={mobileOptimized.value}
          onChange$={(checked) => (mobileOptimized.value = checked)}
          label="Mobile Optimized"
          size="sm"
        />
        <Switch
          checked={adaptiveLayout.value}
          onChange$={(checked) => (adaptiveLayout.value = checked)}
          label="Adaptive Layout"
          size="md"
        />
        <Switch
          checked={touchGestures.value}
          onChange$={(checked) => (touchGestures.value = checked)}
          label="Touch Gestures"
          size="lg"
        />
      </div>
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Styled Switch</h2>
        <p>
          Customize the appearance of switches using the <code>trackClass</code> and <code>thumbClass</code> props.
          Apply gradients, custom colors, and unique animations to match your design system.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <CustomStyledSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const CustomStyledSwitch = component$(() => {
  const gradientChecked = useSignal(true);
  const errorChecked = useSignal(false);
  const successChecked = useSignal(true);

  return (
    <div class="space-y-4">
      {/* Gradient Switch */}
      <Switch
        checked={gradientChecked.value}
        onChange$={(checked) => (gradientChecked.value = checked)}
        label="Premium Feature"
        trackClass="bg-gradient-to-r from-purple-500 to-pink-500"
        thumbClass="bg-white shadow-lg"
      />
      
      {/* Error State Switch */}
      <Switch
        checked={errorChecked.value}
        onChange$={(checked) => (errorChecked.value = checked)}
        label="Delete Account"
        trackClass={errorChecked.value ? "!bg-error-500" : ""}
        thumbClass={errorChecked.value ? "!bg-error-50" : ""}
      />
      
      {/* Success State Switch */}
      <Switch
        checked={successChecked.value}
        onChange$={(checked) => (successChecked.value = checked)}
        label="Auto-save Enabled"
        trackClass={successChecked.value ? "!bg-success-500" : ""}
        thumbClass={successChecked.value ? "!bg-success-50" : ""}
      />
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Form Integration Switch</h2>
        <p>
          Integrate switches seamlessly into forms with proper <code>name</code> and <code>value</code> attributes.
          Use switches for preferences, settings, and feature toggles within form contexts.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <FormIntegrationSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal, $ } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const FormIntegrationSwitch = component$(() => {
  const newsletter = useSignal(true);
  const notifications = useSignal(false);
  const formData = useSignal<Record<string, boolean>>({});

  const handleSubmit$ = $((e: Event) => {
    e.preventDefault();
    formData.value = {
      newsletter: newsletter.value,
      notifications: notifications.value,
    };
  });

  return (
    <form onSubmit$={handleSubmit$} class="space-y-4">
      <Switch
        checked={newsletter.value}
        onChange$={(checked) => (newsletter.value = checked)}
        name="newsletter"
        value="yes"
        label="Newsletter"
      />
      <Switch
        checked={notifications.value}
        onChange$={(checked) => (notifications.value = checked)}
        name="notifications"
        value="yes"
        label="Push Notifications"
      />
      <button type="submit">Save Preferences</button>
    </form>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Theme Aware Switch</h2>
        <p>
          Switches automatically adapt to light and dark themes, providing
          appropriate colors and contrast ratios for optimal accessibility
          and visual consistency.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <ThemeAwareSwitch />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const ThemeAwareSwitch = component$(() => {
  const darkMode = useSignal(false);
  const autoTheme = useSignal(true);
  const reduceMotion = useSignal(false);

  return (
    <div class="space-y-4">
      {/* Light mode preview */}
      <div class="bg-white p-4 rounded" data-theme="light">
        <Switch
          checked={darkMode.value}
          onChange$={(checked) => (darkMode.value = checked)}
          label="Enable Dark Mode"
        />
      </div>
      
      {/* Dark mode preview */}
      <div class="bg-gray-900 p-4 rounded" data-theme="dark">
        <Switch
          checked={autoTheme.value}
          onChange$={(checked) => (autoTheme.value = checked)}
          label="Auto Theme"
        />
      </div>
      
      {/* Accessibility options */}
      <Switch
        checked={reduceMotion.value}
        onChange$={(checked) => (reduceMotion.value = checked)}
        label="Reduce Motion"
      />
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Semantic Color Variants</h2>
        <p>
          Use semantic color variants to convey meaning and context. The Switch component
          supports default, success, warning, and error variants using colors from the
          Tailwind configuration.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <SemanticVariants />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const SemanticExample = component$(() => {
  const autoSave = useSignal(true);
  const maintenanceMode = useSignal(false);
  const deleteData = useSignal(false);
  
  return (
    <div class="space-y-4">
      <Switch 
        checked={autoSave.value} 
        onChange$={(checked) => autoSave.value = checked} 
        variant="success"
        label="Auto-save enabled"
      />
      
      <Switch 
        checked={maintenanceMode.value} 
        onChange$={(checked) => maintenanceMode.value = checked} 
        variant="warning"
        label="Maintenance mode"
      />
      
      <Switch 
        checked={deleteData.value} 
        onChange$={(checked) => deleteData.value = checked} 
        variant="error"
        label="Delete user data"
      />
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Features</h2>
        <p>
          Comprehensive accessibility features including motion preferences, high contrast
          support, keyboard navigation, and screen reader compatibility. The component
          respects system preferences and WCAG guidelines.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <AccessibilityFeatures />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const AccessibilityExample = component$(() => {
  const reduceMotion = useSignal(false);
  const highContrast = useSignal(false);
  
  return (
    <div class="space-y-4">
      {/* Motion preferences */}
      <div class="flex items-center justify-between">
        <label id="reduce-motion" class="font-medium">
          Reduce Motion
        </label>
        <Switch
          checked={reduceMotion.value}
          onChange$={(checked) => reduceMotion.value = checked}
          aria-labelledby="reduce-motion"
          size="lg" // Large touch targets for accessibility
        />
      </div>
      
      {/* High contrast support */}
      <Switch
        checked={highContrast.value}
        onChange$={(checked) => highContrast.value = checked}
        aria-label="Enable high contrast mode"
        class={highContrast.value ? "high-contrast:filter high-contrast:contrast-150" : ""}
      />
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Advanced Responsive Design</h2>
        <p>
          Advanced responsive features showcasing RTL/LTR support, comprehensive breakpoint
          system, device-specific optimizations, and orientation-aware layouts using the
          full Tailwind configuration.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <AdvancedResponsive />
        </div>
        <div class="rounded-lg bg-gray-950 p-4">
          <pre class="overflow-x-auto">
            <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const ResponsiveExample = component$(() => {
  const feature = useSignal(true);
  
  return (
    <div class="space-y-4">
      {/* RTL support */}
      <div dir="rtl" class="flex items-center justify-between">
        <label class="text-sm">تفعيل الميزة</label>
        <Switch
          checked={feature.value}
          onChange$={(checked) => feature.value = checked}
          aria-label="تفعيل الميزة"
        />
      </div>
      
      {/* Breakpoint-aware sizing */}
      <Switch
        checked={feature.value}
        onChange$={(checked) => feature.value = checked}
        size="sm"
        class="2xs:scale-100 mobile-md:scale-110 tablet:scale-125"
        label="Responsive scaling"
      />
      
      {/* Device-specific optimization */}
      <Switch
        checked={feature.value}
        onChange$={(checked) => feature.value = checked}
        class="touch:scale-110 can-hover:hover:scale-105"
        label="Device optimized"
      />
    </div>
  );
});`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
});
