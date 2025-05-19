import { component$ } from "@builder.io/qwik";
import { PropFunction } from "@builder.io/qwik";

export interface ToggleButtonProps {
  onClick$: PropFunction<() => void>;
  isVisible: boolean;
}

/**
 * Button to toggle the sidebar visibility
 */
export const ToggleButton = component$<ToggleButtonProps>((props) => {
  return (
    <button
      onClick$={props.onClick$}
      class="mr-3 p-2 rounded-md text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
      aria-label={props.isVisible ? "Hide sidebar" : "Show sidebar"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  );
}); 