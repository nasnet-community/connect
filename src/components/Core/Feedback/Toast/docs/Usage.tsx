import { component$ } from '@builder.io/qwik';
import { CodeBlock } from '~/components/Core/Typography/CodeDisplay';

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Setting Up the Toast System</h2>
        <p>
          To use the Toast component, you need to set up the ToastContainer at the root of your application.
          This is typically done in your main layout file.
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';

export default component$(() => {
  return (
    <div>
      {/* Your application content */}
      <main>{/* ... */}</main>
      
      {/* Add Toast Container at the end of your root layout */}
      <ToastContainer 
        position="bottom-right"
        limit={5}
        defaultDuration={5000}
      />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage with useToast Hook</h2>
        <p>
          Once the ToastContainer is set up, you can use the useToast hook anywhere in your application
          to display toast messages.
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export default component$(() => {
  const toast = useToast();
  
  const handleSuccess = $(() => {
    toast.success('Your changes have been saved successfully!', {
      title: 'Success',
      duration: 3000
    });
  });
  
  const handleError = $(() => {
    toast.error('Unable to save changes. Please try again.', {
      title: 'Error Occurred'
    });
  });
  
  return (
    <div>
      <h1>Form Example</h1>
      {/* Form content */}
      
      <div class="flex gap-3 mt-4">
        <button onClick$={handleSuccess} class="px-4 py-2 bg-green-500 text-white rounded">
          Save (Success)
        </button>
        <button onClick$={handleError} class="px-4 py-2 bg-red-500 text-white rounded">
          Save (Error)
        </button>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Working with Loading State</h2>
        <p>
          You can use the loading toast to indicate ongoing operations, and then update it
          when the operation completes.
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export default component$(() => {
  const toast = useToast();
  
  const handleSubmit = $(async () => {
    // Show loading toast and save the ID
    const loadingId = toast.loading('Submitting your form...', {
      title: 'Processing'
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On success, update the loading toast to a success toast
      toast.update(loadingId, {
        status: 'success',
        title: 'Success',
        message: 'Your form has been submitted successfully!',
        loading: false,
        duration: 3000
      });
      
    } catch (error) {
      // On error, update the loading toast to an error toast
      toast.update(loadingId, {
        status: 'error',
        title: 'Error',
        message: 'Failed to submit your form. Please try again.',
        loading: false,
        duration: 5000
      });
    }
  });
  
  return (
    <form preventdefault:submit onSubmit$={handleSubmit}>
      {/* Form fields */}
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
        Submit Form
      </button>
    </form>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Interactive Toasts with Actions</h2>
        <p>
          Add action buttons to your toasts to allow users to respond without leaving their current context.
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export default component$(() => {
  const toast = useToast();
  
  const showUndoToast = $(() => {
    toast.show({
      status: 'info',
      title: 'Item Deleted',
      message: 'The item has been moved to trash.',
      actionLabel: 'Undo',
      onAction$: $((id) => {
        // Handle undo action
        toast.dismiss(id);
        toast.success('Item restored successfully', {
          title: 'Restored'
        });
        
        // Your restore logic here
      }),
      duration: 8000 // Give users more time to react
    });
  });
  
  return (
    <div>
      <button 
        onClick$={showUndoToast}
        class="px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Item
      </button>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Toast Component</h2>
        <p>
          For more complex scenarios, you might need to use the Toast component directly.
          This is less common but gives you more control.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Toast } from '~/components/Core/Feedback/Toast';

export default component$(() => {
  const isVisible = useSignal(true);
  
  const handleDismiss = $(() => {
    isVisible.value = false;
    console.log('Toast dismissed');
  });
  
  return (
    <div>
      {isVisible.value && (
        <div class="max-w-md mx-auto my-4">
          <Toast
            id="custom-toast"
            status="warning"
            title="Attention Required"
            message="Your account requires verification."
            size="lg"
            dismissible={true}
            onDismiss$={handleDismiss}
            actionLabel="Verify Now"
            onAction$={$(() => {
              console.log('Verification action clicked');
              // Navigate to verification page or open modal
            })}
            persistent={true}
          />
        </div>
      )}
      
      <button
        onClick$={() => isVisible.value = true}
        class="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isVisible.value}
      >
        Show Toast Again
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
            <strong>Keep messages concise:</strong> Toast messages should be short and to the point.
            For complex information, use a modal or a dedicated area in your UI.
          </li>
          <li>
            <strong>Use appropriate status types:</strong> Choose the correct status (info, success, warning, error)
            based on the nature of the message to provide visual context.
          </li>
          <li>
            <strong>Set appropriate duration:</strong> Critical messages should stay longer, while informational
            messages can be shorter. Consider setting <code>persistent: true</code> for messages requiring user action.
          </li>
          <li>
            <strong>Position strategically:</strong> Place toasts where they won't obscure important UI elements.
            Bottom positions are generally less intrusive.
          </li>
          <li>
            <strong>Limit concurrent toasts:</strong> Too many toasts at once can overwhelm users.
            Use the <code>limit</code> prop on ToastContainer to control this.
          </li>
          <li>
            <strong>Group related messages:</strong> When possible, combine related notifications into a single toast
            instead of showing multiple similar toasts.
          </li>
          <li>
            <strong>Provide context:</strong> Use titles to give context to your messages and make them
            more scannable and understandable.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Considerations</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            <strong>Use appropriate ARIA live values:</strong> For critical errors, use <code>'assertive'</code>
            to interrupt screen readers. For non-critical information, use <code>'polite'</code>.
          </li>
          <li>
            <strong>Provide clear focus management:</strong> When a toast requires user action,
            make sure focus is appropriately managed.
          </li>
          <li>
            <strong>Ensure keyboard accessibility:</strong> All interactive elements in toasts should be
            keyboard accessible. Remember the Alt+T shortcut to focus on toasts.
          </li>
          <li>
            <strong>Test with screen readers:</strong> Verify that toast notifications are properly
            announced by screen readers.
          </li>
          <li>
            <strong>Provide enough time:</strong> Ensure toasts remain visible long enough for users
            to read and interact with them, especially for users who read more slowly.
          </li>
        </ul>
      </section>
    </div>
  );
}); 