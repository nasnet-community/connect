import { component$ } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
} from "../index";

export const TimelineSizes = component$(() => {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div class="space-y-8">
      {/* Timeline Dot Sizes */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline Dot Sizes
        </h3>
        <div class="grid gap-8 md:grid-cols-3">
          {sizes.map((size) => (
            <div key={size}>
              <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Size: {size.toUpperCase()}
              </h4>
              <Timeline>
                <TimelineItem>
                  <TimelineDot size={size} color="#3b82f6" variant="filled" />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="font-medium text-gray-900 dark:text-white">
                        First Event
                      </h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        This timeline uses {size} sized dots
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineDot size={size} color="#10b981" variant="filled" />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="font-medium text-gray-900 dark:text-white">
                        Second Event
                      </h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Consistent sizing throughout
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem isLast>
                  <TimelineDot size={size} color="#f59e0b" variant="filled" />
                  <TimelineContent>
                    <div class="ml-4">
                      <h5 class="font-medium text-gray-900 dark:text-white">
                        Final Event
                      </h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Last item in timeline
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline with Icons - Different Sizes */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline with Icons - Various Sizes
        </h3>
        <div class="grid gap-8 lg:grid-cols-2">
          {/* Small Timeline with Icons */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Small Timeline with Icons
            </h4>
            <Timeline>
              <TimelineItem>
                <TimelineDot
                  size="sm"
                  color="#3b82f6"
                  variant="filled"
                  icon={
                    <svg
                      class="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                      Task Completed
                    </h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Small compact timeline item
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineDot
                  size="sm"
                  color="#f59e0b"
                  variant="filled"
                  icon={
                    <svg
                      class="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" />
                    </svg>
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                      Home Visit
                    </h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Compact timeline design
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem isLast>
                <TimelineDot
                  size="sm"
                  color="#ef4444"
                  variant="filled"
                  icon={
                    <svg
                      class="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                    </svg>
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                      Issue Reported
                    </h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Final timeline item
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

          {/* Large Timeline with Icons */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Large Timeline with Icons
            </h4>
            <Timeline>
              <TimelineItem>
                <TimelineDot
                  size="lg"
                  color="#3b82f6"
                  variant="filled"
                  icon={
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
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      Project Started
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Large timeline with prominent icons
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineDot
                  size="lg"
                  color="#10b981"
                  variant="filled"
                  icon={
                    <svg
                      class="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      Requirements Gathered
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Detailed planning phase completed
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem isLast>
                <TimelineDot
                  size="lg"
                  color="#8b5cf6"
                  variant="filled"
                  icon={
                    <svg
                      class="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  }
                />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-base font-medium text-gray-900 dark:text-white">
                      Quality Assurance
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Final testing and approval
                    </p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>

      {/* Timeline Content Sizes */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline Content Sizes
        </h3>
        <div class="space-y-8">
          {/* Compact Content */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Compact Content
            </h4>
            <Timeline>
              <TimelineItem>
                <TimelineDot size="sm" color="#6366f1" variant="filled" />
                <TimelineContent>
                  <div class="ml-4">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      Quick update
                    </span>
                    <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      2 mins ago
                    </span>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineDot size="sm" color="#06b6d4" variant="filled" />
                <TimelineContent>
                  <div class="ml-4">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      Status change
                    </span>
                    <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      5 mins ago
                    </span>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem isLast>
                <TimelineDot size="sm" color="#84cc16" variant="filled" />
                <TimelineContent>
                  <div class="ml-4">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      Task completed
                    </span>
                    <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      1 hour ago
                    </span>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

          {/* Detailed Content */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Detailed Content
            </h4>
            <Timeline>
              <TimelineItem>
                <TimelineDot size="md" color="#3b82f6" variant="filled" />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Major Milestone Reached
                    </h5>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      We successfully completed the first phase of the project,
                      including all deliverables and quality checks.
                    </p>
                    <div class="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>by John Doe</span>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem isLast>
                <TimelineDot size="md" color="#10b981" variant="filled" />
                <TimelineContent>
                  <div class="ml-4">
                    <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Project Kickoff
                    </h5>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Initial project meeting with all stakeholders to align on
                      goals, timeline, and expectations.
                    </p>
                    <div class="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <h6 class="text-sm font-medium text-gray-900 dark:text-white">
                        Meeting Notes:
                      </h6>
                      <ul class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        <li>• Defined project scope and objectives</li>
                        <li>• Established communication channels</li>
                        <li>• Set up development environment</li>
                      </ul>
                    </div>
                    <div class="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>March 1, 2024</span>
                      <span>•</span>
                      <span>by Project Team</span>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
});
