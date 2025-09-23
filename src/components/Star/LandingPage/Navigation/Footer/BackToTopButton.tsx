import { component$ } from "@builder.io/qwik";
import { LuArrowUp } from "@qwikest/icons/lucide";

export const BackToTopButton = component$(() => {
  return (
    <button
      class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
      onClick$={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={$localize`Back to top`}
    >
      <LuArrowUp class="h-6 w-6 text-white" />
    </button>
  );
});