import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates/PlaygroundTemplate";
import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import { AccordionTrigger } from "../AccordionTrigger";
import { AccordionContent } from "../AccordionContent";

// Define the wrapper component outside to avoid type issues
const AccordionWrapper = component$<any>((props) => {
  return (
    <Accordion
      type={props.type}
      collapsible={props.collapsible}
      variant={props.variant}
      size={props.size}
      iconPosition={props.iconPosition}
      hideIcon={props.hideIcon}
      animation={props.animation}
      animationDuration={props.animationDuration}
      defaultValue={["item-1"]}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Qwik?</AccordionTrigger>
        <AccordionContent>
          Qwik is a new kind of web framework that can deliver instant loading
          web applications at any size or complexity. It uses resumability to
          serialize the application state, allowing instant startup without
          costly hydration.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does Qwik differ from other frameworks?
        </AccordionTrigger>
        <AccordionContent>
          Unlike traditional frameworks that require downloading, parsing, and
          executing JavaScript before the app becomes interactive, Qwik can
          resume where the server left off. This results in instant-on
          applications with minimal JS payload.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What is the significance of the $ sign?
        </AccordionTrigger>
        <AccordionContent>
          The $ sign in Qwik marks lazy-loading boundaries. It tells Qwik that
          this piece of code should be loaded only when needed. This is how Qwik
          achieves fine-grained lazy loading of application code.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export default component$(() => {
  const properties = [
    {
      name: "type",
      label: "Type",
      type: "select" as const,
      defaultValue: "single",
      options: [
        { label: "Single", value: "single" },
        { label: "Multiple", value: "multiple" },
      ],
    },
    {
      name: "collapsible",
      label: "Collapsible",
      type: "boolean" as const,
      defaultValue: false,
    },
    {
      name: "variant",
      label: "Variant",
      type: "select" as const,
      defaultValue: "default",
      options: [
        { label: "Default", value: "default" },
        { label: "Bordered", value: "bordered" },
        { label: "Separated", value: "separated" },
      ],
    },
    {
      name: "size",
      label: "Size",
      type: "select" as const,
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "iconPosition",
      label: "Icon Position",
      type: "select" as const,
      defaultValue: "end",
      options: [
        { label: "Start", value: "start" },
        { label: "End", value: "end" },
      ],
    },
    {
      name: "hideIcon",
      label: "Hide Icon",
      type: "boolean" as const,
      defaultValue: false,
    },
    {
      name: "animation",
      label: "Animation",
      type: "select" as const,
      defaultValue: "slide",
      options: [
        { label: "None", value: "none" },
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
        { label: "Scale", value: "scale" },
      ],
    },
    {
      name: "animationDuration",
      label: "Animation Duration (ms)",
      type: "number" as const,
      defaultValue: 300,
      min: 100,
      max: 1000,
      step: 50,
    },
  ];

  return (
    <PlaygroundTemplate component={AccordionWrapper} properties={properties} />
  );
});
