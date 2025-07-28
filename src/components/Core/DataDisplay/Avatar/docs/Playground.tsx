import { component$, useSignal, $ } from "@builder.io/qwik";
import { Avatar } from "~/components/Core/DataDisplay/Avatar";
import { Card } from "~/components/Core/Card/Card";

export default component$(() => {
  // State for playground controls
  const size = useSignal<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("md");
  const shape = useSignal<"circle" | "square" | "rounded">("circle");
  const variant = useSignal<"image" | "initials" | "icon">("image");
  const color = useSignal<
    "primary" | "secondary" | "success" | "warning" | "error" | "info" | "gray"
  >("primary");
  const initials = useSignal("JD");
  const status = useSignal<"online" | "offline" | "away" | "busy" | "none">(
    "none",
  );
  const statusPosition = useSignal<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("bottom-right");
  const bordered = useSignal(false);
  const clickable = useSignal(false);
  const borderColor = useSignal("border-white");
  const imageIndex = useSignal(1);

  // Control definitions for the playground
  const controls = [
    {
      type: "select",
      label: "Size",
      value: size,
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2X Large", value: "2xl" },
      ],
    },
    {
      type: "select",
      label: "Shape",
      value: shape,
      options: [
        { label: "Circle", value: "circle" },
        { label: "Square", value: "square" },
        { label: "Rounded", value: "rounded" },
      ],
    },
    {
      type: "select",
      label: "Variant",
      value: variant,
      options: [
        { label: "Image", value: "image" },
        { label: "Initials", value: "initials" },
        { label: "Icon", value: "icon" },
      ],
    },
    {
      type: "text",
      label: "Initials",
      value: initials,
      disabled: () => variant.value !== "initials",
    },
    {
      type: "select",
      label: "Color",
      value: color,
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
        { label: "Info", value: "info" },
        { label: "Gray", value: "gray" },
      ],
      disabled: () => variant.value === "image",
    },
    {
      type: "select",
      label: "Status",
      value: status,
      options: [
        { label: "None", value: "none" },
        { label: "Online", value: "online" },
        { label: "Offline", value: "offline" },
        { label: "Away", value: "away" },
        { label: "Busy", value: "busy" },
      ],
    },
    {
      type: "select",
      label: "Status Position",
      value: statusPosition,
      options: [
        { label: "Top Right", value: "top-right" },
        { label: "Top Left", value: "top-left" },
        { label: "Bottom Right", value: "bottom-right" },
        { label: "Bottom Left", value: "bottom-left" },
      ],
      disabled: () => status.value === "none",
    },
    {
      type: "boolean",
      label: "Bordered",
      value: bordered,
    },
    {
      type: "boolean",
      label: "Clickable",
      value: clickable,
    },
    {
      type: "select",
      label: "Border Color",
      value: borderColor,
      options: [
        { label: "White", value: "border-white" },
        { label: "Gray", value: "border-gray-200" },
        { label: "Primary", value: "border-blue-500" },
        { label: "Success", value: "border-green-500" },
        { label: "Warning", value: "border-yellow-500" },
        { label: "Error", value: "border-red-500" },
      ],
      disabled: () => !bordered.value,
    },
    {
      type: "number",
      label: "Image Index",
      value: imageIndex,
      min: 1,
      max: 70,
      disabled: () => variant.value !== "image",
    },
  ];

  // Generate code snippet based on current prop values
  const getCodeSnippet = () => {
    let code = "<Avatar\n";

    if (size.value !== "md") {
      code += `  size="${size.value}"\n`;
    }

    if (shape.value !== "circle") {
      code += `  shape="${shape.value}"\n`;
    }

    if (status.value !== "none") {
      code += `  status="${status.value}"\n`;

      if (statusPosition.value !== "bottom-right") {
        code += `  statusPosition="${statusPosition.value}"\n`;
      }
    }

    if (bordered.value) {
      code += "  bordered={true}\n";

      if (borderColor.value !== "border-white") {
        code += `  borderColor="${borderColor.value}"\n`;
      }
    }

    if (clickable.value) {
      code += "  clickable={true}\n";
      code += '  onClick$={() => console.log("Avatar clicked")}\n';
    }

    // Close opening tag
    code += ">";

    // Add content based on variant
    if (variant.value === "image") {
      code += `\n  <img src="https://i.pravatar.cc/300?img=${imageIndex.value}" alt="User avatar" />\n`;
    } else if (variant.value === "initials") {
      code += `${initials.value}`;
    } else if (variant.value === "icon") {
      code += `\n  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>\n`;
    }

    // Close component
    code += "</Avatar>";

    return code;
  };

  return (
    <div class="space-y-8">
      {/* Controls */}
      <Card variant="elevated">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Controls</h3>
        </div>
        <div class="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control, index) => {
            const isDisabled = control.disabled ? control.disabled() : false;
            const valueSignal = control.value;

            return (
              <div key={index} class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {control.label}
                </label>

                {control.type === "select" && (
                  <select
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    value={String(valueSignal.value)}
                    disabled={isDisabled}
                    onChange$={(e: any) => {
                      if (!isDisabled) {
                        valueSignal.value = e.target.value;
                      }
                    }}
                  >
                    {control.options?.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {control.type === "text" && (
                  <input
                    type="text"
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    value={String(valueSignal.value)}
                    disabled={isDisabled}
                    onInput$={(e: any) => {
                      if (!isDisabled) {
                        valueSignal.value = e.target.value;
                      }
                    }}
                  />
                )}

                {control.type === "boolean" && (
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-700"
                      checked={Boolean(valueSignal.value)}
                      disabled={isDisabled}
                      onChange$={(e: any) => {
                        if (!isDisabled) {
                          valueSignal.value = e.target.checked;
                        }
                      }}
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Enable
                    </span>
                  </label>
                )}

                {control.type === "number" && (
                  <input
                    type="number"
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    value={Number(valueSignal.value)}
                    min={control.min}
                    max={control.max}
                    disabled={isDisabled}
                    onInput$={(e: any) => {
                      if (!isDisabled) {
                        valueSignal.value = Number(e.target.value);
                      }
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Preview */}
      <Card variant="elevated">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Preview</h3>
        </div>
        <div class="flex min-h-[200px] items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
          <Avatar
            size={size.value}
            shape={shape.value}
            status={status.value}
            statusPosition={statusPosition.value}
            bordered={bordered.value}
            borderColor={borderColor.value}
            clickable={clickable.value}
            color={color.value}
            variant={variant.value}
            initials={variant.value === "initials" ? initials.value : undefined}
            onClick$={
              clickable.value
                ? $(() => console.log("Avatar clicked"))
                : undefined
            }
          >
            {variant.value === "image" && (
              <img
                src={`https://i.pravatar.cc/300?img=${imageIndex.value}`}
                alt="User avatar"
              />
            )}
            {variant.value === "icon" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </Avatar>
        </div>
      </Card>

      {/* Code */}
      <Card variant="elevated">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Code</h3>
        </div>
        <div class="p-6">
          <pre class="overflow-x-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <code class="text-sm">{getCodeSnippet()}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
});
