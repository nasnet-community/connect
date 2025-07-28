import { component$, useSignal, useStore, $, type QRL } from "@builder.io/qwik";
import {
  HiCodeBracketOutline,
  HiXMarkOutline,
  HiClipboardDocumentOutline,
  HiCheckOutline,
  HiArrowDownTrayMini,
  HiCogOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import type { ShowcaseTheme, DeviceSize, CodeGeneratorConfig } from "../types";

interface CodeGeneratorProps {
  theme: ShowcaseTheme;
  device: DeviceSize;
  onClose: QRL<() => void>;
}

export const CodeGenerator = component$<CodeGeneratorProps>(
  ({ theme, device, onClose }) => {
    const activeTab = useSignal<"component" | "theme" | "utils">("component");
    const copied = useSignal(false);
    
    const config = useStore<CodeGeneratorConfig>({
      component: "Alert",
      variant: "solid",
      size: "md",
      props: {},
      theme,
      responsive: true,
      mobile: device === "mobile",
    });

    const generateComponentCode = $(() => {
      const { component, variant, size, responsive, mobile } = config;
      
      const imports = `import { ${component} } from "~/components/Core/Feedback";`;
      
      const props = [
        variant !== "solid" && `variant="${variant}"`,
        size !== "md" && `size="${size}"`,
        responsive && `responsive`,
        mobile && `mobile`,
      ].filter(Boolean).join(" ");
      
      const componentCode = `<${component}${props ? ` ${props}` : ""}>
  Your ${component.toLowerCase()} content here
</${component}>`;

      return `${imports}\n\n${componentCode}`;
    });

    const generateThemeCode = $(() => {
      return `// Custom theme configuration
const customTheme = {
  mode: "${theme.mode}",
  primaryColor: "${theme.primaryColor}",
  accentColor: "${theme.accentColor}",
  backgroundColor: "${theme.backgroundColor}",
  surfaceColor: "${theme.surfaceColor}",
  textColor: "${theme.textColor}",
  borderColor: "${theme.borderColor}",
};

// Apply theme using CSS variables
useVisibleTask$(() => {
  const root = document.documentElement;
  root.style.setProperty("--primary", customTheme.primaryColor);
  root.style.setProperty("--accent", customTheme.accentColor);
  root.style.setProperty("--background", customTheme.backgroundColor);
  root.style.setProperty("--surface", customTheme.surfaceColor);
  root.style.setProperty("--text", customTheme.textColor);
  root.style.setProperty("--border", customTheme.borderColor);
});`;
    });

    const generateUtilsCode = $(() => {
      return `// Responsive utilities for ${device} device
import { cn, getResponsiveSizeClasses, getTouchTargetClasses } from "~/components/Core/Feedback/utils/theme";

// Device-specific classes
const deviceClasses = {
  mobile: "w-full max-w-sm",
  tablet: "w-full max-w-2xl", 
  desktop: "w-full max-w-4xl",
};

// Touch-friendly sizing
const touchClasses = getTouchTargetClasses("${config.size}");

// Responsive component sizing
const responsiveClasses = getResponsiveSizeClasses("${config.size}", "${config.component.toLowerCase()}");

// Combined classes
const componentClasses = cn(
  deviceClasses.${device},
  touchClasses,
  responsiveClasses,
  // Your custom classes here
);`;
    });

    const copyToClipboard = $(async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    });

    const downloadCode = $((filename: string, content: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });

    const getCode = $(() => {
      switch (activeTab.value) {
        case "component":
          return generateComponentCode();
        case "theme":
          return generateThemeCode();
        case "utils":
          return generateUtilsCode();
        default:
          return "";
      }
    });

    return (
      <div class="fixed inset-4 z-50 flex items-center justify-center">
        <div class="w-full max-w-4xl max-h-full flex flex-col">
          <Card class="flex-1 flex flex-col">
            <div class="flex items-center justify-between border-b border-[var(--showcase-border)] p-4">
              <div class="flex items-center space-x-2">
                <HiCodeBracketOutline class="h-5 w-5 text-[var(--showcase-primary)]" />
                <h3 class="text-lg font-semibold text-[var(--showcase-text)]">
                  Code Generator
                </h3>
              </div>
              <button
                onClick$={onClose}
                class="rounded p-1 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
              >
                <HiXMarkOutline class="h-5 w-5" />
              </button>
            </div>

            <div class="flex flex-1 overflow-hidden">
              {/* Configuration Panel */}
              <div class="w-80 border-r border-[var(--showcase-border)] p-4 overflow-y-auto">
                <h4 class="mb-4 flex items-center text-sm font-medium text-[var(--showcase-text)]">
                  <HiCogOutline class="mr-2 h-4 w-4" />
                  Configuration
                </h4>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-[var(--showcase-text)] mb-2">
                      Component
                    </label>
                    <select
                      value={config.component}
                      onChange$={(e) => config.component = (e.target as HTMLSelectElement).value}
                      class="w-full rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm text-[var(--showcase-text)]"
                    >
                      <option value="Alert">Alert</option>
                      <option value="Toast">Toast</option>
                      <option value="Dialog">Dialog</option>
                      <option value="Drawer">Drawer</option>
                      <option value="Popover">Popover</option>
                      <option value="ErrorMessage">ErrorMessage</option>
                      <option value="PromoBanner">PromoBanner</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[var(--showcase-text)] mb-2">
                      Variant
                    </label>
                    <select
                      value={config.variant}
                      onChange$={(e) => config.variant = (e.target as HTMLSelectElement).value}
                      class="w-full rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm text-[var(--showcase-text)]"
                    >
                      <option value="solid">Solid</option>
                      <option value="outline">Outline</option>
                      <option value="subtle">Subtle</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[var(--showcase-text)] mb-2">
                      Size
                    </label>
                    <select
                      value={config.size}
                      onChange$={(e) => config.size = (e.target as HTMLSelectElement).value}
                      class="w-full rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm text-[var(--showcase-text)]"
                    >
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.responsive}
                        onChange$={(e) => config.responsive = (e.target as HTMLInputElement).checked}
                        class="rounded border-[var(--showcase-border)]"
                      />
                      <span class="text-sm text-[var(--showcase-text)]">Responsive</span>
                    </label>
                    
                    <label class="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config.mobile}
                        onChange$={(e) => config.mobile = (e.target as HTMLInputElement).checked}
                        class="rounded border-[var(--showcase-border)]"
                      />
                      <span class="text-sm text-[var(--showcase-text)]">Mobile Optimized</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Code Panel */}
              <div class="flex-1 flex flex-col">
                {/* Tabs */}
                <div class="flex border-b border-[var(--showcase-border)]">
                  {[
                    { id: "component", label: "Component" },
                    { id: "theme", label: "Theme" },
                    { id: "utils", label: "Utils" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick$={() => activeTab.value = tab.id as any}
                      class={{
                        "px-4 py-2 text-sm font-medium": true,
                        "bg-[var(--showcase-primary)] text-white": activeTab.value === tab.id,
                        "text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)]": activeTab.value !== tab.id,
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Code Display */}
                <div class="flex-1 flex flex-col">
                  <div class="flex items-center justify-between border-b border-[var(--showcase-border)] px-4 py-2">
                    <span class="text-sm font-medium text-[var(--showcase-text)]">
                      Generated Code
                    </span>
                    <div class="flex space-x-2">
                      <button
                        onClick$={async () => copyToClipboard(await getCode())}
                        class="flex items-center space-x-1 rounded bg-[var(--showcase-primary)] px-2 py-1 text-xs text-white hover:bg-[var(--showcase-primary)]/90"
                      >
                        {copied.value ? (
                          <HiCheckOutline class="h-3 w-3" />
                        ) : (
                          <HiClipboardDocumentOutline class="h-3 w-3" />
                        )}
                        <span>{copied.value ? "Copied!" : "Copy"}</span>
                      </button>
                      
                      <button
                        onClick$={async () => downloadCode(`${config.component.toLowerCase()}-${activeTab.value}.tsx`, await getCode())}
                        class="flex items-center space-x-1 rounded bg-[var(--showcase-accent)] px-2 py-1 text-xs text-white hover:bg-[var(--showcase-accent)]/90"
                      >
                        <HiArrowDownTrayMini class="h-3 w-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  <div class="flex-1 overflow-auto">
                    <pre class="h-full p-4 text-sm bg-[var(--showcase-bg)] text-[var(--showcase-text)] overflow-auto">
                      <code>{getCode()}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
);