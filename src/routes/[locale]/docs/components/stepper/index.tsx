import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import { HiChevronLeftOutline, HiCodeBracketOutline, HiPlayOutline, HiCubeOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  
  const tabs = [
    { id: "overview", label: "Overview", icon: HiCubeOutline },
    { id: "examples", label: "Examples", icon: HiPlayOutline },
    { id: "api", label: "API", icon: HiCodeBracketOutline }
  ];

  return (
    <div>
      <div class="mb-8">
        <Link 
          href={`/${locale}/docs/components`}
          class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-4"
        >
          <HiChevronLeftOutline class="h-4 w-4 mr-1" />
          Back to Components
        </Link>
        
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Stepper Component</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-3xl">
          Guide users through multi-step processes with configurable, accessible stepper components
        </p>
      </div>
      
      {/* Tab navigation */}
      <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav class="flex space-x-8">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              class={{
                "py-3 px-1 border-b-2 font-medium flex items-center gap-2": true,
                "border-primary-500 text-primary-600 dark:text-primary-400": tab.id === "overview",
                "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600": tab.id !== "overview"
              }}
            >
              <tab.icon class="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Overview section */}
      <section class="mb-12">
        <Card variant="elevated">
          <div class="prose dark:prose-invert max-w-none">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
            <p>
              The Stepper component helps guide users through multi-step processes such as onboarding flows, 
              checkout processes, or any workflow that requires structured progression through multiple stages.
              Each step can contain custom content while the stepper manages navigation and state.
            </p>
            
            <h3>Key Features</h3>
            <ul>
              <li>Three layout variations: Content-focused (CStepper), Horizontal (HStepper), and Vertical (VStepper)</li>
              <li>Customizable step content and navigation controls</li>
              <li>Built-in state management for step completion</li>
              <li>Keyboard navigation and screen reader accessibility</li>
              <li>Visual indication of progress and active step</li>
              <li>Optional step validation with error handling</li>
              <li>Context API for state sharing across step components</li>
              <li>Support for linear and non-linear navigation patterns</li>
            </ul>
          </div>
        </Card>
      </section>
      
      {/* Examples section */}
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <HiPlayOutline class="h-6 w-6 mr-2 text-primary-500" />
          Stepper Variants
        </h2>
        
        <div class="space-y-8">
          {/* CStepper Example */}
          <Card variant="elevated">
            <div q:slot="header" class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Content Stepper (CStepper)</h3>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                Recommended
              </span>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Content-focused stepper with top navigation, ideal for form-based wizards and guided experiences 
                where the content is the main focus.
              </p>
              <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div class="text-center text-gray-500 dark:text-gray-400 py-6">
                  [CStepper Example Preview]
                </div>
              </div>
            </div>
          </Card>
          
          {/* HStepper Example */}
          <Card variant="elevated">
            <div q:slot="header" class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Horizontal Stepper (HStepper)</h3>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                Fullscreen
              </span>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Full-screen stepper with horizontal navigation, perfect for onboarding experiences and
                guided tours where each step takes the full viewport.
              </p>
              <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div class="text-center text-gray-500 dark:text-gray-400 py-6">
                  [HStepper Example Preview]
                </div>
              </div>
            </div>
          </Card>
          
          {/* VStepper Example */}
          <Card variant="elevated">
            <div q:slot="header" class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Vertical Stepper (VStepper)</h3>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                Scrollable
              </span>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Vertical layout with steps stacked in a single scrollable view, best for mobile interfaces
                or when you want to show all steps in a single view for easy comparison.
              </p>
              <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div class="text-center text-gray-500 dark:text-gray-400 py-6">
                  [VStepper Example Preview]
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* API section */}
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <HiCodeBracketOutline class="h-6 w-6 mr-2 text-primary-500" />
          API Reference
        </h2>
        
        <Card variant="elevated">
          <div q:slot="header" class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">CStepper Props</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Default</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">steps</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">CStepMeta[]</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Array of step metadata including titles, descriptions, and components</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">extraSteps</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">CStepMeta[]</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">undefined</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Additional steps that can be added dynamically</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">activeStep</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">0</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Index of the initially active step</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">onStepComplete$</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">QRL{`<(id: number) => void>`}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">undefined</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when a step is completed</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">onStepChange$</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">QRL{`<(id: number) => void>`}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">undefined</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when the active step changes</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">onComplete$</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">QRL{`<() => void>`}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">undefined</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when all steps are completed</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">contextId</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ContextId{`<any>`}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">CStepperContextId</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Custom context ID for stepper state</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">contextValue</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">any</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{}</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Custom data to be shared across steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        
        <div class="mt-8">
          <Card variant="elevated">
            <div q:slot="header" class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Step Definition (CStepMeta)</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Required</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">id</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yes</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Unique identifier for the step</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">title</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yes</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Title displayed in the stepper</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">description</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yes</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Short description of the step</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">component</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">JSX.Element</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yes</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Component to render for this step</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">isComplete</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yes</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the step is completed</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">isDisabled</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the step is disabled</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">isHidden</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the step is hidden from view</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">isOptional</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the step is optional</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">validationErrors</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string[]</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No</td>
                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Array of validation error messages</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Usage section */}
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <HiCodeBracketOutline class="h-6 w-6 mr-2 text-primary-500" />
          Usage
        </h2>
        
        <Card variant="elevated" noPadding>
          <div class="bg-gray-900 rounded-lg">
            <div class="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div class="text-sm font-medium text-gray-200">Basic Example</div>
              <div class="flex space-x-2">
                <div class="h-3 w-3 rounded-full bg-red-500"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div class="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre class="p-4 text-gray-300 overflow-x-auto">
              <code class="language-tsx text-sm">{`import { component$, $ } from "@builder.io/qwik";
import { CStepper } from "~/components/Core/Stepper/CStepper/CStepper";
import type { CStepMeta } from "~/components/Core/Stepper/CStepper/types";

// Define step components
const Step1 = component$(() => {
  return <div class="p-4">Content for step 1</div>;
});

const Step2 = component$(() => {
  return <div class="p-4">Content for step 2</div>;
});

const Step3 = component$(() => {
  return <div class="p-4">Content for step 3</div>;
});

export default component$(() => {
  // Initialize steps with their components
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Step 1",
      description: "First step description",
      component: <Step1 />,
      isComplete: false
    },
    {
      id: 2,
      title: "Step 2",
      description: "Second step description",
      component: <Step2 />,
      isComplete: false
    },
    {
      id: 3,
      title: "Step 3",
      description: "Third step description",
      component: <Step3 />,
      isComplete: false
    }
  ];
  
  // Define handlers
  const handleComplete$ = $(() => {
    console.log("All steps completed!");
  });
  
  return (
    <div class="max-w-3xl mx-auto">
      <CStepper 
        steps={steps}
        activeStep={0}
        onComplete$={handleComplete$}
      />
    </div>
  );
});`}</code>
            </pre>
          </div>
        </Card>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card variant="elevated">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step Context</h3>
            <p class="text-gray-600 dark:text-gray-300">
              The CStepper provides a context API for sharing state between steps. Use 
              <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded mx-1">createStepperContext</code> 
              and <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded mx-1">useStepperContext</code> 
              to access and manipulate stepper state from within step components.
            </p>
          </Card>
          
          <Card variant="elevated">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility</h3>
            <p class="text-gray-600 dark:text-gray-300">
              The Stepper components are built with accessibility in mind, featuring proper 
              ARIA attributes, keyboard navigation, and focus management. Step progression announcements
              are provided for screen readers through an invisible live region.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}); 