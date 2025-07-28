import { component$, Slot } from "@builder.io/qwik";
import type { StackProps } from "./Stack.types";
import { useStack } from "./hooks";

/**
 * Enhanced Stack component - an advanced layout component for creating organized
 * vertical or horizontal layouts with mobile-first responsive design, 
 * RTL support, and touch optimization.
 *
 * The Stack component provides a comprehensive API for creating consistent
 * layouts with flexbox, offering full control over direction, spacing, alignment,
 * dividers, and mobile-specific behaviors.
 */
const Stack = component$<StackProps>((props) => {
  const {
    as: _as = "div",
    children: _children,
    ...rest
  } = props;

  // Use the enhanced useStack hook for all logic
  const { 
    combinedClassNames, 
    styleProperties,
    elementType,
    isMobile,
    isRtl,
    supportsContainerQueries,
    effectiveDirection
  } = useStack(props);

  const ElementAny = elementType as any;

  return (
    <ElementAny 
      {...rest} 
      class={combinedClassNames}
      style={{
        ...styleProperties,
        ...(props.style as Record<string, string> || {})
      }}
      data-mobile={isMobile ? 'true' : 'false'}
      data-rtl={isRtl ? 'true' : 'false'}
      data-container-queries={supportsContainerQueries ? 'true' : 'false'}
      data-direction={effectiveDirection}
      data-stack-component="true"
    >
      <Slot />
    </ElementAny>
  );
});

export default Stack;
