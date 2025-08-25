import type { RouterConfig } from "../ConfigGenerator";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";
// import { DomesticIP } from "../Choose/DomesticIP";

export interface DNSServer {
  ip: string;
  gateway: string;
  DNS: string;
  DOH: string;
}

interface DNSServers {
  DOM: DNSServer;
  FRN: DNSServer;
  VPN: DNSServer;
}

export const BaseConfig = (): RouterConfig => {
  const config: RouterConfig = {
    "/interface list": ["add name=WAN", "add name=LAN"],
    "/ip firewall address-list": [
      "add address=192.168.0.0/16 list=LOCAL-IP",
      "add address=172.16.0.0/12 list=LOCAL-IP",
      "add address=10.0.0.0/8 list=LOCAL-IP",
    ],
    "/ip firewall nat": [
      `add action=masquerade chain=srcnat out-interface-list=WAN comment="MASQUERADE the traffic go to WAN Interfaces"`,
    ],
  };

  return config;
};

export const DometicBase = (): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge": ["add name=LANBridgeDOM"],
    "/interface list": ["add name=DOM-WAN", "add name=DOM-LAN"],
    "/ip pool": ["add name=DHCP-pool-DOM ranges=192.168.20.2-192.168.20.254"],
    "/ip dhcp-server": [
      "add address-pool=DHCP-pool-DOM interface=LANBridgeDOM name=DHCP-DOM",
    ],
    "/ip dhcp-server network": [
      "add address=192.168.20.0/24 dns-server=192.168.20.1 gateway=192.168.20.1",
    ],
    "/ip address": [
      "add address=192.168.20.1/24 interface=LANBridgeDOM network=192.168.20.0",
    ],
    "/routing table": ["add fib name=to-DOM"],
    "/interface list member": [
      "add interface=LANBridgeDOM list=LAN",
      "add interface=LANBridgeDOM list=DOM-LAN",
    ],
    "/ip firewall address-list": ["add address=192.168.20.0/24 list=DOM-LAN"],
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
    "/ip firewall filter": [
      `add action=accept chain=input protocol=icmp in-interface-list=DOM-WAN comment="Allow ping from DOM-WAN"`,
    ],
  };

  return config;
};

// export const DomesticAddresslist = (): RouterConfig => {
//   const config: RouterConfig = {
//     "/ip firewall address-list": [
//       // Add DomesticIP addresses
//       // ...DomesticIP.map(ip => `add address=${ip} list=DOMAddList`)
//       ...DomesticIP,
//     ],
//   };

//   return config;
// };

export const ForeignBase = (DomesticLink: boolean): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge": ["add name=LANBridgeFRN"],
    "/interface list": ["add name=FRN-WAN", "add name=FRN-LAN"],
    "/ip pool": ["add name=DHCP-pool-FRN ranges=192.168.30.2-192.168.30.254"],
    "/ip dhcp-server": [
      "add address-pool=DHCP-pool-FRN interface=LANBridgeFRN name=DHCP-FRN",
    ],
    "/ip dhcp-server network": [
      "add address=192.168.30.0/24 dns-server=192.168.30.1 gateway=192.168.30.1",
    ],
    "/ip address": [
      "add address=192.168.30.1/24 interface=LANBridgeFRN network=192.168.30.0",
    ],
    "/routing table": ["add fib name=to-FRN"],
    "/interface list member": [
      "add interface=LANBridgeFRN list=LAN",
      "add interface=LANBridgeFRN list=FRN-LAN",
    ],
    "/ip firewall address-list": ["add address=192.168.30.0/24 list=FRN-LAN"],
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
  };

  // Add blackhole route to main table when DomesticLink is false
  if (!DomesticLink) {
    config["/ip route"].push(
      `add comment=Route-to-FRN disabled=no distance=1 dst-address=0.0.0.0/0 gateway=192.168.1.1 routing-table=main`,
    );
  }

  return config;
};

