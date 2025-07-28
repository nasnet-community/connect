import { component$, useSignal } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
} from "../index";

export const TimelineThemes = component$(() => {
  const currentTheme = useSignal("default");

  const themes = {
    default: {
      name: "Default",
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      background: "bg-white dark:bg-gray-900",
      border: "border-gray-200 dark:border-gray-700",
      text: "text-gray-900 dark:text-white",
      subtext: "text-gray-600 dark:text-gray-400",
    },
    ocean: {
      name: "Ocean",
      colors: ["#0ea5e9", "#06b6d4", "#0891b2", "#0e7490"],
      background: "bg-blue-50 dark:bg-blue-950",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-900 dark:text-blue-100",
      subtext: "text-blue-700 dark:text-blue-300",
    },
    forest: {
      name: "Forest",
      colors: ["#22c55e", "#16a34a", "#15803d", "#166534"],
      background: "bg-green-50 dark:bg-green-950",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-900 dark:text-green-100",
      subtext: "text-green-700 dark:text-green-300",
    },
    sunset: {
      name: "Sunset",
      colors: ["#f97316", "#ea580c", "#dc2626", "#b91c1c"],
      background: "bg-orange-50 dark:bg-orange-950",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-900 dark:text-orange-100",
      subtext: "text-orange-700 dark:text-orange-300",
    },
    purple: {
      name: "Purple",
      colors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"],
      background: "bg-purple-50 dark:bg-purple-950",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-900 dark:text-purple-100",
      subtext: "text-purple-700 dark:text-purple-300",
    },
  };

  const events = [
    {
      title: "Project Kickoff",
      description: "Initial project planning and team setup",
      date: "March 1, 2024",
      status: "completed",
    },
    {
      title: "Design Phase",
      description: "UI/UX design and prototyping",
      date: "March 8, 2024",
      status: "completed",
    },
    {
      title: "Development",
      description: "Core feature implementation",
      date: "March 15, 2024",
      status: "in-progress",
    },
    {
      title: "Testing & Launch",
      description: "Quality assurance and deployment",
      date: "March 25, 2024",
      status: "pending",
    },
  ];

  const selectedTheme = themes[currentTheme.value as keyof typeof themes];

  return (
    <div class="space-y-8">
      {/* Theme Selector */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline Theme Variations
        </h3>
        <div class="mb-6 flex flex-wrap gap-2">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick$={() => (currentTheme.value = key)}
              class={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                currentTheme.value === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Themed Timeline */}
      <div
        class={`rounded-xl p-6 ${selectedTheme.background} ${selectedTheme.border} border`}
      >
        <h4 class={`mb-4 text-lg font-semibold ${selectedTheme.text}`}>
          {selectedTheme.name} Theme Timeline
        </h4>
        <Timeline>
          {events.map((event, index) => (
            <TimelineItem
              key={event.title}
              isLast={index === events.length - 1}
            >
              <TimelineDot
                size="md"
                color={selectedTheme.colors[index]}
                variant="filled"
                icon={
                  event.status === "completed" ? (
                    <svg
                      class="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : event.status === "in-progress" ? (
                    <div class="h-3 w-3 animate-pulse rounded-full bg-white" />
                  ) : (
                    <div class="h-3 w-3 rounded-full border-2 border-white" />
                  )
                }
              />
              <TimelineContent>
                <div class="ml-4">
                  <h5 class={`text-base font-medium ${selectedTheme.text}`}>
                    {event.title}
                  </h5>
                  <p class={`mt-1 text-sm ${selectedTheme.subtext}`}>
                    {event.description}
                  </p>
                  <p class={`mt-2 text-xs ${selectedTheme.subtext}`}>
                    {event.date}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {/* Light vs Dark Theme Comparison */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Light vs Dark Theme Comparison
        </h3>
        <div class="grid gap-6 lg:grid-cols-2">
          {/* Light Theme */}
          <div class="rounded-xl border border-gray-200 bg-white p-6">
            <h4 class="mb-4 text-lg font-semibold text-gray-900">
              Light Theme
            </h4>
            <Timeline>
              {events.slice(0, 3).map((event, index) => (
                <TimelineItem key={event.title} isLast={index === 2}>
                  <TimelineDot
                    size="sm"
                    color={["#3b82f6", "#10b981", "#f59e0b"][index]}
                    variant="filled"
                  />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="text-sm font-medium text-gray-900">
                        {event.title}
                      </h5>
                      <p class="mt-1 text-xs text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>

          {/* Dark Theme */}
          <div class="rounded-xl border border-gray-700 bg-gray-900 p-6">
            <h4 class="mb-4 text-lg font-semibold text-white">Dark Theme</h4>
            <div class="space-y-4">
              {events.slice(0, 3).map((event, index) => (
                <div key={event.title} class="flex items-start gap-3">
                  <div class="flex flex-col items-center">
                    <div
                      class="flex h-6 w-6 items-center justify-center rounded-full"
                      style={`background-color: ${["#3b82f6", "#10b981", "#f59e0b"][index]}`}
                    />
                    {index < 2 && <div class="mt-2 h-12 w-0.5 bg-gray-700" />}
                  </div>
                  <div class="flex-1">
                    <h5 class="text-sm font-medium text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-xs text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Timeline Theme */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Gradient Timeline Theme
        </h3>
        <div class="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:from-purple-950 dark:to-pink-950">
          <Timeline>
            {events.map((event, index) => (
              <TimelineItem
                key={event.title}
                isLast={index === events.length - 1}
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
                  style={`background: linear-gradient(135deg, ${
                    [
                      "#ec4899, #8b5cf6",
                      "#8b5cf6, #3b82f6",
                      "#3b82f6, #06b6d4",
                      "#06b6d4, #10b981",
                    ][index]
                  })`}
                >
                  <span class="text-sm font-bold text-white">{index + 1}</span>
                </div>
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {event.description}
                    </p>
                    <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      {/* High Contrast Theme */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          High Contrast Theme
        </h3>
        <div class="rounded-xl border-2 border-black bg-white p-6 dark:border-white dark:bg-black">
          <Timeline>
            {events.slice(0, 3).map((event, index) => (
              <TimelineItem key={event.title} isLast={index === 2}>
                <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white dark:border-white dark:bg-black">
                  <div class="h-4 w-4 rounded-full bg-black dark:bg-white" />
                </div>
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-base font-bold text-black dark:text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {event.description}
                    </p>
                    <p class="mt-2 text-xs font-bold text-black dark:text-white">
                      {event.date}
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      {/* Brand Color Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Brand Color Themes
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          {/* Primary Brand */}
          <div class="rounded-xl bg-blue-600 p-6">
            <h4 class="mb-4 text-lg font-semibold text-white">Primary Brand</h4>
            <Timeline>
              {events.slice(0, 3).map((event, index) => (
                <TimelineItem key={event.title} isLast={index === 2}>
                  <TimelineDot size="sm" color="white" variant="filled" />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="text-sm font-medium text-white">
                        {event.title}
                      </h5>
                      <p class="mt-1 text-xs text-blue-100">
                        {event.description}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>

          {/* Secondary Brand */}
          <div class="rounded-xl bg-emerald-600 p-6">
            <h4 class="mb-4 text-lg font-semibold text-white">
              Secondary Brand
            </h4>
            <Timeline>
              {events.slice(0, 3).map((event, index) => (
                <TimelineItem key={event.title} isLast={index === 2}>
                  <TimelineDot size="sm" color="white" variant="filled" />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="text-sm font-medium text-white">
                        {event.title}
                      </h5>
                      <p class="mt-1 text-xs text-emerald-100">
                        {event.description}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </div>

      {/* Custom CSS Theme */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Custom CSS Theme
        </h3>
        <div class="custom-timeline rounded-xl border border-gray-200 p-6 dark:border-gray-700">
          <Timeline>
            {events.slice(0, 3).map((event, index) => (
              <TimelineItem key={event.title} isLast={index === 2}>
                <div class="timeline-dot-custom">
                  <div class="timeline-dot-inner" />
                </div>
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="timeline-title">{event.title}</h5>
                    <p class="timeline-description">{event.description}</p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      <style>
        {`
          .custom-timeline {
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
          }
          
          .dark .custom-timeline {
            background: linear-gradient(45deg, #374151, #1f2937);
          }
          
          .timeline-dot-custom {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            animation: pulse-glow 2s infinite;
          }
          
          .timeline-dot-inner {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            animation: inner-pulse 2s infinite;
          }
          
          .timeline-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          
          .dark .timeline-title {
            color: #f9fafb;
          }
          
          .timeline-description {
            margin-top: 4px;
            font-size: 14px;
            color: #6b7280;
            font-style: italic;
          }
          
          .dark .timeline-description {
            color: #9ca3af;
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            50% {
              box-shadow: 0 4px 20px rgba(102, 126, 234, 0.8);
            }
          }
          
          @keyframes inner-pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </div>
  );
});
