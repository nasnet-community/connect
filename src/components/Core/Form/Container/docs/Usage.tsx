import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * Container component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use descriptive titles and descriptions",
      description: "Provide clear, concise titles and descriptions that explain the purpose of the form section.",
      code: `<Container 
  title="Shipping Information" 
  description="Enter your shipping address for order delivery."
>
  {/* Address form fields */}
</Container>`,
      type: "do"
    },
    {
      title: "Group related form fields together",
      description: "Use Container to logically group related form fields for better organization.",
      code: `<Container title="Contact Information">
  <div class="grid gap-4">
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" />
    </div>
    <div>
      <label for="phone">Phone</label>
      <input id="phone" type="tel" />
    </div>
  </div>
</Container>`,
      type: "do"
    },
    {
      title: "Use the footer slot for actions",
      description: "Place form actions like Submit and Cancel buttons in the footer slot for consistent placement.",
      code: `<Container title="Payment Details">
  {/* Payment form fields */}
  
  <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t">
    <button type="button">Cancel</button>
    <button type="submit">Submit Payment</button>
  </div>
</Container>`,
      type: "do"
    },
    {
      title: "Don't nest containers excessively",
      description: "Avoid too many levels of nesting, which can create visual clutter and confusion.",
      code: `// Don't do this:
<Container title="User Profile">
  <Container title="Personal Info">
    <Container title="Name">
      {/* Form fields */}
    </Container>
  </Container>
</Container>

// Better approach - use appropriate headings instead:
<Container title="User Profile">
  <div class="space-y-4">
    <h4 class="text-md font-medium">Personal Info</h4>
    <div>
      <label>Name</label>
      <input type="text" />
    </div>
  </div>
</Container>`,
      type: "dont"
    },
    {
      title: "Don't use for individual form fields",
      description: "The Container is meant for grouping multiple related elements, not wrapping individual fields.",
      code: `// Don't do this:
<Container title="Email">
  <input type="email" />
</Container>

// Better approach:
<div>
  <label class="block text-sm font-medium mb-1">Email</label>
  <input type="email" />
</div>`,
      type: "dont"
    },
    {
      title: "Don't overload with unrelated content",
      description: "Keep the content focused on related form elements to maintain clear organization.",
      code: `// Don't do this:
<Container title="User Information">
  <div>
    <label>Name</label>
    <input type="text" />
  </div>
  
  <div class="mt-6">
    <h3>Recent Orders</h3>
    <table>...</table>
  </div>
</Container>

// Better approach - separate unrelated content:
<div class="space-y-6">
  <Container title="User Information">
    <div>
      <label>Name</label>
      <input type="text" />
    </div>
  </Container>
  
  <Container title="Recent Orders">
    <table>...</table>
  </Container>
</div>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Maintain consistent spacing",
      description: "Use the Container component consistently throughout your forms to maintain visual rhythm and spacing."
    },
    {
      title: "Use descriptive titles",
      description: "Give each Container a clear, descriptive title that communicates the purpose of the included form fields."
    },
    {
      title: "Apply borders selectively",
      description: "Use the bordered prop thoughtfully - borders can help separate content but can also create visual noise if overused."
    },
    {
      title: "Follow a logical sequence",
      description: "Arrange multiple Containers in a logical sequence that follows the user's mental model for completing the form."
    },
    {
      title: "Keep related fields together",
      description: "Group fields that are conceptually related, like first name and last name, within the same Container."
    },
    {
      title: "Use the footer slot for actions",
      description: "Place form action buttons in the footer slot to create a consistent pattern for users."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Ensure logical heading structure",
      description: "The Container uses h3 elements for titles. Ensure this fits within your overall document heading hierarchy."
    },
    {
      title: "Provide clear instructions",
      description: "Use the description prop to provide helpful context or instructions for completing the form section."
    },
    {
      title: "Maintain keyboard focus order",
      description: "Ensure the tab order within containers follows a logical sequence, especially when using the footer slot."
    },
    {
      title: "Consider screen reader users",
      description: "Test that the semantic structure created by Container components makes sense when navigating with a screen reader."
    },
    {
      title: "Use logical grouping",
      description: "The visual grouping provided by Containers should match logical grouping of related form elements."
    },
    {
      title: "Provide sufficient color contrast",
      description: "Ensure there is sufficient contrast between the Container's borders, background, and text content."
    }
  ];

  const performanceTips = [
    "The Container component is lightweight with minimal performance impact",
    "Avoid deeply nesting containers to prevent unnecessary DOM complexity",
    "Consider using the borderless variant when many containers are used together",
    "For large forms, consider using a virtualized approach with containers loading as needed"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Container component provides a structured way to organize form sections.
        When used effectively, it helps create forms that are easier to understand and complete.
      </p>
      <p class="mt-2">
        This component works best when used to group related form fields with clear titles
        and descriptions. It also provides a consistent way to position action buttons using
        the footer slot.
      </p>
    </UsageTemplate>
  );
}); 