import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { TopNavigation } from "../../TopNavigation";
import type { TopNavigationItem } from "../../TopNavigation";

export default component$(() => {
  const propControls = {
    TopNavigation: [
      {
        name: "variant",
        type: "select",
        options: ["default", "minimal", "filled", "transparent", "bordered"],
        defaultValue: "default",
      },
      {
        name: "position",
        type: "select",
        options: ["static", "fixed", "sticky"],
        defaultValue: "static",
      },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      {
        name: "mobileMenuEnabled",
        type: "boolean",
        defaultValue: true,
      },
    ],
    NavItems: [
      {
        name: "numberOfItems",
        type: "range",
        min: 2,
        max: 6,
        defaultValue: 4,
        description: "Number of navigation items",
      },
      {
        name: "showIcons",
        type: "boolean",
        defaultValue: false,
        description: "Show icons in navigation items",
      },
      {
        name: "activeItemIndex",
        type: "range",
        min: 0,
        max: 5,
        defaultValue: 0,
        description: "Index of the active item",
      },
      {
        name: "includeDropdown",
        type: "boolean",
        defaultValue: false,
        description: "Include a dropdown menu",
      },
    ],
  };

  // This is a simplified representation - in a real implementation,
  // the playground would render a dynamic component based on the selected props
  const renderComponent = (props: any) => {
    const navLabels = [
      "Home",
      "Products",
      "Services",
      "About",
      "Blog",
      "Contact",
    ];
    const icons = [
      <i class="fas fa-home"></i>,
      <i class="fas fa-box"></i>,
      <i class="fas fa-cog"></i>,
      <i class="fas fa-info-circle"></i>,
      <i class="fas fa-blog"></i>,
      <i class="fas fa-envelope"></i>,
    ];

    const items: TopNavigationItem[] = Array.from(
      { length: props.NavItems.numberOfItems },
      (_, i) => ({
        label: navLabels[i],
        href: "#",
        isActive: props.NavItems.activeItemIndex === i,
        ...(props.NavItems.showIcons && { icon: icons[i] }),
        ...(props.NavItems.includeDropdown &&
          i === 1 && {
            items: [
              { label: "Product 1", href: "#" },
              { label: "Product 2", href: "#" },
              { label: "Product 3", href: "#" },
            ],
          }),
      }),
    );

    return (
      <div class="rounded-md border p-4">
        <TopNavigation
          items={items}
          variant={props.TopNavigation.variant}
          position={props.TopNavigation.position}
          size={props.TopNavigation.size}
          mobileMenuEnabled={props.TopNavigation.mobileMenuEnabled}
        />
      </div>
    );
  };

  return (
    <PlaygroundTemplate
      propControls={propControls}
      renderComponent={renderComponent}
      initialProps={{
        TopNavigation: {
          variant: "default",
          position: "static",
          size: "md",
          mobileMenuEnabled: true,
        },
        NavItems: {
          numberOfItems: 4,
          showIcons: false,
          activeItemIndex: 0,
          includeDropdown: false,
        },
      }}
    >
      <p>
        Use this playground to experiment with the TopNavigation component.
        Adjust the properties to see how different configurations affect the
        appearance and behavior of the navigation bar.
      </p>
    </PlaygroundTemplate>
  );
});
