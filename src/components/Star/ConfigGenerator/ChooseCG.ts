import type { RouterConfig } from "./ConfigGenerator";
// import { mergeMultipleConfigs } from "./ConfigGenerator";
import type { StarState } from "~/components/Star/StarContext/StarContext";


export const BaseConfig = (): RouterConfig => {
       const config: RouterConfig = {
              "/interface list": [
                     "add name=WAN",
                     "add name=LAN",
              ],
              "/ip firewall address-list": [
                     "add address=192.168.0.0/16 list=LOCAL-IP",
                     "add address=172.16.0.0/12 list=LOCAL-IP",
                     "add address=10.0.0.0/8 list=LOCAL-IP",
              ],
              "/ip firewall nat": [
                     "add action=masquerade chain=srcnat out-interface-list=WAN",
              ],
              
       }


       return config
}

export const DometicBase = (): RouterConfig => {
       const config: RouterConfig = {
              "/interface bridge": [
                     "add name=LANBridgeDOM",
              ],
              "/interface list": [
                     "add name=DOM-WAN",
                     "add name=DOM-LAN",
              ],
              "/ip pool": [
                     "add name=dhcp_pool1 ranges=192.168.20.2-192.168.20.254",
              ],
              "/ip dhcp-server": [
                     "add address-pool=dhcp_pool0 interface=LANBridgeSplit name=dhcp1",
              ],
              "/ip dhcp-server network": [
                     "add address=192.168.20.0/24 dns-server=192.168.20.1 gateway=192.168.20.1",
              ],
              "/ip address": [
                     "add address=192.168.20.1/24 interface=LANBridgeDOM network=192.168.20.0",
              ],
              "/routing table": [
                     "add fib name=to-DOM",
              ],
              "/interface list member": [
                     "add interface=LANBridgeDOM list=LAN",
                     "add interface=LANBridgeDOM list=DOM-LAN",
              ],
              "/ip firewall address-list": [
                     "add address=192.168.20.0/24 list=DOM-Local",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=DOM new-connection-mark=conn-DOM \\
                            passthrough=yes src-address-list=DOM-Local`,
                     `add action=mark-routing chain=prerouting comment=DOM connection-mark=conn-DOM \\
                            new-routing-mark=to-DOM passthrough=no src-address-list=DOM-Local`,
                     `add action=mark-routing chain=prerouting comment=DOM new-routing-mark=to-DOM \\
                            passthrough=no src-address-list=DOM-Local`,
              ],
              "/ip firewall nat": [
                     `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=udp \\
                            src-address-list=DOM-Local to-addresses=8.8.8.8`,
                     `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=tcp \\
                            src-address-list=DOM-Local to-addresses=8.8.8.8`,
              ],
              "/ip route": [
                     `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-DOM`,
              ],
       }

       return config
};

export const ForeignBase = (): RouterConfig => {

       const config: RouterConfig = {
              "/interface bridge": [
                     "add name=LANBridgeFRN",
              ],
              "/interface list": [
                     "add name=FRN-WAN",
                     "add name=FRN-LAN",
              ],
              "/ip pool": [
                     "add name=dhcp_pool2 ranges=192.168.30.2-192.168.30.254",
              ],
              "/ip dhcp-server": [
                     "add address-pool=dhcp_pool2 interface=LANBridgeFRN name=dhcp3",
              ],
              "/ip dhcp-server network": [
                     "add address=192.168.30.0/24 dns-server=192.168.30.1 gateway=192.168.30.1",
              ],
              "/ip address": [
                     "add address=192.168.30.1/24 interface=LANBridgeFRN network=192.168.30.0",
              ],
              "/routing table": [
                     "add fib name=to-FRN",
              ],
              "/interface list member": [
                     "add interface=LANBridgeFRN list=LAN",
                     "add interface=LANBridgeFRN list=FRN-LAN",
              ],
              "/ip firewall address-list": [
                     "add address=192.168.30.0/24 list=FRN-Local",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=FRN dst-address-list=!DOMAddList \\
                            new-connection-mark=conn-FRN passthrough=yes src-address-list=FRN-Local`,
                     `add action=mark-routing chain=prerouting comment=FRN connection-mark=conn-FRN \\
                            dst-address-list=!DOMAddList new-routing-mark=to-FRN passthrough=no src-address-list=FRN-Local`,
                     `add action=mark-routing chain=prerouting comment=FRN dst-address-list=!DOMAddList \\
                            new-routing-mark=to-FRN passthrough=no src-address-list=FRN-Local`,
              ],
              "/ip firewall nat": [
                     `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=udp \\
                            src-address-list=FRN-Local to-addresses=1.1.1.1`,
                     `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=tcp \\
                            src-address-list=FRN-Local to-addresses=1.1.1.1`,
              ],
              "/ip route": [
                     `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-FRN`,
              ],
       }


       return config
}

