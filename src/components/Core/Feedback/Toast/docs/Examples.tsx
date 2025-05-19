import { component$ } from '@builder.io/qwik';
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { 
  BasicToast, 
  PositionToast, 
  InteractiveToast, 
  CustomToast 
} from '../Examples';

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Toast Types</h2>
        <p>
          The Toast component supports different status types to convey various messages:
          info, success, warning, and error. Each type has appropriate styling and icons.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <BasicToast />
        </div>
        <CodeBlock
          code={`
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
        <button onClick$={showInfoToast}>Info Toast</button>
        <button onClick$={showSuccessToast}>Success Toast</button>
        <button onClick$={showWarningToast}>Warning Toast</button>
        <button onClick$={showErrorToast}>Error Toast</button>
      </div>
      
      <ToastContainer position="bottom-right" limit={3} />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Toast Positions</h2>
        <p>
          Toasts can be positioned in six different locations on the screen:
          top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <PositionToast />
        </div>
        <CodeBlock
          code={`
import { component$, $, useSignal } from '@builder.io/qwik';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';
import type { ToastPosition } from '~/components/Core/Feedback/Toast/Toast.types';

export const PositionToast = component$(() => {
  const toast = useToast();
  const position = useSignal<ToastPosition>('bottom-right');
  
  const positions: ToastPosition[] = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];
  
  const changePosition = $((newPosition: ToastPosition) => {
    position.value = newPosition;
    
    toast.dismissAll();
    toast.info(\`Toast position changed to \${newPosition}\`, {
      title: 'Position Changed'
    });
  });
  
  return (
    <div class="space-y-4">
      <div class="grid grid-cols-3 gap-3">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick$={() => changePosition(pos)}
            class={\`...\`} // Classes omitted for brevity
          >
            {pos}
          </button>
        ))}
      </div>
      
      <ToastContainer position={position.value} limit={3} />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Interactive Toasts</h2>
        <p>
          Toasts can include interactive elements such as action buttons
          and can be updated dynamically. They can also be persistent or show loading state.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <InteractiveToast />
        </div>
        <CodeBlock
          code={`
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
        <button onClick$={showActionToast}>Toast with Action</button>
        <button onClick$={showPersistentToast}>Persistent Toast</button>
        <button onClick$={showLoadingToast}>Loading → Success</button>
      </div>
      
      <ToastContainer position="bottom-right" limit={5} />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Customization Options</h2>
        <p>
          Toast components offer various customization options including
          size, duration, and icon variations to suit your application's needs.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <CustomToast />
        </div>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { Toast } from '~/components/Core/Feedback/Toast';
import { ToastContainer } from '~/components/Core/Feedback/Toast/ToastContainer';
import { useToast } from '~/components/Core/Feedback/Toast/useToast';

export const CustomToast = component$(() => {
  const toast = useToast();
  
  // Size customization
  const showCustomSizeToast = $((size: 'sm' | 'md' | 'lg') => {
    toast.show({
      status: 'info',
      title: \`\${size.toUpperCase()} Size Toast\`,
      message: 'This toast demonstrates different size options',
      size: size,
      duration: 5000
    });
  });
  
  // Duration customization
  const showCustomDurationToast = $((duration: number) => {
    toast.info(\`This toast will disappear in \${duration/1000} seconds\`, {
      title: 'Custom Duration',
      duration: duration
    });
  });
  
  // Custom icon
  const showCustomIconToast = $(() => {
    toast.show({
      status: 'success',
      title: 'Custom Icon',
      message: 'This toast uses a custom icon',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      duration: 5000
    });
  });
  
  // No icon
  const showNoIconToast = $(() => {
    toast.error('This toast has no icon', {
      title: 'No Icon',
      icon: false
    });
  });
  
  return (
    <div class="space-y-4">
      {/* Size options */}
      <div class="space-y-2">
        <h3>Size Options</h3>
        <div class="flex gap-3">
          <button onClick$={() => showCustomSizeToast('sm')}>Small Toast</button>
          <button onClick$={() => showCustomSizeToast('md')}>Medium Toast</button>
          <button onClick$={() => showCustomSizeToast('lg')}>Large Toast</button>
        </div>
      </div>
      
      {/* Duration options */}
      <div class="space-y-2">
        <h3>Duration Options</h3>
        <div class="flex gap-3">
          <button onClick$={() => showCustomDurationToast(2000)}>2s Duration</button>
          <button onClick$={() => showCustomDurationToast(5000)}>5s Duration</button>
          <button onClick$={() => showCustomDurationToast(10000)}>10s Duration</button>
        </div>
      </div>
      
      {/* Icon options */}
      <div class="space-y-2">
        <h3>Icon Options</h3>
        <div class="flex gap-3">
          <button onClick$={showCustomIconToast}>Custom Icon</button>
          <button onClick$={showNoIconToast}>No Icon</button>
        </div>
      </div>
      
      <ToastContainer position="bottom-right" limit={5} />
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