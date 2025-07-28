import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import Divider from "../Divider";

export default component$(() => {
  const DividerComponent = (props: any) => (
    <div class="p-6">
      {props.orientation === "vertical" ? (
        <div class="flex h-40">
          <div class="w-1/2">
            <p>Left content</p>
          </div>
          <Divider
            orientation={props.orientation}
            thickness={props.thickness}
            variant={props.variant}
            color={props.color}
            label={props.hasLabel ? props.label : undefined}
            labelPosition={props.labelPosition}
            spacing={props.spacing}
          />
          <div class="w-1/2 pl-4">
            <p>Right content</p>
          </div>
        </div>
      ) : (
        <Divider
          orientation={props.orientation}
          thickness={props.thickness}
          variant={props.variant}
          color={props.color}
          label={props.hasLabel ? props.label : undefined}
          labelPosition={props.labelPosition}
          spacing={props.spacing}
        />
      )}
    </div>
  );

  return (
    <PlaygroundTemplate
      component={DividerComponent}
      properties={[
        {
          type: "select",
          name: "orientation",
          label: "Orientation",
          defaultValue: "horizontal",
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
        },
        {
          type: "select",
          name: "thickness",
          label: "Thickness",
          defaultValue: "medium",
          options: [
            { label: "Thin", value: "thin" },
            { label: "Medium", value: "medium" },
            { label: "Thick", value: "thick" },
          ],
        },
        {
          type: "select",
          name: "variant",
          label: "Variant",
          defaultValue: "solid",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ],
        },
        {
          type: "select",
          name: "color",
          label: "Color",
          defaultValue: "default",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Muted", value: "muted" },
          ],
        },
        {
          type: "boolean",
          name: "hasLabel",
          label: "Has Label",
          defaultValue: false,
        },
        {
          type: "text",
          name: "label",
          label: "Label Text",
          defaultValue: "Divider Label",
        },
        {
          type: "select",
          name: "labelPosition",
          label: "Label Position",
          defaultValue: "center",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },
        {
          type: "select",
          name: "spacing",
          label: "Spacing",
          defaultValue: "md",
          options: [
            { label: "None", value: "none" },
            { label: "XS", value: "xs" },
            { label: "SM", value: "sm" },
            { label: "MD", value: "md" },
            { label: "LG", value: "lg" },
            { label: "XL", value: "xl" },
          ],
        },
      ]}
    />
  );
});
