import { component$, useStore, $, useSignal, type QRL } from "@builder.io/qwik";
import { CStepper } from "../CStepper";
import type { CStepMeta } from "../types";
import { useStepperContext, createStepperContext } from "../hooks/useStepperContext";

// Define a custom data interface for our stepper
interface UserFormData {
  personal: {
    firstName: string;
    lastName: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  preferences: {
    notifications: boolean;
    theme: "light" | "dark" | "system";
  };
}

// Create a typed context for our stepper
const EnhancedStepperContext = createStepperContext<UserFormData>("enhanced-example");

/**
 * Personal Information Step
 * Demonstrates completing a step using the context directly
 */
const PersonalInfoStep = component$(() => {
  // Get the stepper context
  const stepper = useStepperContext<UserFormData>(EnhancedStepperContext);
  
  // Track form validity
  const isFormValid = useSignal(false);
  
  // Validation function
  const validateForm$ = $(() => {
    const { firstName, lastName } = stepper.data.personal;
    isFormValid.value = Boolean(firstName.trim() && lastName.trim());
    
    // Update step completion based on form validity
    if (isFormValid.value) {
      stepper.updateStepCompletion$(stepper.steps.value[stepper.activeStep.value].id, true);
    } else {
      stepper.updateStepCompletion$(stepper.steps.value[stepper.activeStep.value].id, false);
    }
  });
  
  return (
    <div class="space-y-4">
      <div>
        <label 
          for="firstName" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          First Name
        </label>
        <input 
          id="firstName" 
          type="text" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.personal.firstName}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.personal.firstName = input.value;
            validateForm$();
          }}
        />
      </div>
      
      <div>
        <label 
          for="lastName" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Last Name
        </label>
        <input 
          id="lastName" 
          type="text" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.personal.lastName}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.personal.lastName = input.value;
            validateForm$();
          }}
        />
      </div>
      
      {/* Method 1: Using context.completeStep$ to complete and navigate */}
      <div class="flex justify-end">
        <button
          onClick$={() => {
            if (isFormValid.value) {
              // Mark step as complete and go to next step
              stepper.completeStep$();
              stepper.nextStep$();
            }
          }}
          disabled={!isFormValid.value}
          class={`px-4 py-2 rounded-md ${
            isFormValid.value 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
});

/**
 * Contact Information Step
 * Demonstrates completing a step using the onComplete$ handler
 */
const ContactInfoStep = component$(({ onComplete$ }: { onComplete$?: QRL<(id: number) => void> }) => {
  // Get the stepper context
  const stepper = useStepperContext<UserFormData>(EnhancedStepperContext);
  
  // Track valid email
  const isEmailValid = useSignal(false);
  
  // Validation function
  const validateEmail$ = $((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid.value = emailRegex.test(email);
  });
  
  // Current step ID
  const currentStepId = stepper.steps.value[stepper.activeStep.value].id;
  
  // Handle completion with prop
  const handleComplete$ = $(() => {
    if (isEmailValid.value && onComplete$) {
      onComplete$(currentStepId);
      stepper.nextStep$();
    }
  });
  
  return (
    <div class="space-y-4">
      <div>
        <label 
          for="email" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <input 
          id="email" 
          type="email" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.contact.email}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.contact.email = input.value;
            validateEmail$(input.value);
          }}
        />
      </div>
      
      <div>
        <label 
          for="phone" 
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone Number
        </label>
        <input 
          id="phone" 
          type="tel" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.contact.phone}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.contact.phone = input.value;
          }}
        />
      </div>
      
      {/* Method 2: Using prop-based completion + context for navigation */}
      <div class="flex justify-end space-x-2">
        <button
          onClick$={handleComplete$}
          disabled={!isEmailValid.value}
          class={`px-4 py-2 rounded-md ${
            isEmailValid.value 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
});

/**
 * Preferences Step
 * Demonstrates automatic step completion
 */
