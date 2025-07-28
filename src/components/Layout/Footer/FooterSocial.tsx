import { component$ } from "@builder.io/qwik";
import { SOCIAL_LINKS } from "./constants";

export const FooterSocial = component$(() => (
  <div class="flex items-center justify-center gap-4">
    {SOCIAL_LINKS.map(({ icon, path, href, label }) => (
      <a
        key={icon}
        href={href}
        target="_blank"
        aria-label={label}
        rel="noopener noreferrer"
        class="text-text-secondary dark:text-text-dark-secondary transition-colors hover:text-primary-500 dark:hover:text-primary-400"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d={path} />
        </svg>
      </a>
    ))}
  </div>
));
