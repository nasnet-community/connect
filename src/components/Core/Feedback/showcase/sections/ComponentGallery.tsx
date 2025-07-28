import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { 
  HiExclamationTriangleOutline,
  HiBellOutline,
  HiChatBubbleLeftRightOutline,
  HiXMarkOutline,
  HiBarsArrowUpOutline,
  HiMegaphoneOutline,
  HiWindowOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { Alert } from "../../Alert/Alert";
import { Toast } from "../../Toast/Toast";
import { Dialog } from "../../Dialog/Dialog";
import { Drawer } from "../../Drawer/Drawer";
import { Popover } from "../../Popover/Popover";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import { PromoBanner } from "../../PromoBanner/PromoBanner";
import type { DeviceSize } from "../types";
import { COMPONENT_CATEGORIES } from "../constants";

interface ComponentGalleryProps {
  device: DeviceSize;
}

export const ComponentGallery = component$<ComponentGalleryProps>(
  ({ device }) => {
    const activeComponent = useSignal<string | null>(null);
    const showDialog = useSignal(false);
    const showDrawer = useSignal(false);
    const showToast = useSignal(false);

    const getIcon = $((iconName: string, className?: string) => {
      switch (iconName) {
        case "exclamation":
          return <HiExclamationTriangleOutline class={className} />;
        case "bell":
          return <HiBellOutline class={className} />;
        case "window":
          return <HiWindowOutline class={className} />;
        case "bars":
          return <HiBarsArrowUpOutline class={className} />;
        case "chat":
          return <HiChatBubbleLeftRightOutline class={className} />;
        case "xmark":
          return <HiXMarkOutline class={className} />;
        case "megaphone":
          return <HiMegaphoneOutline class={className} />;
        default:
          return null;
      }
    });

    const componentDemos = [
      {
        id: "alert",
        name: "Alert",
        description: "Status messages with responsive design and mobile optimizations",
        iconName: "exclamation",
        category: "status",
        features: ["Auto-dismiss", "Touch-friendly buttons", "Responsive sizing", "Theme variants"],
        demo: (
          <div class="space-y-3">
            <Alert
              status="info"
              title="Network Status"
              message="Router configuration updated successfully"
              dismissible
              size={device === "mobile" ? "sm" : "md"}
            />
            <Alert
              status="success"
              message="VPN connection established"
              variant="subtle"
              size={device === "mobile" ? "sm" : "md"}
            />
            <Alert
              status="warning"
              message="Firmware update available"
              variant="outline"
              size={device === "mobile" ? "sm" : "md"}
            />
          </div>
        ),
      },
      {
        id: "toast",
        name: "Toast",
        description: "Temporary notifications with swipe gestures and positioning",
        iconName: "bell",
        category: "status",
        features: ["Swipe to dismiss", "Position control", "Auto-hide", "Stack management"],
        demo: (
          <div class="space-y-3">
            <button
              onClick$={() => showToast.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
            >
              Show Toast
            </button>
            {showToast.value && (
              <Toast
                id="gallery-toast-demo"
                message="Toast notification with mobile gestures"
                status="success"
                position="top-center"
                duration={3000}
                swipeable
                onDismiss$={() => showToast.value = false}
              />
            )}
          </div>
        ),
      },
      {
        id: "dialog",
        name: "Dialog",
        description: "Modal dialogs with fullscreen mobile mode and backdrop options",
        iconName: "window",
        category: "overlay",
        features: ["Fullscreen mobile", "Backdrop blur", "Focus management", "Escape key"],
        demo: (
          <div>
            <button
              onClick$={() => showDialog.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
            >
              Open Dialog
            </button>
            <Dialog
              isOpen={showDialog.value}
              onClose$={() => showDialog.value = false}
              title="Enhanced Dialog"
              size={device === "mobile" ? "full" : "md"}
            >
              <div class="p-4">
                <p class="text-[var(--showcase-text)]/70">
                  This dialog demonstrates mobile-first design with fullscreen mode on mobile devices
                  and responsive sizing on larger screens.
                </p>
              </div>
            </Dialog>
          </div>
        ),
      },
      {
        id: "drawer",
        name: "Drawer",
        description: "Side panels with touch gestures and backdrop effects",
        iconName: "bars",
        category: "overlay",
        features: ["Touch gestures", "Drag handles", "Backdrop blur", "Multiple placements"],
        demo: (
          <div>
            <button
              onClick$={() => showDrawer.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
            >
              Open Drawer
            </button>
            <Drawer
              isOpen={showDrawer.value}
              onClose$={() => showDrawer.value = false}
              placement="right"
              size={device === "mobile" ? "full" : "md"}
              showDragHandle
              backdropBlur="medium"
            >
              <div class="p-4">
                <h3 class="mb-2 text-lg font-semibold text-[var(--showcase-text)]">
                  Enhanced Drawer
                </h3>
                <p class="text-[var(--showcase-text)]/70">
                  Features touch gestures, drag-to-close functionality, and responsive sizing.
                </p>
              </div>
            </Drawer>
          </div>
        ),
      },
      {
        id: "popover",
        name: "Popover",
        description: "Floating content with mobile positioning and touch triggers",
        iconName: "chat",
        category: "overlay",
        features: ["Smart positioning", "Touch triggers", "Arrow indicators", "Auto-close"],
        demo: (
          <div class="flex justify-center">
            <Popover
              trigger="click"
              placement="top"
              mobileFullscreen={device === "mobile"}
            >
              <button
                slot="trigger"
                class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
              >
                Click for Popover
              </button>
              <div class="p-3">
                <p class="text-sm text-[var(--showcase-text)]">
                  Mobile-optimized popover with smart positioning
                </p>
              </div>
            </Popover>
          </div>
        ),
      },
      {
        id: "errormessage",
        name: "ErrorMessage",
        description: "Form error displays with responsive modes and icon variants",
        iconName: "xmark",
        category: "status",
        features: ["Form integration", "Icon variants", "Auto-dismiss", "Responsive display"],
        demo: (
          <div class="space-y-3">
            <ErrorMessage
              title="Validation Error"
              message="Please enter a valid email address"
              variant="solid"
              dismissible
              size={device === "mobile" ? "sm" : "md"}
            />
            <ErrorMessage
              message="Password must be at least 8 characters"
              variant="outline"
              size={device === "mobile" ? "sm" : "md"}
            />
          </div>
        ),
      },
      {
        id: "promobanner",
        name: "PromoBanner",
        description: "Promotional displays with responsive layouts and image handling",
        iconName: "megaphone",
        category: "promotional",
        features: ["Responsive images", "Theme integration", "Action buttons", "Dismissible"],
        demo: (
          <PromoBanner
            title="New Feature Available"
            description="Discover enhanced mobile optimizations for better user experience"
            provider="Demo Provider"
            size={device === "mobile" ? "sm" : "md"}
            dismissible
          />
        ),
      },
    ];

    const ComponentCard = component$<{
      demo: typeof componentDemos[0];
      isActive: boolean;
      onToggle: QRL<() => void>;
    }>(({ demo, isActive, onToggle }) => (
      <Card class="overflow-hidden transition-all hover:shadow-lg">
        <div class="p-4">
          <div class="mb-3 flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="rounded-lg bg-[var(--showcase-primary)]/10 p-2">
                {getIcon(demo.iconName, "h-5 w-5 text-[var(--showcase-primary)]")}
              </div>
              <div>
                <h3 class="font-semibold text-[var(--showcase-text)]">{demo.name}</h3>
                <p class="text-sm text-[var(--showcase-text)]/70">{demo.description}</p>
              </div>
            </div>
            <button
              onClick$={onToggle}
              class="rounded bg-[var(--showcase-surface)] px-2 py-1 text-xs text-[var(--showcase-text)] hover:bg-[var(--showcase-surface)]"
            >
              {isActive ? "Hide" : "Show"}
            </button>
          </div>

          <div class="mb-3 flex flex-wrap gap-1">
            {demo.features.map((feature) => (
              <span
                key={feature}
                class="rounded bg-[var(--showcase-primary)]/10 px-2 py-1 text-xs text-[var(--showcase-primary)]"
              >
                {feature}
              </span>
            ))}
          </div>

          {isActive && (
            <div class="rounded border border-[var(--showcase-border)] bg-[var(--showcase-bg)] p-4">
              {demo.demo}
            </div>
          )}
        </div>
      </Card>
    ));

    return (
      <div class="space-y-8">
        {/* Header */}
        <div class="text-center">
          <h2 class="mb-4 text-3xl font-bold text-[var(--showcase-text)]">
            Component Gallery
          </h2>
          <p class="mx-auto max-w-2xl text-[var(--showcase-text)]/70">
            Interactive demonstrations of all feedback components with live examples,
            mobile optimizations, and responsive features.
          </p>
        </div>

        {/* Device Info */}
        <Card class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="rounded bg-[var(--showcase-primary)]/10 p-2">
                <HiWindowOutline class="h-4 w-4 text-[var(--showcase-primary)]" />
              </div>
              <div>
                <div class="text-sm font-medium text-[var(--showcase-text)]">
                  Current Device: {device.charAt(0).toUpperCase() + device.slice(1)}
                </div>
                <div class="text-xs text-[var(--showcase-text)]/70">
                  Components automatically adapt to the selected device size
                </div>
              </div>
            </div>
            <div class="text-xs text-[var(--showcase-text)]/50">
              Use the device selector in the header to test responsiveness
            </div>
          </div>
        </Card>

        {/* Component Categories */}
        {COMPONENT_CATEGORIES.map((category) => (
          <div key={category.id} class="space-y-4">
            <div>
              <h3 class="text-xl font-semibold text-[var(--showcase-text)]">
                {category.name}
              </h3>
              <p class="text-sm text-[var(--showcase-text)]/70">
                {category.description}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {componentDemos
                .filter((demo) => category.components.includes(demo.name))
                .map((demo) => (
                  <ComponentCard
                    key={demo.id}
                    demo={demo}
                    isActive={activeComponent.value === demo.id}
                    onToggle={$(() => {
                      activeComponent.value = 
                        activeComponent.value === demo.id ? null : demo.id;
                    })}
                  />
                ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <Card class="p-6">
          <h3 class="mb-4 text-lg font-semibold text-[var(--showcase-text)]">
            Quick Actions
          </h3>
          <div class="flex flex-wrap gap-3">
            <button
              onClick$={() => {
                componentDemos.forEach(demo => {
                  activeComponent.value = demo.id;
                });
              }}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
            >
              Show All Components
            </button>
            <button
              onClick$={() => activeComponent.value = null}
              class="rounded bg-[var(--showcase-surface)] px-4 py-2 text-sm text-[var(--showcase-text)] hover:bg-[var(--showcase-surface)]"
            >
              Hide All Components
            </button>
            <button
              onClick$={() => {
                const statusComponents = componentDemos.filter(demo => demo.category === "status");
                statusComponents.forEach(demo => {
                  activeComponent.value = demo.id;
                });
              }}
              class="rounded bg-[var(--showcase-accent)] px-4 py-2 text-sm text-white hover:bg-[var(--showcase-accent)]/90"
            >
              Show Status Components
            </button>
          </div>
        </Card>
      </div>
    );
  }
);