import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Avatar, AvatarGroup } from './Avatar';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';

export default {
  title: 'Core/DataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for representing users or entities'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the avatar',
      defaultValue: 'md'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'The shape of the avatar',
      defaultValue: 'circle'
    },
    variant: {
      control: 'select',
      options: ['image', 'initials', 'icon'],
      description: 'The variant of the avatar',
      defaultValue: 'image'
    },
    src: {
      control: 'text',
      description: 'The source URL for the avatar image'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image',
      defaultValue: 'Avatar'
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is available or variant is initials'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'gray'],
      description: 'Color for text or background when using initials or icon variants',
      defaultValue: 'primary'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'none'],
      description: 'Status indicator for the avatar',
      defaultValue: 'none'
    },
    statusPosition: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position of the status indicator',
      defaultValue: 'bottom-right'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the avatar should have a border',
      defaultValue: false
    },
    borderColor: {
      control: 'text',
      description: 'Border color for the avatar',
      defaultValue: 'white'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the avatar should display a loading state',
      defaultValue: false
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the avatar is clickable',
      defaultValue: false
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when the avatar is clicked'
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Target for the href link',
      defaultValue: '_self'
    }
  }
} satisfies Meta<AvatarProps>;

type Story = StoryObj<AvatarProps>;

// Base Avatar
export const Default: Story = {
  args: {
    size: 'md',
    shape: 'circle',
    variant: 'image',
    src: 'https://i.pravatar.cc/300?img=1',
    alt: 'Avatar',
    bordered: false,
    status: 'none'
  }
};

// Sizes
export const Sizes: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-end gap-4">
      <Avatar 
        {...props} 
        size="xs" 
        src="https://i.pravatar.cc/300?img=2" 
        alt="Avatar XS" 
      />
      <Avatar 
        {...props} 
        size="sm" 
        src="https://i.pravatar.cc/300?img=3" 
        alt="Avatar SM" 
      />
      <Avatar 
        {...props} 
        size="md" 
        src="https://i.pravatar.cc/300?img=4" 
        alt="Avatar MD" 
      />
      <Avatar 
        {...props} 
        size="lg" 
        src="https://i.pravatar.cc/300?img=5" 
        alt="Avatar LG" 
      />
      <Avatar 
        {...props} 
        size="xl" 
        src="https://i.pravatar.cc/300?img=6" 
        alt="Avatar XL" 
      />
      <Avatar 
        {...props} 
        size="2xl" 
        src="https://i.pravatar.cc/300?img=7" 
        alt="Avatar 2XL" 
      />
    </div>
  )
};

// Shapes
export const Shapes: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        shape="circle" 
        src="https://i.pravatar.cc/300?img=8" 
        alt="Circle Avatar" 
      />
      <Avatar 
        {...props} 
        shape="square" 
        src="https://i.pravatar.cc/300?img=9" 
        alt="Square Avatar" 
      />
      <Avatar 
        {...props} 
        shape="rounded" 
        src="https://i.pravatar.cc/300?img=10" 
        alt="Rounded Avatar" 
      />
    </div>
  )
};

// Variants
export const Variants: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        variant="image" 
        src="https://i.pravatar.cc/300?img=11" 
        alt="Image Avatar" 
      />
      <Avatar 
        {...props} 
        variant="initials" 
        initials="JD" 
        alt="Initials Avatar" 
      />
      <Avatar 
        {...props} 
        variant="icon" 
        alt="Icon Avatar" 
      />
    </div>
  )
};

// With Status
export const WithStatus: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=12" 
        status="online"
        alt="Online Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=13" 
        status="offline"
        alt="Offline Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=14" 
        status="away"
        alt="Away Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=15" 
        status="busy"
        alt="Busy Avatar" 
      />
    </div>
  )
};

// Status Positions
export const StatusPositions: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=16" 
        status="online"
        statusPosition="top-right"
        alt="Status Top Right" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=17" 
        status="online"
        statusPosition="top-left"
        alt="Status Top Left" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=18" 
        status="online"
        statusPosition="bottom-right"
        alt="Status Bottom Right" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=19" 
        status="online"
        statusPosition="bottom-left"
        alt="Status Bottom Left" 
      />
    </div>
  )
};

// Bordered
export const Bordered: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=20" 
        bordered={true}
        alt="Bordered Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=21" 
        bordered={true}
        borderColor="primary"
        alt="Custom Border Avatar" 
      />
      <Avatar 
        {...props} 
        variant="initials" 
        initials="JD" 
        bordered={true}
        alt="Bordered Initials Avatar" 
      />
    </div>
  )
};

// Initials with Colors
export const InitialsWithColors: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar {...props} variant="initials" initials="AB" color="primary" alt="Primary Color" />
      <Avatar {...props} variant="initials" initials="CD" color="secondary" alt="Secondary Color" />
      <Avatar {...props} variant="initials" initials="EF" color="success" alt="Success Color" />
      <Avatar {...props} variant="initials" initials="GH" color="warning" alt="Warning Color" />
      <Avatar {...props} variant="initials" initials="IJ" color="error" alt="Error Color" />
      <Avatar {...props} variant="initials" initials="KL" color="info" alt="Info Color" />
      <Avatar {...props} variant="initials" initials="MN" color="gray" alt="Gray Color" />
    </div>
  )
};

