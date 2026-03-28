import {
  useSignal,
  useStore,
  useContext,
  $,
  useTask$,
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
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

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
  const locale = useMessageLocale();

  const stepsStore = useStore({
    steps: [] as any[],
  });

  // Track session start when component mounts
  useTask$(() => {
    if (typeof window === "undefined") {
      return;
    }

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
            wireless_enabled: !!(
              state.LAN.Wireless && state.LAN.Wireless.length > 0
            ),
          });
          break;
        default:
          // Handle ExtraConfig step (only in advanced mode)
          if (isExtraConfigStep) {
            track("step_extra_config_completed", {
              ...baseEventData,
              gaming_rules_enabled: !!state.ExtraConfig.Games?.length,
              ddns_enabled:
                !!state.ExtraConfig.usefulServices?.cloudDDNS?.ddnsEntries
                  .length,
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
              router_models: state.Choose.RouterModels.map(
                (rm) => rm.Model,
              ).join(","),
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
              ) || !!(state.LAN.Wireless && state.LAN.Wireless.length > 0),
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
        title: semanticMessages.star_container_step_choose({}, { locale }),
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
        iscomplete: false,
        helpData: {
          title: semanticMessages.star_container_help_choose_title(
            {},
            { locale },
          ),
          description: semanticMessages.star_container_help_choose_description(
            {},
            { locale },
          ),
          sections: [
            {
              title:
                semanticMessages.star_container_help_choose_getting_started_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_choose_getting_started_content(
                  {},
                  { locale },
                ),
              type: "info" as const,
            },
            {
              title:
                semanticMessages.star_container_help_choose_configuration_modes_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_choose_configuration_modes_content(
                  {},
                  { locale },
                ),
              type: "tip" as const,
            },
            {
              title:
                semanticMessages.star_container_help_choose_router_model_selection_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_choose_router_model_selection_content(
                  {},
                  { locale },
                ),
              type: "example" as const,
            },
          ],
        },
      },
      {
        id: 2,
        title: semanticMessages.star_container_step_wan({}, { locale }),
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
        iscomplete: false,
        helpData: {
          title: semanticMessages.star_container_help_wan_title({}, { locale }),
          description: semanticMessages.star_container_help_wan_description(
            {},
            { locale },
          ),
          sections: [
            {
              title:
                semanticMessages.star_container_help_wan_internet_connection_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_wan_internet_connection_content(
                  {},
                  { locale },
                ),
              type: "info" as const,
            },
            {
              title: semanticMessages.star_container_help_wan_multi_wan_title(
                {},
                { locale },
              ),
              content:
                semanticMessages.star_container_help_wan_multi_wan_content(
                  {},
                  { locale },
                ),
              type: "tip" as const,
            },
            {
              title: semanticMessages.star_container_help_wan_vpn_client_title(
                {},
                { locale },
              ),
              content:
                semanticMessages.star_container_help_wan_vpn_client_content(
                  {},
                  { locale },
                ),
              type: "example" as const,
            },
            {
              title:
                semanticMessages.star_container_help_wan_connection_prioritization_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_wan_connection_prioritization_content(
                  {},
                  { locale },
                ),
              type: "warning" as const,
            },
          ],
        },
      },
      {
        id: 3,
        title: semanticMessages.star_container_step_lan({}, { locale }),
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
        iscomplete: false,
        helpData: {
          title: semanticMessages.star_container_help_lan_title({}, { locale }),
          description: semanticMessages.star_container_help_lan_description(
            {},
            { locale },
          ),
          sections: [
            {
              title:
                semanticMessages.star_container_help_lan_network_segmentation_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_lan_network_segmentation_content(
                  {},
                  { locale },
                ),
              type: "info" as const,
            },
            {
              title:
                semanticMessages.star_container_help_lan_wireless_configuration_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_lan_wireless_configuration_content(
                  {},
                  { locale },
                ),
              type: "tip" as const,
            },
            {
              title: semanticMessages.star_container_help_lan_vpn_server_title(
                {},
                { locale },
              ),
              content:
                semanticMessages.star_container_help_lan_vpn_server_content(
                  {},
                  { locale },
                ),
              type: "example" as const,
            },
            {
              title:
                semanticMessages.star_container_help_lan_network_tunneling_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_lan_network_tunneling_content(
                  {},
                  { locale },
                ),
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
        title: semanticMessages.star_container_step_extra_config(
          {},
          { locale },
        ),
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
        iscomplete: false,
        helpData: {
          title: semanticMessages.star_container_help_extra_config_title(
            {},
            { locale },
          ),
          description:
            semanticMessages.star_container_help_extra_config_description(
              {},
              { locale },
            ),
          sections: [
            {
              title:
                semanticMessages.star_container_help_extra_config_gaming_optimization_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_extra_config_gaming_optimization_content(
                  {},
                  { locale },
                ),
              type: "info" as const,
            },
            {
              title:
                semanticMessages.star_container_help_extra_config_dynamic_dns_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_extra_config_dynamic_dns_content(
                  {},
                  { locale },
                ),
              type: "tip" as const,
            },
            {
              title:
                semanticMessages.star_container_help_extra_config_system_maintenance_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_extra_config_system_maintenance_content(
                  {},
                  { locale },
                ),
              type: "example" as const,
            },
            {
              title:
                semanticMessages.star_container_help_extra_config_advanced_services_title(
                  {},
                  { locale },
                ),
              content:
                semanticMessages.star_container_help_extra_config_advanced_services_content(
                  {},
                  { locale },
                ),
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
      title: semanticMessages.star_container_step_show_config({}, { locale }),
      icon: $(LuClipboardList),
      component: component$(() => (
        <ShowConfig
          isComplete={stepsStore.steps[showConfigIndex]?.isComplete || false}
          onComplete$={() => {
            handleStepComplete(showConfigId);
          }}
        />
      )),
      iscomplete: false,
      helpData: {
        title: semanticMessages.star_container_help_show_config_title(
          {},
          { locale },
        ),
        description:
          semanticMessages.star_container_help_show_config_description(
            {},
            { locale },
          ),
        sections: [
          {
            title:
              semanticMessages.star_container_help_show_config_configuration_review_title(
                {},
                { locale },
              ),
            content:
              semanticMessages.star_container_help_show_config_configuration_review_content(
                {},
                { locale },
              ),
            type: "info" as const,
          },
          {
            title:
              semanticMessages.star_container_help_show_config_deployment_options_title(
                {},
                { locale },
              ),
            content:
              semanticMessages.star_container_help_show_config_deployment_options_content(
                {},
                { locale },
              ),
            type: "tip" as const,
          },
          {
            title:
              semanticMessages.star_container_help_show_config_applying_configuration_title(
                {},
                { locale },
              ),
            content:
              semanticMessages.star_container_help_show_config_applying_configuration_content(
                {},
                { locale },
              ),
            type: "example" as const,
          },
          {
            title:
              semanticMessages.star_container_help_show_config_safety_precautions_title(
                {},
                { locale },
              ),
            content:
              semanticMessages.star_container_help_show_config_safety_precautions_content(
                {},
                { locale },
              ),
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
