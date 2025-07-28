import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Multiple input types including text, email, password, number, tel, url, search, date, and time",
    "Four responsive sizes (sm, md, lg, xl) with mobile-optimized touch targets",
    "Comprehensive validation states with visual feedback and proper error handling",
    "Prefix and suffix slot support for icons, buttons, and additional content",
    "Full dark mode and light mode support with smooth transitions",
    "RTL language support using logical CSS properties",
    "Smooth animations and micro-interactions for enhanced user experience",
    "Touch-friendly design optimized for mobile and tablet devices",
    "Comprehensive accessibility with ARIA attributes and keyboard navigation",
    "Fluid width option and responsive design across all screen sizes",
  ];

  const whenToUse = [
    "For collecting user input in forms and applications",
    "When you need validation feedback with visual states",
    "For inputs that require prefix or suffix content like icons or units",
    "In responsive designs that need to work across mobile, tablet, and desktop",
    "When building accessible applications that support screen readers",
    "For international applications requiring RTL language support",
    "When you need consistent input styling across your application",
    "For inputs that benefit from touch-friendly interaction design",
  ];

  const whenNotToUse = [
    "For complex data entry that requires custom validation logic (use Form components instead)",
    "When you need specialized input types not covered by standard HTML inputs",
    "For file uploads (use FileUpload component instead)",
    "When building completely custom input experiences that don't follow standard patterns",
    "For rich text editing (use dedicated rich text editor components)",
  ];

  return (
    <OverviewTemplate
      title="Input Components"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Input component is a versatile, accessible form input that supports
        multiple input types, validation states, and responsive design patterns.
        It's built with modern web standards and includes comprehensive
        accessibility features, making it suitable for all types of applications.
      </p>

      <p class="mt-2">
        The component includes both a standard Input component for text-based
        inputs and a RadioInput component for radio button groups. Both
        components share consistent design patterns, validation states, and
        accessibility features while being optimized for their specific use cases.
      </p>

      <p class="mt-2">
        With support for prefix and suffix slots, you can easily add icons,
        buttons, or other content to enhance the user experience. The component
        automatically handles focus states, validation feedback, and responsive
        behavior across all device types.
      </p>

      <p class="mt-2">
        Built with Tailwind CSS and following the design system's color palette,
        the Input component seamlessly integrates with both light and dark themes.
        RTL language support ensures the component works correctly in
        international applications.
      </p>
    </OverviewTemplate>
  );
});