import { component$ } from "@builder.io/qwik";
import { FooterBrand } from "./FooterBrand";
import { FooterSocial } from "./FooterSocial";
import { FooterBottom } from "./FooterBottom";

export const Footer = component$(() => {
  return (
    <footer class="mt-auto border-t border-border bg-surface dark:border-border-dark dark:bg-surface-dark">
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-secondary-500/0"></div>

      <div class="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 xl:px-8">
        <div class="mb-12 flex flex-col items-center justify-center space-y-6">
          <FooterBrand />
          <FooterSocial />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
});
