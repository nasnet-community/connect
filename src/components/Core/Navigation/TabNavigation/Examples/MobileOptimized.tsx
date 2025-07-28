import { component$, useSignal } from "@builder.io/qwik";
import { TabNavigation } from "../index";

export default component$(() => {
  const activeTab = useSignal("overview");
  const activeMobileTab = useSignal("tab1");

  const manyTabs = [
    { id: "overview", label: "Overview", icon: <i class="fas fa-home" /> },
    { id: "analytics", label: "Analytics", icon: <i class="fas fa-chart-line" />, count: 42 },
    { id: "reports", label: "Reports", icon: <i class="fas fa-file-alt" />, count: 7 },
    { id: "notifications", label: "Notifications", icon: <i class="fas fa-bell" />, count: 123 },
    { id: "users", label: "Users", icon: <i class="fas fa-users" /> },
    { id: "settings", label: "Settings", icon: <i class="fas fa-cog" /> },
    { id: "security", label: "Security", icon: <i class="fas fa-shield-alt" /> },
    { id: "integrations", label: "Integrations", icon: <i class="fas fa-plug" /> },
  ];

  const mobileTabs = Array.from({ length: 10 }, (_, i) => ({
    id: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    count: i * 10,
  }));

  return (
    <div class="space-y-8 p-4">
      {/* Scrollable Tabs Demo */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Scrollable Tabs with Overflow</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          When tabs overflow the container, they become scrollable with gradient indicators on desktop.
        </p>
        
        {/* Desktop view with many tabs */}
        <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <TabNavigation
            tabs={manyTabs}
            activeTab={activeTab.value}
            onSelect$={(tabId: string) => {
              activeTab.value = tabId;
            }}
            variant="underline"
            size="md"
          />
          <div class="mt-4 p-4 text-center text-gray-600 dark:text-gray-400">
            Selected: {activeTab.value}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Tabs */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Mobile-Optimized Tab Sizes</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Tabs automatically adjust their size and spacing for mobile devices with enhanced touch targets.
        </p>

        {/* Mobile simulation */}
        <div class="mx-auto max-w-[360px]">
          <div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900/50">
            <TabNavigation
              tabs={mobileTabs.slice(0, 6)}
              activeTab={activeMobileTab.value}
              onSelect$={(tabId: string) => {
                activeMobileTab.value = tabId;
              }}
              variant="pills"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Touch-Friendly Variants */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Touch-Friendly Tab Variants</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Different tab variants optimized for touch interaction with proper spacing and tap areas.
        </p>

        <div class="space-y-4">
          {/* Pills variant */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Pills Variant (Best for Mobile)</h4>
            <TabNavigation
              tabs={[
                { id: "all", label: "All", count: 245 },
                { id: "active", label: "Active", count: 123 },
                { id: "archived", label: "Archived", count: 122 },
              ]}
              activeTab="all"
              onSelect$={() => {}}
              variant="pills"
              size="md"
            />
          </div>

          {/* Boxed variant */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Boxed Variant</h4>
            <TabNavigation
              tabs={[
                { id: "profile", label: "Profile" },
                { id: "account", label: "Account" },
                { id: "privacy", label: "Privacy" },
              ]}
              activeTab="profile"
              onSelect$={() => {}}
              variant="boxed"
              size="md"
            />
          </div>

          {/* Minimal variant */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Minimal Variant (Space Efficient)</h4>
            <TabNavigation
              tabs={[
                { id: "today", label: "Today" },
                { id: "week", label: "This Week" },
                { id: "month", label: "This Month" },
                { id: "year", label: "This Year" },
              ]}
              activeTab="week"
              onSelect$={() => {}}
              variant="minimal"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Responsive Tab Behavior</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Tabs adapt their layout and behavior based on screen size. Try resizing your browser to see the changes.
        </p>
        
        <div class="rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-6 dark:from-primary-900/20 dark:to-secondary-900/20">
          <TabNavigation
            tabs={[
              { id: "dashboard", label: "Dashboard", icon: <i class="fas fa-tachometer-alt" /> },
              { id: "projects", label: "Projects", icon: <i class="fas fa-project-diagram" />, count: 5 },
              { id: "tasks", label: "Tasks", icon: <i class="fas fa-tasks" />, count: 18 },
              { id: "calendar", label: "Calendar", icon: <i class="fas fa-calendar" /> },
              { id: "team", label: "Team", icon: <i class="fas fa-users" /> },
            ]}
            activeTab="projects"
            onSelect$={() => {}}
            variant="underline"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
});