# CStepper Component

A customizable, multi-step form component for Qwik applications with context-based state management.

## Features

- Multi-step navigation with progress indication
- Step completion tracking
- Context-based state sharing between steps
- Mobile-responsive design
- Dark mode support
- Customizable via props and context
- Step management (add, remove, reorder steps) with edit mode

## Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper/CStepper";

export default component$(() => {
  // Define your steps
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Step 1",
      description: "First step description",
      component: <Step1Component />,
      isComplete: false
    },
    {
      id: 2,
      title: "Step 2",
      description: "Second step description",
      component: <Step2Component />,
      isComplete: false
    },
    {
      id: 3,
      title: "Step 3",
      description: "Third step description",
      component: <Step3Component />,
      isComplete: false
    }
  ];
  
  return (
    <CStepper 
      steps={steps}
      onStepComplete$={(id) => console.log(`Step ${id} completed`)}
      onStepChange$={(id) => console.log(`Changed to step ${id}`)}
      onComplete$={() => console.log("All steps completed!")}
    />
  );
});
```

## Step Management Features

You can enable step management in your CStepper to allow users to add, remove, and reorder steps:

```tsx
<CStepper 
  steps={steps}
  isEditMode={true} // Enable step management UI
  // other props...
/>
```

When `isEditMode` is enabled, the CStepper component will display a management panel that allows users to:

1. Add new steps with title and description
2. Reorder steps by moving them up and down
3. Remove steps from the workflow
4. Customize where to insert new steps

## Dynamic Steps Example

You can also programmatically add, remove, or reorder steps. Here's an example:

```tsx
import { component$, useSignal, $ } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper/CStepper";

export default component$(() => {
  // Track the steps array
  const steps = useSignal<CStepMeta[]>([
    {
      id: 1,
      title: "First Step",
      description: "This is the first step",
      component: <StepContent />,
      isComplete: false
    },
    {
      id: 2,
      title: "Second Step",
      description: "This is the second step",
      component: <StepContent />,
      isComplete: false
    }
  ]);
  
  // Function to add a new step
  const addStep = $(() => {
    const newStep: CStepMeta = {
      id: steps.value.length + 1,
      title: `Step ${steps.value.length + 1}`,
      description: `This is step ${steps.value.length + 1}`,
      component: <StepContent />,
      isComplete: false
    };
    
    // Add to steps array
    steps.value = [...steps.value, newStep];
  });
  
  return (
    <div>
      <button onClick$={addStep}>Add New Step</button>
      
      <CStepper 
        steps={steps.value}
        onComplete$={() => alert("All steps completed!")}
      />
    </div>
  );
});
```

## Using with Context

For more complex use cases where you need to share data between steps, you can use the context-based approach:

```tsx
import { component$ } from "@builder.io/qwik";
import { 
  CStepper, 
  createStepperContext, 
  useStepperContext, 
  type CStepMeta 
} from "~/components/Core/Stepper/CStepper";

// Create a typed context for your stepper
const MyStepperContext = createStepperContext<{ userData: { name: string; email: string } }>("my-stepper");

