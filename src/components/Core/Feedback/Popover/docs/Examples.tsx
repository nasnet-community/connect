import { component$ } from '@builder.io/qwik';
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { 
  BasicPopover, 
  PlacementPopover, 
  SizePopover, 
  TriggerPopover,
  FormPopover
} from '../Examples';

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Popover</h2>
        <p>
          The basic Popover component displays a simple floating content when triggered.
          It uses default settings: click trigger, bottom placement, and medium size.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <BasicPopover />
        </div>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export const BasicPopover = component$(() => {
  return (
    <div class="flex justify-center py-4">
      <Popover>
        <PopoverTrigger>
          <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Click me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-3">
            <h4 class="font-semibold">Basic Popover</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              This is a basic popover with default settings.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Placement Variations</h2>
        <p>
          Popovers can be positioned in 12 different ways relative to the trigger element,
          and can optionally show an arrow pointing to the trigger.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <PlacementPopover />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverPlacement } from '~/components/Core/Feedback/Popover';

export const PlacementPopover = component$(() => {
  const activePlacement = useSignal<PopoverPlacement>('bottom');
  const hasArrow = useSignal(true);

  const placements: PopoverPlacement[] = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ];

  return (
    <div class="space-y-4">
      {/* Placement controls */}
      <div class="flex flex-wrap gap-2">
        {placements.map((placement) => (
          <button
            key={placement}
            onClick$={() => {
              activePlacement.value = placement;
            }}
            class={\`px-3 py-1.5 border rounded-md text-sm \${
              activePlacement.value === placement
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-700'
            }\`}
          >
            {placement}
          </button>
        ))}
      </div>

      {/* Arrow toggle */}
      <div>
        <label class="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={hasArrow.value} 
            onChange$={() => hasArrow.value = !hasArrow.value}
          />
          <span>Show arrow</span>
        </label>
      </div>
      
      {/* Popover example */}
      <div class="flex items-center justify-center h-60 border border-dashed border-gray-300 rounded-lg p-4">
        <Popover 
          placement={activePlacement.value}
          hasArrow={hasArrow.value}
        >
          <PopoverTrigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-md">
              {activePlacement.value} placement
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">Placement: {activePlacement.value}</h4>
              <p class="text-sm mt-1">
                This popover is positioned at the {activePlacement.value} of the trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Size Variations</h2>
        <p>
          Popovers come in three sizes: small (sm), medium (md), and large (lg).
          Choose the appropriate size based on your content needs.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <SizePopover />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverSize } from '~/components/Core/Feedback/Popover';

export const SizePopover = component$(() => {
  const activeSize = useSignal<PopoverSize>('md');
  const sizes: PopoverSize[] = ['sm', 'md', 'lg'];

  return (
    <div class="space-y-4">
      <div class="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick$={() => {
              activeSize.value = size;
            }}
            class={\`px-3 py-1.5 border rounded-md text-sm \${
              activeSize.value === size
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-700'
            }\`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div class="flex justify-center py-4">
        <Popover size={activeSize.value}>
          <PopoverTrigger>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md">
              {activeSize.value.toUpperCase()} Size Popover
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-3">
              <h4 class="font-semibold">Size: {activeSize.value.toUpperCase()}</h4>
              <p class="text-sm mt-1">
                This popover uses the {activeSize.value} size variant.
              </p>
              {activeSize.value === 'lg' && (
                <div class="mt-2 text-sm">
                  <p>Larger popovers are great for:</p>
                  <ul class="list-disc ml-5 mt-1">
                    <li>Displaying more complex content</li>
                    <li>Forms and input fields</li>
                    <li>Rich media content</li>
                  </ul>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Trigger Variations</h2>
        <p>
          Popovers can be triggered in different ways: click, hover, focus, or manual control.
          Choose the appropriate trigger method based on your use case.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <TriggerPopover />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverTrigger as TriggerType } from '~/components/Core/Feedback/Popover';

export const TriggerPopover = component$(() => {
  const activeTrigger = useSignal<TriggerType>('click');
  const isOpen = useSignal(false);
  
  const triggers: TriggerType[] = ['click', 'hover', 'focus', 'manual'];

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        {triggers.map((trigger) => (
          <button
            key={trigger}
            onClick$={() => {
              activeTrigger.value = trigger;
            }}
            class={\`px-3 py-1.5 border rounded-md text-sm \${
              activeTrigger.value === trigger
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-700'
            }\`}
          >
            {trigger}
          </button>
        ))}
      </div>
      
      <div class="flex justify-center py-4">
        {activeTrigger.value !== 'manual' ? (
          <Popover trigger={activeTrigger.value}>
            <PopoverTrigger>
              <button class="px-4 py-2 bg-purple-500 text-white rounded-md">
                {activeTrigger.value === 'click' ? 'Click me' : 
                 activeTrigger.value === 'hover' ? 'Hover me' : 'Focus me'}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-3">
                <h4 class="font-semibold">Trigger: {activeTrigger.value}</h4>
                <p class="text-sm mt-1">
                  This popover is triggered by {activeTrigger.value}.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div class="flex items-center gap-3">
            <Popover trigger="manual" isOpen={isOpen.value}>
              <PopoverTrigger>
                <button class="px-4 py-2 bg-purple-500 text-white rounded-md">
                  Manual trigger
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="p-3">
                  <h4 class="font-semibold">Manual Trigger</h4>
                  <p class="text-sm mt-1">
                    This popover is controlled manually through state.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            <div class="flex gap-2">
              <button 
                onClick$={() => isOpen.value = true}
                class="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm"
              >
                Open
              </button>
              <button 
                onClick$={() => isOpen.value = false}
                class="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Form in Popover</h2>
        <p>
          Popovers can contain complex content like forms. This example demonstrates
          a contact form inside a popover, with form submission handling.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <FormPopover />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export const FormPopover = component$(() => {
  const isOpen = useSignal(false);
  const name = useSignal('');
  const email = useSignal('');
  const submitted = useSignal(false);
  
  const handleOpen = $(() => {
    submitted.value = false;
  });
  
  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    if (name.value && email.value) {
      submitted.value = true;
      // In a real app, you would submit the form data here
      setTimeout(() => {
        isOpen.value = false;
        // Reset form after closing
        setTimeout(() => {
          name.value = '';
          email.value = '';
        }, 300);
      }, 1500);
    }
  });

  return (
    <div class="flex justify-center py-4">
      <Popover 
        trigger="click" 
        isOpen={isOpen.value} 
        onOpenChange$={(open) => isOpen.value = open}
        onOpen$={handleOpen}
        size="lg"
      >
        <PopoverTrigger>
          <button class="px-4 py-2 bg-indigo-500 text-white rounded-md">
            Open Form Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <h4 class="font-semibold text-lg">Contact Form</h4>
            {!submitted.value ? (
              <form onSubmit$={handleSubmit} class="mt-3 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    value={name.value}
                    onInput$={(e) => name.value = (e.target as HTMLInputElement).value}
                    class="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email.value}
                    onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
                    class="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div class="flex justify-end space-x-2">
                  <button 
                    type="button"
                    onClick$={() => isOpen.value = false}
                    class="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-primary-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div class="mt-3 text-center py-4">
                <p class="text-green-600 font-medium">Thanks for your submission!</p>
                <p class="text-sm text-gray-600 mt-1">We'll contact you soon.</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
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