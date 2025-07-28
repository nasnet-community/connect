import { component$ } from "@builder.io/qwik";
import { DocExample } from "~/components/Docs/";
import { Card } from "../Card";
import {
  HiEllipsisHorizontalSolid,
  HiXMarkSolid,
} from "@qwikest/icons/heroicons";

export default component$(() => {
  return (
    <div class="space-y-12">
      <DocExample
        title="Basic Card"
        description="The default card provides a clean container with minimal styling."
        preview={
          <div class="mx-auto w-full max-w-md">
            <Card>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Card Title
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This is a basic card with default styling. It's perfect for
                  presenting simple content with clean, minimal styling.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Card Title</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This is a basic card with default styling. It's perfect for presenting simple content
      with clean, minimal styling.
    </p>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Basic Card Variants"
        description="Cards come in three basic visual variants: default, bordered, and elevated."
        preview={
          <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
              <h3 class="mb-2 text-base font-medium">Default Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Standard styling with subtle border.
              </p>
            </Card>

            <Card variant="bordered">
              <h3 class="mb-2 text-base font-medium">Bordered Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Thicker border for stronger visual presence.
              </p>
            </Card>

            <Card variant="elevated">
              <h3 class="mb-2 text-base font-medium">Elevated Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Shadow effect creates a sense of elevation.
              </p>
            </Card>
          </div>
        }
        code={`
<Card>
  <h3 class="text-base font-medium mb-2">Default Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Standard styling with subtle border.
  </p>
</Card>

<Card variant="bordered">
  <h3 class="text-base font-medium mb-2">Bordered Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Thicker border for stronger visual presence.
  </p>
</Card>

<Card variant="elevated">
  <h3 class="text-base font-medium mb-2">Elevated Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Shadow effect creates a sense of elevation.
  </p>
</Card>
        `}
      />

      <DocExample
        title="Card with Header and Footer"
        description="Cards can include a header and footer section for additional content organization."
        preview={
          <div class="mx-auto w-full max-w-md">
            <Card hasHeader hasFooter>
              <div q:slot="header" class="flex items-center justify-between">
                <h3 class="font-medium">Card with Header</h3>
                <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <HiEllipsisHorizontalSolid class="h-5 w-5" />
                </button>
              </div>

              <div class="py-2">
                <p class="text-gray-600 dark:text-gray-300">
                  This card demonstrates the use of header and footer sections.
                  The header typically contains the title and actions, while the
                  footer can include additional information or actions.
                </p>
              </div>

              <div q:slot="footer">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: May 18, 2025
                  </span>
                  <button class="text-sm font-medium text-primary-600 hover:text-primary-700">
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          </div>
        }
        code={`
<Card hasHeader hasFooter>
  <div q:slot="header" class="flex justify-between items-center">
    <h3 class="font-medium">Card with Header</h3>
    <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
      <HiEllipsisHorizontalSolid class="h-5 w-5" />
    </button>
  </div>
  
  <div class="py-2">
    <p class="text-gray-600 dark:text-gray-300">
      This card demonstrates the use of header and footer sections.
      The header typically contains the title and actions, while the
      footer can include additional information or actions.
    </p>
  </div>
  
  <div q:slot="footer">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Last updated: May 18, 2025</span>
      <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
        View Details
      </button>
    </div>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Card with Actions"
        description="Cards can display action buttons in the footer section."
        preview={
          <div class="mx-auto w-full max-w-md">
            <Card hasFooter hasActions>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Interactive Card
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card includes action buttons placed in the footer area.
                  The actions slot provides a consistent way to add interactive
                  elements.
                </p>
              </div>

              <div q:slot="footer">Card Footer Content</div>

              <div q:slot="actions">
                <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <HiXMarkSolid class="h-5 w-5" />
                </button>
                <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <HiEllipsisHorizontalSolid class="h-5 w-5" />
                </button>
              </div>
            </Card>
          </div>
        }
        code={`
<Card hasFooter hasActions>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive Card</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card includes action buttons placed in the footer area.
      The actions slot provides a consistent way to add interactive elements.
    </p>
  </div>
  
  <div q:slot="footer">
    Card Footer Content
  </div>
  
  <div q:slot="actions">
    <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
      <HiXMarkSolid class="h-5 w-5" />
    </button>
    <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
      <HiEllipsisHorizontalSolid class="h-5 w-5" />
    </button>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Loading Card"
        description="Cards can display a loading state while content is being fetched."
        preview={
          <div class="mx-auto w-full max-w-md">
            <Card loading>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Loading Content
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card shows a loading spinner overlay while content is
                  being loaded. The content is visible but dimmed behind the
                  loading indicator.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card loading>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Loading Content</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card shows a loading spinner overlay while content is being loaded.
      The content is visible but dimmed behind the loading indicator.
    </p>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Card with No Padding"
        description="Cards can be rendered without internal padding for custom layouts or when displaying media content."
        preview={
          <div class="mx-auto w-full max-w-md">
            <Card noPadding>
              <img
                src="https://source.unsplash.com/random/800x400/?nature"
                alt="Nature"
                width="800"
                height="400"
                class="h-48 w-full object-cover"
              />
              <div class="p-4">
                <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  No Padding Card
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card has the noPadding prop set, allowing content like
                  images to extend to the edges while still adding padding to
                  specific sections.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card noPadding>
  <img 
    src="https://source.unsplash.com/random/800x400/?nature" 
    alt="Nature" 
    class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Padding Card</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card has the noPadding prop set, allowing content like images
      to extend to the edges while still adding padding to specific sections.
    </p>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Semantic Variants"
        description="Semantic variants provide contextual meaning through color and styling, perfect for status messages and alerts."
        preview={
          <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="success" hasHeader>
              <div q:slot="header" class="flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Success</span>
              </div>
              <p class="text-sm">Operation completed successfully.</p>
            </Card>

            <Card variant="warning" hasHeader>
              <div q:slot="header" class="flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Warning</span>
              </div>
              <p class="text-sm">Please review before proceeding.</p>
            </Card>

            <Card variant="error" hasHeader>
              <div q:slot="header" class="flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Error</span>
              </div>
              <p class="text-sm">Something went wrong.</p>
            </Card>

            <Card variant="info" hasHeader>
              <div q:slot="header" class="flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Info</span>
              </div>
              <p class="text-sm">Here's some helpful information.</p>
            </Card>
          </div>
        }
        code={`
<Card variant="success" hasHeader>
  <div q:slot="header" class="flex items-center gap-2">
    <CheckIcon class="h-4 w-4" />
    <span class="font-medium">Success</span>
  </div>
  <p class="text-sm">Operation completed successfully.</p>
</Card>

<Card variant="warning" hasHeader>
  <div q:slot="header" class="flex items-center gap-2">
    <WarningIcon class="h-4 w-4" />
    <span class="font-medium">Warning</span>
  </div>
  <p class="text-sm">Please review before proceeding.</p>
</Card>

<Card variant="error" hasHeader>
  <div q:slot="header" class="flex items-center gap-2">
    <ErrorIcon class="h-4 w-4" />
    <span class="font-medium">Error</span>
  </div>
  <p class="text-sm">Something went wrong.</p>
</Card>

<Card variant="info" hasHeader>
  <div q:slot="header" class="flex items-center gap-2">
    <InfoIcon class="h-4 w-4" />
    <span class="font-medium">Info</span>
  </div>
  <p class="text-sm">Here's some helpful information.</p>
</Card>
        `}
      />

      <DocExample
        title="Special Effect Variants"
        description="Glass and gradient variants create unique visual effects for modern interfaces."
        preview={
          <div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div class="relative overflow-hidden rounded-lg">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"></div>
              <Card variant="glass" hasHeader hasFooter hasActions class="relative">
                <div q:slot="header">
                  <h3 class="font-medium">Glass Morphism Card</h3>
                </div>
                <p class="text-sm">
                  This card uses glassmorphism effects with backdrop blur and transparency. 
                  Perfect for overlaying on colorful backgrounds or images.
                </p>
                <div q:slot="footer">
                  <span class="text-xs opacity-80">Modern glass effect</span>
                </div>
                <div q:slot="actions">
                  <button class="rounded bg-white/20 px-3 py-1 text-xs backdrop-blur transition-colors hover:bg-white/30">
                    Learn More
                  </button>
                </div>
              </Card>
            </div>

            <Card variant="gradient" hasHeader hasFooter hasActions>
              <div q:slot="header">
                <h3 class="font-medium">Gradient Card</h3>
              </div>
              <p class="text-sm">
                Eye-catching gradient background using your theme's primary colors. 
                Perfect for featured content, CTAs, or highlighting important information.
              </p>
              <div q:slot="footer">
                <span class="text-xs opacity-90">Featured content</span>
              </div>
              <div q:slot="actions">
                <button class="rounded bg-white/20 px-3 py-1 text-xs transition-colors hover:bg-white/30">
                  Get Started
                </button>
              </div>
            </Card>
          </div>
        }
        code={`
<!-- Glass card requires a colorful background -->
<div class="relative overflow-hidden rounded-lg">
  <div class="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"></div>
  <Card variant="glass" hasHeader hasFooter hasActions class="relative">
    <div q:slot="header">
      <h3 class="font-medium">Glass Morphism Card</h3>
    </div>
    <p class="text-sm">
      This card uses glassmorphism effects with backdrop blur and transparency.
    </p>
    <div q:slot="footer">
      <span class="text-xs opacity-80">Modern glass effect</span>
    </div>
    <div q:slot="actions">
      <button class="rounded bg-white/20 px-3 py-1 text-xs backdrop-blur transition-colors hover:bg-white/30">
        Learn More
      </button>
    </div>
  </Card>
</div>

<Card variant="gradient" hasHeader hasFooter hasActions>
  <div q:slot="header">
    <h3 class="font-medium">Gradient Card</h3>
  </div>
  <p class="text-sm">
    Eye-catching gradient background using your theme's primary colors.
  </p>
  <div q:slot="footer">
    <span class="text-xs opacity-90">Featured content</span>
  </div>
  <div q:slot="actions">
    <button class="rounded bg-white/20 px-3 py-1 text-xs transition-colors hover:bg-white/30">
      Get Started
    </button>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Responsive Design Features"
        description="Cards automatically adapt to different screen sizes with mobile-first responsive design and container queries."
        preview={
          <div class="space-y-6">
            <Card variant="elevated" hasHeader containerClass="@container/demo">
              <div q:slot="header">
                <h3 class="font-medium">Responsive Card</h3>
              </div>
              <div class="flex flex-col gap-4 @[30rem]/demo:flex-row">
                <div class="flex-1">
                  <h4 class="mb-2 text-sm font-medium">Adaptive Layout</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    This content switches from vertical to horizontal layout based on container width using container queries.
                  </p>
                </div>
                <div class="w-full rounded bg-gray-100 p-3 @[30rem]/demo:w-32 dark:bg-gray-800">
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Sidebar content adapts width
                  </p>
                </div>
              </div>
            </Card>
          </div>
        }
        code={`
<Card variant="elevated" hasHeader containerClass="@container/demo">
  <div q:slot="header">
    <h3 class="font-medium">Responsive Card</h3>
  </div>
  <div class="flex flex-col gap-4 @[30rem]/demo:flex-row">
    <div class="flex-1">
      <h4 class="mb-2 text-sm font-medium">Adaptive Layout</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        This content switches from vertical to horizontal layout based on container width.
      </p>
    </div>
    <div class="w-full rounded bg-gray-100 p-3 @[30rem]/demo:w-32 dark:bg-gray-800">
      <p class="text-xs text-gray-600 dark:text-gray-400">
        Sidebar content adapts width
      </p>
    </div>
  </div>
</Card>
        `}
      />
    </div>
  );
});
