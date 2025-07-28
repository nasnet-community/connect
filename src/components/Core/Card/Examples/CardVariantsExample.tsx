import { component$ } from "@builder.io/qwik";
import { Card, type CardVariant } from "../Card";

/**
 * CardVariantsExample - Showcases all available card variants
 *
 * This example demonstrates:
 * - All 9 card variants with their unique styling
 * - Semantic variants for different content types
 * - Visual hierarchy through variants
 */
export const CardVariantsExample = component$(() => {
  const variants: {
    variant: CardVariant;
    title: string;
    description: string;
  }[] = [
    {
      variant: "default",
      title: "Default Card",
      description:
        "The standard card appearance with subtle borders and clean styling.",
    },
    {
      variant: "bordered",
      title: "Bordered Card",
      description: "Enhanced border styling for better visual separation.",
    },
    {
      variant: "elevated",
      title: "Elevated Card",
      description:
        "Card with shadow effects that responds to hover interactions.",
    },
    {
      variant: "success",
      title: "Success Card",
      description:
        "Used for positive messages, confirmations, or successful operations.",
    },
    {
      variant: "warning",
      title: "Warning Card",
      description:
        "Highlights important information that requires user attention.",
    },
    {
      variant: "error",
      title: "Error Card",
      description: "Displays error messages, failures, or critical alerts.",
    },
    {
      variant: "info",
      title: "Info Card",
      description: "Provides informational content or helpful tips to users.",
    },
    {
      variant: "glass",
      title: "Glass Card",
      description: "Modern glassmorphism effect with blur and transparency.",
    },
    {
      variant: "gradient",
      title: "Gradient Card",
      description: "Eye-catching gradient background for featured content.",
    },
  ];

  return (
    <div class="space-y-6 p-4">
      <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Card Variants
      </h2>
      <p class="mb-6 text-gray-600 dark:text-gray-400">
        Explore all available card variants, each designed for specific use
        cases and content types.
      </p>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {variants.map((item) => (
          <Card key={item.variant} variant={item.variant} hasHeader>
            <div q:slot="header">
              <h3 class="font-semibold">{item.title}</h3>
            </div>
            <p class="text-sm">{item.description}</p>
            <div class="mt-4">
              <code class="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                variant="{item.variant}"
              </code>
            </div>
          </Card>
        ))}
      </div>

      {/* Contextual Usage Examples */}
      <div class="mt-12 space-y-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Contextual Usage
        </h3>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Success Example */}
          <Card variant="success" hasHeader>
            <div q:slot="header" class="flex items-center gap-2">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Payment Successful</span>
            </div>
            <p>
              Your payment has been processed successfully. You will receive a
              confirmation email shortly.
            </p>
          </Card>

          {/* Error Example */}
          <Card variant="error" hasHeader>
            <div q:slot="header" class="flex items-center gap-2">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Connection Failed</span>
            </div>
            <p>
              Unable to connect to the server. Please check your internet
              connection and try again.
            </p>
          </Card>

          {/* Warning Example */}
          <Card variant="warning" hasHeader>
            <div q:slot="header" class="flex items-center gap-2">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Storage Almost Full</span>
            </div>
            <p>
              You're using 90% of your storage space. Consider upgrading your
              plan or deleting unused files.
            </p>
          </Card>

          {/* Info Example */}
          <Card variant="info" hasHeader>
            <div q:slot="header" class="flex items-center gap-2">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>New Features Available</span>
            </div>
            <p>
              We've added dark mode support and improved performance. Check out
              the changelog for details.
            </p>
          </Card>
        </div>

        {/* Special Variants */}
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Glass Example with Background */}
          <div class="relative overflow-hidden rounded-lg">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <Card variant="glass" class="relative">
              <h3 class="mb-2 text-lg font-semibold">Glass Morphism</h3>
              <p>
                The glass variant creates a modern, translucent effect perfect
                for overlaying on images or gradients.
              </p>
            </Card>
          </div>

          {/* Gradient Example */}
          <Card variant="gradient" hasFooter hasActions>
            <h3 class="mb-2 text-lg font-semibold">Featured Content</h3>
            <p>
              The gradient variant makes content stand out with a vibrant
              background perfect for CTAs and highlights.
            </p>
            <div q:slot="footer">
              <span class="text-sm opacity-90">Limited time offer</span>
            </div>
            <div q:slot="actions">
              <button class="rounded bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30">
                Learn More
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
});
