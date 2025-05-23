import { component$, useStore, useSignal, $ } from "@builder.io/qwik";
import { CStepper } from "../CStepper";
import type { CStepMeta } from "../types";
import { useStepperContext, createStepperContext } from "../hooks/useStepperContext";

// Create a custom context ID for this example
const ExampleStepperContextId = createStepperContext<{ userData: { name: string, email: string } }>("example-stepper");

const Step1 = component$(() => {
  // Get the context
  const stepper = useStepperContext(ExampleStepperContextId);
  
  return (
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
        <input 
          id="name" 
          type="text" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.userData.name}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.userData.name = input.value;
            
            // Mark step as complete if name is not empty
            if (stepper.data.userData.name.length > 0) {
              stepper.updateStepCompletion$(1, true);
            } else {
              stepper.updateStepCompletion$(1, false);
            }
          }}
        />
      </div>
      
      {/* Example of using the new completeStep$ function with a button */}
      <button 
        onClick$={() => {
          if (stepper.data.userData.name.length > 0) {
            stepper.completeStep$(); // Complete current step
            stepper.nextStep$(); // Move to next step
          }
        }}
        disabled={stepper.data.userData.name.length === 0}
        class="px-4 py-2 bg-primary-500 text-white rounded-md
              disabled:bg-gray-300 disabled:text-gray-500"
      >
        Complete and Continue
      </button>
    </div>
  );
});

const Step2 = component$(() => {
  // Get the context
  const stepper = useStepperContext(ExampleStepperContextId);
  
  return (
    <div class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
        <input 
          id="email" 
          type="email" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={stepper.data.userData.email}
          onInput$={(ev) => {
            const input = ev.target as HTMLInputElement;
            stepper.data.userData.email = input.value;
            
            // Use regex to validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(input.value);
            
            // Update step completion based on validation
            stepper.updateStepCompletion$(2, isValid);
          }}
        />
      </div>
      
      {/* Alternative completion method with completeStep$ */}
      <button 
        onClick$={() => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(stepper.data.userData.email)) {
            stepper.completeStep$(2); // Explicitly complete step 2
          }
        }}
        class="px-4 py-2 bg-primary-500 text-white rounded-md
              disabled:bg-gray-300 disabled:text-gray-500"
      >
        Validate Email
      </button>
    </div>
  );
});

const Step3 = component$(() => {
  // Get the context
  const stepper = useStepperContext(ExampleStepperContextId);
  const agreedToTerms = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div>
        <div class="text-lg font-medium">Review and Submit</div>
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <div><strong>Name:</strong> {stepper.data.userData.name}</div>
          <div><strong>Email:</strong> {stepper.data.userData.email}</div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          id="terms" 
          type="checkbox" 
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
          checked={agreedToTerms.value}
          onChange$={() => {
            agreedToTerms.value = !agreedToTerms.value;
            
            // Update step completion based on checkbox
            stepper.updateStepCompletion$(3, agreedToTerms.value);
          }}
        />
        <label for="terms" class="text-sm text-gray-700 dark:text-gray-300">
          I agree to terms and conditions
        </label>
      </div>
      
      {/* Optional automatic step completion */}
      <button 
        onClick$={() => {
          if (!agreedToTerms.value) {
            agreedToTerms.value = true;
            stepper.completeStep$(); // Complete the current step
          }
        }}
        disabled={agreedToTerms.value}
        class="px-4 py-2 bg-primary-500 text-white rounded-md
              disabled:bg-gray-300 disabled:text-gray-500"
      >
        Agree and Complete
      </button>
    </div>
  );
});

export const CStepperExample =  component$(() => {
  // Initialize steps with their components
  const initialSteps: CStepMeta[] = [
    {
      id: 1,
      title: "Personal Info",
      description: "Enter your personal information",
      component: <Step1 />,
      isComplete: false
    },
    {
      id: 2,
      title: "Contact",
      description: "Enter your contact information",
      component: <Step2 />,
      isComplete: false
    },
    {
      id: 3,
      title: "Review",
      description: "Review and submit your information",
      component: <Step3 />,
      isComplete: false
    }
  ];
  
  // Setup user data
  const userData = useStore({
    name: "",
    email: ""
  });
  
  // Define handlers
  const handleStepComplete$ = $((id: number) => {
    console.log(`Step ${id} completed`);
  });
  
  const handleStepChange$ = $((id: number) => {
    console.log(`Changed to step ${id}`);
  });
  
  const handleComplete$ = $(() => {
    console.log("All steps completed!", userData);
    alert(`Form completed!\nName: ${userData.name}\nEmail: ${userData.email}`);
  });
  
  return (
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Stepper Example with Context
      </h1>
      
      <CStepper 
        steps={initialSteps}
        activeStep={0}
        onStepComplete$={handleStepComplete$}
        onStepChange$={handleStepChange$}
        onComplete$={handleComplete$}
        contextId={ExampleStepperContextId}
        contextValue={{ userData }}
      />
    </div>
  );
});