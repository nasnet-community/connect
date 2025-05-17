import { Meta, StoryObj } from "storybook-framework-qwik";
import { Text } from "./Text";
import { type TextProps } from "./Text.types";

// Meta information for the component
const meta: Meta<TextProps> = {
  title: "Connect/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["body", "caption", "label", "code", "quote", "paragraph"],
      description: "Text style variant",
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "label", "strong", "em", "time", "pre", "code", "blockquote", "figcaption"],
      description: "HTML element to render",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl"],
      description: "Font size",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold"],
      description: "Font weight",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "inverse", "accent", "success", "warning", "error", "info", "subtle"],
      description: "Text color",
    },
    truncate: {
      control: "boolean",
      description: "Whether to truncate text with ellipsis if it overflows",
    },
    maxLines: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Maximum number of lines before truncating",
    },
    transform: {
      control: "select",
      options: ["uppercase", "lowercase", "capitalize", "none"],
      description: "Text transformation",
    },
    decoration: {
      control: "select",
      options: ["underline", "line-through", "none"],
      description: "Text decoration",
    },
    italic: {
      control: "boolean",
      description: "Whether to enable italics",
    },
    monospace: {
      control: "boolean",
      description: "Whether to enable monospace font",
    },
    srOnly: {
      control: "boolean",
      description: "Text for screen readers only (visually hidden)",
    },
  },
};

export default meta;
type Story = StoryObj<TextProps>;

/**
 * Default Text component with body variant
 */
export const Default: Story = {
  args: {
    children: "This is the default text component with base size and normal weight.",
  },
};

/**
 * Showcase of all text variants
 */
export const Variants: Story = {
  render: () => (
    <div class="space-y-4">
      <Text variant="body">Body text variant</Text>
      <Text variant="paragraph">Paragraph text variant</Text>
      <Text variant="caption">Caption text variant</Text>
      <Text variant="label">Label text variant</Text>
      <Text variant="code">Code text variant</Text>
      <Text variant="quote">Quote text variant with more text to show the block quote styling that is applied to this variant</Text>
    </div>
  ),
};

/**
 * Showcase of different text sizes
 */
export const Sizes: Story = {
  render: () => (
    <div class="space-y-2">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2x Extra large text (2xl)</Text>
    </div>
  ),
};

/**
 * Showcase of different font weights
 */
export const Weights: Story = {
  render: () => (
    <div class="space-y-2">
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
      <Text weight="extrabold">Extrabold weight text</Text>
    </div>
  ),
};

/**
 * Showcase of text alignments
 */
export const Alignments: Story = {
  render: () => (
    <div class="space-y-4 border rounded p-4">
      <Text align="left">Left aligned text (default)</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
};

/**
 * Showcase of all available text colors
 */
export const Colors: Story = {
  render: () => (
    <div class="space-y-2">
      <Text color="primary">Primary text color</Text>
      <Text color="secondary">Secondary text color</Text>
      <Text color="tertiary">Tertiary text color</Text>
      <Text color="subtle">Subtle text color</Text>
      <Text color="accent">Accent text color</Text>
      <Text color="success">Success text color</Text>
      <Text color="warning">Warning text color</Text>
      <Text color="error">Error text color</Text>
      <Text color="info">Info text color</Text>
      <div class="p-4 bg-gray-900 dark:bg-gray-100 rounded">
        <Text color="inverse">Inverse text color</Text>
      </div>
    </div>
  ),
};

/**
 * Showcase of text transformations
 */
export const Transformations: Story = {
  render: () => (
    <div class="space-y-2">
      <Text transform="uppercase">Uppercase text</Text>
      <Text transform="lowercase">Lowercase Text Will Be Shown Here</Text>
      <Text transform="capitalize">capitalize the first letter of each word</Text>
      <Text transform="none">Normal text with no transformation</Text>
    </div>
  ),
};

/**
 * Showcase of text decorations
 */
export const Decorations: Story = {
  render: () => (
    <div class="space-y-2">
      <Text decoration="underline">Underlined text</Text>
      <Text decoration="line-through">Text with strikethrough</Text>
      <Text decoration="none">Normal text with no decoration</Text>
    </div>
  ),
};

/**
 * Showcase of text styling features (italic, monospace)
 */
export const Styling: Story = {
  render: () => (
    <div class="space-y-2">
      <Text italic>Italic text</Text>
      <Text monospace>Monospace text</Text>
      <Text italic monospace>Italic monospace text</Text>
    </div>
  ),
};

/**
 * Demonstration of truncated text with single and multi-line variations
 */
export const Truncation: Story = {
  render: () => (
    <div class="space-y-4">
      <div class="w-64 border p-4 rounded">
        <Text truncate={true}>
          This is a long text that will be truncated with an ellipsis because it doesn't fit within the container width.
        </Text>
      </div>

      <div class="w-64 border p-4 rounded">
        <Text truncate={true} maxLines={2}>
          This is a very long paragraph that will be truncated after two lines.
          It demonstrates how you can limit the number of text lines shown to users
          while indicating that there is more content available.
        </Text>
      </div>

      <div class="w-64 border p-4 rounded">
        <Text truncate={true} maxLines={3}>
          This is an even longer paragraph that will be truncated after three lines.
          It demonstrates how you can limit the number of text lines shown to users
          while indicating that there is more content available.
          The text will be cut off with an ellipsis at the end of the third line.
          Additional content beyond the third line will not be visible.
        </Text>
      </div>
    </div>
  ),
};

/**
 * Example of responsive text sizes that change at different breakpoints
 */
export const ResponsiveSizes: Story = {
  render: () => (
    <div>
      <Text
        responsiveSize={{
          base: "sm", // Small on mobile
          md: "base",  // Base on medium screens (768px+)
          lg: "lg",    // Large on large screens (1024px+)
          xl: "xl",    // Extra large on extra large screens (1280px+)
        }}
      >
        This text will change size at different breakpoints. Resize the window to see it in action.
      </Text>
    </div>
  ),
};

/**
 * Example of text that is only for screen readers and visually hidden
 */
export const ScreenReaderOnly: Story = {
  render: () => (
    <div class="border p-4 rounded">
      <Text>This text is visible to everyone.</Text>
      <Text srOnly>This text is only for screen readers and is visually hidden.</Text>
      <Text>Another visible text element.</Text>
    </div>
  ),
};

/**
 * Example of text with click interaction
 */
export const Interactive: Story = {
  render: () => (
    <div class="space-y-2">
      <Text onClick$={() => alert('Text clicked!')}>
        This text is clickable, try clicking me!
      </Text>
      <Text color="accent" decoration="underline" onClick$={() => alert('Link-style text clicked!')}>
        This text looks like a link and is clickable
      </Text>
    </div>
  ),
};
