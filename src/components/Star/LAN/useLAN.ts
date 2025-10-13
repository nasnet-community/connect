import { useContext, useStore, $, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../StarContext/StarContext";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { EthernetInterfaceConfig, Subnets } from "../StarContext";
import type { PropFunction, Component } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";

interface UseLANParams {
  onComplete$: PropFunction<() => void>;
  WirelessStep: Component<StepProps>;
  EInterfaceStep: Component<StepProps>;
  VPNServerStep: Component<StepProps>;
  TunnelStep: Component<StepProps>;
  SubnetsStep: Component<StepProps>;
}

export const useLAN = ({
  onComplete$,
  WirelessStep,
  EInterfaceStep,
  VPNServerStep,
  TunnelStep,
  SubnetsStep,
}: UseLANParams) => {
  const starContext = useContext(StarContext);

  const hasWirelessEInterface = starContext.state.Choose.RouterModels.some(
    (routerModel) => !!routerModel.Interfaces.Interfaces.wireless?.length,
  );

  const isDomesticLinkEnabled = (
    starContext.state.Choose.WANLinkType === "domestic" || 
    starContext.state.Choose.WANLinkType === "both"
  );

  const isAdvancedMode = starContext.state.Choose.Mode === "advance";

  // Build steps based on mode and configuration
  let nextId = 1;
  const baseSteps: StepItem[] = [];

  if (hasWirelessEInterface) {
    baseSteps.push({
      id: nextId,
      title: $localize`Wireless`,
      component: WirelessStep,
      isComplete: false,
    });
    nextId++;
  }

  if (isAdvancedMode) {
    baseSteps.push({
      id: nextId,
      title: $localize`LAN EInterfaces`,
      component: EInterfaceStep,
      isComplete: false,
    });
    nextId++;
  }

  // Only add VPNServer and Tunnel steps if DomesticLink is enabled
  if (isDomesticLinkEnabled) {
    baseSteps.push({
      id: nextId,
      title: $localize`VPN Server`,
      component: VPNServerStep,
      isComplete: false,
    });
    nextId++;

    // Only add Tunnel step if in Advanced mode (not Easy mode)
    if (isAdvancedMode) {
      baseSteps.push({
        id: nextId,
        title: $localize`Network Tunnels`,
        component: TunnelStep,
        isComplete: false,
      });
      nextId++;
    }
  }

  // Create advanced steps by copying base steps
  const advancedSteps: StepItem[] = [...baseSteps];

  // Only add Subnets step in advanced mode
  if (isAdvancedMode) {
    advancedSteps.push({
      id: nextId,
      title: $localize`Network Subnets`,
      component: SubnetsStep,
      isComplete: false,
    });
  }

  const steps = isAdvancedMode ? advancedSteps : baseSteps;

  // Create a store to manage steps
  const stepsStore = useStore({
    activeStep: 0,
    steps: steps,
  });

  const handleStepComplete = $((id: number) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;

      // Move to the next step if there is one
      if (stepIndex < stepsStore.steps.length - 1) {
        stepsStore.activeStep = stepIndex + 1;
      } else {
        // This was the last step, so complete the entire LAN section
        onComplete$();
      }

      // Check if all steps are now complete
      if (stepsStore.steps.every((step) => step.isComplete)) {
        onComplete$();
      }
    }
  });

  const handleStepChange = $((id: number) => {
    stepsStore.activeStep = id - 1;
  });

  // Auto-apply default subnets, interfaces, and ExtraConfig in Easy mode
  useTask$(async ({ track }) => {
    track(() => starContext.state.Choose.Mode);
    track(() => starContext.state.Choose.WANLinkType);
    track(() => starContext.state.WAN.VPNClient);
    track(() => starContext.state.Choose.Networks);
    
    const isEasyMode = starContext.state.Choose.Mode === "easy";
    const hasSubnets = starContext.state.LAN.Subnets?.BaseNetworks && 
                       Object.keys(starContext.state.LAN.Subnets.BaseNetworks).length > 0;
    const hasInterfaces = starContext.state.LAN.Interface && 
                          starContext.state.LAN.Interface.length > 0;
    
    if (isEasyMode) {
      // === SUBNET CONFIGURATION ===
      if (!hasSubnets) {
        const wanLinkType = starContext.state.Choose.WANLinkType;
        const isDomesticLink = wanLinkType === "domestic" || wanLinkType === "both";
        const hasForeignLink = wanLinkType === "foreign" || wanLinkType === "both";
        
        // Check if VPN client is configured
        const vpnClient = starContext.state.WAN.VPNClient;
        const hasVPNClient = vpnClient && (
          vpnClient.Wireguard?.length ||
          vpnClient.OpenVPN?.length ||
          vpnClient.PPTP?.length ||
          vpnClient.L2TP?.length ||
          vpnClient.SSTP?.length ||
          vpnClient.IKeV2?.length
        );
        
        // Create properly structured subnets with BaseNetworks wrapper
        const defaultSubnets: Partial<Subnets> = {
          BaseNetworks: {}
        };
        
        // Add base networks based on WANLinkType
        if (isDomesticLink) {
          defaultSubnets.BaseNetworks!.Split = {
            name: "Split",
            subnet: "192.168.10.0/24"
          };
          defaultSubnets.BaseNetworks!.Domestic = {
            name: "Domestic",
            subnet: "192.168.20.0/24"
          };
          defaultSubnets.BaseNetworks!.Foreign = {
            name: "Foreign",
            subnet: "192.168.30.0/24"
          };
          
          // VPN network for domestic/both (only if VPN clients configured)
          if (hasVPNClient) {
            defaultSubnets.BaseNetworks!.VPN = {
              name: "VPN",
              subnet: "192.168.40.0/24"
            };
          }
        } else if (hasForeignLink) {
          // Foreign only mode
          defaultSubnets.BaseNetworks!.Foreign = {
            name: "Foreign",
            subnet: "192.168.30.0/24"
          };
          
          // VPN network for foreign-only (only if VPN clients configured)
          if (hasVPNClient) {
            defaultSubnets.BaseNetworks!.VPN = {
              name: "VPN",
              subnet: "192.168.10.0/24"
            };
          }
        }
        
        // Only update if we have at least one subnet to configure
        if (Object.keys(defaultSubnets.BaseNetworks!).length > 0) {
          await starContext.updateLAN$({ Subnets: defaultSubnets as Subnets });
        }
      }
      
      // === INTERFACE CONFIGURATION ===
      if (!hasInterfaces) {
        const masterRouter = starContext.state.Choose.RouterModels.find(rm => rm.isMaster);
        
        if (masterRouter) {
          // Get all available ethernet interfaces
          const allEthernet = masterRouter.Interfaces.Interfaces.ethernet || [];
          
          // Get occupied interfaces (WAN, Trunk, etc.)
          const occupiedInterfaces = masterRouter.Interfaces.OccupiedInterfaces;
          const occupiedNames = occupiedInterfaces.map(oi => oi.interface);
          
          // Filter out occupied interfaces
          const availableInterfaces = allEthernet.filter(
            intf => !occupiedNames.includes(intf)
          );
          
          // Determine which network to assign based on BaseNetworks priority
          // Order: Split → VPN → Domestic → Foreign
          const baseNetworks = starContext.state.Choose.Networks.BaseNetworks;
          let targetNetwork: string | null = null;
          
          if (baseNetworks?.Split) {
            targetNetwork = "Split";
          } else if (baseNetworks?.VPN) {
            targetNetwork = "VPN";
          } else if (baseNetworks?.Domestic) {
            targetNetwork = "Domestic";
          } else if (baseNetworks?.Foreign) {
            targetNetwork = "Foreign";
          }
          
          // Create interface configurations for all available interfaces
          if (targetNetwork && availableInterfaces.length > 0) {
            const interfaceConfigs: EthernetInterfaceConfig[] = availableInterfaces.map(intf => ({
              name: intf,
              bridge: targetNetwork as string
            }));
            
            await starContext.updateLAN$({ Interface: interfaceConfigs });
          }
        }
      }
      
      // === EXTRA CONFIG INITIALIZATION ===
      // In Easy mode, ensure ExtraConfig has default values since Extra step is not shown
      const hasExtraConfig = starContext.state.ExtraConfig.RUI.Timezone;
      
      if (!hasExtraConfig) {
        await starContext.updateExtraConfig$({
          RUI: {
            Timezone: "Asia/Tehran",
            IPAddressUpdate: { interval: "Daily", time: "03:00" },
          },
          usefulServices: {
            certificate: {
              SelfSigned: true,
              LetsEncrypt: true,
            },
            ntp: {
              servers: ["pool.ntp.org", "time.cloudflare.com", "time.google.com"],
            },
            graphing: {
              Interface: true,
              Queue: true,
              Resources: true,
            },
            cloudDDNS: {
              ddnsEntries: [],
            },
            upnp: {
              linkType: "",
            },
            natpmp: {
              linkType: "",
            },
          },
        });
      }
    }
  });

  return {
    stepsStore,
    hasWirelessEInterface,
    isDomesticLinkEnabled,
    isAdvancedMode,
    handleStepComplete,
    handleStepChange,
  };
};

