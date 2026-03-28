import { component$ } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const FooterBottom = component$(() => {
  const locale = useMessageLocale();
  const currentYear = new Date().getFullYear();

  return (
    <div class="mt-12 border-t border-border pt-8 dark:border-border-dark">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p class="text-text-secondary dark:text-text-dark-secondary text-sm">
          {`© ${currentYear} NASNET Connect. All rights reserved.`}
        </p>
        <div class="flex items-center gap-6">
          <a
            href="https://www.starlink4iran.com/faqs/mcg/"
            class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
          >
            {semanticMessages.footer_faqs({}, { locale })}
          </a>
          <a
            href="https://www.starlink4iran.com/privacy-policy/"
            class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
          >
            {semanticMessages.footer_privacy_policy({}, { locale })}
          </a>
          <a
            href="https://www.starlink4iran.com/terms-and-conditions/"
            class="text-text-secondary dark:text-text-dark-secondary text-sm transition-colors hover:text-primary-500 dark:hover:text-primary-400"
          >
            {semanticMessages.footer_terms_of_service({}, { locale })}
          </a>
        </div>
      </div>
    </div>
  );
});
