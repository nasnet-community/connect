import {
  useSignal,
  useStore,
  useContext,
  $,
  useTask$,
  useVisibleTask$,
  component$,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../StarContext/StarContext";
import type { Mode } from "../StarContext/ChooseType";
import {
  LuSettings2,
  LuGlobe,
  LuNetwork,
  LuWrench,
  LuClipboardList,
} from "@qwikest/icons/lucide";
import { Choose } from "../Choose/Choose";
import { WAN } from "../WAN/WAN";
import { LAN } from "../LAN/LAN";
import { ExtraConfig } from "../ExtraConfig/ExtraConfig";
import { ShowConfig } from "../ShowConfig/ShowConfig";

import type { Signal, QRL } from "@builder.io/qwik";

interface StarContainerReturn {
  activeStep: Signal<number>;
  stepsStore: {
    steps: any[];
  };
  state: any;
  handleModeChange: QRL<(mode: Mode) => void>;
  handleStepChange: QRL<(stepId: number) => void>;
}

/**
 * Custom hook for managing StarContainer logic including:
 * - Session tracking and analytics
 * - Step navigation and completion
 * - Mode switching
 * - Dynamic step generation based on mode
 */
export const useStarContainer = (): StarContainerReturn => {
  const activeStep = useSignal(0);
  const { state, updateChoose$ } = useContext(StarContext);
  const sessionStarted = useSignal(false);

  const stepsStore = useStore({
    steps: [] as any[],
  });

  // Track session start when component mounts
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!sessionStarted.value) {
      track("router_config_session_started", {
        user_mode: state.Choose.Mode,
        entry_point: "star_container",
        browser:
          typeof window !== "undefined"
            ? window.navigator.userAgent.split(" ")[0]
            : "unknown",
        timestamp: new Date().toISOString(),
      });
      sessionStarted.value = true;
    }
  });

  // Track mode changes
  const handleModeChange = $((mode: Mode) => {
    track("router_config_mode_changed", {
      from_mode: state.Choose.Mode,
      to_mode: mode,
      current_step: stepsStore.steps[activeStep.value]?.title || "unknown",
      step_number: activeStep.value + 1,
      change_reason: "user_selection",
    });
    updateChoose$({ Mode: mode });
  });

  // Track step completion with detailed step-specific events
  const handleStepComplete = $((stepId: number) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === stepId);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;

      // Track specific step completion events
      const baseEventData = {
        step_number: stepId,
        step_index: stepIndex,
        user_mode: state.Choose.Mode,
        total_steps: stepsStore.steps.length,
        progress_percentage: Math.round(
          ((stepIndex + 1) / stepsStore.steps.length) * 100,
        ),
        completion_time: new Date().toISOString(),
      };

      // Step-specific tracking events
      const isEasyMode = state.Choose.Mode === "easy";
      const isShowConfigStep =
        (isEasyMode && stepId === 4) || (!isEasyMode && stepId === 5);
      const isExtraConfigStep = !isEasyMode && stepId === 4;

      switch (stepId) {
        case 1:
          track("step_choose_completed", {
            ...baseEventData,
            firmware: state.Choose.Firmware,
            router_mode: state.Choose.Mode,
            router_models: state.Choose.RouterModels.map((rm) => rm.Model).join(
              ",",
            ),
            has_domestic_link:
              state.Choose.WANLinkType === "domestic" ||
              state.Choose.WANLinkType === "both",
          });
          break;
        case 2:
          track("step_wan_completed", {
            ...baseEventData,
            vpn_client_enabled: !!(
              state.WAN.VPNClient?.Wireguard ||
              state.WAN.VPNClient?.OpenVPN ||
              state.WAN.VPNClient?.L2TP ||
              state.WAN.VPNClient?.PPTP ||
              state.WAN.VPNClient?.SSTP ||
              state.WAN.VPNClient?.IKeV2
            ),
            vpn_client_type: state.WAN.VPNClient?.Wireguard
              ? "Wireguard"
              : state.WAN.VPNClient?.OpenVPN
                ? "OpenVPN"
                : state.WAN.VPNClient?.L2TP
                  ? "L2TP"
                  : state.WAN.VPNClient?.PPTP
                    ? "PPTP"
                    : state.WAN.VPNClient?.SSTP
                      ? "SSTP"
                      : state.WAN.VPNClient?.IKeV2
                        ? "IKeV2"
                        : "none",
            foreign_wan_configured: !!state.WAN.WANLink.Foreign,
          });
          break;
        case 3:
          track("step_lan_completed", {
            ...baseEventData,
            vpn_server_enabled: !!(
              state.LAN.VPNServer?.PptpServer ||
              state.LAN.VPNServer?.L2tpServer ||
              state.LAN.VPNServer?.SstpServer ||
              state.LAN.VPNServer?.OpenVpnServer ||
              state.LAN.VPNServer?.Ikev2Server ||
              state.LAN.VPNServer?.WireguardServers
            ),
            vpn_server_protocols: [
              state.LAN.VPNServer?.PptpServer ? "PPTP" : null,
              state.LAN.VPNServer?.L2tpServer ? "L2TP" : null,
              state.LAN.VPNServer?.SstpServer ? "SSTP" : null,
              state.LAN.VPNServer?.OpenVpnServer ? "OpenVPN" : null,
              state.LAN.VPNServer?.Ikev2Server ? "IKeV2" : null,
              state.LAN.VPNServer?.WireguardServers ? "Wireguard" : null,
            ]
              .filter(Boolean)
              .join(","),
            wireless_enabled: !!(state.LAN.Wireless && state.LAN.Wireless.length > 0),
          });
          break;
        default:
          // Handle ExtraConfig step (only in advanced mode)
          if (isExtraConfigStep) {
            track("step_extra_config_completed", {
              ...baseEventData,
              gaming_rules_enabled: !!state.ExtraConfig.Games?.length,
              ddns_enabled: !!state.ExtraConfig.usefulServices?.cloudDDNS
                ?.ddnsEntries.length,
              auto_update_enabled: !!state.ExtraConfig.RUI.Update?.interval,
              auto_reboot_enabled: !!state.ExtraConfig.RUI.Reboot?.interval,
            });
          }
          // Handle ShowConfig step (step 4 in easy mode, step 5 in advanced mode)
          else if (isShowConfigStep) {
            track("step_show_config_completed", {
              ...baseEventData,
              config_generated: true,
            });
            // Track overall flow completion
            track("router_config_flow_completed", {
              user_mode: state.Choose.Mode,
              total_steps_completed: stepsStore.steps.filter(
                (step) => step.isComplete,
              ).length,
              completion_time: new Date().toISOString(),
              firmware: state.Choose.Firmware,
              router_models: state.Choose.RouterModels.map((rm) => rm.Model).join(
                ",",
              ),
              vpn_client_type: state.WAN.VPNClient?.Wireguard
                ? "Wireguard"
                : state.WAN.VPNClient?.OpenVPN
                  ? "OpenVPN"
                  : state.WAN.VPNClient?.L2TP
                    ? "L2TP"
                    : state.WAN.VPNClient?.PPTP
                      ? "PPTP"
                      : state.WAN.VPNClient?.SSTP
                        ? "SSTP"
                        : state.WAN.VPNClient?.IKeV2
                          ? "IKeV2"
                          : "none",
              vpn_server_enabled: !!(
                state.LAN.VPNServer?.PptpServer ||
                state.LAN.VPNServer?.L2tpServer ||
                state.LAN.VPNServer?.SstpServer ||
                state.LAN.VPNServer?.OpenVpnServer ||
                state.LAN.VPNServer?.Ikev2Server ||
                state.LAN.VPNServer?.WireguardServers
              ),
            });
          } else {
            track("step_generic_completed", baseEventData);
          }
          break;
      }
    }
  });

  // Track step navigation with detailed step information
  const handleStepChange = $((stepId: number) => {
    const previousStep = activeStep.value;
    const newStep = stepId - 1;

    const fromStepName = stepsStore.steps[previousStep]?.title || "unknown";
    const toStepName = stepsStore.steps[newStep]?.title || "unknown";

    track("router_config_step_navigated", {
      from_step: fromStepName,
      to_step: toStepName,
      from_step_number: previousStep + 1,
      to_step_number: stepId,
      user_mode: state.Choose.Mode,
      navigation_direction: newStep > previousStep ? "forward" : "backward",
      is_completed_step: stepsStore.steps[newStep]?.isComplete || false,
      navigation_method: "stepper_click",
    });

    // Track specific step entry events
    const isEasyMode = state.Choose.Mode === "easy";
    const isShowConfigStep =
      (isEasyMode && stepId === 4) || (!isEasyMode && stepId === 5);
    const isExtraConfigStep = !isEasyMode && stepId === 4;

    switch (stepId) {
      case 1:
        track("step_choose_entered", {
          entry_method: "navigation",
          previous_step: fromStepName,
        });
        break;
      case 2:
        track("step_wan_entered", {
          entry_method: "navigation",
          previous_step: fromStepName,
          has_firmware_selected: !!state.Choose.Firmware,
        });
        break;
      case 3:
        track("step_lan_entered", {
          entry_method: "navigation",
          previous_step: fromStepName,
          wan_configured:
            !!(
              state.WAN.VPNClient?.Wireguard ||
              state.WAN.VPNClient?.OpenVPN ||
              state.WAN.VPNClient?.L2TP ||
              state.WAN.VPNClient?.PPTP ||
              state.WAN.VPNClient?.SSTP ||
              state.WAN.VPNClient?.IKeV2
            ) || !!state.WAN.WANLink.Foreign,
        });
        break;
      default:
        // Handle ExtraConfig step entry (only in advanced mode)
        if (isExtraConfigStep) {
          track("step_extra_config_entered", {
            entry_method: "navigation",
            previous_step: fromStepName,
            lan_configured:
              !!(
                state.LAN.VPNServer?.PptpServer ||
                state.LAN.VPNServer?.L2tpServer ||
                state.LAN.VPNServer?.SstpServer ||
                state.LAN.VPNServer?.OpenVpnServer ||
                state.LAN.VPNServer?.Ikev2Server ||
                state.LAN.VPNServer?.WireguardServers
              ) ||
              !!(state.LAN.Wireless && state.LAN.Wireless.length > 0),
          });
        }
        // Handle ShowConfig step entry (step 4 in easy mode, step 5 in advanced mode)
        else if (isShowConfigStep) {
          track("step_show_config_entered", {
            entry_method: "navigation",
            previous_step: fromStepName,
            ready_for_generation: true,
          });
        }
        break;
    }

    activeStep.value = newStep;
  });

  // Generate steps dynamically based on mode
  useTask$(({ track }) => {
    const currentMode = track(() => state.Choose.Mode);
    const isEasyMode = currentMode === "easy";
    const baseSteps = [
      {
        id: 1,
        title: $localize`Choose`,
        icon: $(LuSettings2),
        component: component$(() => (
          <Choose
            isComplete={stepsStore.steps[0]?.isComplete || false}
            onComplete$={() => {
              handleStepComplete(1);
              activeStep.value = 1;
            }}
          />
        )),
        isComplete: true,
        helpData: {
          title: "Router Selection & Configuration Mode",
          description:
            "Choose your MikroTik router model and select the configuration approach that best fits your needs.",
          sections: [
            {
              title: "Getting Started",
              content:
                "Select your MikroTik router model from our supported device list. This ensures the generated configuration is optimized for your specific hardware capabilities and features.",
              type: "info" as const,
            },
            {
              title: "Configuration Modes",
              content:
                "Easy Mode provides simplified setup with essential features for home users. Advanced Mode offers full control over all router capabilities for professional deployments.",
              type: "tip" as const,
            },
            {
              title: "Router Model Selection",
              content:
                "Choose the exact model of your MikroTik device. Different models have varying capabilities like port counts, wireless features, and processing power that affect the generated configuration.",
              type: "example" as const,
            },
          ],
        },
      },
      {
        id: 2,
        title: $localize`WAN`,
        icon: $(LuGlobe),
        component: component$(() => (
          <WAN
            isComplete={stepsStore.steps[1]?.isComplete || false}
            onComplete$={() => {
              handleStepComplete(2);
              activeStep.value = 2;
            }}
          />
        )),
        isComplete: true,
        helpData: {
          title: "WAN Configuration Guide",
          description:
            "Configure your internet connection, multi-WAN setup, and VPN client settings for optimal connectivity and redundancy.",
          sections: [
            {
              title: "Internet Connection Setup",
              content:
                "Configure your primary internet connection settings including DHCP, static IP, or PPPoE. Ensure your ISP settings are correctly configured for reliable internet access.",
              type: "info" as const,
            },
            {
              title: "Multi-WAN Configuration",
              content:
                "Set up multiple internet connections for load balancing and failover. Configure domestic and foreign links with appropriate routing policies and traffic distribution.",
              type: "tip" as const,
            },
            {
              title: "VPN Client Setup",
              content:
                "Configure VPN client connections for routing traffic through VPN providers. Supports WireGuard, OpenVPN, L2TP, PPTP, SSTP, and IKEv2 protocols with automatic failover.",
              type: "example" as const,
            },
            {
              title: "Connection Prioritization",
              content:
                "Set connection priorities and weights to control how traffic is distributed across multiple WAN connections. Higher priority connections are preferred for critical traffic.",
              type: "warning" as const,
            },
          ],
        },
      },
      {
        id: 3,
        title: $localize`LAN`,
        icon: $(LuNetwork),
        component: component$(() => (
          <LAN
            isComplete={stepsStore.steps[2]?.isComplete || false}
            onComplete$={() => {
              handleStepComplete(3);
              const nextStepIndex = isEasyMode ? 3 : 4;
              activeStep.value = nextStepIndex;
            }}
          />
        )),
        isComplete: true,
        helpData: {
          title: "LAN & Network Configuration",
          description:
            "Configure your local network segments, wireless settings, VPN servers, and security policies for optimal performance and security.",
          sections: [
            {
              title: "Network Segmentation",
              content:
                "Set up multiple network segments including Split (192.168.10.0/24), Domestic (192.168.20.0/24), Foreign (192.168.30.0/24), and VPN (192.168.40.0/24) networks with appropriate routing rules.",
              type: "info" as const,
            },
            {
              title: "Wireless Configuration",
              content:
                "Configure WiFi networks with proper security settings, guest networks, and bandwidth limitations. Set up multiple SSIDs for different user groups with appropriate access policies.",
              type: "tip" as const,
            },
            {
              title: "VPN Server Setup",
              content:
                "Configure VPN servers for remote access including WireGuard, OpenVPN, L2TP/IPSec, PPTP, SSTP, and IKEv2. Set up user authentication and access policies for secure remote connectivity.",
              type: "example" as const,
            },
            {
              title: "Network Tunneling",
              content:
                "Set up network tunnels (GRE, VXLAN, EoIP, IPIP) for connecting remote sites or creating overlay networks. Configure tunnel parameters and routing for seamless connectivity.",
              type: "warning" as const,
            },
          ],
        },
      },
    ];

    const steps = [...baseSteps];

    // Only add ExtraConfig step if not in easy mode
    if (!isEasyMode) {
      steps.push({
        id: 4,
        title: $localize`Extra Config`,
        icon: $(LuWrench),
        component: component$(() => (
          <ExtraConfig
            isComplete={stepsStore.steps[3]?.isComplete || false}
            onComplete$={() => {
              handleStepComplete(4);
              activeStep.value = 4;
            }}
          />
        )),
        isComplete: true,
        helpData: {
          title: "Advanced Features & Gaming",
          description:
            "Configure advanced features including gaming optimization, DDNS, system maintenance, and other professional-grade networking features.",
          sections: [
            {
              title: "Gaming Optimization",
              content:
                "Set up game-specific routing rules and port forwarding for popular games. Configure QoS policies to prioritize gaming traffic and reduce latency for optimal gaming performance.",
              type: "info" as const,
            },
            {
              title: "Dynamic DNS (DDNS)",
              content:
                "Configure DDNS services to maintain access to your router even with changing IP addresses. Supports multiple DDNS providers for reliable remote access and services.",
              type: "tip" as const,
            },
            {
              title: "System Maintenance",
              content:
                "Set up automatic system updates, scheduled reboots, and maintenance tasks. Configure backup schedules and system monitoring for reliable operation.",
              type: "example" as const,
            },
            {
              title: "Advanced Services",
              content:
                "Configure additional services like NTP servers, certificate management, and cloud integrations. These features are available in Advanced mode for professional deployments.",
              type: "warning" as const,
            },
          ],
        },
      });
    }

    // Add ShowConfig step with correct ID (4 for easy mode, 5 for advanced mode)
    const showConfigId = isEasyMode ? 4 : 5;
    const showConfigIndex = isEasyMode ? 3 : 4;

    steps.push({
      id: showConfigId,
      title: $localize`Show Config`,
      icon: $(LuClipboardList),
      component: component$(() => (
        <ShowConfig
          isComplete={stepsStore.steps[showConfigIndex]?.isComplete || false}
          onComplete$={() => {
            handleStepComplete(showConfigId);
          }}
        />
      )),
      isComplete: true,
      helpData: {
        title: "Configuration Review & Deployment",
        description:
          "Review, download, and deploy your generated MikroTik router configuration. Verify all settings before applying to your router.",
        sections: [
          {
            title: "Configuration Review",
            content:
              "Review the generated configuration script to ensure all settings match your requirements. Check network segments, routing rules, firewall policies, and service configurations.",
            type: "info" as const,
          },
          {
            title: "Deployment Options",
            content:
              "Download the configuration as a .rsc file for manual application, or copy the commands for direct RouterOS terminal use. Always backup your current configuration before applying changes.",
            type: "tip" as const,
          },
          {
            title: "Applying Configuration",
            content:
              "Connect to your MikroTik router via WinBox, WebFig, or SSH. Import the configuration file or paste commands into the terminal. Verify connectivity after applying changes.",
            type: "example" as const,
          },
          {
            title: "Safety Precautions",
            content:
              "Always backup your current configuration before applying changes. Test the configuration on a non-production device first. Keep physical access to reset the router if needed.",
            type: "warning" as const,
          },
        ],
      },
    });

    stepsStore.steps = steps;
  });

  return {
    activeStep,
    stepsStore,
    state,
    handleModeChange,
    handleStepChange,
  };
};

