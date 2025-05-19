import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Three size variants: small, medium, and large",
    "Customizable label with left or right positioning",
    "Support for disabled and required states",
    "Accessible implementation with full ARIA support",
    "Dark mode support with appropriate color contrasts",
    "Smooth toggle transitions with CSS animations",
    "Full keyboard navigation and focus management"
  ];

  const whenToUse = [
    "For binary on/off states or boolean settings",
    "When users need to toggle features or functionality",
    "In settings panels and preference controls",
    "For enabling/disabling options in forms",
    "When immediate effect of the toggle is expected",
    "In mobile-friendly interfaces requiring touch-friendly controls"
  ];

  const whenNotToUse = [
    "When more than two states are needed (use radio buttons or select)",
    "For actions that require confirmation (use buttons)",
    "When users need to see all available options simultaneously",
    "For mutually exclusive options in a group (use radio buttons)",
    "When the option being toggled is not clearly binary",
    "When immediate visual feedback of state change is not desired"
  ];

  return (
    <OverviewTemplate
      title="Toggle Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Toggle component provides a visual switch for controlling binary states, enabling users 
        to turn options on or off with a simple interaction. It serves as a modern alternative to checkboxes 
        when an immediate state change is expected, offering a more intuitive and touch-friendly interface.
      </p>
      
      <p class="mt-2">
        With support for different sizes, label positioning, and states, the Toggle component 
        can be customized to fit various design requirements while maintaining a consistent look and feel.
        The component includes proper accessibility features, ensuring it can be used by all users 
        regardless of their input method or assistive technology.
      </p>
      
      <p class="mt-2">
        The Toggle component is designed for immediate action, making it ideal for settings that take
        effect as soon as the user changes them. It provides clear visual feedback about its current state,
        with smooth transitions that enhance the user experience.
      </p>
    </OverviewTemplate>
  );
});
