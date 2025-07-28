export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The Alert component can be easily integrated into any Qwik application. Import the component from your components directory and use it to display important information or feedback.

Basic usage:
\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';

export default component$(() => {
  return (
    <div class="p-4">
      <Alert 
        status="success" 
        title="Operation Successful" 
        message="Your changes have been saved."
        dismissible
      />
    </div>
  );
});
\`\`\`

Auto-dismissing alert with callback:
\`\`\`tsx
import { component$, useSignal } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';

export default component$(() => {
  const showAlert = useSignal(true);
  
  return (
    <div class="p-4">
      {showAlert.value && (
        <Alert 
          status="info" 
          title="New Updates Available" 
          autoCloseDuration={5000}
          onDismiss$={() => {
            showAlert.value = false;
            console.log('Alert dismissed');
          }}
        />
      )}
      
      {!showAlert.value && (
        <button 
          onClick$={() => showAlert.value = true}
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Show Alert Again
        </button>
      )}
    </div>
  );
});
\`\`\`
`;

export const customization = `
The Alert component can be customized to match your application's design system through its various props and by applying custom classes.

### Styling Alert Variants

You can create a custom alert component that uses your application's color scheme:

\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';
import type { AlertProps } from '~/components/Core/Feedback/Alert/Alert.types';

export const CustomAlert = component$<AlertProps>((props) => {
  // Define custom classes based on your application's color scheme
  const getCustomClasses = () => {
    if (props.status === 'info') {
      return 'bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
    }
    if (props.status === 'success') {
      return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100';
    }
    // Add other status types...
    
    return '';
  };

  return (
    <Alert
      {...props}
      class={\`rounded-xl shadow-sm \${getCustomClasses()} \${props.class || ''}\`}
    />
  );
});
\`\`\`

### Creating Contextual Alert Components

You can also create purpose-specific alert components for common use cases:

\`\`\`tsx
import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';

export const SaveSuccessAlert = component$<{ 
  itemName: string, 
  autoDismiss?: boolean 
}>((props) => {
  return (
    <Alert
      status="success"
      title="Saved Successfully"
      message={\`\${props.itemName} has been saved.\`}
      autoCloseDuration={props.autoDismiss ? 5000 : undefined}
      variant="solid"
      size="md"
    />
  );
});

export const FormErrorAlert = component$<{ 
  errors: string[] 
}>((props) => {
  return (
    <Alert
      status="error"
      title="Please fix the following errors:"
      variant="outline"
      size="md"
    >
      <ul class="list-disc pl-5 mt-1">
        {props.errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Alert>
  );
});
\`\`\`
`;
