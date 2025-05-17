import { Meta, StoryObj } from "storybook-framework-qwik";
import { Link } from "./Link";
import { type LinkProps } from "./Link.types";

// Mock icons for demonstration
const PrefixIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>);
const SuffixIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const ExternalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);

// Meta information for the component
const meta: Meta<LinkProps> = {
  title: "Connect/Typography/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Link destination URL or path",
    },
    external: {
      control: "boolean",
      description: "Whether the link should be treated as external",
    },
    variant: {
      control: "select",
      options: ["standard", "button", "nav", "subtle", "icon", "breadcrumb"],
      description: "Link variant style",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl"],
      description: "Link size",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "inverse", "accent", "inherit", "success", "error", "warning", "info"],
      description: "Link color",
    },
    underline: {
      control: "select",
      options: ["none", "hover", "always", "animate"],
      description: "Underline style",
    },
    newTab: {
      control: "boolean",
      description: "Whether to open link in a new tab",
    },
    truncate: {
      control: "boolean",
      description: "Whether to truncate text with ellipsis if it overflows",
    },
    disabled: {
      control: "boolean",
      description: "Whether the link is disabled",
    },
    active: {
      control: "boolean",
      description: "Whether the link is currently active (for navigation)",
    },
  },
};

export default meta;
type Story = StoryObj<LinkProps>;

/**
 * Default internal link
 */
export const Default: Story = {
  args: {
    href: "/example",
    children: "Default Link",
  },
};

/**
 * External link with icon
 */
export const External: Story = {
  args: {
    href: "https://qwik.builder.io/",
    external: true,
    suffixIcon: <ExternalIcon />,
    children: "Qwik Documentation",
  },
};

/**
 * Link variants
 */
export const Variants: Story = {
  render: () => (
    <div class="space-y-8">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Standard Links</h3>
        <div class="flex flex-col gap-2">
          <Link href="#" variant="standard">Standard Link</Link>
          <Link href="#" variant="standard" color="accent">Accent Color</Link>
          <Link href="#" variant="standard" underline="always">Always Underlined</Link>
          <Link href="#" variant="standard" underline="animate">Animated Underline</Link>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Button Links</h3>
        <div class="flex flex-wrap gap-4">
          <Link href="#" variant="button">Button Link</Link>
          <Link href="#" variant="button" color="accent">Accent Button</Link>
          <Link href="#" variant="button" color="success">Success Button</Link>
          <Link href="#" variant="button" color="error">Error Button</Link>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Navigation Links</h3>
        <div class="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="#" variant="nav">Home</Link>
          <Link href="#" variant="nav">Features</Link>
          <Link href="#" variant="nav" active>Products</Link>
          <Link href="#" variant="nav">About</Link>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Subtle Links</h3>
        <div class="flex flex-col gap-2">
          <Link href="#" variant="subtle">Subtle Link</Link>
          <Link href="#" variant="subtle" color="secondary">Secondary Subtle Link</Link>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Icon Links</h3>
        <div class="flex flex-wrap gap-4">
          <Link href="#" variant="icon" prefixIcon={<PrefixIcon />}>Link with Prefix Icon</Link>
          <Link href="#" variant="icon" suffixIcon={<SuffixIcon />}>Link with Suffix Icon</Link>
          <Link href="#" variant="icon" prefixIcon={<PrefixIcon />} suffixIcon={<SuffixIcon />}>Link with Both Icons</Link>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Breadcrumb Links</h3>
        <div class="flex items-center gap-2">
          <Link href="#" variant="breadcrumb">Home</Link>
          <span class="text-gray-400">/</span>
          <Link href="#" variant="breadcrumb">Products</Link>
          <span class="text-gray-400">/</span>
          <Link href="#" variant="breadcrumb" active>Product Details</Link>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div class="space-y-4">
      <Link href="#" size="xs">Extra Small Link</Link>
      <div><Link href="#" size="sm">Small Link</Link></div>
      <div><Link href="#" size="base">Base Size Link (Default)</Link></div>
      <div><Link href="#" size="lg">Large Link</Link></div>
      <div><Link href="#" size="xl">Extra Large Link</Link></div>
    </div>
  ),
};

/**
 * Different font weights
 */
