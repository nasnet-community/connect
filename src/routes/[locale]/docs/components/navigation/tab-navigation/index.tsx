import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/Navigation/TabNavigation/docs";

export const useTabNavigationData = routeLoader$(async () => {
  return {
    title: "TabNavigation",
    description:
      "A component for organizing content into accessible, selectable tabs.",
  };
});

export default component$(() => {
  const data = useTabNavigationData();

  return (
    <ComponentPage
      name={data.value.title}
      description={data.value.description}
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
    />
  );
});
