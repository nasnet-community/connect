import {
  component$,
  type JSXOutput,
  type PropFunction,
} from "@builder.io/qwik";
import { SelectionCard } from "../shared/SelectionCard";

export interface OptionCardProps {
  value: any;
  isSelected: boolean;
  icon: JSXOutput;
  title: string;
  description: string;
  features: string[];
  graph: JSXOutput;
  onSelect$: PropFunction<(value: any) => void>;
  isHorizontal?: boolean;
}

export const OptionCard = component$((props: OptionCardProps) => {
  return (
    <SelectionCard
      value={props.value}
      isSelected={props.isSelected}
      icon={props.icon}
      title={props.title}
      description={props.description}
      features={props.features}
      media={props.graph}
      onSelect$={props.onSelect$}
      orientation={props.isHorizontal ? "horizontal" : "vertical"}
      overflowVisible={true}
      bodyClass={props.isHorizontal ? "p-6" : "p-6"}
      mediaClass={props.isHorizontal ? "mt-6 md:mt-0" : "pt-6"}
      headingClass="text-xl"
      featureTextClass="text-sm"
      ignoreClickWithin={[".network-graph", ".topology-container"]}
    />
  );
});
