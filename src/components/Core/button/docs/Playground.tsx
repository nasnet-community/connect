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
        radius={props.radius}
        shadow={props.shadow}
        pulse={props.pulse}
        gradientDirection={props.gradientDirection}
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
            { label: "CTA", value: "cta" },
            { label: "Gradient", value: "gradient" },
            { label: "Glow", value: "glow" },
            { label: "Glass", value: "glass" },
            { label: "Motion", value: "motion" },
            { label: "Premium", value: "premium" },
          ],
        },
        {
          type: "select",
          name: "size",
          label: "Size",
          defaultValue: "md",
          options: [
            { label: "Extra Small", value: "xs" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
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
            { label: "Extra Small", value: "xs" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        {
          type: "select",
          name: "radius",
          label: "Border Radius",
          defaultValue: "md",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Full", value: "full" },
          ],
        },
        {
          type: "boolean",
          name: "shadow",
          label: "Shadow",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "pulse",
          label: "Pulse Animation",
          defaultValue: false,
        },
        {
          type: "select",
          name: "gradientDirection",
          label: "Gradient Direction (for gradient variant)",
          defaultValue: "to-r",
          options: [
            { label: "To Right", value: "to-r" },
            { label: "To Left", value: "to-l" },
            { label: "To Top", value: "to-t" },
            { label: "To Bottom", value: "to-b" },
            { label: "To Bottom Right", value: "to-br" },
            { label: "To Bottom Left", value: "to-bl" },
            { label: "To Top Right", value: "to-tr" },
            { label: "To Top Left", value: "to-tl" },
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
