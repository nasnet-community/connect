import type { Meta } from "storybook-framework-qwik";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Core/Feedback/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
## Alert Component

The Alert component is used to communicate the state or status of a system, feature, or page to the user. 
It can be used to provide feedback about an action's state, highlight system status, or draw attention to important information.

### Features

- Multiple status variants: info, success, warning, error
- Size variants: sm, md, lg
- Style variants: solid, outline, with subtle option
- Dismissible with optional auto-close functionality
- Loading state
- Customizable icons
- Responsive design with dark mode support
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The status/variant of the alert',
      defaultValue: 'info',
    },
    title: {
      control: 'text',
      description: 'Main title text for the alert',
    },
    message: {
      control: 'text',
      description: 'Description/message text for the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed by the user',
      defaultValue: false,
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show an icon',
      defaultValue: true,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the alert',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Whether the alert is outlined instead of filled',
      defaultValue: 'solid',
    },
    subtle: {
      control: 'boolean',
      description: 'Whether the alert should have a subtle appearance',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the alert should have a loading state',
      defaultValue: false,
    },
    autoCloseDuration: {
      control: 'number',
      description: 'Duration in milliseconds to automatically dismiss alert',
    },
  },
};

export const Info = {
  args: {
    status: 'info',
    children: 'This is an information message with important content.',
  },
};

export const Success = {
  args: {
    status: 'success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning = {
  args: {
    status: 'warning',
    children: 'Please review your information before continuing.',
  },
};

export const Error = {
  args: {
    status: 'error',
    children: 'There was an error processing your request.',
  },
};

export const WithTitle = {
  args: {
    status: 'info',
    title: 'Information',
    children: 'Additional context and instructions can go here.',
  },
};

export const Dismissible = {
  args: {
    status: 'success',
    dismissible: true,
    children: 'This alert can be dismissed by clicking the X button.',
  },
};

export const Subtle = {
  args: {
    status: 'info',
    subtle: true,
    children: 'This is a subtle alert with less prominent styling.',
  },
};

export const NoIcon = {
  args: {
    status: 'warning',
    icon: false,
    children: 'This alert appears without an icon.',
  },
};

export const WithTitleAndDismissible = {
  args: {
    status: 'error',
    title: 'Connection Error',
    dismissible: true,
    children: 'Failed to connect to the server. Please check your internet connection and try again.',
  },
};

export const AllVariants = {
  render: () => (
    <div class="space-y-4">
      <Alert status="info">Default info alert</Alert>
      <Alert status="info" subtle>Subtle info alert</Alert>
      <Alert status="success">Default success alert</Alert>
      <Alert status="success" subtle>Subtle success alert</Alert>
      <Alert status="warning">Default warning alert</Alert>
      <Alert status="warning" subtle>Subtle warning alert</Alert>
      <Alert status="error">Default error alert</Alert>
      <Alert status="error" subtle>Subtle error alert</Alert>
    </div>
  ),
};

export const SizeVariants = {
  render: () => (
    <div class="space-y-4">
      <Alert status="info" size="sm">Small alert</Alert>
      <Alert status="info" size="md">Medium alert (default)</Alert>
      <Alert status="info" size="lg">Large alert</Alert>
    </div>
  ),
};

export const StyleVariants = {
  render: () => (
    <div class="space-y-4">
      <Alert status="success" variant="solid">Solid variant (default)</Alert>
      <Alert status="success" variant="outline">Outline variant</Alert>
      <Alert status="success" variant="solid" subtle>Subtle solid variant</Alert>
      <Alert status="success" variant="outline" subtle>Subtle outline variant</Alert>
    </div>
  ),
};

export const WithAutoClose = {
  args: {
    status: 'info',
    title: 'Auto-closing Alert',
    dismissible: true,
    autoCloseDuration: 5000,
    children: 'This alert will automatically close after 5 seconds.',
  },
};

export const WithLoading = {
  args: {
    status: 'info',
    loading: true,
    title: 'Processing',
    children: 'Please wait while we process your request...',
  },
};

export default meta;