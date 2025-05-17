import { Card, type CardProps } from '../../Card';
import { Button } from '../../button/Button';

export default {
  title: 'Core/Card',
  component: Card,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'elevated'],
    },
    hasHeader: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
    hasActions: { control: 'boolean' },
    loading: { control: 'boolean' },
    noPadding: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    variant: 'default',
    children: 'Card content goes here.',
  },
};

export const WithHeader = {
  args: {
    hasHeader: true,
    children: 'This card has a header section.',
  },
  render: (args: CardProps & { children?: string }) => (
    <Card {...args}>
      <h3 q:slot="header" class="text-lg font-semibold">Card Header</h3>
      {args.children}
    </Card>
  ),
};

export const WithFooter = {
  args: {
    hasFooter: true,
    children: 'This card has a footer section.',
  },
  render: (args: CardProps & { children?: string }) => (
    <Card {...args}>
      {args.children}
      <p q:slot="footer">Card Footer</p>
    </Card>
  ),
};

export const WithActions = {
  args: {
    hasFooter: true,
    hasActions: true,
    children: 'This card has action buttons in the footer.',
  },
  render: (args: CardProps & { children?: string }) => (
    <Card {...args}>
      {args.children}
      <p q:slot="footer">Card Footer</p>
      <div q:slot="actions">
        <Button size="sm" variant="outline">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    </Card>
  ),
};

export const Loading = {
  args: {
    loading: true,
    children: 'This content is loading...',
  },
};

export const NoPadding = {
  args: {
    noPadding: true,
    children: 'This card has no padding.',
  },
};

export const Bordered = {
  args: {
    variant: 'bordered',
    children: 'This card has a thicker border.',
  },
};

export const Elevated = {
  args: {
    variant: 'elevated',
    children: 'This card has a shadow effect.',
  },
};

export const CompleteExample = {
  args: {
    variant: 'elevated',
    hasHeader: true,
    hasFooter: true,
    hasActions: true,
  },
  render: (args: CardProps) => (
    <Card {...args}>
      <h3 q:slot="header" class="text-lg font-semibold">Complete Card Example</h3>
      <div class="space-y-4">
        <p>This is a complete card example with all sections:</p>
        <ul class="list-disc pl-5">
          <li>Header with title</li>
          <li>Content body with some text</li>
          <li>Footer with actions</li>
        </ul>
        <p>The card is using the elevated variant with shadow effect.</p>
      </div>
      <p q:slot="footer">Card Footer Information</p>
      <div q:slot="actions">
        <Button size="sm" variant="outline">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    </Card>
  ),
}; 