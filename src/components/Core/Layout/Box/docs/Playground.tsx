import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import Box from "../Box";

export default component$(() => {
  const paddingOptions = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
  const borderRadiusOptions = ["none", "xs", "sm", "md", "lg", "xl", "full"];
  const borderWidthOptions = ["none", "thin", "normal", "thick"];
  const borderStyleOptions = ["solid", "dashed", "dotted", "double", "none"];
  const borderColorOptions = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "muted",
  ];
  const backgroundColorOptions = [
    "transparent",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "muted",
    "surface",
    "surface-alt",
  ];
  const shadowOptions = ["none", "sm", "md", "lg", "xl", "2xl", "inner"];
  const htmlElementOptions = [
    "div",
    "section",
    "article",
    "aside",
    "main",
    "header",
    "footer",
  ];

  const state = useStore({
    as: "div",
    padding: "md",
    margin: "none",
    borderRadius: "md",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "primary",
    backgroundColor: "surface",
    shadow: "md",
    fullWidth: false,
    fullHeight: false,
    content: "Box component with configurable properties",
  });

  const code = useSignal("");

  const generateCode = $(() => {
    const props = [];

    if (state.as !== "div") {
      props.push(`as="${state.as}"`);
    }

    if (state.padding !== "none") {
      props.push(`padding="${state.padding}"`);
    }

    if (state.margin !== "none") {
      props.push(`margin="${state.margin}"`);
    }

    if (state.borderRadius !== "none") {
      props.push(`borderRadius="${state.borderRadius}"`);
    }

    if (state.borderWidth !== "none") {
      props.push(`borderWidth="${state.borderWidth}"`);
      props.push(`borderStyle="${state.borderStyle}"`);
      props.push(`borderColor="${state.borderColor}"`);
    }

    if (state.backgroundColor !== "transparent") {
      props.push(`backgroundColor="${state.backgroundColor}"`);
    }

    if (state.shadow !== "none") {
      props.push(`shadow="${state.shadow}"`);
    }

    if (state.fullWidth) {
      props.push("fullWidth={true}");
    }

    if (state.fullHeight) {
      props.push("fullHeight={true}");
    }

    const propsString = props.length > 0 ? props.join("\n  ") : "";

    const componentCode = `
import { component$ } from '@builder.io/qwik';
import Box from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <Box
      ${propsString}
    >
      ${state.content}
    </Box>
  );
});`;

    code.value = componentCode;
  });

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: "select",
          label: "HTML Element",
          options: htmlElementOptions,
          value: state.as,
          onChange$: $((value: string) => {
            state.as = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Padding",
          options: paddingOptions,
          value: state.padding,
          onChange$: $((value: string) => {
            state.padding = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Margin",
          options: paddingOptions,
          value: state.margin,
          onChange$: $((value: string) => {
            state.margin = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Border Radius",
          options: borderRadiusOptions,
          value: state.borderRadius,
          onChange$: $((value: string) => {
            state.borderRadius = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Border Width",
          options: borderWidthOptions,
          value: state.borderWidth,
          onChange$: $((value: string) => {
            state.borderWidth = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Border Style",
          options: borderStyleOptions,
          value: state.borderStyle,
          disabled: state.borderWidth === "none",
          onChange$: $((value: string) => {
            state.borderStyle = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Border Color",
          options: borderColorOptions,
          value: state.borderColor,
          disabled: state.borderWidth === "none",
          onChange$: $((value: string) => {
            state.borderColor = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Background Color",
          options: backgroundColorOptions,
          value: state.backgroundColor,
          onChange$: $((value: string) => {
            state.backgroundColor = value;
            generateCode();
          }),
        },
        {
          type: "select",
          label: "Shadow",
          options: shadowOptions,
          value: state.shadow,
          onChange$: $((value: string) => {
            state.shadow = value;
            generateCode();
          }),
        },
        {
          type: "boolean",
          label: "Full Width",
          value: state.fullWidth,
          onChange$: $((value: boolean) => {
            state.fullWidth = value;
            generateCode();
          }),
        },
        {
          type: "boolean",
          label: "Full Height",
          value: state.fullHeight,
          onChange$: $((value: boolean) => {
            state.fullHeight = value;
            generateCode();
          }),
        },
        {
          type: "text",
          label: "Content",
          value: state.content,
          onChange$: $((value: string) => {
            state.content = value;
            generateCode();
          }),
        },
      ]}
      preview={
        <div class="flex justify-center p-6">
          <Box
            as={state.as as any}
            padding={state.padding as any}
            margin={state.margin as any}
            borderRadius={state.borderRadius as any}
            borderWidth={state.borderWidth as any}
            borderStyle={state.borderStyle as any}
            borderColor={state.borderColor as any}
            backgroundColor={state.backgroundColor as any}
            shadow={state.shadow as any}
            fullWidth={state.fullWidth}
            fullHeight={state.fullHeight}
            style={{ minHeight: state.fullHeight ? "200px" : undefined }}
          >
            {state.content}
          </Box>
        </div>
      }
      code={code}
      onMount$={generateCode}
    >
      <p>
        Use the controls to customize the Box component. This playground lets
        you experiment with different spacing, borders, backgrounds, shadows,
        and other properties to see how the Box component can be configured for
        your specific use case.
      </p>
    </PlaygroundTemplate>
  );
});
