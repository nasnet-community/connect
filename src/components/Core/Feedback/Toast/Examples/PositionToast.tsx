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
    toast.info(`Toast position changed to ${newPosition}`, {
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
            class={`px-4 py-2 rounded-md transition-colors ${
              position.value === pos
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {pos}
          </button>
        ))}
      </div>
      
      <div class="mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Current position: <span class="font-medium">{position.value}</span>
        </p>
      </div>
      
      {/* ToastContainer with dynamic position */}
      <ToastContainer 
        position={position.value} 
        limit={3}
      />
    </div>
  );
}); 