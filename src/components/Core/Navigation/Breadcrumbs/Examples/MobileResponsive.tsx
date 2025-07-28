import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../../Breadcrumbs";

export default component$(() => {
  const items = [
    { label: "Home", href: "#", icon: <i class="fas fa-home" /> },
    { label: "Products", href: "#", icon: <i class="fas fa-box" /> },
    { label: "Electronics", href: "#", icon: <i class="fas fa-laptop" /> },
    { label: "Mobile Phones", href: "#", icon: <i class="fas fa-mobile-alt" /> },
    { label: "Smartphones", href: "#", icon: <i class="fas fa-mobile" /> },
    { label: "Android", href: "#", icon: <i class="fas fa-robot" /> },
    { label: "Samsung Galaxy S24", isCurrent: true, icon: <i class="fas fa-star" /> },
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Mobile-First Responsive Breadcrumbs</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This example shows how breadcrumbs adapt to different screen sizes with optimized touch targets.
        </p>
        
        {/* Mobile View Simulation */}
        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mobile View (360px)</h4>
          <div class="mx-auto max-w-[360px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <Breadcrumbs items={items} maxItems={2} />
          </div>
        </div>

        {/* Tablet View Simulation */}
        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tablet View (768px)</h4>
          <div class="mx-auto max-w-[768px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <Breadcrumbs items={items} maxItems={4} />
          </div>
        </div>

        {/* Desktop View */}
        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Desktop View (Full Width)</h4>
          <div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <Breadcrumbs items={items} maxItems={7} />
          </div>
        </div>
      </div>

      {/* Touch Target Demo */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Enhanced Touch Targets</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          All interactive elements have a minimum touch target of 44x44px for better mobile usability.
        </p>
        <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "#" },
              { label: "Products", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]} 
          />
        </div>
      </div>

      {/* Focus States Demo */}
      <div>
        <h3 class="mb-4 text-lg font-semibold">Keyboard Navigation & Focus States</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Try using Tab key to navigate. Focus states are optimized for accessibility.
        </p>
        <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "#" },
              { label: "Documentation", href: "#" },
              { label: "Components", href: "#" },
              { label: "Navigation", href: "#" },
              { label: "Breadcrumbs", isCurrent: true },
            ]} 
            maxItems={5}
          />
        </div>
      </div>
    </div>
  );
});