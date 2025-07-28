import { component$, useSignal } from "@builder.io/qwik";

export const CustomColorsExample = component$(() => {
  const color = useSignal("blue");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Custom Color Themes
      </h3>
      
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Choose Brand Color
        </legend>
        
        {/* Blue Theme */}
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input
              type="radio"
              id="color-blue"
              name="color-theme"
              value="blue"
              checked={color.value === "blue"}
              onChange$={() => (color.value = "blue")}
              class="sr-only"
            />
            <label
              for="color-blue"
              class={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 ${
                color.value === "blue"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              {color.value === "blue" && (
                <div class="h-2 w-2 rounded-full bg-white"></div>
              )}
            </label>
          </div>
          <span class="text-sm text-gray-700 dark:text-gray-300">Blue Theme</span>
        </div>
        
        {/* Green Theme */}
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input
              type="radio"
              id="color-green"
              name="color-theme"
              value="green"
              checked={color.value === "green"}
              onChange$={() => (color.value = "green")}
              class="sr-only"
            />
            <label
              for="color-green"
              class={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 ${
                color.value === "green"
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              {color.value === "green" && (
                <div class="h-2 w-2 rounded-full bg-white"></div>
              )}
            </label>
          </div>
          <span class="text-sm text-gray-700 dark:text-gray-300">Green Theme</span>
        </div>
        
        {/* Purple Theme */}
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input
              type="radio"
              id="color-purple"
              name="color-theme"
              value="purple"
              checked={color.value === "purple"}
              onChange$={() => (color.value = "purple")}
              class="sr-only"
            />
            <label
              for="color-purple"
              class={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 ${
                color.value === "purple"
                  ? "border-purple-500 bg-purple-500"
                  : "border-gray-300 hover:border-purple-300"
              }`}
            >
              {color.value === "purple" && (
                <div class="h-2 w-2 rounded-full bg-white"></div>
              )}
            </label>
          </div>
          <span class="text-sm text-gray-700 dark:text-gray-300">Purple Theme</span>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Color: <span class="font-medium">{color.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Custom styled radio buttons with brand colors
        </p>
      </div>
    </div>
  );
});

export const CardStyleExample = component$(() => {
  const plan = useSignal("standard");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Card-Style Radio Options
      </h3>
      
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Subscription Plan
        </legend>
        
        {/* Basic Plan */}
        <div class="relative">
          <input
            type="radio"
            id="plan-basic"
            name="subscription-plan"
            value="basic"
            checked={plan.value === "basic"}
            onChange$={() => (plan.value = "basic")}
            class="sr-only peer"
          />
          <label
            for="plan-basic"
            class="flex cursor-pointer flex-col rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
          >
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">Basic Plan</h4>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">$9</span>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Perfect for individuals getting started
            </p>
            <ul class="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• 10 GB storage</li>
              <li>• Basic support</li>
              <li>• Core features</li>
            </ul>
          </label>
        </div>
        
        {/* Standard Plan */}
        <div class="relative">
          <input
            type="radio"
            id="plan-standard"
            name="subscription-plan"
            value="standard"
            checked={plan.value === "standard"}
            onChange$={() => (plan.value = "standard")}
            class="sr-only peer"
          />
          <label
            for="plan-standard"
            class="flex cursor-pointer flex-col rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Standard Plan</h4>
                <span class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Popular
                </span>
              </div>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">$19</span>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Best for growing teams and businesses
            </p>
            <ul class="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• 100 GB storage</li>
              <li>• Priority support</li>
              <li>• Advanced features</li>
              <li>• Team collaboration</li>
            </ul>
          </label>
        </div>
        
        {/* Premium Plan */}
        <div class="relative">
          <input
            type="radio"
            id="plan-premium"
            name="subscription-plan"
            value="premium"
            checked={plan.value === "premium"}
            onChange$={() => (plan.value = "premium")}
            class="sr-only peer"
          />
          <label
            for="plan-premium"
            class="flex cursor-pointer flex-col rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
          >
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">Premium Plan</h4>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">$49</span>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enterprise-grade features and support
            </p>
            <ul class="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Unlimited storage</li>
              <li>• 24/7 dedicated support</li>
              <li>• Enterprise features</li>
              <li>• Custom integrations</li>
              <li>• SLA guarantee</li>
            </ul>
          </label>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Plan: <span class="font-medium">{plan.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Card-style radios with rich content and hover effects
        </p>
      </div>
    </div>
  );
});

export const ButtonStyleExample = component$(() => {
  const size = useSignal("md");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Button-Style Radio Group
      </h3>
      
      <fieldset>
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Choose Size
        </legend>
        
        <div class="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <input
            type="radio"
            id="size-sm"
            name="button-size"
            value="sm"
            checked={size.value === "sm"}
            onChange$={() => (size.value = "sm")}
            class="sr-only peer/sm"
          />
          <label
            for="size-sm"
            class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 peer-checked/sm:bg-white peer-checked/sm:text-gray-900 peer-checked/sm:shadow-sm dark:text-gray-400 dark:hover:text-gray-200 dark:peer-checked/sm:bg-gray-700 dark:peer-checked/sm:text-white"
          >
            Small
          </label>
          
          <input
            type="radio"
            id="size-md"
            name="button-size"
            value="md"
            checked={size.value === "md"}
            onChange$={() => (size.value = "md")}
            class="sr-only peer/md"
          />
          <label
            for="size-md"
            class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 peer-checked/md:bg-white peer-checked/md:text-gray-900 peer-checked/md:shadow-sm dark:text-gray-400 dark:hover:text-gray-200 dark:peer-checked/md:bg-gray-700 dark:peer-checked/md:text-white"
          >
            Medium
          </label>
          
          <input
            type="radio"
            id="size-lg"
            name="button-size"
            value="lg"
            checked={size.value === "lg"}
            onChange$={() => (size.value = "lg")}
            class="sr-only peer/lg"
          />
          <label
            for="size-lg"
            class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 peer-checked/lg:bg-white peer-checked/lg:text-gray-900 peer-checked/lg:shadow-sm dark:text-gray-400 dark:hover:text-gray-200 dark:peer-checked/lg:bg-gray-700 dark:peer-checked/lg:text-white"
          >
            Large
          </label>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Size: <span class="font-medium">{size.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Button-style radio group with seamless selection
        </p>
      </div>
    </div>
  );
});

export const IconRadioExample = component$(() => {
  const view = useSignal("grid");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Icon-Based Radio Buttons
      </h3>
      
      <fieldset>
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          View Mode
        </legend>
        
        <div class="flex space-x-2">
          {/* Grid View */}
          <div class="relative">
            <input
              type="radio"
              id="view-grid"
              name="view-mode"
              value="grid"
              checked={view.value === "grid"}
              onChange$={() => (view.value = "grid")}
              class="sr-only peer"
            />
            <label
              for="view-grid"
              class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
            >
              <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">Grid</span>
            </label>
          </div>
          
          {/* List View */}
          <div class="relative">
            <input
              type="radio"
              id="view-list"
              name="view-mode"
              value="list"
              checked={view.value === "list"}
              onChange$={() => (view.value = "list")}
              class="sr-only peer"
            />
            <label
              for="view-list"
              class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
            >
              <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span class="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">List</span>
            </label>
          </div>
          
          {/* Card View */}
          <div class="relative">
            <input
              type="radio"
              id="view-card"
              name="view-mode"
              value="card"
              checked={view.value === "card"}
              onChange$={() => (view.value = "card")}
              class="sr-only peer"
            />
            <label
              for="view-card"
              class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20"
            >
              <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span class="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">Card</span>
            </label>
          </div>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected View: <span class="font-medium">{view.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Icon-based radio buttons for visual selection
        </p>
      </div>
    </div>
  );
});

export const GradientStyleExample = component$(() => {
  const priority = useSignal("medium");

  const getPriorityStyle = (value: string, selected: boolean) => {
    const baseClasses = "relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-200";
    
    if (value === "low") {
      return selected 
        ? `${baseClasses} border-green-300 bg-gradient-to-br from-green-50 to-green-100 dark:border-green-600 dark:from-green-900/30 dark:to-green-800/30`
        : `${baseClasses} border-gray-200 bg-white hover:border-green-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-700`;
    }
    
    if (value === "medium") {
      return selected 
        ? `${baseClasses} border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:border-yellow-600 dark:from-yellow-900/30 dark:to-yellow-800/30`
        : `${baseClasses} border-gray-200 bg-white hover:border-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-yellow-700`;
    }
    
    if (value === "high") {
      return selected 
        ? `${baseClasses} border-red-300 bg-gradient-to-br from-red-50 to-red-100 dark:border-red-600 dark:from-red-900/30 dark:to-red-800/30`
        : `${baseClasses} border-gray-200 bg-white hover:border-red-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-700`;
    }
    
    return baseClasses;
  };

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Gradient-Style Radio Options
      </h3>
      
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Task Priority
        </legend>
        
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Low Priority */}
          <div class="relative">
            <input
              type="radio"
              id="priority-low"
              name="task-priority"
              value="low"
              checked={priority.value === "low"}
              onChange$={() => (priority.value = "low")}
              class="sr-only"
            />
            <label
              for="priority-low"
              class={getPriorityStyle("low", priority.value === "low")}
            >
              <div class="flex items-center justify-center space-x-2">
                <div class="h-3 w-3 rounded-full bg-green-500"></div>
                <span class="font-medium text-gray-900 dark:text-white">Low</span>
              </div>
              <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Can wait
              </p>
            </label>
          </div>
          
          {/* Medium Priority */}
          <div class="relative">
            <input
              type="radio"
              id="priority-medium"
              name="task-priority"
              value="medium"
              checked={priority.value === "medium"}
              onChange$={() => (priority.value = "medium")}
              class="sr-only"
            />
            <label
              for="priority-medium"
              class={getPriorityStyle("medium", priority.value === "medium")}
            >
              <div class="flex items-center justify-center space-x-2">
                <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span class="font-medium text-gray-900 dark:text-white">Medium</span>
              </div>
              <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Normal
              </p>
            </label>
          </div>
          
          {/* High Priority */}
          <div class="relative">
            <input
              type="radio"
              id="priority-high"
              name="task-priority"
              value="high"
              checked={priority.value === "high"}
              onChange$={() => (priority.value = "high")}
              class="sr-only"
            />
            <label
              for="priority-high"
              class={getPriorityStyle("high", priority.value === "high")}
            >
              <div class="flex items-center justify-center space-x-2">
                <div class="h-3 w-3 rounded-full bg-red-500"></div>
                <span class="font-medium text-gray-900 dark:text-white">High</span>
              </div>
              <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Urgent
              </p>
            </label>
          </div>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Priority: <span class="font-medium">{priority.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Custom gradient styling with color-coded priority levels
        </p>
      </div>
    </div>
  );
});

export default CustomColorsExample;