import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab = useSignal("home");

  const tabs = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div class="p-4">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab.value}
        onSelect$={(tabId) => {
          activeTab.value = tabId;
        }}
      />
    </div>
  );
});
