import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
      tabId: "desc-tab",
      controls: "desc-panel",
    },
    {
      id: "specifications",
      label: "Specifications",
      tabId: "specs-tab",
      controls: "specs-panel",
    },
    {
      id: "reviews",
      label: "Reviews",
      tabId: "reviews-tab",
      controls: "reviews-panel",
      count: 42,
    },
  ];

  const tabPanels = {
    description: {
      id: "desc-panel",
      labelledBy: "desc-tab",
      title: "Product Description",
      content:
        'This tab component demonstrates proper ARIA attributes for accessibility. It uses role="tablist" for the container, role="tab" for each tab, and establishes the relationship between tabs and panels with id/controls attributes.',
    },
    specifications: {
      id: "specs-panel",
      labelledBy: "specs-tab",
      title: "Product Specifications",
      content: "Detailed specifications would be displayed here.",
    },
    reviews: {
      id: "reviews-panel",
      labelledBy: "reviews-tab",
      title: "Customer Reviews",
      content: "42 customer reviews would be displayed here.",
    },
  };

  return (
    <div class="p-4">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab.value}
        onSelect$={(tabId: string) => {
          activeTab.value = tabId;
        }}
        aria-label="Product information"
        id="accessible-tabs"
      />

      <div class="mt-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        {Object.entries(tabPanels).map(([key, panel]) => (
          <div
            key={key}
            id={panel.id}
            role="tabpanel"
            aria-labelledby={panel.labelledBy}
            hidden={activeTab.value !== key}
          >
            <h3 class="mb-2 text-lg font-medium">{panel.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {panel.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
