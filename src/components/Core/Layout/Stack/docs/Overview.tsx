import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates/OverviewTemplate";

export const StackOverview = component$(() => {
  return (
    <OverviewTemplate
      title="Stack"
      keyFeatures={[
        "Flexible arrangement in either row or column direction",
        "Responsive breakpoint support for changing direction based on screen size",
        "Consistent spacing between elements",
        "Alignment and justification control",
        "Optional dividers between stack items",
        "RTL language support",
      ]}
      whenToUse={[
        "Arrange a series of elements with consistent spacing",
        "Switch between vertical and horizontal layouts at different screen sizes",
        "Add dividers between elements",
        "Control alignment and justification of elements",
      ]}
      whenNotToUse={[
        "Complex grid layouts with multiple rows and columns",
        "When you need precise positioning control",
        "For overlapping or absolute positioned elements",
      ]}
    >
      <p>
        A layout component for arranging elements vertically or horizontally
        with consistent spacing. The Stack component is designed to simplify
        layout by managing the spacing between elements consistently. It's
        perfect for creating vertical or horizontal arrangements of components
        with proper spacing.
      </p>

      <h3>Accessibility</h3>
      <p>
        The Stack component maintains proper spacing between elements, which
        helps with visual organization and readability.
      </p>
      <ul>
        <li>
          Ensures sufficient spacing between interactive elements (minimum 8px)
        </li>
        <li>
          When using Stack for navigation or interactive content, ensures
          adequate touch target size
        </li>
        <li>
          If using Stack to group related form elements, consider using the
          appropriate ARIA roles and landmarks
        </li>
        <li>
          Stack respects RTL language direction when the supportRtl prop is
          enabled
        </li>
      </ul>
    </OverviewTemplate>
  );
});

export default StackOverview;
