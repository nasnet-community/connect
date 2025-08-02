import { component$ } from "@builder.io/qwik";

export const FooterBottom = component$(() => (
  <div class="mt-12 border-t border-border pt-8 dark:border-border-dark">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p class="text-text-secondary dark:text-text-dark-secondary text-sm">
        {$localize`© 2025 NASNET Connect. All rights reserved.`}
      </p>
      <div class="flex items-center gap-6">
        <a
          href="https://www.starlink4iran.com/faqs/mcg/"
          class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
        >
          {$localize`FAQs`}
        </a>
        <a
          href="https://www.starlink4iran.com/privacy-policy/"
          class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
        >
          {$localize`Privacy Policy`}
        </a>
        <a
          href="https://www.starlink4iran.com/terms-and-conditions/"
          class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
        >
          {$localize`Terms of Service`}
        </a>
      </div>
    </div>
  </div>
));
