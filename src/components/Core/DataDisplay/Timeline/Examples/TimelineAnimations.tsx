import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
} from "../index";

export const TimelineAnimations = component$(() => {
  const currentStep = useSignal(0);
  const isAutoPlaying = useSignal(false);

  const events = [
    {
      title: "Project Initiation",
      description: "Project requirements and planning phase",
      date: "Week 1",
      icon: "🚀",
    },
    {
      title: "Design & Architecture",
      description: "System design and technical architecture",
      date: "Week 2-3",
      icon: "🎨",
    },
    {
      title: "Development Phase",
      description: "Core feature implementation and testing",
      date: "Week 4-8",
      icon: "⚡",
    },
    {
      title: "Quality Assurance",
      description: "Testing, bug fixes, and optimization",
      date: "Week 9-10",
      icon: "🔍",
    },
    {
      title: "Deployment",
      description: "Production deployment and monitoring",
      date: "Week 11",
      icon: "🎯",
    },
  ];

  // Auto-play animation
  useTask$(({ track, cleanup }) => {
    track(() => isAutoPlaying.value);

    if (isAutoPlaying.value) {
      const interval = setInterval(() => {
        currentStep.value = (currentStep.value + 1) % events.length;
      }, 2000);

      cleanup(() => clearInterval(interval));
    }
  });

  return (
    <div class="space-y-8">
      {/* Animation Controls */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline Animation Controls
        </h3>
        <div class="flex flex-wrap gap-2">
          <button
            onClick$={() => {
              isAutoPlaying.value = !isAutoPlaying.value;
              if (!isAutoPlaying.value) currentStep.value = 0;
            }}
            class={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isAutoPlaying.value
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isAutoPlaying.value ? "Stop Auto-Play" : "Start Auto-Play"}
          </button>
          <button
            onClick$={() =>
              (currentStep.value = Math.max(0, currentStep.value - 1))
            }
            disabled={currentStep.value === 0}
            class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick$={() =>
              (currentStep.value = Math.min(
                events.length - 1,
                currentStep.value + 1,
              ))
            }
            disabled={currentStep.value === events.length - 1}
            class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
          <button
            onClick$={() => (currentStep.value = 0)}
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Current Step: {currentStep.value + 1} of {events.length}
        </p>
      </div>

      {/* Animated Progressive Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Progressive Animation Timeline
        </h3>
        <Timeline>
          {events.map((event, index) => {
            const isActive = index <= currentStep.value;
            const isCurrent = index === currentStep.value;

            return (
              <TimelineItem
                key={event.title}
                isLast={index === events.length - 1}
              >
                <div
                  class={`timeline-dot-animated ${
                    isActive ? "active" : "inactive"
                  } ${isCurrent ? "current" : ""}`}
                  style={`animation-delay: ${index * 0.2}s`}
                >
                  <div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gray-300 text-lg shadow-lg transition-all duration-500 dark:border-gray-800">
                    {isActive ? event.icon : "⏳"}
                  </div>
                </div>
                <TimelineContent>
                  <div
                    class={`ml-4 transition-all duration-500 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-50"
                    }`}
                    style={`animation-delay: ${index * 0.2 + 0.3}s`}
                  >
                    <h5
                      class={`text-base font-medium transition-colors ${
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {event.title}
                    </h5>
                    <p
                      class={`mt-1 text-sm transition-colors ${
                        isActive
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {event.description}
                    </p>
                    <p
                      class={`mt-2 text-xs transition-colors ${
                        isActive
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {event.date}
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>

      {/* Pulse Animation Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Pulsing Timeline
        </h3>
        <Timeline>
          {events.slice(0, 3).map((event, index) => (
            <TimelineItem key={event.title} isLast={index === 2}>
              <div class="pulse-timeline-dot">
                <div class="pulse-rings">
                  <div class="pulse-ring" />
                  <div class="pulse-ring" />
                  <div class="pulse-ring" />
                </div>
                <div class="pulse-center" />
              </div>
              <TimelineContent>
                <div class="ml-4">
                  <h5 class="text-base font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h5>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {/* Slide-in Animation Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Slide-in Animation Timeline
        </h3>
        <div class="slide-timeline">
          <Timeline>
            {events.slice(0, 3).map((event, index) => (
              <TimelineItem key={event.title} isLast={index === 2}>
                <div
                  class="slide-dot"
                  style={`animation-delay: ${index * 0.3}s`}
                >
                  <TimelineDot
                    size="md"
                    color={["#3b82f6", "#10b981", "#f59e0b"][index]}
                    variant="filled"
                  />
                </div>
                <TimelineContent>
                  <div
                    class="slide-content ml-4"
                    style={`animation-delay: ${index * 0.3 + 0.2}s`}
                  >
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      {/* Rotating Icon Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Rotating Icon Timeline
        </h3>
        <Timeline>
          {events.slice(0, 3).map((event, index) => (
            <TimelineItem key={event.title} isLast={index === 2}>
              <div class="rotating-icon-container">
                <div
                  class="rotating-icon"
                  style={`animation-delay: ${index * 0.5}s`}
                >
                  <svg
                    class="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <TimelineContent>
                <div class="ml-4">
                  <h5 class="text-base font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h5>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      {/* Bouncing Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Bouncing Timeline
        </h3>
        <Timeline>
          {events.slice(0, 3).map((event, index) => (
            <TimelineItem key={event.title} isLast={index === 2}>
              <div
                class="bouncing-dot"
                style={`animation-delay: ${index * 0.4}s`}
              >
                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg" />
              </div>
              <TimelineContent>
                <div class="ml-4">
                  <h5 class="text-base font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h5>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      <style>
        {`
          .timeline-dot-animated {
            position: relative;
          }
          
          .timeline-dot-animated.inactive {
            opacity: 0.3;
            transform: scale(0.8);
          }
          
          .timeline-dot-animated.active {
            opacity: 1;
            transform: scale(1);
            animation: fadeInScale 0.6s ease-out forwards;
          }
          
          .timeline-dot-animated.current {
            animation: currentPulse 2s infinite;
          }
          
          .timeline-dot-animated.active > div {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: #667eea;
          }
          
          .pulse-timeline-dot {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .pulse-rings {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          .pulse-ring {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 2px solid #3b82f6;
            border-radius: 50%;
            opacity: 0;
            animation: pulseRing 2s infinite;
          }
          
          .pulse-ring:nth-child(2) {
            animation-delay: 0.5s;
          }
          
          .pulse-ring:nth-child(3) {
            animation-delay: 1s;
          }
          
          .pulse-center {
            width: 16px;
            height: 16px;
            background-color: #3b82f6;
            border-radius: 50%;
            z-index: 10;
          }
          
          .slide-timeline {
            overflow: hidden;
          }
          
          .slide-dot {
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
            transform: translateX(-50px);
          }
          
          .slide-content {
            animation: slideInRight 0.8s ease-out forwards;
            opacity: 0;
            transform: translateX(50px);
          }
          
          .rotating-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .rotating-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: rotateIcon 3s linear infinite;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
          
          .bouncing-dot {
            animation: bounce 2s infinite;
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes currentPulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
            }
            50% {
              box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
            }
          }
          
          @keyframes pulseRing {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.5);
            }
          }
          
          @keyframes slideInLeft {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes rotateIcon {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </div>
  );
});
