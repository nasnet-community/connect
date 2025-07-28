import { component$, Slot, useContext } from "@builder.io/qwik";
import { AccordionContext, AccordionItemContext } from "./AccordionContext";
import type { AccordionContentProps } from "./Accordion.types";

export const AccordionContent = component$<AccordionContentProps>((props) => {
  const { class: className = "" } = props;

  // Get accordion and item context
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  // Animation styles based on props
  const animationStyles = itemContext.isExpanded
    ? {
        maxHeight: "1000px", // Arbitrary large value, will be constrained by content
        opacity: "1",
        overflow: accordionContext.animation === "slide" ? "hidden" : undefined,
        transition: `
      max-height ${accordionContext.animationDuration}ms ease-in-out,
      opacity ${accordionContext.animationDuration}ms ease-in-out,
      transform ${accordionContext.animationDuration}ms ease-in-out
    `,
        transform:
          accordionContext.animation === "scale"
            ? "scaleY(1)"
            : "translateY(0)",
      }
    : {
        maxHeight: "0",
        opacity:
          accordionContext.animation === "fade" ||
          accordionContext.animation === "scale"
            ? "0"
            : "1",
        overflow: "hidden",
        transition: `
      max-height ${accordionContext.animationDuration}ms ease-in-out,
      opacity ${accordionContext.animationDuration}ms ease-in-out,
      transform ${accordionContext.animationDuration}ms ease-in-out
    `,
        transform:
          accordionContext.animation === "scale"
            ? "scaleY(0)"
            : "translateY(-10px)",
      };

  // Apply no animations if animation type is 'none'
  const styles =
    accordionContext.animation === "none"
      ? { display: itemContext.isExpanded ? "block" : "none" }
      : animationStyles;

  return (
    <div
      id={itemContext.contentId}
      role="region"
      aria-labelledby={itemContext.headerId}
      hidden={!itemContext.isExpanded && accordionContext.animation === "none"}
      style={styles}
      class={`${className}`}
    >
      <div class={`px-4 py-3`}>
        <Slot />
      </div>
    </div>
  );
});
