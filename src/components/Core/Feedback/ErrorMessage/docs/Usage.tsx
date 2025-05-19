import { component$ } from '@builder.io/qwik';
import { CodeBlock } from '~/components/Core/Typography/CodeDisplay';

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage</h2>
        <p>
          The ErrorMessage component is designed to display error messages to users in a consistent and accessible way.
          Here's how to use it in its simplest form:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export default component$(() => {
  return (
    <ErrorMessage 
      message="Unable to connect to the server. Please try again later."
    />
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">With Custom Title</h2>
        <p>
          You can customize the title to provide more context about the error:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export default component$(() => {
  return (
    <ErrorMessage 
      title="Connection Failed"
      message="Unable to connect to the server. Please try again later."
    />
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Dismissible Error Message</h2>
        <p>
          Make the error message dismissible to allow users to acknowledge and hide it:
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export default component$(() => {
  const showError = useSignal(true);
  
  const handleDismiss = $(() => {
    showError.value = false;
  });
  
  return (
    <>
      {showError.value && (
        <ErrorMessage 
          title="Invalid Input"
          message="Please provide a valid email address format."
          dismissible={true}
          onDismiss$={handleDismiss}
        />
      )}
    </>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Auto-dismissing Error Message</h2>
        <p>
          Set an auto-dismiss duration to automatically hide the error after a specific time:
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export default component$(() => {
  const showError = useSignal(true);
  
  const handleDismiss = $(() => {
    showError.value = false;
  });
  
  return (
    <>
      {showError.value && (
        <ErrorMessage 
          title="Notification"
          message="This message will automatically disappear in 5 seconds."
          autoDismissDuration={5000}
          onDismiss$={handleDismiss}
        />
      )}
    </>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Using the useErrorMessage Hook</h2>
        <p>
          For more complex error handling scenarios, use the provided hook:
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { ErrorMessage, useErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export default component$(() => {
  // Initialize the error message hook with options
  const { 
    message, 
    visible, 
    showError$, 
    hideError$ 
  } = useErrorMessage({
    autoHideDuration: 5000, // Auto-hide after 5 seconds
  });
  
  // Show an error when an action fails
  const handleSubmit = $(() => {
    try {
      // Attempt some action
      throw new Error('API request failed');
    } catch (error) {
      // Show error message
      showError$('Failed to process your request. Please try again.');
    }
  });
  
  return (
    <div>
      {visible.value && (
        <ErrorMessage 
          message={message.value}
          dismissible={true}
          onDismiss$={hideError$}
        />
      )}
      
      <button onClick$={handleSubmit}>
        Submit Form
      </button>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Best Practices</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            <strong>Be specific:</strong> Error messages should clearly state what went wrong and suggest a solution if possible.
          </li>
          <li>
            <strong>Use appropriate timing:</strong> For critical errors, don't auto-dismiss. For less critical notifications, consider auto-dismissing after 5-10 seconds.
          </li>
          <li>
            <strong>Limit text length:</strong> Keep error messages concise. If detailed explanation is needed, provide a way for users to get more information.
          </li>
          <li>
            <strong>Position strategically:</strong> Place error messages close to the relevant content or form elements they relate to.
          </li>
          <li>
            <strong>Handle multiple errors:</strong> For form validation, consider using multiple ErrorMessage components near each field rather than one large error message.
          </li>
          <li>
            <strong>Maintain consistency:</strong> Use the ErrorMessage component for all error states in your application for a consistent user experience.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Considerations</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            The ErrorMessage component uses <code>role="alert"</code> which will announce the error to screen readers when it appears.
          </li>
          <li>
            For dynamically shown errors, ensure the error message is inserted in the DOM near the relevant form element to maintain context.
          </li>
          <li>
            When using the dismissible option, make sure users have enough time to read the message before auto-dismissing.
          </li>
          <li>
            Use clear, descriptive language that helps all users understand both the problem and the solution.
          </li>
        </ul>
      </section>
    </div>
  );
}); 