// import { describe, it } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import type { WANState } from "~/components/Star/StarContext";
// import { WANCG } from "./WANCG";

// describe("WANCG Module - Comprehensive Test Suite", () => {
//     describe("Basic Single-Link Scenarios", () => {
//         it("should configure single Foreign WAN with ethernet DHCP", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Single Foreign WAN - Ethernet DHCP",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//             ]);
//         });

//         it("should configure single Domestic WAN with ethernet DHCP", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Single Domestic WAN - Ethernet DHCP",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//             ]);
//         });

//         it("should configure Foreign + Domestic single links", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Foreign + Domestic Single Links",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//             ]);
//         });
//     });

//     describe("Multi-Link Load Balancing Scenarios", () => {
//         it("should configure 3 Foreign WANs with PCC load balancing", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Foreign-WAN-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Foreign-WAN-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                                 weight: 1,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 Foreign WANs with PCC Load Balancing",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//                 "/ip firewall mangle",
//             ]);
//         });

//         it("should configure 3 Domestic WANs with NTH load balancing", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Domestic-WAN-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether5",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Domestic-WAN-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                                 weight: 1,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 Domestic WANs with NTH Load Balancing",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//                 "/ip firewall mangle",
//             ]);
//         });

//         it("should configure 3 Foreign + 3 Domestic with mixed load balancing strategies", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-WAN-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Foreign-WAN-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Domestic-WAN-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether5",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Domestic-WAN-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 Foreign (PCC) + 3 Domestic (NTH) Load Balancing",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//                 "/ip firewall mangle",
//             ]);
//         });
//     });

//     describe("Multi-Link Failover and Other Strategies", () => {
//         it("should configure 4 Foreign WANs with Failover strategy", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Primary",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-Backup-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Foreign-Backup-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                             },
//                             {
//                                 name: "Foreign-Backup-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 4,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "4 Foreign WANs with Failover Strategy",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//             ]);
//         });

//         it("should configure 3 Domestic WANs with RoundRobin strategy", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-RR-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                             {
//                                 name: "Domestic-RR-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether5",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                             {
//                                 name: "Domestic-RR-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "RoundRobin",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 Domestic WANs with RoundRobin Strategy",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//                 "/ip firewall mangle",
//             ]);
//         });

//         it("should configure 3 Foreign WANs with Both (LoadBalance + Failover) strategy", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Both-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                                 weight: 2,
//                             },
//                             {
//                                 name: "Foreign-Both-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Foreign-Both-3",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                                 weight: 1,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Both",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 Foreign WANs with Both (LoadBalance + Failover)",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip route",
//                 "/ip firewall mangle",
//             ]);
//         });
//     });

//     describe("Connection Type Variations", () => {
//         it("should configure PPPoE connection", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-PPPoE",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "user@isp.com",
//                                         password: "pppoe-pass-123",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Foreign WAN with PPPoE Connection",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface pppoe-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure Static IP connection", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-Static",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     static: {
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                         gateway: "203.0.113.1",
//                                         DNS: "8.8.8.8",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Domestic WAN with Static IP Connection",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure LTE connection", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-LTE",
//                                 InterfaceConfig: {
//                                     InterfaceName: "lte1",
//                                 },
//                                 ConnectionConfig: {
//                                     lteSettings: {
//                                         apn: "internet",
//                                         username: "lte-user",
//                                         password: "lte-pass",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Foreign WAN with LTE Connection",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface lte apn",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure mixed connection types in multi-link setup", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-DHCP",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-PPPoE",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "pppoe@isp.com",
//                                         password: "pppoe-pass",
//                                     },
//                                 },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Foreign-Static",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     static: {
//                                         ipAddress: "198.51.100.10",
//                                         subnet: "255.255.255.0",
//                                         gateway: "198.51.100.1",
//                                     },
//                                 },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Mixed Connection Types (DHCP, PPPoE, Static) with Failover",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/ip dhcp-client",
//                 "/interface pppoe-client",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });
//     });

