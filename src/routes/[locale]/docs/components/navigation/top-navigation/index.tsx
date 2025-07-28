import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/Navigation/TopNavigation/docs";

export const useTopNavigationData = routeLoader$(async () => {
  return {
    title: "TopNavigation",
    description:
      "A horizontal navigation bar typically positioned at the top of a website or application.",
  };
});

export default component$(() => {
  const data = useTopNavigationData();

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