const PreferencesStep = component$(() => {
  const stepper = useStepperContext<UserFormData>(EnhancedStepperContext);
  
  // Pre-complete this step when it loads
  return (
    <div class="space-y-4" onMount$={() => stepper.completeStep$()}>
      <div>
        <div class="flex items-center space-x-2">
          <input 
            id="notifications" 
            type="checkbox" 
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
            checked={stepper.data.preferences.notifications}
            onChange$={() => {
              stepper.data.preferences.notifications = !stepper.data.preferences.notifications;
            }}
          />
          <label for="notifications" class="text-sm text-gray-700 dark:text-gray-300">
            Enable notifications
          </label>
        </div>
      </div>
      
      <div>
        <label for="theme" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme Preference
        </label>
        <select
          id="theme"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.preferences.theme}
          onChange$={(ev) => {
            const select = ev.target as HTMLSelectElement;
            stepper.data.preferences.theme = select.value as UserFormData['preferences']['theme'];
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      
      <div class="text-sm text-gray-500 dark:text-gray-400 italic">
        This step is automatically marked as complete when it loads.
      </div>
    </div>
  );
});

/**
 * Summary Step
 * Shows summary of all data collected
 */
const SummaryStep = component$(() => {
  const stepper = useStepperContext<UserFormData>(EnhancedStepperContext);
  
  // Complete this step on mount
  return (
    <div 
      class="space-y-6" 
      onMount$={() => {
        stepper.completeStep$(); 
      }}
    >
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="text-md font-medium mb-2">Personal Information</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">First Name:</div>
          <div class="text-sm font-medium">{stepper.data.personal.firstName}</div>
          
          <div class="text-sm text-gray-500 dark:text-gray-400">Last Name:</div>
          <div class="text-sm font-medium">{stepper.data.personal.lastName}</div>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="text-md font-medium mb-2">Contact Information</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">Email:</div>
          <div class="text-sm font-medium">{stepper.data.contact.email}</div>
          
          <div class="text-sm text-gray-500 dark:text-gray-400">Phone:</div>
          <div class="text-sm font-medium">{stepper.data.contact.phone}</div>
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="text-md font-medium mb-2">Preferences</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">Notifications:</div>
          <div class="text-sm font-medium">
            {stepper.data.preferences.notifications ? 'Enabled' : 'Disabled'}
          </div>
          
          <div class="text-sm text-gray-500 dark:text-gray-400">Theme:</div>
          <div class="text-sm font-medium">
            {stepper.data.preferences.theme.charAt(0).toUpperCase() + 
             stepper.data.preferences.theme.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Enhanced CStepper example component
 * Demonstrates various ways to complete steps
 */
export const EnhancedStepperExample = component$(() => {
  // Initialize form data
  const formData = useStore<UserFormData>({
    personal: {
      firstName: '',
      lastName: '',
    },
    contact: {
      email: '',
      phone: '',
    },
    preferences: {
      notifications: true,
      theme: 'system',
    },
  });
  
  // Define steps
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Personal Info",
      description: "Enter your personal information",
      component: <PersonalInfoStep />,
      isComplete: false
    },
    {
      id: 2,
      title: "Contact Info",
      description: "Enter your contact details",
      component: <ContactInfoStep />,
      isComplete: false
    },
    {
      id: 3,
      title: "Preferences",
      description: "Set your account preferences",
      component: <PreferencesStep />,
      isComplete: false
    },
    {
      id: 4,
      title: "Summary",
      description: "Review your information",
      component: <SummaryStep />,
      isComplete: false
    }
  ];
  
  // Handle step completion
  const handleStepComplete$ = $((id: number) => {
    console.log(`Step ${id} completed via onStepComplete$ prop`);
  });
  
  // Handle form completion
  const handleComplete$ = $(() => {
    console.log('Form completed!', formData);
    alert('Form completed successfully!');
  });
  
  return (
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Enhanced Stepper Example
      </h1>
      
      <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <h2 class="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">
          Demonstration Features
        </h2>
        <ul class="list-disc pl-5 text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>Step 1: Completes via context.completeStep$()</li>
          <li>Step 2: Completes via onStepComplete$ prop</li>
          <li>Step 3: Auto-completes on mount</li>
          <li>Step 4: Shows summary and auto-completes</li>
        </ul>
      </div>
      
      <CStepper
        steps={steps}
        onStepComplete$={handleStepComplete$}
        onComplete$={handleComplete$}
        contextId={EnhancedStepperContext}
        contextValue={formData}
      />
    </div>
  );
}); 