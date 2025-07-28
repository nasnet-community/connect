import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/Feedback/PromoBanner/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="PromoBanner"
      description="A promotional banner component for displaying VPN service offers with interactive credential retrieval capabilities."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      defaultTab="overview"
    />
  );
});
