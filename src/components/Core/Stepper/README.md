# Stepper Components

This package provides three highly customizable stepper components for multi-step forms and wizards in Qwik applications:

- **CStepper**: Content-focused stepper with centered content and step indicators at the top
- **HStepper**: Horizontal stepper with fixed header and vertical content flow
- **VStepper**: Vertical stepper with step indicators on the side and vertically stacked content

## Features

- ✅ Fully accessible with ARIA attributes and keyboard navigation
- ✅ Context-based state management for sharing data between steps
- ✅ Lazy loading of step components for better performance
- ✅ Customizable step indicators, transitions, and layouts  
- ✅ RTL language support
- ✅ Dark mode support
- ✅ TypeScript support with comprehensive type definitions

## Installation

These components are part of the Core component library and available by default.

```tsx
import { CStepper, HStepper, VStepper } from "~/components/Core/Stepper";
```

## CStepper

Content-focused stepper with step indicators at the top and centered content.

### Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper";

export default component$(() => {
  // Define your steps
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Personal Info",
      description: "Enter your personal details",
      component: <Step1 />,
      isComplete: false
    },
    {
      id: 2,
      title: "Contact Info",
      description: "Enter your contact information",
      component: <Step2 />,
      isComplete: false
    }
  ];
  
  return (
    <CStepper 
      steps={steps}
      onStepComplete$={(id) => console.log(`Step ${id} completed`)}
      onComplete$={() => console.log("All steps completed!")}
    />
  );
});
```

### Context-based State Management

For more complex forms, use context to share data between steps:

```tsx
import { CStepper, createStepperContext, useStepperContext } from "~/components/Core/Stepper";

// Create a typed context
const FormContext = createStepperContext<{ name: string; email: string }>("my-form");

// In your main component
export default component$(() => {
  return (
    <CStepper 
      steps={steps}
      contextId={FormContext}
      contextValue={{ name: "", email: "" }}
    />
  );
});

// Inside a step component
const Step1 = component$(() => {
  const context = useStepperContext(FormContext);
  
  return (
    <div>
      <input 
        value={context.data.name}
        onInput$={(e) => {
          const input = e.target as HTMLInputElement;
          context.data.name = input.value;
          
          // Mark step as complete if valid
          if (input.value.length > 2) {
            context.completeStep$();
          }
        }}
      />
      
      {/* Navigation */}
      <button onClick$={() => context.nextStep$()}>
        Next
      </button>
    </div>
  );
});
```

## HStepper

Horizontal stepper with fixed navigation header and vertical content flow.

### Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { HStepper, type HStepItem } from "~/components/Core/Stepper";

export default component$(() => {
  const steps: HStepItem[] = [
    {
      id: 1,
      title: "Step 1",
      component: <Step1Component />,
      isComplete: false
    },
    {
      id: 2,
      title: "Step 2",
      component: <Step2Component />,
      isComplete: false
    }
  ];
  
  return (
    <HStepper 
      steps={steps}
      mode="easy" // "easy" or "advance"
      onModeChange$={(mode) => console.log(`Mode changed to ${mode}`)}
    />
  );
});
```

### Using Context in HStepper

```tsx
import { component$ } from "@builder.io/qwik";
import { HStepper, useHStepperContext } from "~/components/Core/Stepper";

// Inside a step component
const Step1 = component$(() => {
  const stepper = useHStepperContext();
  
  return (
    <div>
      {/* Component content */}
      
      {/* Complete this step and go to next */}
      <button 
        onClick$={() => {
          stepper.completeStep$();
          stepper.nextStep$();
        }}
      >
        Continue
      </button>
    </div>
  );
});
```

## VStepper

Vertical stepper with side navigation and vertically stacked content.

### Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { VStepper, type VStepItem } from "~/components/Core/Stepper";

export default component$(() => {
  const steps: VStepItem[] = [
    {
      id: 1,
      title: "Account Setup",
      component: AccountSetupComponent,
      isComplete: false
    },
    {
      id: 2,
      title: "Profile Details",
      component: ProfileDetailsComponent,
      isComplete: false
    }
  ];
  
  return (
    <VStepper 
      steps={steps}
      position="left" // or "right" for RTL
      preloadNext={true} // preload the next step for smoother transitions
      showContinueButton={true} // show default "Continue" button
    />
  );
});
```

### Step Component Props

Components provided to VStepper receive these props:

```tsx
const Step1 = component$(({ isComplete, onComplete$, isActive }) => {
  return (
    <div>
      {/* Your form fields */}
      
      <button onClick$={onComplete$}>Complete this step</button>
    </div>
  );
});
```

## Accessibility Features

All stepper components include these accessibility enhancements:

- Proper ARIA roles, states, and properties
- Keyboard navigation support
- Focus management between steps
- Screen reader announcements for step changes
- Live regions for dynamic content updates
- High contrast visual indicators

## Best Practices

1. **Use the context API** for complex multi-step forms to share data
2. **Implement validation** within each step component
3. **Provide clear instructions** in step descriptions
4. **Consider mobile experience** by testing on small screens
5. **Use proper step completion logic** to prevent users from advancing prematurely

## Migration from Previous Versions

If you're using an older version:

1. Replace direct prop access with context API
2. Use the new `completeStep$` function instead of manual completion
3. Add required ARIA attributes if creating custom step components
4. Update imports to use the consolidated paths 