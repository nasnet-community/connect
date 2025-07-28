import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiCheckCircleOutline,
  HiArrowDownTrayMini,
  HiHeartOutline,
  HiShoppingCartOutline,
  HiSparklesOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";

export const ComplexLoadingStatesExample = component$(() => {
  const isLoading = useSignal(false);
  const loadingText = useSignal("Processing...");
  const stepIndex = useSignal(0);
  const loadingSteps = [
    "Validating...",
    "Processing...",
    "Finalizing...",
    "Complete!",
  ];

  const handleLoadingClick = $(() => {
    isLoading.value = true;
    stepIndex.value = 0;
    loadingText.value = loadingSteps[stepIndex.value];

    const interval = setInterval(() => {
      stepIndex.value++;
      if (stepIndex.value < loadingSteps.length) {
        loadingText.value = loadingSteps[stepIndex.value];
      } else {
        isLoading.value = false;
        clearInterval(interval);
      }
    }, 1000);
  });

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Complex Loading States</h3>
      <div class="flex flex-wrap gap-4">
        <Button loading={isLoading.value} onClick$={handleLoadingClick}>
          {isLoading.value ? loadingText.value : "Start Process"}
        </Button>

        <Button variant="secondary" loading={isLoading.value} leftIcon>
          <span q:slot="leftIcon">
            <HiArrowDownTrayMini class="h-4 w-4" />
          </span>
          {isLoading.value ? "Downloading..." : "Download"}
        </Button>

        <Button variant="success" loading={isLoading.value} size="lg">
          {isLoading.value ? "Saving changes..." : "Save"}
        </Button>
      </div>
    </div>
  );
});

export const ButtonStateTransitionsExample = component$(() => {
  const buttonState = useSignal<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const handleSubmit = $(async () => {
    buttonState.value = "loading";

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Randomly succeed or fail
    buttonState.value = Math.random() > 0.5 ? "success" : "error";

    // Reset after 2 seconds
    setTimeout(() => {
      buttonState.value = "idle";
    }, 2000);
  });

  const getButtonProps = () => {
    switch (buttonState.value) {
      case "loading":
        return { variant: "primary" as const, loading: true };
      case "success":
        return { variant: "success" as const, leftIcon: true };
      case "error":
        return { variant: "error" as const, leftIcon: true };
      default:
        return { variant: "primary" as const };
    }
  };

  const getButtonContent = () => {
    switch (buttonState.value) {
      case "loading":
        return "Processing...";
      case "success":
        return (
          <>
            <span q:slot="leftIcon">
              <HiCheckCircleOutline class="h-4 w-4" />
            </span>
            Success!
          </>
        );
      case "error":
        return (
          <>
            <span q:slot="leftIcon">
              <HiXCircleOutline class="h-4 w-4" />
            </span>
            Failed! Try again
          </>
        );
      default:
        return "Submit Form";
    }
  };

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">State Transitions</h3>
      <div class="flex gap-4">
        <Button
          {...getButtonProps()}
          onClick$={handleSubmit}
          disabled={buttonState.value === "loading"}
        >
          {getButtonContent()}
        </Button>
      </div>
    </div>
  );
});

export const ToggleButtonExample = component$(() => {
  const isToggled = useSignal(false);
  const isFavorite = useSignal(false);
  const notificationEnabled = useSignal(true);

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Toggle Buttons</h3>
      <div class="flex flex-wrap gap-4">
        <Button
          variant={isToggled.value ? "primary" : "outline"}
          onClick$={() => (isToggled.value = !isToggled.value)}
          leftIcon
        >
          <span q:slot="leftIcon">
            <HiSparklesOutline class="h-4 w-4" />
          </span>
          {isToggled.value ? "Enabled" : "Disabled"}
        </Button>

        <Button
          variant={isFavorite.value ? "error" : "ghost"}
          onClick$={() => (isFavorite.value = !isFavorite.value)}
          leftIcon
          aria-label={
            isFavorite.value ? "Remove from favorites" : "Add to favorites"
          }
        >
          <span q:slot="leftIcon">
            <HiHeartOutline
              class={`h-4 w-4 ${isFavorite.value ? "fill-current" : ""}`}
            />
          </span>
          {isFavorite.value ? "Favorited" : "Favorite"}
        </Button>

        <Button
          variant={notificationEnabled.value ? "info" : "secondary"}
          onClick$={() =>
            (notificationEnabled.value = !notificationEnabled.value)
          }
          size="sm"
        >
          Notifications: {notificationEnabled.value ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  );
});

export const CompoundButtonExample = component$(() => {
  const cartCount = useSignal(0);
  const unreadMessages = useSignal(5);
  const pendingUpdates = useSignal(3);

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Compound Buttons with Badges</h3>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" rightIcon onClick$={() => cartCount.value++}>
          Add to Cart
          <span q:slot="rightIcon" class="flex items-center">
            <HiShoppingCartOutline class="h-4 w-4" />
            {cartCount.value > 0 && (
              <span class="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary-600">
                {cartCount.value}
              </span>
            )}
          </span>
        </Button>

        <Button variant="outline" class="relative">
          Messages
          {unreadMessages.value > 0 && (
            <span class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-error-600 text-xs font-bold text-white">
              {unreadMessages.value}
            </span>
          )}
        </Button>

        <Button variant="secondary" fullWidth responsive>
          <span class="flex w-full items-center justify-between">
            <span>System Updates</span>
            {pendingUpdates.value > 0 && (
              <span class="ml-2 rounded-full bg-warning-200 px-2 py-0.5 text-xs font-medium text-warning-900">
                {pendingUpdates.value} pending
              </span>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
});

export const AnimatedStateTransitionExample = component$(() => {
  const isProcessing = useSignal(false);
  const progress = useSignal(0);

  const handleAnimatedAction = $(async () => {
    isProcessing.value = true;
    progress.value = 0;

    // Simulate progress
    const interval = setInterval(() => {
      progress.value += 10;
      if (progress.value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          isProcessing.value = false;
          progress.value = 0;
        }, 500);
      }
    }, 200);
  });

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Animated State Transitions</h3>
      <div class="flex flex-wrap gap-4">
        <Button
          variant={isProcessing.value ? "secondary" : "primary"}
          onClick$={handleAnimatedAction}
          disabled={isProcessing.value}
          class="relative overflow-hidden transition-all duration-300"
        >
          <span class="relative z-10">
            {isProcessing.value ? `${progress.value}%` : "Start Process"}
          </span>
          {isProcessing.value && (
            <span
              class="absolute bottom-0 left-0 h-full bg-primary-600 transition-all duration-200"
              style={{
                width: `${progress.value}%`,
              }}
            />
          )}
        </Button>

        <Button
          variant="outline"
          class={`transform transition-all duration-300 ${
            isProcessing.value ? "scale-105 shadow-lg" : ""
          }`}
        >
          {isProcessing.value ? "Processing..." : "Hover Effect"}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          ripple
          class="transition-all duration-300 hover:shadow-xl"
        >
          Enhanced Ripple
        </Button>
      </div>
    </div>
  );
});

export const AllAdvancedStatesExample = component$(() => {
  return (
    <div class="space-y-8">
      <ComplexLoadingStatesExample />
      <ButtonStateTransitionsExample />
      <ToggleButtonExample />
      <CompoundButtonExample />
      <AnimatedStateTransitionExample />
    </div>
  );
});
