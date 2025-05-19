import { component$ } from "@builder.io/qwik";
import { PropFunction } from "@builder.io/qwik";

export interface DocsSidebarOverlayProps {
  onClick$: PropFunction<() => void>;
}

/**
 * A fullscreen overlay for mobile that appears behind the sidebar
 */
export const DocsSidebarOverlay = component$<DocsSidebarOverlayProps>((props) => {
  return (
    <div 
      class="fixed inset-0 bg-slate-900/50 z-20 md:hidden animate-fade-in backdrop-blur-sm"
      onClick$={props.onClick$}
    ></div>
  );
}); 