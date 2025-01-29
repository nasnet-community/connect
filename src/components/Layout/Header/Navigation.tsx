import { component$ } from "@builder.io/qwik";

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation = component$((props: NavigationProps) => {
  const items = ["HOME", "STAR", "LUNA", "ABOUT", "CONTACT"];

  return (
    <nav
      class={
        props.isMobile
          ? "flex flex-col gap-2"
          : "hidden items-center space-x-2 lg:flex"
      }
    >
      {items.map((item) => (
        <a
          key={item}
          href={`/${item.toLowerCase()}`}
          class={
            props.isMobile
              ? "rounded-lg px-4 py-3 text-sm tracking-widest text-text-secondary transition-colors duration-300 hover:bg-primary-50 hover:text-primary-500 dark:text-text-dark-secondary dark:hover:bg-primary-900/10 dark:hover:text-primary-400"
              : "group relative px-6 py-2 text-sm tracking-widest text-text-secondary transition-colors duration-300 hover:text-primary-500 dark:text-text-dark-secondary dark:hover:text-primary-400"
          }
        >
          <span class="relative z-10">{$localize`${item}`}</span>
          {!props.isMobile && (
            <span class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          )}
        </a>
      ))}
    </nav>
  );
});
