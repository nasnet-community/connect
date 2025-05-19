import { component$, $ } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export const InteractiveToast = component$(() => {
  const toast = useToast();
  
  const showActionToast = $(() => {
    toast.show({
      status: 'info',
      title: 'New feature available',
      message: 'Try out our new dashboard experience',
      actionLabel: 'Try it now',
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success('Welcome to the new dashboard!', {
          title: 'Feature Activated'
        });
      }),
      duration: 8000
    });
  });
  
  const showPersistentToast = $(() => {
    toast.show({
      status: 'warning',
      title: 'Session expiring soon',
      message: 'Your session will expire in 5 minutes',
      persistent: true,
      actionLabel: 'Extend session',
      onAction$: $((id) => {
        toast.dismiss(id);
        toast.success('Session extended by 1 hour', {
          title: 'Session Extended'
        });
      })
    });
  });
  
  const showLoadingToast = $(() => {
    const loadingId = toast.loading('Processing your request...', { 
      title: 'Loading' 
    });
    
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
  });
  
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <button
          onClick$={showActionToast}
          class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          Toast with Action
        </button>
        
        <button
          onClick$={showPersistentToast}
          class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Persistent Toast
        </button>
        
        <button
          onClick$={showLoadingToast}
          class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          Loading → Success
        </button>
      </div>
      
      <ToastContainer position="bottom-right" limit={5} />
    </div>
  );
}); 