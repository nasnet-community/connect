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
    track(() => starContext.state.LAN.VPNServer);
    track(() => starContext.state.Choose.Networks);
    
    const isEasyMode = starContext.state.Choose.Mode === "easy";
    const hasInterfaces = starContext.state.LAN.Interface && 
                          starContext.state.LAN.Interface.length > 0;
    
    if (isEasyMode) {
      // === GRANULAR SUBNET CONFIGURATION ===
      // Check and add each subnet section independently
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
      
      // Create properly structured subnets object to collect changes
      const defaultSubnets: Partial<Subnets> = {};
      
      // === BASE NETWORKS ===
      // Only add BaseNetworks if they don't exist or have empty subnet values
      const hasValidBaseNetworks = starContext.state.LAN.Subnets?.BaseSubnets && 
        Object.values(starContext.state.LAN.Subnets.BaseSubnets).every(
          subnet => subnet?.subnet && subnet.subnet.trim() !== ""
        );
      
      if (!hasValidBaseNetworks) {
        defaultSubnets.BaseSubnets = {};
        
        // Add base networks based on WANLinkType
        if (isDomesticLink) {
          defaultSubnets.BaseSubnets.Split = {
            name: "Split",
            subnet: "192.168.10.0/24"
          };
          defaultSubnets.BaseSubnets.Domestic = {
            name: "Domestic",
            subnet: "192.168.20.0/24"
          };
          defaultSubnets.BaseSubnets.Foreign = {
            name: "Foreign",
            subnet: "192.168.30.0/24"
          };
          
          // VPN network for domestic/both (only if VPN clients configured)
          if (hasVPNClient) {
            defaultSubnets.BaseSubnets.VPN = {
              name: "VPN",
              subnet: "192.168.40.0/24"
            };
          }
        } else if (hasForeignLink) {
          // Foreign only mode
          defaultSubnets.BaseSubnets.Foreign = {
            name: "Foreign",
            subnet: "192.168.30.0/24"
          };
          
          // VPN network for foreign-only (only if VPN clients configured)
          if (hasVPNClient) {
            defaultSubnets.BaseSubnets.VPN = {
              name: "VPN",
              subnet: "192.168.10.0/24"
            };
          }
        }
      }
      
      // === VPN SERVER NETWORKS ===
      // Only add VPNServerNetworks if they don't exist or have empty values
      const vpnServers = starContext.state.LAN.VPNServer;
      
      const hasValidVPNServerNetworks = (() => {
        const vpnServerSubnets = starContext.state.LAN.Subnets?.VPNServerSubnets;
        if (!vpnServerSubnets) return false;
        
        // Check arrays (Wireguard, OpenVPN)
        const arraySubnets = [vpnServerSubnets.Wireguard, vpnServerSubnets.OpenVPN].filter(Boolean);
        for (const subnets of arraySubnets) {
          if (Array.isArray(subnets) && !subnets.every((s: any) => s?.subnet && s.subnet.trim() !== "")) {
            return false;
          }
        }
        
        // Check single objects (L2TP, PPTP, SSTP, IKev2)
        const singleSubnets = [
          vpnServerSubnets.L2TP, 
          vpnServerSubnets.PPTP, 
          vpnServerSubnets.SSTP, 
          vpnServerSubnets.IKev2
        ].filter(Boolean);
        for (const subnet of singleSubnets) {
          if (subnet && (!subnet.subnet || subnet.subnet.trim() === "")) {
            return false;
          }
        }
        
        return true;
      })();
      
      if (!hasValidVPNServerNetworks && vpnServers) {
        defaultSubnets.VPNServerSubnets = {};
        
        // WireGuard servers (110+index)
        if (vpnServers.WireguardServers?.length) {
          defaultSubnets.VPNServerSubnets.Wireguard = vpnServers.WireguardServers.map((server: any, index: number) => ({
            name: server.Interface.Name || `WireGuard${index + 1}`,
            subnet: `192.168.${110 + index}.0/24`
          }));
        }
        
        // OpenVPN servers (120+index)
        if (vpnServers.OpenVpnServer?.length) {
          defaultSubnets.VPNServerSubnets.OpenVPN = vpnServers.OpenVpnServer.map((server: any, index: number) => ({
            name: server.name || `OpenVPN${index + 1}`,
            subnet: `192.168.${120 + index}.0/24`
          }));
        }
        
        // PPTP server (130)
        if (vpnServers.PptpServer?.enabled) {
          defaultSubnets.VPNServerSubnets.PPTP = {
            name: "PPTP",
            subnet: "192.168.130.0/24"
          };
        }
        
        // SSTP server (140)
        if (vpnServers.SstpServer?.enabled) {
          defaultSubnets.VPNServerSubnets.SSTP = {
            name: "SSTP",
            subnet: "192.168.140.0/24"
          };
        }
        
        // L2TP server (150)
        if (vpnServers.L2tpServer?.enabled) {
          defaultSubnets.VPNServerSubnets.L2TP = {
            name: "L2TP",
            subnet: "192.168.150.0/24"
          };
        }
        
        // IKEv2 server (160)
        if (vpnServers.Ikev2Server) {
          defaultSubnets.VPNServerSubnets.IKev2 = {
            name: "IKEv2",
            subnet: "192.168.160.0/24"
          };
        }
      }
      
      // === MULTIPLE WAN LINK NETWORKS ===
      const wanLinks = starContext.state.WAN.WANLink;
      
      // Domestic WAN links (if 1+) - check if subnets have valid values
      const hasValidDomesticNetworks = starContext.state.LAN.Subnets?.DomesticSubnets ? 
        starContext.state.LAN.Subnets.DomesticSubnets.every(
          subnet => subnet.subnet && subnet.subnet.trim() !== ""
        ) : false;
      const domesticLinks = wanLinks.Domestic?.WANConfigs;
      
      if (!hasValidDomesticNetworks && domesticLinks && domesticLinks.length >= 1) {
        defaultSubnets.DomesticSubnets = domesticLinks.map((link, index) => ({
          name: link.name || `Domestic${index + 1}`,
          subnet: `192.168.${21 + index}.0/24`
        }));
      }
      
      // Foreign WAN links (if 1+) - check if subnets have valid values
      const hasValidForeignNetworks = starContext.state.LAN.Subnets?.ForeignSubnets ? 
        starContext.state.LAN.Subnets.ForeignSubnets.every(
          subnet => subnet.subnet && subnet.subnet.trim() !== ""
        ) : false;
      const foreignLinks = wanLinks.Foreign?.WANConfigs;
      
      if (!hasValidForeignNetworks && foreignLinks && foreignLinks.length >= 1) {
        defaultSubnets.ForeignSubnets = foreignLinks.map((link, index) => ({
          name: link.name || `Foreign${index + 1}`,
          subnet: `192.168.${31 + index}.0/24`
        }));
      }
      
      // === VPN CLIENT NETWORKS ===
      // Count total VPN clients across all types
      const vpnClientConfigs: Array<{ name: string; type: string }> = [];
      
      if (vpnClient) {
        if (vpnClient.Wireguard?.length) {
          vpnClient.Wireguard.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `WireGuard Client ${index + 1}`, 
              type: "Wireguard" 
            });
          });
        }
        if (vpnClient.OpenVPN?.length) {
          vpnClient.OpenVPN.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `OpenVPN Client ${index + 1}`, 
              type: "OpenVPN" 
            });
          });
        }
        if (vpnClient.PPTP?.length) {
          vpnClient.PPTP.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `PPTP Client ${index + 1}`, 
              type: "PPTP" 
            });
          });
        }
        if (vpnClient.L2TP?.length) {
          vpnClient.L2TP.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `L2TP Client ${index + 1}`, 
              type: "L2TP" 
            });
          });
        }
        if (vpnClient.SSTP?.length) {
          vpnClient.SSTP.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `SSTP Client ${index + 1}`, 
              type: "SSTP" 
            });
          });
        }
        if (vpnClient.IKeV2?.length) {
          vpnClient.IKeV2.forEach((client, index) => {
            vpnClientConfigs.push({ 
              name: client.Name || `IKEv2 Client ${index + 1}`, 
              type: "IKEv2" 
            });
          });
        }
      }
      
      // Only create VPN Client networks if there are 1+ clients and they have empty subnet values
      const hasValidVPNClientNetworks = (() => {
        const vpnClientSubnets = starContext.state.LAN.Subnets?.VPNClientSubnets;
        if (!vpnClientSubnets) return false;
        
        // Check all VPN client subnet arrays have valid values
        return Object.values(vpnClientSubnets).every(
          subnets => Array.isArray(subnets) && subnets.every(
            subnet => subnet?.subnet && subnet.subnet.trim() !== ""
          )
        );
      })();
      
      if (!hasValidVPNClientNetworks && vpnClientConfigs.length >= 1) {
        defaultSubnets.VPNClientSubnets = {};
        
        // Group by type
        const wireguardClients = vpnClientConfigs.filter(c => c.type === "Wireguard");
        const openVpnClients = vpnClientConfigs.filter(c => c.type === "OpenVPN");
        const pptpClients = vpnClientConfigs.filter(c => c.type === "PPTP");
        const l2tpClients = vpnClientConfigs.filter(c => c.type === "L2TP");
        const sstpClients = vpnClientConfigs.filter(c => c.type === "SSTP");
        const ikev2Clients = vpnClientConfigs.filter(c => c.type === "IKEv2");
        
        let subnetIndex = 41; // Starting at 192.168.41.0
        
        if (wireguardClients.length > 0) {
          defaultSubnets.VPNClientSubnets.Wireguard = wireguardClients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
        
        if (openVpnClients.length > 0) {
          defaultSubnets.VPNClientSubnets.OpenVPN = openVpnClients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
        
        if (pptpClients.length > 0) {
          defaultSubnets.VPNClientSubnets.PPTP = pptpClients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
        
        if (l2tpClients.length > 0) {
          defaultSubnets.VPNClientSubnets.L2TP = l2tpClients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
        
        if (sstpClients.length > 0) {
          defaultSubnets.VPNClientSubnets.SSTP = sstpClients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
        
        if (ikev2Clients.length > 0) {
          defaultSubnets.VPNClientSubnets.IKev2 = ikev2Clients.map((client) => ({
            name: client.name,
            subnet: `192.168.${subnetIndex++}.0/24`
          }));
        }
      }
      
      // === UPDATE SUBNETS ===
      // Only update if we have new subnets to add
      if (Object.keys(defaultSubnets).length > 0) {
        // Merge with existing subnets to avoid overwriting
        const updatedSubnets = {
          ...starContext.state.LAN.Subnets,
          ...defaultSubnets
        } as Subnets;
        
        await starContext.updateLAN$({ Subnets: updatedSubnets });
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

