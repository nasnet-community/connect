import { component$, $ } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export const BasicToast = component$(() => {
  const toast = useToast();
  
  const showInfoToast = $(() => {
    toast.info('This is an information message', { 
      title: 'Information' 
    });
  });
  
  const showSuccessToast = $(() => {
    toast.success('Operation completed successfully', { 
      title: 'Success' 
    });
  });
  
  const showWarningToast = $(() => {
    toast.warning('Please review before proceeding', { 
      title: 'Warning' 
    });
  });
  
  const showErrorToast = $(() => {
    toast.error('An error occurred while processing your request', { 
      title: 'Error' 
    });
  });
  
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <button
          onClick$={showInfoToast}
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Info Toast
        </button>
        
        <button
          onClick$={showSuccessToast}
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Success Toast
        </button>
        
        <button
          onClick$={showWarningToast}
          class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Warning Toast
        </button>
        
        <button
          onClick$={showErrorToast}
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Error Toast
        </button>
      </div>
      
      {/* For standalone testing - in real application, ToastContainer should be at the app root */}
      <ToastContainer position="bottom-right" limit={3} />
    </div>
  );
}); 