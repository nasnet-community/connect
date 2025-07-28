import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Usage documentation for the Link component
 * 
 * Implementation patterns, guidelines, and best practices
 */
export const Usage = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Usage Guide
        </h1>
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Comprehensive implementation patterns, guidelines, and best practices for using the Link component effectively.
        </p>
      </section>

      {/* Getting Started */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Getting Started
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Import</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`import { Link } from "~/components/Core";

// Or from specific path
import { Link } from "~/components/Core/Typography/Link";`}
            </pre>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Basic Usage</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`// Internal navigation link
<Link href="/about">About Us</Link>

// External link with auto-detection
<Link href="https://qwik.builder.io/">Qwik Docs</Link>

// Button-style link
<Link href="/signup" variant="button" color="accent">Sign Up</Link>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Navigation Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Main Navigation</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <nav class="flex space-x-6">
                <Link href="/products" variant="nav" active>Products</Link>
                <Link href="/services" variant="nav">Services</Link>
                <Link href="/about" variant="nav">About</Link>
                <Link href="/contact" variant="nav">Contact</Link>
              </nav>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<nav class="flex space-x-6">
  <Link href="/products" variant="nav" active>Products</Link>
  <Link href="/services" variant="nav">Services</Link>
  <Link href="/about" variant="nav">About</Link>
  <Link href="/contact" variant="nav">Contact</Link>
</nav>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Breadcrumb Navigation</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <nav class="flex items-center space-x-2 text-sm">
                <Link href="/" variant="breadcrumb" color="secondary">Home</Link>
                <span class="text-gray-400 dark:text-gray-600">/</span>
                <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
                <span class="text-gray-400 dark:text-gray-600">/</span>
                <Link href="/products/laptops" variant="breadcrumb" color="secondary">Laptops</Link>
                <span class="text-gray-400 dark:text-gray-600">/</span>
                <span class="text-gray-900 dark:text-white font-medium">MacBook Pro</span>
              </nav>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<nav class="flex items-center space-x-2 text-sm">
  <Link href="/" variant="breadcrumb" color="secondary">Home</Link>
  <span class="text-gray-400">/</span>
  <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
  <span class="text-gray-400">/</span>
  <span class="text-gray-900 dark:text-white font-medium">MacBook Pro</span>
</nav>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sidebar Navigation</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <nav class="space-y-2 w-48">
                <Link 
                  href="/dashboard" 
                  variant="icon" 
                  prefixIcon="📊" 
                  active
                  class="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/settings" 
                  variant="icon" 
                  prefixIcon="⚙️" 
                  color="secondary"
                  class="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Settings
                </Link>
                <Link 
                  href="/help" 
                  variant="icon" 
                  prefixIcon="❓" 
                  color="secondary"
                  class="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Help
                </Link>
              </nav>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<nav class="space-y-2 w-48">
  <Link 
    href="/dashboard" 
    variant="icon" 
    prefixIcon="📊" 
    active
    class="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
  >
    Dashboard
  </Link>
  <Link 
    href="/settings" 
    variant="icon" 
    prefixIcon="⚙️" 
    color="secondary"
    class="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
  >
    Settings
  </Link>
</nav>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Call-to-Action Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Hero Section CTAs</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
              <div class="text-center space-y-4">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Ready to get started?
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  Join thousands of developers building with Qwik
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link 
                    href="/signup" 
                    variant="button" 
                    color="primary"
                    size="lg"
                    class="px-8 py-3"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    href="/demo" 
                    variant="button" 
                    color="secondary"
                    size="lg"
                    class="px-8 py-3"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
  <Link 
    href="/signup" 
    variant="button" 
    color="primary"
    size="lg"
    class="px-8 py-3"
  >
    Get Started Free
  </Link>
  <Link 
    href="/demo" 
    variant="button" 
    color="secondary"
    size="lg"
    class="px-8 py-3"
  >
    Watch Demo
  </Link>
</div>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Card Actions</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Pro Plan</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Perfect for growing teams</p>
                <div class="space-y-3">
                  <Link 
                    href="/upgrade" 
                    variant="button" 
                    color="primary"
                    class="w-full text-center"
                  >
                    Upgrade Now
                  </Link>
                  <Link 
                    href="/pricing" 
                    variant="subtle" 
                    color="secondary"
                    class="w-full text-center"
                  >
                    View Pricing Details
                  </Link>
                </div>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<div class="space-y-3">
  <Link 
    href="/upgrade" 
    variant="button" 
    color="primary"
    class="w-full text-center"
  >
    Upgrade Now
  </Link>
  <Link 
    href="/pricing" 
    variant="subtle" 
    color="secondary"
    class="w-full text-center"
  >
    View Pricing Details
  </Link>
</div>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Content Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Content Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Inline Content Links</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="prose dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300">
                  To learn more about Qwik's capabilities, check out the{" "}
                  <Link href="https://qwik.builder.io/docs/" color="primary">
                    official documentation
                  </Link>
                  {" "}or explore our{" "}
                  <Link href="/examples" color="accent">
                    example gallery
                  </Link>
                  {" "}for inspiration.
                </p>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<p>
  To learn more about Qwik's capabilities, check out the{" "}
  <Link href="https://qwik.builder.io/docs/" color="primary">
    official documentation
  </Link>
  {" "}or explore our{" "}
  <Link href="/examples" color="accent">
    example gallery
  </Link>
  {" "}for inspiration.
</p>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reference Links</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-2">
                <h4 class="font-medium text-gray-900 dark:text-white">Related Resources</h4>
                <ul class="space-y-1">
                  <li>
                    <Link 
                      href="/docs/components" 
                      color="primary" 
                      suffixIcon="→"
                      class="text-sm"
                    >
                      Component Documentation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/docs/routing" 
                      color="primary" 
                      suffixIcon="→"
                      class="text-sm"
                    >
                      Routing Guide
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://github.com/BuilderIO/qwik" 
                      color="secondary" 
                      suffixIcon="↗"
                      class="text-sm"
                    >
                      GitHub Repository
                    </Link>
                  </li>
                </ul>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<ul class="space-y-1">
  <li>
    <Link 
      href="/docs/components" 
      color="primary" 
      suffixIcon="→"
      class="text-sm"
    >
      Component Documentation
    </Link>
  </li>
  <li>
    <Link 
      href="https://github.com/BuilderIO/qwik" 
      color="secondary" 
      suffixIcon="↗"
      class="text-sm"
    >
      GitHub Repository
    </Link>
  </li>
</ul>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Responsive Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mobile-First Navigation</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                {/* Mobile Layout */}
                <div class="block md:hidden">
                  <Link 
                    href="/menu" 
                    variant="button" 
                    color="primary"
                    class="w-full text-center py-3"
                  >
                    Open Menu
                  </Link>
                </div>
                
                {/* Desktop Layout */}
                <div class="hidden md:flex md:space-x-6">
                  <Link href="/products" variant="nav">Products</Link>
                  <Link href="/services" variant="nav">Services</Link>
                  <Link href="/about" variant="nav">About</Link>
                  <Link href="/contact" variant="nav">Contact</Link>
                </div>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`{/* Mobile Layout */}
