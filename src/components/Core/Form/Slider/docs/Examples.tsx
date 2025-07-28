import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicSlider from "../Examples/BasicSlider";
import SliderVariants from "../Examples/SliderVariants";
import SliderStates from "../Examples/SliderStates";
import RangeSlider from "../Examples/RangeSlider";
import SliderFeatures from "../Examples/SliderFeatures";
import SliderIntegration from "../Examples/SliderIntegration";

/**
 * Slider component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Slider",
      description:
        "Simple slider implementation with a single value. This example demonstrates the default configuration and a slider with helper text.",
      component: <BasicSlider />,
    },
    {
      title: "Slider Variants",
      description:
        "Different variants and sizes of sliders including default, filled, and small/medium/large sizes.",
      component: <SliderVariants />,
    },
    {
      title: "Slider States",
      description:
        "Various states of the Slider component including default, disabled, read-only, error, success, and warning states.",
      component: <SliderStates />,
    },
    {
      title: "Range Slider",
      description:
        "Range slider implementation allowing selection of value ranges with minimum range constraints.",
      component: <RangeSlider />,
    },
    {
      title: "Slider Features",
      description:
        "Advanced features such as marks, ticks, custom value formatting, and step sizes.",
      component: <SliderFeatures />,
    },
    {
      title: "Slider Integration",
      description:
        "Integration of sliders in a form context with reactive calculations and form submission.",
      component: <SliderIntegration />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Slider component offers a range of configurations and features to
        handle various use cases. These examples showcase its flexibility from
        basic usage to more advanced implementations with custom marks, ranges,
        and form integration.
      </p>
    </ExamplesTemplate>
  );
});
