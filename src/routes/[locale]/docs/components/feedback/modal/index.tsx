import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview as ModalOverview,
  Examples as ModalExamples,
  APIReference as ModalAPIReference,
  Usage as ModalUsage,
  Playground as ModalPlayground,
} from "~/components/Core/Modal/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Modal"
      description="A modal dialog component for displaying content in a layer above the page."
      Overview={<ModalOverview />}
      Examples={<ModalExamples />}
      APIReference={<ModalAPIReference />}
      Usage={<ModalUsage />}
      Playground={<ModalPlayground />}
    />
  );
});