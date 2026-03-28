import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LuArrowUp } from "@qwikest/icons/lucide";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale } from "~/i18n/config";

export const BackToTopButton = component$(() => {
  const location = useLocation();
  const locale = normalizeLocale(location.params.locale);

  return (
    <button
      class="fixed bottom-8 right-8 z-40 flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={semanticMessages.landing_footer_back_to_top({}, { locale })}
    >
      <LuArrowUp class="h-6 w-6 text-white" />
    </button>
  );
});
