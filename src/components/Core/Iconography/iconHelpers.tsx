import { component$ } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";

/**
 * Helper function to create icon components from imported icon functions
 * This ensures proper typing for Qwik components
 */
export function createIconComponent(IconFn: any) {
  return component$<{ class?: string; [key: string]: any }>((props) => {
    return <IconFn {...props} />;
  });
}

/**
 * Helper function to render icons directly in JSX
 * Use this when you need to pass icons as props
 */
export function renderIcon(
  IconFn: any,
  props?: { class?: string; [key: string]: any },
): JSXChildren {
  return <IconFn {...(props || {})} />;
}
