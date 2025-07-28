import { component$, Slot, type QRL } from "@builder.io/qwik";

export interface ServerButtonProps {
  onClick$: QRL<() => void>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  primary?: boolean;
  danger?: boolean;
  class?: string;
}

export const ServerButton = component$<ServerButtonProps>(
  ({
    onClick$,
    type = "button",
    disabled = false,
    primary = true,
    danger = false,
    class: className = "",
  }) => {
    const baseClasses =
      "rounded-lg px-4 py-2 transition-colors focus:outline-none focus:ring-4";

    let variantClasses = "";
    if (danger) {
      variantClasses =
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/25 dark:bg-red-600 dark:hover:bg-red-700";
    } else if (primary) {
      variantClasses =
        "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500/25 dark:bg-primary-600 dark:hover:bg-primary-700";
    } else {
      variantClasses =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500/25 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600";
    }

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
      <button
        type={type}
        onClick$={onClick$}
        disabled={disabled}
        class={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      >
        <Slot />
      </button>
    );
  },
);
