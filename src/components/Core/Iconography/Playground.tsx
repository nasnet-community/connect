import { component$, useSignal, $ } from "@builder.io/qwik";
import Icon from "./Icon";
import type { IconSize, IconColor } from "./Icon.types";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  StarIcon,
  HeartIcon,
  SearchIcon,
  BellIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
  EmailIcon,
} from "./icons";

/**
 * Playground component for the Icon system.
 * 
 * This component provides an interactive playground where users can experiment
 * with different icon configurations in real-time to understand the component's
 * capabilities and see immediate visual feedback.
 */
export const Playground = component$(() => {
  // State for icon configuration
  const selectedIcon = useSignal("HomeIcon");
  const selectedSize = useSignal<IconSize>("md");
  const selectedColor = useSignal<IconColor>("current");
  const isResponsive = useSignal(false);
  const isInteractive = useSignal(false);
  const isFixedWidth = useSignal(false);
  const labelText = useSignal("");
  const customClass = useSignal("");

  // Available icons for selection
  const availableIcons = [
    { name: "HomeIcon", icon: HomeIcon, label: "Home" },
    { name: "SettingsIcon", icon: SettingsIcon, label: "Settings" },
    { name: "UserIcon", icon: UserIcon, label: "User" },
    { name: "CheckCircleIcon", icon: CheckCircleIcon, label: "Check Circle" },
    { name: "XCircleIcon", icon: XCircleIcon, label: "X Circle" },
    { name: "InfoIcon", icon: InfoIcon, label: "Info" },
    { name: "StarIcon", icon: StarIcon, label: "Star" },
    { name: "HeartIcon", icon: HeartIcon, label: "Heart" },
    { name: "SearchIcon", icon: SearchIcon, label: "Search" },
    { name: "BellIcon", icon: BellIcon, label: "Bell" },
    { name: "TrashIcon", icon: TrashIcon, label: "Trash" },
    { name: "EditIcon", icon: EditIcon, label: "Edit" },
    { name: "PlusIcon", icon: PlusIcon, label: "Plus" },
    { name: "EmailIcon", icon: EmailIcon, label: "Email" },
  ];

  const sizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
  const colors: IconColor[] = [
    "current",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "muted",
    "on-surface",
    "on-surface-variant",
    "inverse",
  ];

  // Get the selected icon component
  const getSelectedIconComponent = () => {
    const iconData = availableIcons.find((icon) => icon.name === selectedIcon.value);
    return iconData?.icon || HomeIcon;
  };

  // Generate the code string
  const generateCode = $(() => {
    const props = [];
    props.push(`icon={${selectedIcon.value}}`);
    
    if (selectedSize.value !== "md") {
      props.push(`size="${selectedSize.value}"`);
    }
    
    if (selectedColor.value !== "current") {
      props.push(`color="${selectedColor.value}"`);
    }
    
    if (isResponsive.value) {
      props.push("responsive");
    }
    
    if (isInteractive.value) {
      props.push("interactive");
    }
    
    if (isFixedWidth.value) {
      props.push("fixedWidth");
    }
    
    if (labelText.value) {
      props.push(`label="${labelText.value}"`);
    }
    
    if (customClass.value) {
      props.push(`class="${customClass.value}"`);
    }

    return `<Icon ${props.join(" ")} />`;
  });

  return (
    <div class="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Icon Component Playground
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Experiment with different icon configurations and see the results in real-time. 
          Perfect for exploring the component's capabilities and testing your designs.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Configuration
            </h2>

            {/* Icon Selection */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Icon
              </label>
              <select
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedIcon.value}
                onChange$={(e) => {
                  selectedIcon.value = (e.target as HTMLSelectElement).value;
                }}
              >
                {availableIcons.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Selection */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Size
              </label>
              <div class="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    class={`px-3 py-2 text-sm rounded border ${
                      selectedSize.value === size
                        ? "bg-primary-600 text-white border-primary-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick$={() => {
                      selectedSize.value = size;
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Color
              </label>
              <select
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedColor.value}
                onChange$={(e) => {
                  selectedColor.value = (e.target as HTMLSelectElement).value as IconColor;
                }}
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Boolean Options */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Options
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300 dark:border-gray-600"
                    checked={isResponsive.value}
                    onChange$={(e) => {
                      isResponsive.value = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Responsive
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300 dark:border-gray-600"
                    checked={isInteractive.value}
                    onChange$={(e) => {
                      isInteractive.value = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Interactive
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300 dark:border-gray-600"
                    checked={isFixedWidth.value}
                    onChange$={(e) => {
                      isFixedWidth.value = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Fixed Width
                  </span>
                </label>
              </div>
            </div>

            {/* Label Input */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Label (for accessibility)
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter label..."
                value={labelText.value}
                onInput$={(e) => {
                  labelText.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            {/* Custom Class Input */}
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Custom Classes
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., border rounded p-1"
                value={customClass.value}
                onInput$={(e) => {
                  customClass.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div class="lg:col-span-2 space-y-6">
          {/* Live Preview */}
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Live Preview
            </h2>
            
            <div class="flex items-center justify-center min-h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
              <Icon
                icon={getSelectedIconComponent()}
                size={selectedSize.value}
                color={selectedColor.value}
                responsive={isResponsive.value}
                interactive={isInteractive.value}
                fixedWidth={isFixedWidth.value}
                label={labelText.value || undefined}
                class={customClass.value || undefined}
              />
            </div>
            
            <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Try hovering and clicking the icon above (if interactive is enabled)
            </div>
          </div>

          {/* Generated Code */}
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Generated Code
              </h2>
              <button
                class="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                onClick$={async () => {
                  const code = await generateCode();
                  navigator.clipboard.writeText(code);
                }}
              >
                Copy
              </button>
            </div>
            
            <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              {generateCode()}
            </div>
          </div>

          {/* Import Statement */}
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">
              Don't Forget to Import
            </h3>
            <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              {`import { Icon, ${selectedIcon.value} } from "~/components/Core/Iconography";`}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Quick Start Examples
        </h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center space-y-3">
            <h3 class="font-medium text-gray-900 dark:text-gray-100">
              Basic Icon
            </h3>
            <div class="flex justify-center">
              <Icon icon={HomeIcon} />
            </div>
            <div class="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded border">
              {`<Icon icon={HomeIcon} />`}
            </div>
          </div>
          
          <div class="text-center space-y-3">
            <h3 class="font-medium text-gray-900 dark:text-gray-100">
              Colored & Sized
            </h3>
            <div class="flex justify-center">
              <Icon icon={CheckCircleIcon} size="xl" color="success" />
            </div>
            <div class="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded border">
              {`<Icon icon={CheckCircleIcon} size="xl" color="success" />`}
            </div>
          </div>
          
          <div class="text-center space-y-3">
            <h3 class="font-medium text-gray-900 dark:text-gray-100">
              Interactive
            </h3>
            <div class="flex justify-center">
              <Icon icon={HeartIcon} size="lg" color="error" interactive label="Like" />
            </div>
            <div class="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded border">
              {`<Icon icon={HeartIcon} interactive label="Like" />`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Playground;