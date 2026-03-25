import { component$ } from "@builder.io/qwik";
import { LuArrowUp } from "@qwikest/icons/lucide";

export const BackToTopButton = component$(() => {
  return (
    <button
      class="fixed bottom-8 right-8 z-40 flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={$localize`Back to top`}
    >
      <LuArrowUp class="h-6 w-6 text-white" />
    </button>
  );
});
