import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const AdvancedResponsive = component$(() => {
  const rtlMode = useSignal(false);
  const responsiveLayout = useSignal(true);
  const mobileFirst = useSignal(false);
  const tabletOptimized = useSignal(true);
  const desktopEnhanced = useSignal(false);
  const touchOptimized = useSignal(true);

  return (
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-text-primary dark:text-text-dark-primary">
          Advanced Responsive Features
        </h3>
        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
          Showcasing responsive design with Tailwind's comprehensive breakpoint system,
          RTL support, and device-specific optimizations.
        </p>
      </div>

      {/* RTL/LTR Support */}
      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          RTL/LTR Language Support
        </h4>
        
        <div class="grid gap-6 lg:grid-cols-2">
          {/* LTR Example */}
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800" dir="ltr">
            <h5 class="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
              Left-to-Right (English)
            </h5>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-sm text-text-primary dark:text-text-dark-primary">
                  Enable notifications
                </label>
                <Switch
                  checked={rtlMode.value}
                  onChange$={(checked) => (rtlMode.value = checked)}
                  aria-label="Enable notifications"
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-sm text-text-primary dark:text-text-dark-primary">
                  Auto-sync data
                </label>
                <Switch
                  checked={responsiveLayout.value}
                  onChange$={(checked) => (responsiveLayout.value = checked)}
                  variant="success"
                  aria-label="Auto-sync data"
                />
              </div>
            </div>
          </div>

          {/* RTL Example */}
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800" dir="rtl">
            <h5 class="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
              Right-to-Left (العربية)
            </h5>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-sm text-text-primary dark:text-text-dark-primary">
                  تفعيل الإشعارات
                </label>
                <Switch
                  checked={rtlMode.value}
                  onChange$={(checked) => (rtlMode.value = checked)}
                  aria-label="تفعيل الإشعارات"
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-sm text-text-primary dark:text-text-dark-primary">
                  مزامنة تلقائية
                </label>
                <Switch
                  checked={responsiveLayout.value}
                  onChange$={(checked) => (responsiveLayout.value = checked)}
                  variant="success"
                  aria-label="مزامنة تلقائية"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
          <p>• RTL layouts automatically flip switch alignment and focus indicators</p>
          <p>• Uses logical properties from Tailwind config for proper text flow</p>
          <p>• Touch targets remain consistent across text directions</p>
        </div>
      </div>

      {/* Comprehensive Breakpoint System */}
      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Comprehensive Breakpoint System
        </h4>
        
        <div class="space-y-4">
          {/* Mobile-first approach */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex flex-col gap-4 2xs:flex-row 2xs:items-center 2xs:justify-between">
              <div class="flex-1">
                <label class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                  Mobile-First Responsive
                </label>
                <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                  Adapts from 360px (2xs) to desktop
                </p>
              </div>
              <Switch
                checked={mobileFirst.value}
                onChange$={(checked) => (mobileFirst.value = checked)}
                size="sm"
                class="self-start 2xs:self-center"
                aria-label="Mobile-first responsive design"
              />
            </div>
          </div>

          {/* Tablet optimization */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
              <div class="flex-1">
                <label class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                  Tablet Optimized Layout
                </label>
                <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                  Special layout for tablet devices (768px+)
                </p>
              </div>
              <Switch
                checked={tabletOptimized.value}
                onChange$={(checked) => (tabletOptimized.value = checked)}
                variant="warning"
                size="md"
                aria-label="Tablet optimized layout"
              />
            </div>
          </div>

          {/* Desktop enhancements */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
              <div class="flex-1">
                <label class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                  Desktop Enhanced Features
                </label>
                <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                  Enhanced interactions for desktop (1280px+)
                </p>
              </div>
              <Switch
                checked={desktopEnhanced.value}
                onChange$={(checked) => (desktopEnhanced.value = checked)}
                variant="error"
                size="lg"
                aria-label="Desktop enhanced features"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Device-specific Features */}
      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Device-Specific Optimizations
        </h4>

        <div class="grid gap-4 mobile-md:grid-cols-2 desktop:grid-cols-3">
          {/* Touch devices */}
          <div class="rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-primary-800 dark:text-primary-200">
                Touch Devices
              </h5>
              <Switch
                checked={touchOptimized.value}
                onChange$={(checked) => (touchOptimized.value = checked)}
                label="Touch Optimized"
                size="lg"
                class="touch:scale-110"
              />
              <p class="text-xs text-primary-600 dark:text-primary-400">
                44px minimum touch targets
              </p>
            </div>
          </div>

          {/* Pointer devices */}
          <div class="rounded-lg border border-secondary-200 bg-secondary-50 p-4 dark:border-secondary-800 dark:bg-secondary-900/20">
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                Pointer Devices
              </h5>
              <Switch
                checked={!touchOptimized.value}
                onChange$={(checked) => (touchOptimized.value = !checked)}
                label="Hover Effects"
                size="md"
                class="can-hover:hover:scale-105"
              />
              <p class="text-xs text-secondary-600 dark:text-secondary-400">
                Enhanced hover states
              </p>
            </div>
          </div>

          {/* High-resolution displays */}
          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-900/20 mobile-md:col-span-2 desktop:col-span-1">
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-success-800 dark:text-success-200">
                Retina Displays
              </h5>
              <Switch
                checked={true}
                onChange$={() => {}}
                label="High DPI"
                variant="success"
                size="sm"
                class="retina:shadow-lg"
              />
              <p class="text-xs text-success-600 dark:text-success-400">
                Crisp rendering on high-DPI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orientation and Layout */}
      <div class="space-y-6">
        <h4 class="text-base font-medium text-text-primary dark:text-text-dark-primary">
          Orientation-Aware Layout
        </h4>

        <div class="grid gap-4 portrait:grid-cols-1 landscape:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Portrait Layout
              </h5>
              <div class="portrait:space-y-3 landscape:space-y-0 landscape:flex landscape:items-center landscape:gap-4">
                <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  Vertical stacking in portrait mode
                </span>
                <Switch
                  checked={mobileFirst.value}
                  onChange$={(checked) => (mobileFirst.value = checked)}
                  aria-label="Portrait layout example"
                />
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Landscape Layout
              </h5>
              <div class="portrait:space-y-3 landscape:space-y-0 landscape:flex landscape:items-center landscape:gap-4">
                <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  Horizontal layout in landscape
                </span>
                <Switch
                  checked={tabletOptimized.value}
                  onChange$={(checked) => (tabletOptimized.value = checked)}
                  variant="success"
                  aria-label="Landscape layout example"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-info-50 border border-info-200 p-4 dark:bg-info-900/20 dark:border-info-800">
        <h4 class="text-sm font-medium text-info-800 dark:text-info-200 mb-2">
          📱 Responsive Design Features
        </h4>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <h5 class="text-xs font-medium text-info-700 dark:text-info-300 mb-1">Breakpoints Used:</h5>
            <ul class="text-xs text-info-600 dark:text-info-400 space-y-0.5">
              <li>• <code>2xs: 360px</code> - Small phones</li>
              <li>• <code>mobile-md: 475px</code> - Standard phones</li>
              <li>• <code>tablet: 768px</code> - Tablets</li>
              <li>• <code>desktop: 1280px</code> - Desktop</li>
            </ul>
          </div>
          <div>
            <h5 class="text-xs font-medium text-info-700 dark:text-info-300 mb-1">Device Features:</h5>
            <ul class="text-xs text-info-600 dark:text-info-400 space-y-0.5">
              <li>• <code>touch:</code> Touch device detection</li>
              <li>• <code>can-hover:</code> Hover capability</li>
              <li>• <code>retina:</code> High-DPI displays</li>
              <li>• <code>portrait/landscape:</code> Orientation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});