import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
} from "../index";

export const TimelineResponsive = component$(() => {
  const isMobile = useSignal(false);
  const screenWidth = useSignal(0);

  useVisibleTask$(() => {
    const updateScreenSize = () => {
      screenWidth.value = window.innerWidth;
      isMobile.value = window.innerWidth < 768;
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  });

  const events = [
    {
      id: 1,
      title: "Project Initialization",
      description: "Set up the development environment and initial project structure",
      date: "March 1, 2024",
      time: "09:00 AM",
      color: "#3b82f6",
      status: "completed",
      details: "Created repository, configured CI/CD pipeline, and set up development tools"
    },
    {
      id: 2,
      title: "Requirements Analysis",
      description: "Gathered and analyzed all project requirements",
      date: "March 5, 2024",
      time: "02:30 PM",
      color: "#10b981",
      status: "completed",
      details: "Conducted stakeholder interviews and documented functional requirements"
    },
    {
      id: 3,
      title: "Design Phase",
      description: "Created wireframes and design mockups",
      date: "March 12, 2024",
      time: "11:15 AM",
      color: "#f59e0b",
      status: "in-progress",
      details: "Working on user interface designs and user experience flows"
    },
    {
      id: 4,
      title: "Development Sprint 1",
      description: "Implementation of core features",
      date: "March 20, 2024",
      time: "09:00 AM",
      color: "#8b5cf6",
      status: "pending",
      details: "Scheduled to begin implementation of primary application features"
    }
  ];

  return (
    <div class="space-y-8">
      {/* Responsive Timeline Layout */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Timeline Layout
        </h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Current screen width: {screenWidth.value}px ({isMobile.value ? "Mobile" : "Desktop"} view)
        </p>
        
        {isMobile.value ? (
          // Mobile Layout: Vertical, compact
          <div class="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} class="relative">
                {/* Mobile Timeline Item */}
                <div class="flex items-start gap-3">
                  {/* Dot and Connector */}
                  <div class="flex flex-col items-center">
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm"
                      style={`background-color: ${event.color}`}
                    >
                      {event.status === "completed" && (
                        <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      )}
                      {event.status === "in-progress" && (
                        <div class="h-2 w-2 rounded-full bg-white animate-pulse" />
                      )}
                      {event.status === "pending" && (
                        <div class="h-2 w-2 rounded-full border border-white" />
                      )}
                    </div>
                    {index < events.length - 1 && (
                      <div class="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div class="flex-1 min-w-0 pb-8">
                    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                      <h4 class="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                      <div class="mt-2 flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Layout: More spacious
          <Timeline>
            {events.map((event, index) => (
              <TimelineItem key={event.id} isLast={index === events.length - 1}>
                <TimelineDot
                  size="md"
                  color={event.color}
                  variant="filled"
                  icon={
                    event.status === "completed" ? (
                      <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : event.status === "in-progress" ? (
                      <div class="h-3 w-3 rounded-full bg-white animate-pulse" />
                    ) : (
                      <div class="h-3 w-3 rounded-full border-2 border-white" />
                    )
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </h4>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {event.description}
                        </p>
                        <p class="mt-2 text-sm text-gray-800 dark:text-gray-200">
                          {event.details}
                        </p>
                      </div>
                      <div class="ml-4 text-right text-sm text-gray-500 dark:text-gray-400">
                        <div>{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </div>

      {/* Responsive Horizontal Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Horizontal Timeline
        </h3>
        {isMobile.value ? (
          // Mobile: Stack horizontally with scroll
          <div class="overflow-x-auto pb-4">
            <div class="flex gap-4" style="min-width: 800px">
              {events.slice(0, 3).map((event, index) => (
                <div key={event.id} class="flex flex-col items-center text-center" style="min-width: 200px">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-lg"
                    style={`background-color: ${event.color}`}
                  >
                    <span class="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                  {index < 2 && (
                    <div class="absolute mt-6 w-32 border-t-2 border-dashed border-gray-300 dark:border-gray-600" style="margin-left: 50%" />
                  )}
                  <div class="mt-4 max-w-48">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop: Full horizontal layout
          <div class="relative">
            <div class="flex justify-between">
              {events.map((event, index) => (
                <div key={event.id} class="flex flex-col items-center text-center">
                  <div
                    class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg"
                    style={`background-color: ${event.color}`}
                  >
                    {event.status === "completed" ? (
                      <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span class="text-lg font-bold text-white">{index + 1}</span>
                    )}
                  </div>
                  <div class="mt-4 max-w-64">
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Connecting Line */}
            <div class="absolute top-8 left-8 right-8 h-0.5 bg-gray-300 dark:bg-gray-600" style="z-index: -1" />
          </div>
        )}
      </div>

      {/* Responsive Grid Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Grid Timeline
        </h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              class="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Status Indicator */}
              <div class="absolute -left-2 -top-2">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm"
                  style={`background-color: ${event.color}`}
                >
                  {event.status === "completed" && (
                    <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                  {event.status === "in-progress" && (
                    <div class="h-2 w-2 rounded-full bg-white animate-pulse" />
                  )}
                  {event.status === "pending" && (
                    <div class="h-2 w-2 rounded-full border border-white" />
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div class="pt-2">
                <h4 class="font-medium text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
                <div class="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{event.date}</span>
                  <span
                    class="rounded-full px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: event.status === "completed" ? "#dcfce7" : 
                                      event.status === "in-progress" ? "#fef3c7" : "#f1f5f9",
                      color: event.status === "completed" ? "#166534" : 
                             event.status === "in-progress" ? "#92400e" : "#475569"
                    }}
                  >
                    {event.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen Size Indicator */}
      <div class="rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Resize your browser window to see responsive timeline behaviors
        </p>
        <div class="mt-2 flex justify-center gap-4 text-xs">
          <span class={isMobile.value ? "font-bold text-blue-600" : "text-gray-500"}>
            Mobile (&lt;768px)
          </span>
          <span class={!isMobile.value ? "font-bold text-blue-600" : "text-gray-500"}>
            Desktop (≥768px)
          </span>
        </div>
      </div>
    </div>
  );
});