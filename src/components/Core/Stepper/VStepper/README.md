# VStepper Component

A customizable, vertical multi-step form component for Qwik applications with context-based state management and step management features.

## Features

- **Vertical step navigation** with smooth scrolling
- **Step completion tracking** with visual indicators
- **Context-based state sharing** between steps
- **Dynamic step management** (add, remove, reorder steps)
- **Mobile-responsive design** with collapsible step navigation
- **Dark mode support** with automatic theme switching
- **Step clicking navigation** (optional)
- **Edit mode** for step management UI
- **Customizable positioning** (left/right for desktop)

## Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { VStepper, type StepItem } from "~/components/Core/Stepper/VStepper";

export default component$(() => {
  // Define your steps
  const steps: StepItem[] = [
    {
      id: 1,
      title: "Step 1",
      component: () => <Step1Component />,
      isComplete: false
    },
    {
      id: 2,
      title: "Step 2", 
      component: () => <Step2Component />,
      isComplete: false
    },
    {
      id: 3,
      title: "Step 3",
      component: () => <Step3Component />,
      isComplete: false
    }
  ];
  
  return (
    <VStepper 
      steps={steps}
      onStepComplete$={(id) => console.log(`Step ${id} completed`)}
      onStepChange$={(id) => console.log(`Changed to step ${id}`)}
      onComplete$={() => console.log("All steps completed!")}
      position="left"
      allowStepNavigation={true}
    />
  );
});
```

## Using Context for State Management

### Creating a Context

```tsx
import { 
  createVStepperContext, 
  useVStepperContext,
  useProvideVStepperContext 
} from "~/components/Core/Stepper/VStepper";

// Define your data interface
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

// Create a context ID
const FormStepperContext = createVStepperContext<FormData>("form-stepper");
```

### Step Components Using Context

```tsx
const PersonalInfoStep = component$(() => {
  const context = useVStepperContext<FormData>(FormStepperContext);
  
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Personal Information</h2>
      
      <input 
        type="text" 
        value={context.data.personalInfo.name}
        onInput$={(_, el) => {
          context.data.personalInfo.name = el.value;
          
          // Complete step automatically when name is provided
          if (el.value.trim()) {
            context.completeStep$();
          }
        }}
        placeholder="Enter your name"
      />
      
      <button
        onClick$={() => {
          if (context.data.personalInfo.name) {
            context.completeStep$(); // Complete current step
            context.nextStep$(); // Move to next step
          }
        }}
      >
        Complete & Continue
      </button>
    </div>
  );
});
```

### Context Wrapper Component

```tsx
const VStepperContextWrapper = component$((props: { 
  steps: StepItem[]; 
  data: FormData; 
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
      allowStepNavigation={true}
    />
  );
});
```

## Step Management Features

### Enable Edit Mode

```tsx
<VStepper 
  steps={steps}
  isEditMode={true} // Enable step management UI
  dynamicStepComponent={() => <DynamicStepContent />}
  // other props...
/>
```

When `isEditMode` is enabled, the VStepper component will display a management panel that allows users to:

1. **Add new steps** with custom titles and positioning
2. **Remove existing steps** from the workflow  
3. **Reorder steps** by moving them up and down
4. **View step status** (complete/incomplete)

### Programmatic Step Management

```tsx
import { component$, useSignal, $ } from "@builder.io/qwik";

export default component$(() => {
  const steps = useSignal<StepItem[]>([
    // initial steps...
  ]);
  
  // Add a new step
  const addStep = $(() => {
    const newStep: StepItem = {
      id: Date.now(),
      title: "New Step",
      component: () => <NewStepComponent />,
      isComplete: false
    };
    
    steps.value = [...steps.value, newStep];
  });
  
  return (
    <div>
      <button onClick$={addStep}>Add New Step</button>
      
      <VStepper 
        steps={steps.value}
        // other props...
      />
    </div>
  );
});
```

## Context API Functions

The VStepper context provides these functions for step management:

### Navigation Functions
```tsx
// Navigate to a specific step by index
context.goToStep$(2); // Go to step at index 2

// Move to next step
context.nextStep$();

