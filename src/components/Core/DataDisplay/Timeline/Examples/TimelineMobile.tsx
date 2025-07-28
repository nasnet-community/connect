import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const TimelineMobile = component$(() => {
  const isMobile = useSignal(false);
  const deviceOrientation = useSignal("portrait");
  const touchStartY = useSignal(0);
  const scrollPosition = useSignal(0);

  useVisibleTask$(() => {
    const checkDevice = () => {
      isMobile.value = window.innerWidth < 768;
      deviceOrientation.value =
        window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  });

  const events = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been successfully placed",
      time: "10:30 AM",
      date: "Today",
      status: "completed",
      icon: "🛒",
      details: "Order #12345 for $299.99",
    },
    {
      id: 2,
      title: "Payment Confirmed",
      description: "Payment processed successfully",
      time: "10:32 AM",
      date: "Today",
      status: "completed",
      icon: "💳",
      details: "Visa ending in 4567",
    },
    {
      id: 3,
      title: "Order Processing",
      description: "Your items are being prepared",
      time: "11:15 AM",
      date: "Today",
      status: "in-progress",
      icon: "📦",
      details: "Estimated 2-3 hours",
    },
    {
      id: 4,
      title: "Ready for Pickup",
      description: "Your order is ready for collection",
      time: "2:00 PM",
      date: "Today",
      status: "pending",
      icon: "✅",
      details: "Store location: Main St",
    },
  ];

  return (
    <div class="space-y-8">
      {/* Mobile App-Style Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile App Timeline
        </h3>
        <div class="mx-auto max-w-sm">
          {/* Mobile Header */}
          <div class="rounded-t-xl bg-blue-600 px-4 py-3 text-white">
            <div class="flex items-center justify-between">
              <h4 class="font-medium">Order Status</h4>
              <span class="text-sm opacity-90">Live Updates</span>
            </div>
          </div>

          {/* Timeline Content */}
          <div class="rounded-b-xl border border-t-0 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div class="p-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  class="relative flex items-start gap-3 pb-6 last:pb-0"
                >
                  {/* Mobile Timeline Dot */}
                  <div class="relative flex flex-col items-center">
                    <div
                      class={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg shadow-lg ${
                        event.status === "completed"
                          ? "bg-green-500"
                          : event.status === "in-progress"
                            ? "animate-pulse bg-yellow-500"
                            : "bg-gray-300"
                      }`}
                    >
                      {event.status === "completed" ? "✓" : event.icon}
                    </div>
                    {events.indexOf(event) < events.length - 1 && (
                      <div
                        class={`mt-2 h-12 w-0.5 ${
                          event.status === "completed"
                            ? "bg-green-300"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h5
                          class={`font-medium ${
                            event.status === "completed"
                              ? "text-gray-900 dark:text-white"
                              : event.status === "in-progress"
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {event.title}
                        </h5>
                        <p
                          class={`mt-1 text-sm ${
                            event.status === "completed"
                              ? "text-gray-600 dark:text-gray-300"
                              : event.status === "in-progress"
                                ? "text-gray-600 dark:text-gray-300"
                                : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {event.description}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {event.details}
                        </p>
                      </div>
                      <div class="ml-2 text-right text-xs text-gray-500 dark:text-gray-400">
                        <div>{event.time}</div>
                        <div>{event.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Chat-Style Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Chat-Style Timeline
        </h3>
        <div class="mx-auto max-w-sm space-y-3">
          {events.map((event, eventIndex) => (
            <div
              key={event.id}
              class={`flex items-start gap-3 ${
                eventIndex % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                class={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                  event.status === "completed"
                    ? "bg-green-500"
                    : event.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                }`}
              >
                {event.icon}
              </div>

              {/* Message Bubble */}
              <div
                class={`max-w-xs rounded-2xl px-4 py-2 ${
                  eventIndex % 2 === 0
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                <h5 class="font-medium">{event.title}</h5>
                <p
                  class={`text-sm ${
                    eventIndex % 2 === 0
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-blue-100"
                  }`}
                >
                  {event.description}
                </p>
                <p
                  class={`mt-1 text-xs ${
                    eventIndex % 2 === 0
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-blue-200"
                  }`}
                >
                  {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipeable Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Swipeable Timeline Cards
        </h3>
        <div class="mx-auto max-w-sm">
          <p class="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            ← Swipe cards left or right →
          </p>
          <div class="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                class="swipeable-card cursor-grab active:cursor-grabbing"
                onTouchStart$={(e) => {
                  touchStartY.value = e.touches[0].clientY;
                }}
                onTouchMove$={(e) => {
                  const touchY = e.touches[0].clientY;
                  const deltaY = touchStartY.value - touchY;
                  scrollPosition.value = deltaY;
                }}
              >
                <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <div
                      class={`flex h-12 w-12 items-center justify-center rounded-full text-lg ${
                        event.status === "completed"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                          : event.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {event.icon}
                    </div>
                    <div class="flex-1">
                      <h5 class="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                    </div>
                    <div class="text-right text-xs text-gray-500 dark:text-gray-400">
                      <div>{event.time}</div>
                      <div>{event.date}</div>
                    </div>
                  </div>

                  {/* Progress bar for mobile */}
                  <div class="mt-3">
                    <div class="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        class={`h-full transition-all duration-300 ${
                          event.status === "completed"
                            ? "w-full bg-green-500"
                            : event.status === "in-progress"
                              ? "w-2/3 bg-yellow-500"
                              : "w-1/3 bg-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Pull-to-Refresh Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Pull-to-Refresh Timeline
        </h3>
        <div class="mx-auto max-w-sm">
          <div class="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            {/* Pull indicator */}
            <div class="flex items-center justify-center py-4 text-gray-400">
              <svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span class="ml-2 text-sm">Pull to refresh...</span>
            </div>

            {/* Timeline content */}
            <div class="max-h-80 overflow-y-auto px-4 pb-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  class="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800"
                >
                  <div
                    class={`mt-1 h-3 w-3 rounded-full ${
                      event.status === "completed"
                        ? "bg-green-500"
                        : event.status === "in-progress"
                          ? "animate-pulse bg-yellow-500"
                          : "bg-gray-300"
                    }`}
                  />
                  <div class="min-w-0 flex-1">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">
                      {event.time} • {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Bottom Sheet Timeline
        </h3>
        <div class="mx-auto max-w-sm">
          {/* Trigger button */}
          <button class="w-full rounded-lg bg-blue-600 py-3 font-medium text-white">
            View Timeline Details
          </button>

          {/* Bottom sheet simulation */}
          <div class="mt-4 rounded-t-xl border border-b-0 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            {/* Handle */}
            <div class="flex justify-center py-2">
              <div class="h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Content */}
            <div class="px-4 pb-4">
              <h5 class="mb-3 font-medium text-gray-900 dark:text-white">
                Recent Activity
              </h5>
              <div class="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    class="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <div class="text-xl">{event.icon}</div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {event.time}
                      </p>
                    </div>
                    <div
                      class={`h-2 w-2 rounded-full ${
                        event.status === "completed"
                          ? "bg-green-500"
                          : event.status === "in-progress"
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div class="rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Device: {isMobile.value ? "Mobile" : "Desktop"} | Orientation:{" "}
          {deviceOrientation.value}
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
          Optimized for touch interactions and mobile gestures
        </p>
      </div>

      <style>
        {`
          .swipeable-card {
            touch-action: pan-x;
            transition: transform 0.3s ease;
          }
          
          .swipeable-card:active {
            transform: scale(0.98);
          }
          
          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .swipeable-card {
              transform: translateX(0);
            }
            
            .swipeable-card:hover {
              transform: translateX(5px);
            }
          }
          
          /* Touch feedback */
          .swipeable-card:active {
            background-color: rgba(59, 130, 246, 0.1);
          }
        `}
      </style>
    </div>
  );
});
