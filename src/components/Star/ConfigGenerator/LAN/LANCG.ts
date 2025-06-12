import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "../ConfigGenerator";
import { DisableInterfaces, WirelessConfig } from "./Wireless";
import type { EthernetInterfaceConfig } from "~/components/Star/StarContext/LANType";
import { TunnelWrapper } from "./TunnelCG";
import { VPNServerWrapper } from "./VPNServer/VPNServerCG";

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
       const config: RouterConfig = {
              ...IPv6(),
       };

       // Only call WirelessConfig if state.LAN.Wireless is defined
       if (state.LAN.Wireless) {
              Object.assign(config, WirelessConfig(
                     state.LAN.Wireless,
                     state.WAN.WANLink,
                     state.Choose.DomesticLink
              ));
       } else {
              Object.assign(config, DisableInterfaces());
       }

       if (state.LAN.Tunnel) {
              Object.assign(config, TunnelWrapper(state.LAN.Tunnel));
       }

       if (state.LAN.VPNServer) {
              Object.assign(config, VPNServerWrapper(state.LAN.VPNServer));
       }


       
       // Only add Ethernet bridge ports if LAN.Interface exists
       if (state.LAN.Interface && Array.isArray(state.LAN.Interface)) {
              Object.assign(config, EthernetBridgePorts(state.LAN.Interface));
       }

       return config;
}





















