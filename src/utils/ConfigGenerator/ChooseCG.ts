import type { StarState } from "~/components/Star/StarContext";
import type { RouterConfig } from "./ConfigGenerator";
import { DomesticIP } from "./DomesticIP";

export const BaseConfig = (state: StarState): RouterConfig => {
  console.log(state);
  return {
    "/ipv6 settings": ["set disable-ipv6=yes"],
    "/ipv6 firewall filter": [
      "add chain=input action=drop",
      "add chain=forward action=drop",
    ],
    "/interface bridge": [
      "add name=LANBridgeVPN",
      "add name=LANBridgeDOM",
      "add name=LANBridgeFRN",
      "add name=LANBridgeSplit",
    ],
    "/interface list": [
      "add name=WAN",
      "add name=LAN",
      "add name=DOM-WAN",
      "add name=FRN-WAN",
      "add name=Split-LAN",
      "add name=DOM-LAN",
      "add name=FRN-LAN",
      "add name=VPN-LAN",
    ],
    "/ip pool": [
      "add name=dhcp_pool0 ranges=192.168.10.2-192.168.10.254",
      "add name=dhcp_pool1 ranges=192.168.20.2-192.168.20.254",
      "add name=dhcp_pool2 ranges=192.168.30.2-192.168.30.254",
      "add name=dhcp_pool3 ranges=192.168.40.2-192.168.40.254",
    ],
    "/ip dhcp-server": [
      "add address-pool=dhcp_pool0 interface=LANBridgeSplit name=dhcp1",
      "add address-pool=dhcp_pool1 interface=LANBridgeDOM name=dhcp2",
      "add address-pool=dhcp_pool2 interface=LANBridgeFRN name=dhcp3",
      "add address-pool=dhcp_pool3 interface=LANBridgeVPN name=dhcp4",
    ],
    "/ip dhcp-server network": [
      "add address=192.168.10.0/24 dns-server=192.168.10.1 gateway=192.168.10.1",
      "add address=192.168.20.0/24 dns-server=192.168.20.1 gateway=192.168.20.1",
      "add address=192.168.30.0/24 dns-server=192.168.30.1 gateway=192.168.30.1",
      "add address=192.168.40.0/24 dns-server=192.168.40.1 gateway=192.168.40.1",
    ],
    "/ip address": [
      "add address=192.168.10.1/24 interface=LANBridgeSplit network=192.168.10.0",
      "add address=192.168.20.1/24 interface=LANBridgeDOM network=192.168.20.0",
      "add address=192.168.30.1/24 interface=LANBridgeFRN network=192.168.30.0",
      "add address=192.168.40.1/24 interface=LANBridgeVPN network=192.168.40.0",
    ],
    "/routing table": [
      "add fib name=to-DOM",
      "add fib name=to-FRN",
      "add fib name=to-VPN",
    ],
    "/interface list member": [
      "add interface=LANBridgeSplit list=LAN",
      "add interface=LANBridgeDOM list=LAN",
      "add interface=LANBridgeFRN list=LAN",
      "add interface=LANBridgeVPN list=LAN",
      "add interface=LANBridgeSplit list=Split-LAN",
      "add interface=LANBridgeDOM list=DOM-LAN",
      "add interface=LANBridgeFRN list=FRN-LAN",
      "add interface=LANBridgeVPN list=VPN-LAN",
    ],
    "/ip firewall address-list": [
      "add address=192.168.0.0/16 list=LOCAL-IP",
      "add address=172.16.0.0/12 list=LOCAL-IP",
      "add address=10.0.0.0/8 list=LOCAL-IP",
      "add address=192.168.10.0/24 list=Split-Local",
      "add address=192.168.20.0/24 list=DOM-Local",
      "add address=192.168.30.0/24 list=FRN-Local",
      "add address=192.168.40.0/24 list=VPN-Local",
      // Add DomesticIP addresses
      // ...DomesticIP.map(ip => `add address=${ip} list=DOMAddList`)
      ...DomesticIP,
    ],
    "/ip dns": ["set allow-remote-requests=yes servers=8.8.8.8,1.1.1.1"],
    "/ip cloud": ["set ddns-enabled=yes ddns-update-interval=1m"],
    "/ip firewall mangle": [
      // DOM Traffic
      `add action=mark-connection chain=forward comment=DOM new-connection-mark=conn-DOM \\
             passthrough=yes src-address-list=DOM-Local`,
      `add action=mark-routing chain=prerouting comment=DOM connection-mark=conn-DOM \\
             new-routing-mark=to-DOM passthrough=no src-address-list=DOM-Local`,
      `add action=mark-routing chain=prerouting comment=DOM new-routing-mark=to-DOM \\
             passthrough=no src-address-list=DOM-Local`,
      // FRN Traffic
      `add action=mark-connection chain=forward comment=FRN dst-address-list=!DOMAddList \\
             new-connection-mark=conn-FRN passthrough=yes src-address-list=FRN-Local`,
      `add action=mark-routing chain=prerouting comment=FRN connection-mark=conn-FRN \\
             dst-address-list=!DOMAddList new-routing-mark=to-FRN passthrough=no src-address-list=FRN-Local`,
      `add action=mark-routing chain=prerouting comment=FRN dst-address-list=!DOMAddList \\
             new-routing-mark=to-FRN passthrough=no src-address-list=FRN-Local`,
      // VPN Traffic
      `add action=mark-connection chain=forward comment=VPN new-connection-mark=conn-VPN \\
             passthrough=yes src-address-list=VPN-Local`,
      `add action=mark-routing chain=prerouting comment=VPN connection-mark=conn-VPN \\
             new-routing-mark=to-VPN passthrough=no src-address-list=VPN-Local`,
      `add action=mark-routing chain=prerouting comment=VPN new-routing-mark=to-VPN \\
             passthrough=no src-address-list=VPN-Local`,
      // Split Game Traffic
      // Split Game FRN Traffic
      `add action=mark-connection chain=prerouting comment=Split-Game-FRN dst-address-list=FRN-IP-Games \\
             new-connection-mark=conn-game-FRN passthrough=yes src-address-list=Split-Local`,
      `add action=mark-routing chain=prerouting comment=Split-Game-FRN connection-mark=conn-game-FRN \\
             new-routing-mark=to-FRN passthrough=no src-address-list=Split-Local`,
      // Split Game DOM Traffic
      `add action=mark-connection chain=prerouting comment=Split-Game-DOM dst-address-list=DOM-IP-Games \\
             new-connection-mark=conn-game-DOM passthrough=yes src-address-list=Split-Local`,
      `add action=mark-routing chain=prerouting comment=Split-Game-DOM connection-mark=conn-game-DOM \\
             new-routing-mark=to-DOM passthrough=no src-address-list=Split-Local`,
      // Split Game VPN Traffic
      `add action=mark-connection chain=prerouting comment=Split-Game-VPN dst-address-list=VPN-IP-Games \\
             new-connection-mark=conn-game-VPN passthrough=yes src-address-list=Split-Local`,
      `add action=mark-routing chain=prerouting comment=Split-Game-VPN connection-mark=conn-game-VPN \\
             new-routing-mark=to-VPN passthrough=no src-address-list=Split-Local`,
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
    "/ip firewall nat": [
      "add action=masquerade chain=srcnat out-interface-list=WAN",
      `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=udp \\
             src-address-list=DOM-Local to-addresses=8.8.8.8`,
      `add action=dst-nat chain=dstnat comment="DNS DOM" dst-port=53 protocol=tcp \\
             src-address-list=DOM-Local to-addresses=8.8.8.8`,
      `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=udp \\
             src-address-list=FRN-Local to-addresses=1.1.1.1`,
      `add action=dst-nat chain=dstnat comment="DNS FRN" dst-port=53 protocol=tcp \\
             src-address-list=FRN-Local to-addresses=1.1.1.1`,
    ],
    "/ip nat-pmp": ["set enabled=yes"],
    "/ip upnp": ["set enabled=yes"],
    "/system package update": ["set channel=stable"],
    "/system routerboard settings": ["set auto-upgrade=yes"],
    "/ip route": [
      "add comment=Route-to-FRN disabled=no distance=1 dst-address=0.0.0.0/0 gateway=192.168.10.1 routing-table=to-FRN suppress-hw-offload=no",
      "add comment=Route-to-DOM disabled=no distance=1 dst-address=0.0.0.0/0 gateway=100.64.0.1 routing-table=to-DOM scope=30 suppress-hw-offload=no target-scope=10",
    ],
    "/system ntp client": ["set enabled=yes"],
    "/system ntp server": [
      "set broadcast=yes enabled=yes manycast=yes multicast=yes",
    ],
    "/system ntp client servers": [
      "add address=ir.pool.ntp.org",
      "add address=time1.google.com",
      "add address=pool.ntp.org",
    ],
    "/tool graphing interface": ["add"],
    "/tool graphing queue": ["add"],
    "/tool graphing resource": ["add"],
  };
};
