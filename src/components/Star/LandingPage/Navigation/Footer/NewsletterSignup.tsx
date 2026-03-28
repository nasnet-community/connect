import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Button } from "~/components/Core";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale } from "~/i18n/config";

export const NewsletterSignup = component$(() => {
  const location = useLocation();
  const locale = normalizeLocale(location.params.locale);

  return (
    <div class="mt-12 border-t border-white/20 pt-8">
      <div class="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
        <h3 class="mb-2 text-lg font-semibold">
          {semanticMessages.landing_footer_newsletter_title({}, { locale })}
        </h3>
        <p class="mb-4 text-gray-300">
          {semanticMessages.landing_footer_newsletter_description(
            {},
            { locale },
          )}
        </p>
        <div class="flex gap-2">
          <input
            type="email"
            placeholder={semanticMessages.newsletter_input_placeholder(
              {},
              { locale },
            )}
            class="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
          />
          <Button
            variant="primary"
            class="bg-gradient-to-r from-purple-500 to-blue-500 px-6 hover:from-purple-600 hover:to-blue-600"
          >
            {semanticMessages.newsletter_button_subscribe({}, { locale })}
          </Button>
        </div>
      </div>
    </div>
  );
});
