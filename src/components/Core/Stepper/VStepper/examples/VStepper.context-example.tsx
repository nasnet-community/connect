import { component$, useStore, $ } from "@builder.io/qwik";
import { VStepper } from "../VStepper";
import type { StepItem } from "../types";
import { 
  createVStepperContext, 
  useVStepperContext,
  useProvideVStepperContext 
} from "../hooks/useVStepperContext";

// Define data interface for our stepper context
interface FormData {
  personalInfo: {
    name: string;
    email: string;
  };
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

// Create a context ID for our stepper
const FormStepperContext = createVStepperContext<FormData>("form-stepper");

// Step 1 Component
const PersonalInfoStep = component$(() => {
  const context = useVStepperContext<FormData>(FormStepperContext);
  
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Personal Information</h2>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input 
          type="text" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={context.data.personalInfo.name}
          onInput$={(_, el) => {
            context.data.personalInfo.name = el.value;
            
            // Complete step if name is provided
            if (el.value.trim()) {
              context.completeStep$(1);
            }
          }}
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input 
          type="email" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={context.data.personalInfo.email}
          onInput$={(_, el) => {
            context.data.personalInfo.email = el.value;
          }}
        />
      </div>
      
      <button
        class="bg-primary-500 text-white px-4 py-2 rounded-md"
        onClick$={() => {
          if (context.data.personalInfo.name && context.data.personalInfo.email) {
            context.completeStep$();
            context.nextStep$();
          }
        }}
      >
        Complete & Continue
      </button>
    </div>
  );
});

// Step 2 Component
const PreferencesStep = component$(() => {
  const context = useVStepperContext<FormData>(FormStepperContext);
  
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Preferences</h2>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Theme
        </label>
        <select 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={context.data.preferences.theme}
          onChange$={(_, el) => {
            context.data.preferences.theme = el.value;
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="notifications"
          checked={context.data.preferences.notifications}
          onChange$={() => {
            context.data.preferences.notifications = !context.data.preferences.notifications;
          }}
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Enable notifications
        </label>
      </div>
      
      <button
        class="bg-primary-500 text-white px-4 py-2 rounded-md"
        onClick$={() => {
          context.completeStep$();
        }}
      >
        Complete Step
      </button>
    </div>
  );
});

// Summary Step Component
const SummaryStep = component$(() => {
  const context = useVStepperContext<FormData>(FormStepperContext);
  
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Summary</h2>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="font-medium mb-2">Personal Information</h3>
        <p>Name: {context.data.personalInfo.name}</p>
        <p>Email: {context.data.personalInfo.email}</p>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="font-medium mb-2">Preferences</h3>
        <p>Theme: {context.data.preferences.theme}</p>
        <p>Notifications: {context.data.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
      </div>
      
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick$={() => {
          context.completeStep$();
          alert('Form completed successfully!');
        }}
      >
        Submit Form
      </button>
    </div>
  );
});

// Wrapper component that sets up context
const VStepperContextWrapper = component$((props: { 
  steps: StepItem[]; 
  data: FormData; 
  onComplete$?: any;
}) => {
  const scrollToStep$ = $((index: number) => {
    const element = document.getElementById(`step-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Provide context
  useProvideVStepperContext(
    FormStepperContext,
    props.steps,
    0,
    props.data,
    scrollToStep$
  );

  return (
    <VStepper 
      steps={props.steps}
      onComplete$={props.onComplete$}
      allowStepNavigation={true}
    />
  );
});

// Main example component
export const VStepperContextExample = component$(() => {
  // Initialize form data
  const formData = useStore<FormData>({
    personalInfo: {
      name: "",
      email: ""
    },
    preferences: {
      theme: "system",
      notifications: true
    }
  });

  // Define steps
  const steps: StepItem[] = [
    {
      id: 1,
      title: "Personal Info",
      component: PersonalInfoStep,
      isComplete: false
    },
    {
      id: 2,
      title: "Preferences",
      component: PreferencesStep,
      isComplete: false
    },
    {
      id: 3,
      title: "Summary",
      component: SummaryStep,
      isComplete: false
    }
  ];

  return (
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        VStepper Context Example
      </h1>
      
      <VStepperContextWrapper 
        steps={steps}
        data={formData}
        onComplete$={() => console.log('Form completed!', formData)}
      />
    </div>
  );
}); 