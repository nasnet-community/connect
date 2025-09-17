import { useContext, $, useSignal } from "@builder.io/qwik";
import {
  StarContext,
  type StarContextType,
} from "../../StarContext/StarContext";
import type { Ethernet } from "../../StarContext/CommonType";
import type { EthernetInterfaceConfig } from "../../StarContext/LANType";
import type { Networks } from "../../StarContext/CommonType";

export const useEInterface = () => {
  const ctx = useContext<StarContextType>(StarContext);
  const selectedEInterfaces = useSignal<EthernetInterfaceConfig[]>([]);

  // Filter available networks based on DomesticLink
  // The DomesticLink property determines whether we need Domestic network options:
  // - When true: We offer Domestic, Foreign, Split, and VPN options
  // - When false: We restrict options to Foreign and VPN only
  const isDomesticLinkEnabled = (ctx.state.Choose.WANLinkType === "domestic" || ctx.state.Choose.WANLinkType === "both");
  const networkOptions: Networks[] = isDomesticLinkEnabled
    ? ["Domestic", "Foreign", "Split", "VPN"]
    : ["Foreign", "VPN"];

  const availableNetworks = useSignal<Networks[]>(networkOptions);

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
    const foreignInterfaceName = ctx.state.WAN.WANLink.Foreign.WANConfigs[0]?.InterfaceConfig.InterfaceName;
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
    if (!masterModel || !masterModel.Interfaces.ethernet) {
      return [] as Ethernet[];
    }

    const usedWANInterfaces = await getUsedWANInterfaces();

    return masterModel.Interfaces.ethernet.filter(
      (intf) => !usedWANInterfaces.includes(intf),
    ) as Ethernet[];
  });

  const addEInterface = $(
    async (EInterfaceName: Ethernet, bridgeNetwork?: Networks) => {
      // If bridge network not specified, use default based on DomesticLink
      const network = bridgeNetwork || (await getDefaultNetwork());

      const newEInterface: EthernetInterfaceConfig = {
        name: EInterfaceName,
        bridge: network,
      };

      selectedEInterfaces.value = [...selectedEInterfaces.value, newEInterface];

      ctx.updateLAN$({
        Interface: selectedEInterfaces.value,
      });
    },
  );

  const removeEInterface = $((EInterfaceName: Ethernet) => {
    selectedEInterfaces.value = selectedEInterfaces.value.filter(
      (intf) => intf.name !== EInterfaceName,
    );

    ctx.updateLAN$({
      Interface: selectedEInterfaces.value,
    });
  });

  const updateEInterface = $(
    (EInterfaceName: Ethernet, bridgeNetwork: Networks) => {
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
  };
};