<div class="block md:hidden">
  <Link 
    href="/menu" 
    variant="button" 
    color="primary"
    class="w-full text-center py-3"
  >
    Open Menu
  </Link>
</div>

{/* Desktop Layout */}
<div class="hidden md:flex md:space-x-6">
  <Link href="/products" variant="nav">Products</Link>
  <Link href="/services" variant="nav">Services</Link>
  <Link href="/about" variant="nav">About</Link>
</div>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Responsive Button Groups</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/primary" 
                  variant="button" 
                  color="primary"
                  class="flex-1 text-center py-2 px-4"
                >
                  Primary Action
                </Link>
                <Link 
                  href="/secondary" 
                  variant="button" 
                  color="secondary"
                  class="flex-1 text-center py-2 px-4"
                >
                  Secondary Action
                </Link>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<div class="flex flex-col sm:flex-row gap-3">
  <Link 
    href="/primary" 
    variant="button" 
    color="primary"
    class="flex-1 text-center py-2 px-4"
  >
    Primary Action
  </Link>
  <Link 
    href="/secondary" 
    variant="button" 
    color="secondary"
    class="flex-1 text-center py-2 px-4"
  >
    Secondary Action
  </Link>
</div>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Accessibility Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Descriptive Links</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                {/* Good examples */}
                <div>
                  <h4 class="text-sm font-medium text-success-600 dark:text-success-400 mb-2">✓ Good</h4>
                  <div class="space-y-2">
                    <Link href="/pricing" color="primary">View our pricing plans</Link>
                    <Link href="/docs" color="primary">Read the complete documentation</Link>
                    <Link 
                      href="/download" 
                      color="primary"
                      ariaLabel="Download the latest version of our software"
                    >
                      Download
                    </Link>
                  </div>
                </div>
                
                {/* Bad examples */}
                <div>
                  <h4 class="text-sm font-medium text-error-600 dark:text-error-400 mb-2">✗ Avoid</h4>
                  <div class="space-y-2 opacity-60">
                    <span class="text-primary-600 dark:text-primary-400 underline cursor-not-allowed">
                      Click here
                    </span>
                    <br />
                    <span class="text-primary-600 dark:text-primary-400 underline cursor-not-allowed">
                      Read more
                    </span>
                    <br />
                    <span class="text-primary-600 dark:text-primary-400 underline cursor-not-allowed">
                      This link
                    </span>
                  </div>
                </div>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`{/* Good: Descriptive link text */}
<Link href="/pricing" color="primary">View our pricing plans</Link>
<Link href="/docs" color="primary">Read the complete documentation</Link>

{/* Good: ARIA label for context */}
<Link 
  href="/download" 
  color="primary"
  ariaLabel="Download the latest version of our software"
>
  Download
</Link>

{/* Avoid: Non-descriptive text */}
<Link href="/info">Click here</Link>
<Link href="/more">Read more</Link>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">External Link Indicators</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-2">
                <Link 
                  href="https://example.com" 
                  color="primary"
                  suffixIcon="↗"
                  ariaLabel="Visit Example.com (opens in new tab)"
                >
                  Example Website
                </Link>
                <Link 
                  href="https://github.com/repo" 
                  color="secondary"
                  suffixIcon="↗"
                  ariaLabel="View on GitHub (opens in new tab)"
                >
                  GitHub Repository
                </Link>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link 
  href="https://example.com" 
  color="primary"
  suffixIcon="↗"
  ariaLabel="Visit Example.com (opens in new tab)"
>
  Example Website
</Link>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Advanced Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Conditional Link Styling</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                <Link 
                  href="/premium" 
                  variant="button"
                  color="accent"
                  class="relative overflow-hidden"
                >
                  <span class="relative z-10">Upgrade to Premium</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-75"></div>
                </Link>
                
                <Link 
                  href="/status" 
                  color="success"
                  prefixIcon="✓"
                  class="inline-flex items-center px-3 py-1 rounded-full bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200"
                >
                  System Operational
                </Link>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`{/* Gradient button link */}
