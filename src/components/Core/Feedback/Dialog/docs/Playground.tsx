import { component$, useSignal } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter 
} from '../';
import { Button } from '~/components/Core/button';

/**
 * Dialog component playground using the standard template
 */
export default component$(() => {
  // Define the DialogDemo component that will be controlled by the playground
  const DialogDemo = component$<{
    size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    hasTitle: boolean;
    title: string;
    closeOnOutsideClick: boolean;
    closeOnEsc: boolean;
    hasCloseButton: boolean;
    isCentered: boolean;
    disableAnimation: boolean;
    hasBackdrop: boolean;
    scrollable: boolean;
    hasFooter: boolean;
  }>((props) => {
    const isDialogOpen = useSignal(false);
    
    return (
      <div class="flex flex-col items-center">
        <Button 
          onClick$={() => isDialogOpen.value = true}
          class="mb-4"
        >
          Open Dialog
        </Button>
        
        <Dialog
          isOpen={isDialogOpen.value}
          onClose$={() => isDialogOpen.value = false}
          size={props.size}
          closeOnOutsideClick={props.closeOnOutsideClick}
          closeOnEsc={props.closeOnEsc}
          hasCloseButton={props.hasCloseButton}
          isCentered={props.isCentered}
          disableAnimation={props.disableAnimation}
          hasBackdrop={props.hasBackdrop}
          scrollable={props.scrollable}
          title={props.hasTitle ? props.title : undefined}
        >
          {props.hasTitle && !props.title && (
            <DialogHeader>
              Dialog Title
            </DialogHeader>
          )}
          
          <DialogBody scrollable={props.scrollable}>
            <div class="space-y-4">
              <p>This is a dialog that demonstrates configurable options.</p>
              <p>You can customize the behavior and appearance of this dialog using the controls provided in the playground.</p>
              
              {props.scrollable && (
                <>
                  {/* Add extra content to demonstrate scrolling */}
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} class="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                      <h4 class="font-medium">Section {index + 1}</h4>
                      <p>
                        This additional content demonstrates scrollable behavior. When there is a lot of content, 
                        the dialog body will scroll while keeping the header and footer fixed.
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </DialogBody>
          
          {props.hasFooter && (
            <DialogFooter>
              <div class="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick$={() => isDialogOpen.value = false}
                >
                  Cancel
                </Button>
                <Button onClick$={() => isDialogOpen.value = false}>
                  Confirm
                </Button>
              </div>
            </DialogFooter>
          )}
        </Dialog>
        
        {/* Playground dialog state display */}
        <div class="mt-8 p-4 border rounded-md text-sm bg-gray-50 dark:bg-gray-800 w-full">
          <p class="font-medium mb-2">Current Dialog State:</p>
          <p>Dialog is: <span class="font-mono">{isDialogOpen.value ? 'Open' : 'Closed'}</span></p>
          <p>Size: <span class="font-mono">{props.size}</span></p>
          <p>Close on Outside Click: <span class="font-mono">{props.closeOnOutsideClick ? 'Yes' : 'No'}</span></p>
          <p>Close on Esc: <span class="font-mono">{props.closeOnEsc ? 'Yes' : 'No'}</span></p>
          <p>Has Close Button: <span class="font-mono">{props.hasCloseButton ? 'Yes' : 'No'}</span></p>
          <p>Is Centered: <span class="font-mono">{props.isCentered ? 'Yes' : 'No'}</span></p>
          <p>Animation: <span class="font-mono">{props.disableAnimation ? 'Disabled' : 'Enabled'}</span></p>
          <p>Backdrop: <span class="font-mono">{props.hasBackdrop ? 'Visible' : 'Hidden'}</span></p>
          <p>Scrollable: <span class="font-mono">{props.scrollable ? 'Yes' : 'No'}</span></p>
          <p>Has Footer: <span class="font-mono">{props.hasFooter ? 'Yes' : 'No'}</span></p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'select',
      name: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: 'Full Width', value: 'full' }
      ],
      defaultValue: 'md'
    },
    {
      type: 'boolean',
      name: 'hasTitle',
      label: 'Show Title',
      defaultValue: true
    },
    {
      type: 'text',
      name: 'title',
      label: 'Title Text',
      defaultValue: 'Dialog Title'
    },
    {
      type: 'boolean',
      name: 'closeOnOutsideClick',
      label: 'Close on Outside Click',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'closeOnEsc',
      label: 'Close on Esc Key',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'hasCloseButton',
      label: 'Show Close Button',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'isCentered',
      label: 'Center Vertically',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'disableAnimation',
      label: 'Disable Animation',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'hasBackdrop',
      label: 'Show Backdrop',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'scrollable',
      label: 'Scrollable Content',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'hasFooter',
      label: 'Show Footer',
      defaultValue: true
    }
  ];

  return (
    <PlaygroundTemplate
      component={DialogDemo}
      properties={properties}
    />
  );
}); 