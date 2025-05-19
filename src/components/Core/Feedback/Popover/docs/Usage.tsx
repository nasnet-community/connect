import { component$ } from '@builder.io/qwik';
import { CodeBlock } from '~/components/Core/Typography/CodeDisplay';

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage</h2>
        <p>
          The Popover component is a compound component consisting of three parts: <code>Popover</code>, 
          <code>PopoverTrigger</code>, and <code>PopoverContent</code>. Here's a basic example:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  return (
    <Popover>
      <PopoverTrigger>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-md">
          Click me
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div class="p-4">
          <h4 class="font-semibold">Popover Title</h4>
          <p class="text-sm mt-1">This is the popover content.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Controlling Placement</h2>
        <p>
          You can control the placement of the popover by setting the <code>placement</code> prop:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-md">
          Top Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div class="p-4">
          <p>This popover appears above the trigger.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Different Trigger Methods</h2>
        <p>
          The Popover component supports different trigger methods: click, hover, focus, or manual:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  return (
    <div class="flex space-x-4">
      {/* Click trigger (default) */}
      <Popover trigger="click">
        <PopoverTrigger>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md">
            Click me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <p>Opens on click (default behavior)</p>
          </div>
        </PopoverContent>
      </Popover>

      {/* Hover trigger */}
      <Popover trigger="hover">
        <PopoverTrigger>
          <button class="px-4 py-2 bg-green-500 text-white rounded-md">
            Hover me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <p>Opens on hover</p>
          </div>
        </PopoverContent>
      </Popover>

      {/* Focus trigger */}
      <Popover trigger="focus">
        <PopoverTrigger>
          <button class="px-4 py-2 bg-purple-500 text-white rounded-md">
            Focus me
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <p>Opens on focus</p>
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
        <h2 class="text-xl font-semibold">Manual Control</h2>
        <p>
          For more complex scenarios, you can manually control the open state of the popover:
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  const isOpen = useSignal(false);
  
  const togglePopover = $(() => {
    isOpen.value = !isOpen.value;
  });

  return (
    <div class="flex items-center space-x-4">
      <Popover 
        trigger="manual" 
        isOpen={isOpen.value}
        onOpenChange$={(open) => isOpen.value = open}
      >
        <PopoverTrigger>
          <button class="px-4 py-2 bg-indigo-500 text-white rounded-md">
            Manual trigger
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <p>This popover is controlled manually.</p>
            <button 
              onClick$={() => isOpen.value = false}
              class="mt-2 px-3 py-1 bg-gray-200 rounded text-sm"
            >
              Close
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <button 
        onClick$={togglePopover}
        class="px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        {isOpen.value ? 'Close' : 'Open'} Popover
      </button>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Using Event Callbacks</h2>
        <p>
          You can use the <code>onOpen$</code>, <code>onClose$</code>, and <code>onOpenChange$</code> callbacks
          to respond to popover state changes:
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  const handleOpen = $(() => {
    console.log('Popover opened');
    // You can fetch data or perform other actions when the popover opens
  });
  
  const handleClose = $(() => {
    console.log('Popover closed');
    // You can clean up or perform other actions when the popover closes
  });
  
  const handleOpenChange = $((isOpen: boolean) => {
    console.log('Popover state changed:', isOpen);
    // Handle state change in a single callback
  });

  return (
    <Popover
      onOpen$={handleOpen}
      onClose$={handleClose}
      onOpenChange$={handleOpenChange}
    >
      <PopoverTrigger>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-md">
          Click me
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div class="p-4">
          <p>Check the console for event logs!</p>
        </div>
      </PopoverContent>
    </Popover>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Forms in Popovers</h2>
        <p>
          Popovers are great for containing forms that don't require a full page navigation:
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  const isOpen = useSignal(false);
  const name = useSignal('');
  const email = useSignal('');
  
  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    console.log('Form submitted:', { name: name.value, email: email.value });
    // Process form data
    isOpen.value = false;
  });

  return (
    <Popover 
      trigger="click" 
      isOpen={isOpen.value} 
      onOpenChange$={(open) => isOpen.value = open}
      size="lg"
    >
      <PopoverTrigger>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-md">
          Contact Us
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div class="p-4">
          <h4 class="font-semibold text-lg">Contact Form</h4>
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
        </div>
      </PopoverContent>
    </Popover>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Best Practices</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            <strong>Choose the right trigger:</strong> Use click for more complex interactions, hover for quick information, 
            and focus for form-related context.
          </li>
          <li>
            <strong>Consider placement:</strong> Place popovers where they won't be cut off by screen edges or 
            obscure important content.
          </li>
          <li>
            <strong>Appropriate content:</strong> Keep popover content concise and directly relevant to the trigger element.
          </li>
          <li>
            <strong>Dismissal options:</strong> For complex popovers with forms, always provide clear ways to cancel or dismiss.
          </li>
          <li>
            <strong>Animations:</strong> The Popover component includes subtle animations by default to help users understand what's happening.
          </li>
          <li>
            <strong>Size appropriately:</strong> Use the smallest size that comfortably fits your content.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Considerations</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            The Popover uses <code>role="dialog"</code> and appropriate ARIA attributes for screen reader accessibility.
          </li>
          <li>
            For hover triggers, ensure content is also accessible via keyboard focus or click events.
          </li>
          <li>
            Avoid using popovers for critical actions or primary navigation as they may be difficult to discover.
          </li>
          <li>
            When using forms in popovers, ensure error messages are clearly visible and accessible.
          </li>
          <li>
            Popovers can be closed with the Escape key by default, which is an important accessibility feature.
          </li>
        </ul>
      </section>
    </div>
  );
}); 