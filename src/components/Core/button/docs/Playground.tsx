import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Button } from "../Button";
import { HiArrowRightOutline, HiCheckOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  // Wrapper component to handle dynamic props
  const ButtonWrapper = component$((props: any) => {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        type={props.type}
        disabled={props.disabled}
        loading={props.loading}
        fullWidth={props.fullWidth}
        responsive={props.responsive}
        ripple={props.ripple}
        iconSize={props.iconSize}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        class={props.customClass}
      >
        {props.leftIcon && (
          <span q:slot="leftIcon">
            <HiCheckOutline />
          </span>
        )}
        {props.label || "Button"}
        {props.rightIcon && (
          <span q:slot="rightIcon">
            <HiArrowRightOutline />
          </span>
        )}
      </Button>
    );
  });

  return (
    <PlaygroundTemplate
      component={ButtonWrapper}
      properties={[
        {
          type: "select",
          name: "variant",
          label: "Variant",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
            { label: "Success", value: "success" },
            { label: "Error", value: "error" },
            { label: "Warning", value: "warning" },
            { label: "Info", value: "info" },
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
          type: "select",
          name: "type",
          label: "Type",
          defaultValue: "button",
          options: [
            { label: "Button", value: "button" },
            { label: "Submit", value: "submit" },
            { label: "Reset", value: "reset" },
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
          name: "loading",
          label: "Loading",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "leftIcon",
          label: "Left Icon",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "rightIcon",
          label: "Right Icon",
          defaultValue: false,
        },
        {
          type: "text",
          name: "label",
          label: "Button Text",
          defaultValue: "Button",
        },
        {
          type: "boolean",
          name: "fullWidth",
          label: "Full Width",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "responsive",
          label: "Responsive (Full Width on Mobile)",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "ripple",
          label: "Ripple Effect",
          defaultValue: true,
        },
        {
          type: "select",
          name: "iconSize",
          label: "Icon Size",
          defaultValue: "auto",
          options: [
            { label: "Auto", value: "auto" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        {
          type: "text",
          name: "customClass",
          label: "Custom Class",
          defaultValue: "",
        },
      ]}
    />
  );
});
