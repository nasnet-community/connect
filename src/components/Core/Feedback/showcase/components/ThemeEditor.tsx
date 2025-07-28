import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import {
  HiPaintBrushOutline,
  HiSunOutline,
  HiMoonOutline,
  HiComputerDesktopOutline,
  HiArrowPathOutline,
  HiXMarkOutline,
  HiChevronRightOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import type { ShowcaseTheme } from "../types";

interface ThemeEditorProps {
  theme: ShowcaseTheme;
  onChange: QRL<(updates: Partial<ShowcaseTheme>) => void>;
  onReset: QRL<() => void>;
}

export const ThemeEditor = component$<ThemeEditorProps>(
  ({ theme, onChange, onReset }) => {
    const isOpen = useSignal(false);
    const activeTab = useSignal<"mode" | "colors" | "presets">("mode");

    const themePresets = [
      {
        name: "Ocean Blue",
        colors: {
          primaryColor: "#0ea5e9",
          accentColor: "#06b6d4",
          backgroundColor: "#f0f9ff",
          surfaceColor: "#e0f2fe",
          textColor: "#0c4a6e",
          borderColor: "#bae6fd",
        },
      },
      {
        name: "Forest Green",
        colors: {
          primaryColor: "#059669",
          accentColor: "#10b981",
          backgroundColor: "#f0fdf4",
          surfaceColor: "#dcfce7",
          textColor: "#064e3b",
          borderColor: "#bbf7d0",
        },
      },
      {
        name: "Sunset Orange",
        colors: {
          primaryColor: "#ea580c",
          accentColor: "#f97316",
          backgroundColor: "#fff7ed",
          surfaceColor: "#fed7aa",
          textColor: "#9a3412",
          borderColor: "#fdba74",
        },
      },
      {
        name: "Purple Haze",
        colors: {
          primaryColor: "#7c3aed",
          accentColor: "#a855f7",
          backgroundColor: "#faf5ff",
          surfaceColor: "#e9d5ff",
          textColor: "#581c87",
          borderColor: "#c4b5fd",
        },
      },
    ];

    const ColorPicker = component$<{
      label: string;
      value: string;
      onChange: QRL<(value: string) => void>;
    }>(({ label, value, onChange }) => (
      <div class="space-y-2">
        <label class="text-sm font-medium text-[var(--showcase-text)]">
          {label}
        </label>
        <div class="flex items-center space-x-2">
          <div
            class="h-8 w-8 rounded-lg border border-[var(--showcase-border)]"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange$={(e) => onChange((e.target as HTMLInputElement).value)}
            class="h-8 w-16 rounded border border-[var(--showcase-border)] bg-transparent"
          />
          <input
            type="text"
            value={value}
            onChange$={(e) => onChange((e.target as HTMLInputElement).value)}
            class="flex-1 rounded border border-[var(--showcase-border)] bg-[var(--showcase-surface)] px-2 py-1 text-sm text-[var(--showcase-text)]"
            placeholder="#000000"
          />
        </div>
      </div>
    ));

    return (
      <>
        {/* Floating Theme Button */}
        <button
          onClick$={() => isOpen.value = !isOpen.value}
          class="fixed bottom-6 right-6 z-40 rounded-full bg-[var(--showcase-primary)] p-3 text-white shadow-lg hover:scale-105 transition-transform"
          title="Theme Editor"
        >
          <HiPaintBrushOutline class="h-6 w-6" />
        </button>

        {/* Theme Editor Sidebar */}
        <div
          class={{
            "fixed inset-y-0 right-0 z-50 w-80 transform bg-[var(--showcase-surface)] shadow-xl transition-transform": true,
            "translate-x-0": isOpen.value,
            "translate-x-full": !isOpen.value,
          }}
        >
          <div class="flex h-full flex-col">
            {/* Header */}
            <div class="flex items-center justify-between border-b border-[var(--showcase-border)] p-4">
              <h2 class="text-lg font-semibold text-[var(--showcase-text)]">
                Theme Editor
              </h2>
              <button
                onClick$={() => isOpen.value = false}
                class="rounded p-1 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
              >
                <HiXMarkOutline class="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div class="flex border-b border-[var(--showcase-border)]">
              {[
                { id: "mode", label: "Mode" },
                { id: "colors", label: "Colors" },
                { id: "presets", label: "Presets" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick$={() => activeTab.value = tab.id as any}
                  class={{
                    "flex-1 px-4 py-2 text-sm font-medium": true,
                    "bg-[var(--showcase-primary)] text-white": activeTab.value === tab.id,
                    "text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)]": activeTab.value !== tab.id,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div class="flex-1 overflow-y-auto p-4">
              {/* Mode Tab */}
              {activeTab.value === "mode" && (
                <div class="space-y-4">
                  <div>
                    <h3 class="mb-3 text-sm font-medium text-[var(--showcase-text)]">
                      Theme Mode
                    </h3>
                    <div class="space-y-2">
                      {[
                        { mode: "light", label: "Light", icon: HiSunOutline },
                        { mode: "dark", label: "Dark", icon: HiMoonOutline },
                        { mode: "system", label: "System", icon: HiComputerDesktopOutline },
                      ].map(({ mode, label, icon: Icon }) => (
                        <button
                          key={mode}
                          onClick$={() => onChange({ mode: mode as any })}
                          class={{
                            "flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left": true,
                            "bg-[var(--showcase-primary)] text-white": theme.mode === mode,
                            "bg-[var(--showcase-surface)] text-[var(--showcase-text)] hover:bg-[var(--showcase-surface)]": theme.mode !== mode,
                          }}
                        >
                          <Icon class="h-4 w-4" />
                          <span class="text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div class="pt-4 border-t border-[var(--showcase-border)]">
                    <button
                      onClick$={onReset}
                      class="flex w-full items-center justify-center space-x-2 rounded-lg bg-[var(--showcase-surface)] px-3 py-2 text-sm text-[var(--showcase-text)] hover:bg-[var(--showcase-surface)]"
                    >
                      <HiArrowPathOutline class="h-4 w-4" />
                      <span>Reset to Default</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Colors Tab */}
              {activeTab.value === "colors" && (
                <div class="space-y-6">
                  <ColorPicker
                    label="Primary Color"
                    value={theme.primaryColor}
                    onChange={$((value: string) => onChange({ primaryColor: value }))}
                  />
                  <ColorPicker
                    label="Accent Color"
                    value={theme.accentColor}
                    onChange={$((value: string) => onChange({ accentColor: value }))}
                  />
                  <ColorPicker
                    label="Background Color"
                    value={theme.backgroundColor}
                    onChange={$((value: string) => onChange({ backgroundColor: value }))}
                  />
                  <ColorPicker
                    label="Surface Color"
                    value={theme.surfaceColor}
                    onChange={$((value: string) => onChange({ surfaceColor: value }))}
                  />
                  <ColorPicker
                    label="Text Color"
                    value={theme.textColor}
                    onChange={$((value: string) => onChange({ textColor: value }))}
                  />
                  <ColorPicker
                    label="Border Color"
                    value={theme.borderColor}
                    onChange={$((value: string) => onChange({ borderColor: value }))}
                  />
                </div>
              )}

              {/* Presets Tab */}
              {activeTab.value === "presets" && (
                <div class="space-y-3">
                  <h3 class="text-sm font-medium text-[var(--showcase-text)]">
                    Color Presets
                  </h3>
                  {themePresets.map(preset => (
                    <button
                      key={preset.name}
                      onClick$={() => onChange(preset.colors)}
                      class="flex w-full items-center justify-between rounded-lg bg-[var(--showcase-surface)] p-3 text-left hover:bg-[var(--showcase-surface)]"
                    >
                      <div>
                        <div class="text-sm font-medium text-[var(--showcase-text)]">
                          {preset.name}
                        </div>
                        <div class="flex mt-1 space-x-1">
                          {Object.values(preset.colors).slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              class="h-3 w-3 rounded-full border border-[var(--showcase-border)]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <HiChevronRightOutline class="h-4 w-4 text-[var(--showcase-text)]/50" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Preview */}
            <div class="border-t border-[var(--showcase-border)] p-4">
              <h3 class="mb-2 text-sm font-medium text-[var(--showcase-text)]">
                Preview
              </h3>
              <Card class="p-3">
                <div class="flex items-center space-x-2">
                  <div
                    class="h-3 w-3 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    class="h-3 w-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <div class="flex-1 text-xs text-[var(--showcase-text)]/70">
                    Theme Preview
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {isOpen.value && (
          <div
            class="fixed inset-0 z-40 bg-black/25"
            onClick$={() => isOpen.value = false}
          />
        )}
      </>
    );
  }
);