import { component$ } from '@builder.io/qwik';
import { CodeBlock } from '~/components/Core/Typography/CodeDisplay';

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <p>
          Import the Drawer component and any related components from the Core/Feedback/Drawer path.
        </p>
        <CodeBlock
          code={`
import { Drawer } from '~/components/Core/Feedback/Drawer';

// Optional sub-components if you need direct access to them
import { DrawerHeader } from '~/components/Core/Feedback/Drawer/DrawerHeader';
import { DrawerContent } from '~/components/Core/Feedback/Drawer/DrawerContent';
import { DrawerFooter } from '~/components/Core/Feedback/Drawer/DrawerFooter';
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage</h2>
        <p>
          The Drawer component is typically used with a trigger element (like a button) to open it. 
          Use a state variable to control the open/closed state.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '~/components/Core/Feedback/Drawer';
import { Button } from '~/components/Core/button';

export default component$(() => {
  const isDrawerOpen = useSignal(false);
  
  return (
    <>
      <Button onClick$={() => isDrawerOpen.value = true}>
        Open Drawer
      </Button>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={() => isDrawerOpen.value = false}
      >
        <div q:slot="header">Drawer Title</div>
        <div>
          <p>This is the content area of the drawer.</p>
        </div>
      </Drawer>
    </>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Using Slots vs Props</h2>
        <p>
          The Drawer component supports two ways to provide content: using Qwik slots or by passing content as props.
          Choose the approach that better fits your use case.
        </p>
        <h3 class="text-lg font-medium mt-4">Using Slots (Recommended)</h3>
        <CodeBlock
          code={`
<Drawer isOpen={isOpen.value} onClose$={onClose}>
  <div q:slot="header">Drawer Title</div>
  <div>Main content goes here</div>
  <div q:slot="footer">
    <Button onClick$={onClose}>Close</Button>
    <Button onClick$={onSave}>Save</Button>
  </div>
</Drawer>
          `}
          language="tsx"
        />
        <h3 class="text-lg font-medium mt-4">Using Props</h3>
        <CodeBlock
          code={`
<Drawer 
  isOpen={isOpen.value}
  onClose$={onClose}
  header={<div>Drawer Title</div>}
  footer={
    <div class="flex justify-end gap-2">
      <Button onClick$={onClose}>Close</Button>
      <Button onClick$={onSave}>Save</Button>
    </div>
  }
>
  <div>Main content goes here</div>
</Drawer>
          `}
          language="tsx"
        />
        <p class="text-sm italic">
          Note: When using slots, you need to apply the <code>q:slot</code> attribute to the elements that should go in specific slots.
          The default slot (without any <code>q:slot</code> attribute) is used for the main content area.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Placement Options</h2>
        <p>
          Control the placement of the drawer using the <code>placement</code> prop. 
          The drawer can appear from any of the four sides of the screen.
        </p>
        <CodeBlock
          code={`
// Right drawer (default)
<Drawer 
  isOpen={isOpen.value} 
  onClose$={onClose}
  placement="right"
>
  {/* content */}
</Drawer>

// Left drawer
<Drawer 
  isOpen={isOpen.value} 
  onClose$={onClose}
  placement="left"
>
  {/* content */}
</Drawer>

// Top drawer
<Drawer 
  isOpen={isOpen.value} 
  onClose$={onClose}
  placement="top"
>
  {/* content */}
</Drawer>

// Bottom drawer
<Drawer 
  isOpen={isOpen.value} 
  onClose$={onClose}
  placement="bottom"
>
  {/* content */}
</Drawer>
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizing Options</h2>
        <p>
          Control the size of the drawer using the <code>size</code> prop or use <code>customSize</code> for specific dimensions.
        </p>
        <CodeBlock
          code={`
// Predefined sizes
<Drawer size="xs">...</Drawer>
<Drawer size="sm">...</Drawer>
<Drawer size="md">...</Drawer> {/* default */}
<Drawer size="lg">...</Drawer>
<Drawer size="xl">...</Drawer>
<Drawer size="full">...</Drawer>

// Custom size
<Drawer customSize="320px">...</Drawer>
<Drawer customSize="40%">...</Drawer>
          `}
          language="tsx"
        />
        <p class="text-sm italic">
          Note: The meaning of the size depends on the placement:
          <br />
          - For left/right placement, it controls the width
          <br />
          - For top/bottom placement, it controls the height
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Considerations</h2>
        <p>
          The Drawer component already implements ARIA attributes and keyboard navigation, but you should follow these best practices:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            Provide a descriptive title in the header to identify the drawer's purpose to screen reader users
          </li>
          <li>
            Use <code>ariaLabel</code>, <code>ariaLabelledby</code>, or <code>ariaDescribedby</code> props when appropriate
          </li>
          <li>
            Ensure that the drawer content is well-structured with proper headings and semantics
          </li>
          <li>
            Keep focus order logical and intuitive within the drawer content
          </li>
          <li>
            Make sure all interactive elements are keyboard accessible
          </li>
        </ul>
        <CodeBlock
          code={`
// Using aria attributes for better accessibility
<Drawer
  isOpen={isOpen.value}
  onClose$={onClose}
  ariaLabelledby="drawer-title"
  ariaDescribedby="drawer-description"
>
  <div q:slot="header">
    <h2 id="drawer-title">Settings</h2>
  </div>
  <div>
    <p id="drawer-description">Configure your application settings below.</p>
    {/* Drawer content */}
  </div>
</Drawer>
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Customization</h2>
        <p>
          Customize the appearance of the drawer using the provided class props.
        </p>
        <CodeBlock
          code={`
<Drawer
  isOpen={isOpen.value}
  onClose$={onClose}
  class="custom-drawer"
  drawerClass="dark:bg-gray-900"
  overlayClass="bg-black/70"
>
  {/* content */}
</Drawer>
          `}
          language="tsx"
        />
        <p>
          You can also customize the header, content, and footer sections:
        </p>
        <CodeBlock
          code={`
<Drawer isOpen={isOpen.value} onClose$={onClose}>
  <div q:slot="header" class="bg-primary-100 dark:bg-primary-900">
    Custom Header
  </div>
  <div class="p-6 bg-gray-50 dark:bg-gray-800">
    Custom Content
  </div>
  <div q:slot="footer" class="bg-gray-100 dark:bg-gray-700">
    Custom Footer
  </div>
</Drawer>
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Common Patterns</h2>
        
        <h3 class="text-lg font-medium mt-4">Form Drawer</h3>
        <p>
          Use a drawer to contain forms that don't require a full page.
        </p>
        <CodeBlock
          code={`
<Drawer 
  isOpen={isFormDrawerOpen.value} 
  onClose$={() => isFormDrawerOpen.value = false}
>
  <div q:slot="header">Create New User</div>
  
  <Form onSubmit$={onSubmit}>
    <Field label="Name" name="name" required />
    <Field label="Email" name="email" type="email" required />
    {/* Other fields */}
  </Form>
  
  <div q:slot="footer" class="flex justify-end gap-2">
    <Button 
      variant="outline" 
      onClick$={() => isFormDrawerOpen.value = false}
    >
      Cancel
    </Button>
    <Button type="submit">Save</Button>
  </div>
</Drawer>
          `}
          language="tsx"
        />
        
        <h3 class="text-lg font-medium mt-4">Details Drawer</h3>
        <p>
          Show additional details about an item without navigating away.
        </p>
        <CodeBlock
          code={`
<Drawer 
  isOpen={isDetailsDrawerOpen.value} 
  onClose$={() => isDetailsDrawerOpen.value = false}
  size="lg"
>
  <div q:slot="header">Item Details</div>
  
  {selectedItem.value && (
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-2">
        <div class="font-semibold">ID:</div>
        <div>{selectedItem.value.id}</div>
        <div class="font-semibold">Name:</div>
        <div>{selectedItem.value.name}</div>
        <div class="font-semibold">Category:</div>
        <div>{selectedItem.value.category}</div>
        {/* More item details */}
      </div>
    </div>
  )}
</Drawer>
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Performance Considerations</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            The drawer component only renders when <code>isOpen</code> is true or was recently true (for animations),
            which helps with performance
          </li>
          <li>
            For drawers with complex content, consider loading the content dynamically when the drawer opens
          </li>
          <li>
            Use <code>disableAnimation</code> on low-end devices or when animations aren't needed
          </li>
        </ul>
      </section>
    </div>
  );
}); 