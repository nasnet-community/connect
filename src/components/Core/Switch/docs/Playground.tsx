import { component$, useSignal, $ } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";

export default component$(() => {
  const isChecked = useSignal(false);
  const size = useSignal<'sm' | 'md' | 'lg'>('md');
  const isDisabled = useSignal(false);
  const showCode = useSignal(false);
  
  const handleToggleCode = $(() => {
    showCode.value = !showCode.value;
  });
  
  return (
    <div class="space-y-8">
      <div class="p-6 border rounded-lg bg-white dark:bg-gray-800">
        <div class="flex flex-col items-center justify-center gap-8">
          <Switch
            checked={isChecked.value}
            onChange$={(checked) => isChecked.value = checked}
            size={size.value}
            disabled={isDisabled.value}
            aria-label="Playground switch"
          />
          
          <div class="text-center">
            <p class="text-lg font-medium">
              Switch is {isChecked.value ? 'ON' : 'OFF'}
            </p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Options</h3>
          
          <div class="space-y-2">
            <p class="font-medium">State</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => isChecked.value = false}
                class={`px-3 py-1 rounded ${!isChecked.value ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                OFF
              </button>
              <button
                onClick$={() => isChecked.value = true}
                class={`px-3 py-1 rounded ${isChecked.value ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                ON
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            <p class="font-medium">Size</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => size.value = 'sm'}
                class={`px-3 py-1 rounded ${size.value === 'sm' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Small
              </button>
              <button
                onClick$={() => size.value = 'md'}
                class={`px-3 py-1 rounded ${size.value === 'md' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Medium
              </button>
              <button
                onClick$={() => size.value = 'lg'}
                class={`px-3 py-1 rounded ${size.value === 'lg' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Large
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            <p class="font-medium">Disabled</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => isDisabled.value = false}
                class={`px-3 py-1 rounded ${!isDisabled.value ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Enabled
              </button>
              <button
                onClick$={() => isDisabled.value = true}
                class={`px-3 py-1 rounded ${isDisabled.value ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Disabled
              </button>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Code</h3>
            <button
              onClick$={handleToggleCode}
              class="text-sm text-primary-500 hover:text-primary-600"
            >
              {showCode.value ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
          
          {showCode.value && (
            <CodeBlock
              code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const isChecked = useSignal(${isChecked.value});
  
  return (
    <Switch
      checked={isChecked.value}
      onChange$={(checked) => isChecked.value = checked}
      size="${size.value}"
      ${isDisabled.value ? 'disabled' : ''}
      aria-label="My switch"
    />
  );
});
              `}
              language="tsx"
            />
          )}
        </div>
      </div>
    </div>
  );
}); 