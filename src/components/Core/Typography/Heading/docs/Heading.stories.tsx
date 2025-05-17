// import { Heading } from "./Heading";

// // Use alternative types for Storybook since @storybook/qwik might not be available
// type Meta<Props> = {
//   title: string;
//   component: Props;
//   tags?: string[];
//   argTypes?: Record<string, any>;
// };

// type StoryObj<Props> = {
//   args?: Record<string, any>;
//   render?: (args: Record<string, any>) => any;
// };

// const meta: Meta<typeof Heading> = {
//   title: "Core/Typography/Heading",
//   component: Heading,
//   tags: ["autodocs"],
//   argTypes: {
//     level: {
//       control: { type: "select" },
//       options: [1, 2, 3, 4, 5, 6],
//       description: "Heading level (h1-h6)",
//       defaultValue: 2,
//     },
//     as: {
//       control: { type: "select" },
//       options: ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span"],
//       description: "HTML element to render",
//     },
//     weight: {
//       control: { type: "select" },
//       options: ["light", "normal", "medium", "semibold", "bold", "extrabold"],
//       description: "Font weight",
//       defaultValue: "semibold",
//     },
//     align: {
//       control: { type: "select" },
//       options: ["left", "center", "right"],
//       description: "Text alignment",
//       defaultValue: "left",
//     },
//     color: {
//       control: { type: "select" },
//       options: ["primary", "secondary", "tertiary", "inverse", "accent", "success", "warning", "error", "info"],
//       description: "Color variant",
//       defaultValue: "primary",
//     },
//     truncate: {
//       control: "boolean",
//       description: "Whether to truncate text",
//       defaultValue: false,
//     },
//     maxLines: {
//       control: { type: "number", min: 1, max: 10 },
//       description: "Maximum number of lines before truncating",
//       defaultValue: 1,
//     },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Heading>;

// /**
//  * Default Heading story
//  */
// export const Default: Story = {
//   args: {
//     level: 2,
//     children: "The quick brown fox jumps over the lazy dog",
//   },
//   render: (args) => (
//     <Heading
//       level={args.level}
//       as={args.as}
//       weight={args.weight}
//       align={args.align}
//       color={args.color}
//       truncate={args.truncate}
//       maxLines={args.maxLines}
//     >
//       {args.children}
//     </Heading>
//   ),
// };

// /**
//  * Heading Levels (h1-h6)
//  */
// export const Levels: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <Heading level={1}>Heading Level 1 (h1)</Heading>
//       <Heading level={2}>Heading Level 2 (h2)</Heading>
//       <Heading level={3}>Heading Level 3 (h3)</Heading>
//       <Heading level={4}>Heading Level 4 (h4)</Heading>
//       <Heading level={5}>Heading Level 5 (h5)</Heading>
//       <Heading level={6}>Heading Level 6 (h6)</Heading>
//     </div>
//   ),
// };

// /**
//  * Semantic vs. Visual
//  * Demonstrates the difference between semantic level (with 'as' prop) and visual level
//  */
// export const SemanticVsVisual: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <div class="p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-md">
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           The heading below looks like h2 but is semantically h1 (important for accessibility and SEO)
//         </p>
//         <Heading level={2} as="h1">
//           Visually h2, Semantically h1
//         </Heading>
//       </div>
      
//       <div class="p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-md">
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           The heading below looks like h4 but is semantically h2
//         </p>
//         <Heading level={4} as="h2">
//           Visually h4, Semantically h2
//         </Heading>
//       </div>
//     </div>
//   ),
// };

// /**
//  * Font Weight Variants
//  */
// export const Weights: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <Heading level={3} weight="light">Light Weight</Heading>
//       <Heading level={3} weight="normal">Normal Weight</Heading>
//       <Heading level={3} weight="medium">Medium Weight</Heading>
//       <Heading level={3} weight="semibold">Semibold Weight (Default)</Heading>
//       <Heading level={3} weight="bold">Bold Weight</Heading>
//       <Heading level={3} weight="extrabold">Extrabold Weight</Heading>
//     </div>
//   ),
// };

// /**
//  * Text Alignments
//  */
// export const Alignments: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <Heading level={3} align="left">Left Aligned (Default)</Heading>
//       <Heading level={3} align="center">Center Aligned</Heading>
//       <Heading level={3} align="right">Right Aligned</Heading>
//     </div>
//   ),
// };

// /**
//  * Color Variants
//  */
// export const Colors: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <Heading level={3} color="primary">Primary Color (Default)</Heading>
//       <Heading level={3} color="secondary">Secondary Color</Heading>
//       <Heading level={3} color="tertiary">Tertiary Color</Heading>
//       <div class="bg-text-primary dark:bg-text-dark-primary p-2 rounded">
//         <Heading level={3} color="inverse">Inverse Color</Heading>
//       </div>
//       <Heading level={3} color="accent">Accent Color</Heading>
//       <Heading level={3} color="success">Success Color</Heading>
//       <Heading level={3} color="warning">Warning Color</Heading>
//       <Heading level={3} color="error">Error Color</Heading>
//       <Heading level={3} color="info">Info Color</Heading>
//     </div>
//   ),
// };

// /**
//  * Text Truncation
//  */
// export const Truncation: Story = {
//   render: () => (
//     <div class="space-y-4">
//       <div class="w-64 p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-md">
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           Single line truncation:
//         </p>
//         <Heading level={3} truncate={true}>
//           This is a very long heading that will be truncated with an ellipsis because it doesn't fit within the container
//         </Heading>
//       </div>
      
//       <div class="w-64 p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-md">
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           Multi-line truncation (2 lines):
//         </p>
//         <Heading level={3} truncate={true} maxLines={2}>
//           This is a very long heading that will be truncated with an ellipsis after two lines because it doesn't fit within the container
//         </Heading>
//       </div>
//     </div>
//   ),
// };

// /**
//  * Responsive Sizing
//  */
// export const ResponsiveSizing: Story = {
//   render: () => (
//     <div class="space-y-8">
//       <div>
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           Responsive heading that changes size at different breakpoints:<br />
//           h3 on mobile, h2 on medium screens (768px+), h1 on large screens (1024px+)
//         </p>
//         <Heading
//           responsiveSize={{
//             base: 3,
//             md: 2,
//             lg: 1
//           }}
//         >
//           Responsive Heading Example
//         </Heading>
//       </div>
      
//       <div class="p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-md">
//         <p class="text-sm mb-2 text-text-secondary dark:text-text-dark-secondary">
//           Try resizing your browser window to see the changes
//         </p>
//       </div>
//     </div>
//   ),
// };

// /**
//  * Dark Mode
//  */
// export const DarkMode: Story = {
//   render: () => (
//     <div class="p-6 bg-surface-dark-primary text-text-dark-primary rounded-md">
//       <div class="space-y-4">
//         <Heading level={2}>Dark Mode Heading (Primary)</Heading>
//         <Heading level={3} color="secondary">Dark Mode Heading (Secondary)</Heading>
//         <Heading level={3} color="accent">Dark Mode Heading (Accent)</Heading>
//         <Heading level={3} color="success">Dark Mode Heading (Success)</Heading>
//         <Heading level={3} color="error">Dark Mode Heading (Error)</Heading>
//       </div>
//     </div>
//   ),
// };
