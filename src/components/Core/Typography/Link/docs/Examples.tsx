import { component$ } from "@builder.io/qwik";
import { Link } from "../Link";

/**
 * Examples documentation for the Link component
 * 
 * Interactive examples showing different configurations and use cases
 */
export const Examples = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Examples
        </h1>
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Interactive examples showcasing different Link configurations, styles, and use cases.
        </p>
      </section>

      {/* Basic Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Basic Examples
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Internal Links</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="/home">Home Page</Link>
              <Link href="/about" color="secondary">About Us</Link>
              <Link href="/contact" color="accent">Contact</Link>
              <Link href="/dashboard" disabled>Dashboard (Disabled)</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/home">Home Page</Link>
<Link href="/about" color="secondary">About Us</Link>
<Link href="/contact" color="accent">Contact</Link>
<Link href="/dashboard" disabled>Dashboard (Disabled)</Link>`}
            </pre>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">External Links</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="https://qwik.builder.io/">Qwik Documentation</Link>
              <Link href="https://github.com/" color="secondary">GitHub</Link>
              <Link href="mailto:contact@example.com" color="info">Send Email</Link>
              <Link href="tel:+1234567890" color="success">Call Us</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="https://qwik.builder.io/">Qwik Documentation</Link>
<Link href="https://github.com/" color="secondary">GitHub</Link>
<Link href="mailto:contact@example.com" color="info">Send Email</Link>
<Link href="tel:+1234567890" color="success">Call Us</Link>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Variant Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Variant Examples
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Standard & Button</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Standard Links:</p>
                <div class="space-y-2">
                  <Link href="/docs" variant="standard">Documentation</Link>
                  <Link href="/api" variant="standard" color="accent">API Reference</Link>
                </div>
              </div>
              
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Button Links:</p>
                <div class="flex flex-wrap gap-2">
                  <Link href="/signup" variant="button" color="primary">Sign Up</Link>
                  <Link href="/login" variant="button" color="secondary">Log In</Link>
                  <Link href="/trial" variant="button" color="accent">Free Trial</Link>
                </div>
              </div>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/docs" variant="standard">Documentation</Link>
<Link href="/signup" variant="button" color="primary">Sign Up</Link>
<Link href="/login" variant="button" color="secondary">Log In</Link>`}
            </pre>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Navigation & Subtle</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Navigation Links:</p>
                <nav class="flex space-x-4">
                  <Link href="/products" variant="nav" active>Products</Link>
                  <Link href="/services" variant="nav">Services</Link>
                  <Link href="/support" variant="nav">Support</Link>
                </nav>
              </div>
              
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Subtle Links:</p>
                <div class="space-y-1">
                  <Link href="/privacy" variant="subtle" size="sm">Privacy Policy</Link>
                  <Link href="/terms" variant="subtle" size="sm">Terms of Service</Link>
                </div>
              </div>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/products" variant="nav" active>Products</Link>
<Link href="/services" variant="nav">Services</Link>
<Link href="/privacy" variant="subtle" size="sm">Privacy Policy</Link>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Icon Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Icon Examples
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Prefix Icons</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="/settings" prefixIcon="⚙️" variant="icon">Settings</Link>
              <Link href="/profile" prefixIcon="👤" variant="icon" color="secondary">Profile</Link>
              <Link href="/help" prefixIcon="❓" variant="icon" color="info">Help Center</Link>
              <Link href="/downloads" prefixIcon="📥" variant="icon" color="success">Downloads</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/settings" prefixIcon="⚙️" variant="icon">Settings</Link>
<Link href="/profile" prefixIcon="👤" variant="icon" color="secondary">Profile</Link>
<Link href="/help" prefixIcon="❓" variant="icon" color="info">Help Center</Link>`}
            </pre>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Suffix Icons</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="https://example.com" suffixIcon="↗" external>External Link</Link>
              <Link href="/next-page" suffixIcon="→" color="primary">Continue</Link>
              <Link href="/download.pdf" suffixIcon="📄" color="accent">Download PDF</Link>
              <Link href="/share" suffixIcon="📤" color="info">Share</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="https://example.com" suffixIcon="↗" external>External Link</Link>
<Link href="/next-page" suffixIcon="→" color="primary">Continue</Link>
<Link href="/download.pdf" suffixIcon="📄" color="accent">Download PDF</Link>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Breadcrumb Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Breadcrumb Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <nav class="flex items-center space-x-2 text-sm">
              <Link href="/" variant="breadcrumb" color="secondary">Home</Link>
              <span class="text-gray-400 dark:text-gray-600">/</span>
              <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
              <span class="text-gray-400 dark:text-gray-600">/</span>
              <Link href="/products/laptops" variant="breadcrumb" color="secondary">Laptops</Link>
              <span class="text-gray-400 dark:text-gray-600">/</span>
              <span class="text-gray-900 dark:text-white font-medium">MacBook Pro</span>
            </nav>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<nav class="flex items-center space-x-2 text-sm">
  <Link href="/" variant="breadcrumb" color="secondary">Home</Link>
  <span class="text-gray-400 dark:text-gray-600">/</span>
  <Link href="/products" variant="breadcrumb" color="secondary">Products</Link>
  <span class="text-gray-400 dark:text-gray-600">/</span>
  <span class="text-gray-900 dark:text-white font-medium">MacBook Pro</span>
</nav>`}
          </pre>
        </div>
      </section>

      {/* Size Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Size Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <Link href="/example" size="xs">Extra Small Link</Link>
            <Link href="/example" size="sm">Small Link</Link>
            <Link href="/example" size="base">Base Link (Default)</Link>
            <Link href="/example" size="lg">Large Link</Link>
            <Link href="/example" size="xl">Extra Large Link</Link>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/example" size="xs">Extra Small Link</Link>
<Link href="/example" size="sm">Small Link</Link>
<Link href="/example" size="base">Base Link (Default)</Link>
<Link href="/example" size="lg">Large Link</Link>
<Link href="/example" size="xl">Extra Large Link</Link>`}
          </pre>
        </div>
      </section>

      {/* Weight Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Weight Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <Link href="/example" weight="normal">Normal Weight</Link>
            <Link href="/example" weight="medium">Medium Weight (Default)</Link>
            <Link href="/example" weight="semibold">Semibold Weight</Link>
            <Link href="/example" weight="bold">Bold Weight</Link>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/example" weight="normal">Normal Weight</Link>
<Link href="/example" weight="medium">Medium Weight (Default)</Link>
<Link href="/example" weight="semibold">Semibold Weight</Link>
<Link href="/example" weight="bold">Bold Weight</Link>`}
          </pre>
        </div>
      </section>

      {/* Color Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Color Examples
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Standard Colors</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="/example" color="primary">Primary Link</Link>
              <Link href="/example" color="secondary">Secondary Link</Link>
              <Link href="/example" color="tertiary">Tertiary Link</Link>
              <Link href="/example" color="accent">Accent Link</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/example" color="primary">Primary Link</Link>
<Link href="/example" color="secondary">Secondary Link</Link>
<Link href="/example" color="tertiary">Tertiary Link</Link>
<Link href="/example" color="accent">Accent Link</Link>`}
            </pre>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Semantic Colors</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
              <Link href="/success" color="success">Success Link</Link>
              <Link href="/error" color="error">Error Link</Link>
              <Link href="/warning" color="warning">Warning Link</Link>
              <Link href="/info" color="info">Info Link</Link>
            </div>
            <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/success" color="success">Success Link</Link>
<Link href="/error" color="error">Error Link</Link>
<Link href="/warning" color="warning">Warning Link</Link>
<Link href="/info" color="info">Info Link</Link>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Underline Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Underline Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <Link href="/example" underline="none">No Underline</Link>
            <Link href="/example" underline="hover">Hover Underline (Default)</Link>
            <Link href="/example" underline="always">Always Underlined</Link>
            <Link href="/example" underline="animate">Animated Underline</Link>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link href="/example" underline="none">No Underline</Link>
<Link href="/example" underline="hover">Hover Underline (Default)</Link>
<Link href="/example" underline="always">Always Underlined</Link>
<Link href="/example" underline="animate">Animated Underline</Link>`}
          </pre>
        </div>
      </section>

      {/* Truncation Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Truncation Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div class="max-w-xs space-y-3">
              <Link href="/example" truncate>
                This is a very long link text that will be truncated when it exceeds the container width
              </Link>
              <Link href="/example" truncate variant="button">
                Very Long Button Text That Gets Truncated
              </Link>
            </div>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<div class="max-w-xs">
  <Link href="/example" truncate>
    This is a very long link text that will be truncated...
  </Link>
  <Link href="/example" truncate variant="button">
    Very Long Button Text That Gets Truncated
  </Link>
</div>`}
          </pre>
        </div>
      </section>

      {/* Responsive Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Responsive Examples
        </h2>
        
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <Link 
              href="/responsive" 
              class="text-sm md:text-base lg:text-lg"
              variant="button"
            >
              Responsive Size Button
            </Link>
            <Link 
              href="/mobile" 
              class="block md:inline-block w-full md:w-auto text-center"
              variant="button"
              color="primary"
            >
              Mobile Full-Width, Desktop Inline
            </Link>
          </div>
          <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`<Link 
  href="/responsive" 
  class="text-sm md:text-base lg:text-lg"
  variant="button"
>
  Responsive Size Button
</Link>

<Link 
  href="/mobile" 
  class="block md:inline-block w-full md:w-auto text-center"
  variant="button"
  color="primary"
>
  Mobile Full-Width, Desktop Inline
</Link>`}
          </pre>
        </div>
      </section>

      {/* Dark Mode Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Dark Mode Support
        </h2>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            All link colors automatically adapt to dark mode with optimized contrast ratios:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-medium mb-3 text-gray-900 dark:text-white">Light Mode</h4>
              <div class="space-y-2">
                <Link href="/example" color="primary">Primary (Blue 600)</Link>
                <Link href="/example" color="accent">Accent (Indigo 600)</Link>
                <Link href="/example" color="success">Success (Green 600)</Link>
              </div>
            </div>
            
            <div class="bg-gray-900 dark:bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 class="font-medium mb-3 text-white">Dark Mode</h4>
              <div class="space-y-2">
                <Link href="/example" color="primary">Primary (Blue 400)</Link>
                <Link href="/example" color="accent">Accent (Indigo 400)</Link>
                <Link href="/example" color="success">Success (Green 400)</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});