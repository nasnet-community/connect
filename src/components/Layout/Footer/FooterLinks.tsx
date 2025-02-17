import { component$ } from "@builder.io/qwik";
import { FOOTER_LINKS } from "./constants";

export const FooterLinks = component$(() => (
  <>
    {Object.entries(FOOTER_LINKS).map(([title, items]) => (
      <div key={title}>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-text dark:text-text-dark-default">
          {$localize`${title}`}
        </h3>
        <ul class="space-y-3">
          {items.map((item) => (
            <li key={item}>
              <a
                href="#"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500 dark:text-text-dark-secondary dark:hover:text-primary-400"
              >
                {$localize`${item}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
));
