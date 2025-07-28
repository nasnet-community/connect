import { component$, useSignal } from "@builder.io/qwik";
import { RadioGroup } from "../RadioGroup";

/**
 * Container Query examples showcasing component-level responsive behavior
 * that adapts based on the container size rather than viewport size
 */

export const ContainerBasedResponsivenessExample = component$(() => {
  const layoutChoice = useSignal("grid");

  const layoutOptions = [
    { value: "grid", label: "Grid Layout" },
    { value: "list", label: "List Layout" },
    { value: "cards", label: "Card Layout" },
  ];

  const featureOptions = [
    { value: "responsive", label: "Container-based sizing" },
    { value: "adaptive", label: "Adaptive typography" },
    { value: "density", label: "Smart density adjustments" },
    { value: "spacing", label: "Context-aware spacing" },
  ];

  return (
    <div class="max-w-4xl space-y-8">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Container Query Responsive Behavior
      </h3>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Small Container Demo */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Small Container (300px)
          </h4>
          <div 
            class="w-[300px] rounded-md bg-gray-50 p-4 dark:bg-gray-800"
            style="container-type: inline-size; container-name: small-demo;"
          >
            <RadioGroup
              name="small-container"
              label="Choose Layout"
              helperText="Notice how components adapt to container size"
              options={layoutOptions}
              value={layoutChoice.value}
              onChange$={(value) => {
                layoutChoice.value = value;
              }}
              size="md"
              responsive={true}
              responsiveSizes={{
                mobile: "sm",
                tablet: "md",
                desktop: "lg"
              }}
              spacing={{
                gap: "sm",
                responsive: {
                  mobile: "sm",
                  tablet: "sm",
                  desktop: "md"
                }
              }}
              animation={{
                enabled: true,
                duration: 200,
                easing: "ease-out"
              }}
            />
          </div>
        </div>

        {/* Large Container Demo */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Large Container (500px)
          </h4>
          <div 
            class="w-[500px] rounded-md bg-gray-50 p-4 dark:bg-gray-800"
            style="container-type: inline-size; container-name: large-demo;"
          >
            <RadioGroup
              name="large-container"
              label="Choose Layout"
              helperText="Same component, different container - notice the differences"
              options={layoutOptions}
              value={layoutChoice.value}
              onChange$={(value) => {
                layoutChoice.value = value;
              }}
              size="md"
              responsive={true}
              responsiveSizes={{
                mobile: "md",
                tablet: "lg",
                desktop: "xl"
              }}
              direction="horizontal"
              gridLayout={{
                columns: 3,
                responsive: {
                  mobile: 1,
                  tablet: 2,
                  desktop: 3
                }
              }}
              spacing={{
                gap: "md",
                responsive: {
                  mobile: "sm",
                  tablet: "md",
                  desktop: "lg"
                }
              }}
              animation={{
                enabled: true,
                duration: 250,
                easing: "ease-in-out"
              }}
            />
          </div>
        </div>
      </div>

      {/* Full Width Container with Dynamic Resizing */}
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Dynamic Container Sizing
        </h4>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Resize your browser window to see how container queries adapt the component layout
          based on the available space within this container.
        </p>
        
        <div 
          class="rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-950 dark:to-indigo-950"
          style="container-type: inline-size; container-name: dynamic-demo;"
        >
          <RadioGroup
            name="dynamic-container"
            label="Select Features"
            helperText="Container queries enable component-level responsiveness"
            options={featureOptions}
            value=""
            onChange$={(value) => {
              console.log("Selected feature:", value);
            }}
            size="lg"
            responsive={true}
            responsiveSizes={{
              mobile: "md",
              tablet: "lg",
              desktop: "xl"
            }}
            gridLayout={{
              columns: 2,
              responsive: {
                mobile: 1,
                tablet: 2,
                desktop: 4
              },
              autoFit: true
            }}
            spacing={{
              gap: "lg",
              responsive: {
                mobile: "md",
                tablet: "lg",
                desktop: "xl"
              }
            }}
            staggeredAnimation={true}
            animation={{
              enabled: true,
              duration: 300,
              easing: "ease-out"
            }}
            touchTarget={{
              minSize: 48,
              touchPadding: true,
              responsive: {
                mobile: 52,
                tablet: 48,
                desktop: 44
              }
            }}
          />
        </div>
      </div>
    </div>
  );
});

export const ContainerQueryBreakpointsExample = component$(() => {
  const demoSize = useSignal("small");

  const sizeOptions = [
    { value: "small", label: "Small (250px)" },
    { value: "medium", label: "Medium (400px)" },
    { value: "large", label: "Large (600px)" },
    { value: "xlarge", label: "Extra Large (800px)" },
  ];

  const getContainerWidth = () => {
    switch (demoSize.value) {
      case "small": return "250px";
      case "medium": return "400px";
      case "large": return "600px";
      case "xlarge": return "800px";
      default: return "400px";
    }
  };

  const preferencesOptions = [
    { value: "performance", label: "Performance" },
    { value: "features", label: "Features" },
    { value: "security", label: "Security" },
    { value: "usability", label: "Usability" },
    { value: "accessibility", label: "Accessibility" },
    { value: "compatibility", label: "Compatibility" },
  ];

  return (
    <div class="max-w-3xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Container Query Breakpoints
      </h3>
      
      {/* Container Size Controller */}
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <RadioGroup
          name="container-size"
          label="Adjust Container Size"
          helperText="See how the component below adapts to different container sizes"
          options={sizeOptions}
          value={demoSize.value}
          onChange$={(value) => {
            demoSize.value = value;
          }}
          direction="horizontal"
          size="sm"
          gridLayout={{
            columns: 4,
            responsive: {
              mobile: 2,
              tablet: 4,
              desktop: 4
            }
          }}
          spacing={{ gap: "sm" }}
        />
      </div>

      {/* Dynamic Container Demo */}
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Responsive Component Demo
        </h4>
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Current container width: <strong>{getContainerWidth()}</strong>
        </div>
        
        <div class="flex justify-center">
          <div 
            class="rounded-md bg-gray-50 p-4 transition-all duration-300 ease-in-out dark:bg-gray-800"
            style={`width: ${getContainerWidth()}; container-type: inline-size; container-name: breakpoint-demo;`}
          >
            <RadioGroup
              name="preferences"
              label="Project Priorities"
              helperText="What matters most in your projects?"
              options={preferencesOptions}
              value=""
              onChange$={(value) => {
                console.log("Priority selected:", value);
              }}
              size="md"
              responsive={true}
              responsiveSizes={{
                mobile: "sm",
                tablet: "md",
                desktop: "lg"
              }}
              gridLayout={{
                columns: 2,
                responsive: {
                  mobile: 1,
                  tablet: 2,
                  desktop: 3
                },
                autoFit: false
              }}
              spacing={{
                gap: "md",
                responsive: {
                  mobile: "sm",
                  tablet: "md",
                  desktop: "lg"
                }
              }}
              staggeredAnimation={true}
              animation={{
                enabled: true,
                duration: 250,
                easing: "ease-out"
              }}
              variant="filled"
            />
          </div>
        </div>

        {/* Breakpoint Indicators */}
        <div class="mt-6 space-y-2">
          <h5 class="text-sm font-medium text-gray-900 dark:text-white">
            Container Query Breakpoints:
          </h5>
          <div class="grid grid-cols-2 gap-2 text-xs lg:grid-cols-4">
            <div class={`rounded-md p-2 ${demoSize.value === "small" ? "bg-primary-100 dark:bg-primary-900" : "bg-gray-100 dark:bg-gray-800"}`}>
              <div class="font-medium">@xs (≥20rem)</div>
              <div class="text-gray-600 dark:text-gray-400">≥320px</div>
            </div>
            <div class={`rounded-md p-2 ${demoSize.value === "medium" ? "bg-primary-100 dark:bg-primary-900" : "bg-gray-100 dark:bg-gray-800"}`}>
              <div class="font-medium">@sm (≥24rem)</div>
              <div class="text-gray-600 dark:text-gray-400">≥384px</div>
            </div>
            <div class={`rounded-md p-2 ${demoSize.value === "large" ? "bg-primary-100 dark:bg-primary-900" : "bg-gray-100 dark:bg-gray-800"}`}>
              <div class="font-medium">@md (≥28rem)</div>
              <div class="text-gray-600 dark:text-gray-400">≥448px</div>
            </div>
            <div class={`rounded-md p-2 ${demoSize.value === "xlarge" ? "bg-primary-100 dark:bg-primary-900" : "bg-gray-100 dark:bg-gray-800"}`}>
              <div class="font-medium">@lg (≥32rem)</div>
              <div class="text-gray-600 dark:text-gray-400">≥512px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const NestedContainerExample = component$(() => {
  const sidebarChoice = useSignal("navigation");
  const mainChoice = useSignal("content");

  const sidebarOptions = [
    { value: "navigation", label: "Navigation" },
    { value: "filters", label: "Filters" },
    { value: "tools", label: "Tools" },
  ];

  const mainOptions = [
    { value: "content", label: "Main Content" },
    { value: "dashboard", label: "Dashboard" },
    { value: "analytics", label: "Analytics" },
    { value: "settings", label: "Settings" },
  ];

  return (
    <div class="max-w-5xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Nested Container Queries
      </h3>
      
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <div 
          class="flex gap-6"
          style="container-type: inline-size; container-name: layout-demo;"
        >
          {/* Sidebar Container */}
          <div 
            class="w-64 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
            style="container-type: inline-size; container-name: sidebar;"
          >
            <RadioGroup
              name="sidebar-options"
              label="Sidebar"
              options={sidebarOptions}
              value={sidebarChoice.value}
              onChange$={(value) => {
                sidebarChoice.value = value;
              }}
              size="sm"
              responsive={true}
              responsiveSizes={{
                mobile: "sm",
                tablet: "sm",
                desktop: "md"
              }}
              spacing={{
                gap: "sm",
                responsive: {
                  mobile: "sm",
                  tablet: "sm",
                  desktop: "md"
                }
              }}
              animation={{
                enabled: true,
                duration: 200,
                easing: "ease-out"
              }}
            />
          </div>

          {/* Main Content Container */}
          <div 
            class="flex-1 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
            style="container-type: inline-size; container-name: main-content;"
          >
            <RadioGroup
              name="main-options"
              label="Main Area"
              options={mainOptions}
              value={mainChoice.value}
              onChange$={(value) => {
                mainChoice.value = value;
              }}
              size="md"
              responsive={true}
              responsiveSizes={{
                mobile: "sm",
                tablet: "md",
                desktop: "lg"
              }}
              direction="horizontal"
              gridLayout={{
                columns: 2,
                responsive: {
                  mobile: 1,
                  tablet: 2,
                  desktop: 4
                }
              }}
              spacing={{
                gap: "md",
                responsive: {
                  mobile: "sm",
                  tablet: "md",
                  desktop: "lg"
                }
              }}
              staggeredAnimation={true}
              animation={{
                enabled: true,
                duration: 300,
                easing: "ease-in-out"
              }}
            />
          </div>
        </div>

        {/* Container Information */}
        <div class="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-950">
          <h5 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Container Query Benefits:
          </h5>
          <ul class="space-y-1 text-xs text-blue-800 dark:text-blue-200">
            <li>• Components adapt to their container, not the viewport</li>
            <li>• Better reusability across different layout contexts</li>
            <li>• More predictable responsive behavior</li>
            <li>• Enables truly modular component design</li>
            <li>• Works with CSS Grid, Flexbox, and absolute positioning</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ContainerBasedResponsivenessExample;