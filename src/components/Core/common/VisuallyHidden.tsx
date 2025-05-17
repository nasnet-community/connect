import { component$, Slot, type PropsOf } from "@builder.io/qwik";

/**
 * VisuallyHidden component that hides content visually while keeping it accessible to screen readers.
 * This is useful for providing context to screen reader users without affecting the visual layout.
 */
export const VisuallyHidden = component$<PropsOf<"span">>((props) => {
  return (
    <span
      {...props}
      class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
      }}
    >
      <Slot />
    </span>
  );
}); 