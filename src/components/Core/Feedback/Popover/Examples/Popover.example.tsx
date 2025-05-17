import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { PopoverPlacement, PopoverSize, PopoverTrigger as TriggerType } from './Popover.types';

export default component$(() => {
  const activePlacement = useSignal<PopoverPlacement>('bottom');
  const activeSize = useSignal<PopoverSize>('md');
  const activeTrigger = useSignal<TriggerType>('click');
  const hasArrow = useSignal(true);
  const isOpen = useSignal(false);

  const placements: PopoverPlacement[] = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ];

  const sizes: PopoverSize[] = ['sm', 'md', 'lg'];
  const triggers: TriggerType[] = ['click', 'hover', 'focus', 'manual'];
  
  const handleOpen$ = $(() => {
    console.log('Popover opened');
  });
  
  const handleClose$ = $(() => {
    console.log('Popover closed');
  });

  return (
    <div class="p-6 space-y-12">
      <h2 class="text-2xl font-semibold mb-6">Popover Component Examples</h2>

      {/* Basic Popover */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Basic Popover</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A simple popover with default configuration.
        </p>
        
        <div class="mt-4">
          <Popover>
            <PopoverTrigger>
              <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                Click me
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Basic Popover</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  This is a basic popover with default settings.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Placement Examples */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Placement Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be positioned in various ways relative to the trigger element.
        </p>
        
        <div class="flex flex-wrap gap-3 mt-2">
          {placements.map((placement) => (
            <button
              key={placement}
              onClick$={() => {
                activePlacement.value = placement;
              }}
              class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                activePlacement.value === placement
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              {placement}
            </button>
          ))}
        </div>
        
        <div class="flex items-center justify-center h-60 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <Popover 
            placement={activePlacement.value}
            hasArrow={hasArrow.value}
          >
            <PopoverTrigger>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                {activePlacement.value} placement
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Placement: {activePlacement.value}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  This popover is positioned at the {activePlacement.value} of the trigger.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Size Variations */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Size Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers come in different sizes to suit various content needs.
        </p>
        
        <div class="flex gap-4 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick$={() => {
                activeSize.value = size;
              }}
              class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                activeSize.value === size
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div class="mt-4">
          <Popover size={activeSize.value}>
            <PopoverTrigger>
              <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                {activeSize.value.toUpperCase()} Size Popover
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Size: {activeSize.value.toUpperCase()}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  This popover uses the {activeSize.value} size variant.
                </p>
                {activeSize.value === 'lg' && (
                  <div class="mt-2 text-sm">
                    <p>Larger popovers are great for:</p>
                    <ul class="list-disc ml-5 mt-1 space-y-1">
                      <li>Displaying more complex content</li>
                      <li>Forms and input fields</li>
                      <li>Rich media content</li>
                      <li>Detailed information display</li>
                    </ul>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Trigger Variations */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Trigger Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be triggered in different ways: click, hover, focus, or manual control.
        </p>
        
        <div class="flex gap-4 mt-2">
          {triggers.map((trigger) => (
            <button
              key={trigger}
              onClick$={() => {
                activeTrigger.value = trigger;
              }}
              class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                activeTrigger.value === trigger
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              {trigger}
            </button>
          ))}
        </div>
        
        <div class="mt-4 flex flex-wrap gap-6">
          {activeTrigger.value !== 'manual' ? (
            <Popover trigger={activeTrigger.value}>
              <PopoverTrigger>
                <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                  {activeTrigger.value === 'click' ? 'Click me' : 
                   activeTrigger.value === 'hover' ? 'Hover me' : 'Focus me'}
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="p-1">
                  <h4 class="font-semibold">Trigger: {activeTrigger.value}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    This popover is triggered by {activeTrigger.value}.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div class="flex items-center gap-3">
              <Popover trigger="manual" isOpen={isOpen.value}>
                <PopoverTrigger>
                  <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                    Manual trigger
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div class="p-1">
                    <h4 class="font-semibold">Manual Trigger</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
      </section>

      {/* Arrow Toggle */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">With/Without Arrow</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be displayed with or without an arrow pointing to the trigger.
        </p>
        
        <div class="flex gap-4 mt-2">
          <button
            onClick$={() => {
              hasArrow.value = true;
            }}
            class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              hasArrow.value
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
            }`}
          >
            With Arrow
          </button>
          <button
            onClick$={() => {
              hasArrow.value = false;
            }}
            class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              !hasArrow.value
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
            }`}
          >
            Without Arrow
          </button>
        </div>
      </section>

      {/* Callbacks Example */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">With Callbacks</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can trigger callbacks when they open or close.
        </p>
        
        <div class="mt-4">
          <Popover onOpen$={handleOpen$} onClose$={handleClose$}>
            <PopoverTrigger>
              <button class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
                With Callbacks
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Callback Example</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  This popover logs messages to the console when opened or closed.
                </p>
                <div class="mt-2 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <code>Check your browser console for logs</code>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Rich Content Example */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Rich Content</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can contain rich, interactive content like forms or complex UI.
        </p>
        
        <div class="mt-4">
          <Popover size="lg">
            <PopoverTrigger>
              <button class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                Show Rich Content
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                  User Profile
                </h4>
                <div class="flex items-start gap-4">
                  <div class="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
                    JD
                  </div>
                  <div class="flex-1">
                    <div class="space-y-1">
                      <p class="font-medium">John Doe</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Product Designer
                      </p>
                    </div>
                    <div class="flex gap-2 mt-3">
                      <button class="px-3 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100 rounded">
                        View Profile
                      </button>
                      <button class="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Last active: 10 minutes ago
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Accessibility Information */}
      <section class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg mt-12">
        <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">
          Accessibility Features
        </h3>
        <ul class="list-disc ml-5 mt-3 space-y-2 text-blue-700 dark:text-blue-300">
          <li>
            <strong>Keyboard Navigation:</strong> Close with Escape key; focus is managed appropriately
          </li>
          <li>
            <strong>ARIA Attributes:</strong> Uses <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">role="tooltip"</code> for screen readers
          </li>
          <li>
            <strong>Focus Management:</strong> Content receives focus when opened
          </li>
          <li>
            <strong>Multiple Trigger Methods:</strong> Support for click, hover, and focus triggers for different use cases
          </li>
          <li>
            <strong>Close on Outside Click:</strong> Allows users to easily dismiss the popover
          </li>
        </ul>
      </section>
    </div>
  );
});
