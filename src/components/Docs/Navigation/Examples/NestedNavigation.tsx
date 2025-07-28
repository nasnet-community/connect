import { component$, useSignal } from "@builder.io/qwik";
import { DocsSideNavigation, type DocsSideNavigationCategory } from "../";

export interface NestedNavigationProps {
  showCode?: boolean;
  showDepthIndicator?: boolean;
}

export const NestedNavigation = component$<NestedNavigationProps>(({
  showCode = false,
  showDepthIndicator = true
}) => {
  const activePath = useSignal("/docs/components/form/advanced/validation/rules");

  // Complex nested navigation structure demonstrating deep hierarchy
  const nestedCategories: DocsSideNavigationCategory[] = [
    {
      id: "fundamentals",
      name: "Fundamentals",
      links: [
        { href: "/docs/introduction", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/configuration", label: "Configuration" },
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
            { href: "/docs/components/button/primary", label: "Primary Button" },
            { href: "/docs/components/button/secondary", label: "Secondary Button" },
            { href: "/docs/components/button/icon", label: "Icon Button" },
            { href: "/docs/components/button/loading", label: "Loading Button" },
          ]
        },
        { 
          href: "/docs/components/form", 
          label: "Form Controls",
          subComponents: [
            { href: "/docs/components/form/input", label: "Text Input" },
            { href: "/docs/components/form/select", label: "Select Dropdown" },
            { href: "/docs/components/form/checkbox", label: "Checkbox" },
            { href: "/docs/components/form/radio", label: "Radio Group" },
            { href: "/docs/components/form/textarea", label: "Text Area" },
          ]
        },
        { 
          href: "/docs/components/data-display", 
          label: "Data Display",
          subComponents: [
            { href: "/docs/components/data-display/table", label: "Table" },
            { href: "/docs/components/data-display/list", label: "List" },
            { href: "/docs/components/data-display/card", label: "Card" },
            { href: "/docs/components/data-display/badge", label: "Badge" },
          ]
        },
      ],
      subcategories: [
        {
          id: "layout-components",
          name: "Layout Components",
          links: [
            { href: "/docs/components/layout/container", label: "Container" },
            { href: "/docs/components/layout/grid", label: "Grid System" },
            { href: "/docs/components/layout/stack", label: "Stack" },
            { href: "/docs/components/layout/divider", label: "Divider" },
          ],
        },
        {
          id: "feedback-components",
          name: "Feedback",
          links: [
            { href: "/docs/components/feedback/alert", label: "Alert" },
            { href: "/docs/components/feedback/toast", label: "Toast" },
            { href: "/docs/components/feedback/modal", label: "Modal" },
            { href: "/docs/components/feedback/drawer", label: "Drawer" },
          ],
        },
      ],
    },
    {
      id: "patterns",
      name: "Design Patterns",
      links: [
        { href: "/docs/patterns/authentication", label: "Authentication" },
        { href: "/docs/patterns/data-fetching", label: "Data Fetching" },
      ],
      subcategories: [
        {
          id: "form-patterns",
          name: "Form Patterns",
          links: [
            { 
              href: "/docs/patterns/forms/basic", 
              label: "Basic Forms",
              subComponents: [
                { href: "/docs/patterns/forms/basic/contact", label: "Contact Form" },
                { href: "/docs/patterns/forms/basic/login", label: "Login Form" },
                { href: "/docs/patterns/forms/basic/signup", label: "Signup Form" },
              ]
            },
            { 
              href: "/docs/patterns/forms/advanced", 
              label: "Advanced Forms",
              subComponents: [
                { href: "/docs/patterns/forms/advanced/multi-step", label: "Multi-step Forms" },
                { href: "/docs/patterns/forms/advanced/conditional", label: "Conditional Fields" },
                { href: "/docs/patterns/forms/advanced/validation", label: "Complex Validation" },
              ]
            },
          ],
          subcategories: [
            {
              id: "validation-patterns",
              name: "Validation Patterns",
              links: [
                { 
                  href: "/docs/patterns/forms/validation/rules", 
                  label: "Validation Rules",
                  subComponents: [
                    { href: "/docs/patterns/forms/validation/rules/required", label: "Required Fields" },
                    { href: "/docs/patterns/forms/validation/rules/format", label: "Format Validation" },
                    { href: "/docs/patterns/forms/validation/rules/custom", label: "Custom Rules" },
                    { href: "/docs/patterns/forms/validation/rules/async", label: "Async Validation" },
                  ]
                },
                { href: "/docs/patterns/forms/validation/messages", label: "Error Messages" },
                { href: "/docs/patterns/forms/validation/timing", label: "Validation Timing" },
              ],
            },
          ],
        },
        {
          id: "navigation-patterns",
          name: "Navigation Patterns",
          links: [
            { href: "/docs/patterns/navigation/breadcrumbs", label: "Breadcrumbs" },
            { href: "/docs/patterns/navigation/pagination", label: "Pagination" },
            { href: "/docs/patterns/navigation/tabs", label: "Tabs" },
          ],
        },
      ],
    },
    {
      id: "api-reference",
      name: "API Reference",
      links: [
        { href: "/docs/api/hooks", label: "Hooks" },
        { href: "/docs/api/utilities", label: "Utilities" },
        { href: "/docs/api/types", label: "TypeScript Types" },
      ],
    },
  ];

  const getDepthLevel = (path: string) => {
    return (path.match(/\//g) || []).length - 1;
  };

  const codeExample = `import { DocsSideNavigation } from "~/components/Docs/Navigation";

// Complex nested structure with multiple levels
const nestedCategories = [
  {
    id: "components",
    name: "Components",
    links: [
      { 
        href: "/docs/components/form", 
        label: "Form Controls",
        subComponents: [
          { href: "/docs/components/form/input", label: "Text Input" },
          { href: "/docs/components/form/select", label: "Select Dropdown" },
        ]
      }
    ],
    subcategories: [
      {
        id: "layout-components",
        name: "Layout Components",
        links: [
          { href: "/docs/components/layout/container", label: "Container" },
          { href: "/docs/components/layout/grid", label: "Grid System" },
        ],
      },
      {
        id: "feedback-components", 
        name: "Feedback",
        links: [
          { href: "/docs/components/feedback/alert", label: "Alert" },
        ],
        subcategories: [
          {
            id: "advanced-feedback",
            name: "Advanced Feedback",
            links: [
              { href: "/docs/components/feedback/advanced/toast", label: "Toast" }
            ]
          }
        ]
      }
    ]
  }
];

export default component$(() => {
  return (
    <DocsSideNavigation
      categories={nestedCategories}
      title="Complex Navigation"
      activePath="/docs/components/form/validation/rules"
      sidebarVisible={true}
    />
  );
});`;

  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Nested Navigation
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Demonstrates the navigation component's ability to handle complex, deeply nested 
          hierarchical structures with multiple levels of categories, subcategories, and sub-components.
        </p>
      </div>

      {/* Navigation Controls */}
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Active Path:
          </label>
          <select
            value={activePath.value}
            onChange$={(_, target) => {
              activePath.value = target.value;
            }}
            class="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="/docs/introduction">Introduction (Level 2)</option>
            <option value="/docs/components/button">Button Component (Level 3)</option>
            <option value="/docs/components/button/primary">Primary Button (Level 4)</option>
            <option value="/docs/components/layout/container">Layout Container (Level 4)</option>
            <option value="/docs/patterns/forms/basic/contact">Contact Form (Level 5)</option>
            <option value="/docs/patterns/forms/validation/rules/required">Required Fields (Level 6)</option>
          </select>
        </div>

        {showDepthIndicator && (
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Depth Level:</span>
            <span class="rounded bg-primary-100 px-2 py-1 font-mono text-primary-800 dark:bg-primary-900/30 dark:text-primary-200">
              {getDepthLevel(activePath.value)}
            </span>
          </div>
        )}
      </div>

      {/* Nested Navigation Demo */}
      <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800" style={{ height: '600px' }}>
        <DocsSideNavigation
          categories={nestedCategories}
          title="Complex Documentation"
          activePath={activePath.value}
          sidebarVisible={true}
          renderFullLayout={true}
        >
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4 dark:border-gray-700">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Nested Navigation Demo
              </h1>
              <div class="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Current:</span>
                <code class="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                  {activePath.value}
                </code>
              </div>
            </div>

            <div class="space-y-4">
              <p class="text-gray-600 dark:text-gray-300">
                This example showcases a complex documentation structure with multiple levels 
                of nesting. The navigation component handles unlimited depth and automatically 
                expands parent categories when a nested item is active.
              </p>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <h3 class="mb-3 font-semibold text-gray-900 dark:text-white">
                    Hierarchy Features
                  </h3>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Categories & Subcategories
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      Links & Sub-components
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                      Unlimited Nesting Depth
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                      Auto-expansion of Active Paths
                    </li>
                  </ul>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <h3 class="mb-3 font-semibold text-gray-900 dark:text-white">
                    Interaction Features
                  </h3>
                  <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Smooth Expand/Collapse
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      Individual Item Control
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                      State Persistence
                    </li>
                    <li class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                      Keyboard Navigation
                    </li>
                  </ul>
                </div>
              </div>

              <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
                <h4 class="mb-2 font-semibold text-info-800 dark:text-info-200">
                  🎯 Try These Interactions
                </h4>
                <ul class="list-disc space-y-1 pl-4 text-sm text-info-700 dark:text-info-300">
                  <li>Click categories to expand/collapse them</li>
                  <li>Navigate to different nested levels using the dropdown</li>
                  <li>Notice how parent categories auto-expand for active items</li>
                  <li>Try keyboard navigation with Tab, Enter, and Arrow keys</li>
                </ul>
              </div>

              <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
                <h4 class="mb-2 font-semibold text-warning-800 dark:text-warning-200">
                  📊 Structure Depth Analysis
                </h4>
                <div class="space-y-2 text-sm text-warning-700 dark:text-warning-300">
                  <div class="flex justify-between">
                    <span>Main Categories:</span>
                    <span class="font-mono">4 items</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Maximum Depth:</span>
                    <span class="font-mono">6 levels</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Total Navigation Items:</span>
                    <span class="font-mono">40+ items</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Subcategories:</span>
                    <span class="font-mono">8 groups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DocsSideNavigation>
      </div>

      {/* Structural Overview */}
      <div class="space-y-2">
        <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
          📋 Navigation Structure Overview
        </h4>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-700 dark:bg-gray-900/50">
          <div class="space-y-1 font-mono text-gray-600 dark:text-gray-300">
            <div>📁 Fundamentals</div>
            <div>📁 Components</div>
            <div class="pl-4">├── 🔗 Button (with 4 sub-components)</div>
            <div class="pl-4">├── 🔗 Form Controls (with 5 sub-components)</div>
            <div class="pl-4">├── 📁 Layout Components</div>
            <div class="pl-4">└── 📁 Feedback</div>
            <div>📁 Design Patterns</div>
            <div class="pl-4">├── 📁 Form Patterns</div>
            <div class="pl-8">└── 📁 Validation Patterns (with nested structure)</div>
            <div class="pl-4">└── 📁 Navigation Patterns</div>
            <div>📁 API Reference</div>
          </div>
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