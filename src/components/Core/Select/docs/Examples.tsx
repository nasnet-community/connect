import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicSelect from "../Examples/BasicSelect";
import SelectSizes from "../Examples/SelectSizes";
import SelectStates from "../Examples/SelectStates";
import SelectGrouped from "../Examples/SelectGrouped";
import SelectMultiple from "../Examples/SelectMultiple";
import SelectAsyncLoading from "../Examples/SelectAsyncLoading";
import SelectModeComparison from "../Examples/SelectModeComparison";
import SelectAdvancedFeatures from "../Examples/SelectAdvancedFeatures";
import SelectVirtualization from "../Examples/SelectVirtualization";

/**
 * Select component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Select",
      description:
        "Simple select dropdown with a list of options. This example demonstrates the standard implementation of a select component.",
      component: <BasicSelect />,
    },
    {
      title: "Select Sizes",
      description:
        "Different size variants of the Select component including small, medium, and large.",
      component: <SelectSizes />,
    },
    {
      title: "Select States",
      description:
        "Various states of the Select component including normal, disabled, error, and success states.",
      component: <SelectStates />,
    },
    {
      title: "Grouped Options",
      description:
        "Select with options organized into logical groups for better organization and user experience.",
      component: <SelectGrouped />,
    },
    {
      title: "Multiple Selection",
      description:
        "Select component in multiple selection mode allowing users to choose more than one option.",
      component: <SelectMultiple />,
    },
    {
      title: "Async Loading",
      description:
        "Advanced example demonstrating async data loading, search functionality, error handling, and retry mechanisms.",
      component: <SelectAsyncLoading />,
    },
    {
      title: "Native vs Custom Mode",
      description:
        "Side-by-side comparison of native browser select and custom styled dropdown modes with feature comparison.",
      component: <SelectModeComparison />,
    },
    {
      title: "Advanced Features",
      description:
        "Comprehensive example showcasing dynamic options, validation, custom option addition, and form integration.",
      component: <SelectAdvancedFeatures />,
    },
    {
      title: "Large Datasets & Performance",
      description:
        "Performance optimization strategies for handling large datasets with efficient filtering and result limiting.",
      component: <SelectVirtualization />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Select component offers robust features for dropdown selection
        interfaces. These examples showcase the component's flexibility from
        basic usage to more complex scenarios like grouping and multiple
        selection.
      </p>
    </ExamplesTemplate>
  );
});