//     describe("Interface Type Variations", () => {
//         it("should configure wireless WAN (2.4GHz and 5GHz)", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WiFi-2.4",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi2.4",
//                                     WirelessCredentials: {
//                                         SSID: "CoffeeShop-WiFi",
//                                         Password: "coffeeshop123",
//                                     },
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-WiFi-5",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi5",
//                                     WirelessCredentials: {
//                                         SSID: "Mall-WiFi-5G",
//                                         Password: "mall5ghz456",
//                                     },
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Wireless WAN - 2.4GHz and 5GHz with Failover",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wifi",
//                 "/ip dhcp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure VLAN tagged interface", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-VLAN100",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "100",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Foreign WAN with VLAN 100",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface vlan",
//                 "/interface macvlan",
//                 "/ip dhcp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure MACVLAN interface", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-MACVLAN",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Domestic WAN with MACVLAN",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface macvlan",
//                 "/ip dhcp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure combined VLAN + MACVLAN interface", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-VLAN-MACVLAN",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "200",
//                                     MacAddress: "11:22:33:44:55:66",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Foreign WAN with VLAN + MACVLAN",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface vlan",
//                 "/interface macvlan",
//                 "/ip dhcp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });
//     });

//     describe("VPN Client Integration", () => {
//         it("should configure single WireGuard VPN client", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-VPN-1",
//                             InterfacePrivateKey: "YJBRx1234567890abcdefghijklmnopqrstuvwxyz=",
//                             InterfaceAddress: "10.8.0.2/24",
//                             InterfaceDNS: "10.8.0.1",
//                             PeerPublicKey: "ServerPublicKey1234567890abcdefghijk=",
//                             PeerEndpointAddress: "vpn.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Single WireGuard VPN Client",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure multiple WireGuard VPN clients with failover", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Primary",
//                             InterfacePrivateKey: "PrimaryPrivateKey123456789=",
//                             InterfaceAddress: "10.8.0.2/24",
//                             InterfaceDNS: "10.8.0.1",
//                             PeerPublicKey: "PrimaryPublicKey123456789=",
//                             PeerEndpointAddress: "vpn1.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                         },
//                         {
//                             Name: "WG-Backup-1",
//                             InterfacePrivateKey: "Backup1PrivateKey123456789=",
//                             InterfaceAddress: "10.9.0.2/24",
//                             InterfaceDNS: "10.9.0.1",
//                             PeerPublicKey: "Backup1PublicKey123456789=",
//                             PeerEndpointAddress: "vpn2.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 2,
//                         },
//                         {
//                             Name: "WG-Backup-2",
//                             InterfacePrivateKey: "Backup2PrivateKey123456789=",
//                             InterfaceAddress: "10.10.0.2/24",
//                             InterfaceDNS: "10.10.0.1",
//                             PeerPublicKey: "Backup2PublicKey123456789=",
//                             PeerEndpointAddress: "vpn3.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 3,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Failover",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "3 WireGuard VPN Clients with Failover",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure OpenVPN client", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     OpenVPN: [
//                         {
//                             Name: "OpenVPN-1",
//                             Server: {
//                                 Address: "openvpn.example.com",
//                                 Port: 1194,
//                             },
//                             AuthType: "Credentials",
//                             Credentials: {
//                                 Username: "openvpn-user",
//                                 Password: "openvpn-pass-secure",
//                             },
//                             Auth: "sha256",
//                             Protocol: "udp",
//                             Cipher: "aes256-cbc",
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "OpenVPN Client with Credentials",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface ovpn-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure PPTP client", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     PPTP: [
//                         {
//                             Name: "PPTP-1",
//                             ConnectTo: "pptp.example.com",
//                             Credentials: {
//                                 Username: "pptp-user",
//                                 Password: "pptp-pass",
//                             },
//                             AuthMethod: ["mschap2"],
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "PPTP VPN Client",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface pptp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure L2TP client with IPsec", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     L2TP: [
//                         {
//                             Name: "L2TP-IPsec-1",
//                             Server: {
//                                 Address: "l2tp.example.com",
//                                 Port: 1701,
//                             },
//                             Credentials: {
//                                 Username: "l2tp-user",
//                                 Password: "l2tp-pass",
//                             },
//                             UseIPsec: true,
//                             IPsecSecret: "ipsec-psk-secret",
//                             AuthMethod: ["mschap2"],
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "L2TP VPN Client with IPsec",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface l2tp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure SSTP client", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     SSTP: [
//                         {
//                             Name: "SSTP-1",
//                             Server: {
//                                 Address: "sstp.example.com",
//                                 Port: 443,
//                             },
//                             Credentials: {
//                                 Username: "sstp-user",
//                                 Password: "sstp-pass",
//                             },
//                             AuthMethod: ["mschap2"],
//                             TlsVersion: "only-1.2",
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "SSTP VPN Client",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface sstp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure IKeV2 client", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     IKeV2: [
//                         {
//                             Name: "IKeV2-1",
//                             Server: {
//                                 Address: "ikev2.example.com",
//                                 Port: 500,
//                             },
//                             Credentials: {
//                                 Username: "ikev2-user",
//                                 Password: "ikev2-pass",
//                             },
//                             priority: 1,
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "IKeV2 VPN Client",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure mixed VPN protocols in single configuration", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WAN-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Mixed",
//                             InterfacePrivateKey: "WGPrivateKey123456789=",
//                             InterfaceAddress: "10.8.0.2/24",
//                             InterfaceDNS: "10.8.0.1",
//                             PeerPublicKey: "WGPublicKey123456789=",
//                             PeerEndpointAddress: "wg.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                         },
//                     ],
//                     OpenVPN: [
//                         {
//                             Name: "OpenVPN-Mixed",
//                             Server: {
//                                 Address: "ovpn.example.com",
//                                 Port: 1194,
//                             },
//                             AuthType: "Credentials",
//                             Credentials: {
//                                 Username: "ovpn-user",
//                                 Password: "ovpn-pass",
//                             },
//                             Auth: "sha256",
//                             Protocol: "tcp",
//                             priority: 2,
//                         },
//                     ],
//                     PPTP: [
//                         {
//                             Name: "PPTP-Mixed",
//                             ConnectTo: "pptp.example.com",
//                             Credentials: {
//                                 Username: "pptp-user",
//                                 Password: "pptp-pass",
//                             },
//                             AuthMethod: ["mschap2"],
//                             priority: 3,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Failover",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Mixed VPN Protocols (WireGuard, OpenVPN, PPTP) with Failover",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/ip address",
//                 "/interface ovpn-client",
//                 "/interface pptp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });
//     });

