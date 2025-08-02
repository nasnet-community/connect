import { component$ } from "@builder.io/qwik";

interface ModeToggleProps {
  currentMode?: "easy" | "advanced";
  onToggle$: () => Promise<void>;
}

export const ModeToggle = component$<ModeToggleProps>((props) => {
  const { currentMode = "advanced" } = props;

  return (
    <button
      onClick$={props.onToggle$}
      class="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-sm 
             font-medium text-primary-600 transition-colors 
             hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-300
             dark:hover:bg-primary-900/30"
    >
      <svg
        class="mr-1 h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      {currentMode === "advanced"
        ? $localize`Switch to Easy Mode`
        : $localize`Switch to Advanced Mode`}
    </button>
  );
});
