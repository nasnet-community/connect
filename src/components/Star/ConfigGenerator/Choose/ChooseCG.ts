import type { RouterConfig } from "../ConfigGenerator";
// import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";
// import { DomesticIP } from "../Choose/DomesticIP";


export const SubnetToRange = (Subnet: string): string => {
  const [network, mask] = Subnet.split("/");
  const range = `${network.split(".").slice(0, 3).join(".")}.${parseInt(mask) + 1}`;
  return range;
}

export const SubnetToFirstIP = (Subnet: string): string => {
  const [network, _mask] = Subnet.split("/");
  const ip = network.split(".").slice(0, 3).join(".");
  return ip;
}

export const SubnetToNetwork = (Subnet: string): string => {
  const [network, _mask] = Subnet.split("/");
  return network;
}


export const NetworkBaseGenerator = (NetworkName: string, Subnet: string,): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge": [
      `add name=LANBridge${NetworkName}`,
    ],
    "/interface list": [
      `add name=${NetworkName}-WAN`,
      `add name=${NetworkName}-LAN`,
    ],
    "/ip pool": [
      `add name=DHCP-pool-${NetworkName} ranges=${SubnetToRange(Subnet)}`,
    ],
    "/ip dhcp-server": [
      `add address-pool=DHCP-pool-${NetworkName} interface=LANBridge${NetworkName} name=DHCP-${NetworkName}`,
    ],
    "/ip dhcp-server network": [
      `add address=${Subnet} dns-server=${SubnetToFirstIP(Subnet)} gateway=${SubnetToFirstIP(Subnet)}`,
    ],
    "/ip address": [
      `add address=${SubnetToFirstIP(Subnet)}/24 interface=LANBridge${NetworkName} network=${SubnetToNetwork(Subnet)}`,
    ],
    "/routing table": [
      `add fib name=to-${NetworkName}`,
    ],
    "/interface list member": [
      `add interface=LANBridge${NetworkName} list=LAN`,
      `add interface=LANBridge${NetworkName} list=${NetworkName}-LAN`,
    ],
    "/ip firewall address-list": [
      `add address=${Subnet} list=${NetworkName}-LAN`,
    ],
    "/ip firewall mangle": [
      // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=udp src-address-list=${NetworkName}-LAN`,
      // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=tcp src-address-list=${NetworkName}-LAN`,
      // `add action=mark-routing chain=prerouting comment="DNS ${NetworkName}-LAN" connection-mark=dns-conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
      `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark=conn-${NetworkName} passthrough=yes src-address-list=${NetworkName}-LAN`,
      `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark=conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
    ],
    "/ip route": [
      `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-${NetworkName}`,
    ],

  }

  return config;
}

export const BaseConfig = (): RouterConfig => {
  const config: RouterConfig = {
    "/interface list": ["add name=WAN", "add name=LAN"],
    "/ip firewall address-list": [
      "add address=192.168.0.0/16 list=LOCAL-IP",
      "add address=172.16.0.0/12 list=LOCAL-IP",
      "add address=10.0.0.0/8 list=LOCAL-IP",
    ],
    "/ip firewall mangle": [
      `add action=accept chain=prerouting comment=Accept dst-address-list=LOCAL-IP src-address-list=LOCAL-IP`,
      `add action=accept chain=postrouting comment=Accept dst-address-list=LOCAL-IP src-address-list=LOCAL-IP`,
      `add action=accept chain=output comment=Accept dst-address-list=LOCAL-IP src-address-list=LOCAL-IP`,
      `add action=accept chain=input comment=Accept dst-address-list=LOCAL-IP src-address-list=LOCAL-IP`,
      `add action=accept chain=forward comment=Accept dst-address-list=LOCAL-IP src-address-list=LOCAL-IP`,
    ],
    "/ip firewall nat": [
      `add action=masquerade chain=srcnat out-interface-list=WAN comment="MASQUERADE the traffic go to WAN Interfaces"`,
    ],
  };

  return config;
};

export const DomesticBase = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall filter": [],
  };

  return config;
};

export const ForeignBase = (): RouterConfig => {
  const config: RouterConfig = {};
  return config;
};

export const VPNBase = (): RouterConfig => {
  const config: RouterConfig = {};

  return config;
};

export const SplitBase = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall mangle": [
      // Split DOM Traffic
      `add action=mark-connection chain=forward comment=Split-DOM dst-address-list=DOMAddList \\
                            new-connection-mark=conn-Split-DOM passthrough=yes src-address-list=Split-LAN`,
      `add action=mark-routing chain=prerouting comment=Split-DOM connection-mark=conn-Split-DOM \\
                            dst-address-list=DOMAddList new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`,
      // Split FRN Traffic
      `add action=mark-connection chain=forward comment=Split-!DOM dst-address-list=!DOMAddList\\
                            new-connection-mark=conn-Split-!DOM passthrough=yes src-address-list=Split-LAN`,
      `add action=mark-routing chain=prerouting comment=Split-!DOM connection-mark=conn-Split-!DOM\\
                            dst-address-list=!DOMAddList new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`,
      // Split VPN IP/Domain/Game Traffic
      `add action=mark-routing chain=prerouting comment="Split-VPN" dst-address-list=SplitVPNAddList \\
                            new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`,
      // Split FRN IP/Domain/Game Traffic
      `add action=mark-routing chain=prerouting comment="Split-FRN" dst-address-list=SplitFRNAddList \\
                            new-routing-mark=to-FRN passthrough=no src-address-list=Split-LAN`,
      // Split DOM IP/Domain/Game Traffic
      `add action=mark-routing chain=prerouting comment="Split-DOM" dst-address-list=SplitDOMAddList \\
                            new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`,
    ],
  };

  return config;
};

export const Networks = (): RouterConfig => {
  const config: RouterConfig = {}

  return config;
}

export const ChooseCG = (): RouterConfig => {

  const config: RouterConfig = {
    "/ip firewall mangle": [],
    "/ip route": [],
  };
  // if (DomesticLink) {
  //   return WithDomestic(DomesticLink);
  // } else {
  //   return WithoutDomestic(DomesticLink);
  // }
  return config;
};