//     describe("Complex Real-World Scenarios", () => {
//         it("should configure 3 Foreign (DHCP) + 2 Domestic (PPPoE) + 2 WireGuard + 1 OpenVPN", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Primary",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                                 weight: 2,
//                             },
//                             {
//                                 name: "Foreign-Backup-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Foreign-Backup-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 3,
//                                 weight: 1,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Both",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-PPPoE-1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "domestic1@isp.local",
//                                         password: "domestic-pppoe-1",
//                                     },
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Domestic-PPPoE-2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "domestic2@isp.local",
//                                         password: "domestic-pppoe-2",
//                                     },
//                                 },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Premium",
//                             InterfacePrivateKey: "WGPremiumPrivateKey=",
//                             InterfaceAddress: "10.11.0.2/24",
//                             InterfaceDNS: "10.11.0.1",
//                             PeerPublicKey: "WGPremiumPublicKey=",
//                             PeerEndpointAddress: "premium.vpn.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                             weight: 2,
//                         },
//                         {
//                             Name: "WG-Standard",
//                             InterfacePrivateKey: "WGStandardPrivateKey=",
//                             InterfaceAddress: "10.12.0.2/24",
//                             InterfaceDNS: "10.12.0.1",
//                             PeerPublicKey: "WGStandardPublicKey=",
//                             PeerEndpointAddress: "standard.vpn.example.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 2,
//                             weight: 1,
//                         },
//                     ],
//                     OpenVPN: [
//                         {
//                             Name: "OpenVPN-Backup",
//                             Server: {
//                                 Address: "backup.vpn.example.com",
//                                 Port: 1194,
//                             },
//                             AuthType: "Credentials",
//                             Credentials: {
//                                 Username: "backup-vpn-user",
//                                 Password: "backup-vpn-pass",
//                             },
//                             Auth: "sha512",
//                             Protocol: "tcp",
//                             Cipher: "aes256-gcm",
//                             priority: 3,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Both",
//                         loadBalanceMethod: "NTH",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Complex: 3 Foreign (PCC) + 2 Domestic (Failover) + 2 WG + 1 OVPN (NTH)",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/ip dhcp-client",
//                 "/interface pppoe-client",
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/interface ovpn-client",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });

