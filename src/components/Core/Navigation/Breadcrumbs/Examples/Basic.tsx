import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../../Breadcrumbs";

export default component$(() => {
  const items = [
    { label: "Home", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Components", href: "#" },
    { label: "Navigation", href: "#" },
    { label: "Breadcrumbs", isCurrent: true },
  ];

  return (
    <div class="p-4">
      <Breadcrumbs items={items} />
    </div>
  );
});
