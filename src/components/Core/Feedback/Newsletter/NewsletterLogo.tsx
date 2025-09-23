import { component$ } from "@builder.io/qwik";
import logo from "../../../../../public/images/logo.jpg";

/**
 * Large NewsletterLogo component specifically designed for Newsletter header.
 * Features bigger logo and "NASNET Connect" text for enhanced brand presence.
 */
export const NewsletterLogo = component$(() => (
  <div class="flex flex-col items-center gap-2">
    <div class="group relative">
      <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
      <div class="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
        <img
          src={logo}
          alt={$localize`NASNET Connect Logo`}
          width={64}
          height={64}
          loading="lazy"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
    <a
      href="/"
      class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-3xl font-bold tracking-wider text-transparent transition-opacity hover:opacity-80 text-center"
    >
      {$localize`NASNET Connect`}
    </a>
  </div>
));