import { useContext, $, useSignal } from '@builder.io/qwik';
import { StarContext, type StarContextType } from '../../StarContext/StarContext';
import type { Ethernet } from '../../StarContext/CommonType';
import type { EthernetInterfaceConfig } from '../../StarContext/LANType';
import type { Networks } from '../../StarContext/CommonType';

export const useEInterface = () => {
  const ctx = useContext<StarContextType>(StarContext);
  const selectedEInterfaces = useSignal<EthernetInterfaceConfig[]>([]);
  const availableNetworks = useSignal<Networks[]>(['Domestic', 'Foreign', 'Split', 'VPN']);


  const getUsedWANInterfaces = $(() => {
    const usedInterfaces: string[] = [];
    
    if (ctx.state.WAN.WANLink.Foreign?.InterfaceName) {
      usedInterfaces.push(ctx.state.WAN.WANLink.Foreign.InterfaceName);
    }
    
    if (ctx.state.WAN.WANLink.Domestic?.InterfaceName) {
      usedInterfaces.push(ctx.state.WAN.WANLink.Domestic.InterfaceName);
    }
    
    return usedInterfaces;
  });

  const getAvailableEInterfaces = $(async () => {
    const routerModels = ctx.state.Choose.RouterModels;
    if (!routerModels || routerModels.length === 0) {
      return [] as Ethernet[];
    }

    const masterModel = routerModels.find(model => model.isMaster);
    if (!masterModel || !masterModel.Interfaces.ethernet) {
      return [] as Ethernet[];
    }

    const usedWANInterfaces = await getUsedWANInterfaces();

    return masterModel.Interfaces.ethernet.filter(
      (intf) => !usedWANInterfaces.includes(intf)
    ) as Ethernet[];
  });

  const addEInterface = $((EInterfaceName: Ethernet, bridgeNetwork: Networks) => {
    const newEInterface: EthernetInterfaceConfig = {
      name: EInterfaceName,
      bridge: bridgeNetwork,
    };
    
    selectedEInterfaces.value = [...selectedEInterfaces.value, newEInterface];
    
    ctx.updateLAN$({
      Interface: selectedEInterfaces.value,
    });
  });

  const removeEInterface = $((EInterfaceName: Ethernet) => {
    selectedEInterfaces.value = selectedEInterfaces.value.filter(
      (intf) => intf.name !== EInterfaceName
    );
    
    ctx.updateLAN$({
      Interface: selectedEInterfaces.value,
    });
  });

  const updateEInterface = $((EInterfaceName: Ethernet, bridgeNetwork: Networks) => {
    selectedEInterfaces.value = selectedEInterfaces.value.map((intf) => {
      if (intf.name === EInterfaceName) {
        return { ...intf, bridge: bridgeNetwork };
      }
      return intf;
    });
    
    ctx.updateLAN$({
      Interface: selectedEInterfaces.value,
    });
  });

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
  };
};
