import { component$ } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

const logo = `${import.meta.env.BASE_URL}images/logo.jpg`;

/**
 * Large NewsletterLogo component specifically designed for Newsletter header.
 * Features bigger logo and "NASNET Connect" text for enhanced brand presence.
 */
export const NewsletterLogo = component$(() => {
  const locale = useMessageLocale();

  return (
    <div class="flex flex-col items-center gap-2">
      <div class="group relative">
        <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
        <div class="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-lg dark:border-gray-800">
          <img
            src={logo}
            alt={semanticMessages.logo_alt({}, { locale })}
            width={64}
            height={64}
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
      <a
        href="/"
        class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-center text-3xl font-bold tracking-wider text-transparent transition-opacity hover:opacity-80"
      >
        {semanticMessages.newsletter_logo_text({}, { locale })}
      </a>
    </div>
  );
});
