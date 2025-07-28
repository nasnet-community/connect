import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates/PlaygroundTemplate";
import { Skeleton } from "../Skeleton";

// Define the wrapper component
const SkeletonWrapper = component$<any>((props) => {
  return (
    <div class="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      {/* Basic skeleton with props */}
      <Skeleton
        variant={props.variant}
        animation={props.animation}
        width={props.width}
        height={props.height}
        class={props.customClass}
      />
      
      {/* Additional examples based on variant */}
      {props.variant === 'text' && props.showMultiple && (
        <div class="space-y-2">
          <Skeleton variant="text" animation={props.animation} width="100%" />
          <Skeleton variant="text" animation={props.animation} width="90%" />
          <Skeleton variant="text" animation={props.animation} width="80%" />
        </div>
      )}
      
      {props.variant === 'circular' && props.showMultiple && (
        <div class="flex gap-3">
          <Skeleton variant="circular" animation={props.animation} width={40} height={40} />
          <Skeleton variant="circular" animation={props.animation} width={60} height={60} />
          <Skeleton variant="circular" animation={props.animation} width={80} height={80} />
        </div>
      )}
      
      {/* Example card layout */}
      {props.showCardExample && (
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
          <Skeleton variant="rectangular" animation={props.animation} width="100%" height={200} />
          <div class="flex items-center gap-3">
            <Skeleton variant="circular" animation={props.animation} width={40} height={40} />
            <div class="flex-1 space-y-2">
              <Skeleton variant="text" animation={props.animation} width="50%" />
              <Skeleton variant="text" animation={props.animation} width="30%" />
            </div>
          </div>
          <Skeleton variant="text" animation={props.animation} width="100%" />
          <Skeleton variant="text" animation={props.animation} width="100%" />
          <Skeleton variant="text" animation={props.animation} width="70%" />
        </div>
      )}
    </div>
  );
});

export default component$(() => {
  const properties = [
    {
      name: "variant",
      label: "Variant",
      type: "select" as const,
      defaultValue: "text",
      options: [
        { label: "Text", value: "text" },
        { label: "Circular", value: "circular" },
        { label: "Rectangular", value: "rectangular" },
        { label: "Rounded", value: "rounded" },
      ],
    },
    {
      name: "animation",
      label: "Animation",
      type: "select" as const,
      defaultValue: "pulse",
      options: [
        { label: "Pulse", value: "pulse" },
        { label: "Wave", value: "wave" },
        { label: "Shimmer", value: "shimmer" },
        { label: "None", value: "none" },
      ],
    },
    {
      name: "width",
      label: "Width",
      type: "text" as const,
      defaultValue: "100%",
      placeholder: "e.g., 100%, 200px, 50%",
    },
    {
      name: "height",
      label: "Height",
      type: "text" as const,
      defaultValue: "20px",
      placeholder: "e.g., 20px, 2rem, auto",
    },
    {
      name: "rounded",
      label: "Rounded Corners",
      type: "boolean" as const,
      defaultValue: false,
    },
    {
      name: "showMultiple",
      label: "Show Multiple",
      type: "boolean" as const,
      defaultValue: false,
      description: "Show multiple skeletons of the same variant",
    },
    {
      name: "showCardExample",
      label: "Show Card Example",
      type: "boolean" as const,
      defaultValue: false,
      description: "Show a complex card skeleton layout",
    },
    {
      name: "customClass",
      label: "Custom Classes",
      type: "text" as const,
      defaultValue: "",
      placeholder: "e.g., bg-blue-200 dark:bg-blue-800",
    },
  ];

  return (
    <PlaygroundTemplate component={SkeletonWrapper} properties={properties} />
  );
});