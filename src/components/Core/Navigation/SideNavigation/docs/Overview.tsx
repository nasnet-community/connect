import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Responsive design with mobile-friendly behavior",
    "Support for nested navigation items",
    "Collapsible sections for organizing related links",
    "Header component for branding and custom content",
    "Icon integration for improved visual navigation cues",
    "Active state indication for current page/section",
  ];

  const whenToUse = [
    "For main website navigation in a sidebar layout",
    "When creating complex application dashboards",
    "For multi-level navigation structures with parent/child relationships",
    "When there's a need to organize many navigation items into collapsible groups",
    "For responsive designs that require a slide-in menu on mobile devices",
  ];

  const whenNotToUse = [
    "For simple websites with few navigation items (consider TopNavigation instead)",
    "When vertical space is extremely limited",
    "For compact mobile interfaces where a bottom navigation might be more appropriate",
    "When the navigation hierarchy is very flat (no nested items)",
    "For temporary or contextual navigation that appears only in specific scenarios",
  ];

  return (
    <OverviewTemplate
      title="SideNavigation Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The SideNavigation component provides a vertical navigation sidebar that
        organizes links and actions in a hierarchical structure. It's designed
        to handle both simple and complex navigation systems, with support for
        nested items, collapsible sections, icons, and responsive behavior.
      </p>

      <p class="mt-2">
        This component is ideal for application dashboards, admin interfaces,
        and content-heavy websites that require organizing navigation items into
        logical groups. The sidebar adapts to different screen sizes,
        transforming into an off-canvas menu on mobile devices to ensure a
        consistent experience across all viewports.
      </p>

      <p class="mt-2">
        SideNavigation includes multiple sub-components like SideNavigationItem
        for individual links, SideNavigationHeader for branding and custom
        content, and SideNavigationBackdrop for mobile overlay effects. These
        components work together to create a cohesive navigation system that can
        be customized to match your application's needs.
      </p>
    </OverviewTemplate>
  );
});
