import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <i class="fas fa-home"></i>,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <i class="fas fa-chart-bar"></i>,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <i class="fas fa-file-alt"></i>,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <i class="fas fa-cog"></i>,
    },
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
    </div>
  );
});
