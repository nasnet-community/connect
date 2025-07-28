import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import and Basic Usage</h2>
        <p>
          The Switch component is designed to toggle between two states. Import it from the Core components 
          and provide a <code>checked</code> state value and an <code>onChange$</code> handler.
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core';

export default component$(() => {
  const isEnabled = useSignal(false);
  
  return (
    <Switch
      checked={isEnabled.value}
      onChange$={(checked) => isEnabled.value = checked}
      aria-label="Enable feature"
    />
  );
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Common Patterns and Best Practices</h2>
        
        <h3 class="text-lg font-medium">Labeled Switches</h3>
        <p>
          Use the built-in <code>label</code> prop for simple labels, or create custom layouts 
          with proper ARIA relationships for complex layouts.
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Simple label
<Switch
  checked={notifications.value}
  onChange$={(checked) => notifications.value = checked}
  label="Enable notifications"
  labelPosition="left"
/>

// Custom layout with proper ARIA
<div class="flex items-center justify-between">
  <label id="notifications-label" class="font-medium">
    Enable Notifications
  </label>
  <Switch
    checked={notifications.value}
    onChange$={(checked) => notifications.value = checked}
    aria-labelledby="notifications-label"
  />
</div>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Size Variants</h3>
        <p>
          The Switch component offers three responsive sizes: <code>sm</code>, <code>md</code> (default), 
          and <code>lg</code>. All sizes maintain touch-friendly targets on mobile devices.
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`<div class="space-y-4">
  <Switch
    size="sm"
    checked={setting1.value}
    onChange$={(checked) => setting1.value = checked}
    label="Small switch"
  />
  
  <Switch
    size="md"
    checked={setting2.value}
    onChange$={(checked) => setting2.value = checked}
    label="Medium switch (default)"
  />
  
  <Switch
    size="lg"
    checked={setting3.value}
    onChange$={(checked) => setting3.value = checked}
    label="Large switch"
  />
</div>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Semantic Color Variants</h3>
        <p>
          Use semantic color variants to convey meaning and context. The Switch component supports 
          <code>default</code>, <code>success</code>, <code>warning</code>, and <code>error</code> variants 
          using the comprehensive color system from your Tailwind configuration.
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Semantic variants for different contexts
<Switch
  variant="success"
  checked={autoSave.value}
  onChange$={(checked) => autoSave.value = checked}
  label="Auto-save enabled"
/>

<Switch
  variant="warning"
  checked={maintenanceMode.value}
  onChange$={(checked) => maintenanceMode.value = checked}
  label="Maintenance mode active"
/>

<Switch
  variant="error"
  checked={deleteAccount.value}
  onChange$={(checked) => deleteAccount.value = checked}
  label="Delete account permanently"
/>

// Default variant (uses primary colors)
<Switch
  variant="default" // or omit for default
  checked={notifications.value}
  onChange$={(checked) => notifications.value = checked}
  label="Push notifications"
/>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Responsive Design Considerations</h2>
        <p>
          The Switch component is built with mobile-first responsive design. It automatically 
          adjusts touch targets and sizing for different screen sizes while maintaining usability.
        </p>
        
        <h3 class="text-lg font-medium">Touch-Friendly Design</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Minimum 44px touch targets on mobile devices (WCAG AAA compliance)</li>
          <li>Responsive sizing that scales appropriately on tablets and desktop</li>
          <li>Hover states that only activate on devices that support hover</li>
          <li>Focus indicators optimized for keyboard navigation</li>
        </ul>

        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// The component automatically handles responsive behavior
<Switch
  checked={mobileOptimized.value}
  onChange$={(checked) => mobileOptimized.value = checked}
  label="Mobile-optimized toggle"
  size="sm" // Still maintains 44px touch target on mobile
/>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Form Integration Patterns</h2>
        <p>
          Integrate switches seamlessly with forms using Qwik's standard form handling. 
          Provide <code>name</code> attributes for form serialization.
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core';

export default component$(() => {
  const formValues = useSignal({
    notifications: false,
    darkMode: true,
    autoSave: false
  });
  
  return (
    <form>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <label id="notifications-label" class="font-medium">
              Push Notifications
            </label>
            <p id="notifications-desc" class="text-sm text-text-secondary">
              Receive notifications about important updates
            </p>
          </div>
          <Switch
            name="notifications"
            checked={formValues.value.notifications}
            onChange$={(checked) => {
              formValues.value = { ...formValues.value, notifications: checked };
            }}
            aria-labelledby="notifications-label"
            aria-describedby="notifications-desc"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <label id="dark-mode-label" class="font-medium">Dark Mode</label>
          <Switch
            name="darkMode"
            checked={formValues.value.darkMode}
            onChange$={(checked) => {
              formValues.value = { ...formValues.value, darkMode: checked };
            }}
            aria-labelledby="dark-mode-label"
            required
          />
        </div>
        
        <button type="submit" class="btn-primary">
          Save Preferences
        </button>
      </div>
    </form>
  );
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Styling Examples</h2>
        <p>
          Customize the Switch appearance using <code>trackClass</code> and <code>thumbClass</code> props. 
          The component uses Tailwind theme colors by default but can be fully customized.
        </p>
        
        <h3 class="text-lg font-medium">Using trackClass and thumbClass</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Custom track and thumb styling
<Switch
  checked={isChecked.value}
  onChange$={(checked) => isChecked.value = checked}
  trackClass="bg-gradient-to-r from-purple-400 to-pink-400 data-[checked]:from-green-400 data-[checked]:to-blue-400"
  thumbClass="bg-white shadow-lg ring-2 ring-purple-200"
  label="Gradient switch"
/>

// Success/error themed switch
<Switch
  checked={isSuccess.value}
  onChange$={(checked) => isSuccess.value = checked}
  trackClass={\`transition-colors duration-300 \${
    isSuccess.value 
      ? 'bg-success-500 dark:bg-success-600' 
      : 'bg-error-300 dark:bg-error-400'
  }\`}
  thumbClass="bg-white shadow-md"
  label="Status switch"
/>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Brand Color Customization</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Override theme colors with custom brand colors
<Switch
  checked={brandSwitch.value}
  onChange$={(checked) => brandSwitch.value = checked}
  class="[--primary-500:#ff6b35] [--primary-600:#e55a2b]"
  label="Brand colored switch"
/>

// Using CSS-in-JS style approach
<Switch
  checked={styledSwitch.value}
  onChange$={(checked) => styledSwitch.value = checked}
  style={{
    '--tw-ring-color': 'rgb(255 107 53 / 0.5)',
  }}
  trackClass="data-[checked]:bg-[#ff6b35] focus-within:ring-[#ff6b35]/50"
  label="Custom focus ring"
/>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Guidelines</h2>
        <p>
          The Switch component follows WCAG 2.1 AA standards and includes proper ARIA attributes, 
          keyboard navigation, and focus management out of the box.
        </p>
        
        <h3 class="text-lg font-medium">ARIA Labeling Patterns</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Using aria-label for standalone switches
<Switch
  checked={enableNotifications.value}
  onChange$={(checked) => enableNotifications.value = checked}
  aria-label="Enable push notifications"
/>

// Using aria-labelledby to reference visible labels
<div class="flex items-center justify-between">
  <label id="dark-mode-label" class="font-medium">Dark Mode</label>
  <Switch
    checked={enableDarkMode.value}
    onChange$={(checked) => enableDarkMode.value = checked}
    aria-labelledby="dark-mode-label"
  />
</div>

// Using aria-describedby for additional context
<div class="flex items-center justify-between">
  <div>
    <label id="location-label" class="font-medium">Location Services</label>
    <p id="location-desc" class="text-sm text-text-secondary">
      Allow the app to access your current location for personalized features
    </p>
  </div>
  <Switch
    checked={enableLocation.value}
    onChange$={(checked) => enableLocation.value = checked}
    aria-labelledby="location-label"
    aria-describedby="location-desc"
  />
</div>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Required Fields and Validation</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Required switch with proper indication
<div class="flex items-center justify-between">
  <label id="terms-label" class="font-medium">
    Accept Terms and Conditions
    <span class="text-error ml-1" aria-label="required">*</span>
  </label>
  <Switch
    checked={acceptedTerms.value}
    onChange$={(checked) => acceptedTerms.value = checked}
    aria-labelledby="terms-label"
    required
  />
</div>

// With validation feedback
<div class="space-y-2">
  <div class="flex items-center justify-between">
    <label id="privacy-label" class="font-medium">Privacy Policy</label>
    <Switch
      checked={acceptedPrivacy.value}
      onChange$={(checked) => acceptedPrivacy.value = checked}
      aria-labelledby="privacy-label"
      aria-describedby="privacy-error"
      required
    />
  </div>
  {!acceptedPrivacy.value && (
    <p id="privacy-error" class="text-sm text-error" role="alert">
      You must accept the privacy policy to continue
    </p>
  )}
</div>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Accessibility Features</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Keyboard Navigation:</strong> Full keyboard support with Space/Enter keys</li>
          <li><strong>Screen Reader Support:</strong> Proper role="switch" and aria-checked attributes</li>
          <li><strong>Focus Management:</strong> Visible focus indicators that meet contrast requirements</li>
          <li><strong>Touch Targets:</strong> Minimum 44px touch targets on mobile (WCAG AAA)</li>
          <li><strong>High Contrast:</strong> Maintains visibility in high contrast mode</li>
          <li><strong>Motion Preferences:</strong> Respects prefers-reduced-motion settings</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Dark Mode Considerations</h2>
        <p>
          The Switch component automatically adapts to dark mode using Tailwind's dark mode utilities. 
          All colors, shadows, and focus states are optimized for both light and dark themes.
        </p>
        
        <h3 class="text-lg font-medium">Automatic Dark Mode Support</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// No additional configuration needed - dark mode is automatic
<Switch
  checked={setting.value}
  onChange$={(checked) => setting.value = checked}
  label="Auto dark mode switch"
/>

// Custom dark mode overrides if needed
<Switch
  checked={customTheme.value}
  onChange$={(checked) => customTheme.value = checked}
  trackClass="bg-blue-200 dark:bg-slate-700 data-[checked]:bg-blue-500 dark:data-[checked]:bg-blue-400"
  thumbClass="bg-white dark:bg-slate-200 shadow-sm dark:shadow-dark-sm"
  label="Custom dark mode colors"
/>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Theme Color Usage</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Track Colors:</strong> Uses surface colors that adapt to theme automatically</li>
          <li><strong>Primary Colors:</strong> Checked state uses primary-500/600 for light/dark modes</li>
          <li><strong>Semantic Colors:</strong> Variant colors use success-500/600, warning-500/600, error-500/600</li>
          <li><strong>Focus Rings:</strong> Ring colors automatically adjust for proper contrast and variant</li>
          <li><strong>Shadows:</strong> Different shadow values for light and dark backgrounds</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Motion and Accessibility Preferences</h2>
        <p>
          The Switch component respects system preferences and provides comprehensive accessibility 
          features using the advanced capabilities from your Tailwind configuration.
        </p>
        
        <h3 class="text-lg font-medium">Motion-Safe and Reduce-Motion Support</h3>
        <p>
          The component automatically adapts to user motion preferences using Tailwind's motion utilities:
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Automatic motion preference handling
<Switch
  checked={setting.value}
  onChange$={(checked) => setting.value = checked}
  label="Respects motion preferences"
  // Component automatically uses:
  // - motion-safe:transition-all for smooth animations
  // - motion-reduce:transition-none for reduced motion
  // - motion-safe:hover:scale-[1.02] for hover effects
  // - motion-reduce:hover:scale-100 to disable scaling
/>

// Manual motion control for specific cases
<Switch
  checked={customMotion.value}
  onChange$={(checked) => customMotion.value = checked}
  class="motion-safe:animate-pulse motion-reduce:animate-none"
  label="Custom motion handling"
/>`}</code>
        </pre>

        <h3 class="text-lg font-medium">Advanced Responsive Breakpoints</h3>
        <p>
          Leverage the comprehensive breakpoint system for precise responsive control:
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Using advanced breakpoints from Tailwind config
<Switch
  checked={responsive.value}
  onChange$={(checked) => responsive.value = checked}
  label="Advanced responsive"
  class="
    2xs:scale-95       // Small phones (360px+)
    mobile-md:scale-100 // Standard phones (475px+)
    tablet:scale-110    // Tablets (768px+)
    desktop:scale-125   // Desktop (1280px+)
  "
/>

// Device-specific optimizations
<Switch
  checked={deviceOptimized.value}
  onChange$={(checked) => deviceOptimized.value = checked}
  class="
    touch:p-2                    // Touch devices
    can-hover:hover:shadow-lg    // Hover-capable devices
    retina:shadow-2xl           // High-DPI displays
    portrait:mb-4               // Portrait orientation
    landscape:mr-4              // Landscape orientation
  "
  label="Device optimized"
/>`}</code>
        </pre>

        <h3 class="text-lg font-medium">RTL/LTR Language Support</h3>
        <p>
          The Switch component works seamlessly with right-to-left languages using logical properties:
        </p>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// RTL layout example
<div dir="rtl" class="space-y-4">
  <Switch
    checked={arabicSetting.value}
    onChange$={(checked) => arabicSetting.value = checked}
    label="تفعيل الإشعارات"
    labelPosition="right" // Appears on the right in RTL
  />
  
  <Switch
    checked={hebrewSetting.value}
    onChange$={(checked) => hebrewSetting.value = checked}
    label="הפעל התראות"
    labelPosition="left" // Appears on the left in RTL
  />
</div>

// Using logical properties for custom styling
<Switch
  checked={logicalProps.value}
  onChange$={(checked) => logicalProps.value = checked}
  class="
    ms-4    // margin-inline-start (respects text direction)
    me-2    // margin-inline-end
    ps-3    // padding-inline-start
    pe-1    // padding-inline-end
  "
  label="Logical properties"
/>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Best Practices and Real-World Usage</h2>
        
        <h3 class="text-lg font-medium">When to Use Switches</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-success-600 dark:text-success-400 mb-2">✅ DO:</h4>
            <ul class="list-disc space-y-2 pl-6 text-sm">
              <li>Use for binary on/off settings that apply immediately</li>
              <li>Settings that users expect to take effect instantly</li>
              <li>Preference toggles (dark mode, notifications, auto-save)</li>
              <li>Feature enables/disables in user interfaces</li>
              <li>Privacy and security settings</li>
              <li>Provide clear, descriptive labels</li>
              <li>Maintain consistent positioning across your app</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-error-600 dark:text-error-400 mb-2">❌ DON'T:</h4>
            <ul class="list-disc space-y-2 pl-6 text-sm">
              <li>Use for actions requiring confirmation</li>
              <li>Multiple choice selections (use radio buttons)</li>
              <li>Destructive actions without additional safeguards</li>
              <li>Complex multi-step processes</li>
              <li>When the action isn't reversible</li>
              <li>Place switches without clear labels or context</li>
              <li>Use for navigation between views</li>
            </ul>
          </div>
        </div>

        <h3 class="text-lg font-medium">Performance Considerations</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// ✅ Good: Batch state updates for performance
const settings = useSignal({
  notifications: false,
  darkMode: true,
  autoSave: false
});

const updateSetting = $((key: string, value: boolean) => {
  settings.value = { ...settings.value, [key]: value };
});

// ✅ Good: Debounce expensive operations
const handleAutoSaveToggle = $((enabled: boolean) => {
  updateSetting('autoSave', enabled);
  
  // Debounce expensive side effects
  if (enabled) {
    debounceAutoSaveSetup();
  }
});

// ❌ Avoid: Individual signals for every switch if you have many
const notification1 = useSignal(false);
const notification2 = useSignal(false);
const notification3 = useSignal(false);
// ... many more individual signals`}</code>
        </pre>

        <h3 class="text-lg font-medium">Error Handling and Edge Cases</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Handle loading states and errors gracefully
