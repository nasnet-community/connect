import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
} from "../index";

export const TimelineInteractive = component$(() => {
  const selectedEvent = useSignal<number | null>(null);
  const expandedEvents = useSignal<number[]>([]);
  const filterStatus = useSignal("all");
  const timelineMode = useSignal("vertical");

  const events = useStore([
    {
      id: 1,
      title: "Project Kickoff",
      description: "Initial project planning and team formation",
      date: "2024-03-01",
      time: "09:00 AM",
      status: "completed",
      priority: "high",
      assignee: "John Doe",
      tags: ["planning", "meeting"],
      details:
        "Comprehensive project initiation meeting with all stakeholders. Defined project scope, objectives, and success metrics. Established communication protocols and project governance structure.",
      attachments: ["project-charter.pdf", "stakeholder-matrix.xlsx"],
    },
    {
      id: 2,
      title: "Requirements Gathering",
      description: "Collect and document all project requirements",
      date: "2024-03-05",
      time: "02:00 PM",
      status: "completed",
      priority: "high",
      assignee: "Jane Smith",
      tags: ["requirements", "analysis"],
      details:
        "Conducted stakeholder interviews and workshops to gather functional and non-functional requirements. Created user stories and acceptance criteria.",
      attachments: ["requirements-doc.pdf", "user-stories.md"],
    },
    {
      id: 3,
      title: "System Design",
      description: "Create system architecture and design documents",
      date: "2024-03-12",
      time: "10:30 AM",
      status: "in-progress",
      priority: "high",
      assignee: "Mike Johnson",
      tags: ["design", "architecture"],
      details:
        "Working on system architecture diagrams, database design, and API specifications. Review and refinement ongoing.",
      attachments: ["architecture-draft.pdf"],
    },
    {
      id: 4,
      title: "Development Sprint 1",
      description: "Implement core features and functionality",
      date: "2024-03-18",
      time: "09:00 AM",
      status: "pending",
      priority: "medium",
      assignee: "Development Team",
      tags: ["development", "coding"],
      details:
        "First development sprint focusing on core application features. Will include user authentication, basic CRUD operations, and initial UI components.",
      attachments: [],
    },
    {
      id: 5,
      title: "Testing Phase",
      description: "Quality assurance and testing",
      date: "2024-03-25",
      time: "01:00 PM",
      status: "pending",
      priority: "medium",
      assignee: "QA Team",
      tags: ["testing", "qa"],
      details:
        "Comprehensive testing including unit tests, integration tests, and user acceptance testing.",
      attachments: [],
    },
  ]);

  const filteredEvents = events.filter(
    (event) =>
      filterStatus.value === "all" || event.status === filterStatus.value,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "pending":
        return "#6b7280";
      default:
        return "#3b82f6";
    }
  };


  const toggleExpanded = $((eventId: number) => {
    if (expandedEvents.value.includes(eventId)) {
      expandedEvents.value = expandedEvents.value.filter(
        (id) => id !== eventId,
      );
    } else {
      expandedEvents.value = [...expandedEvents.value, eventId];
    }
  });

  const updateEventStatus = $((eventId: number, newStatus: string) => {
    const eventIndex = events.findIndex((e) => e.id === eventId);
    if (eventIndex !== -1) {
      events[eventIndex].status = newStatus;
    }
  });

  return (
    <div class="space-y-8">
      {/* Interactive Controls */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Timeline Controls
        </h3>
        <div class="flex flex-wrap gap-4">
          {/* Status Filter */}
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Status:
            </label>
            <select
              value={filterStatus.value}
              onChange$={(e) =>
                (filterStatus.value = (e.target as HTMLSelectElement).value)
              }
              class="rounded-lg border border-gray-300 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Timeline Mode */}
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mode:
            </label>
            <button
              onClick$={() =>
                (timelineMode.value =
                  timelineMode.value === "vertical" ? "horizontal" : "vertical")
              }
              class="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {timelineMode.value === "vertical"
                ? "Switch to Horizontal"
                : "Switch to Vertical"}
            </button>
          </div>

          {/* Expand All */}
          <button
            onClick$={() => {
              if (expandedEvents.value.length === filteredEvents.length) {
                expandedEvents.value = [];
              } else {
                expandedEvents.value = filteredEvents.map((e) => e.id);
              }
            }}
            class="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {expandedEvents.value.length === filteredEvents.length
              ? "Collapse All"
              : "Expand All"}
          </button>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Project Timeline
        </h3>
        <Timeline orientation={timelineMode.value as "vertical" | "horizontal"}>
          {filteredEvents.map((event, index) => {
            const isExpanded = expandedEvents.value.includes(event.id);
            const isSelected = selectedEvent.value === event.id;

            return (
              <TimelineItem
                key={event.id}
                isLast={index === filteredEvents.length - 1}
              >
                <TimelineDot
                  size="md"
                  color={getStatusColor(event.status)}
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
                    <div
                      class={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-lg dark:border-blue-400 dark:bg-blue-950/20"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                      }`}
                      onClick$={() => {
                        selectedEvent.value = isSelected ? null : event.id;
                        if (!isSelected) {
                          toggleExpanded(event.id);
                        }
                      }}
                    >
                      {/* Event Header */}
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <h5 class="text-lg font-medium text-gray-900 dark:text-white">
                              {event.title}
                            </h5>
                            <span
                              class="rounded-full px-2 py-1 text-xs font-medium"
                              style={{
                                backgroundColor:
                                  event.priority === "high"
                                    ? "#fee2e2"
                                    : event.priority === "medium"
                                      ? "#fef3c7"
                                      : "#dcfce7",
                                color:
                                  event.priority === "high"
                                    ? "#dc2626"
                                    : event.priority === "medium"
                                      ? "#d97706"
                                      : "#16a34a",
                              }}
                            >
                              {event.priority} priority
                            </span>
                          </div>
                          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {event.description}
                          </p>
                          <div class="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                            <span>Assigned to: {event.assignee}</span>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <button
                            onClick$={(e) => {
                              e.stopPropagation();
                              toggleExpanded(event.id);
                            }}
                            class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          >
                            <svg
                              class={`h-5 w-5 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div class="mt-3 flex flex-wrap gap-1">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div class="mt-4 space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                          <div>
                            <h6 class="text-sm font-medium text-gray-900 dark:text-white">
                              Details:
                            </h6>
                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {event.details}
                            </p>
                          </div>

                          {event.attachments.length > 0 && (
                            <div>
                              <h6 class="text-sm font-medium text-gray-900 dark:text-white">
                                Attachments:
                              </h6>
                              <div class="mt-1 space-y-1">
                                {event.attachments.map((attachment) => (
                                  <div
                                    key={attachment}
                                    class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                  >
                                    <svg
                                      class="h-4 w-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                    <span class="cursor-pointer hover:underline">
                                      {attachment}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Status Update */}
                          <div class="flex items-center gap-2">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Update Status:
                            </label>
                            <select
                              value={event.status}
                              onChange$={(e) => {
                                e.stopPropagation();
                                updateEventStatus(
                                  event.id,
                                  (e.target as HTMLSelectElement).value,
                                );
                              }}
                              class="rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>

      {/* Timeline Statistics */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Timeline Statistics
        </h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {events.filter((e) => e.status === "completed").length}
            </div>
            <div class="text-sm text-green-700 dark:text-green-300">
              Completed
            </div>
          </div>
          <div class="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950/20">
            <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {events.filter((e) => e.status === "in-progress").length}
            </div>
            <div class="text-sm text-yellow-700 dark:text-yellow-300">
              In Progress
            </div>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div class="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {events.filter((e) => e.status === "pending").length}
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-300">Pending</div>
          </div>
          <div class="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
            <div class="text-2xl font-bold text-red-600 dark:text-red-400">
              {events.filter((e) => e.priority === "high").length}
            </div>
            <div class="text-sm text-red-700 dark:text-red-300">
              High Priority
            </div>
          </div>
        </div>
      </div>

      {/* Clickable Timeline Navigation */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quick Navigation
        </h3>
        <div class="flex flex-wrap gap-2">
          {events.map((event) => (
            <button
              key={event.id}
              onClick$={() => {
                selectedEvent.value = event.id;
                if (!expandedEvents.value.includes(event.id)) {
                  expandedEvents.value = [...expandedEvents.value, event.id];
                }
              }}
              class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                selectedEvent.value === event.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {event.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
