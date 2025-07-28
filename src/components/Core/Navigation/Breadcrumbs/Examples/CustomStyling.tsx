import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../../Breadcrumbs";

export default component$(() => {
  const items = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "Web Development", isCurrent: true },
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default Style</h3>
        <Breadcrumbs items={items} />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Custom Classes</h3>
        <Breadcrumbs
          items={[
            {
              label: "Home",
              href: "#",
              class: "text-blue-600 hover:text-blue-800",
            },
            {
              label: "Products",
              href: "#",
              class: "text-blue-600 hover:text-blue-800",
            },
            {
              label: "Premium Items",
              isCurrent: true,
              class: "font-bold text-blue-900",
            },
          ]}
          class="rounded-md bg-gray-100 p-3 text-base"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Accessible Label</h3>
        <Breadcrumbs items={items} label="Product Navigation" />
      </div>
    </div>
  );
});