//         it("should configure wireless Foreign + wired Domestic + multiple VPN protocols", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WiFi-2.4",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi2.4",
//                                     WirelessCredentials: {
//                                         SSID: "PublicWiFi-2.4GHz",
//                                         Password: "public-wifi-pass",
//                                     },
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-WiFi-5",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi5",
//                                     WirelessCredentials: {
//                                         SSID: "PublicWiFi-5GHz",
//                                         Password: "public-wifi-5-pass",
//                                     },
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Foreign-LTE",
//                                 InterfaceConfig: {
//                                     InterfaceName: "lte1",
//                                 },
//                                 ConnectionConfig: {
//                                     lteSettings: {
//                                         apn: "internet.mobile",
//                                         username: "mobile",
//                                         password: "mobile",
//                                     },
//                                 },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-Fiber",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Domestic-Cable",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether5",
//                                 },
//                                 ConnectionConfig: {
//                                     static: {
//                                         ipAddress: "192.168.100.10",
//                                         subnet: "255.255.255.0",
//                                         gateway: "192.168.100.1",
//                                         DNS: "192.168.100.1",
//                                     },
//                                 },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Pro",
//                             InterfacePrivateKey: "WGProPrivateKey=",
//                             InterfaceAddress: "10.20.0.2/24",
//                             InterfaceDNS: "10.20.0.1",
//                             PeerPublicKey: "WGProPublicKey=",
//                             PeerEndpointAddress: "pro.vpn.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                         },
//                     ],
//                     L2TP: [
//                         {
//                             Name: "L2TP-Corp",
//                             Server: {
//                                 Address: "corp.l2tp.com",
//                                 Port: 1701,
//                             },
//                             Credentials: {
//                                 Username: "corp-user",
//                                 Password: "corp-pass",
//                             },
//                             UseIPsec: true,
//                             IPsecSecret: "corp-ipsec-secret",
//                             priority: 2,
//                         },
//                     ],
//                     SSTP: [
//                         {
//                             Name: "SSTP-Enterprise",
//                             Server: {
//                                 Address: "enterprise.sstp.com",
//                                 Port: 443,
//                             },
//                             Credentials: {
//                                 Username: "enterprise-user",
//                                 Password: "enterprise-pass",
//                             },
//                             AuthMethod: ["mschap2"],
//                             TlsVersion: "only-1.2",
//                             priority: 3,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Failover",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Complex: Wireless Foreign (WiFi + LTE) + Wired Domestic + Multi-VPN (WG, L2TP, SSTP)",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wifi",
//                 "/interface lte apn",
//                 "/ip dhcp-client",
//                 "/ip address",
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/interface l2tp-client",
//                 "/interface sstp-client",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });

