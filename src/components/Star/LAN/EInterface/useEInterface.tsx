import { useContext, $, useSignal } from "@builder.io/qwik";
import {
  StarContext,
  type StarContextType,
} from "~/components/Star/StarContext";
import type { Ethernet, EthernetInterfaceConfig } from "~/components/Star/StarContext";
import { useInterfaceManagement } from "../../hooks/useInterfaceManagement";
import { useNetworks } from "~/utils/useNetworks";

export const useEInterface = () => {
  const ctx = useContext<StarContextType>(StarContext);
  const interfaceManagement = useInterfaceManagement();
  const { getCurrentNetworks$ } = useNetworks();
  const selectedEInterfaces = useSignal<EthernetInterfaceConfig[]>([]);

  const availableNetworks = useSignal<string[]>([]);

  // Generate available network options dynamically from StarContext.Networks
  // This builds a list of selectable networks based on:
  // 1. BaseNetworks - Always show networks with 'true' value (Split, Domestic, Foreign, VPN)
  // 2. ForeignNetworks - Show individual foreign link names (only if more than 1 link)
  // 3. DomesticNetworks - Show individual domestic link names (only if more than 1 link)
  // 4. VPNClientNetworks - Show individual VPN client names (only if more than 1 client)
  const generateAvailableNetworks = $(async () => {
    const networks = await getCurrentNetworks$();
    const options: string[] = [];

    // Add base networks with true values (ALWAYS show if true)
    if (networks.BaseNetworks?.Split) options.push("Split");
    if (networks.BaseNetworks?.Domestic) options.push("Domestic");
    if (networks.BaseNetworks?.Foreign) options.push("Foreign");
    if (networks.BaseNetworks?.VPN) options.push("VPN");

    // Add foreign network names (only if MORE THAN ONE)
    if (networks.ForeignNetworks && networks.ForeignNetworks.length > 1) {
      options.push(...networks.ForeignNetworks);
    }

    // Add domestic network names (only if MORE THAN ONE)
    if (networks.DomesticNetworks && networks.DomesticNetworks.length > 1) {
      options.push(...networks.DomesticNetworks);
    }

    // Flatten VPN client networks and add (only if MORE THAN ONE total)
    const allVPNClients: string[] = [];
    if (networks.VPNClientNetworks) {
      Object.values(networks.VPNClientNetworks).forEach(names => {
        if (names) allVPNClients.push(...names);
      });
    }
    if (allVPNClients.length > 1) {
      options.push(...allVPNClients);
    }

    availableNetworks.value = options;
    return options;
  });

  // Set default network based on DomesticLink status
  // This is critical for proper network configuration:
  // - DomesticLink true: Split network is default (supports both domestic and foreign traffic)
  // - DomesticLink false: VPN network is default (no domestic network available)
  const getDefaultNetwork = $(() => {
    // Explicitly check if true or false to avoid undefined/null issues
    return (ctx.state.Choose.WANLinkType === "domestic" || ctx.state.Choose.WANLinkType === "both") ? "Split" : "VPN";
  });

  const getUsedWANInterfaces = $(() => {
    const usedInterfaces: string[] = [];

    // Access interface name through WANConfigs structure
    const foreignInterfaceName = ctx.state.WAN.WANLink.Foreign?.WANConfigs[0]?.InterfaceConfig.InterfaceName;
    if (foreignInterfaceName) {
      usedInterfaces.push(foreignInterfaceName);
    }

    const domesticInterfaceName = ctx.state.WAN.WANLink.Domestic?.WANConfigs[0]?.InterfaceConfig.InterfaceName;
    if (domesticInterfaceName) {
      usedInterfaces.push(domesticInterfaceName);
    }

    return usedInterfaces;
  });

  const getAvailableEInterfaces = $(async () => {
    const routerModels = ctx.state.Choose.RouterModels;
    if (!routerModels || routerModels.length === 0) {
      return [] as Ethernet[];
    }

    const masterModel = routerModels.find((model) => model.isMaster);
    if (!masterModel || !masterModel.Interfaces.Interfaces.ethernet) {
      return [] as Ethernet[];
    }

    const usedWANInterfaces = await getUsedWANInterfaces();

    return (masterModel.Interfaces.Interfaces.ethernet || []).filter(
      (intf: string) => !usedWANInterfaces.includes(intf),
    ) as Ethernet[];
  });

  const addEInterface = $(
    async (EInterfaceName: Ethernet, bridgeNetwork?: string) => {
      // If bridge network not specified, use default based on DomesticLink
      const network = bridgeNetwork || (await getDefaultNetwork());

      const newEInterface: EthernetInterfaceConfig = {
        name: EInterfaceName,
        bridge: network,
      };

      selectedEInterfaces.value = [...selectedEInterfaces.value, newEInterface];

      // Mark interface as occupied for LAN
      await interfaceManagement.markInterfaceAsOccupied$(EInterfaceName, "LAN");

      ctx.updateLAN$({
        Interface: selectedEInterfaces.value,
      });
    },
  );

  const removeEInterface = $(async (EInterfaceName: Ethernet) => {
    selectedEInterfaces.value = selectedEInterfaces.value.filter(
      (intf) => intf.name !== EInterfaceName,
    );

    // Release interface from occupied list
    await interfaceManagement.releaseInterface$(EInterfaceName);

    ctx.updateLAN$({
      Interface: selectedEInterfaces.value,
    });
  });

  const updateEInterface = $(
    (EInterfaceName: Ethernet, bridgeNetwork: string) => {
      selectedEInterfaces.value = selectedEInterfaces.value.map((intf) => {
        if (intf.name === EInterfaceName) {
          return { ...intf, bridge: bridgeNetwork };
        }
        return intf;
      });

      ctx.updateLAN$({
        Interface: selectedEInterfaces.value,
      });
    },
  );

  const initializeFromContext = $(() => {
    if (ctx.state.LAN.Interface && ctx.state.LAN.Interface.length > 0) {
      selectedEInterfaces.value = ctx.state.LAN.Interface;
    }
  });

  return {
    availableNetworks,
    selectedEInterfaces,
    getAvailableEInterfaces,
    getUsedWANInterfaces,
    addEInterface,
    removeEInterface,
    updateEInterface,
    initializeFromContext,
    getDefaultNetwork,
    generateAvailableNetworks,
  };
};
