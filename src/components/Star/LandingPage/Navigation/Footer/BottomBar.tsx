import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale } from "~/i18n/config";

export const BottomBar = component$(() => {
  const location = useLocation();
  const locale = normalizeLocale(location.params.locale);

  return (
    <div class="border-t border-white/20 bg-black/20 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="text-sm text-gray-400">
            © 2024 MikroConnect.{" "}
            {semanticMessages.landing_footer_all_rights_reserved(
              {},
              { locale },
            )}
          </div>
          <div class="flex items-center gap-6">
            <a
              href="/privacy"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {semanticMessages.footer_privacy_policy({}, { locale })}
            </a>
            <a
              href="/terms"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {semanticMessages.footer_terms_of_service({}, { locale })}
            </a>
            <a
              href="/cookies"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {semanticMessages.landing_footer_cookie_policy({}, { locale })}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
