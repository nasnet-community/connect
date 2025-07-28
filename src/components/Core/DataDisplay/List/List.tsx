import { component$, Slot } from "@builder.io/qwik";
import type {
  ListProps,
  ListItemProps,
  ListTermProps,
  ListDescriptionProps,
} from "./List.types";
import { useList } from "./hooks/useList";

/**
 * List component for displaying ordered, unordered, and definition lists
 */
export const List = component$<ListProps>((props) => {
  const {
    variant = "unordered",
    start,
    reversed = false,
    class: className = "",
    id,
    ariaLabel,
  } = props;

  // Use the list hook
  const { baseClasses } = useList(props, className);

  if (variant === "ordered") {
    return (
      <ol
        class={baseClasses}
        id={id}
        start={start}
        reversed={reversed}
        aria-label={ariaLabel}
      >
        <Slot />
      </ol>
    );
  } else if (variant === "definition") {
    return (
      <dl class={baseClasses} id={id} aria-label={ariaLabel}>
        <Slot />
      </dl>
    );
  } else {
    return (
      <ul class={baseClasses} id={id} aria-label={ariaLabel}>
        <Slot />
      </ul>
    );
  }
});

/**
 * ListItem component for list items
 */
export const ListItem = component$<ListItemProps>((props) => {
  const {
    active = false,
    disabled = false,
    value,
    class: className = "",
    id,
  } = props;

  const classes = [
    active ? "text-primary-600 dark:text-primary-400 font-medium" : "",
    disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      class={classes}
      id={id}
      value={value ? parseInt(value) : undefined}
      aria-disabled={disabled ? "true" : undefined}
      aria-current={active ? "true" : undefined}
    >
      <Slot />
    </li>
  );
});

/**
 * ListTerm component for definition list terms
 */
export const ListTerm = component$<ListTermProps>((props) => {
  const { class: className = "" } = props;

  return (
    <dt
      class={`mb-1 font-medium text-gray-900 dark:text-gray-100 ${className}`}
    >
      <Slot />
    </dt>
  );
});

/**
 * ListDescription component for definition list descriptions
 */
export const ListDescription = component$<ListDescriptionProps>((props) => {
  const { class: className = "" } = props;

  return (
    <dd class={`mb-4 text-gray-600 dark:text-gray-400 ${className}`}>
      <Slot />
    </dd>
  );
});

/**
 * OrderedList convenience component
 */
export const OrderedList = component$<Omit<ListProps, "variant">>((props) => {
  return (
    <List {...props} variant="ordered">
      <Slot />
    </List>
  );
});

/**
 * UnorderedList convenience component
 */
export const UnorderedList = component$<Omit<ListProps, "variant">>((props) => {
  return (
    <List {...props} variant="unordered">
      <Slot />
    </List>
  );
});

/**
 * DefinitionList convenience component
 */
export const DefinitionList = component$<Omit<ListProps, "variant">>(
  (props) => {
    return (
      <List {...props} variant="definition">
        <Slot />
      </List>
    );
  },
);