export default component$(() => {
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);
  const setting = useSignal(false);

  const handleToggle = $(async (checked: boolean) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      await apiUpdateSetting('feature', checked);
      setting.value = checked;
    } catch (err) {
      error.value = 'Failed to update setting. Please try again.';
      // Revert to previous state
      setting.value = !checked;
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label id="feature-label" class="font-medium">
          Enable Feature
        </label>
        <Switch
          checked={setting.value}
          onChange$={handleToggle}
          disabled={isLoading.value}
          aria-labelledby="feature-label"
          aria-describedby={error.value ? "feature-error" : undefined}
        />
      </div>
      
      {error.value && (
        <p id="feature-error" class="text-sm text-error" role="alert">
          {error.value}
        </p>
      )}
      
      {isLoading.value && (
        <p class="text-sm text-text-secondary">Updating...</p>
      )}
    </div>
  );
});`}</code>
        </pre>

        <h3 class="text-lg font-medium">Integration with Other Components</h3>
        <pre class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-lg overflow-x-auto">
          <code class="text-sm">{`// Use with Form components from Core
import { Form, Field, Switch } from '~/components/Core';

<Form onSubmit$={handleSubmit}>
  <Field label="Notification Preferences">
    <div class="space-y-3">
      <Switch
        name="emailNotifications"
        checked={formData.value.emailNotifications}
        onChange$={(checked) => updateFormData('emailNotifications', checked)}
        label="Email notifications"
      />
      
      <Switch
        name="smsNotifications"
        checked={formData.value.smsNotifications}
        onChange$={(checked) => updateFormData('smsNotifications', checked)}
        label="SMS notifications"
        disabled={!formData.value.emailNotifications}
      />
    </div>
  </Field>
</Form>`}</code>
        </pre>

        <div class="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg p-4 mt-6">
          <h4 class="font-medium text-info-800 dark:text-info-200 mb-2">💡 Pro Tips</h4>
          <ul class="text-sm text-info-700 dark:text-info-300 space-y-1">
            <li>• Always provide immediate visual feedback when switches change state</li>
            <li>• Consider adding subtle animations for state transitions using Tailwind</li>
            <li>• Test switches with keyboard navigation and screen readers</li>
            <li>• Use consistent labeling patterns across your application</li>
            <li>• Group related switches logically in your forms</li>
          </ul>
        </div>
      </section>
    </div>
  );
});
