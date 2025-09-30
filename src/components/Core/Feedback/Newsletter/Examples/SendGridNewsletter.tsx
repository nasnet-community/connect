import { component$, $ } from "@builder.io/qwik";
import { Newsletter } from "../Newsletter";
import { subscribeToNewsletterSendGrid } from "~/utils/newsletterAPI";
import type { NewsletterSubscription } from "../Newsletter.types";

/**
 * Newsletter example with Twilio SendGrid integration
 * 
 * This example demonstrates how to integrate the Newsletter component
 * with Twilio SendGrid for managing email subscriptions.
 * 
 * Setup Required:
 * 1. Set SENDGRID_API_KEY environment variable
 * 2. (Optional) Set SENDGRID_LIST_IDS environment variable
 * 3. Ensure the API endpoint is deployed at /api/newsletter/subscribe
 * 
 * @see https://www.twilio.com/docs/sendgrid/api-reference/contacts/add-or-update-a-contact
 */
export const SendGridNewsletter = component$(() => {
  // Handle newsletter subscription with SendGrid
  const handleSubscription$ = $(async (subscription: NewsletterSubscription) => {
    // Call the SendGrid API
    const result = await subscribeToNewsletterSendGrid(subscription.email, {
      source: subscription.source || "newsletter-component",
    });

    if (!result.success) {
      // Throw error to trigger error state in Newsletter component
      throw new Error(result.error || $localize`Subscription failed`);
    }

    // Success - the Newsletter component will show success state
    console.log("SendGrid job ID:", result.jobId);
    
    // Optional: Track the subscription in analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "newsletter_subscribe", {
        method: "sendgrid",
        email: subscription.email,
      });
    }
  });

  return (
    <div class="space-y-8 p-8">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {$localize`SendGrid Newsletter Integration`}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {$localize`Newsletter subscription powered by Twilio SendGrid`}
        </p>
      </div>

      {/* Default Newsletter with SendGrid */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {$localize`Standard Newsletter (Responsive)`}
        </h3>
        <Newsletter
          title={$localize`Stay Connected with NASNET`}
          description={$localize`Get the latest router configuration tips, security updates, and exclusive content delivered to your inbox.`}
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* Compact Newsletter for Sidebar */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {$localize`Compact Version (Sidebar)`}
        </h3>
        <Newsletter
          variant="vertical"
          size="sm"
          compact={true}
          title={$localize`Quick Updates`}
          description={$localize`Stay informed about new features and updates.`}
          showLogo={false}
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* Hero Newsletter */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {$localize`Hero Section Newsletter`}
        </h3>
        <Newsletter
          variant="horizontal"
          size="lg"
          title={$localize`Router Security Newsletter`}
          description={$localize`Join thousands of network administrators receiving weekly security updates, configuration best practices, and expert tips for MikroTik routers.`}
          placeholder={$localize`your.email@example.com`}
          buttonText={$localize`Get Security Updates`}
          onSubscribe$={handleSubscription$}
        />
      </div>

      {/* Glassmorphism Style */}
      <div class="space-y-4 relative">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {$localize`Modern Glass Effect`}
        </h3>
        {/* Background gradient for glass effect */}
        <div class="absolute inset-4 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-2xl -z-10" />
        <Newsletter
          theme="glass"
          glassmorphism={true}
          title={$localize`Premium Updates`}
          description={$localize`Exclusive content for professional network administrators.`}
          onSubscribe$={handleSubscription$}
          showLogo={false}
        />
      </div>

      {/* Setup Instructions */}
      <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
          {$localize`Setup Instructions`}
        </h3>
        <ol class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li class="flex gap-2">
            <span class="font-bold">1.</span>
            <span>
              {$localize`Get your SendGrid API key from`}{" "}
              <a
                href="https://app.sendgrid.com/settings/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-blue-600"
              >
                SendGrid Dashboard
              </a>
            </span>
          </li>
          <li class="flex gap-2">
            <span class="font-bold">2.</span>
            <span>{$localize`Add SENDGRID_API_KEY to your environment variables`}</span>
          </li>
          <li class="flex gap-2">
            <span class="font-bold">3.</span>
            <span>{$localize`(Optional) Add SENDGRID_LIST_IDS to assign contacts to specific lists`}</span>
          </li>
          <li class="flex gap-2">
            <span class="font-bold">4.</span>
            <span>{$localize`Deploy the API endpoint at /api/newsletter/subscribe`}</span>
          </li>
        </ol>
      </div>
    </div>
  );
});

