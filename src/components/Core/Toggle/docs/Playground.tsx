import { component$, $ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Toggle } from "../Toggle";

export default component$(() => {
  // Wrapper component to handle dynamic props
  const ToggleWrapper = component$((props: any) => {
    return (
      <Toggle
        checked={props.checked || false}
        onChange$={$(() => {
          // This is just for the playground display
        })}
        label={props.hasLabel ? props.label : undefined}
        labelPosition={props.labelPosition}
        size={props.size}
        color={props.color}
        disabled={props.disabled}
        loading={props.loading}
        checkedIcon={props.checkedIcon || undefined}
        uncheckedIcon={props.uncheckedIcon || undefined}
        required={props.required}
        focusVisibleOnly={props.focusVisibleOnly}
        aria-label={!props.hasLabel ? "Toggle feature" : undefined}
      />
    );
  });

  return (
    <PlaygroundTemplate
      component={ToggleWrapper}
      properties={[
        {
          type: "boolean",
          name: "checked",
          label: "Checked",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "hasLabel",
          label: "Has Label",
          defaultValue: true,
        },
        {
          type: "text",
          name: "label",
          label: "Label Text",
          defaultValue: "Toggle feature",
        },
        {
          type: "select",
          name: "labelPosition",
          label: "Label Position",
          defaultValue: "right",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
        {
          type: "select",
          name: "size",
          label: "Size",
          defaultValue: "md",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        {
          type: "boolean",
          name: "disabled",
          label: "Disabled",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "required",
          label: "Required",
          defaultValue: false,
        },
        {
          type: "select",
          name: "color",
          label: "Color",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Success", value: "success" },
            { label: "Error", value: "error" },
            { label: "Warning", value: "warning" },
            { label: "Info", value: "info" },
          ],
        },
        {
          type: "boolean",
          name: "loading",
          label: "Loading",
          defaultValue: false,
        },
        {
          type: "text",
          name: "checkedIcon",
          label: "Checked Icon",
          defaultValue: "",
        },
        {
          type: "text",
          name: "uncheckedIcon",
          label: "Unchecked Icon",
          defaultValue: "",
        },
        {
          type: "boolean",
          name: "focusVisibleOnly",
          label: "Focus Visible Only",
          defaultValue: true,
        },
      ]}
    />
  );
});
