import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("home");

  const tabs = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div class="p-4">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab.value}
        onSelect$={(tabId: string) => {
          activeTab.value = tabId;
        }}
      />

      <div class="mt-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        {activeTab.value === "home" && (
          <div>
            <h3 class="mb-2 text-lg font-medium">Home Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Home tab.
            </p>
          </div>
        )}

        {activeTab.value === "services" && (
          <div>
            <h3 class="mb-2 text-lg font-medium">Services Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Services tab.
            </p>
          </div>
        )}

        {activeTab.value === "about" && (
          <div>
            <h3 class="mb-2 text-lg font-medium">About Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the About tab.
            </p>
          </div>
        )}

        {activeTab.value === "contact" && (
          <div>
            <h3 class="mb-2 text-lg font-medium">Contact Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Contact tab.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
