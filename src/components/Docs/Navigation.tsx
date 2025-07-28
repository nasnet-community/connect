import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface NavItemProps {
  title: string;
  href: string;
  active?: boolean;
  level?: number;
}

export const NavItem = component$<NavItemProps>(
  ({ title, href, active = false, level = 0 }) => {
    const paddingLeft = `${level * 0.75 + 1}rem`;

    return (
      <li>
        <Link
          href={href}
          class={[
            "block rounded-md px-3 py-2 text-sm transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            active
              ? "bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
              : "text-gray-700 dark:text-gray-300",
          ].join(" ")}
          style={{ paddingLeft }}
        >
          {title}
        </Link>
      </li>
    );
  },
);

interface NavGroupProps {
  title: string;
  defaultOpen?: boolean;
  level?: number;
}

export const NavGroup = component$<NavGroupProps>(
  ({ title, defaultOpen = false, level = 0 }) => {
    const isOpen = useSignal(defaultOpen);
    const paddingLeft = `${level * 0.75 + 1}rem`;

    const toggleOpen$ = $(() => {
      isOpen.value = !isOpen.value;
    });

    return (
      <li>
        <button
          onClick$={toggleOpen$}
          class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
          style={{ paddingLeft }}
          aria-expanded={isOpen.value}
        >
          <span>{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class={`h-4 w-4 transition-transform ${isOpen.value ? "rotate-180 transform" : ""}`}
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <ul class={`mt-1 space-y-1 ${isOpen.value ? "block" : "hidden"}`}>
          <slot />
        </ul>
      </li>
    );
  },
);

export const DocsSidebar = component$(() => {
  return (
    <nav class="h-full w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
      <div class="p-4">
        <h2 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Connect Design System
        </h2>

        <ul class="space-y-1">
          <NavItem title="Introduction" href="/docs" active />
          <NavItem title="Getting Started" href="/docs/getting-started" />

          <NavGroup title="Design Tokens" defaultOpen>
            <NavItem title="Colors" href="/docs/tokens/colors" level={1} />
            <NavItem
              title="Typography"
              href="/docs/tokens/typography"
              level={1}
            />
            <NavItem title="Spacing" href="/docs/tokens/spacing" level={1} />
            <NavItem title="Shadows" href="/docs/tokens/shadows" level={1} />
            <NavItem title="Borders" href="/docs/tokens/borders" level={1} />
          </NavGroup>

          <NavGroup title="Guidelines">
            <NavItem
              title="Usage Guidelines"
              href="/docs/guidelines/usage"
              level={1}
            />
            <NavItem
              title="Accessibility"
              href="/docs/guidelines/accessibility"
              level={1}
            />
            <NavItem
              title="Component Anatomy"
              href="/docs/guidelines/anatomy"
              level={1}
            />
            <NavItem
              title="Writing Stories"
              href="/docs/guidelines/stories"
              level={1}
            />
          </NavGroup>

          <NavGroup title="Components">
            <NavGroup title="Layout" level={1}>
              <NavItem
                title="Container"
                href="/docs/components/layout/container"
                level={2}
              />
              <NavItem
                title="Grid"
                href="/docs/components/layout/grid"
                level={2}
              />
              <NavItem
                title="Box"
                href="/docs/components/layout/box"
                level={2}
              />
            </NavGroup>

            <NavGroup title="Input" level={1}>
              <NavItem
                title="Button"
                href="/docs/components/input/button"
                level={2}
              />
              <NavItem
                title="TextField"
                href="/docs/components/input/text-field"
                level={2}
              />
              <NavItem
                title="Checkbox"
                href="/docs/components/input/checkbox"
                level={2}
              />
              <NavItem
                title="Radio"
                href="/docs/components/input/radio"
                level={2}
              />
              <NavItem
                title="Select"
                href="/docs/components/input/select"
                level={2}
              />
            </NavGroup>

            <NavGroup title="Feedback" level={1}>
              <NavItem
                title="Alert"
                href="/docs/components/feedback/alert"
                level={2}
              />
              <NavItem
                title="Toast"
                href="/docs/components/feedback/toast"
                level={2}
              />
              <NavItem
                title="Dialog"
                href="/docs/components/feedback/dialog"
                level={2}
              />
              <NavItem
                title="Drawer"
                href="/docs/components/feedback/drawer"
                level={2}
              />
              <NavItem
                title="Popover"
                href="/docs/components/feedback/popover"
                level={2}
              />
            </NavGroup>

            <NavGroup title="Data Display" level={1}>
              <NavItem
                title="Table"
                href="/docs/components/data-display/table"
                level={2}
              />
              <NavItem
                title="List"
                href="/docs/components/data-display/list"
                level={2}
              />
              <NavItem
                title="Card"
                href="/docs/components/data-display/card"
                level={2}
              />
              <NavItem
                title="Badge"
                href="/docs/components/data-display/badge"
                level={2}
              />
            </NavGroup>

            <NavGroup title="Navigation" level={1}>
              <NavItem
                title="Tabs"
                href="/docs/components/navigation/tabs"
                level={2}
              />
              <NavItem
                title="Breadcrumb"
                href="/docs/components/navigation/breadcrumb"
                level={2}
              />
              <NavItem
                title="Link"
                href="/docs/components/navigation/link"
                level={2}
              />
              <NavItem
                title="Pagination"
                href="/docs/components/navigation/pagination"
                level={2}
              />
            </NavGroup>
          </NavGroup>
        </ul>
      </div>
    </nav>
  );
});

export const DocsLayout = component$(() => {
  return (
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DocsSidebar />
      <main class="flex-1 overflow-y-auto p-8">
        <slot />
      </main>
    </div>
  );
});