export const VPNBase = (): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge": ["add name=LANBridgeVPN"],
    "/interface list": ["add name=VPN-LAN"],
    "/ip pool": ["add name=DHCP-pool-VPN ranges=192.168.40.2-192.168.40.254"],
    "/ip dhcp-server": [
      "add address-pool=DHCP-pool-VPN interface=LANBridgeVPN name=DHCP-VPN",
    ],
    "/ip dhcp-server network": [
      "add address=192.168.40.0/24 dns-server=192.168.40.1 gateway=192.168.40.1",
    ],
    "/ip address": [
      "add address=192.168.40.1/24 interface=LANBridgeVPN network=192.168.40.0",
    ],
    "/routing table": ["add fib name=to-VPN"],
    "/interface list member": [
      "add interface=LANBridgeVPN list=LAN",
      "add interface=LANBridgeVPN list=VPN-LAN",
    ],
    "/ip firewall address-list": ["add address=192.168.40.0/24 list=VPN-LAN"],
    "/ip firewall mangle": [
      `add action=mark-connection chain=forward comment=VPN new-connection-mark=conn-VPN \\
                            passthrough=yes src-address-list=VPN-LAN`,
      `add action=mark-routing chain=prerouting comment=VPN connection-mark=conn-VPN \\
                            new-routing-mark=to-VPN passthrough=no src-address-list=VPN-LAN`,
      `add action=mark-routing chain=prerouting comment=VPN new-routing-mark=to-VPN \\
                            passthrough=no src-address-list=VPN-LAN`,
    ],
    "/ip route": [
      `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table=to-VPN`,
      "add comment=Route-to-FRN disabled=no distance=1 dst-address=192.168.100.0/24 gateway=192.168.1.1 routing-table=to-VPN",
    ],
  };

  return config;
};

export const SplitBase = (): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge": ["add name=LANBridgeSplit"],
    "/interface list": ["add name=Split-LAN"],
    "/ip pool": ["add name=DHCP-pool-Split ranges=192.168.10.2-192.168.10.254"],
    "/ip dhcp-server": [
      "add address-pool=DHCP-pool-Split interface=LANBridgeSplit name=DHCP-Split",
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
    "/ip firewall address-list": ["add address=192.168.10.0/24 list=Split-LAN"],
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
  };

  return config;
};

export const DNS = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip dns": ["set allow-remote-requests=yes servers=8.8.8.8"],
    "/ip firewall filter": [
      'add chain=input dst-port=53 in-interface-list=WAN protocol=tcp action=drop comment="Block Open Recursive DNS"',
      `add chain=input dst-port=53 in-interface-list=WAN protocol=udp action=drop comment="Block Open Recursive DNS"`,
    ],
  };

  return config;
};

// export const AdvanceDNS1 = (dnsServers: DNSServer[], domesticLink: boolean): RouterConfig => {
//        const serversToProcess = domesticLink
//               ? dnsServers
//               : dnsServers.filter(s => s.name !== 'DOM' && s.name !== 'Split');

//        if (!serversToProcess || serversToProcess.length === 0) {
//               return {};
//        }

//        let baseConfig: RouterConfig = {
//               "/ip dns": [],
//               "/ip route": [],
//               "/routing table": [],
//               "/ip firewall mangle": [],
//               "/ip dhcp-server network": [],
//               "/ip firewall nat": [
//                      'add action=redirect chain=dstnat dst-port=53 protocol=tcp in-interface-list=LAN dst-address-type=!local comment="Redirect all LAN DNS TCP to Router"',
//                      'add action=redirect chain=dstnat dst-port=53 protocol=udp in-interface-list=LAN dst-address-type=!local comment="Redirect all LAN DNS UDP to Router"',
//               ],
//               "/ip firewall filter": [],
//        };

//        const serverIps = serversToProcess.map(s => s.ip).join(',');
//        baseConfig["/ip dns"].push(`set allow-remote-requests=yes servers=${serverIps}`);
//        baseConfig["/ip dns"].push("set cache-size=4096KiB cache-max-ttl=1d");

//        serversToProcess.forEach((server, index) => {
//               const routeIndex = index + 1;
//               const routingMark = `rm_dns_bridge${routeIndex}`;
//               const routingTable = `dns_route_bridge${routeIndex}`;
//               const networkDetails = networkDetailsMap[server.name];

//               if (!networkDetails) return;

//               // IP Route
//               baseConfig["/ip route"].push(`add dst-address=${server.ip}/32 gateway=${server.gateway} routing-mark=${routingMark} \\
//                      comment="Route to DNS_SERVER_${routeIndex} (${server.name}) via ${server.gateway}"`);

