import { $, component$, useSignal } from '@builder.io/qwik';
import { Modal, type ModalProps } from './Modal';
import { Button } from '../button/Button';

// Define a type for the stories args
type StoryArgs = Omit<ModalProps, 'isOpen' | 'onClose'>;

// Create a wrapper to handle state
const ModalDemo = component$<Omit<ModalProps, 'isOpen' | 'onClose'> & { initialOpen?: boolean }>(
  (props) => {
    const isOpen = useSignal(props.initialOpen || false);
    const toggleModal = $(() => {
      isOpen.value = !isOpen.value;
    });

    return (
      <div>
        <Button onClick$={toggleModal}>Open Modal</Button>
        <Modal {...props} isOpen={isOpen.value} onClose={toggleModal} />
      </div>
    );
  }
);

export default {
  title: 'Core/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdropClick: { control: 'boolean' },
    hasCloseButton: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
    centered: { control: 'boolean' },
    preventScroll: { control: 'boolean' },
  },
};

export const Default = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      title="Default Modal"
    >
      <p>This is the content of the modal.</p>
    </ModalDemo>
  ),
};

export const WithCustomTitle = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      hasHeader
    >
      <h3 q:slot="title" class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-primary-500">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="8"></line>
        </svg>
        Custom Title With Icon
      </h3>
      <p>This modal has a custom title with an icon.</p>
    </ModalDemo>
  ),
};

export const WithFooter = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      hasFooter
      title="Modal With Footer"
    >
      <p>This modal has a footer with action buttons.</p>
      <div q:slot="footer">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </ModalDemo>
  ),
};

export const SmallSize = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      size="sm"
      title="Small Modal"
    >
      <p>This is a small sized modal.</p>
    </ModalDemo>
  ),
};

export const LargeSize = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      size="lg"
      title="Large Modal"
    >
      <p>This is a large sized modal with more space for content.</p>
      <div class="mt-4 h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p>Content area</p>
      </div>
    </ModalDemo>
  ),
};

export const FullWidth = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      size="full"
      title="Full Width Modal"
    >
      <p>This modal takes up the full width of the viewport (with small margins).</p>
      <div class="mt-4 h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p>Full width content area</p>
      </div>
    </ModalDemo>
  ),
};

export const NoHeader = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      hasHeader={false}
    >
      <div class="mb-4">
        <h3 class="text-lg font-medium">Modal Without Header</h3>
        <p class="mt-2">This modal doesn't have the standard header with close button.</p>
      </div>
      <Button>Close Modal</Button>
    </ModalDemo>
  ),
};

export const CompleteExample = {
  render: (args: StoryArgs) => (
    <ModalDemo
      {...args}
      size="lg"
      hasHeader
      hasFooter
      title="Complete Modal Example"
    >
      <div class="space-y-4">
        <p>This is a complete modal example with:</p>
        <ul class="list-disc pl-5">
          <li>Header with title</li>
          <li>Content body</li>
          <li>Footer with actions</li>
        </ul>
        <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
          <p class="text-yellow-800 dark:text-yellow-300 text-sm">
            This is an important notice inside the modal.
          </p>
        </div>
      </div>
      <div q:slot="footer">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </ModalDemo>
  ),
}; 