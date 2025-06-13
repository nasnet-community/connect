import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "../ConfigGenerator";
import { WirelessConfig } from "./Wireless/Wireless";
import { DisableInterfaces } from "./Wireless/WirelessUtil";
import type { EthernetInterfaceConfig } from "~/components/Star/StarContext/LANType";
import { TunnelWrapper } from "./TunnelCG";
import { VPNServerWrapper } from "./VPNServer/VPNServerWrapper";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";

export const  IPv6 = (): RouterConfig => {
       const config: RouterConfig = {
        "/ipv6 settings": ["set disable-ipv6=yes"],
        "/ipv6 firewall filter": [
          "add chain=input action=drop",
          "add chain=forward action=drop",
        ],
       }

       return config
}

export const EthernetBridgePorts = (Ethernet: EthernetInterfaceConfig[]): RouterConfig => {
       const config: RouterConfig = {
         "/interface bridge port": [],
       };
     
       Ethernet.forEach((iface) => {
         config["/interface bridge port"].push(
           `add bridge=LANBridge${iface.bridge} interface=${iface.name}`,
         );
       });
     
       return config;
     }


export const LANCG = (state: StarState): RouterConfig => {
       const configs: RouterConfig[] = [IPv6()];

       // Only call WirelessConfig if state.LAN.Wireless is defined
       if (state.LAN.Wireless) {
              configs.push(WirelessConfig(
                     state.LAN.Wireless,
                     state.WAN.WANLink,
                     state.Choose.DomesticLink
              ));
       } else {
              configs.push(DisableInterfaces());
       }

       if (state.LAN.Tunnel) {
              configs.push(TunnelWrapper(state.LAN.Tunnel));
       }

       if (state.LAN.VPNServer) {
              configs.push(VPNServerWrapper(state.LAN.VPNServer));
       }

       // Only add Ethernet bridge ports if LAN.Interface exists
       if (state.LAN.Interface && Array.isArray(state.LAN.Interface)) {
              configs.push(EthernetBridgePorts(state.LAN.Interface));
       }

       return mergeMultipleConfigs(...configs);
}





















