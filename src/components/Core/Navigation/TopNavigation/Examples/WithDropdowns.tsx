import { component$ } from "@builder.io/qwik";
import { TopNavigation } from "../../TopNavigation";
import type { TopNavigationItem } from "../../TopNavigation";

export default component$(() => {
  const items: TopNavigationItem[] = [
    { href: "#", label: "Home", isActive: true },
    {
      label: "Products",
      items: [
        { href: "#", label: "Software" },
        { href: "#", label: "Hardware" },
        { href: "#", label: "Services" },
      ],
    },
    {
      label: "Solutions",
      items: [
        { href: "#", label: "Enterprise" },
        { href: "#", label: "Small Business" },
        { href: "#", label: "Startups" },
      ],
    },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <div class="p-4">
      <TopNavigation items={items} />
    </div>
  );
});
