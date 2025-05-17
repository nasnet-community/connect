import { Toast } from './Toast';
import { ToastContainer } from './ToastContainer';

export default {
  title: 'Core/Feedback/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: `
## Toast Component

Toast notifications are brief, temporary messages that appear on the screen to provide feedback to the user.
They are useful for confirmations, alerts, and other non-disruptive notifications.

### Features

- Status variants: info, success, warning, error
- Customizable duration with auto-dismiss
- Progress indicator showing remaining time
- Support for action buttons
- Loading state support
- Pause auto-dismiss on hover
- Keyboard accessibility (Alt+T to focus, Escape to dismiss)
- Screen reader announcements via ARIA live regions
- Dark mode support
- Flexible positioning options
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Status variant of the toast',
      defaultValue: 'info',
    },
    title: {
      control: 'text',
      description: 'Title text for the toast',
    },
    message: {
      control: 'text',
      description: 'Message text for the toast',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toast',
      defaultValue: 'md',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the toast can be dismissed by clicking X',
      defaultValue: true,
    },
    duration: {
      control: 'number',
      description: 'Duration in ms before auto-dismissal (0 for no auto-dismiss)',
      defaultValue: 5000,
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading spinner',
      defaultValue: false,
    },
    persistent: {
      control: 'boolean',
      description: 'If true, toast will not auto-dismiss',
      defaultValue: false,
    },
    actionLabel: {
      control: 'text',
      description: 'Text for the action button',
    },
    ariaLive: {
      control: 'select',
      options: ['assertive', 'polite', 'off'],
      description: 'ARIA live announcement level',
      defaultValue: 'polite',
    },
  },
};

export const Info = {
  args: {
    id: 'toast-info-example',
    status: 'info',
    title: 'Information',
    message: 'This is an information message',
  },
};

export const Success = {
  args: {
    id: 'toast-success-example',
    status: 'success',
    title: 'Success',
    message: 'Operation completed successfully',
  },
};

export const Warning = {
  args: {
    id: 'toast-warning-example',
    status: 'warning',
    title: 'Warning',
    message: 'Please review before proceeding',
  },
};

export const Error = {
  args: {
    id: 'toast-error-example',
    status: 'error',
    title: 'Error',
    message: 'An error occurred while processing your request',
  },
};

export const Loading = {
  args: {
    id: 'toast-loading-example',
    status: 'info',
    title: 'Loading',
    message: 'Please wait while we process your request',
    loading: true,
    persistent: true,
  },
};

export const WithAction = {
  args: {
    id: 'toast-action-example',
    status: 'info',
    title: 'New Feature Available',
    message: 'Try out our new dashboard experience',
    actionLabel: 'Try it now',
    persistent: true,
  },
};

export const Persistent = {
  args: {
    id: 'toast-persistent-example',
    status: 'warning',
    title: 'Session Expiring Soon',
    message: 'Your session will expire in 5 minutes',
    persistent: true,
  },
};

export const SizeVariants = {
  render: () => (
    <div class="space-y-4">
      <Toast 
        id="toast-small"
        status="info"
        title="Small Toast"
        message="This is a small toast notification"
        size="sm"
      />
      <Toast 
        id="toast-medium"
        status="info" 
        title="Medium Toast"
        message="This is a medium toast notification (default)"
        size="md"
      />
      <Toast 
        id="toast-large"
        status="info"
        title="Large Toast"
        message="This is a large toast notification"
        size="lg"
      />
    </div>
  ),
};

export const ToastContainerStory = {
  name: 'Toast Container',
  render: () => (
    <div class="relative h-[400px] border border-gray-200 rounded-lg overflow-hidden">
      <ToastContainer position="bottom-right">
        <Toast 
          id="toast-container-1"
          status="success"
          title="Success"
          message="Item successfully saved"
        />
        <Toast 
          id="toast-container-2"
          status="info"
          title="Information"
          message="New updates are available"
        />
        <Toast 
          id="toast-container-3"
          status="warning"
          title="Warning"
          message="Your trial expires in 3 days"
        />
      </ToastContainer>
    </div>
  ),
};

export const PositionsDemo = {
  name: 'Positioning Options',
  render: () => (
    <div class="grid grid-cols-3 gap-4">
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Top Left</h3>
        <ToastContainer position="top-left">
          <Toast 
            id="toast-top-left"
            status="info"
            message="Top Left Position"
            size="sm"
          />
        </ToastContainer>
      </div>
      
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Top Center</h3>
        <ToastContainer position="top-center">
          <Toast 
            id="toast-top-center"
            status="info"
            message="Top Center Position"
            size="sm"
          />
        </ToastContainer>
      </div>
      
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Top Right</h3>
        <ToastContainer position="top-right">
          <Toast 
            id="toast-top-right"
            status="info"
            message="Top Right Position"
            size="sm"
          />
        </ToastContainer>
      </div>
      
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Bottom Left</h3>
        <ToastContainer position="bottom-left">
          <Toast 
            id="toast-bottom-left"
            status="info"
            message="Bottom Left Position"
            size="sm"
          />
        </ToastContainer>
      </div>
      
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Bottom Center</h3>
        <ToastContainer position="bottom-center">
          <Toast 
            id="toast-bottom-center"
            status="info"
            message="Bottom Center Position"
            size="sm"
          />
        </ToastContainer>
      </div>
      
      <div class="relative h-[200px] border border-gray-200 rounded-lg overflow-hidden">
        <h3 class="text-center p-2 bg-gray-100">Bottom Right</h3>
        <ToastContainer position="bottom-right">
          <Toast 
            id="toast-bottom-right"
            status="info"
            message="Bottom Right Position"
            size="sm"
          />
        </ToastContainer>
      </div>
    </div>
  ),
};
