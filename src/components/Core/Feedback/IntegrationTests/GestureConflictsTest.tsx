import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { Drawer, DrawerHeader, DrawerContent } from "../Drawer";
import { useToast, type ToastPosition } from "../Toast";
import { Alert } from "../Alert";
import { ErrorMessage } from "../ErrorMessage";
import { Button } from "../../button";

/**
 * GestureConflictsTest - Tests multiple swipeable components (Toast + Drawer)
 * 
 * Integration scenarios tested:
 * 1. Simultaneous swipe gestures on multiple components
 * 2. Gesture event propagation and prevention
 * 3. Touch conflict resolution between overlapping components
 * 4. Swipe direction handling with multiple active drawers
 * 5. Mobile gesture performance with multiple interactive elements
 */
export const GestureConflictsTest = component$(() => {
  const leftDrawerOpen = useSignal(false);
  const rightDrawerOpen = useSignal(false);
  const topDrawerOpen = useSignal(false);
  const bottomDrawerOpen = useSignal(false);
  const toast = useToast();

  const gestureState = useStore({
    activeGestures: 0,
    lastGestureType: "",
    conflictDetected: false,
    swipeThreshold: 50,
    enableAllGestures: true,
    debugMode: false,
  });

  const toastIds = useStore({
    swipeableToasts: [] as string[],
  });

  const createSwipeableToast = $(async (position: ToastPosition, message: string) => {
    const id = await toast.info(message, {
      position,
      duration: 8000,
      swipeable: true,
      dismissible: true,
      size: "md",
      onDismiss$: $((id: string) => {
        toastIds.swipeableToasts = toastIds.swipeableToasts.filter(toastId => toastId !== id);
      })
    });
    toastIds.swipeableToasts.push(id);
    return id;
  });

  const testMultipleSwipeableComponents = $(async () => {
    // Create multiple swipeable toasts in all corners
    await createSwipeableToast("top-left", "Swipe left/right to dismiss - Top Left");
    await createSwipeableToast("top-right", "Swipe left/right to dismiss - Top Right");
    await createSwipeableToast("bottom-left", "Swipe left/right to dismiss - Bottom Left");
    await createSwipeableToast("bottom-right", "Swipe left/right to dismiss - Bottom Right");

    // Open multiple drawers
    setTimeout(() => { leftDrawerOpen.value = true; }, 300);
    setTimeout(() => { rightDrawerOpen.value = true; }, 600);
    setTimeout(() => { bottomDrawerOpen.value = true; }, 900);

    gestureState.activeGestures = 7; // 4 toasts + 3 drawers
  });

  const testGestureConflicts = $(async () => {
    // Create scenario with overlapping gesture areas
    leftDrawerOpen.value = true;
    rightDrawerOpen.value = true;
    
    await createSwipeableToast("top-center", "This toast may conflict with drawer gestures");
    
    gestureState.conflictDetected = true;
    gestureState.lastGestureType = "Potential conflict scenario";
  });

  const testSwipeDirections = $(async () => {
    // Test all swipe directions simultaneously
    topDrawerOpen.value = true; // Swipe up to close
    bottomDrawerOpen.value = true; // Swipe down to close
    leftDrawerOpen.value = true; // Swipe left to close
    rightDrawerOpen.value = true; // Swipe right to close

    await toast.info("All drawer directions active - test swipe conflicts", {
      position: "top-center",
      duration: 5000,
      swipeable: true
    });
  });

  const clearAllGestures = $(() => {
    leftDrawerOpen.value = false;
    rightDrawerOpen.value = false;
    topDrawerOpen.value = false;
    bottomDrawerOpen.value = false;
    toast.dismissAll();
    toastIds.swipeableToasts = [];
    gestureState.activeGestures = 0;
    gestureState.conflictDetected = false;
  });

  const trackGestureActivity = $((gestureType: string) => {
    gestureState.lastGestureType = gestureType;
    if (gestureState.debugMode) {
      toast.info(`Gesture detected: ${gestureType}`, {
        duration: 2000,
        position: "bottom-center",
        size: "sm"
      });
    }
  });

  // Monitor touch events for debugging
  useVisibleTask$(() => {
    if (typeof window !== 'undefined' && gestureState.debugMode) {
      const handleTouchStart = (e: TouchEvent) => {
        trackGestureActivity(`Touch start: ${e.touches.length} finger(s)`);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          trackGestureActivity("Multi-touch gesture detected");
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  });

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div class="max-w-6xl mx-auto space-y-6">
        {/* Gesture Testing Control Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Gesture Conflicts Integration Test
          </h2>
          
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            This test demonstrates gesture handling conflicts between multiple swipeable components.
            Test on mobile/touch devices for best results.
          </p>

          {/* Gesture Status Panel */}
          <div class={`p-4 rounded-lg border mb-6 ${
            gestureState.conflictDetected
              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : gestureState.activeGestures > 0
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
          }`}>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="font-medium">Active Gestures:</span>
                <span class={`ml-2 px-2 py-1 rounded ${
                  gestureState.activeGestures > 3
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    : gestureState.activeGestures > 0
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                }`}>
                  {gestureState.activeGestures}
                </span>
              </div>
              <div>
                <span class="font-medium">Last Gesture:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">
                  {gestureState.lastGestureType || "None"}
                </span>
              </div>
              <div>
                <span class="font-medium">Conflicts:</span>
                <span class={`ml-2 px-2 py-1 rounded text-xs ${
                  gestureState.conflictDetected
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                }`}>
                  {gestureState.conflictDetected ? "Detected" : "None"}
                </span>
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Button
              onClick$={testMultipleSwipeableComponents}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Test Multiple Components
            </Button>
            <Button
              onClick$={testGestureConflicts}
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Test Gesture Conflicts
            </Button>
            <Button
              onClick$={testSwipeDirections}
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Test All Directions
            </Button>
            <Button
              onClick$={clearAllGestures}
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Clear All
            </Button>
          </div>

          {/* Debug Options */}
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={gestureState.debugMode}
                onChange$={(e) => gestureState.debugMode = (e.target as HTMLInputElement).checked}
                class="rounded border-gray-300 dark:border-gray-600"
              />
              <span class="text-gray-700 dark:text-gray-300">Debug Mode</span>
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={gestureState.enableAllGestures}
                onChange$={(e) => gestureState.enableAllGestures = (e.target as HTMLInputElement).checked}
                class="rounded border-gray-300 dark:border-gray-600"
              />
              <span class="text-gray-700 dark:text-gray-300">Enable All Gestures</span>
            </label>
          </div>
        </div>

        {/* Individual Drawer Controls */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h3 class="font-semibold mb-3 text-center">Left Drawer</h3>
            <Button
              onClick$={() => {
                leftDrawerOpen.value = true;
                trackGestureActivity("Left drawer opened");
              }}
              class="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              Open Left
            </Button>
            <p class="text-xs text-gray-500 mt-2 text-center">
              Swipe ← to close
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h3 class="font-semibold mb-3 text-center">Right Drawer</h3>
            <Button
              onClick$={() => {
                rightDrawerOpen.value = true;
                trackGestureActivity("Right drawer opened");
              }}
              class="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
            >
              Open Right
            </Button>
            <p class="text-xs text-gray-500 mt-2 text-center">
              Swipe → to close
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h3 class="font-semibold mb-3 text-center">Top Drawer</h3>
            <Button
              onClick$={() => {
                topDrawerOpen.value = true;
                trackGestureActivity("Top drawer opened");
              }}
              class="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"
            >
              Open Top
            </Button>
            <p class="text-xs text-gray-500 mt-2 text-center">
              Swipe ↑ to close
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h3 class="font-semibold mb-3 text-center">Bottom Drawer</h3>
            <Button
              onClick$={() => {
                bottomDrawerOpen.value = true;
                trackGestureActivity("Bottom drawer opened");
              }}
              class="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm"
            >
              Open Bottom
            </Button>
            <p class="text-xs text-gray-500 mt-2 text-center">
              Swipe ↓ to close
            </p>
          </div>
        </div>

        {/* Toast Testing Area */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Swipeable Toast Testing
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Button
              onClick$={() => createSwipeableToast("top-left", "Top Left Toast - Swipe to dismiss")}
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              Top Left Toast
            </Button>
            <Button
              onClick$={() => createSwipeableToast("top-right", "Top Right Toast - Swipe to dismiss")}
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
            >
              Top Right Toast
            </Button>
            <Button
              onClick$={() => createSwipeableToast("bottom-left", "Bottom Left Toast - Swipe to dismiss")}
              class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"
            >
              Bottom Left Toast
            </Button>
            <Button
              onClick$={() => createSwipeableToast("bottom-right", "Bottom Right Toast - Swipe to dismiss")}
              class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm"
            >
              Bottom Right Toast
            </Button>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-400">
            Active Toasts: {toastIds.swipeableToasts.length} | 
            Swipe horizontally on toasts to dismiss them.
          </p>
        </div>

        {/* Conflict Analysis Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Gesture Conflict Analysis
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium mb-3 text-gray-900 dark:text-gray-100">Potential Conflicts:</h4>
              <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-red-500">•</span>
                  <span>Left/Right drawers with horizontal toast swipes</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500">•</span>
                  <span>Multiple drawers open simultaneously</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500">•</span>
                  <span>Toasts in corners with drawer gesture areas</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500">•</span>
                  <span>Overlapping touch targets</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium mb-3 text-gray-900 dark:text-gray-100">Conflict Resolution:</h4>
              <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  <span>Event propagation control</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  <span>Z-index based gesture priority</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  <span>Touch area isolation</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">•</span>
                  <span>Gesture threshold tuning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Left Drawer */}
      <Drawer
        isOpen={leftDrawerOpen.value}
        onClose$={() => {
          leftDrawerOpen.value = false;
          trackGestureActivity("Left drawer closed");
        }}
        placement="left"
        size="md"
        hasOverlay={true}
        closeOnOverlayClick={true}
        enableSwipeGestures={gestureState.enableAllGestures}
        swipeThreshold={gestureState.swipeThreshold}
        showDragHandle={true}
        backdropBlur="light"
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">Left Drawer</h3>
        </DrawerHeader>
        <DrawerContent class="p-4 space-y-4">
          <Alert
            status="info"
            message="This drawer can be closed by swiping left. Test conflicts with toast swipes."
            size="md"
            variant="subtle"
          />
          <Button
            onClick$={() => createSwipeableToast("top-right", "Toast from left drawer")}
            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Conflicting Toast
          </Button>
        </DrawerContent>
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        isOpen={rightDrawerOpen.value}
        onClose$={() => {
          rightDrawerOpen.value = false;
          trackGestureActivity("Right drawer closed");
        }}
        placement="right"
        size="md"
        hasOverlay={true}
        closeOnOverlayClick={true}
        enableSwipeGestures={gestureState.enableAllGestures}
        swipeThreshold={gestureState.swipeThreshold}
        showDragHandle={true}
        backdropBlur="light"
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">Right Drawer</h3>
        </DrawerHeader>
        <DrawerContent class="p-4 space-y-4">
          <ErrorMessage
            message="Right drawer swipe conflicts with toast horizontal swipes."
            title="Gesture Conflict Warning"
            size="md"
            variant="outline"
            showIcon={true}
          />
          <Button
            onClick$={() => createSwipeableToast("top-left", "Conflicting toast from right drawer")}
            class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Test Conflict
          </Button>
        </DrawerContent>
      </Drawer>

      {/* Top Drawer */}
      <Drawer
        isOpen={topDrawerOpen.value}
        onClose$={() => {
          topDrawerOpen.value = false;
          trackGestureActivity("Top drawer closed");
        }}
        placement="top"
        size="md"
        hasOverlay={true}
        closeOnOverlayClick={true}
        enableSwipeGestures={gestureState.enableAllGestures}
        swipeThreshold={gestureState.swipeThreshold}
        showDragHandle={true}
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">Top Drawer</h3>
        </DrawerHeader>
        <DrawerContent class="p-4">
          <Alert
            status="warning"
            message="Vertical drawer with vertical swipe gesture."
            size="md"
            variant="solid"
          />
        </DrawerContent>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        isOpen={bottomDrawerOpen.value}
        onClose$={() => {
          bottomDrawerOpen.value = false;
          trackGestureActivity("Bottom drawer closed");
        }}
        placement="bottom"
        size="md"
        hasOverlay={true}
        closeOnOverlayClick={true}
        enableSwipeGestures={gestureState.enableAllGestures}
        swipeThreshold={gestureState.swipeThreshold}
        showDragHandle={true}
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">Bottom Drawer</h3>
        </DrawerHeader>
        <DrawerContent class="p-4">
          <Alert
            status="success"
            message="Bottom drawer - commonly used on mobile devices."
            size="md"
            variant="outline"
          />
          <div class="mt-4">
            <Button
              onClick$={async () => {
                await createSwipeableToast("top-center", "Toast above bottom drawer");
                gestureState.conflictDetected = true;
              }}
              class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            >
              Test Overlay Conflict
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
});