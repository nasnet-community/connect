import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "../Dialog";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "../Drawer";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { Alert } from "../Alert";
import { ErrorMessage } from "../ErrorMessage";
import { PromoBanner } from "../PromoBanner";
import { useToast } from "../Toast";
import { Button } from "../../button";

/**
 * MobileResponsiveTest - Tests all components on different screen sizes simultaneously
 * 
 * Integration scenarios tested:
 * 1. Component behavior across mobile, tablet, and desktop breakpoints
 * 2. Touch interactions and gesture handling
 * 3. Responsive sizing and positioning
 * 4. Mobile-specific features (fullscreen modals, swipe gestures)
 * 5. Safe area handling and mobile viewport considerations
 */
export const MobileResponsiveTest = component$(() => {
  const screenSize = useSignal<"mobile" | "tablet" | "desktop">("desktop");
  const viewportWidth = useSignal(1024);
  const isDialogOpen = useSignal(false);
  const isDrawerOpen = useSignal(false);
  const isPopoverOpen = useSignal(false);
  const drawerPlacement = useSignal<"left" | "right" | "top" | "bottom">("bottom");
  const toast = useToast();

  const testStates = useStore({
    showMobileAlert: true,
    showTabletError: true,
    showDesktopBanner: true,
    mobileFullscreenDialog: false,
    touchOptimizedPopover: false,
  });

  // Simulate different screen sizes
  const setScreenSize = $((size: typeof screenSize.value) => {
    screenSize.value = size;
    const widths = { mobile: 375, tablet: 768, desktop: 1024 };
    viewportWidth.value = widths[size];
    
    // Update document classes for responsive testing
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('mobile-viewport', 'tablet-viewport', 'desktop-viewport');
      root.classList.add(`${size}-viewport`);
      
      // Simulate viewport width changes
      root.style.setProperty('--test-viewport-width', `${widths[size]}px`);
    }
  });

  const testMobileInteractions = $(async () => {
    // Test mobile-optimized sequence
    testStates.mobileFullscreenDialog = true;
    testStates.touchOptimizedPopover = true;
    
    drawerPlacement.value = "bottom";
    isDrawerOpen.value = true;
    
    await toast.info("Mobile interaction test started", { 
      position: "top-center",
      duration: 4000,
      swipeable: true 
    });
    
    setTimeout(() => {
      isDialogOpen.value = true;
    }, 500);
  });

  const testAllScreenSizes = $(async () => {
    // Show components across all screen sizes
    testStates.showMobileAlert = true;
    testStates.showTabletError = true;
    testStates.showDesktopBanner = true;
    
    // Show toasts at different positions for different screen sizes
    await toast.info("Mobile toast", { position: "top-center", duration: 5000 });
    await toast.success("Tablet toast", { position: "top-right", duration: 5000 });
    await toast.warning("Desktop toast", { position: "bottom-right", duration: 5000 });
  });

  // Track viewport changes
  useVisibleTask$(() => {
    if (typeof window !== 'undefined') {
      const updateViewport = () => {
        const width = window.innerWidth;
        viewportWidth.value = width;
        
        if (width < 640) {
          screenSize.value = "mobile";
        } else if (width < 1024) {
          screenSize.value = "tablet";
        } else {
          screenSize.value = "desktop";
        }
      };

      updateViewport();
      window.addEventListener('resize', updateViewport);
      
      return () => window.removeEventListener('resize', updateViewport);
    }
  });

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="p-4 sm:p-6 space-y-6">
        {/* Responsive Control Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Mobile Responsive Integration Test
          </h2>
          
          <div class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              Current Viewport: {screenSize.value} ({viewportWidth.value}px)
            </div>
            <div class="text-xs text-blue-700 dark:text-blue-300">
              Resize window or use buttons below to test responsiveness
            </div>
          </div>

          {/* Screen Size Simulators */}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Button
              onClick$={() => setScreenSize("mobile")}
              class={`px-4 py-2 rounded text-sm font-medium ${
                screenSize.value === "mobile"
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📱 Mobile (375px)
            </Button>
            <Button
              onClick$={() => setScreenSize("tablet")}
              class={`px-4 py-2 rounded text-sm font-medium ${
                screenSize.value === "tablet"
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📟 Tablet (768px)
            </Button>
            <Button
              onClick$={() => setScreenSize("desktop")}
              class={`px-4 py-2 rounded text-sm font-medium ${
                screenSize.value === "desktop"
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              🖥️ Desktop (1024px)
            </Button>
          </div>

          {/* Test Actions */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick$={testMobileInteractions}
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Test Mobile Interactions
            </Button>
            <Button
              onClick$={testAllScreenSizes}
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Test All Screen Sizes
            </Button>
          </div>
        </div>

        {/* Responsive Alert Component */}
        {testStates.showMobileAlert && (
          <Alert
            status="info"
            title="Responsive Alert Test"
            message="This alert adapts its size and touch targets based on screen size. On mobile, it has larger touch areas and better spacing."
            dismissible={true}
            onDismiss$={() => testStates.showMobileAlert = false}
            size={screenSize.value === "mobile" ? "lg" : screenSize.value === "tablet" ? "md" : "sm"}
            variant="solid"
            animation="slideDown"
          />
        )}

        {/* Screen-Size Specific Components */}
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Mobile Optimized Component */}
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Mobile Features
            </h3>
            {screenSize.value === "mobile" && testStates.showMobileAlert && (
              <ErrorMessage
                message="Mobile-optimized error with larger touch targets"
                title="Mobile Error"
                dismissible={true}
                onDismiss$={() => testStates.showMobileAlert = false}
                size="lg"
                variant="solid"
                showIcon={true}
              />
            )}
            <Button
              onClick$={() => {
                drawerPlacement.value = "bottom";
                isDrawerOpen.value = true;
              }}
              class="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm touch:min-h-[44px]"
            >
              Open Bottom Drawer (Mobile)
            </Button>
          </div>

          {/* Tablet Optimized Component */}
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Tablet Features
            </h3>
            {screenSize.value === "tablet" && testStates.showTabletError && (
              <PromoBanner
                title="Tablet Promo"
                description="This promo banner is optimized for tablet viewing."
                provider="Test Provider"
                dismissible={true}
                onDismiss$={() => testStates.showTabletError = false}
              />
            )}
            <Button
              onClick$={() => {
                drawerPlacement.value = "right";
                isDrawerOpen.value = true;
              }}
              class="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Open Side Drawer (Tablet)
            </Button>
          </div>

          {/* Desktop Optimized Component */}
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Desktop Features
            </h3>
            <Popover
              isOpen={isPopoverOpen.value}
              onOpen$={() => isPopoverOpen.value = true}
              onClose$={() => isPopoverOpen.value = false}
              placement="top"
              trigger="click"
              hasArrow={true}
              mobileFullscreen={screenSize.value === "mobile"}
              touchOptimized={screenSize.value !== "desktop"}
            >
              <PopoverTrigger>
                <Button class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
                  Responsive Popover
                </Button>
              </PopoverTrigger>

              <PopoverContent class="w-64 p-4">
                <h4 class="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Adaptive Popover
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  This popover adapts: {screenSize.value === "mobile" ? "Fullscreen on mobile" : 
                  screenSize.value === "tablet" ? "Touch-optimized on tablet" : "Standard on desktop"}
                </p>
                <Alert
                  status="success"
                  message="Nested alert adapts to screen size"
                  size={screenSize.value === "mobile" ? "md" : "sm"}
                  variant="subtle"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Responsive Analysis Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Responsive Behavior Analysis
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 class="font-medium mb-2 text-gray-900 dark:text-gray-100">Mobile Adaptations</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>✓ Fullscreen dialogs</li>
                <li>✓ Bottom drawers for better reach</li>
                <li>✓ Larger touch targets (44px min)</li>
                <li>✓ Swipe gestures enabled</li>
                <li>✓ Safe area padding</li>
                <li>✓ Simplified layouts</li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium mb-2 text-gray-900 dark:text-gray-100">Tablet Optimizations</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>✓ Side drawer placements</li>
                <li>✓ Medium-sized components</li>
                <li>✓ Touch-optimized interactions</li>
                <li>✓ Adaptive popover positioning</li>
                <li>✓ Grid-based layouts</li>
                <li>✓ Hover state support</li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium mb-2 text-gray-900 dark:text-gray-100">Desktop Features</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>✓ Precise popover positioning</li>
                <li>✓ Multiple modal support</li>
                <li>✓ Keyboard navigation</li>
                <li>✓ Compact component sizes</li>
                <li>✓ Advanced layouts</li>
                <li>✓ Detailed hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Dialog */}
      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={() => isDialogOpen.value = false}
        size={screenSize.value === "mobile" ? "full" : screenSize.value === "tablet" ? "lg" : "md"}
        closeOnOutsideClick={screenSize.value !== "mobile"}
        hasCloseButton={true}
        fullscreenOnMobile={testStates.mobileFullscreenDialog}
        ariaLabel="Responsive dialog test"
      >
        <DialogHeader hasCloseButton onClose$={() => isDialogOpen.value = false}>
          <h3 class="text-lg font-semibold">
            Responsive Dialog ({screenSize.value})
          </h3>
        </DialogHeader>

        <DialogBody class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            This dialog adapts its size and behavior based on screen size:
          </p>
          
          <div class={`p-4 rounded-lg ${
            screenSize.value === "mobile" 
              ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              : screenSize.value === "tablet"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
          }`}>
            <div class="font-medium mb-2">
              {screenSize.value === "mobile" && "📱 Mobile Mode"}
              {screenSize.value === "tablet" && "📟 Tablet Mode"} 
              {screenSize.value === "desktop" && "🖥️ Desktop Mode"}
            </div>
            <div class="text-sm">
              {screenSize.value === "mobile" && "Fullscreen dialog with bottom actions"}
              {screenSize.value === "tablet" && "Large dialog with touch-friendly elements"}
              {screenSize.value === "desktop" && "Medium dialog with precise interactions"}
            </div>
          </div>

          <Alert
            status="info"
            message={`Dialog content adapts to ${screenSize.value} viewport`}
            size={screenSize.value === "mobile" ? "lg" : "md"}
            variant="subtle"
          />
        </DialogBody>

        <DialogFooter>
          <div class={`flex gap-3 ${
            screenSize.value === "mobile" ? "flex-col" : "flex-row justify-end"
          }`}>
            <Button
              onClick$={() => testStates.mobileFullscreenDialog = !testStates.mobileFullscreenDialog}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Toggle Mobile Fullscreen
            </Button>
            <Button
              onClick$={() => isDialogOpen.value = false}
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Responsive Drawer */}
      <Drawer
        isOpen={isDrawerOpen.value}
        onClose$={() => isDrawerOpen.value = false}
        placement={drawerPlacement.value}
        size={screenSize.value === "mobile" ? "full" : "md"}
        hasOverlay={true}
        closeOnOverlayClick={true}
        enableSwipeGestures={screenSize.value !== "desktop"}
        showDragHandle={screenSize.value === "mobile"}
        backdropBlur="medium"
        mobileAnimation={screenSize.value === "mobile"}
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">
            Responsive Drawer ({drawerPlacement.value})
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Screen: {screenSize.value}
          </p>
        </DrawerHeader>

        <DrawerContent class="p-4 space-y-4">
          <div class={`p-3 rounded border-l-4 ${
            screenSize.value === "mobile"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : screenSize.value === "tablet" 
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
          }`}>
            <div class="font-medium text-sm">
              {screenSize.value === "mobile" && "Mobile: Swipe gestures enabled, drag handle visible"}
              {screenSize.value === "tablet" && "Tablet: Touch-optimized with swipe support"}
              {screenSize.value === "desktop" && "Desktop: Standard drawer with mouse interactions"}
            </div>
          </div>

          <ErrorMessage
            message="Drawer content error message with responsive sizing"
            dismissible={true}
            size={screenSize.value === "mobile" ? "lg" : "md"}
            variant="outline"
          />

          <div class="grid gap-2">
            <Button
              onClick$={() => drawerPlacement.value = "left"}
              class={`text-sm px-3 py-2 rounded ${
                drawerPlacement.value === "left" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Left
            </Button>
            <Button
              onClick$={() => drawerPlacement.value = "right"}
              class={`text-sm px-3 py-2 rounded ${
                drawerPlacement.value === "right" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Right
            </Button>
            <Button
              onClick$={() => drawerPlacement.value = "bottom"}
              class={`text-sm px-3 py-2 rounded ${
                drawerPlacement.value === "bottom" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Bottom (Mobile Recommended)
            </Button>
          </div>
        </DrawerContent>

        <DrawerFooter>
          <Button
            onClick$={() => isDrawerOpen.value = false}
            class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close Drawer
          </Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
});