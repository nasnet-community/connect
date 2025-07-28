import { component$ } from "@builder.io/qwik";
import { Card } from "../Card";
import { Button } from "../../button/Button";

export const CardExamples = component$(() => {
  return (
    <div class="min-h-screen space-y-6 bg-gray-50 p-6 dark:bg-gray-900">
      <h1 class="mb-6 text-2xl font-bold">Enhanced Card Component Examples</h1>

      {/* Default Variants */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">Original Variants</h2>

        <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
          <Card variant="default" hasHeader hasFooter hasActions>
            <span q:slot="header">Default Card</span>
            <p>
              This is a default card with responsive design and container
              queries.
            </p>
            <span q:slot="footer">Footer content</span>
            <span q:slot="actions">
              <Button size="sm">Action</Button>
            </span>
          </Card>

          <Card variant="bordered" hasHeader hasFooter>
            <span q:slot="header">Bordered Card</span>
            <p>Enhanced with better focus states and accessibility.</p>
            <span q:slot="footer">Footer content</span>
          </Card>

          <Card variant="elevated" aria-label="Elevated card example">
            <h3 class="mb-2 font-semibold">Elevated Card</h3>
            <p>Features responsive shadows and hover effects.</p>
          </Card>
        </div>
      </section>

      {/* New Semantic Variants */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">New Semantic Variants</h2>

        <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4">
          <Card variant="success" hasHeader>
            <span q:slot="header">Success Card</span>
            <p>Perfect for success messages or positive feedback.</p>
          </Card>

          <Card variant="warning" hasHeader>
            <span q:slot="header">Warning Card</span>
            <p>Use for important warnings or cautions.</p>
          </Card>

          <Card variant="error" hasHeader>
            <span q:slot="header">Error Card</span>
            <p>Display error messages or critical information.</p>
          </Card>

          <Card variant="info" hasHeader>
            <span q:slot="header">Info Card</span>
            <p>General information or tips.</p>
          </Card>
        </div>
      </section>

      {/* Special Variants */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">Special Variants</h2>

        <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2">
          <Card variant="glass" hasHeader hasFooter hasActions>
            <span q:slot="header">Glass Morphism Card</span>
            <p>
              Beautiful glass effect with backdrop blur. Works best on colorful
              backgrounds.
            </p>
            <span q:slot="footer">Glassmorphic footer</span>
            <span q:slot="actions">
              <Button size="sm" variant="ghost">
                Learn More
              </Button>
            </span>
          </Card>

          <Card variant="gradient" hasHeader hasFooter hasActions>
            <span q:slot="header">Gradient Card</span>
            <p>Eye-catching gradient background using primary colors.</p>
            <span q:slot="footer">Gradient footer</span>
            <span q:slot="actions">
              <Button size="sm" variant="outline">
                Explore
              </Button>
            </span>
          </Card>
        </div>
      </section>

      {/* Responsive and Container Query Demo */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">Responsive Design Demo</h2>

        <div class="grid grid-cols-1 gap-4">
          <Card
            variant="elevated"
            containerClass="max-w-2xl mx-auto"
            data-testid="responsive-card"
            aria-labelledby="responsive-title"
          >
            <h3 id="responsive-title" class="mb-2 font-semibold">
              Responsive Card
            </h3>
            <p class="mb-2">This card adapts to different screen sizes with:</p>
            <ul class="list-inside list-disc space-y-1 text-sm">
              <li>Mobile-first responsive padding</li>
              <li>Container query support (@container)</li>
              <li>Fluid typography and spacing</li>
              <li>Touch-friendly 44px minimum targets</li>
              <li>Responsive border radius</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Accessibility Features */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">Accessibility Features</h2>

        <Card
          variant="info"
          role="region"
          aria-label="Accessibility features demonstration"
          data-card-variant="accessibility-demo"
          hasHeader
        >
          <span q:slot="header">Enhanced Accessibility</span>
          <div class="space-y-2">
            <p>All cards now include:</p>
            <ul class="list-inside list-disc space-y-1 text-sm">
              <li>
                Proper ARIA attributes (role, aria-label, aria-labelledby)
              </li>
              <li>Focus-visible states for keyboard navigation</li>
              <li>Data attributes for testing and styling hooks</li>
              <li>Semantic HTML structure</li>
              <li>Sufficient color contrast</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Loading State */}
      <section class="space-y-4">
        <h2 class="mb-4 text-xl font-semibold">Loading State</h2>

        <Card variant="default" loading hasHeader>
          <span q:slot="header">Loading Card</span>
          <p>Content is loading...</p>
        </Card>
      </section>
    </div>
  );
});
