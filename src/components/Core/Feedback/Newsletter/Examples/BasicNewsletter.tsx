import { component$, $ } from "@builder.io/qwik";
import { Newsletter } from "../Newsletter";
import type { NewsletterSubscription } from "../Newsletter.types";

/**
 * Basic Newsletter example demonstrating simple usage
 */
export const BasicNewsletter = component$(() => {
  // Handle subscription
  const handleSubscription$ = $(async (subscription: NewsletterSubscription) => {
    console.log("Newsletter subscription:", subscription);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you'd send this to your API
    // Example: await fetch('/api/newsletter/subscribe', { ... })
  });

  return (
    <div class="space-y-8 p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Basic Newsletter Examples
      </h2>

      {/* Default Newsletter */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Default Newsletter (Responsive)
        </h3>
        <Newsletter
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* Custom Content */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Custom Content
        </h3>
        <Newsletter
          title="Router Security Updates"
          description="Get notified about the latest security patches, configuration tips, and best practices for your MikroTik router setup."
          placeholder="your.email@example.com"
          buttonText="Get Updates"
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* No Logo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Without Logo
        </h3>
        <Newsletter
          title="Technical Newsletter"
          description="Join our community of network administrators and router enthusiasts."
          showLogo={false}
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* Compact Version */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Compact Size
        </h3>
        <Newsletter
          size="sm"
          compact={true}
          title="Quick Updates"
          description="Brief notifications about important changes."
          onSubscribe$={handleSubscription$}
        />
      </div>
    </div>
  );
});