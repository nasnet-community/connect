# CStepper Component

A customizable, multi-step form component for Qwik applications with context-based state management.

## Features

- Multi-step navigation with progress indication
- Step completion tracking
- Context-based state sharing between steps
- Mobile-responsive design
- Dark mode support
- Customizable via props and context

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

## Using the Context

### Creating a Custom Context

```tsx
import { component$ } from "@builder.io/qwik";
import { CStepper, type CStepMeta, createStepperContext } from "~/components/Core/Stepper/CStepper";

// Create a typed context with your data structure
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

## Advanced Usage

You can combine both context data and completion methods to create sophisticated multi-step forms:

```tsx
// In a step component
const FormStep = component$(() => {
  const stepper = useStepperContext(MyStepperContext);
  
  return (
    <form
      preventdefault:submit
      onSubmit$={() => {
        // Update data
        stepper.data.userData.name = "John Doe";
        
        // Mark step complete and move to next step
        stepper.completeStep$();
        stepper.nextStep$();
      }}
    >
      {/* Form fields */}
      <input type="text" />
      
      <button type="submit">
        Save and Continue
      </button>
    </form>
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