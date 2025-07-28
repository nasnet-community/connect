import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../../Breadcrumbs";

export default component$(() => {
  const items = [
    { label: "Home", href: "#", icon: <i class="fas fa-home"></i> },
    { label: "Products", href: "#", icon: <i class="fas fa-box"></i> },
    { label: "Electronics", href: "#", icon: <i class="fas fa-laptop"></i> },
    {
      label: "Smartphones",
      isCurrent: true,
      icon: <i class="fas fa-mobile-alt"></i>,
    },
  ];

  return (
    <div class="p-4">
      <Breadcrumbs items={items} />
    </div>
  );
});
