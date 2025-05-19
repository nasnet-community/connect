import { component$ } from "@builder.io/qwik";
import { PropFunction } from "@builder.io/qwik";

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
      <div class="flex items-center justify-between mb-6 mt-4">
        <h2 class="text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>
        <button
          onClick$={onClose$}
          class="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="h-px w-full bg-slate-200 dark:bg-slate-700 mb-6"></div>
    </>
  );
}); 