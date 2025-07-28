import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { PlaygroundTemplate, type PlaygroundTemplateProps, type PropertyControl } from "../templates/PlaygroundTemplate";
import { DocsSideNavigation } from "./DocsSideNavigation";

export interface NavigationPlaygroundControl extends PropertyControl {
  key?: string;
}

export interface NavigationPlaygroundProps extends PlaygroundTemplateProps {
  _showCodeGeneration?: boolean;
  _showPresets?: boolean;
}

export const NavigationPlayground = component$<NavigationPlaygroundProps>(({
  _showCodeGeneration = true,
  _showPresets = true,
  ...props
}) => {
  // Playground state
  const config = useStore({
    title: "Documentation",
    sidebarVisible: true,
    renderFullLayout: false,
    activePath: "/docs/components/button",
    categories: "basic", // basic, complex, minimal
    theme: "light", // light, dark
  });

  // Navigation data presets
  const navigationPresets = {
    minimal: [
      {
        id: "docs",
        name: "Documentation", 
        links: [
          { href: "/docs/intro", label: "Introduction" },
          { href: "/docs/setup", label: "Setup" },
        ],
      },
    ],
    basic: [
      {
        id: "getting-started",
        name: "Getting Started",
        links: [
          { href: "/docs/installation", label: "Installation" },
          { href: "/docs/setup", label: "Setup" },
          { href: "/docs/configuration", label: "Configuration" },
        ],
      },
      {
        id: "components",
        name: "Components",
        links: [
          { href: "/docs/components/button", label: "Button" },
          { href: "/docs/components/input", label: "Input" },
          { href: "/docs/components/card", label: "Card" },
        ],
      },
    ],
    complex: [
      {
        id: "fundamentals",
        name: "Fundamentals",
        links: [
          { href: "/docs/introduction", label: "Introduction" },
          { href: "/docs/installation", label: "Installation" },
          { href: "/docs/theming", label: "Theming" },
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
              { href: "/docs/components/button/variants", label: "Variants" },
              { href: "/docs/components/button/sizes", label: "Sizes" },
            ]
          },
          { 
            href: "/docs/components/form", 
            label: "Form Controls",
            subComponents: [
              { href: "/docs/components/form/input", label: "Input" },
              { href: "/docs/components/form/select", label: "Select" },
            ]
          },
        ],
        subcategories: [
          {
            id: "layout",
            name: "Layout",
            links: [
              { href: "/docs/components/container", label: "Container" },
              { href: "/docs/components/grid", label: "Grid" },
            ],
          },
        ],
      },
    ],
  };

  // Control definitions for the playground template
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "title",
      label: "Title",
      defaultValue: "Documentation",
    },
    {
      type: "boolean", 
      name: "sidebarVisible",
      label: "Sidebar Visible",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "renderFullLayout",
      label: "Full Layout",
      defaultValue: false,
    },
    {
      type: "select",
      name: "categories",
      label: "Navigation Data",
      defaultValue: "basic",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Basic", value: "basic" },
        { label: "Complex", value: "complex" }
      ],
    },
    {
      type: "select",
      name: "activePath",
      label: "Active Path",
      defaultValue: "/docs/components/button",
      options: [
        { label: "Introduction", value: "/docs/intro" },
        { label: "Installation", value: "/docs/installation" },
        { label: "Setup", value: "/docs/setup" },
        { label: "Button Component", value: "/docs/components/button" },
        { label: "Input Component", value: "/docs/components/input" },
        { label: "Form Input", value: "/docs/components/form/input" }
      ],
    },
    {
      type: "select",
      name: "theme",
      label: "Theme",
      defaultValue: "light",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ],
    },
  ];

  // Create a custom render function for the playground
  const renderNavigationComponent = $((props: any) => {
    const categories = navigationPresets[props.categories as keyof typeof navigationPresets];
    
    return (
      <div 
        class={`h-80 w-full border border-gray-200 dark:border-gray-700 ${
          props.theme === 'dark' ? 'dark' : ''
        }`}
        data-theme={props.theme}
      >
        <DocsSideNavigation
          categories={categories}
          title={props.title}
          activePath={props.activePath}
          sidebarVisible={props.sidebarVisible}
          renderFullLayout={props.renderFullLayout}
        >
          {props.renderFullLayout && (
            <div class="space-y-4">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                Live Preview
              </h1>
              <p class="text-gray-600 dark:text-gray-300">
                Interactive navigation component responding to your configuration changes.
              </p>
            </div>
          )}
        </DocsSideNavigation>
      </div>
    );
  });

  // Generate code for current configuration
  const codeSignal = useSignal("");
  
  // Update code when config changes - kept for future development
  const _updateCode = $(() => {
    const categories = navigationPresets[config.categories as keyof typeof navigationPresets];
    codeSignal.value = `import { DocsSideNavigation } from "~/components/Docs/Navigation";

const categories = ${JSON.stringify(categories, null, 2)};

export default component$(() => {
  return (
    <DocsSideNavigation
      categories={categories}
      title="${config.title}"
      activePath="${config.activePath}"
      sidebarVisible={${config.sidebarVisible}}
      renderFullLayout={${config.renderFullLayout}}
    />
  );
});`;
  });

  return (
    <PlaygroundTemplate
      properties={properties}
      renderComponent={renderNavigationComponent}
      initialProps={{
        title: "Documentation",
        sidebarVisible: true,
        renderFullLayout: false,
        categories: "basic",
        activePath: "/docs/components/button",
        theme: "light"
      }}
      code={codeSignal}
      {...props}
    >
      <div class="space-y-4">
        <p>
          Interactive playground for the Navigation component. Adjust the controls to see how 
          different configurations affect the component's behavior and appearance.
        </p>

        <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
          <h4 class="mb-2 font-semibold text-info-800 dark:text-info-200">
            Playground Features
          </h4>
          <ul class="list-disc space-y-1 pl-4 text-sm text-info-700 dark:text-info-300">
            <li>Real-time configuration updates</li>
            <li>Multiple navigation data presets</li>
            <li>Theme switching (light/dark)</li>
            <li>Layout mode comparison</li>
            <li>Code generation for current configuration</li>
          </ul>
        </div>

        <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
          <h4 class="mb-2 font-semibold text-warning-800 dark:text-warning-200">
            How to Use
          </h4>
          <ul class="list-disc space-y-1 pl-4 text-sm text-warning-700 dark:text-warning-300">
            <li>Modify controls to see real-time changes</li>
            <li>Try different navigation data structures</li>
            <li>Test responsive behavior and theme switching</li>
            <li>Copy generated code for your implementation</li>
          </ul>
        </div>
      </div>
    </PlaygroundTemplate>
  );
});