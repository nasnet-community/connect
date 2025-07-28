import { component$ } from "@builder.io/qwik";
import { TopNavigation } from "../../TopNavigation";

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation
        logo={<img src="/images/logo.jpg" alt="Logo" class="h-8" />}
        mobileMenuEnabled={true}
        items={[
          { href: "#", label: "Home", isActive: true },
          { href: "#", label: "Products" },
          { href: "#", label: "Services" },
          { href: "#", label: "About" },
          { href: "#", label: "Contact" },
        ]}
      />

      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Try resizing the browser window to see how the navigation responds to
          different screen sizes.
        </p>
      </div>
    </div>
  );
});
