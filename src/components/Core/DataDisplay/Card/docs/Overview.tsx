import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Flexible composition with CardHeader, CardBody, CardFooter, and CardMedia components",
    "Multiple visual variants (default, outlined, filled)",
    "Configurable elevation and border radius",
    "Interactive states and hover effects",
    "Link functionality for navigation",
    "Full width and full height options",
    "Accessible implementation"
  ];

  const whenToUse = [
    "To display content in a visually distinct container",
    "For presenting grouped information in a structured way",
    "When creating clickable/tappable surfaces for navigation",
    "For highlighting important information or features",
    "To create consistent content containers across your UI",
    "In grids or lists to display multiple related items"
  ];

  const whenNotToUse = [
    "For simple text content that doesn't need visual separation",
    "When trying to minimize visual complexity in dense UIs",
    "For full-page layouts (use layout components instead)",
    "When the content needs to be directly inline with surrounding elements",
    "For extremely small pieces of content where the padding would be excessive"
  ];

  return (
    <OverviewTemplate
      title="Card Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Card component is a flexible container that groups related content and actions. 
        It provides a clean, distinct surface for presenting information in a visually 
        organized way. Cards can contain various elements such as text, images, buttons, 
        and other interactive elements.
      </p>
      
      <p class="mt-2">
        Cards are modular and composable, built with a set of subcomponents: CardHeader, 
        CardBody, CardFooter, and CardMedia. This structure makes it easy to create 
        consistent card layouts throughout your application with appropriate spacing 
        and visual hierarchy.
      </p>
      
      <p class="mt-2">
        With customizable elevation, border radius, and interaction states, cards can be 
        tailored to match your design system. They can be static information displays or 
        interactive elements that serve as navigation links or clickable surfaces that 
        trigger actions.
      </p>
    </OverviewTemplate>
  );
});
