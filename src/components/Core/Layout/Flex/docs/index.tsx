import { component$ } from '@builder.io/qwik';

export const FlexOverview = component$(() => {
  return (
    <div>
      <p>
        The Flex component is a layout utility that leverages the CSS Flexbox module
        to create flexible, responsive layouts in one dimension: either as a row or column.
      </p>
    </div>
  );
});

export const FlexExamples = component$(() => {
  return (
    <div>
      <p>
        Example implementations of the Flex component in various configurations,
        demonstrating different direction, alignment, and spacing options.
      </p>
    </div>
  );
});

export const FlexAPIReference = component$(() => {
  return (
    <div>
      <p>
        Complete API reference for the Flex component, including all available props
        and their usage for controlling layout behavior.
      </p>
    </div>
  );
});

export const FlexUsage = component$(() => {
  return (
    <div>
      <p>
        Usage guidelines and best practices for implementing the Flex component
        effectively in different layout scenarios.
      </p>
    </div>
  );
});

export const FlexPlayground = component$(() => {
  return (
    <div>
      <p>
        Interactive playground for testing different Flex configurations to visualize
        their layout behaviors.
      </p>
    </div>
  );
}); 