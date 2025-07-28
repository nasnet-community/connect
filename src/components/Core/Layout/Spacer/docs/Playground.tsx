import { component$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates/PlaygroundTemplate";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerPlayground = component$(() => {
  // Define the Spacer component that will be rendered in the playground
  const SpacerPreview = component$((props: any) => {
    const {
      size,
      isFlexible,
      horizontal,
      hideOnMobile,
      showBoxes = true,
    } = props;

    if (horizontal) {
      return (
        <div class="flex flex-wrap items-center">
          {showBoxes && (
            <Box
              padding="md"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Left Box
            </Box>
          )}
          <Spacer
            horizontal={horizontal}
            size={size}
            isFlexible={isFlexible}
            hideOnMobile={hideOnMobile}
          />
          {showBoxes && (
            <Box
              padding="md"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Right Box
            </Box>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {showBoxes && (
            <Box
              padding="md"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Box Above
            </Box>
          )}
          <Spacer
            size={size}
            isFlexible={isFlexible}
            hideOnMobile={hideOnMobile}
          />
          {showBoxes && (
            <Box
              padding="md"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Box Below
            </Box>
          )}
        </div>
      );
    }
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "size",
      label: "Size",
      defaultValue: "md",
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small (xs)", value: "xs" },
        { label: "Small (sm)", value: "sm" },
        { label: "Medium (md)", value: "md" },
        { label: "Large (lg)", value: "lg" },
        { label: "Extra Large (xl)", value: "xl" },
        { label: "2XL", value: "2xl" },
        { label: "3XL", value: "3xl" },
        { label: "4XL", value: "4xl" },
      ],
    },
    {
      type: "boolean",
      name: "horizontal",
      label: "Horizontal",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "isFlexible",
      label: "Flexible Spacing",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "hideOnMobile",
      label: "Hide on Mobile",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showBoxes",
      label: "Show Boxes",
      defaultValue: true,
    },
  ];

  return (
    <PlaygroundTemplate component={SpacerPreview} properties={properties} />
  );
});

export default SpacerPlayground;
