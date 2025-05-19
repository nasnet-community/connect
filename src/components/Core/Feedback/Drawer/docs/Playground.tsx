import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '../Drawer';
import { Button } from '~/components/Core/button';

export default component$(() => {
  const isDrawerOpen = useSignal(false);
  const placement = useSignal<'left' | 'right' | 'top' | 'bottom'>('right');
  const size = useSignal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  const hasOverlay = useSignal(true);
  const hasCloseButton = useSignal(true);
  const showFooter = useSignal(false);
  
  const openDrawer = $(() => {
    isDrawerOpen.value = true;
  });
  
  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-6">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Drawer Playground</h2>
        <p>
          Use the controls below to customize the drawer and see how different props affect its appearance and behavior.
        </p>
      </div>
      
      <div class="space-y-6 border rounded-lg p-4 bg-white dark:bg-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Placement</label>
            <div class="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={placement.value === 'left' ? 'primary' : 'outline'}
                onClick$={() => placement.value = 'left'}
              >
                Left
              </Button>
              <Button 
                size="sm" 
                variant={placement.value === 'right' ? 'primary' : 'outline'}
                onClick$={() => placement.value = 'right'}
              >
                Right
              </Button>
              <Button 
                size="sm" 
                variant={placement.value === 'top' ? 'primary' : 'outline'}
                onClick$={() => placement.value = 'top'}
              >
                Top
              </Button>
              <Button 
                size="sm" 
                variant={placement.value === 'bottom' ? 'primary' : 'outline'}
                onClick$={() => placement.value = 'bottom'}
              >
                Bottom
              </Button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Size</label>
            <div class="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={size.value === 'xs' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'xs'}
              >
                XS
              </Button>
              <Button 
                size="sm" 
                variant={size.value === 'sm' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'sm'}
              >
                SM
              </Button>
              <Button 
                size="sm" 
                variant={size.value === 'md' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'md'}
              >
                MD
              </Button>
              <Button 
                size="sm" 
                variant={size.value === 'lg' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'lg'}
              >
                LG
              </Button>
              <Button 
                size="sm" 
                variant={size.value === 'xl' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'xl'}
              >
                XL
              </Button>
              <Button 
                size="sm" 
                variant={size.value === 'full' ? 'primary' : 'outline'}
                onClick$={() => size.value = 'full'}
              >
                Full
              </Button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Options</label>
            <div class="flex flex-wrap gap-3">
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={hasOverlay.value}
                  onChange$={() => hasOverlay.value = !hasOverlay.value}
                  class="form-checkbox h-4 w-4 text-primary-600"
                />
                <span class="ml-2 text-sm">Overlay</span>
              </label>
              
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={hasCloseButton.value}
                  onChange$={() => hasCloseButton.value = !hasCloseButton.value}
                  class="form-checkbox h-4 w-4 text-primary-600"
                />
                <span class="ml-2 text-sm">Close Button</span>
              </label>
              
              <label class="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={showFooter.value}
                  onChange$={() => showFooter.value = !showFooter.value}
                  class="form-checkbox h-4 w-4 text-primary-600"
                />
                <span class="ml-2 text-sm">Footer</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <Button onClick$={openDrawer}>Open Drawer</Button>
        </div>
      </div>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={closeDrawer}
        placement={placement.value}
        size={size.value}
        hasOverlay={hasOverlay.value}
        hasCloseButton={hasCloseButton.value}
      >
        <div q:slot="header">
          Drawer Playground
        </div>
        <div class="p-4 space-y-4">
          <p>
            This is a customizable drawer with the following configuration:
          </p>
          
          <ul class="list-disc pl-6 space-y-1">
            <li><strong>Placement:</strong> {placement.value}</li>
            <li><strong>Size:</strong> {size.value}</li>
            <li><strong>Has Overlay:</strong> {hasOverlay.value ? 'Yes' : 'No'}</li>
            <li><strong>Has Close Button:</strong> {hasCloseButton.value ? 'Yes' : 'No'}</li>
          </ul>
          
          <p class="italic text-sm">
            Try different configurations using the controls on the page.
          </p>
        </div>
        {showFooter.value && (
          <div q:slot="footer" class="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick$={closeDrawer} variant="outline">Cancel</Button>
            <Button onClick$={closeDrawer}>Apply</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}); 