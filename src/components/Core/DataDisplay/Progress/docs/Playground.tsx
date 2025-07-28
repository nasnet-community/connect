import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { ProgressBar, Spinner } from "../index";

export default component$(() => {
  const activeComponent = useSignal<"progressbar" | "spinner">("progressbar");

  // ProgressBar state
  const progressBarState = useStore({
    value: 65,
    min: 0,
    max: 100,
    buffer: 0,
    size: "md",
    color: "primary",
    variant: "solid",
    shape: "rounded",
    animation: "none",
    showValue: true,
    valuePosition: "right",
    indeterminate: false,
    error: false,
    fullWidth: true,
  });

  // Spinner state
  const spinnerState = useStore({
    size: "md",
    color: "primary",
    variant: "border",
    speed: 0.75,
    showLabel: false,
    label: "Loading...",
    labelPosition: "right",
    centered: false,
  });

  const progressBarCode = useSignal("");
  const spinnerCode = useSignal("");

  const generateProgressBarCode = $(() => {
    const props = [];

    props.push(`value={${progressBarState.value}}`);

    if (progressBarState.min !== 0) {
      props.push(`min={${progressBarState.min}}`);
    }

    if (progressBarState.max !== 100) {
      props.push(`max={${progressBarState.max}}`);
    }

    if (progressBarState.buffer > 0) {
      props.push(`buffer={${progressBarState.buffer}}`);
    }

    if (progressBarState.size !== "md") {
      props.push(`size="${progressBarState.size}"`);
    }

    if (progressBarState.color !== "primary") {
      props.push(`color="${progressBarState.color}"`);
    }

    if (progressBarState.variant !== "solid") {
      props.push(`variant="${progressBarState.variant}"`);
    }

    if (progressBarState.shape !== "rounded") {
      props.push(`shape="${progressBarState.shape}"`);
    }

    if (progressBarState.animation !== "none") {
      props.push(`animation="${progressBarState.animation}"`);
    }

    if (progressBarState.showValue) {
      props.push("showValue");
    }

    if (
      progressBarState.valuePosition !== "right" &&
      progressBarState.showValue
    ) {
      props.push(`valuePosition="${progressBarState.valuePosition}"`);
    }

    if (progressBarState.indeterminate) {
      props.push("indeterminate");
    }

    if (progressBarState.error) {
      props.push("error");
    }

    if (!progressBarState.fullWidth) {
      props.push("fullWidth={false}");
    }

    progressBarCode.value = `<ProgressBar ${props.join(" ")} />`;
  });

  const generateSpinnerCode = $(() => {
    const props = [];

    if (spinnerState.size !== "md") {
      props.push(`size="${spinnerState.size}"`);
    }

    if (spinnerState.color !== "primary") {
      props.push(`color="${spinnerState.color}"`);
    }

    if (spinnerState.variant !== "border") {
      props.push(`variant="${spinnerState.variant}"`);
    }

    if (spinnerState.speed !== 0.75) {
      props.push(`speed={${spinnerState.speed}}`);
    }

    if (spinnerState.showLabel) {
      props.push("showLabel");
      props.push(`label="${spinnerState.label}"`);
    }

    if (spinnerState.labelPosition !== "right" && spinnerState.showLabel) {
      props.push(`labelPosition="${spinnerState.labelPosition}"`);
    }

    if (spinnerState.centered) {
      props.push("centered");
    }

    spinnerCode.value = props.length
      ? `<Spinner ${props.join(" ")} />`
      : "<Spinner />";
  });

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: "tabs",
          options: ["progressbar", "spinner"],
          labels: ["ProgressBar", "Spinner"],
          value: activeComponent.value,
          onChange$: $((value: string) => {
            activeComponent.value = value as "progressbar" | "spinner";
          }),
        },
        ...(activeComponent.value === "progressbar"
          ? [
              {
                type: "number",
                label: "Value",
                min: progressBarState.min,
                max: progressBarState.max,
                value: progressBarState.value,
                disabled: progressBarState.indeterminate,
                onChange$: $((value: number) => {
                  progressBarState.value = value;
                  generateProgressBarCode();
                }),
              },
              {
                type: "number",
                label: "Buffer",
                min: 0,
                max: 100,
                value: progressBarState.buffer,
                disabled: progressBarState.indeterminate,
                onChange$: $((value: number) => {
                  progressBarState.buffer = value;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Size",
                options: ["xs", "sm", "md", "lg"],
                value: progressBarState.size,
                onChange$: $((value: string) => {
                  progressBarState.size = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Color",
                options: [
                  "primary",
                  "secondary",
                  "success",
                  "warning",
                  "error",
                  "info",
                ],
                value: progressBarState.color,
                onChange$: $((value: string) => {
                  progressBarState.color = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Variant",
                options: ["solid", "gradient"],
                value: progressBarState.variant,
                onChange$: $((value: string) => {
                  progressBarState.variant = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Shape",
                options: ["flat", "rounded", "pill"],
                value: progressBarState.shape,
                onChange$: $((value: string) => {
                  progressBarState.shape = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Animation",
                options: ["none", "pulse", "striped", "striped-animated"],
                value: progressBarState.animation,
                onChange$: $((value: string) => {
                  progressBarState.animation = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "boolean",
                label: "Show Value",
                value: progressBarState.showValue,
                onChange$: $((value: boolean) => {
                  progressBarState.showValue = value;
                  generateProgressBarCode();
                }),
              },
              {
                type: "select",
                label: "Value Position",
                options: ["right", "center", "inside"],
                value: progressBarState.valuePosition,
                disabled: !progressBarState.showValue,
                onChange$: $((value: string) => {
                  progressBarState.valuePosition = value as any;
                  generateProgressBarCode();
                }),
              },
              {
                type: "boolean",
                label: "Indeterminate",
                value: progressBarState.indeterminate,
                onChange$: $((value: boolean) => {
                  progressBarState.indeterminate = value;
                  generateProgressBarCode();
                }),
              },
              {
                type: "boolean",
                label: "Error",
                value: progressBarState.error,
                onChange$: $((value: boolean) => {
                  progressBarState.error = value;
                  generateProgressBarCode();
                }),
              },
              {
                type: "boolean",
                label: "Full Width",
                value: progressBarState.fullWidth,
                onChange$: $((value: boolean) => {
                  progressBarState.fullWidth = value;
                  generateProgressBarCode();
                }),
              },
            ]
          : [
              {
                type: "select",
                label: "Size",
                options: ["xs", "sm", "md", "lg", "xl"],
                value: spinnerState.size,
                onChange$: $((value: string) => {
                  spinnerState.size = value as any;
                  generateSpinnerCode();
                }),
              },
              {
                type: "select",
                label: "Color",
                options: [
                  "primary",
                  "secondary",
                  "success",
                  "warning",
                  "error",
                  "info",
                  "white",
                ],
                value: spinnerState.color,
                onChange$: $((value: string) => {
                  spinnerState.color = value as any;
                  generateSpinnerCode();
                }),
              },
              {
                type: "select",
                label: "Variant",
                options: ["border", "grow", "dots", "bars", "circle"],
                value: spinnerState.variant,
                onChange$: $((value: string) => {
                  spinnerState.variant = value as any;
                  generateSpinnerCode();
                }),
              },
              {
                type: "number",
                label: "Speed",
                min: 0.1,
                max: 3,
                step: 0.1,
                value: spinnerState.speed,
                onChange$: $((value: number) => {
                  spinnerState.speed = value;
                  generateSpinnerCode();
                }),
              },
              {
                type: "boolean",
                label: "Show Label",
                value: spinnerState.showLabel,
                onChange$: $((value: boolean) => {
                  spinnerState.showLabel = value;
                  generateSpinnerCode();
                }),
              },
              {
                type: "text",
                label: "Label",
                value: spinnerState.label,
                disabled: !spinnerState.showLabel,
                onChange$: $((value: string) => {
                  spinnerState.label = value;
                  generateSpinnerCode();
                }),
              },
              {
                type: "select",
                label: "Label Position",
                options: ["top", "right", "bottom", "left"],
                value: spinnerState.labelPosition,
                disabled: !spinnerState.showLabel,
                onChange$: $((value: string) => {
                  spinnerState.labelPosition = value as any;
                  generateSpinnerCode();
                }),
              },
              {
                type: "boolean",
                label: "Centered",
                value: spinnerState.centered,
                onChange$: $((value: boolean) => {
                  spinnerState.centered = value;
                  generateSpinnerCode();
                }),
              },
            ]),
      ]}
      preview={
        <div class="flex min-h-[150px] items-center justify-center p-4">
          {activeComponent.value === "progressbar" ? (
            <div class="w-full max-w-lg">
              <ProgressBar
                value={progressBarState.value}
                min={progressBarState.min}
                max={progressBarState.max}
                buffer={progressBarState.buffer}
                size={progressBarState.size as any}
                color={progressBarState.color as any}
                variant={progressBarState.variant as any}
                shape={progressBarState.shape as any}
                animation={progressBarState.animation as any}
                showValue={progressBarState.showValue}
                valuePosition={progressBarState.valuePosition as any}
                indeterminate={progressBarState.indeterminate}
                error={progressBarState.error}
                fullWidth={progressBarState.fullWidth}
              />
            </div>
          ) : (
            <Spinner
              size={spinnerState.size as any}
              color={spinnerState.color as any}
              variant={spinnerState.variant as any}
              speed={spinnerState.speed}
              showLabel={spinnerState.showLabel}
              label={spinnerState.label}
              labelPosition={spinnerState.labelPosition as any}
              centered={spinnerState.centered}
            />
          )}
        </div>
      }
      code={
        activeComponent.value === "progressbar" ? progressBarCode : spinnerCode
      }
      onMount$={() => {
        generateProgressBarCode();
        generateSpinnerCode();
      }}
    >
      <p>
        Use the controls above to customize the selected progress component.
        Toggle between ProgressBar and Spinner to explore the different options
        available for each component. The code will update automatically based
        on your selections, allowing you to see how different props affect the
        appearance and behavior of the components.
      </p>
    </PlaygroundTemplate>
  );
});