export const Weights: Story = {
  render: () => (
    <div class="space-y-4">
      <Link href="#" weight="normal">Normal Weight</Link>
      <div><Link href="#" weight="medium">Medium Weight (Default)</Link></div>
      <div><Link href="#" weight="semibold">Semibold Weight</Link></div>
      <div><Link href="#" weight="bold">Bold Weight</Link></div>
    </div>
  ),
};

/**
 * Different colors
 */
export const Colors: Story = {
  render: () => (
    <div class="space-y-2">
      <Link href="#" color="primary">Primary Link (Default)</Link>
      <div><Link href="#" color="secondary">Secondary Link</Link></div>
      <div><Link href="#" color="tertiary">Tertiary Link</Link></div>
      <div><Link href="#" color="accent">Accent Link</Link></div>
      <div><Link href="#" color="success">Success Link</Link></div>
      <div><Link href="#" color="error">Error Link</Link></div>
      <div><Link href="#" color="warning">Warning Link</Link></div>
      <div><Link href="#" color="info">Info Link</Link></div>
      <div class="bg-gray-900 p-2 rounded">
        <Link href="#" color="inverse">Inverse Link (for dark backgrounds)</Link>
      </div>
      <div class="p-2 border rounded">
        <p class="text-gray-700">
          Text with <Link href="#" color="inherit">inherit colored link</Link> inside.
        </p>
      </div>
    </div>
  ),
};

/**
 * Underline styles
 */
export const Underlines: Story = {
  render: () => (
    <div class="space-y-4">
      <Link href="#" underline="none">No Underline</Link>
      <div><Link href="#" underline="hover">Hover Underline (Default)</Link></div>
      <div><Link href="#" underline="always">Always Underlined</Link></div>
      <div><Link href="#" underline="animate">Animated Underline</Link></div>
    </div>
  ),
};

/**
 * Links with icons
 */
export const WithIcons: Story = {
  render: () => (
    <div class="space-y-4">
      <Link href="#" prefixIcon={<PrefixIcon />}>Link with Prefix Icon</Link>
      <div><Link href="#" suffixIcon={<SuffixIcon />}>Link with Suffix Icon</Link></div>
      <div><Link href="#" prefixIcon={<PrefixIcon />} suffixIcon={<SuffixIcon />}>Link with Both Icons</Link></div>
      <div><Link href="#" variant="button" prefixIcon={<PrefixIcon />}>Button with Icon</Link></div>
      <div><Link href="https://example.com" external suffixIcon={<ExternalIcon />}>External Link with Icon</Link></div>
    </div>
  ),
};

/**
 * Disabled link
 */
export const Disabled: Story = {
  render: () => (
    <div class="space-y-4">
      <Link href="#" disabled>Disabled Link</Link>
      <div><Link href="#" variant="button" disabled>Disabled Button Link</Link></div>
      <div><Link href="#" variant="button" color="accent" disabled>Disabled Accent Button</Link></div>
    </div>
  ),
};

/**
 * Active links for navigation
 */
export const Active: Story = {
  render: () => (
    <div class="space-y-6">
      <div class="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="#" variant="nav">Home</Link>
        <Link href="#" variant="nav">Features</Link>
        <Link href="#" variant="nav" active>Products</Link>
        <Link href="#" variant="nav">About</Link>
      </div>
      
      <div class="flex gap-4">
        <Link href="#" active>Active Standard Link</Link>
        <Link href="#" variant="button" active>Active Button Link</Link>
      </div>
    </div>
  ),
};

/**
 * Truncated link
 */
export const Truncated: Story = {
  render: () => (
    <div class="w-40 border p-2 rounded">
      <Link href="#" truncate>This is a very long link text that will be truncated with an ellipsis</Link>
    </div>
  ),
};

/**
 * Secure external links
 */
export const SecureExternal: Story = {
  render: () => (
    <div class="space-y-4">
      <div>
        <h3 class="text-sm font-medium mb-1">Default secure external link (opens in new tab with rel="noopener noreferrer")</h3>
        <Link href="https://example.com" external>Secure External Link</Link>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-1">External link with security disabled</h3>
        <Link href="https://example.com" external secure={false}>Insecure External Link</Link>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-1">External link with custom rel attribute</h3>
        <Link href="https://example.com" external rel="nofollow sponsored">External Link with Custom Rel</Link>
      </div>
    </div>
  ),
};