export default component$(() => {
  // Your steps...
  const steps: CStepMeta[] = [/* ... */];
  
  // Your data to share via context
  const contextValue = { userData: { name: "", email: "" } };
  
  return (
    <CStepper 
      steps={steps}
      contextId={MyStepperContext}
      contextValue={contextValue}
    />
  );
});
```

### Using Context in Step Components

```tsx
import { component$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { MyStepperContext } from "./YourContextFile";

export const Step1Component = component$(() => {
  // Get the stepper context
  const stepper = useStepperContext(MyStepperContext);
  
  return (
    <div>
      <input 
        type="text"
        value={stepper.data.userData.name}
        onInput$={(e) => {
          const input = e.target as HTMLInputElement;
          stepper.data.userData.name = input.value;
          
          // Using the new completeStep$ function when input meets criteria
          if (input.value.length > 3) {
            stepper.completeStep$(); // Completes the current step
          }
        }}
      />
      
      {/* Complete step with button */}
      <button 
        onClick$={() => {
          if (stepper.data.userData.name) {
            stepper.completeStep$(); // Complete current step
            stepper.nextStep$(); // Move to next step
          }
        }}
      >
        Continue
      </button>
    </div>
  );
});
```

## Combined Example: Dynamic Steps with Context and Management

Here's how you can combine all these features:

```tsx
import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { 
  CStepper, 
  createStepperContext, 
  useStepperContext, 
  type CStepMeta 
} from "~/components/Core/Stepper/CStepper";

// Create a context
const FormContext = createStepperContext<{ formData: Record<string, any> }>("form-context");

export default component$(() => {
  // Toggle for edit mode
  const isEditMode = useSignal(false);
  
  // Store form data
  const formData = useStore({ /* your data */ });
  
  // Initial steps
  const steps = useSignal<CStepMeta[]>([
    // Your initial steps here
  ]);
  
  // Function to add a step programmatically
  const addSpecialStep = $(() => {
    const newStep: CStepMeta = {
      id: Date.now(), // Unique ID
      title: "Special Step",
      description: "This step was added programmatically",
      component: <SpecialStepComponent />,
      isComplete: false
    };
    
    steps.value = [...steps.value, newStep];
  });
  
  return (
    <div>
      <div class="controls">
        <label>
          <input 
            type="checkbox" 
            checked={isEditMode.value}
            onChange$={() => isEditMode.value = !isEditMode.value} 
          />
          Enable Edit Mode
        </label>
        
        <button onClick$={addSpecialStep}>
          Add Special Step
        </button>
      </div>
      
      <CStepper 
        steps={steps.value}
        contextId={FormContext}
        contextValue={{ formData }}
        isEditMode={isEditMode.value}
        onComplete$={() => console.log("Complete with data:", formData)}
      />
    </div>
  );
});
```

## Step Completion Methods

The CStepper component provides multiple ways to mark steps as complete:

### Using the Context API

The stepper context provides two functions for managing step completion:

1. `updateStepCompletion$(stepId, isComplete)` - Sets a specific step's completion status
2. `completeStep$(stepId?)` - Marks a step as complete (defaults to current step if no ID provided)

Example:
```tsx
const stepper = useStepperContext(MyStepperContext);

// Mark the current step complete
stepper.completeStep$();

// Mark a specific step complete
stepper.completeStep$(2);

// Explicitly set completion status
stepper.updateStepCompletion$(1, true);
```

### Using Direct Props

When implementing custom step components, you can also handle step completion through props:

```tsx
const StepComponent = component$(({ onComplete$ }) => {
  return (
    <button onClick$={() => onComplete$(1)}>
      Complete Step
    </button>
  );
});
```

## Navigation Functions

The context provides several navigation functions:

```tsx
// Go to a specific step by index
stepper.goToStep$(1); // Go to the second step (index 1)

// Go to next step (only works if current step is complete)
stepper.nextStep$();

// Go to previous step
stepper.prevStep$();
```

## Step Management Functions

The context provides functions to manage steps:

```tsx
// Add a new step (optionally at a specific position)
const newStepId = stepper.addStep$(newStep, 2); // Add at index 2

// Remove a step by ID
stepper.removeStep$(stepId);

// Swap steps by their indexes
stepper.swapSteps$(1, 2); // Swap steps at index 1 and 2
```

## Accessing Step State

You can access the current step state from the context:

```tsx
// Get the active step index
const currentStepIndex = stepper.activeStep.value;

// Get all steps
const allSteps = stepper.steps.value;

// Check if current step is complete
const isCurrentStepComplete = stepper.steps.value[stepper.activeStep.value].isComplete;
```

## Props

- `steps`: Array of step definitions
- `activeStep`: (Optional) Initial active step index
- `onStepComplete$`: (Optional) Called when a step is marked complete
- `onStepChange$`: (Optional) Called when the active step changes
- `onComplete$`: (Optional) Called when all steps are completed
- `contextId`: (Optional) Custom context ID for this stepper
- `contextValue`: (Optional) Initial data to store in context
- `isEditMode`: (Optional) Enable the step management UI 