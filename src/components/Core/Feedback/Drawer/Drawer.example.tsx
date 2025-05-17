import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from './Drawer';
import { DrawerPlacement, DrawerSize } from './Drawer.types';

export default component$(() => {
  // State for controlling drawer visibility
  const isBasicDrawerOpen = useSignal(false);
  const isPlacementDrawerOpen = useSignal(false);
  const isSizeDrawerOpen = useSignal(false);
  const isFormDrawerOpen = useSignal(false);
  const isCustomDrawerOpen = useSignal(false);
  
  // Selected placement and size for examples
  const selectedPlacement = useSignal<DrawerPlacement>('right');
  const selectedSize = useSignal<DrawerSize>('md');
  
  // Form state
  const formState = useSignal({
    name: '',
    email: '',
    message: ''
  });
  
  // Handle form submit
  const handleFormSubmit$ = $(() => {
    alert(`Submitted form with values: ${JSON.stringify(formState.value)}`);
    isFormDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-8 p-6">
      <h2 class="text-xl font-semibold mb-4">Drawer Component Examples</h2>
      
      {/* Basic Drawer */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Basic Drawer</h3>
        <p>A simple drawer with default configuration.</p>
        
        <button
          onClick$={() => isBasicDrawerOpen.value = true}
          class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Open Basic Drawer
        </button>
        
        <Drawer
          isOpen={isBasicDrawerOpen.value}
          onClose$={() => isBasicDrawerOpen.value = false}
        >
          <div q:slot="header">Basic Drawer</div>
          <div class="space-y-4">
            <p>This is a basic drawer with default configuration.</p>
            <p>Drawers are useful for displaying additional content without leaving the current page.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Provides easy access to related content</li>
              <li>Maintains context of the current page</li>
              <li>Great for mobile interfaces</li>
            </ul>
          </div>
        </Drawer>
      </section>
      
      {/* Placement Options */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Placement Options</h3>
        <p>Drawers can appear from any edge of the screen.</p>
        
        <div class="flex flex-wrap gap-3">
          <button
            onClick$={() => {
              selectedPlacement.value = 'left';
              isPlacementDrawerOpen.value = true;
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Left Drawer
          </button>
          
          <button
            onClick$={() => {
              selectedPlacement.value = 'right';
              isPlacementDrawerOpen.value = true;
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Right Drawer
          </button>
          
          <button
            onClick$={() => {
              selectedPlacement.value = 'top';
              isPlacementDrawerOpen.value = true;
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Top Drawer
          </button>
          
          <button
            onClick$={() => {
              selectedPlacement.value = 'bottom';
              isPlacementDrawerOpen.value = true;
            }}
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Bottom Drawer
          </button>
        </div>
        
        <Drawer
          isOpen={isPlacementDrawerOpen.value}
          onClose$={() => isPlacementDrawerOpen.value = false}
          placement={selectedPlacement.value}
        >
          <div q:slot="header">{selectedPlacement.value.charAt(0).toUpperCase() + selectedPlacement.value.slice(1)} Drawer</div>
          <div>
            <p>This drawer appears from the {selectedPlacement.value} side of the screen.</p>
            <p class="mt-4">Each placement option is useful for different contexts:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Left/Right:</strong> Navigation, filters, settings</li>
              <li><strong>Top:</strong> Quick actions, notifications</li>
              <li><strong>Bottom:</strong> Mobile keyboards, action sheets</li>
            </ul>
          </div>
        </Drawer>
      </section>
      
      {/* Size Options */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Size Options</h3>
        <p>Drawers come in various sizes to accommodate different content needs.</p>
        
        <div class="flex flex-wrap gap-3">
          {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as DrawerSize[]).map((size) => (
            <button
              key={size}
              onClick$={() => {
                selectedSize.value = size;
                isSizeDrawerOpen.value = true;
              }}
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {size.toUpperCase()} Size
            </button>
          ))}
        </div>
        
        <Drawer
          isOpen={isSizeDrawerOpen.value}
          onClose$={() => isSizeDrawerOpen.value = false}
          size={selectedSize.value}
        >
          <div q:slot="header">{selectedSize.value.toUpperCase()} Size Drawer</div>
          <div>
            <p>This drawer is set to the <strong>{selectedSize.value}</strong> size.</p>
            <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p class="font-medium">Size Recommendations:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li><strong>xs/sm:</strong> Quick actions, notifications</li>
                <li><strong>md:</strong> Forms, settings panels</li>
                <li><strong>lg/xl:</strong> Detailed content, multi-step flows</li>
                <li><strong>full:</strong> Mobile navigation, immersive experiences</li>
              </ul>
            </div>
          </div>
        </Drawer>
      </section>
      
      {/* Form in Drawer */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Form in Drawer</h3>
        <p>Drawers are excellent for containing forms without disrupting the main context.</p>
        
        <button
          onClick$={() => isFormDrawerOpen.value = true}
          class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          Open Form Drawer
        </button>
        
        <Drawer
          isOpen={isFormDrawerOpen.value}
          onClose$={() => isFormDrawerOpen.value = false}
          size="md"
        >
          <div q:slot="header">Contact Form</div>
          
          <form class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formState.value.name}
                onInput$={(event, el) => formState.value = { ...formState.value, name: el.value }}
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formState.value.email}
                onInput$={(event, el) => formState.value = { ...formState.value, email: el.value }}
                required
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formState.value.message}
                onInput$={(event, el) => formState.value = { ...formState.value, message: el.value }}
                required
              ></textarea>
            </div>
          </form>
          
          <div q:slot="footer" class="flex justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              onClick$={() => isFormDrawerOpen.value = false}
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors"
              onClick$={handleFormSubmit$}
            >
              Submit
            </button>
          </div>
        </Drawer>
      </section>
      
      {/* Custom Styling */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Custom Styling</h3>
        <p>Drawers can be customized to match your design system.</p>
        
        <button
          onClick$={() => isCustomDrawerOpen.value = true}
          class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          Open Custom Drawer
        </button>
        
        <Drawer
          isOpen={isCustomDrawerOpen.value}
          onClose$={() => isCustomDrawerOpen.value = false}
          placement="right"
          size="md"
          drawerClass="bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
          customSize="400px"
        >
          <div q:slot="header" class="text-xl font-bold">Custom Drawer</div>
          <div class="space-y-4">
            <p>This drawer features custom styling with:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Gradient background</li>
              <li>Custom width (400px)</li>
              <li>Custom text color</li>
            </ul>
            <p class="mt-6">
              You can customize almost every aspect of the drawer to match your application's design language.
            </p>
          </div>
          <div q:slot="footer" class="flex justify-center">
            <button
              type="button"
              class="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors"
              onClick$={() => isCustomDrawerOpen.value = false}
            >
              Close
            </button>
          </div>
        </Drawer>
      </section>
      
      {/* Accessibility Information */}
      <section class="mt-12 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">Accessibility Features</h3>
        <ul class="list-disc ml-5 mt-3 text-blue-700 dark:text-blue-300 space-y-2">
          <li>
            <strong>Keyboard Navigation:</strong> Close with Escape key, and focus is trapped within the drawer
          </li>
          <li>
            <strong>Focus Management:</strong> Focus is automatically moved into the drawer when opened and restored to the triggering element when closed
          </li>
          <li>
            <strong>ARIA Attributes:</strong> Proper <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">role="dialog"</code> and <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">aria-modal="true"</code> for screen readers
          </li>
          <li>
            <strong>Reduced Motion:</strong> Animation can be disabled for users with motion sensitivity
          </li>
          <li>
            <strong>Screen Reader Announcements:</strong> Drawer content is announced appropriately to screen reader users
          </li>
        </ul>
      </section>
    </div>
  );
});
