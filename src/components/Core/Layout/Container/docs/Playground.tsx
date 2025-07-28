import { component$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Container } from "../";

/**
 * Container component playground using the standard template
 */
export default component$(() => {
  // Define the ContainerDemo component that will be controlled by the playground
  const ContainerDemo = component$<{
    maxWidth: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "fluid";
    paddingX: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    paddingY: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    centered: boolean;
    fixedWidth: boolean;
    showBorder: boolean;
    showBackground: boolean;
  }>((props) => {
    const {
      maxWidth,
      paddingX,
      paddingY,
      centered,
      fixedWidth,
      showBorder,
      showBackground,
    } = props;

    return (
      <div class="flex min-h-[400px] w-full items-center justify-center bg-gray-100 p-4 dark:bg-gray-800">
        <Container
          maxWidth={maxWidth}
          paddingX={paddingX}
          paddingY={paddingY}
          centered={centered}
          fixedWidth={fixedWidth}
          class={`${showBackground ? "bg-white dark:bg-gray-700" : ""} ${showBorder ? "border border-gray-300 dark:border-gray-600" : ""} ${showBackground || showBorder ? "rounded-md" : ""}`}
        >
          <div class="flex min-h-[100px] w-full flex-col items-center justify-center">
            <div class="text-center">
              <p class="text-md font-medium">Container</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                maxWidth: {maxWidth}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                paddingX: {paddingX} | paddingY: {paddingY}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {centered ? "Centered" : "Not Centered"} |{" "}
                {fixedWidth ? "Fixed Width" : "Responsive"}
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "maxWidth",
      label: "Max Width",
      options: [
        { label: "Extra Small (xs)", value: "xs" },
        { label: "Small (sm)", value: "sm" },
        { label: "Medium (md)", value: "md" },
        { label: "Large (lg)", value: "lg" },
        { label: "Extra Large (xl)", value: "xl" },
        { label: "2x Extra Large (2xl)", value: "2xl" },
        { label: "Full Width (full)", value: "full" },
        { label: "Fluid (fluid)", value: "fluid" },
      ],
      defaultValue: "lg",
    },
    {
      type: "select",
      name: "paddingX",
      label: "Horizontal Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small (xs)", value: "xs" },
        { label: "Small (sm)", value: "sm" },
        { label: "Medium (md)", value: "md" },
        { label: "Large (lg)", value: "lg" },
        { label: "Extra Large (xl)", value: "xl" },
      ],
      defaultValue: "md",
    },
    {
      type: "select",
      name: "paddingY",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small (xs)", value: "xs" },
        { label: "Small (sm)", value: "sm" },
        { label: "Medium (md)", value: "md" },
        { label: "Large (lg)", value: "lg" },
        { label: "Extra Large (xl)", value: "xl" },
      ],
      defaultValue: "none",
    },
    {
      type: "boolean",
      name: "centered",
      label: "Centered",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "fixedWidth",
      label: "Fixed Width",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showBorder",
      label: "Show Border",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showBackground",
      label: "Show Background",
      defaultValue: true,
    },
  ];

  return (
    <PlaygroundTemplate component={ContainerDemo} properties={properties} />
  );
});
