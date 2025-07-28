import { component$, useSignal } from "@builder.io/qwik";
import { Card } from "../Card/Card";
import { MobileOptimizedTable } from "../Table/MobileOptimizedTable";
import { MobileOverlay } from "../MobileOverlay";

/**
 * Example component showcasing mobile optimizations for DataDisplay components
 */
export const MobileOptimizedExample = component$(() => {
  const showOverlay = useSignal(false);

  // Sample data for table
  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "Active" },
  ];

  const tableColumns = [
    {
      id: "name",
      header: "Name",
      field: "name",
      sortable: true,
      mobileLabel: "Full Name",
    },
    {
      id: "email",
      header: "Email",
      field: "email",
      hideOnMobile: false,
      mobileLabel: "Email Address",
    },
    {
      id: "role",
      header: "Role",
      field: "role",
      hideOn: { sm: true },
      mobileLabel: "User Role",
    },
    {
      id: "status",
      header: "Status",
      field: "status",
      renderCell: (value: any) => (
        <span
          class={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {value}
        </span>
      ),
      mobileLabel: "Status",
    },
  ];

  return (
    <div class="p-6 space-y-8 pb-safe-bottom">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Mobile-Optimized Components
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Examples showcasing mobile-first design with touch interactions, safe area support, and responsive layouts.
        </p>
      </div>

      {/* Mobile-Optimized Cards */}
      <section class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Cards
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            elevation="md"
            interactive
            touchFeedback
            mobileOptimized
            class="p-4"
          >
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Mobile-First Card
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Touch-friendly with press animations and safe area padding.
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Touch to interact
              </div>
            </div>
          </Card>

          <Card
            variant="outlined"
            interactive
            touchFeedback
            mobileOptimized
            hoverEffect="raise"
            class="p-4"
          >
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Elevated Card
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Outlined variant with hover lift effect and mobile shadows.
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Hover or touch
              </div>
            </div>
          </Card>

          <Card
            elevation="lg"
            interactive
            touchFeedback
            mobileOptimized
            onClick$={() => showOverlay.value = true}
            class="p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800"
          >
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Action Card
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Click to open mobile overlay with backdrop blur.
              </p>
              <div class="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400">
                <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                Tap to open overlay
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Mobile-Optimized Table */}
      <section class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Data Table
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Automatically switches to card layout on mobile devices ({"< 768px"}).
        </p>
        
        <MobileOptimizedTable
          data={tableData}
          columns={tableColumns}
          caption="User Management Table"
          hoverable
          mobileLayout="card"
          mobileSafeArea
          onRowClick$={(row) => {
            console.log("Row clicked:", row);
          }}
        />
      </section>

      {/* Feature Highlights */}
      <section class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Mobile Features
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">
              Touch Interactions
            </h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Press animations on touch</li>
              <li>• Lift effects for hover states</li>
              <li>• Scale transformations</li>
              <li>• Smooth transitions</li>
            </ul>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">
              Safe Area Support
            </h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Bottom safe area padding</li>
              <li>• Top safe area support</li>
              <li>• Notch-aware layouts</li>
              <li>• iOS/Android compatibility</li>
            </ul>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">
              Responsive Design
            </h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Card layout for mobile tables</li>
              <li>• Adaptive component sizing</li>
              <li>• Breakpoint-aware visibility</li>
              <li>• Fluid typography</li>
            </ul>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">
              Performance
            </h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Hardware acceleration</li>
              <li>• Optimized animations</li>
              <li>• Reduced motion support</li>
              <li>• Efficient re-renders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mobile Overlay */}
      <MobileOverlay
        isOpen={showOverlay.value}
        onClose$={() => showOverlay.value = false}
        backdropBlur
        safeArea
      >
        <div class="p-6 space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Mobile Overlay
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            This overlay demonstrates backdrop blur, safe area padding, and smooth slide-up animations.
          </p>
          
          <div class="space-y-3">
            <div class="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
              <p class="text-sm text-primary-700 dark:text-primary-300">
                ✨ Backdrop blur effect active
              </p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p class="text-sm text-green-700 dark:text-green-300">
                📱 Safe area padding applied
              </p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p class="text-sm text-blue-700 dark:text-blue-300">
                🎯 Touch-optimized interactions
              </p>
            </div>
          </div>
          
          <button
            class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg font-medium touch:active:scale-[0.98] transition-transform"
            onClick$={() => showOverlay.value = false}
          >
            Close Overlay
          </button>
        </div>
      </MobileOverlay>
    </div>
  );
});