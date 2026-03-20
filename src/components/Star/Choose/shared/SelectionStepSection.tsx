import { Slot, component$ } from "@builder.io/qwik";

export interface SelectionStepSectionProps {
  title: string;
  description: string;
  titleClass?: string;
  descriptionClass?: string;
}

export const SelectionStepSection = component$((props: SelectionStepSectionProps) => {
  const titleClass = [
    "bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl",
    props.titleClass,
  ]
    .filter(Boolean)
    .join(" ");

  const descriptionClass = [
    "mx-auto mt-3 max-w-2xl text-text-secondary/90 dark:text-text-dark-secondary/95",
    props.descriptionClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section class="space-y-8">
      <header class="text-center">
        <h2 class={titleClass}>{props.title}</h2>
        <p class={descriptionClass}>{props.description}</p>
      </header>

      <Slot />
    </section>
  );
});
