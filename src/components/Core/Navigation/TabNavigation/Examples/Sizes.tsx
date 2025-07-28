import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTabSm = useSignal("profile");
  const activeTabMd = useSignal("profile");
  const activeTabLg = useSignal("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTabSm.value}
          onSelect$={(tabId) => {
            activeTabSm.value = tabId;
          }}
          size="sm"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTabMd.value}
          onSelect$={(tabId) => {
            activeTabMd.value = tabId;
          }}
          size="md"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTabLg.value}
          onSelect$={(tabId) => {
            activeTabLg.value = tabId;
          }}
          size="lg"
        />
      </div>
    </div>
  );
});
