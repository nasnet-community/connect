import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Tooltip } from "../index";
import { Button } from "~/components/Core/button";

const PlaygroundTooltip = component$<any>((props: any) => {
  const triggerMap: any = {
    hover: "hover",
    click: "click",
    focus: "focus",
    hover_focus: ["hover", "focus"],
  };

  return (
    <div class="flex items-center justify-center p-12">
      <Tooltip
        content={props.content || "This is a customizable tooltip"}
        placement={props.placement || "top"}
        color={props.color || "default"}
        size={props.size || "md"}
        offset={props.offset || 8}
        delay={props.delay || 0}
        trigger={triggerMap[props.trigger] || "hover"}
        interactive={props.interactive || false}
        maxWidth={props.maxWidth || "200px"}
      >
        <Button variant="outline">
          {props.trigger === "hover"
            ? "Hover Me"
            : props.trigger === "click"
              ? "Click Me"
              : props.trigger === "focus"
                ? "Focus Me (Tab)"
                : "Hover or Focus Me"}
        </Button>
      </Tooltip>
    </div>
  );
});

export default component$(() => {
  return (
    <PlaygroundTemplate
      component={PlaygroundTooltip}
      properties={[
        {
          type: "text",
          name: "content",
          label: "Content",
          defaultValue: "This is a customizable tooltip",
        },
        {
          type: "select",
          name: "placement",
          label: "Placement",
          options: [
            { label: "Top", value: "top" },
            { label: "Top Start", value: "top-start" },
            { label: "Top End", value: "top-end" },
            { label: "Right", value: "right" },
            { label: "Right Start", value: "right-start" },
            { label: "Right End", value: "right-end" },
            { label: "Bottom", value: "bottom" },
            { label: "Bottom Start", value: "bottom-start" },
            { label: "Bottom End", value: "bottom-end" },
            { label: "Left", value: "left" },
            { label: "Left Start", value: "left-start" },
            { label: "Left End", value: "left-end" },
          ],
          defaultValue: "top",
        },
        {
          type: "select",
          name: "color",
          label: "Color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
            { label: "Info", value: "info" },
          ],
          defaultValue: "default",
        },
        {
          type: "select",
          name: "size",
          label: "Size",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
          defaultValue: "md",
        },
        {
          type: "number",
          name: "offset",
          label: "Offset",
          defaultValue: 8,
        },
        {
          type: "number",
          name: "delay",
          label: "Delay (ms)",
          defaultValue: 0,
        },
        {
          type: "select",
          name: "trigger",
          label: "Trigger",
          options: [
            { label: "Hover", value: "hover" },
            { label: "Click", value: "click" },
            { label: "Focus", value: "focus" },
            { label: "Hover & Focus", value: "hover_focus" },
          ],
          defaultValue: "hover",
        },
        {
          type: "boolean",
          name: "interactive",
          label: "Interactive",
          defaultValue: false,
        },
        {
          type: "text",
          name: "maxWidth",
          label: "Max Width",
          defaultValue: "200px",
        },
      ]}
    />
  );
});
