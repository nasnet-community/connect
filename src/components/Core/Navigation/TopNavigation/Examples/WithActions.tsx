import { component$ } from "@builder.io/qwik";
import { TopNavigation } from "../../TopNavigation";
import type { TopNavigationItem } from "../../TopNavigation";
import { Button } from "~/components/Core/button";

export default component$(() => {
  const items: TopNavigationItem[] = [
    { href: "#", label: "Home", isActive: true },
    { href: "#", label: "Products" },
    { href: "#", label: "Services" },
    { href: "#", label: "About" },
  ];

  const logo = (
    <div class="flex items-center">
      <div class="mr-4">
        <img src="/images/logo.jpg" alt="Logo" class="h-8" />
      </div>
    </div>
  );

  const rightContent = (
    <div class="flex items-center space-x-2">
      <Button size="sm" variant="ghost">
        Sign In
      </Button>
      <Button size="sm" variant="primary">
        Sign Up
      </Button>
    </div>
  );

  return (
    <div class="p-4">
      <TopNavigation items={items} logo={logo} rightContent={rightContent} />
    </div>
  );
});
