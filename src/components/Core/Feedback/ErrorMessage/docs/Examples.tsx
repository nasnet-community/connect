import { component$ } from '@builder.io/qwik';
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { BasicErrorMessage, CustomTitleErrorMessage, DismissibleErrorMessage, AutoDismissErrorMessage, UseErrorMessageHook } from '../Examples';

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Error Message</h2>
        <p>
          The basic ErrorMessage component displays an error message with the default title.
          This is the simplest way to use the component.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <BasicErrorMessage />
        </div>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const BasicErrorMessage = component$(() => {
  return (
    <div class="space-y-4">
      <ErrorMessage 
        message="Failed to connect to the server. Please check your internet connection and try again."
      />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Title</h2>
        <p>
          You can customize the title of the error message to provide more context about the error type.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <CustomTitleErrorMessage />
        </div>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const CustomTitleErrorMessage = component$(() => {
  return (
    <div class="space-y-4">
      <ErrorMessage 
        title="Database Error"
        message="Unable to save your changes. The database is currently unavailable."
      />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Dismissible Error Message</h2>
        <p>
          Error messages can be made dismissible by setting the <code>dismissible</code> prop to true
          and providing an <code>onDismiss$</code> callback.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <DismissibleErrorMessage />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const DismissibleErrorMessage = component$(() => {
  const isVisible = useSignal(true);
  
  const handleDismiss = $(() => {
    isVisible.value = false;
  });
  
  const handleReset = $(() => {
    isVisible.value = true;
  });
  
  return (
    <div class="space-y-4">
      {isVisible.value ? (
        <ErrorMessage 
          title="Invalid Input"
          message="Please provide a valid email address format."
          dismissible={true}
          onDismiss$={handleDismiss}
        />
      ) : (
        <div>
          <p>Error message was dismissed.</p>
          <button onClick$={handleReset}>
            Reset Example
          </button>
        </div>
      )}
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Auto-dismiss Error Message</h2>
        <p>
          Error messages can automatically dismiss themselves after a specified duration
          by setting the <code>autoDismissDuration</code> prop (in milliseconds).
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <AutoDismissErrorMessage />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const AutoDismissErrorMessage = component$(() => {
  const isVisible = useSignal(false);
  const errorMessage = useSignal("This error will automatically disappear in 3 seconds.");
  
  const handleDismiss = $(() => {
    isVisible.value = false;
  });
  
  const showError = $(() => {
    isVisible.value = true;
  });
  
  return (
    <div class="space-y-4">
      {isVisible.value && (
        <ErrorMessage 
          title="Auto-dismiss Example"
          message={errorMessage.value}
          autoDismissDuration={3000}
          onDismiss$={handleDismiss}
        />
      )}
      
      <button 
        onClick$={showError}
        disabled={isVisible.value}
      >
        {isVisible.value ? 'Error Showing...' : 'Show Auto-dismiss Error'}
      </button>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Using the useErrorMessage Hook</h2>
        <p>
          The <code>useErrorMessage</code> hook provides a convenient way to manage error message state,
          with built-in support for showing, hiding, and auto-dismissing errors.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <UseErrorMessageHook />
        </div>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { ErrorMessage, useErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const UseErrorMessageHook = component$(() => {
  // Initialize the error message hook
  const { 
    message, 
    visible, 
    showError$, 
    hideError$ 
  } = useErrorMessage({
    autoHideDuration: 5000, // Auto-hide after 5 seconds
  });
  
  // Mock errors to demonstrate hook usage
  const errors = [
    "Unable to authenticate. Please check your credentials.",
    "Network connection lost. Please check your connection and try again.",
    "Permission denied. You don't have access to this resource.",
    "Invalid input. Please check the form fields and try again."
  ];
  
  // Show a random error message
  const showRandomError = $(() => {
    const randomIndex = Math.floor(Math.random() * errors.length);
    showError$(errors[randomIndex]);
  });
  
  return (
    <div class="space-y-4">
      {visible.value && (
        <ErrorMessage 
          message={message.value}
          title="Hook Example"
          dismissible={true}
          onDismiss$={hideError$}
        />
      )}
      
      <div class="flex space-x-4">
        <button onClick$={showRandomError}>
          Show Random Error
        </button>
        
        {visible.value && (
          <button onClick$={hideError$}>
            Hide Error
          </button>
        )}
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>
    </div>
  );
}); 