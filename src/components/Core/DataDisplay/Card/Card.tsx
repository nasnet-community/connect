import { component$, Slot } from "@builder.io/qwik";
import type { CardProps } from "./Card.types";
import { useCard } from "./hooks/useCard";

/**
 * Card component for displaying content in a contained, styled box.
 * Supports various visual styles, elevations, and interactive states.
 */
export const Card = component$<CardProps>((props) => {
  const {
    href,
    target = "_self",
    as = "div",
    class: className = "",
    id,
    disabled = false,
    onClick$,
  } = props;

  // Use the card hook to generate classes and styles
  const {
    cardClasses,
    handleMouseEnter$,
    handleMouseLeave$,
    handleTouchStart$,
    handleTouchEnd$,
  } = useCard(props as any, className);
  const classes = cardClasses;
  const customStyles = props.bgColor ? { backgroundColor: props.bgColor } : {};

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        class={classes}
        id={id}
        style={customStyles}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick$={onClick$}
        onMouseEnter$={handleMouseEnter$}
        onMouseLeave$={handleMouseLeave$}
        onTouchStart$={handleTouchStart$}
        onTouchEnd$={handleTouchEnd$}
      >
        <Slot />
      </a>
    );
  }

  // Otherwise, render as specified element (or div by default)
  const Element = as as any;

  return (
    <Element
      class={classes}
      id={id}
      style={customStyles}
      tabIndex={props.interactive && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      onClick$={onClick$}
      onMouseEnter$={handleMouseEnter$}
      onMouseLeave$={handleMouseLeave$}
      onTouchStart$={handleTouchStart$}
      onTouchEnd$={handleTouchEnd$}
    >
      <Slot />
    </Element>
  );
});
