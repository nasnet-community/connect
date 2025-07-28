import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Alert component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Multiple status variants: info, success, warning, error",
    "Various visual styles: solid, outline, and subtle",
    "Customizable size options: small, medium, large",
    "Dismissible with optional automatic closing",
    "Loading state for in-progress operations",
    "Optional icons with customization support",
    "Responsive design with dark mode compatibility",
  ];

  const whenToUse = [
    "To communicate important information or feedback to users",
    "To notify users about the status of an operation (success, error, etc.)",
    "To draw attention to critical warnings or potential issues",
    "To display validation results for forms or user inputs",
    "To show temporary notifications that may auto-dismiss",
    "To provide contextual information relevant to the current task",
  ];

  const whenNotToUse = [
    "For complex interactive content that requires user actions (use Dialog instead)",
    "For notifications that should appear and disappear without affecting layout (use Toast instead)",
    "For promotional content or marketing messages (use PromoBanner instead)",
    "For persistent error states in forms (use inline form validation)",
    "For subtle hints or non-critical information (use tooltips or helper text)",
    "As a container for primary page content",
  ];

  return (
    <OverviewTemplate
      title="Alert Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Alert component is designed to communicate important information,
        status updates, or feedback messages to users. It provides a consistent
        and accessible way to draw attention to content that requires immediate
        awareness, from success confirmations to critical warnings.
      </p>

      <p class="mt-2">
        With support for multiple visual styles, sizes, and behaviors, the Alert
        component can be tailored to match the importance and context of the
        message being displayed. The component intelligently handles dismissal,
        either manually through a close button or automatically after a
        specified duration.
      </p>

      <p class="mt-2">
        Each alert status (info, success, warning, error) comes with appropriate
        default styling and icons, but these can be customized to align with
        your application's design language while maintaining accessibility and
        user experience best practices.
      </p>
    </OverviewTemplate>
  );
});
