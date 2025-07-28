import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../../TabNavigation";

export default component$(() => {
  const activeTab1 = useSignal("overview");
  const activeTab2 = useSignal("overview");
  const activeTab3 = useSignal("overview");
  const activeTab4 = useSignal("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Underline Variant</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab1.value}
          onSelect$={(tabId: string) => {
            activeTab1.value = tabId;
          }}
          variant="underline"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Pills Variant</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab2.value}
          onSelect$={(tabId: string) => {
            activeTab2.value = tabId;
          }}
          variant="pills"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Boxed Variant</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab3.value}
          onSelect$={(tabId: string) => {
            activeTab3.value = tabId;
          }}
          variant="boxed"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Minimal Variant</h3>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab4.value}
          onSelect$={(tabId: string) => {
            activeTab4.value = tabId;
          }}
          variant="minimal"
        />
      </div>
    </div>
  );
});