//               // Routing Table
//               baseConfig["/routing table"].push(`add fib=yes name=${routingTable} comment="Routing table for DNS via ${server.gateway}"`);

//               // Firewall Mangle for Router's Output
//               baseConfig["/ip firewall mangle"].push(
//                      `add action=mark-routing chain=output dst-address=${server.ip} protocol=tcp dst-port=53 new-routing-mark=${routingMark} passthrough=no \\
//                             comment="Mark TCP DNS to ${server.ip} for ${server.name} path"`
//               );
//               baseConfig["/ip firewall mangle"].push(
//                      `add action=mark-routing chain=output dst-address=${server.ip} protocol=udp dst-port=53 new-routing-mark=${routingMark} passthrough=no \\
//                             comment="Mark UDP DNS to ${server.ip} for ${server.name} path"`
//               );

//               // DHCP Server Network Update
//               baseConfig["/ip dhcp-server network"].push(`set [find address="${networkDetails.bridge.subnet}"] dns-server=${networkDetails.bridge.ip} \\
//                      comment="${server.name} Bridge DNS to Router"`);

//               // Firewall Filter Rules
//               baseConfig["/ip firewall filter"].push(
//                      `add action=accept chain=forward protocol=udp src-address=${networkDetails.bridge.subnet} dst-address=${networkDetails.bridge.ip} dst-port=53 \\
//                             comment="Allow ${server.name} Bridge UDP DNS to Router"`
//               );
//               baseConfig["/ip firewall filter"].push(
//                      `add action=accept chain=forward protocol=tcp src-address=${networkDetails.bridge.subnet} dst-address=${networkDetails.bridge.ip} dst-port=53 \\
//                             comment="Allow ${server.name} Bridge TCP DNS to Router"`
//               );
//               baseConfig["/ip firewall filter"].push(
//                      `add action=drop chain=forward protocol=udp src-address=${networkDetails.bridge.subnet} dst-port=53 \\
//                             comment="Drop ${server.name} Bridge Rogue UDP DNS"`
//               );
//               baseConfig["/ip firewall filter"].push(
//                      `add action=drop chain=forward protocol=tcp src-address=${networkDetails.bridge.subnet} dst-port=53 \\
//                             comment="Drop ${server.name} Bridge Rogue TCP DNS"`
//               );
//        });

//        if (domesticLink) {
//               const dohServerName = 'DOM';
//               const dohServer = serversToProcess.find(s => s.name === dohServerName);
//               if (dohServer) {
//                      const routeIndex = serversToProcess.findIndex(s => s.name === dohServerName) + 1;
//                      const routingMark = `rm_dns_bridge${routeIndex}`;
//                      const dohConfig = DOHConfig(`https://8.8.8.8/dns-query`, dohServer.ip, routingMark);
//                      baseConfig = mergeMultipleConfigs(baseConfig, dohConfig);
//               }
//        }

//        return baseConfig;
// }

