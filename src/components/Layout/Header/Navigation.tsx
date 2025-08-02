import { component$ } from "@builder.io/qwik";

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation = component$((props: NavigationProps) => {
  const navigationItems = [
    { key: "HOME", label: $localize`HOME`, href: "/home" },
    { key: "STAR", label: $localize`STAR`, href: "/star" },
    { key: "LUNA", label: $localize`LUNA`, href: "/luna" },
    { key: "ABOUT", label: $localize`ABOUT`, href: "/about" },
    { key: "CONTACT", label: $localize`CONTACT`, href: "/contact" },
  ];

  return (
    <nav
      class={
        props.isMobile
          ? "flex flex-col gap-2"
          : "hidden items-center space-x-2 lg:flex"
      }
    >
      {navigationItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          class={
            props.isMobile
              ? "text-text-secondary dark:text-text-dark-secondary rounded-lg px-4 py-3 text-sm tracking-widest transition-colors duration-300 hover:bg-primary-50 hover:text-primary-500 dark:hover:bg-primary-900/10 dark:hover:text-primary-400"
              : "text-text-secondary dark:text-text-dark-secondary group relative px-6 py-2 text-sm tracking-widest transition-colors duration-300 hover:text-primary-500 dark:hover:text-primary-400"
          }
        >
          <span class="relative z-10">{item.label}</span>
          {!props.isMobile && (
            <span class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          )}
        </a>
      ))}
    </nav>
  );
});
