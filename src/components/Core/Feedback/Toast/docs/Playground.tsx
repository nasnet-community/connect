import { component$, useSignal, $ } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';
import type { ToastPosition, ToastStatus, ToastSize } from '~/components/Core/Feedback/Toast/Toast.types';

export default component$(() => {
  const toast = useToast();
  
  // Toast configuration options
  const title = useSignal('Toast Title');
  const message = useSignal('This is a toast message.');
  const status = useSignal<ToastStatus>('info');
  const position = useSignal<ToastPosition>('bottom-right');
  const size = useSignal<ToastSize>('md');
  const duration = useSignal(5000);
  const dismissible = useSignal(true);
  const showIcon = useSignal(true);
  const persistent = useSignal(false);
  const showAction = useSignal(false);
  const actionLabel = useSignal('Action');
  
  // Helper function to generate a toast with current configuration
  const showToast = $(() => {
    const options: any = {
      title: title.value,
      message: message.value,
      status: status.value,
      size: size.value,
      duration: persistent.value ? undefined : duration.value,
      dismissible: dismissible.value,
      icon: showIcon.value,
      persistent: persistent.value,
    };
    
    if (showAction.value) {
      options.actionLabel = actionLabel.value;
      options.onAction$ = $((id: string) => {
        toast.dismiss(id);
        toast.success('Action clicked!', { 
          title: 'Action Performed',
          duration: 3000
        });
      });
    }
    
    switch (status.value) {
      case 'info':
        toast.info(message.value, options);
        break;
      case 'success':
        toast.success(message.value, options);
        break;
      case 'warning':
        toast.warning(message.value, options);
        break;
      case 'error':
        toast.error(message.value, options);
        break;
      default:
        toast.show(options);
    }
  });
  
  return (
    <div class="space-y-8">
      {/* Configuration Controls */}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Toast Configuration</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Configuration */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Content</h3>
            
            {/* Title */}
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" 
                value={title.value}
                onInput$={(e) => title.value = (e.target as HTMLInputElement).value}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            {/* Message */}
            <div>
              <label class="block text-sm font-medium mb-1">Message</label>
              <textarea 
                value={message.value}
                onInput$={(e) => message.value = (e.target as HTMLTextAreaElement).value}
                rows={3}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            
            {/* Status */}
            <div>
              <label class="block text-sm font-medium mb-1">Status</label>
              <select 
                value={status.value}
                onChange$={(e) => status.value = (e.target as HTMLSelectElement).value as ToastStatus}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            
            {/* Action Button */}
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showAction.value} 
                  onChange$={() => showAction.value = !showAction.value}
                />
                <span class="text-sm font-medium">Show Action Button</span>
              </label>
              
              {showAction.value && (
                <div class="mt-2">
                  <label class="block text-sm font-medium mb-1">Action Label</label>
                  <input 
                    type="text" 
                    value={actionLabel.value}
                    onInput$={(e) => actionLabel.value = (e.target as HTMLInputElement).value}
                    class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Visual & Behavior Configuration */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Appearance & Behavior</h3>
            
            {/* Position */}
            <div>
              <label class="block text-sm font-medium mb-1">Position</label>
              <select 
                value={position.value}
                onChange$={(e) => position.value = (e.target as HTMLSelectElement).value as ToastPosition}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
            
            {/* Size */}
            <div>
              <label class="block text-sm font-medium mb-1">Size</label>
              <select 
                value={size.value}
                onChange$={(e) => size.value = (e.target as HTMLSelectElement).value as ToastSize}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            {/* Duration */}
            <div>
              <label class="block text-sm font-medium mb-1">
                Duration (ms): {duration.value}
              </label>
              <input 
                type="range" 
                min="1000" 
                max="10000" 
                step="1000"
                value={duration.value}
                onInput$={(e) => duration.value = parseInt((e.target as HTMLInputElement).value)}
                class="w-full"
                disabled={persistent.value}
              />
            </div>
            
            {/* Options */}
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={dismissible.value} 
                  onChange$={() => dismissible.value = !dismissible.value}
                />
                <span class="text-sm font-medium">Dismissible</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showIcon.value} 
                  onChange$={() => showIcon.value = !showIcon.value}
                />
                <span class="text-sm font-medium">Show Icon</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={persistent.value} 
                  onChange$={() => persistent.value = !persistent.value}
                />
                <span class="text-sm font-medium">Persistent (No Auto-Dismiss)</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Show Toast Button */}
        <div class="mt-6">
          <button
            onClick$={showToast}
            class="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Show Toast
          </button>
        </div>
      </div>
      
      {/* Generated Code */}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Generated Code</h2>
        <pre class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
          {`import { component$, $ } from '@builder.io/qwik';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export default component$(() => {
  const toast = useToast();
  
  const handleClick = $(() => {
    ${status.value === 'info' ? 
    `toast.info("${message.value}", {
      title: "${title.value}",
      size: "${size.value}",${persistent.value ? `
      persistent: true,` : `
      duration: ${duration.value},`}${!dismissible.value ? `
      dismissible: false,` : ''}${!showIcon.value ? `
      icon: false,` : ''}${showAction.value ? `
      actionLabel: "${actionLabel.value}",
      onAction$: $((id) => {
        toast.dismiss(id);
        // Your action logic here
      }),` : ''}
    });` : 
    status.value === 'success' ? 
    `toast.success("${message.value}", {
      title: "${title.value}",
      size: "${size.value}",${persistent.value ? `
      persistent: true,` : `
      duration: ${duration.value},`}${!dismissible.value ? `
      dismissible: false,` : ''}${!showIcon.value ? `
      icon: false,` : ''}${showAction.value ? `
      actionLabel: "${actionLabel.value}",
      onAction$: $((id) => {
        toast.dismiss(id);
        // Your action logic here
      }),` : ''}
    });` : 
    status.value === 'warning' ? 
    `toast.warning("${message.value}", {
      title: "${title.value}",
      size: "${size.value}",${persistent.value ? `
      persistent: true,` : `
      duration: ${duration.value},`}${!dismissible.value ? `
      dismissible: false,` : ''}${!showIcon.value ? `
      icon: false,` : ''}${showAction.value ? `
      actionLabel: "${actionLabel.value}",
      onAction$: $((id) => {
        toast.dismiss(id);
        // Your action logic here
      }),` : ''}
    });` : 
    `toast.error("${message.value}", {
      title: "${title.value}",
      size: "${size.value}",${persistent.value ? `
      persistent: true,` : `
      duration: ${duration.value},`}${!dismissible.value ? `
      dismissible: false,` : ''}${!showIcon.value ? `
      icon: false,` : ''}${showAction.value ? `
      actionLabel: "${actionLabel.value}",
      onAction$: $((id) => {
        toast.dismiss(id);
        // Your action logic here
      }),` : ''}
    });`}
  });
  
  return (
    <button onClick$={handleClick}>
      Show ${status.value.charAt(0).toUpperCase() + status.value.slice(1)} Toast
    </button>
  );
});`}
        </pre>
      </div>
      
      {/* Toast Container with current position */}
      <ToastContainer position={position.value} limit={5} />
    </div>
  );
}); 