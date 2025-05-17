import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Box } from './index';

const meta: Meta<typeof Box> = {
  title: 'Core/Layout/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    margin: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    borderRadius: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] },
    borderWidth: { control: 'select', options: ['none', 'thin', 'normal', 'thick'] },
    borderStyle: { control: 'select', options: ['solid', 'dashed', 'dotted', 'double', 'none'] },
    borderColor: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted'] },
    backgroundColor: { control: 'select', options: ['transparent', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted', 'surface', 'surface-alt'] },
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'] },
    fullWidth: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

// Basic Box
export const Basic: Story = {
  args: {
    padding: 'md',
    backgroundColor: 'surface',
    borderRadius: 'md',
  },
  render: component$(() => (
    <Box padding="md" backgroundColor="surface" borderRadius="md">
      Basic Box with medium padding and rounded corners
    </Box>
  )),
};

// Padding Examples
export const PaddingExamples: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box backgroundColor="surface" borderRadius="md" padding="none">
        No Padding
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="xs">
        Extra Small Padding (4px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="sm">
        Small Padding (8px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="md">
        Medium Padding (16px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="lg">
        Large Padding (24px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="xl">
        Extra Large Padding (32px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="2xl">
        2XL Padding (40px)
      </Box>
      <Box backgroundColor="surface" borderRadius="md" padding="3xl">
        3XL Padding (48px)
      </Box>
    </div>
  )),
};

// Directional Padding
export const DirectionalPadding: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box 
        backgroundColor="surface" 
        borderRadius="md" 
        padding={{ 
          x: 'lg',  // Horizontal padding
          y: 'sm'   // Vertical padding
        }}
      >
        Horizontal: Large, Vertical: Small
      </Box>
      
      <Box 
        backgroundColor="surface" 
        borderRadius="md" 
        padding={{ 
          top: 'lg',
          right: 'md',
          bottom: 'sm',
          left: 'xs'
        }}
      >
        Top: Large, Right: Medium, Bottom: Small, Left: Extra Small
      </Box>
    </div>
  )),
};

// Border Examples
export const BorderExamples: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        borderStyle="solid"
        borderColor="default"
      >
        Thin Solid Default Border
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="normal"
        borderStyle="dashed"
        borderColor="primary"
      >
        Normal Dashed Primary Border
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thick"
        borderStyle="dotted"
        borderColor="error"
      >
        Thick Dotted Error Border
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="normal"
        borderStyle="double"
        borderColor="success"
      >
        Normal Double Success Border
      </Box>
    </div>
  )),
};

// Border Radius Examples
export const BorderRadiusExamples: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="none"
        borderWidth="thin"
      >
        No Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="xs"
        borderWidth="thin"
      >
        Extra Small Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="sm"
        borderWidth="thin"
      >
        Small Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        Medium Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="lg"
        borderWidth="thin"
      >
        Large Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="xl"
        borderWidth="thin"
      >
        Extra Large Border Radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="full"
        borderWidth="thin"
      >
        Full Border Radius
      </Box>
    </div>
  )),
};

// Background Color Examples
export const BackgroundColorExamples: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="transparent" borderWidth="thin">
        Transparent Background
      </Box>
      
      <Box padding="md" backgroundColor="primary" borderWidth="thin" class="text-white">
        Primary Background
      </Box>
      
      <Box padding="md" backgroundColor="secondary" borderWidth="thin" class="text-white">
        Secondary Background
      </Box>
      
      <Box padding="md" backgroundColor="success" borderWidth="thin" class="text-white">
        Success Background
      </Box>
      
      <Box padding="md" backgroundColor="warning" borderWidth="thin">
        Warning Background
      </Box>
      
      <Box padding="md" backgroundColor="error" borderWidth="thin" class="text-white">
        Error Background
      </Box>
      
      <Box padding="md" backgroundColor="info" borderWidth="thin" class="text-white">
        Info Background
      </Box>
      
      <Box padding="md" backgroundColor="muted" borderWidth="thin">
        Muted Background
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderWidth="thin">
        Surface Background
      </Box>
      
      <Box padding="md" backgroundColor="surface-alt" borderWidth="thin">
        Surface Alt Background
      </Box>
    </div>
  )),
};

// Shadow Examples
export const ShadowExamples: Story = {
  render: component$(() => (
    <div class="space-y-8 p-4">
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="none">
        No Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="sm">
        Small Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="md">
        Medium Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="lg">
        Large Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="xl">
        Extra Large Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="2xl">
        2XL Shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="inner">
        Inner Shadow
      </Box>
    </div>
  )),
};

// As Different HTML Elements
export const AsDifferentElements: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box 
        as="section"
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        This is a &lt;section&gt; element
      </Box>
      
      <Box 
        as="article"
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        This is an &lt;article&gt; element
      </Box>
      
      <Box 
        as="aside"
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        This is an &lt;aside&gt; element
      </Box>
      
      <Box 
        as="header"
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        This is a &lt;header&gt; element
      </Box>
      
      <Box 
        as="footer"
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
      >
        This is a &lt;footer&gt; element
      </Box>
    </div>
  )),
};

// Accessibility Example
export const AccessibilityExample: Story = {
  render: component$(() => (
    <div class="space-y-4">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        role="region"
        aria-label="Important information"
      >
        This box has ARIA attributes for accessibility
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        role="alert"
      >
        This box has a role of "alert" for important notifications
      </Box>
    </div>
  )),
};

// Full Width and Height
export const FullWidthAndHeight: Story = {
  render: component$(() => (
    <div class="space-y-4 h-64">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        fullWidth
      >
        This box takes full width
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        fullHeight
        class="h-32"
      >
        This box takes full height of its container
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        fullWidth
        fullHeight
        class="h-32"
      >
        This box takes both full width and height
      </Box>
    </div>
  )),
};