<Link 
  href="/premium" 
  variant="button"
  color="accent"
  class="relative overflow-hidden"
>
  <span class="relative z-10">Upgrade to Premium</span>
  <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-75"></div>
</Link>

{/* Status badge link */}
<Link 
  href="/status" 
  color="success"
  prefixIcon="✓"
  class="inline-flex items-center px-3 py-1 rounded-full bg-success-100 text-success-800"
>
  System Operational
</Link>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Loading States</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-3">
                <Link 
                  href="/loading" 
                  variant="button"
                  color="primary"
                  disabled
                  class="relative"
                >
                  <span class="opacity-0">Save Changes</span>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </Link>
                
                <Link 
                  href="/success" 
                  variant="button"
                  color="success"
                  prefixIcon="✓"
                >
                  Changes Saved
                </Link>
              </div>
              <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`{/* Loading state */}
<Link 
  href="/loading" 
  variant="button"
  color="primary"
  disabled
  class="relative"
>
  <span class="opacity-0">Save Changes</span>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
</Link>

{/* Success state */}
<Link 
  href="/success" 
  variant="button"
  color="success"
  prefixIcon="✓"
>
  Changes Saved
</Link>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Performance Tips
        </h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg">
            <h4 class="font-medium text-info-800 dark:text-info-200 mb-2">Prefer Internal Links</h4>
            <p class="text-sm text-info-700 dark:text-info-300">
              Internal links use Qwik's client-side routing for faster navigation. The component automatically
              detects and optimizes for internal vs external links.
            </p>
          </div>
          
          <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
            <h4 class="font-medium text-success-800 dark:text-success-200 mb-2">Minimize Custom Classes</h4>
            <p class="text-sm text-success-700 dark:text-success-300">
              Use the built-in props (variant, color, size) instead of custom classes when possible.
              This ensures better consistency and reduces bundle size.
            </p>
          </div>
          
          <div class="p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
            <h4 class="font-medium text-warning-800 dark:text-warning-200 mb-2">Avoid Inline Event Handlers</h4>
            <p class="text-sm text-warning-700 dark:text-warning-300">
              When using onClick$, define the handler function separately to enable proper Qwik optimization
              and avoid recreating functions on each render.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});