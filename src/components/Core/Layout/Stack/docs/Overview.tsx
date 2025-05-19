import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates/OverviewTemplate';

export const StackOverview = component$(() => {
  return (
    <OverviewTemplate
      title="Stack"
      description="A layout component for arranging elements vertically or horizontally with consistent spacing."
      features={[
        "Flexible arrangement in either row or column direction",
        "Responsive breakpoint support for changing direction based on screen size",
        "Consistent spacing between elements",
        "Alignment and justification control",
        "Optional dividers between stack items",
        "RTL language support"
      ]}
      usage={`
The Stack component is designed to simplify layout by managing the spacing between elements consistently.
It's perfect for creating vertical or horizontal arrangements of components with proper spacing.

Use Stack when you need to:
- Arrange a series of elements with consistent spacing
- Switch between vertical and horizontal layouts at different screen sizes
- Add dividers between elements
- Control alignment and justification of elements
      `}
      accessibility={`
The Stack component maintains proper spacing between elements, which helps with visual organization and readability.

For accessibility best practices:
- Ensure sufficient spacing between interactive elements (minimum 8px)
- When using Stack for navigation or interactive content, ensure there's adequate touch target size
- If using Stack to group related form elements, consider using the appropriate ARIA roles and landmarks
- Stack respects RTL language direction when the supportRtl prop is enabled
      `}
    />
  );
});

export default StackOverview;