// Move to previous step  
context.prevStep$();

// Scroll to a specific step
context.scrollToStep$(1);
```

### Step Completion Functions
```tsx
// Complete the current step
context.completeStep$();

// Complete a specific step by ID
context.completeStep$(stepId);

// Update step completion status
context.updateStepCompletion$(stepId, true);
```

### Step Management Functions
```tsx
// Add a new step (optionally at specific position)
const newStepId = context.addStep$(newStep, 2); // Add at index 2

// Remove a step by ID
context.removeStep$(stepId);

// Swap steps by their indexes
context.swapSteps$(1, 2); // Swap steps at index 1 and 2
```

## Props

### VStepper Props
- `steps`: Array of step definitions
- `activeStep`: (Optional) Initial active step index
- `onStepComplete$`: (Optional) Called when a step is marked complete
- `onStepChange$`: (Optional) Called when the active step changes
- `onComplete$`: (Optional) Called when all steps are completed
- `position`: (Optional) `"left" | "right"` - Desktop indicator position
- `isComplete`: (Optional) Whether the entire stepper is complete
- `preloadNext`: (Optional) Preload next step component
- `allowStepNavigation`: (Optional) Allow clicking steps to navigate
- `isEditMode`: (Optional) Enable step management UI
- `dynamicStepComponent`: (Optional) Component to use for dynamically added steps

### StepItem Interface
```tsx
interface StepItem {
  id: number;
  title: string;
  component: any;
  isComplete?: boolean;
  isDisabled?: boolean;
  isOptional?: boolean;
  skippable?: boolean;
}
```

## Mobile Responsiveness

The VStepper automatically adapts to mobile devices with:

- **Collapsible step navigation** - Hide/show steps list
- **Progress indicators** - Visual progress bars
- **Touch-friendly interface** - Optimized for mobile interaction
- **Bottom navigation panel** - Fixed bottom position for easy access

## Examples

### Basic Example
```tsx
export const BasicVStepperExample = component$(() => {
  const steps: StepItem[] = [
    {
      id: 1,
      title: "Personal Info",
      component: () => <PersonalInfoStep />,
      isComplete: false
    },
    {
      id: 2,
      title: "Review",
      component: () => <ReviewStep />,
      isComplete: false
    }
  ];

  return (
    <VStepper 
      steps={steps}
      position="left"
      allowStepNavigation={true}
      onComplete$={() => alert("Completed!")}
    />
  );
});
```

### Context Example
```tsx
export const ContextVStepperExample = component$(() => {
  const formData = useStore<FormData>({
    personalInfo: { name: "", email: "" },
    preferences: { theme: "light", notifications: true }
  });

  return (
    <VStepperContextWrapper 
      steps={steps}
      data={formData}
    />
  );
});
```

### Management Example
```tsx
export const ManagementVStepperExample = component$(() => {
  const isEditMode = useSignal(false);
  const steps = useSignal<StepItem[]>([/* initial steps */]);

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={isEditMode.value}
          onChange$={() => isEditMode.value = !isEditMode.value} 
        />
        Enable Management Mode
      </label>
      
      <VStepper 
        steps={steps.value}
        isEditMode={isEditMode.value}
        dynamicStepComponent={() => <DynamicStepContent />}
      />
    </div>
  );
});
```

## Styling and Theming

The VStepper uses TailwindCSS classes and supports:

- **Dark mode** - Automatic theme switching
- **Custom colors** - Primary/secondary color theming
- **Responsive design** - Mobile-first approach
- **Smooth animations** - Transition effects for state changes

## Accessibility

The VStepper includes:

- **Keyboard navigation** support
- **Screen reader compatibility** 
- **ARIA attributes** for accessibility
- **Focus management** between steps
- **Semantic HTML** structure

## Best Practices

1. **Keep steps focused** - Each step should have a single purpose
2. **Provide clear navigation** - Use descriptive step titles
3. **Validate step completion** - Ensure data integrity before progression
4. **Handle errors gracefully** - Provide feedback for validation issues
5. **Use context wisely** - Share only necessary data between steps
6. **Test responsiveness** - Verify mobile experience across devices 