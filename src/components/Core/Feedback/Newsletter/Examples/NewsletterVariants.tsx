import { component$, $, useSignal } from "@builder.io/qwik";
import { Newsletter } from "../Newsletter";
import type { NewsletterSubscription, NewsletterVariant, NewsletterTheme } from "../Newsletter.types";

/**
 * Newsletter variants example demonstrating different layouts and themes
 */
export const NewsletterVariants = component$(() => {
  // State for controlling examples
  const selectedVariant = useSignal<NewsletterVariant>("responsive");
  const selectedTheme = useSignal<NewsletterTheme>("branded");
  const enableGlassmorphism = useSignal(false);

  // Handle subscription with success notification
  const handleSubscription$ = $(async (subscription: NewsletterSubscription) => {
    console.log("Newsletter subscription:", subscription);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success notification (in real app, you might use a toast)
    alert(`Successfully subscribed ${subscription.email}!`);
  });

  return (
    <div class="space-y-12 p-8">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Newsletter Variants & Themes
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore different layout variants and visual themes for the Newsletter component.
        </p>
      </div>

      {/* Controls */}
      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Customization Controls
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Variant Selector */}
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Layout Variant
            </label>
            <select
              bind:value={selectedVariant}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="responsive">Responsive</option>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>

          {/* Theme Selector */}
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </label>
            <select
              bind:value={selectedTheme}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="branded">Branded</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="glass">Glass</option>
            </select>
          </div>

          {/* Glassmorphism Toggle */}
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Effects
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                bind:checked={enableGlassmorphism}
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                Glassmorphism
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Dynamic Example */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Interactive Example
        </h3>
        <div class="relative">
          {/* Background for glassmorphism demo */}
          {enableGlassmorphism.value && (
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-2xl" />
          )}

          <Newsletter
            variant={selectedVariant.value}
            theme={selectedTheme.value}
            glassmorphism={enableGlassmorphism.value}
            themeColors={true}
            animated={true}
            title="Dynamic Newsletter Demo"
            description="This example updates in real-time based on your selections above."
            onSubscribe$={handleSubscription$}
          />
        </div>
      </div>

      {/* Layout Variants Showcase */}
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Vertical Layout */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
            Vertical Layout
          </h3>
          <Newsletter
            variant="vertical"
            size="sm"
            title="Vertical Newsletter"
            description="Perfect for sidebars and narrow spaces."
            onSubscribe$={handleSubscription$}
            compact={true}
          />
        </div>

        {/* Horizontal Layout */}
        <div class="space-y-4 xl:col-span-2">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
            Horizontal Layout
          </h3>
          <Newsletter
            variant="horizontal"
            title="Horizontal Newsletter"
            description="Ideal for headers, footers, and wide content areas with side-by-side layout."
            onSubscribe$={handleSubscription$}
          />
        </div>
      </div>

      {/* Theme Showcase */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branded Theme */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Branded Theme
          </h3>
          <Newsletter
            theme="branded"
            themeColors={true}
            title="Brand-Focused Newsletter"
            description="Features your brand colors and styling."
            onSubscribe$={handleSubscription$}
            size="sm"
          />
        </div>

        {/* Glass Theme */}
        <div class="space-y-4 relative">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Glass Theme
          </h3>
          {/* Background for glass effect */}
          <div class="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl" />
          <Newsletter
            theme="glass"
            glassmorphism={true}
            themeColors={true}
            title="Glass Newsletter"
            description="Modern glassmorphism effect with transparency."
            onSubscribe$={handleSubscription$}
            size="sm"
          />
        </div>
      </div>

      {/* Size Variations */}
      <div class="space-y-8">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
          Size Variations
        </h3>

        <div class="space-y-6">
          {/* Small Size */}
          <div class="space-y-2">
            <h4 class="text-base font-medium text-gray-600 dark:text-gray-400">
              Small Size (Compact)
            </h4>
            <Newsletter
              size="sm"
              compact={true}
              showLogo={false}
              title="Compact Newsletter"
              description="Space-efficient design for tight layouts."
              onSubscribe$={handleSubscription$}
            />
          </div>

          {/* Medium Size */}
          <div class="space-y-2">
            <h4 class="text-base font-medium text-gray-600 dark:text-gray-400">
              Medium Size (Default)
            </h4>
            <Newsletter
              size="md"
              title="Standard Newsletter"
              description="Balanced design suitable for most use cases."
              onSubscribe$={handleSubscription$}
            />
          </div>

          {/* Large Size */}
          <div class="space-y-2">
            <h4 class="text-base font-medium text-gray-600 dark:text-gray-400">
              Large Size (Hero)
            </h4>
            <Newsletter
              size="lg"
              title="Hero Newsletter Signup"
              description="Eye-catching design perfect for landing pages and prominent sections. Features larger typography and enhanced visual hierarchy."
              onSubscribe$={handleSubscription$}
            />
          </div>
        </div>
      </div>

      {/* Special Features Demo */}
      <div class="space-y-8">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
          Special Features
        </h3>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Full Width */}
          <div class="space-y-4">
            <h4 class="text-base font-medium text-gray-600 dark:text-gray-400">
              Full Width
            </h4>
            <Newsletter
              fullWidth={true}
              variant="horizontal"
              title="Full Width Newsletter"
              description="Stretches to fill the entire container width."
              onSubscribe$={handleSubscription$}
              showPrivacyNotice={false}
            />
          </div>

          {/* Custom Privacy Notice */}
          <div class="space-y-4">
            <h4 class="text-base font-medium text-gray-600 dark:text-gray-400">
              Custom Privacy Notice
            </h4>
            <Newsletter
              title="Privacy-Conscious Newsletter"
              description="Features a custom privacy notice."
              privacyNoticeText="We'll never share your email. GDPR compliant."
              onSubscribe$={handleSubscription$}
              showLogo={false}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
});