export const VPNBase = (): RouterConfig => {

       const config: RouterConfig = {
              "/interface bridge": [
                     "add name=LANBridgeVPN",
              ],
              "/interface list": [
                     "add name=VPN-LAN",
              ],
              "/ip pool": [
                     "add name=dhcp_pool3 ranges=192.168.40.2-192.168.40.254",
              ],
              "/ip dhcp-server": [
                     "add address-pool=dhcp_pool3 interface=LANBridgeVPN name=dhcp4",
              ],
              "/ip dhcp-server network": [
                     "add address=192.168.40.0/24 dns-server=192.168.40.1 gateway=192.168.40.1",
              ],
              "/ip address": [
                     "add address=192.168.40.1/24 interface=LANBridgeVPN network=192.168.40.0",
              ],
              "/routing table": [
                     "add fib name=to-VPN",
              ],
              "/interface list member": [
                     "add interface=LANBridgeVPN list=LAN",
                     "add interface=LANBridgeVPN list=VPN-LAN",
              ],
              "/ip firewall address-list": [
                     "add address=192.168.40.0/24 list=VPN-Local",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=VPN new-connection-mark=conn-VPN \\
                            passthrough=yes src-address-list=VPN-Local`,
                     `add action=mark-routing chain=prerouting comment=VPN connection-mark=conn-VPN \\
                            new-routing-mark=to-VPN passthrough=no src-address-list=VPN-Local`,
                     `add action=mark-routing chain=prerouting comment=VPN new-routing-mark=to-VPN \\
                            passthrough=no src-address-list=VPN-Local`,
              ],
              "/ip route": [
                     `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-DOM`,
                     "add comment=Route-to-FRN disabled=no distance=1 dst-address=192.168.100.0/24 gateway=192.168.1.1 routing-table=to-VPN",
              ],
       }

       return config 
}

export const SplitBase = (): RouterConfig => {

       const config: RouterConfig = {
              "/interface bridge": [
                     "add name=LANBridgeSplit",
              ],
              "/interface list": [
                     "add name=Split-LAN",
              ],
              "/ip pool": [
                     "add name=dhcp_pool0 ranges=192.168.10.2-192.168.10.254",
              ],
              "/ip dhcp-server": [
                     "add address-pool=dhcp_pool0 interface=LANBridgeSplit name=dhcp1",
              ],
              "/ip dhcp-server network": [
                     "add address=192.168.10.0/24 dns-server=192.168.10.1 gateway=192.168.10.1",
              ],
              "/ip address": [
                     "add address=192.168.10.1/24 interface=LANBridgeSplit network=192.168.10.0",
              ],
              "/interface list member": [
                     "add interface=LANBridgeSplit list=LAN",
                     "add interface=LANBridgeSplit list=Split-LAN",
              ],
              "/ip firewall address-list": [
                     "add address=192.168.10.0/24 list=Split-Local",
              ],
              "/ip firewall mangle": [
                     // Split DOM Traffic
                     `add action=mark-connection chain=forward comment=Split-DOM dst-address-list=DOMAddList \\
                            new-connection-mark=conn-Split-DOM passthrough=yes src-address-list=Split-Local`,
                     `add action=mark-routing chain=prerouting comment=Split-DOM connection-mark=conn-Split-DOM \\
                            dst-address-list=DOMAddList new-routing-mark=to-DOM passthrough=no src-address-list=Split-Local`,
                     `add action=mark-routing chain=prerouting comment=Split-DOM dst-address-list=DOMAddList \\
                            new-routing-mark=to-DOM passthrough=no src-address-list=Split-Local`,
                     // Split FRN Traffic
                     `add action=mark-connection chain=forward comment=Split-!DOM dst-address-list=!DOMAddList\\
                            new-connection-mark=conn-Split-!DOM passthrough=yes src-address-list=Split-Local`,
                     `add action=mark-routing chain=prerouting comment=Split-!DOM connection-mark=conn-Split-!DOM\\
                            dst-address-list=!DOMAddList new-routing-mark=to-VPN passthrough=no src-address-list=Split-Local`,
                     `add action=mark-routing chain=prerouting comment=Split-!DOM dst-address-list=!DOMAddList\\
                            new-routing-mark=to-VPN passthrough=no src-address-list=Split-Local`,
              ],
              "/ip route": [],
       }


       return config 
}

export const DNS = (): RouterConfig => {
       const config: RouterConfig = {
              "/ip dns": ["set allow-remote-requests=yes servers=8.8.8.8"],
       }
       return config
}




export const ChooseCG = (state: StarState): RouterConfig => {
       const config: RouterConfig = {
              ...BaseConfig(),
              ...DometicBase(),
              ...ForeignBase(),
              ...VPNBase(),
              ...SplitBase(),
              ...DNS(),
       }
       return config
}






