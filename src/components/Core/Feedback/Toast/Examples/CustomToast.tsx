import { component$, $ } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export const CustomToast = component$(() => {
  const toast = useToast();
  
  const showCustomSizeToast = $((size: 'sm' | 'md' | 'lg') => {
    toast.show({
      status: 'info',
      title: `${size.toUpperCase()} Size Toast`,
      message: 'This toast demonstrates different size options',
      size: size,
      duration: 5000
    });
  });
  
  const showCustomDurationToast = $((duration: number) => {
    toast.info(`This toast will disappear in ${duration/1000} seconds`, {
      title: 'Custom Duration',
      duration: duration
    });
  });
  
  const showCustomIconToast = $(() => {
    toast.show({
      status: 'success',
      title: 'Custom Icon',
      message: 'This toast uses a custom icon',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      duration: 5000
    });
  });
  
  const showNoIconToast = $(() => {
    toast.error('This toast has no icon', {
      title: 'No Icon',
      icon: false
    });
  });
  
  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Size Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={() => showCustomSizeToast('sm')}
            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
          >
            Small Toast
          </button>
          
          <button
            onClick$={() => showCustomSizeToast('md')}
            class="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
          >
            Medium Toast
          </button>
          
          <button
            onClick$={() => showCustomSizeToast('lg')}
            class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Large Toast
          </button>
        </div>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Duration Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={() => showCustomDurationToast(2000)}
            class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            2s Duration
          </button>
          
          <button
            onClick$={() => showCustomDurationToast(5000)}
            class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            5s Duration
          </button>
          
          <button
            onClick$={() => showCustomDurationToast(10000)}
            class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            10s Duration
          </button>
        </div>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Icon Options</h3>
        <div class="flex gap-3">
          <button
            onClick$={showCustomIconToast}
            class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Custom Icon
          </button>
          
          <button
            onClick$={showNoIconToast}
            class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            No Icon
          </button>
        </div>
      </div>
      
      <ToastContainer position="bottom-right" limit={5} />
    </div>
  );
}); 