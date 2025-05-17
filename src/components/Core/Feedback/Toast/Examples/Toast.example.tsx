import { component$, $ } from '@builder.io/qwik';
import { ToastContainer } from './ToastContainer';
import { useToast } from './useToast';
import { ToastPosition } from './Toast.types';

export default component$(() => {
  const toast = useToast();
  
  // Handler for showing various toast types
  const showToast = $((type: 'info' | 'success' | 'warning' | 'error' | 'loading') => {
    const messages = {
      info: 'This is an information message',
      success: 'Operation completed successfully',
      warning: 'Please review before proceeding',
      error: 'An error occurred while processing your request',
      loading: 'Processing your request...'
    };
    
    const titles = {
      info: 'Information',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      loading: 'Loading'
    };
    
    if (type === 'info') {
      toast.info(messages.info, { title: titles.info });
    } else if (type === 'success') {
      toast.success(messages.success, { title: titles.success });
    } else if (type === 'warning') {
      toast.warning(messages.warning, { title: titles.warning });
    } else if (type === 'error') {
      toast.error(messages.error, { title: titles.error });
    } else if (type === 'loading') {
      const loadingId = toast.loading(messages.loading, { title: titles.loading });
      
      // After 3 seconds, update the loading toast to a success toast
      setTimeout(() => {
        toast.update(loadingId, { 
          status: 'success', 
          loading: false,
          title: 'Completed',
          message: 'Request processed successfully!',
          persistent: false,
          duration: 3000
        });
      }, 3000);
    }
  });
  
  // Show toast with action button
  const showActionToast = $(() => {
    toast.show({
      status: 'info',
      title: 'New feature available',
      message: 'Try out our new dashboard experience',
      actionLabel: 'Try it now',
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success('Welcome to the new dashboard!');
      }),
      duration: 8000
    });
  });
  
  // Show persistent toast
  const showPersistentToast = $(() => {
    toast.show({
      status: 'warning',
      title: 'Session expiring soon',
      message: 'Your session will expire in 5 minutes',
      persistent: true,
      actionLabel: 'Extend session',
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success('Session extended by 1 hour');
      })
    });
  });
  
  // Dismiss all toasts
  const dismissAllToasts = $(() => {
    toast.dismissAll();
  });
  
  // Change position (in a real app, this would update state)
  const changePosition = $((position: ToastPosition) => {
    toast.dismissAll();
    // In a real app, you would update the position prop of ToastContainer
    // For this example, we'll just show a message
    toast.info(`Position would change to ${position}. In a real app, you would update the position prop of ToastContainer.`);
  });
  
  return (
    <div class="space-y-6 p-6">
      <h2 class="text-xl font-semibold mb-4">Toast Component Examples</h2>
      
      {/* Toast Type Examples */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toast Types</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={() => showToast('info')}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Show Info Toast
          </button>
          
          <button
            onClick$={() => showToast('success')}
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Show Success Toast
          </button>
          
          <button
            onClick$={() => showToast('warning')}
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Show Warning Toast
          </button>
          
          <button
            onClick$={() => showToast('error')}
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Show Error Toast
          </button>
          
          <button
            onClick$={() => showToast('loading')}
            class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            Show Loading Toast
          </button>
        </div>
      </div>
      
      {/* Toast with Actions */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toasts with Actions</h3>
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={showActionToast}
            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Toast with Action Button
          </button>
          
          <button
            onClick$={showPersistentToast}
            class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Persistent Toast
          </button>
        </div>
      </div>
      
      {/* Position Options */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Position Options</h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            onClick$={() => changePosition('top-left')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Top Left
          </button>
          
          <button
            onClick$={() => changePosition('top-center')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Top Center
          </button>
          
          <button
            onClick$={() => changePosition('top-right')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Top Right
          </button>
          
          <button
            onClick$={() => changePosition('bottom-left')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Bottom Left
          </button>
          
          <button
            onClick$={() => changePosition('bottom-center')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Bottom Center
          </button>
          
          <button
            onClick$={() => changePosition('bottom-right')}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Bottom Right
          </button>
        </div>
      </div>
      
      {/* Other Controls */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Other Controls</h3>
        <button
          onClick$={dismissAllToasts}
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Dismiss All Toasts
        </button>
      </div>
      
      {/* Toast Container - Positioned at bottom-right by default */}
      <ToastContainer 
        position="bottom-right"
        limit={5}
        gap="md"
        defaultDuration={5000}
      />
      
      {/* Accessibility notes */}
      <div class="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">Accessibility Features</h3>
        <ul class="list-disc ml-5 mt-2 text-blue-700 dark:text-blue-300 space-y-1">
          <li>Uses <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">aria-live</code> regions for screen reader announcements</li>
          <li>Provides keyboard access with Alt+T to focus the most recent toast</li>
          <li>Escape key to dismiss all toasts when focused</li>
          <li>Uses appropriate roles and ARIA attributes</li>
          <li>Progress indicators for auto-dismissal timing</li>
          <li>Pause auto-dismiss on hover for better usability</li>
          <li>High contrast colors and clear focus indicators</li>
        </ul>
      </div>
    </div>
  );
});