export const AdvanceDNS = (): RouterConfig => {
  const networkDetailsMap: DNSServers = {
    DOM: {
      ip: "8.8.8.8",
      gateway: "DOM-WAN",
      DNS: "8.8.8.8",
      DOH: "https://dns.google/dns-query",
    },
    FRN: {
      ip: "1.1.1.1",
      gateway: "FRN-WAN",
      DNS: "1.1.1.1",
      DOH: "https://1.1.1.1/dns-query",
    },
    VPN: {
      ip: "1.0.0.1",
      gateway: "VPN-WAN",
      DNS: "1.0.0.1",
      DOH: "",
    },
  };

  const { DOM, FRN, VPN } = networkDetailsMap;

  const config: RouterConfig = {
    "/ip dns": [
      "set allow-remote-requests=yes cache-size=10240KiB cache-max-ttl=7d",
      "set max-concurrent-queries=1000 query-server-timeout=3s",
      `set servers=${DOM.DNS},${FRN.DNS},${VPN.DNS}`,
    ],
    "/ip dns forwarders": [
      `add name=DOM dns-servers=${DOM.DNS} doh-servers=${DOM.DOH}`,
      `add name=FRN dns-servers=${FRN.DNS} doh-servers=${FRN.DOH}`,
      `add name=VPN dns-servers=${VPN.DNS} `,
    ],
    "/ip dns static": [
      `add regexp=".*\\\\.ir\\$" type=FWD forward-to=DOM match-subdomains=yes comment=".ir TLDs"`,

      `add name="s4i.co" type=FWD forward-to=FRN match-subdomains=yes comment="Handle s4i.co domain"`,

      `add name=dns.DOM.local address=${DOM.DNS}`,
      `add name=dns.FRN.local address=${FRN.DNS}`,
      `add name=dns.VPN.local address=${VPN.DNS}`,
    ],
    "/ip route": [],
    "/routing table": [],
    "/ip firewall address-list": [
      `add list=DNS_DOM address=${DOM.DNS}`,
      `add list=DNS_FRN address=${FRN.DNS}`,
      `add list=DNS_VPN address=${VPN.DNS}`,
    ],
    "/ip firewall mangle": [
      `add chain=output protocol=udp dst-port=53 dst-address-list=DNS_DOM action=mark-routing \\
                            new-routing-mark=to-DOM passthrough=no comment="Router DNS udp Traffic DOM"`,
      `add chain=output protocol=tcp dst-port=53 dst-address-list=DNS_DOM action=mark-routing \\
                            new-routing-mark=to-DOM passthrough=no comment="Router DNS tcp Traffic DOM"`,
      `add chain=output protocol=udp dst-port=53 dst-address-list=DNS_FRN action=mark-routing \\
                            new-routing-mark=to-FRN passthrough=no comment="Router DNS udp Traffic FRN"`,
      `add chain=output protocol=tcp dst-port=53 dst-address-list=DNS_FRN action=mark-routing \\
                            new-routing-mark=to-FRN passthrough=no comment="Router DNS tcp Traffic FRN"`,
      `add chain=output protocol=udp dst-port=53 dst-address-list=DNS_VPN action=mark-routing \\
                            new-routing-mark=to-VPN passthrough=no comment="Router DNS udp Traffic VPN"`,
      `add chain=output protocol=tcp dst-port=53 dst-address-list=DNS_VPN action=mark-routing \\
                            new-routing-mark=to-VPN passthrough=no comment="Router DNS tcp Traffic VPN"`,

      `add chain=prerouting protocol=udp dst-port=53 layer7-protocol=ir-tld action=mark-routing \\
                            new-routing-mark=to-DOM comment="Mark ir-tld to DOM via layer7-pattern"`,
    ],
    "/ip dhcp-server network": [],
    "/ip firewall nat": [
      'add action=redirect chain=dstnat dst-port=53 protocol=tcp in-interface-list=LAN dst-address-type=!local comment="Redirect all LAN DNS TCP to Router"',
      'add action=redirect chain=dstnat dst-port=53 protocol=udp in-interface-list=LAN dst-address-type=!local comment="Redirect all LAN DNS UDP to Router"',
    ],
    "/ip firewall filter": [],
    "/ip firewall layer7-protocol": [`add name="ir-tld" regexp="\\x02ir\\x00"`],
  };

  return config;
};

export const DOHConfig = (
  dohServerUrl: string,
  dohServerIp: string,
  routingMark: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dns": [`set use-doh-server=${dohServerUrl} verify-doh-cert=yes`],
    "/ip firewall mangle": [
      `add action=mark-routing chain=output dst-address=${dohServerIp} protocol=tcp dst-port=443 new-routing-mark=${routingMark} passthrough=no comment="Mark DoH to ${dohServerIp} for path ${routingMark}"`,
    ],
  };

  return config;
};

export const WithDomestic = (DomesticLink: boolean): RouterConfig => {
  return mergeMultipleConfigs(
    BaseConfig(),
    DometicBase(),
    ForeignBase(DomesticLink),
    VPNBase(),
    SplitBase(),
    DNS(),
    // DomesticAddresslist(),
  );
};

export const WithoutDomestic = (DomesticLink: boolean): RouterConfig => {
  return mergeMultipleConfigs(
    BaseConfig(),
    ForeignBase(DomesticLink),
    VPNBase(),
    DNS(),
    // DomesticAddresslist(),
  );
};

export const ChooseCG = (DomesticLink: boolean): RouterConfig => {
  if (DomesticLink) {
    return WithDomestic(DomesticLink);
  } else {
    return WithoutDomestic(DomesticLink);
  }
};
