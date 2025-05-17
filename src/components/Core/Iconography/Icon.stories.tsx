import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Icon } from './index';
import {
  UserIcon,
  HomeIcon,
  SettingsIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  InfoIcon,
  EmailIcon,
  DocumentIcon,
  LockIcon,
  UserSolidIcon,
  HomeSolidIcon,
  SettingsSolidIcon,
  SuccessSolidIcon,
  WarningSolidIcon,
  ErrorSolidIcon,
  InfoSolidIcon,
} from './icons';
import { component$ } from '@builder.io/qwik';

const meta: Meta<typeof Icon> = {
  title: 'Core/Iconography/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    icon: HomeIcon,
    size: 'md',
    color: 'current',
  },
  render: component$(() => (
    <Icon
      icon={HomeIcon}
      size="md"
      color="current"
    />
  )),
};

export const Sizes: Story = {
  render: component$(() => (
    <div class="flex items-center gap-4">
      <Icon icon={HomeIcon} size="xs" label="Extra Small Icon" />
      <Icon icon={HomeIcon} size="sm" label="Small Icon" />
      <Icon icon={HomeIcon} size="md" label="Medium Icon" />
      <Icon icon={HomeIcon} size="lg" label="Large Icon" />
      <Icon icon={HomeIcon} size="xl" label="Extra Large Icon" />
      <Icon icon={HomeIcon} size="2xl" label="2X Large Icon" />
    </div>
  )),
};

export const Colors: Story = {
  render: component$(() => (
    <div class="flex items-center gap-4">
      <Icon icon={HomeIcon} color="primary" label="Primary color icon" />
      <Icon icon={HomeIcon} color="secondary" label="Secondary color icon" />
      <Icon icon={HomeIcon} color="success" label="Success color icon" />
      <Icon icon={HomeIcon} color="warning" label="Warning color icon" />
      <Icon icon={HomeIcon} color="error" label="Error color icon" />
      <Icon icon={HomeIcon} color="info" label="Info color icon" />
      <Icon icon={HomeIcon} color="muted" label="Muted color icon" />
    </div>
  )),
};

export const Variants: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon icon={HomeIcon} label="Outline variant" />
        <Icon icon={HomeSolidIcon} label="Solid variant" />
      </div>
      <div class="flex items-center gap-4">
        <Icon icon={SettingsIcon} label="Outline variant" />
        <Icon icon={SettingsSolidIcon} label="Solid variant" />
      </div>
      <div class="flex items-center gap-4">
        <Icon icon={UserIcon} label="Outline variant" />
        <Icon icon={UserSolidIcon} label="Solid variant" />
      </div>
    </div>
  )),
};

export const StatusIcons: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon icon={SuccessIcon} color="success" label="Success icon outline" />
        <Icon icon={SuccessSolidIcon} color="success" label="Success icon solid" />
      </div>
      <div class="flex items-center gap-4">
        <Icon icon={WarningIcon} color="warning" label="Warning icon outline" />
        <Icon icon={WarningSolidIcon} color="warning" label="Warning icon solid" />
      </div>
      <div class="flex items-center gap-4">
        <Icon icon={ErrorIcon} color="error" label="Error icon outline" />
        <Icon icon={ErrorSolidIcon} color="error" label="Error icon solid" />
      </div>
      <div class="flex items-center gap-4">
        <Icon icon={InfoIcon} color="info" label="Info icon outline" />
        <Icon icon={InfoSolidIcon} color="info" label="Info icon solid" />
      </div>
    </div>
  )),
};

export const WithFixedWidth: Story = {
  render: component$(() => (
    <div class="flex flex-col gap-2 border p-4 w-48">
      <div class="flex items-center gap-2">
        <Icon icon={HomeIcon} fixedWidth label="Home" />
        <span>Home</span>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon={SettingsIcon} fixedWidth label="Settings" />
        <span>Settings</span>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon={EmailIcon} fixedWidth label="Messages" />
        <span>Messages</span>
      </div>
      <div class="flex items-center gap-2">
        <Icon icon={DocumentIcon} fixedWidth label="Documents" />
        <span>Documents</span>
      </div>
    </div>
  )),
};

export const InlineUsage: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <p class="flex items-center gap-2">
        <Icon icon={SuccessIcon} color="success" size="sm" label="Success" />
        Your profile has been updated successfully.
      </p>
      <p class="flex items-center gap-2">
        <Icon icon={WarningIcon} color="warning" size="sm" label="Warning" />
        Your subscription will expire in 3 days.
      </p>
      <p class="flex items-center gap-2">
        <Icon icon={ErrorIcon} color="error" size="sm" label="Error" />
        Failed to connect to the server.
      </p>
      <p class="flex items-center gap-2">
        <Icon icon={InfoIcon} color="info" size="sm" label="Information" />
        New features are available.
      </p>
      <p class="flex items-center gap-2">
        <Icon icon={LockIcon} color="muted" size="sm" label="Security" />
        Your account is secured with two-factor authentication.
      </p>
    </div>
  )),
};
