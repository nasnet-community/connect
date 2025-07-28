import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("personal-info");

  const tabs = [
    { id: "personal-info", label: "Personal Info" },
    { id: "account-settings", label: "Account Settings" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" },
  ];

  const tabContent: Record<string, { title: string; description: string }> = {
    "personal-info": {
      title: "Personal Info",
      description: "Content for the active tab would be displayed here.",
    },
    "account-settings": {
      title: "Account Settings",
      description: "Manage your account preferences and settings.",
    },
    notifications: {
      title: "Notifications",
      description: "Configure how you receive notifications.",
    },
    billing: {
      title: "Billing",
      description: "View and manage your billing information.",
    },
    security: {
      title: "Security",
      description: "Security settings and two-factor authentication.",
    },
  };

  return (
    <div class="flex h-64 p-4">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab.value}
        onSelect$={(tabId: string) => {
          activeTab.value = tabId;
        }}
        class="h-full"
      />

      <div class="flex-1 border-l border-gray-200 p-4 dark:border-gray-700">
        <h3 class="mb-2 text-lg font-medium">
          {tabContent[activeTab.value].title}
        </h3>
        <p class="text-sm text-gray-500">
          {tabContent[activeTab.value].description}
        </p>
      </div>
    </div>
  );
});