//         it("should configure VLAN/MACVLAN interfaces + PPPoE + VPN - Maximum Complexity", () => {
//             const wanState: WANState = {
//                 WANLink: {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-VLAN-100",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "100",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 1,
//                                 weight: 2,
//                             },
//                             {
//                                 name: "Foreign-VLAN-200-MAC",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                     VLANID: "200",
//                                     MacAddress: "AA:BB:CC:11:22:33",
//                                 },
//                                 ConnectionConfig: {
//                                     isDHCP: true,
//                                 },
//                                 priority: 2,
//                                 weight: 1,
//                             },
//                             {
//                                 name: "Foreign-MACVLAN",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                     MacAddress: "DD:EE:FF:44:55:66",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "vlan-pppoe@isp.com",
//                                         password: "vlan-pppoe-pass",
//                                     },
//                                 },
//                                 priority: 3,
//                                 weight: 1,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Both",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-Static-VLAN",
//                                 InterfaceConfig: {
//                                     InterfaceName: "sfp1",
//                                     VLANID: "500",
//                                 },
//                                 ConnectionConfig: {
//                                     static: {
//                                         ipAddress: "172.16.0.10",
//                                         subnet: "255.255.255.0",
//                                         gateway: "172.16.0.1",
//                                         DNS: "172.16.0.1",
//                                     },
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Domestic-PPPoE-MAC",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                     MacAddress: "77:88:99:AA:BB:CC",
//                                 },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "domestic-mac@local.isp",
//                                         password: "domestic-mac-pass",
//                                     },
//                                 },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 },
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Enterprise-1",
//                             InterfacePrivateKey: "WGEnt1PrivateKey=",
//                             InterfaceAddress: "10.50.0.2/24",
//                             InterfaceDNS: "10.50.0.1",
//                             InterfaceListenPort: 51821,
//                             InterfaceMTU: 1420,
//                             PeerPublicKey: "WGEnt1PublicKey=",
//                             PeerEndpointAddress: "ent1.wg.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             PeerPersistentKeepalive: 25,
//                             priority: 1,
//                             weight: 3,
//                         },
//                         {
//                             Name: "WG-Enterprise-2",
//                             InterfacePrivateKey: "WGEnt2PrivateKey=",
//                             InterfaceAddress: "10.51.0.2/24",
//                             InterfaceDNS: "10.51.0.1",
//                             PeerPublicKey: "WGEnt2PublicKey=",
//                             PeerEndpointAddress: "ent2.wg.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 2,
//                             weight: 2,
//                         },
//                     ],
//                     OpenVPN: [
//                         {
//                             Name: "OVPN-Cloud-1",
//                             Server: {
//                                 Address: "cloud1.ovpn.com",
//                                 Port: 1194,
//                             },
//                             AuthType: "Certificate",
//                             Auth: "sha512",
//                             Protocol: "tcp",
//                             Cipher: "aes256-gcm",
//                             TlsVersion: "only-1.2",
//                             Certificates: {
//                                 CaCertificateName: "ca-cert",
//                                 ClientCertificateName: "client-cert",
//                                 CaCertificateContent: "-----BEGIN CERTIFICATE-----\nCA_CERT_CONTENT\n-----END CERTIFICATE-----",
//                                 ClientCertificateContent: "-----BEGIN CERTIFICATE-----\nCLIENT_CERT_CONTENT\n-----END CERTIFICATE-----",
//                                 ClientKeyContent: "-----BEGIN PRIVATE KEY-----\nCLIENT_KEY_CONTENT\n-----END PRIVATE KEY-----",
//                             },
//                             priority: 3,
//                             weight: 1,
//                         },
//                     ],
//                     PPTP: [
//                         {
//                             Name: "PPTP-Legacy",
//                             ConnectTo: "legacy.pptp.com",
//                             Credentials: {
//                                 Username: "legacy-user",
//                                 Password: "legacy-pass",
//                             },
//                             AuthMethod: ["mschap2", "mschap1"],
//                             KeepaliveTimeout: 60,
//                             priority: 4,
//                             weight: 1,
//                         },
//                     ],
//                     L2TP: [
//                         {
//                             Name: "L2TP-Secure",
//                             Server: {
//                                 Address: "secure.l2tp.com",
//                                 Port: 1701,
//                             },
//                             Credentials: {
//                                 Username: "secure-user",
//                                 Password: "secure-pass",
//                             },
//                             UseIPsec: true,
//                             IPsecSecret: "ultra-secure-psk",
//                             AuthMethod: ["mschap2"],
//                             ProtoVersion: "l2tpv3-udp",
//                             priority: 5,
//                             weight: 1,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Both",
//                         loadBalanceMethod: "PCC",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "Maximum Complexity: VLAN/MACVLAN + PPPoE/DHCP/Static + All VPN Protocols with Multi-Link",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface vlan",
//                 "/interface macvlan",
//                 "/ip dhcp-client",
//                 "/interface pppoe-client",
//                 "/ip address",
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/interface ovpn-client",
//                 "/interface pptp-client",
//                 "/interface l2tp-client",
//                 "/interface list member",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });

//         it("should configure only VPN clients without WAN links", () => {
//             const wanState: WANState = {
//                 WANLink: {},
//                 VPNClient: {
//                     Wireguard: [
//                         {
//                             Name: "WG-Only-1",
//                             InterfacePrivateKey: "WGOnlyPrivate1=",
//                             InterfaceAddress: "10.70.0.2/24",
//                             InterfaceDNS: "10.70.0.1",
//                             PeerPublicKey: "WGOnlyPublic1=",
//                             PeerEndpointAddress: "only1.wg.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 1,
//                         },
//                         {
//                             Name: "WG-Only-2",
//                             InterfacePrivateKey: "WGOnlyPrivate2=",
//                             InterfaceAddress: "10.71.0.2/24",
//                             InterfaceDNS: "10.71.0.1",
//                             PeerPublicKey: "WGOnlyPublic2=",
//                             PeerEndpointAddress: "only2.wg.com",
//                             PeerEndpointPort: 51820,
//                             PeerAllowedIPs: "0.0.0.0/0",
//                             priority: 2,
//                         },
//                     ],
//                     MultiLinkConfig: {
//                         strategy: "Failover",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "WANCG",
//                 "VPN Only Configuration - No WAN Links",
//                 { wanState },
//                 () => WANCG(wanState),
//             );

//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//             ]);
//         });
//     });
// });
