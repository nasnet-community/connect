export { default as Overview } from './Overview';
export { default as Examples } from './Examples';
export { default as APIReference } from './APIReference';
export { default as Usage } from './Usage';
export { default as Playground } from './Playground';

export const componentIntegration = `
The Dialog component can be easily integrated into any Qwik application. Import the component from your components directory and use it to create modal dialogs for important interactions.

Basic usage:
\`\`\`tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter 
} from '~/components/Core/Feedback/Dialog';
import { Button } from '~/components/Core/button';

export default component$(() => {
  const isDialogOpen = useSignal(false);
  
  const openDialog = $(() => {
    isDialogOpen.value = true;
  });
  
  const closeDialog = $(() => {
    isDialogOpen.value = false;
  });
  
  return (
    <div>
      <Button onClick$={openDialog}>Open Dialog</Button>
      
      <Dialog 
        isOpen={isDialogOpen.value} 
        onClose$={closeDialog}
        ariaLabel="Example Dialog"
      >
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>
          <p>This is the main content of the dialog.</p>
        </DialogBody>
        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button variant="outline" onClick$={closeDialog}>
              Cancel
            </Button>
            <Button onClick$={closeDialog}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
\`\`\`

Dialog with form:
\`\`\`tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter 
} from '~/components/Core/Feedback/Dialog';
import { Button } from '~/components/Core/button';
import { Form, Field } from '~/components/Core/Form';

export default component$(() => {
  const isFormDialogOpen = useSignal(false);
  const formState = useSignal({ name: '', email: '' });
  
  const openFormDialog = $(() => {
    isFormDialogOpen.value = true;
  });
  
  const closeFormDialog = $(() => {
    isFormDialogOpen.value = false;
  });
  
  const submitForm = $(() => {
    // Process form data
    console.log('Form submitted:', formState.value);
    closeFormDialog();
  });
  
  return (
    <div>
      <Button onClick$={openFormDialog}>Open Form Dialog</Button>
      
      <Dialog 
        isOpen={isFormDialogOpen.value} 
        onClose$={closeFormDialog}
        size="lg"
      >
        <DialogHeader>Contact Information</DialogHeader>
        <DialogBody>
          <Form>
            <Field
              label="Name"
              name="name"
              value={formState.value.name}
              onInput$={(e: any) => {
                formState.value = {...formState.value, name: e.target.value};
              }}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={formState.value.email}
              onInput$={(e: any) => {
                formState.value = {...formState.value, email: e.target.value};
              }}
              required
            />
          </Form>
        </DialogBody>
        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button variant="outline" onClick$={closeFormDialog}>
              Cancel
            </Button>
            <Button 
              onClick$={submitForm}
              disabled={!formState.value.name || !formState.value.email}
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
\`\`\`
`;

export const customization = `
The Dialog component can be customized to match your application's design system through its various props and by applying custom classes.

### Creating a Custom Dialog Component

You can create a custom dialog component with predefined styling and behavior:

\`\`\`tsx
import { component$, Slot } from '@builder.io/qwik';
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter,
  type DialogProps 
} from '~/components/Core/Feedback/Dialog';

export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm$?: QRL<() => void>;
}

export const ConfirmDialog = component$<ConfirmDialogProps>((props) => {
  const {
    title,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm$,
    ...dialogProps
  } = props;

  return (
    <Dialog 
      {...dialogProps}
      size="sm"
      closeOnOutsideClick={false}
    >
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <Slot />
      </DialogBody>
      <DialogFooter>
        <div class="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick$={() => {
              if (dialogProps.onClose$) {
                dialogProps.onClose$();
              }
            }}
          >
            {cancelLabel}
          </Button>
          <Button 
            onClick$={() => {
              if (onConfirm$) {
                onConfirm$();
              }
              if (dialogProps.onClose$) {
                dialogProps.onClose$();
              }
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
});
\`\`\`

### Creating a Dialog Manager

For applications that use many dialogs, you can create a dialog manager component:

\`\`\`tsx
import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { Dialog } from '~/components/Core/Feedback/Dialog';

export type DialogConfig = {
  id: string;
  isOpen: boolean;
  content: JSX.Element;
  props?: Omit<DialogProps, 'isOpen' | 'onClose$'>;
};

export const useDialogManager = () => {
  const dialogs = useStore<Record<string, DialogConfig>>({});
  
  const openDialog = $((id: string, content: JSX.Element, props?: Omit<DialogProps, 'isOpen' | 'onClose$'>) => {
    dialogs[id] = {
      id,
      isOpen: true,
      content,
      props
    };
  });
  
  const closeDialog = $((id: string) => {
    if (dialogs[id]) {
      dialogs[id].isOpen = false;
      // Optional: Remove the dialog completely after animation finishes
      setTimeout(() => {
        const newDialogs = { ...dialogs };
        delete newDialogs[id];
        Object.assign(dialogs, newDialogs);
      }, 300);
    }
  });
  
  return {
    dialogs,
    openDialog,
    closeDialog
  };
};

export const DialogManager = component$(() => {
  const { dialogs, closeDialog } = useDialogManager();
  
  return (
    <>
      {Object.values(dialogs).map((dialogConfig) => (
        <Dialog
          key={dialogConfig.id}
          isOpen={dialogConfig.isOpen}
          onClose$={() => closeDialog(dialogConfig.id)}
          {...(dialogConfig.props || {})}
        >
          {dialogConfig.content}
        </Dialog>
      ))}
    </>
  );
});
\`\`\`
`; 