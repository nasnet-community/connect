import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates/OverviewTemplate";

export default component$(() => {
  const keyFeatures = [
    "Multiple variants: image, initials, and icon representations",
    "Six size variants: xs, sm, md, lg, xl, and 2xl",
    "Three shape options: circle, square, and rounded",
    "Status indicators with customizable positions",
    "Support for borders and custom colors",
    "Interactive options with clickable and link behavior",
    "AvatarGroup component for displaying multiple avatars",
    "Graceful fallback handling for failed image loads",
  ];

  const whenToUse = [
    "Representing users in comments, user lists, or profile pages",
    "Displaying contributors or team members in a compact way",
    "Showing creators or owners of content",
    "In chat interfaces to identify conversation participants",
    "When you need a visual representation of an entity or user",
  ];

  const whenNotToUse = [
    "When you need to display detailed user information beyond just a visual representation",
    "For primarily decorative purposes where user identification is not important",
    "When user privacy is a concern and displaying identifiable information should be avoided",
    "In dense interfaces where space is extremely limited",
  ];

  return (
    <OverviewTemplate
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Avatar component is used to represent users or entities in the
        interface. It provides a consistent visual identity across the
        application and supports displaying images, initials, or icons with
        various customization options.
      </p>
      <p class="mt-2">
        Avatars are an effective way to visually represent users in interfaces
        where space is limited. They help users quickly identify and recognize
        other users or entities while maintaining a clean and consistent UI.
      </p>
      <p class="mt-2">
        The component also includes an AvatarGroup variant for displaying
        multiple avatars in a space-efficient manner, with options to limit the
        number displayed and show an overflow indicator.
      </p>
    </OverviewTemplate>
  );
});
