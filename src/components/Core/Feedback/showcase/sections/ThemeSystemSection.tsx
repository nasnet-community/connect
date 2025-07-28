import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import {
  HiSunOutline,
  HiMoonOutline,
  HiComputerDesktopOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { Alert } from "../../Alert/Alert";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import type { ShowcaseTheme } from "../types";

// Move ColorSwatch outside of main component
const ColorSwatch = component$<{
  color: string;
  label: string;
  size?: "sm" | "md" | "lg";
}>(({ color, label, size = "md" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div class="flex flex-col items-center space-y-1">
      <div
        class={`rounded border border-gray-300 ${sizeClasses[size]}`}
        style={{ backgroundColor: color }}
        title={color}
      />
      <span class="text-xs text-[var(--showcase-text)]/70">{label}</span>
    </div>
  );
});

interface ThemeSystemSectionProps {
  theme: ShowcaseTheme;
  onThemeChange: QRL<(updates: Partial<ShowcaseTheme>) => void>;
}

export const ThemeSystemSection = component$<ThemeSystemSectionProps>(
  ({ theme, onThemeChange }) => {
    const activePreset = useSignal<string | null>(null);

    const colorPresets = [
      {
        id: "ocean",
        name: "Ocean Blue",
        description: "Calming blues and teals for professional applications",
        colors: {
          primaryColor: "#0ea5e9",
          accentColor: "#06b6d4",
          backgroundColor: theme.mode === "dark" ? "#0f172a" : "#f0f9ff",
          surfaceColor: theme.mode === "dark" ? "#1e293b" : "#e0f2fe",
          textColor: theme.mode === "dark" ? "#f1f5f9" : "#0c4a6e",
          borderColor: theme.mode === "dark" ? "#334155" : "#bae6fd",
        },
      },
      {
        id: "forest",
        name: "Forest Green",
        description: "Natural greens for eco-friendly and health applications",
        colors: {
          primaryColor: "#059669",
          accentColor: "#10b981",
          backgroundColor: theme.mode === "dark" ? "#0f172a" : "#f0fdf4",
          surfaceColor: theme.mode === "dark" ? "#1e293b" : "#dcfce7",
          textColor: theme.mode === "dark" ? "#f1f5f9" : "#064e3b",
          borderColor: theme.mode === "dark" ? "#334155" : "#bbf7d0",
        },
      },
      {
        id: "sunset",
        name: "Sunset Orange",
        description: "Warm oranges and reds for energetic applications",
        colors: {
          primaryColor: "#ea580c",
          accentColor: "#f97316",
          backgroundColor: theme.mode === "dark" ? "#0f172a" : "#fff7ed",
          surfaceColor: theme.mode === "dark" ? "#1e293b" : "#fed7aa",
          textColor: theme.mode === "dark" ? "#f1f5f9" : "#9a3412",
          borderColor: theme.mode === "dark" ? "#334155" : "#fdba74",
        },
      },
      {
        id: "midnight",
        name: "Midnight Purple",
        description: "Deep purples for creative and luxury applications",
        colors: {
          primaryColor: "#7c3aed",
          accentColor: "#a855f7",
          backgroundColor: theme.mode === "dark" ? "#0f0f23" : "#faf5ff",
          surfaceColor: theme.mode === "dark" ? "#1e1b31" : "#e9d5ff",
          textColor: theme.mode === "dark" ? "#f3f0ff" : "#581c87",
          borderColor: theme.mode === "dark" ? "#2d2950" : "#c4b5fd",
        },
      },
    ];


    const ColorPalette = component$<{
      colors: Record<string, string>;
      title: string;
    }>(({ colors, title }) => (
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-[var(--showcase-text)]">{title}</h4>
        <div class="flex space-x-3">
          <ColorSwatch color={colors.primaryColor} label="Primary" />
          <ColorSwatch color={colors.accentColor} label="Accent" />
          <ColorSwatch color={colors.backgroundColor} label="Background" />
          <ColorSwatch color={colors.surfaceColor} label="Surface" />
          <ColorSwatch color={colors.textColor} label="Text" />
          <ColorSwatch color={colors.borderColor} label="Border" />
        </div>
      </div>
    ));

    const ThemePreview = component$<{
      presetColors: Record<string, string>;
    }>(({ presetColors }) => (
      <div class="space-y-3" style={{
        "--preview-primary": presetColors.primaryColor,
        "--preview-accent": presetColors.accentColor,
        "--preview-bg": presetColors.backgroundColor,
        "--preview-surface": presetColors.surfaceColor,
        "--preview-text": presetColors.textColor,
        "--preview-border": presetColors.borderColor,
      }}>
        <div
          class="rounded p-3"
          style={{
            backgroundColor: "var(--preview-surface)",
            color: "var(--preview-text)",
            border: `1px solid ${presetColors.borderColor}`,
          }}
        >
          <div
            style={{ 
              backgroundColor: presetColors.primaryColor + "20",
              borderColor: presetColors.primaryColor,
              color: presetColors.textColor,
            }}
            class="rounded"
          >
            <Alert
              status="info"
              message="Theme preview with custom colors"
              size="sm"
            />
          </div>
        </div>
      </div>
    ));

    return (
      <div class="space-y-8">
        {/* Header */}
        <div class="text-center">
          <h2 class="mb-4 text-3xl font-bold text-[var(--showcase-text)]">
            Theme System
          </h2>
          <p class="mx-auto max-w-2xl text-[var(--showcase-text)]/70">
            Comprehensive theming system with live customization, color presets,
            and automatic dark mode support for all feedback components.
          </p>
        </div>

        {/* Current Theme Display */}
        <Card class="p-6">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-[var(--showcase-text)]">
              Current Theme
            </h3>
            <div class="flex items-center space-x-2">
              <div class="flex rounded border border-[var(--showcase-border)]">
                <button
                  onClick$={$(() => onThemeChange({ mode: "light" }))}
                  class={{
                    "flex items-center space-x-1 rounded-l px-3 py-1 text-sm": true,
                    "bg-[var(--showcase-primary)] text-white": theme.mode === "light",
                    "text-[var(--showcase-text)]/70": theme.mode !== "light",
                  }}
                >
                  <HiSunOutline class="h-4 w-4" />
                  <span>Light</span>
                </button>
                <button
                  onClick$={$(() => onThemeChange({ mode: "dark" }))}
                  class={{
                    "flex items-center space-x-1 px-3 py-1 text-sm": true,
                    "bg-[var(--showcase-primary)] text-white": theme.mode === "dark",
                    "text-[var(--showcase-text)]/70": theme.mode !== "dark",
                  }}
                >
                  <HiMoonOutline class="h-4 w-4" />
                  <span>Dark</span>
                </button>
                <button
                  onClick$={$(() => onThemeChange({ mode: "system" }))}
                  class={{
                    "flex items-center space-x-1 rounded-r px-3 py-1 text-sm": true,
                    "bg-[var(--showcase-primary)] text-white": theme.mode === "system",
                    "text-[var(--showcase-text)]/70": theme.mode !== "system",
                  }}
                >
                  <HiComputerDesktopOutline class="h-4 w-4" />
                  <span>System</span>
                </button>
              </div>
            </div>
          </div>

          <ColorPalette colors={{
            primaryColor: theme.primaryColor,
            accentColor: theme.accentColor,
            backgroundColor: theme.backgroundColor,
            surfaceColor: theme.surfaceColor,
            textColor: theme.textColor,
            borderColor: theme.borderColor,
          }} title="Active Color Palette" />

          <div class="mt-6 space-y-4">
            <h4 class="text-sm font-medium text-[var(--showcase-text)]">
              Live Component Preview
            </h4>
            <div class="space-y-3 rounded border border-[var(--showcase-border)] bg-[var(--showcase-bg)] p-4">
              <Alert
                status="info"
                title="Information Alert"
                message="This alert uses the current theme colors and adapts to light/dark mode automatically."
                dismissible
              />
              <ErrorMessage
                message="Error messages also respect the theme system for consistent styling."
                variant="solid"
                dismissible
              />
              <div class="flex space-x-2">
                <button class="rounded bg-[var(--showcase-primary)] px-3 py-2 text-sm text-white">
                  Primary Button
                </button>
                <button class="rounded bg-[var(--showcase-accent)] px-3 py-2 text-sm text-white">
                  Accent Button
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Presets */}
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-[var(--showcase-text)]">
            Color Presets
          </h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            {colorPresets.map((preset) => (
              <Card key={preset.id} class="overflow-hidden">
                <div class="p-4">
                  <div class="mb-3 flex items-start justify-between">
                    <div>
                      <h4 class="font-semibold text-[var(--showcase-text)]">
                        {preset.name}
                      </h4>
                      <p class="text-sm text-[var(--showcase-text)]/70">
                        {preset.description}
                      </p>
                    </div>
                    <button
                      onClick$={$(() => onThemeChange(preset.colors))}
                      class="rounded bg-[var(--showcase-primary)] px-3 py-1 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
                    >
                      Apply
                    </button>
                  </div>

                  <ColorPalette colors={preset.colors} title="Colors" />

                  <div class="mt-4">
                    <button
                      onClick$={() => {
                        activePreset.value = activePreset.value === preset.id ? null : preset.id;
                      }}
                      class="text-sm text-[var(--showcase-primary)] hover:underline"
                    >
                      {activePreset.value === preset.id ? "Hide Preview" : "Show Preview"}
                    </button>
                    
                    {activePreset.value === preset.id && (
                      <div class="mt-3">
                        <ThemePreview presetColors={preset.colors} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Color Editor */}
        <Card class="p-6">
          <h3 class="mb-4 text-xl font-semibold text-[var(--showcase-text)]">
            Custom Color Editor
          </h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div class="space-y-2">
              <label class="text-sm font-medium text-[var(--showcase-text)]">
                Primary Color
              </label>
              <div class="flex items-center space-x-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange$={$((e) => onThemeChange({ 
                    primaryColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="h-10 w-16 rounded border border-[var(--showcase-border)]"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange$={$((e) => onThemeChange({ 
                    primaryColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="flex-1 rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-[var(--showcase-text)]">
                Accent Color
              </label>
              <div class="flex items-center space-x-2">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange$={$((e) => onThemeChange({ 
                    accentColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="h-10 w-16 rounded border border-[var(--showcase-border)]"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange$={$((e) => onThemeChange({ 
                    accentColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="flex-1 rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-[var(--showcase-text)]">
                Background Color
              </label>
              <div class="flex items-center space-x-2">
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange$={$((e) => onThemeChange({ 
                    backgroundColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="h-10 w-16 rounded border border-[var(--showcase-border)]"
                />
                <input
                  type="text"
                  value={theme.backgroundColor}
                  onChange$={$((e) => onThemeChange({ 
                    backgroundColor: (e.target as HTMLInputElement).value 
                  }))}
                  class="flex-1 rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Theme Implementation Guide */}
        <Card class="p-6">
          <h3 class="mb-4 text-xl font-semibold text-[var(--showcase-text)]">
            Implementation Guide
          </h3>
          
          <div class="space-y-4">
            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">
                Using CSS Variables
              </h4>
              <pre class="rounded bg-[var(--showcase-bg)] p-3 text-sm text-[var(--showcase-text)]">
                <code>{`:root {
  --primary: ${theme.primaryColor};
  --accent: ${theme.accentColor};
  --background: ${theme.backgroundColor};
  --surface: ${theme.surfaceColor};
  --text: ${theme.textColor};
  --border: ${theme.borderColor};
}`}</code>
              </pre>
            </div>

            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">
                Component Usage
              </h4>
              <pre class="rounded bg-[var(--showcase-bg)] p-3 text-sm text-[var(--showcase-text)]">
                <code>{`<Alert 
  status="info"
  variant="solid"
  class="bg-[var(--primary)] text-white"
>
  Themed alert component
</Alert>`}</code>
              </pre>
            </div>
          </div>
        </Card>
      </div>
    );
  }
);