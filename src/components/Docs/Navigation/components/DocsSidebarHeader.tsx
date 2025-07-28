import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

export interface DocsSidebarHeaderProps {
  onClose$: PropFunction<() => void>;
  title?: string;
}

/**
 * Header for the sidebar in mobile view with a close button
 */
export const DocsSidebarHeader = component$<DocsSidebarHeaderProps>((props) => {
  const { title = "Documentation", onClose$ } = props;

  return (
    <>
      <div class="mb-6 mt-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <button
          onClick$={onClose$}
          class="rounded-full p-2 text-gray-500 transition-all duration-200 can-hover:hover:bg-gray-200 can-hover:hover:text-gray-700 dark:text-gray-400 dark:can-hover:hover:bg-gray-800 dark:can-hover:hover:text-gray-200 can-hover:hover:animate-lift active:animate-press touch:cursor-touch"
          aria-label="Close sidebar"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="mb-6 h-px w-full bg-gray-200 dark:bg-gray-700"></div>
    </>
  );
});
