import {
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Choose } from "../Choose/Choose";
import { ExtraConfig } from "../ExtraConfig/ExtraConfig";
import { LAN } from "../LAN/LAN";
import { WAN } from "../WAN/WAN";
import { ShowConfig } from "../ShowConfig/ShowConfig";
import { HStepper } from "~/components/Core/Stepper/HStepper/HStepper";
import { useStore } from "@builder.io/qwik";
import { StarContext } from "../StarContext/StarContext";
import {
  LuSettings2,
  LuGlobe,
  LuNetwork,
  LuWrench,
  LuClipboardList,
} from "@qwikest/icons/lucide";
import { track } from '@vercel/analytics';
import type { Mode } from "../StarContext/ChooseType";

export const StarContainer = component$(() => {
  const activeStep = useSignal(0);
  const { state, updateChoose$ } = useContext(StarContext);
  const sessionStarted = useSignal(false);

  const stepsStore = useStore({
    steps: [] as any[],
  });

  // Track session start when component mounts
  useVisibleTask$(() => {
    if (!sessionStarted.value) {
      track('router_config_session_started', {
        user_mode: state.Choose.Mode,
        entry_point: 'star_container',
        browser: typeof window !== 'undefined' ? window.navigator.userAgent.split(' ')[0] : 'unknown',
        timestamp: new Date().toISOString()
      });
      sessionStarted.value = true;
    }
  });

  // Track mode changes
  const handleModeChange = $((mode: Mode) => {
    track('router_config_mode_changed', {
      from_mode: state.Choose.Mode,
      to_mode: mode,
      current_step: stepsStore.steps[activeStep.value]?.title || 'unknown',
      step_number: activeStep.value + 1,
      change_reason: 'user_selection'
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
        progress_percentage: Math.round(((stepIndex + 1) / stepsStore.steps.length) * 100),
        completion_time: new Date().toISOString()
      };

      // Step-specific tracking events
      switch (stepId) {
        case 1:
          track('step_choose_completed', {
            ...baseEventData,
            firmware: state.Choose.Firmware,
            router_mode: state.Choose.Mode,
            router_models: state.Choose.RouterModels.map(rm => rm.Model).join(','),
            has_domestic_link: state.Choose.DomesticLink
          });
          break;
        case 2:
          track('step_wan_completed', {
            ...baseEventData,
            vpn_client_enabled: !!(state.WAN.VPNClient?.Wireguard || state.WAN.VPNClient?.OpenVPN || state.WAN.VPNClient?.L2TP || state.WAN.VPNClient?.PPTP || state.WAN.VPNClient?.SSTP || state.WAN.VPNClient?.IKeV2),
            vpn_client_type: state.WAN.VPNClient?.Wireguard ? 'Wireguard' : 
                           state.WAN.VPNClient?.OpenVPN ? 'OpenVPN' :
                           state.WAN.VPNClient?.L2TP ? 'L2TP' :
                           state.WAN.VPNClient?.PPTP ? 'PPTP' :
                           state.WAN.VPNClient?.SSTP ? 'SSTP' :
                           state.WAN.VPNClient?.IKeV2 ? 'IKeV2' : 'none',
            foreign_wan_configured: !!state.WAN.WANLink?.Foreign
          });
          break;
        case 3:
          track('step_lan_completed', {
            ...baseEventData,
            vpn_server_enabled: !!(state.LAN.VPNServer?.PptpServer || state.LAN.VPNServer?.L2tpServer || state.LAN.VPNServer?.SstpServer || state.LAN.VPNServer?.OpenVpnServer || state.LAN.VPNServer?.Ikev2Server || state.LAN.VPNServer?.WireguardServers),
            vpn_server_protocols: [
              state.LAN.VPNServer?.PptpServer ? 'PPTP' : null,
              state.LAN.VPNServer?.L2tpServer ? 'L2TP' : null,
              state.LAN.VPNServer?.SstpServer ? 'SSTP' : null,
              state.LAN.VPNServer?.OpenVpnServer ? 'OpenVPN' : null,
              state.LAN.VPNServer?.Ikev2Server ? 'IKeV2' : null,
              state.LAN.VPNServer?.WireguardServers ? 'Wireguard' : null
            ].filter(Boolean).join(','),
            wireless_enabled: !!(state.LAN.Wireless?.SingleMode || state.LAN.Wireless?.MultiMode)
          });
          break;
        case 4:
          track('step_extra_config_completed', {
            ...baseEventData,
            gaming_rules_enabled: !!state.ExtraConfig.Games?.length,
            ddns_enabled: !!state.ExtraConfig.isDDNS,
            auto_update_enabled: !!state.ExtraConfig.Update,
            auto_reboot_enabled: !!state.ExtraConfig.AutoReboot
          });
          break;
        case 5:
          track('step_show_config_completed', {
            ...baseEventData,
            config_generated: true
          });
          // Track overall flow completion
          track('router_config_flow_completed', {
            user_mode: state.Choose.Mode,
            total_steps_completed: stepsStore.steps.filter(step => step.isComplete).length,
            completion_time: new Date().toISOString(),
            firmware: state.Choose.Firmware,
            router_models: state.Choose.RouterModels.map(rm => rm.Model).join(','),
            vpn_client_type: state.WAN.VPNClient?.Wireguard ? 'Wireguard' : 
                           state.WAN.VPNClient?.OpenVPN ? 'OpenVPN' :
                           state.WAN.VPNClient?.L2TP ? 'L2TP' :
                           state.WAN.VPNClient?.PPTP ? 'PPTP' :
                           state.WAN.VPNClient?.SSTP ? 'SSTP' :
                           state.WAN.VPNClient?.IKeV2 ? 'IKeV2' : 'none',
            vpn_server_enabled: !!(state.LAN.VPNServer?.PptpServer || state.LAN.VPNServer?.L2tpServer || state.LAN.VPNServer?.SstpServer || state.LAN.VPNServer?.OpenVpnServer || state.LAN.VPNServer?.Ikev2Server || state.LAN.VPNServer?.WireguardServers)
          });
          break;
        default:
          track('step_generic_completed', baseEventData);
      }
    }
  });

  // Track step navigation with detailed step information
  const handleStepChange = $((stepId: number) => {
    const previousStep = activeStep.value;
    const newStep = stepId - 1;
    
    const fromStepName = stepsStore.steps[previousStep]?.title || 'unknown';
    const toStepName = stepsStore.steps[newStep]?.title || 'unknown';
    
    track('router_config_step_navigated', {
      from_step: fromStepName,
      to_step: toStepName,
      from_step_number: previousStep + 1,
      to_step_number: stepId,
      user_mode: state.Choose.Mode,
      navigation_direction: newStep > previousStep ? 'forward' : 'backward',
      is_completed_step: stepsStore.steps[newStep]?.isComplete || false,
      navigation_method: 'stepper_click'
    });

    // Track specific step entry events
    switch (stepId) {
      case 1:
        track('step_choose_entered', {
          entry_method: 'navigation',
          previous_step: fromStepName
        });
        break;
      case 2:
        track('step_wan_entered', {
          entry_method: 'navigation',
          previous_step: fromStepName,
          has_firmware_selected: !!state.Choose.Firmware
        });
        break;
      case 3:
        track('step_lan_entered', {
          entry_method: 'navigation',
          previous_step: fromStepName,
          wan_configured: !!(state.WAN.VPNClient?.Wireguard || state.WAN.VPNClient?.OpenVPN || state.WAN.VPNClient?.L2TP || state.WAN.VPNClient?.PPTP || state.WAN.VPNClient?.SSTP || state.WAN.VPNClient?.IKeV2) || !!state.WAN.WANLink?.Foreign
        });
        break;
      case 4:
        track('step_extra_config_entered', {
          entry_method: 'navigation',
          previous_step: fromStepName,
          lan_configured: !!(state.LAN.VPNServer?.PptpServer || state.LAN.VPNServer?.L2tpServer || state.LAN.VPNServer?.SstpServer || state.LAN.VPNServer?.OpenVpnServer || state.LAN.VPNServer?.Ikev2Server || state.LAN.VPNServer?.WireguardServers) || !!(state.LAN.Wireless?.SingleMode || state.LAN.Wireless?.MultiMode)
        });
        break;
      case 5:
        track('step_show_config_entered', {
          entry_method: 'navigation',
          previous_step: fromStepName,
          ready_for_generation: true
        });
        break;
    }

    activeStep.value = newStep;
  });

  useTask$(() => {
    stepsStore.steps = [
      {
        id: 1,
        title: $localize`Choose`,
        icon: $(LuSettings2),
        component: component$(() => (
          <Choose
            isComplete={stepsStore.steps[0].isComplete}
            onComplete$={() => {
              handleStepComplete(1);
              activeStep.value = 1;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 2,
        title: $localize`WAN`,
        icon: $(LuGlobe),
        component: component$(() => (
          <WAN
            isComplete={stepsStore.steps[1].isComplete}
            onComplete$={() => {
              handleStepComplete(2);
              activeStep.value = 2;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`LAN`,
        icon: $(LuNetwork),
        component: component$(() => (
          <LAN
            isComplete={stepsStore.steps[2].isComplete}
            onComplete$={() => {
              handleStepComplete(3);
              activeStep.value = 3;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 4,
        title: $localize`Extra Config`,
        icon: $(LuWrench),
        component: component$(() => (
          <ExtraConfig
            isComplete={stepsStore.steps[3].isComplete}
            onComplete$={() => {
              handleStepComplete(4);
              activeStep.value = 4;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 5,
        title: $localize`Show Config`,
        icon: $(LuClipboardList),
        component: component$(() => (
          <ShowConfig
            isComplete={stepsStore.steps[4].isComplete}
            onComplete$={() => {
              handleStepComplete(5);
            }}
          />
        )),
        isComplete: false,
      },
    ];
  });

  return (
    <div class="container mx-auto w-full px-4 pt-24">
      <HStepper
        steps={stepsStore.steps}
        mode={state.Choose.Mode}
        onModeChange$={handleModeChange}
        activeStep={activeStep.value}
        onStepComplete$={(id) => {
          const stepIndex = stepsStore.steps.findIndex(
            (step) => step.id === id,
          );
          if (stepIndex > -1) {
            stepsStore.steps[stepIndex].isComplete = true;
          }
        }}
        onStepChange$={handleStepChange}
      />
    </div>
  );
});
