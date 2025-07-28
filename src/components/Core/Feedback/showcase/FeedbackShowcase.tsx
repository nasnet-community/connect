import { component$, useSignal, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import {
  HiSparklesOutline,
  HiDevicePhoneMobileOutline,
  HiPaintBrushOutline,
  HiCpuChipOutline,
  HiEyeOutline,
  HiCodeBracketOutline,
  HiBookOpenOutline,
  HiCommandLineOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../Card/Card";
import { DeviceSimulator } from "./components/DeviceSimulator";
import { ThemeEditor } from "./components/ThemeEditor";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { AccessibilityScanner } from "./components/AccessibilityScanner";
import { CodeGenerator } from "./components/CodeGenerator";
import { ComponentGallery } from "./sections/ComponentGallery";
import { MobileFeaturesSection } from "./sections/MobileFeaturesSection";
import { ThemeSystemSection } from "./sections/ThemeSystemSection";
import { BestPracticesSection } from "./sections/BestPracticesSection";
import { HeroSection } from "./sections/HeroSection";
import { useShowcaseTheme } from "./hooks/useShowcaseTheme";
import { useDeviceSimulator } from "./hooks/useDeviceSimulator";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { DEFAULT_THEME, KEYBOARD_SHORTCUTS } from "./constants";
import type { ShowcaseTheme } from "./types";

export const FeedbackShowcase = component$(() => {
  const activeSection = useSignal("overview");
  const showKeyboardHelp = useSignal(false);
  const showPerformanceMonitor = useSignal(false);
  const showAccessibilityScanner = useSignal(false);
  const showCodeGenerator = useSignal(false);

  const themeStore = useStore<ShowcaseTheme>(DEFAULT_THEME);
  const { theme, updateTheme, toggleTheme, resetTheme } = useShowcaseTheme(themeStore);
  const { device, setDevice, cycleDevice } = useDeviceSimulator();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: "1", action: $(() => { activeSection.value = "overview"; }), description: "Go to Overview" },
    { key: "2", action: $(() => { activeSection.value = "gallery"; }), description: "Go to Component Gallery" },
    { key: "3", action: $(() => { activeSection.value = "mobile"; }), description: "Go to Mobile Features" },
    { key: "4", action: $(() => { activeSection.value = "theme"; }), description: "Go to Theme System" },
    { key: "5", action: $(() => { activeSection.value = "performance"; }), description: "Go to Performance" },
    { key: "t", action: toggleTheme, description: "Toggle theme mode" },
    { key: "d", action: cycleDevice, description: "Cycle device size" },
    { key: "r", action: resetTheme, description: "Reset theme to defaults" },
    { key: "g", action: $(() => { showCodeGenerator.value = !showCodeGenerator.value; }), description: "Toggle code generator" },
    { key: "a", action: $(() => { showAccessibilityScanner.value = !showAccessibilityScanner.value; }), description: "Toggle accessibility scanner" },
    { key: "p", action: $(() => { showPerformanceMonitor.value = !showPerformanceMonitor.value; }), description: "Toggle performance monitor" },
    { key: "?", action: $(() => { showKeyboardHelp.value = !showKeyboardHelp.value; }), description: "Toggle keyboard help" },
  ]);

  // Apply theme to CSS variables
  useVisibleTask$(({ track }) => {
    track(() => theme);
    
    const root = document.documentElement;
    root.style.setProperty("--showcase-primary", theme.primaryColor);
    root.style.setProperty("--showcase-accent", theme.accentColor);
    root.style.setProperty("--showcase-bg", theme.backgroundColor);
    root.style.setProperty("--showcase-surface", theme.surfaceColor);
    root.style.setProperty("--showcase-text", theme.textColor);
    root.style.setProperty("--showcase-border", theme.borderColor);
    
    document.body.className = theme.mode === "dark" ? "dark" : "";
  });

  const sections = [
    {
      id: "overview",
      title: "Overview",
      iconName: "sparkles",
      description: "Enhanced feedback components with mobile optimizations",
    },
    {
      id: "gallery",
      title: "Component Gallery",
      iconName: "device",
      description: "Interactive demos of all feedback components",
    },
    {
      id: "mobile",
      title: "Mobile Features",
      iconName: "device",
      description: "Touch gestures and responsive design showcases",
    },
    {
      id: "theme",
      title: "Theme System",
      iconName: "paintbrush",
      description: "Live theme customization and color palettes",
    },
    {
      id: "best-practices",
      title: "Best Practices",
      iconName: "book",
      description: "Usage guidelines and implementation examples",
    },
  ];

  const getIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case "sparkles":
        return <HiSparklesOutline class={className} />;
      case "device":
        return <HiDevicePhoneMobileOutline class={className} />;
      case "paintbrush":
        return <HiPaintBrushOutline class={className} />;
      case "book":
        return <HiBookOpenOutline class={className} />;
      default:
        return null;
    }
  };

  return (
    <div class="min-h-screen bg-[var(--showcase-bg)] transition-colors duration-300">
      {/* Header */}
      <header class="sticky top-0 z-50 border-b border-[var(--showcase-border)] bg-[var(--showcase-surface)]/80 backdrop-blur-lg">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center space-x-4">
              <HiSparklesOutline class="h-8 w-8 text-[var(--showcase-primary)]" />
              <div>
                <h1 class="text-xl font-bold text-[var(--showcase-text)]">
                  Feedback Components Showcase
                </h1>
                <p class="text-sm text-[var(--showcase-text)]/70">
                  Interactive demos and mobile optimizations
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              {/* Device Simulator Toggle */}
              <DeviceSimulator 
                device={device.value}
                onDeviceChange={setDevice}
                compact
              />

              {/* Theme Toggle */}
              <button
                onClick$={toggleTheme}
                class="rounded-lg p-2 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
                title="Toggle theme (T)"
              >
                <HiPaintBrushOutline class="h-5 w-5" />
              </button>

              {/* Performance Monitor Toggle */}
              <button
                onClick$={() => showPerformanceMonitor.value = !showPerformanceMonitor.value}
                class="rounded-lg p-2 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
                title="Performance monitor (P)"
              >
                <HiCpuChipOutline class="h-5 w-5" />
              </button>

              {/* Accessibility Scanner Toggle */}
              <button
                onClick$={() => showAccessibilityScanner.value = !showAccessibilityScanner.value}
                class="rounded-lg p-2 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
                title="Accessibility scanner (A)"
              >
                <HiEyeOutline class="h-5 w-5" />
              </button>

              {/* Code Generator Toggle */}
              <button
                onClick$={() => showCodeGenerator.value = !showCodeGenerator.value}
                class="rounded-lg p-2 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
                title="Code generator (G)"
              >
                <HiCodeBracketOutline class="h-5 w-5" />
              </button>

              {/* Keyboard Shortcuts Help */}
              <button
                onClick$={() => showKeyboardHelp.value = !showKeyboardHelp.value}
                class="rounded-lg p-2 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
                title="Keyboard shortcuts (?)"
              >
                <HiCommandLineOutline class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav class="border-b border-[var(--showcase-border)] bg-[var(--showcase-surface)]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick$={() => activeSection.value = section.id}
                class={{
                  "flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all": true,
                  "bg-[var(--showcase-primary)] text-white": activeSection.value === section.id,
                  "text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]": activeSection.value !== section.id,
                }}
              >
                {getIcon(section.iconName, "h-4 w-4")}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeSection.value === "overview" && <HeroSection />}
        {activeSection.value === "gallery" && <ComponentGallery device={device.value} />}
        {activeSection.value === "mobile" && <MobileFeaturesSection />}
        {activeSection.value === "theme" && <ThemeSystemSection theme={theme} onThemeChange={updateTheme} />}
        {activeSection.value === "best-practices" && <BestPracticesSection />}
      </main>

      {/* Floating Tools */}
      {showPerformanceMonitor.value && (
        <PerformanceMonitor onClose={$(() => { showPerformanceMonitor.value = false; })} />
      )}

      {showAccessibilityScanner.value && (
        <AccessibilityScanner onClose={$(() => { showAccessibilityScanner.value = false; })} />
      )}

      {showCodeGenerator.value && (
        <CodeGenerator 
          theme={theme}
          device={device.value}
          onClose={$(() => { showCodeGenerator.value = false; })}
        />
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showKeyboardHelp.value && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card class="max-w-lg p-6">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-[var(--showcase-text)]">
                Keyboard Shortcuts
              </h3>
              <button
                onClick$={() => showKeyboardHelp.value = false}
                class="text-[var(--showcase-text)]/70 hover:text-[var(--showcase-text)]"
              >
                ×
              </button>
            </div>
            <div class="space-y-2">
              {KEYBOARD_SHORTCUTS.map((shortcut) => (
                <div key={shortcut.key} class="flex items-start justify-between">
                  <kbd class="rounded bg-[var(--showcase-surface)] px-2 py-1 text-xs font-mono">
                    {shortcut.key}
                  </kbd>
                  <span class="ml-4 text-sm text-[var(--showcase-text)]/70">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Theme Editor Sidebar */}
      <ThemeEditor
        theme={theme}
        onChange={updateTheme}
        onReset={resetTheme}
      />
    </div>
  );
});