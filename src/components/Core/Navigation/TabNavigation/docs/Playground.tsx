import { component$, useSignal } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("tab-0");

  const propControls = {
    TabNavigation: [
      {
        name: "variant",
        type: "select",
        options: ["underline", "pills", "boxed", "minimal"],
        defaultValue: "underline",
      },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      {
        name: "align",
        type: "select",
        options: ["left", "center", "right"],
        defaultValue: "left",
      },
      {
        name: "fullWidth",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "ariaLabel",
        type: "text",
        defaultValue: "Tab navigation",
      },
    ],
    TabItems: [
      {
        name: "numberOfTabs",
        type: "range",
        min: 2,
        max: 6,
        defaultValue: 3,
        description: "Number of tabs to display",
      },
      {
        name: "showIcons",
        type: "boolean",
        defaultValue: false,
        description: "Show icons in tabs",
      },
      {
        name: "activeTab",
        type: "range",
        min: 0,
        max: 5,
        defaultValue: 0,
        description: "Index of the active tab",
      },
      {
        name: "showCounts",
        type: "boolean",
        defaultValue: false,
        description: "Show count badges on tabs",
      },
    ],
  };

  // This is a simplified representation - in a real implementation,
  // the playground would render a dynamic component based on the selected props
  const renderComponent = (props: any) => {
    // Update activeTab based on prop changes
    activeTab.value = `tab-${props.TabItems.activeTab}`;

    const icons = [
      <i class="fas fa-home"></i>,
      <i class="fas fa-chart-bar"></i>,
      <i class="fas fa-cog"></i>,
      <i class="fas fa-user"></i>,
      <i class="fas fa-bell"></i>,
      <i class="fas fa-info-circle"></i>,
    ];

    const counts = [5, 12, 3, 8, 2, 7];

    const tabs = Array.from(
      { length: props.TabItems.numberOfTabs },
      (_, i) => ({
        id: `tab-${i}`,
        label: `Tab ${i + 1}`,
        ...(props.TabItems.showIcons && { icon: icons[i] }),
        ...(props.TabItems.showCounts && { count: counts[i] }),
      }),
    );

    return (
      <div class="rounded-md border p-4">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab.value}
          onSelect$={(tabId) => {
            activeTab.value = tabId;
          }}
          variant={props.TabNavigation.variant}
          size={props.TabNavigation.size}
          align={props.TabNavigation.align}
          fullWidth={props.TabNavigation.fullWidth}
          aria-label={props.TabNavigation.ariaLabel}
        />
      </div>
    );
  };

  return (
    <PlaygroundTemplate
      propControls={propControls}
      renderComponent={renderComponent}
      initialProps={{
        TabNavigation: {
          variant: "underline",
          size: "md",
          align: "left",
          fullWidth: false,
          ariaLabel: "Tab navigation",
        },
        TabItems: {
          numberOfTabs: 3,
          showIcons: false,
          activeTab: 0,
          showCounts: false,
        },
      }}
    >
      <p>
        Use this playground to experiment with the TabNavigation component.
        Adjust the properties to see how different configurations affect the
        appearance and behavior of the tabs.
      </p>
    </PlaygroundTemplate>
  );
});
