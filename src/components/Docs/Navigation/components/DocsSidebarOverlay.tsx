import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

export interface DocsSidebarOverlayProps {
  onClick$: PropFunction<() => void>;
}

/**
 * A fullscreen overlay for mobile that appears behind the sidebar
 */
export const DocsSidebarOverlay = component$<DocsSidebarOverlayProps>(
  (props) => {
    return (
      <div
        class="fixed inset-0 z-20 animate-fade-in bg-gray-900/50 backdrop-blur-sm touch:cursor-touch md:hidden"
        onClick$={props.onClick$}
        role="button"
        aria-label="Close sidebar"
        tabIndex={0}
      ></div>
    );
  },
);
