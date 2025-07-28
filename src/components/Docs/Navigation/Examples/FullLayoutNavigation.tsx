import { component$, useStore } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface FullLayoutNavigationProps {
  showCode?: boolean;
  showLayoutControls?: boolean;
}

export const FullLayoutNavigation = component$<FullLayoutNavigationProps>(({
  showCode = false,
  showLayoutControls = true
}) => {
  const layoutState = useStore({
    sidebarVisible: true,
    activePage: "/docs/components/button",
    layoutMode: 'desktop' as 'desktop' | 'mobile' | 'tablet',
    contentType: 'documentation' as 'documentation' | 'dashboard' | 'blog'
  });

  // Comprehensive navigation data for full layout demo
  const fullLayoutCategories: DocsSideNavigationCategory[] = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [
        { href: "/docs/introduction", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/quick-start", label: "Quick Start" },
        { href: "/docs/examples", label: "Examples" },
      ],
    },
    {
      id: "components",
      name: "Components",
      links: [
        { 
          href: "/docs/components/button", 
          label: "Button",
          subComponents: [
            { href: "/docs/components/button/overview", label: "Overview" },
            { href: "/docs/components/button/api", label: "API Reference" },
            { href: "/docs/components/button/examples", label: "Examples" },
          ]
        },
        { 
          href: "/docs/components/input", 
          label: "Input",
          subComponents: [
            { href: "/docs/components/input/text", label: "Text Input" },
            { href: "/docs/components/input/password", label: "Password" },
            { href: "/docs/components/input/number", label: "Number" },
          ]
        },
        { href: "/docs/components/select", label: "Select" },
        { href: "/docs/components/textarea", label: "Text Area" },
        { href: "/docs/components/checkbox", label: "Checkbox" },
        { href: "/docs/components/radio", label: "Radio Group" },
      ],
      subcategories: [
        {
          id: "layout-components",
          name: "Layout",
          links: [
            { href: "/docs/components/layout/container", label: "Container" },
            { href: "/docs/components/layout/grid", label: "Grid" },
            { href: "/docs/components/layout/stack", label: "Stack" },
          ],
        },
        {
          id: "feedback-components",
          name: "Feedback",
          links: [
            { href: "/docs/components/feedback/alert", label: "Alert" },
            { href: "/docs/components/feedback/toast", label: "Toast" },
            { href: "/docs/components/feedback/modal", label: "Modal" },
          ],
        },
      ],
    },
    {
      id: "guides",
      name: "Guides",
      links: [
        { href: "/docs/guides/styling", label: "Styling" },
        { href: "/docs/guides/theming", label: "Theming" },
        { href: "/docs/guides/accessibility", label: "Accessibility" },
        { href: "/docs/guides/performance", label: "Performance" },
      ],
    },
    {
      id: "resources",
      name: "Resources",
      links: [
        { href: "/docs/resources/changelog", label: "Changelog" },
        { href: "/docs/resources/migration", label: "Migration Guide" },
        { href: "/docs/resources/community", label: "Community" },
        { href: "/docs/resources/support", label: "Support" },
      ],
    },
  ];

  const contentExamples = {
    documentation: {
      title: "Button Component",
      subtitle: "Comprehensive documentation for the Button component",
      content: (
        <div class="space-y-6">
          <div class="prose prose-gray max-w-none dark:prose-invert">
            <p>
              The Button component is a fundamental interactive element that triggers actions 
              when clicked. It supports various sizes, variants, and states to accommodate 
              different use cases in your application.
            </p>
            
            <h2>Basic Usage</h2>
            <p>
              Import the Button component and use it with different props to customize 
              its appearance and behavior.
            </p>
            
            <div class="not-prose rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`import { Button } from "~/components/Core";

<Button variant="primary" size="md">
  Click me
</Button>`}</code>
              </pre>
            </div>

            <h2>Variants</h2>
            <p>The Button component supports multiple variants for different contexts:</p>
            <ul>
              <li><strong>Primary:</strong> Main action buttons</li>
              <li><strong>Secondary:</strong> Secondary actions</li>
              <li><strong>Outline:</strong> Less prominent actions</li>
              <li><strong>Ghost:</strong> Minimal visual weight</li>
            </ul>
          </div>
        </div>
      )
    },
    dashboard: {
      title: "Analytics Dashboard",
      subtitle: "Overview of your application metrics",
      content: (
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Users", value: "12,543", change: "+12.5%" },
              { label: "Active Sessions", value: "2,847", change: "+8.2%" },
              { label: "Page Views", value: "45,678", change: "+15.3%" },
              { label: "Conversion Rate", value: "3.24%", change: "-2.1%" },
            ].map((metric, index) => (
              <div key={index} class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.label}
                </div>
                <div class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
                <div class={`mt-1 text-sm ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
          
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <div class="space-y-3">
              {[
                "User john.doe@example.com signed up",
                "New component Button was added to the library",
                "Documentation updated for Input component",
                "Version 2.1.0 released with new features"
              ].map((activity, index) => (
                <div key={index} class="flex items-center gap-3 text-sm">
                  <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span class="text-gray-600 dark:text-gray-300">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    blog: {
      title: "Getting Started with Our Design System",
      subtitle: "A comprehensive guide to building consistent user interfaces",
      content: (
        <div class="space-y-6">
          <div class="prose prose-gray max-w-none dark:prose-invert">
            <p class="text-lg text-gray-600 dark:text-gray-300">
              Building a consistent user interface across your application can be challenging. 
              Our design system provides you with the tools and guidelines needed to create 
              beautiful, accessible, and maintainable interfaces.
            </p>

            <h2>Why Use a Design System?</h2>
            <p>
              Design systems offer numerous benefits for both designers and developers:
            </p>
            <ul>
              <li>Consistency across all user touchpoints</li>
              <li>Faster development and design iterations</li>
              <li>Improved accessibility and usability</li>
              <li>Better collaboration between teams</li>
            </ul>

            <h2>Getting Started</h2>
            <p>
              Follow these steps to integrate our design system into your project:
            </p>
            <ol>
              <li>Install the component library</li>
              <li>Set up your theme configuration</li>
              <li>Import and use components</li>
              <li>Customize to match your brand</li>
            </ol>

            <div class="not-prose rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h4 class="font-semibold text-blue-800 dark:text-blue-200">
                💡 Pro Tip
              </h4>
              <p class="mt-1 text-sm text-blue-700 dark:text-blue-300">
                Start with our pre-built templates and examples to get up and running quickly, 
                then customize as needed for your specific use case.
              </p>
            </div>
          </div>
        </div>
      )
    }
  };

  const currentContent = contentExamples[layoutState.contentType];

  const codeExample = `import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation } from "~/components/Docs/Navigation";

export default component$(() => {
  const sidebarVisible = useSignal(true);
  
  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [
        { href: "/docs/introduction", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
      ],
    },
    // ... more categories
  ];

  return (
    <DocsSideNavigation
      categories={categories}
      title="Full Documentation"
      activePath="/docs/components/button"
      sidebarVisible={sidebarVisible.value}
      onToggleSidebar$={() => {
        sidebarVisible.value = !sidebarVisible.value;
      }}
      renderFullLayout={true}
    >
      {/* Your main content goes here */}
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to the Documentation
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          This is your main content area. The navigation will automatically
          adapt to different screen sizes and provide an optimal experience
          across devices.
        </p>
        
        {/* Your content components */}
      </div>
    </DocsSideNavigation>
  );
});`;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Full Layout Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Complete layout implementation showing the Navigation component integrated with 
          real content. Demonstrates responsive behavior, content integration, and 
          real-world usage patterns.
        </p>
      </div>

      {/* Layout Controls */}
      {showLayoutControls && (
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Page:
            </label>
            <select
              value={layoutState.activePage}
              onChange$={(_, target) => {
                layoutState.activePage = target.value;
              }}
              class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="/docs/introduction">Introduction</option>
              <option value="/docs/components/button">Button Component</option>
              <option value="/docs/components/input/text">Text Input</option>
              <option value="/docs/guides/styling">Styling Guide</option>
              <option value="/docs/resources/changelog">Changelog</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Content Type:
            </label>
            <select
              value={layoutState.contentType}
              onChange$={(_, target) => {
                layoutState.contentType = target.value as typeof layoutState.contentType;
              }}
              class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="documentation">Documentation</option>
              <option value="dashboard">Dashboard</option>
              <option value="blog">Blog Post</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Layout Mode:
            </label>
            <select
              value={layoutState.layoutMode}
              onChange$={(_, target) => {
                layoutState.layoutMode = target.value as typeof layoutState.layoutMode;
              }}
              class="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sidebar:
            </label>
            <button
              onClick$={() => {
                layoutState.sidebarVisible = !layoutState.sidebarVisible;
              }}
              class="w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {layoutState.sidebarVisible ? 'Hide' : 'Show'} Sidebar
            </button>
          </div>
        </div>
      )}

      {/* Full Layout Demo */}
      <div 
        class={`mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
          layoutState.layoutMode === 'mobile' ? 'max-w-sm' :
          layoutState.layoutMode === 'tablet' ? 'max-w-4xl' : 'w-full'
        }`}
        style={{ 
          height: '600px',
          ...(layoutState.layoutMode === 'mobile' && { maxWidth: '375px' })
        }}
      >
        <DocsSideNavigation
          categories={fullLayoutCategories}
          title="Documentation Hub"
          activePath={layoutState.activePage}
          sidebarVisible={layoutState.sidebarVisible}
          onToggleSidebar$={() => {
            layoutState.sidebarVisible = !layoutState.sidebarVisible;
          }}
          renderFullLayout={true}
        >
          <div class="space-y-4">
            {/* Content Header */}
            <div class="border-b border-gray-200 pb-4 dark:border-gray-700">
              <div class="flex items-start justify-between">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                    {currentContent.title}
                  </h1>
                  <p class="mt-1 text-sm text-gray-600 md:text-base dark:text-gray-300">
                    {currentContent.subtitle}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="rounded bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-200">
                    {layoutState.contentType}
                  </span>
                  <span class="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {layoutState.layoutMode}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Content */}
            {currentContent.content}

            {/* Footer Actions */}
            <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div class="flex gap-2">
                  <button class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    Edit Page
                  </button>
                  <button class="rounded bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DocsSideNavigation>
      </div>

      {/* Layout Features */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            🎨 Full Layout Features
          </h4>
          <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li>• Complete responsive layout system</li>
            <li>• Integrated content area</li>
            <li>• Automatic sidebar management</li>
            <li>• Content overflow handling</li>
          </ul>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            📱 Responsive Behavior
          </h4>
          <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li>• Mobile overlay navigation</li>
            <li>• Tablet hybrid mode</li>
            <li>• Desktop sidebar layout</li>
            <li>• Touch-optimized interactions</li>
          </ul>
        </div>

        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            ⚡ Performance Features
          </h4>
          <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li>• Optimized scroll handling</li>
            <li>• Efficient state management</li>
            <li>• Smooth animations</li>
            <li>• Memory-efficient rendering</li>
          </ul>
        </div>
      </div>

      {/* Implementation Guide */}
      <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
        <h4 class="mb-2 text-sm font-semibold text-info-800 dark:text-info-200">
          🚀 Implementation Guide
        </h4>
        <div class="space-y-2 text-sm text-info-700 dark:text-info-300">
          <p>
            <strong>Step 1:</strong> Set <code class="rounded bg-info-100 px-1 dark:bg-info-900/50">renderFullLayout={true}</code> to enable complete layout rendering
          </p>
          <p>
            <strong>Step 2:</strong> Wrap your main content in the navigation component's children
          </p>
          <p>
            <strong>Step 3:</strong> Handle sidebar state with <code class="rounded bg-info-100 px-1 dark:bg-info-900/50">onToggleSidebar$</code> callback
          </p>
          <p>
            <strong>Step 4:</strong> Test responsive behavior across different screen sizes
          </p>
        </div>
      </div>

      {/* Code Example */}
      {showCode && (
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
            Implementation Code
          </h4>
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <pre class="overflow-x-auto text-xs text-gray-800 dark:text-gray-200">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
});