// Interactive Avatars
export const Interactive: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=22" 
        clickable={true}
        onClick$={() => console.log('Avatar clicked')}
        alt="Clickable Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=23" 
        href="#"
        alt="Link Avatar" 
      />
      <Avatar 
        {...props} 
        src="https://i.pravatar.cc/300?img=24" 
        href="https://example.com"
        target="_blank"
        alt="External Link Avatar" 
      />
    </div>
  )
};

// Loading State
export const Loading: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        loading={true}
        alt="Loading Avatar" 
      />
      <Avatar 
        {...props} 
        size="lg"
        loading={true}
        alt="Loading Large Avatar" 
      />
    </div>
  )
};

// Fallback States
export const Fallbacks: Story = {
  render: (props) => (
    <div class="flex flex-wrap items-center gap-4">
      <Avatar 
        {...props} 
        src="https://invalid-url.com/image.jpg" 
        alt="Invalid Image URL" 
      />
      <Avatar 
        {...props} 
        src="https://invalid-url.com/image.jpg" 
        initials="FB"
        alt="Invalid URL with Initials Fallback" 
      />
    </div>
  )
};

// Avatar Group Meta
export const avatarGroupMeta: Meta<AvatarGroupProps> = {
  title: 'Core/DataDisplay/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar group component for displaying multiple avatars'
      }
    }
  },
  argTypes: {
    max: {
      control: 'number',
      description: 'Maximum number of avatars to display before showing a count',
      defaultValue: 5
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of avatars in the group',
      defaultValue: 'md'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of avatars in the group',
      defaultValue: 'circle'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether avatars in the group should have a border',
      defaultValue: true
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spacing between avatars',
      defaultValue: 'md'
    },
    total: {
      control: 'number',
      description: 'Total count of avatars (used if there are more than max)'
    }
  }
};

type AvatarGroupStory = StoryObj<AvatarGroupProps>;

// Avatar Group
export const Group: AvatarGroupStory = {
  render: () => (
    <AvatarGroup max={4} total={8}>
      <Avatar src="https://i.pravatar.cc/300?img=1" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=2" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=3" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=4" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=5" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=6" bordered={true} />
    </AvatarGroup>
  )
};

// Avatar Group Sizes
export const GroupSizes: AvatarGroupStory = {
  render: () => (
    <div class="flex flex-col gap-6">
      <AvatarGroup size="xs" max={4} total={8}>
        <Avatar size="xs" src="https://i.pravatar.cc/300?img=7" bordered={true} />
        <Avatar size="xs" src="https://i.pravatar.cc/300?img=8" bordered={true} />
        <Avatar size="xs" src="https://i.pravatar.cc/300?img=9" bordered={true} />
        <Avatar size="xs" src="https://i.pravatar.cc/300?img=10" bordered={true} />
      </AvatarGroup>
      
      <AvatarGroup size="sm" max={4} total={8}>
        <Avatar size="sm" src="https://i.pravatar.cc/300?img=11" bordered={true} />
        <Avatar size="sm" src="https://i.pravatar.cc/300?img=12" bordered={true} />
        <Avatar size="sm" src="https://i.pravatar.cc/300?img=13" bordered={true} />
        <Avatar size="sm" src="https://i.pravatar.cc/300?img=14" bordered={true} />
      </AvatarGroup>
      
      <AvatarGroup size="md" max={4} total={8}>
        <Avatar size="md" src="https://i.pravatar.cc/300?img=15" bordered={true} />
        <Avatar size="md" src="https://i.pravatar.cc/300?img=16" bordered={true} />
        <Avatar size="md" src="https://i.pravatar.cc/300?img=17" bordered={true} />
        <Avatar size="md" src="https://i.pravatar.cc/300?img=18" bordered={true} />
      </AvatarGroup>
      
      <AvatarGroup size="lg" max={4} total={8}>
        <Avatar size="lg" src="https://i.pravatar.cc/300?img=19" bordered={true} />
        <Avatar size="lg" src="https://i.pravatar.cc/300?img=20" bordered={true} />
        <Avatar size="lg" src="https://i.pravatar.cc/300?img=21" bordered={true} />
        <Avatar size="lg" src="https://i.pravatar.cc/300?img=22" bordered={true} />
      </AvatarGroup>
    </div>
  )
};

// Mixed Avatars in Group
export const MixedGroup: AvatarGroupStory = {
  render: () => (
    <AvatarGroup max={4} total={6}>
      <Avatar src="https://i.pravatar.cc/300?img=23" bordered={true} />
      <Avatar variant="initials" initials="JD" color="primary" bordered={true} />
      <Avatar src="https://i.pravatar.cc/300?img=24" bordered={true} />
      <Avatar variant="icon" color="info" bordered={true} />
    </AvatarGroup>
  )
};

// Different Spacings
export const GroupSpacings: AvatarGroupStory = {
  render: () => (
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Small spacing:</span>
        <AvatarGroup spacing="sm" max={4}>
          <Avatar src="https://i.pravatar.cc/300?img=25" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=26" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=27" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=28" bordered={true} />
        </AvatarGroup>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Medium spacing:</span>
        <AvatarGroup spacing="md" max={4}>
          <Avatar src="https://i.pravatar.cc/300?img=29" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=30" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=31" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=32" bordered={true} />
        </AvatarGroup>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Large spacing:</span>
        <AvatarGroup spacing="lg" max={4}>
          <Avatar src="https://i.pravatar.cc/300?img=33" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=34" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=35" bordered={true} />
          <Avatar src="https://i.pravatar.cc/300?img=36" bordered={true} />
        </AvatarGroup>
      </div>
    </div>
  )
};
