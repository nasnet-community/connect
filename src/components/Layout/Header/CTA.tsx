import { component$ } from "@builder.io/qwik";

interface CTAProps {
  isMobile?: boolean;
}

export const CTA = component$((props: CTAProps) => (
  <a
    href="/signup"
    class={
      props.isMobile
        ? "block w-full rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 py-3 text-center text-sm tracking-widest text-white transition-opacity duration-300 hover:opacity-90"
        : "group relative inline-flex items-center overflow-hidden rounded-lg px-6 py-2.5"
    }
  >
    {props.isMobile ? (
      $localize`GET STARTED`
    ) : (
      <>
        <span class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 transition-transform duration-300 group-hover:scale-105"></span>
        <span class="relative text-sm font-medium tracking-widest text-white">
          {$localize`GET STARTED`}
        </span>
      </>
    )}
  </a>
));
