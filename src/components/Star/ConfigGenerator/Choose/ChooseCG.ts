import type { RouterConfig } from "../ConfigGenerator";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";
import { DomesticIP } from "../Choose/DomesticIP";


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
                     "add address=192.168.20.0/24 list=DOM-LAN",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=DOM new-connection-mark=conn-DOM \\
                            passthrough=yes src-address-list=DOM-LAN`,
                     `add action=mark-routing chain=prerouting comment=DOM connection-mark=conn-DOM \\
                            new-routing-mark=to-DOM passthrough=no src-address-list=DOM-LAN`,
                     `add action=mark-routing chain=prerouting comment=DOM new-routing-mark=to-DOM \\
                            passthrough=no src-address-list=DOM-LAN`,
              ],
              "/ip firewall nat": [
                     `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=udp \\
                            src-address-list=DOM-LAN to-addresses=8.8.8.8`,
                     `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=tcp \\
                            src-address-list=DOM-LAN to-addresses=8.8.8.8`,
              ],
              "/ip route": [
                     `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-DOM`,
              ],
       }

       return config
};


export const DomesticAddresslist = (): RouterConfig => {
       const config: RouterConfig = {
              "/ip firewall address-list": [
                     // Add DomesticIP addresses
                     // ...DomesticIP.map(ip => `add address=${ip} list=DOMAddList`)
                     ...DomesticIP,
                   ],
       }
     
       return config
     }

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
                     "add address=192.168.30.0/24 list=FRN-LAN",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=FRN dst-address-list=!DOMAddList \\
                            new-connection-mark=conn-FRN passthrough=yes src-address-list=FRN-LAN`,
                     `add action=mark-routing chain=prerouting comment=FRN connection-mark=conn-FRN \\
                            dst-address-list=!DOMAddList new-routing-mark=to-FRN passthrough=no src-address-list=FRN-LAN`,
                     `add action=mark-routing chain=prerouting comment=FRN dst-address-list=!DOMAddList \\
                            new-routing-mark=to-FRN passthrough=no src-address-list=FRN-LAN`,
              ],
              "/ip firewall nat": [
                     `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=udp \\
                            src-address-list=FRN-LAN to-addresses=1.1.1.1`,
                     `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=tcp \\
                            src-address-list=FRN-LAN to-addresses=1.1.1.1`,
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
                     "add address=192.168.40.0/24 list=VPN-LAN",
              ],
              "/ip firewall mangle": [
                     `add action=mark-connection chain=forward comment=VPN new-connection-mark=conn-VPN \\
                            passthrough=yes src-address-list=VPN-LAN`,
                     `add action=mark-routing chain=prerouting comment=VPN connection-mark=conn-VPN \\
                            new-routing-mark=to-VPN passthrough=no src-address-list=VPN-LAN`,
                     `add action=mark-routing chain=prerouting comment=VPN new-routing-mark=to-VPN \\
                            passthrough=no src-address-list=VPN-LAN`,
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
                     "add address=192.168.10.0/24 list=Split-LAN",
              ],
              "/ip firewall mangle": [
                     // Split DOM Traffic
                     `add action=mark-connection chain=forward comment=Split-DOM dst-address-list=DOMAddList \\
                            new-connection-mark=conn-Split-DOM passthrough=yes src-address-list=Split-LAN`,
                     `add action=mark-routing chain=prerouting comment=Split-DOM connection-mark=conn-Split-DOM \\
                            dst-address-list=DOMAddList new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`,
                     `add action=mark-routing chain=prerouting comment=Split-DOM dst-address-list=DOMAddList \\
                            new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`,
                     // Split FRN Traffic
                     `add action=mark-connection chain=forward comment=Split-!DOM dst-address-list=!DOMAddList\\
                            new-connection-mark=conn-Split-!DOM passthrough=yes src-address-list=Split-LAN`,
                     `add action=mark-routing chain=prerouting comment=Split-!DOM connection-mark=conn-Split-!DOM\\
                            dst-address-list=!DOMAddList new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`,
                     `add action=mark-routing chain=prerouting comment=Split-!DOM dst-address-list=!DOMAddList\\
                            new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`,
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

export const AdvanceDNS = (): RouterConfig => {
       const config: RouterConfig = {
              "/ip dns": [
                     "set allow-remote-requests=yes servers=8.8.8.8,1.1.1.1,9.9.9.9,208.67.222.222",
                     "set cache-size=4096KiB cache-max-ttl=1d",
              ],
              "/ip route": [
                     "add dst-address=8.8.8.8/32 gateway=DOM-WAN routing-mark=rm_dns_bridge1 comment=\"Route to DNS_SERVER_1 via DOM-WAN\"",
                     "add dst-address=1.1.1.1/32 gateway=FRN-WAN routing-mark=rm_dns_bridge2 comment=\"Route to DNS_SERVER_2 via FRN-WAN\"",
                     "add dst-address=9.9.9.9/32 gateway=VPN-WAN routing-mark=rm_dns_bridge3 comment=\"Route to DNS_SERVER_3 via VPN-WAN\"", 
                     "add dst-address=208.67.222.222/32 gateway=Split-WAN routing-mark=rm_dns_bridge4 comment=\"Route to DNS_SERVER_4 via Split-WAN\"",
              ],
              "/routing table": [
                     "add fib=yes name=dns_route_bridge1 comment=\"Routing table for DNS via DOM-WAN\"",
                     "add fib=yes name=dns_route_bridge2 comment=\"Routing table for DNS via FRN-WAN\"", 
                     "add fib=yes name=dns_route_bridge3 comment=\"Routing table for DNS via VPN-WAN\"",
                     "add fib=yes name=dns_route_bridge4 comment=\"Routing table for DNS via Split DNS\"",
              ],
              "/ip firewall mangle": [
                     // DNS PBR Rules for Router's Output Chain
                     "add action=mark-routing chain=output dst-address=8.8.8.8 protocol=udp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge1 passthrough=no comment=\"Mark UDP DNS to 8.8.8.8 for DOM path\"",
                     "add action=mark-routing chain=output dst-address=8.8.8.8 protocol=tcp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge1 passthrough=no comment=\"Mark TCP DNS to 8.8.8.8 for DOM path\"",
                     
                     "add action=mark-routing chain=output dst-address=1.1.1.1 protocol=udp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge2 passthrough=no comment=\"Mark UDP DNS to 1.1.1.1 for FRN path\"",
                     "add action=mark-routing chain=output dst-address=1.1.1.1 protocol=tcp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge2 passthrough=no comment=\"Mark TCP DNS to 1.1.1.1 for FRN path\"",
                     
                     "add action=mark-routing chain=output dst-address=9.9.9.9 protocol=udp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge3 passthrough=no comment=\"Mark UDP DNS to 9.9.9.9 for VPN path\"", 
                     "add action=mark-routing chain=output dst-address=9.9.9.9 protocol=tcp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge3 passthrough=no comment=\"Mark TCP DNS to 9.9.9.9 for VPN path\"",
                     
                     "add action=mark-routing chain=output dst-address=208.67.222.222 protocol=udp dst-port=53 \\",
                     "    new-routing-mark=rm_dns_bridge4 passthrough=no comment=\"Mark UDP DNS to 208.67.222.222 for Split path\"",
                     "add action=mark-routing chain=output dst-address=208.67.222.222 protocol=tcp dst-port=53 \\", 
                     "    new-routing-mark=rm_dns_bridge4 passthrough=no comment=\"Mark TCP DNS to 208.67.222.222 for Split path\"",
              ],
              "/ip dhcp-server network": [
                     // Update DHCP networks to use router as DNS server for each bridge
                     "set [find address=\"192.168.10.0/24\"] dns-server=192.168.10.1 comment=\"Split Bridge DNS to Router\"",
                     "set [find address=\"192.168.20.0/24\"] dns-server=192.168.20.1 comment=\"DOM Bridge DNS to Router\"", 
                     "set [find address=\"192.168.30.0/24\"] dns-server=192.168.30.1 comment=\"FRN Bridge DNS to Router\"",
                     "set [find address=\"192.168.40.0/24\"] dns-server=192.168.40.1 comment=\"VPN Bridge DNS to Router\"",
              ],
              "/ip firewall nat": [
                     // DNS Leak Prevention - Redirect rogue DNS queries to router
                     "add action=dst-nat chain=dstnat to-addresses=192.168.10.1 to-ports=53 protocol=udp \\",
                     "    src-address=192.168.10.0/24 dst-address=!192.168.10.1 in-interface=LANBridgeSplit dst-port=53 \\",
                     "    comment=\"Redirect Split Bridge UDP DNS to Router\"",
                     "add action=dst-nat chain=dstnat to-addresses=192.168.10.1 to-ports=53 protocol=tcp \\",
                     "    src-address=192.168.10.0/24 dst-address=!192.168.10.1 in-interface=LANBridgeSplit dst-port=53 \\", 
                     "    comment=\"Redirect Split Bridge TCP DNS to Router\"",
                     
                     "add action=dst-nat chain=dstnat to-addresses=192.168.20.1 to-ports=53 protocol=udp \\",
                     "    src-address=192.168.20.0/24 dst-address=!192.168.20.1 in-interface=LANBridgeDOM dst-port=53 \\",
                     "    comment=\"Redirect DOM Bridge UDP DNS to Router\"",
                     "add action=dst-nat chain=dstnat to-addresses=192.168.20.1 to-ports=53 protocol=tcp \\",
                     "    src-address=192.168.20.0/24 dst-address=!192.168.20.1 in-interface=LANBridgeDOM dst-port=53 \\",
                     "    comment=\"Redirect DOM Bridge TCP DNS to Router\"",
                     
                     "add action=dst-nat chain=dstnat to-addresses=192.168.30.1 to-ports=53 protocol=udp \\", 
                     "    src-address=192.168.30.0/24 dst-address=!192.168.30.1 in-interface=LANBridgeFRN dst-port=53 \\",
                     "    comment=\"Redirect FRN Bridge UDP DNS to Router\"",
                     "add action=dst-nat chain=dstnat to-addresses=192.168.30.1 to-ports=53 protocol=tcp \\",
                     "    src-address=192.168.30.0/24 dst-address=!192.168.30.1 in-interface=LANBridgeFRN dst-port=53 \\",
                     "    comment=\"Redirect FRN Bridge TCP DNS to Router\"",
                     
                     "add action=dst-nat chain=dstnat to-addresses=192.168.40.1 to-ports=53 protocol=udp \\",
                     "    src-address=192.168.40.0/24 dst-address=!192.168.40.1 in-interface=LANBridgeVPN dst-port=53 \\",
                     "    comment=\"Redirect VPN Bridge UDP DNS to Router\"",
                     "add action=dst-nat chain=dstnat to-addresses=192.168.40.1 to-ports=53 protocol=tcp \\",
                     "    src-address=192.168.40.0/24 dst-address=!192.168.40.1 in-interface=LANBridgeVPN dst-port=53 \\",
                     "    comment=\"Redirect VPN Bridge TCP DNS to Router\"",
              ],
              "/ip firewall filter": [
                     // Allow legitimate DNS traffic from each bridge to router
                     "add action=accept chain=forward protocol=udp src-address=192.168.10.0/24 \\",
                     "    dst-address=192.168.10.1 dst-port=53 comment=\"Allow Split Bridge UDP DNS to Router\"",
                     "add action=accept chain=forward protocol=tcp src-address=192.168.10.0/24 \\",
                     "    dst-address=192.168.10.1 dst-port=53 comment=\"Allow Split Bridge TCP DNS to Router\"",
                     
                     "add action=accept chain=forward protocol=udp src-address=192.168.20.0/24 \\",
                     "    dst-address=192.168.20.1 dst-port=53 comment=\"Allow DOM Bridge UDP DNS to Router\"", 
                     "add action=accept chain=forward protocol=tcp src-address=192.168.20.0/24 \\",
                     "    dst-address=192.168.20.1 dst-port=53 comment=\"Allow DOM Bridge TCP DNS to Router\"",
                     
                     "add action=accept chain=forward protocol=udp src-address=192.168.30.0/24 \\",
                     "    dst-address=192.168.30.1 dst-port=53 comment=\"Allow FRN Bridge UDP DNS to Router\"",
                     "add action=accept chain=forward protocol=tcp src-address=192.168.30.0/24 \\",
                     "    dst-address=192.168.30.1 dst-port=53 comment=\"Allow FRN Bridge TCP DNS to Router\"",
                     
                     "add action=accept chain=forward protocol=udp src-address=192.168.40.0/24 \\",
                     "    dst-address=192.168.40.1 dst-port=53 comment=\"Allow VPN Bridge UDP DNS to Router\"",
                     "add action=accept chain=forward protocol=tcp src-address=192.168.40.0/24 \\", 
                     "    dst-address=192.168.40.1 dst-port=53 comment=\"Allow VPN Bridge TCP DNS to Router\"",
                     
                     // Drop rogue DNS traffic that bypasses router
                     "add action=drop chain=forward protocol=udp src-address=192.168.10.0/24 \\",
                     "    dst-port=53 comment=\"Drop Split Bridge Rogue UDP DNS\"",
                     "add action=drop chain=forward protocol=tcp src-address=192.168.10.0/24 \\",
                     "    dst-port=53 comment=\"Drop Split Bridge Rogue TCP DNS\"",
                     
                     "add action=drop chain=forward protocol=udp src-address=192.168.20.0/24 \\",
                     "    dst-port=53 comment=\"Drop DOM Bridge Rogue UDP DNS\"",
                     "add action=drop chain=forward protocol=tcp src-address=192.168.20.0/24 \\",
                     "    dst-port=53 comment=\"Drop DOM Bridge Rogue TCP DNS\"",
                     
                     "add action=drop chain=forward protocol=udp src-address=192.168.30.0/24 \\",
                     "    dst-port=53 comment=\"Drop FRN Bridge Rogue UDP DNS\"",
                     "add action=drop chain=forward protocol=tcp src-address=192.168.30.0/24 \\",
                     "    dst-port=53 comment=\"Drop FRN Bridge Rogue TCP DNS\"",
                     
                     "add action=drop chain=forward protocol=udp src-address=192.168.40.0/24 \\",
                     "    dst-port=53 comment=\"Drop VPN Bridge Rogue UDP DNS\"",
                     "add action=drop chain=forward protocol=tcp src-address=192.168.40.0/24 \\",
                     "    dst-port=53 comment=\"Drop VPN Bridge Rogue TCP DNS\"",
              ],
       }

       return config
}

export const WithDomestic = (): RouterConfig => {
       return mergeMultipleConfigs(
              BaseConfig(),
              DometicBase(),
              ForeignBase(),
              VPNBase(),
              SplitBase(),
              DNS(),
              DomesticAddresslist(),
       );
}

export const WithoutDomestic = (): RouterConfig => {
       return mergeMultipleConfigs(
              BaseConfig(),
              ForeignBase(),
              VPNBase(),
              DNS(),
       );
}

export const ChooseCG = (DomesticLink: boolean): RouterConfig => {
       if(DomesticLink){
              return WithDomestic()
       } else{
              return WithoutDomestic()
       }
}






