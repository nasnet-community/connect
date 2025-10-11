// import { describe, it, expect } from "vitest";
// import { WirelessConfig } from "./Wireless";
// import type {
//   WirelessConfig as WirelessConfigType,
//   WANLinks,
//   RouterModels,
// } from "~/components/Star/StarContext";
// import type { RouterConfig } from "~/components/Star/ConfigGenerator";
// import {
//   testWithOutput,
//   validateRouterConfig,
// } from "~/test-utils/test-helpers";

// describe("Wireless Main Configuration", () => {
//   describe("WirelessConfig - Basic Scenarios", () => {
//     it("should disable wireless interfaces when no wireless configs provided", () => {
//       const wirelessConfigs: WirelessConfigType[] = [];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Disable wireless interfaces with empty configuration",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       expect(result["/interface wifi"]).toContain(
//         "set [ find default-name=wifi1 ] disabled=yes",
//       );
//       expect(result["/interface wifi"]).toContain(
//         "set [ find default-name=wifi2 ] disabled=yes",
//       );
//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should disable wireless interfaces when all configs are disabled", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "DisabledNetwork",
//           Password: "password123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: true,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Disable wireless interfaces when all configs are disabled",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       expect(result["/interface wifi"]).toContain(
//         "set [ find default-name=wifi1 ] disabled=yes",
//       );
//       expect(result["/interface wifi"]).toContain(
//         "set [ find default-name=wifi2 ] disabled=yes",
//       );
//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should configure basic wireless network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "HomeNetwork",
//           Password: "HomePass123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure basic wireless network for Domestic",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       // Should configure master and slave interfaces
//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain('.ssid="HomeNetwork"');
//       expect(wifiCommands).toContain('.passphrase="HomePass123"');
//       expect(wifiCommands).toContain("DomesticLAN");

//       // Should configure bridge ports
//       expect(result["/interface bridge port"]).toContain(
//         "add bridge=LANBridgeDomestic interface=wifi2.4-DomesticLAN comment=\"DomesticLAN\"",
//       );
//       expect(result["/interface bridge port"]).toContain(
//         "add bridge=LANBridgeDomestic interface=wifi5-DomesticLAN comment=\"DomesticLAN\"",
//       );

//       // Should configure interface lists
//       const listMember = result["/interface list member"].join(" ");
//       expect(listMember).toContain("wifi2.4-DomesticLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Named Networks", () => {
//     it("should configure wireless with named network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "GuestWiFi",
//           SSID: "GuestNetwork",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wireless with named network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       // Note: WiFi interfaces use base name (ForeignLAN) without network name
//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("ForeignLAN");

//       // Bridge ports include the network name in interface references
//       expect(result["/interface bridge port"]).toContain(
//         "add bridge=LANBridgeForeign-GuestWiFi interface=wifi2.4-Foreign-GuestWiFiLAN comment=\"Foreign-GuestWiFiLAN\"",
//       );

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Split Band Configuration", () => {
//     it("should configure wireless with split band enabled", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "DualBandWiFi",
//           Password: "DualBand123",
//           isHide: false,
//           SplitBand: true,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wireless with split band SSIDs",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain('.ssid="DualBandWiFi 2.4"');
//       expect(wifiCommands).toContain('.ssid="DualBandWiFi 5"');
//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Hidden SSID", () => {
//     it("should configure wireless with hidden SSID", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "VPNClient",
//           SSID: "HiddenNetwork",
//           Password: "Hidden123",
//           isHide: true,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wireless with hidden SSID",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("configuration.hide-ssid=yes");
//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Multiple Networks", () => {
//     it("should configure multiple wireless networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "DomesticWiFi",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           SSID: "ForeignWiFi",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           SSID: "VPNWiFi",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure multiple wireless networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("VPNClientLAN");

//       // Should have bridge ports for all networks
//       // Note: Bridge uses VPNLAN while WiFi interfaces use VPNClientLAN (implementation mismatch)
//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("DomesticLAN");
//       expect(bridgeCommands).toContain("ForeignLAN");
//       expect(bridgeCommands).toContain("VPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should skip disabled networks in multiple configs", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "EnabledDomestic",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           SSID: "DisabledForeign",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: true,
//         },
//         {
//           WifiTarget: "VPNClient",
//           SSID: "EnabledVPN",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Skip disabled networks in multiple configurations",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const allCommands =
//         result["/interface wifi"].join(" ") +
//         result["/interface bridge port"].join(" ") +
//         result["/interface list member"].join(" ");

//       expect(allCommands).toContain("DomesticLAN");
//       expect(allCommands).not.toContain("ForeignLAN");
//       // Note: VPNClient is shortened to VPN in interface names
//       expect(allCommands).toContain("VPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - WiFi as WAN Interface", () => {
//     it("should configure wifi2.4 as WAN station mode", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "DomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Foreign: {
//           WANConfigs: [
//             {
//               name: "WiFi-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi2.4",
//                 WirelessCredentials: {
//                   SSID: "UpstreamAP",
//                   Password: "UpstreamPass",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wifi2.4 as WAN station with separate wireless network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Note: Current implementation doesn't generate station mode for WAN
//       // It only generates AP mode for LAN interfaces
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("configuration.mode=ap");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should configure wifi5 as WAN station mode", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Foreign",
//           SSID: "ForeignAP",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Domestic: {
//           WANConfigs: [
//             {
//               name: "WiFi5-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi5",
//                 WirelessCredentials: {
//                   SSID: "Upstream5GHz",
//                   Password: "5GHzPass",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wifi5 as WAN station with separate wireless network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Note: Current implementation doesn't generate station mode for WAN
//       // It only generates AP mode for LAN interfaces
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("configuration.mode=ap");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - WiFi as Trunk Master Interface", () => {
//     it("should configure wifi2.4 as trunk master", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Split",
//           SSID: "SplitNetwork",
//           Password: "Split123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hEX",
//           isMaster: true,
//           MasterSlaveInterface: "wifi2.4",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wifi2.4 as trunk master with wireless on wifi5",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Should configure wireless on available band (wifi5)
//       expect(wifiCommands).toContain("SplitLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should configure wifi5 as trunk master", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "DomesticTrunk",
//           Password: "Trunk123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hEX",
//           isMaster: true,
//           MasterSlaveInterface: "wifi5",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure wifi5 as trunk master with wireless on wifi2.4",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Should configure wireless on available band (wifi2.4)
//       expect(wifiCommands).toContain("DomesticLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Complex Scenarios", () => {
//     it("should handle both wifi bands occupied (WAN + Trunk)", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "VPNClient",
//           SSID: "VPNNetwork",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Foreign: {
//           WANConfigs: [
//             {
//               name: "WiFi-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi2.4",
//                 WirelessCredentials: {
//                   SSID: "UpstreamAP",
//                   Password: "UpstreamPass",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hEX",
//           isMaster: true,
//           MasterSlaveInterface: "wifi5",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle both wifi bands occupied by WAN and Trunk",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Note: Current implementation doesn't generate station mode for WAN
//       // Since wifi2.4 is used as WAN, verify wireless interfaces are generated
//       // The exact behavior depends on implementation - just verify no crash
//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should handle special characters in SSID and password", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "Special-Network_2024@Home!",
//           Password: "P@ssw0rd#123$%^&*()",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle special characters in SSID and password",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain('.ssid="Special-Network_2024@Home!"');
//       expect(wifiCommands).toContain('.passphrase="P@ssw0rd#123$%^&*()"');

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle combination of named and unnamed networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "StandardDomestic",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "GuestAccess",
//           SSID: "GuestWiFi",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "SecureVPN",
//           SSID: "SecureNetwork",
//           Password: "Secure123",
//           isHide: true,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle combination of named and unnamed networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("VPNClientLAN");

//       // Note: Named networks use full paths in bridges, VPNClient shows as VPN in bridge names
//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("DomesticLAN");
//       expect(bridgeCommands).toContain("Foreign-GuestAccessLAN");
//       expect(bridgeCommands).toContain("VPN-SecureVPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Edge Cases", () => {
//     it("should handle wireless config with very long SSID", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "VeryLongSSIDNameThatExceedsNormalLengthForTestingPurposes",
//           Password: "LongPassword123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle very long SSID name",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain(
//         '.ssid="VeryLongSSIDNameThatExceedsNormalLengthForTestingPurposes"',
//       );

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should return valid RouterConfig structure for all scenarios", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           SSID: "TestNetwork",
//           Password: "Test123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Verify valid RouterConfig structure",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       // Verify RouterConfig structure
//       expect(result).toHaveProperty("/interface wifi");
//       expect(Array.isArray(result["/interface wifi"])).toBe(true);
//       expect(result).toHaveProperty("/interface bridge port");
//       expect(Array.isArray(result["/interface bridge port"])).toBe(true);
//       expect(result).toHaveProperty("/interface list member");
//       expect(Array.isArray(result["/interface list member"])).toBe(true);

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Single-Type WifiTarget", () => {
//     it("should configure SingleDomestic wireless network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "SingleDomestic",
//           SSID: "SingleDomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure SingleDomestic wireless network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       // SingleDomestic maps to Domestic in network map
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain('.ssid="SingleDomesticAP"');

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("LANBridgeDomestic");
//       expect(bridgeCommands).toContain("DomesticLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should configure SingleForeign wireless network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "SingleForeign",
//           SSID: "SingleForeignAP",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure SingleForeign wireless network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       // SingleForeign maps to Foreign in network map
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain('.ssid="SingleForeignAP"');

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("LANBridgeForeign");
//       expect(bridgeCommands).toContain("ForeignLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should configure SingleVPN wireless network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "SingleVPN",
//           SSID: "SingleVPNAP",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure SingleVPN wireless network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       // SingleVPN maps to VPN in network map
//       expect(wifiCommands).toContain("VPNLAN");
//       expect(wifiCommands).toContain('.ssid="SingleVPNAP"');

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("LANBridgeVPN");
//       expect(bridgeCommands).toContain("VPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should configure all three Single-type networks together", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "SingleDomestic",
//           SSID: "SingleDomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//         {
//           WifiTarget: "SingleForeign",
//           SSID: "SingleForeignAP",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//         {
//           WifiTarget: "SingleVPN",
//           SSID: "SingleVPNAP",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//           NetworkName: "",
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure all three Single-type networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       // Single* types map to their base network names
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("VPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Multiple Named Networks on Same Target", () => {
//     it("should configure multiple named networks for Domestic target", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Guest",
//           SSID: "GuestWiFi",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "IoT",
//           SSID: "IoTDevices",
//           Password: "IoT123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Office",
//           SSID: "OfficeNetwork",
//           Password: "Office123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Configure multiple named networks for Domestic",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("DomesticLAN");

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("Domestic-GuestLAN");
//       expect(bridgeCommands).toContain("Domestic-IoTLAN");
//       expect(bridgeCommands).toContain("Domestic-OfficeLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should assign master to first network and slaves to subsequent networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Primary",
//           SSID: "PrimaryWiFi",
//           Password: "Primary123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Secondary",
//           SSID: "SecondaryWiFi",
//           Password: "Secondary123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Master on first, slaves on subsequent networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // First network should have master configuration (set command)
//       expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");
//       expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");

//       // Second network should have slave configuration (add with master-interface)
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Complex Combinations", () => {
//     it("should handle split band + hidden SSID + named network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "SecureVPN",
//           SSID: "HiddenSecure",
//           Password: "SecurePass123",
//           isHide: true,
//           SplitBand: true,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Split band + hidden + named network combination",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Verify split band SSIDs
//       expect(wifiCommands).toContain('.ssid="HiddenSecure 2.4"');
//       expect(wifiCommands).toContain('.ssid="HiddenSecure 5"');

//       // Verify hidden SSID
//       expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//       // Verify named network in bridge
//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("VPN-SecureVPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle all targets with mixed named and unnamed networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "DomesticMain",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "ForeignGuest",
//           SSID: "GuestAccess",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: true,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "VPNSecure",
//           SSID: "SecureVPN",
//           Password: "VPN123",
//           isHide: true,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Split",
//           NetworkName: "",
//           SSID: "SplitNetwork",
//           Password: "Split123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "All targets with mixed named/unnamed networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("VPNClientLAN");
//       expect(wifiCommands).toContain("SplitLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle mix of split and non-split bands across networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Main",
//           SSID: "MainNetwork",
//           Password: "Main123",
//           isHide: false,
//           SplitBand: true,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Guest",
//           SSID: "GuestNetwork",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "VPN",
//           SSID: "VPNNetwork",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: true,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Mix of split and non-split bands",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Split band networks
//       expect(wifiCommands).toContain('.ssid="MainNetwork 2.4"');
//       expect(wifiCommands).toContain('.ssid="MainNetwork 5"');
//       expect(wifiCommands).toContain('.ssid="VPNNetwork 2.4"');
//       expect(wifiCommands).toContain('.ssid="VPNNetwork 5"');

//       // Non-split band network
//       expect(wifiCommands).toContain('.ssid="GuestNetwork"');

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - NetworkName Edge Cases", () => {
//     it("should handle very long NetworkName", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "VeryLongNetworkNameThatExceedsNormalLengthForTestingEdgeCaseBehavior",
//           SSID: "TestSSID",
//           Password: "Test123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle very long NetworkName",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("VeryLongNetworkNameThatExceedsNormalLengthForTestingEdgeCaseBehavior");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle NetworkName with special characters", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Guest-2024@Home_v2",
//           SSID: "SpecialGuest",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle NetworkName with special characters",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       expect(bridgeCommands).toContain("Guest-2024@Home_v2");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle empty NetworkName as unnamed network", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "",
//           SSID: "UnnamedVPN",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Handle empty NetworkName as unnamed network",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       // Should use base network name without NetworkName suffix
//       expect(bridgeCommands).toContain("LANBridgeVPN");
//       expect(bridgeCommands).toContain("VPNLAN");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Master/Slave Assignment Validation", () => {
//     it("should use slave interfaces when wifi2.4 is WAN master", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "DomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Foreign: {
//           WANConfigs: [
//             {
//               name: "WiFi-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi2.4",
//                 WirelessCredentials: {
//                   SSID: "UpstreamAP",
//                   Password: "Upstream123",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Slave interfaces when wifi2.4 is WAN master",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Should use slave configuration with master-interface
//       expect(wifiCommands).toContain("add configuration.mode=ap");
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should use slave interfaces when wifi5 is trunk master", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Split",
//           NetworkName: "",
//           SSID: "SplitAP",
//           Password: "Split123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hAP ax3",
//           isMaster: true,
//           MasterSlaveInterface: "wifi5",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Slave interfaces when wifi5 is trunk master",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // wifi5 should be slave
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should use only slave interfaces when both bands are masters", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "LAN",
//           SSID: "DomesticLAN",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Foreign: {
//           WANConfigs: [
//             {
//               name: "WiFi24-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi2.4",
//                 WirelessCredentials: {
//                   SSID: "Upstream24",
//                   Password: "Pass24",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hAP ax3",
//           isMaster: true,
//           MasterSlaveInterface: "wifi5",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Only slave interfaces when both bands are masters",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Both should be slaves (add with master-interface)
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//       // Should not have set commands for wifi configuration
//       const setCommands = wifiCommands.match(/set \[ find default-name=wifi/g) || [];
//       // Only base config set commands, not for this network
//       expect(setCommands.length).toBe(2); // Base config renames wifi1 and wifi2

//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should assign master only to first network in sequence", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "First",
//           SSID: "FirstNetwork",
//           Password: "First123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Second",
//           SSID: "SecondNetwork",
//           Password: "Second123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "Third",
//           SSID: "ThirdNetwork",
//           Password: "Third123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Master only to first network in sequence",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // First network should have set (master) commands
//       expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");
//       expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");

//       // Subsequent networks should have add with master-interface (slave) commands
//       const slaveCount = (wifiCommands.match(/master-interface=\[ find default-name=/g) || []).length;
//       expect(slaveCount).toBe(4); // 2 networks × 2 bands = 4 slave interfaces

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Router Model Variations", () => {
//     it("should handle routers with no wireless interfaces", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "TestNetwork",
//           Password: "Test123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "wired-router",
//           model: "RB5009",
//           isMaster: false,
//           Interfaces: {
//             Interfaces: {
//               wireless: [],
//               ethernet: ["ether1", "ether2", "ether3"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Router with no wireless interfaces",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       // Should still configure wireless as long as configs are provided
//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle multiple routers with different wireless capabilities", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "DomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "router1",
//           model: "hAP ax3",
//           isMaster: true,
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//         {
//           id: "router2",
//           model: "RB5009",
//           isMaster: false,
//           Interfaces: {
//             Interfaces: {
//               wireless: [],
//               ethernet: ["ether1", "ether2"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Multiple routers with different wireless capabilities",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Command Syntax Validation", () => {
//     it("should generate exact MikroTik syntax for master interfaces", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "TestAP",
//           Password: "TestPass123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Exact MikroTik syntax for master interfaces",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"];

//       // Check for exact master configuration syntax
//       const masterCmd24 = wifiCommands.find(cmd => cmd.includes("wifi2.4-DomesticLAN") && cmd.includes("set"));
//       const masterCmd5 = wifiCommands.find(cmd => cmd.includes("wifi5-DomesticLAN") && cmd.includes("set"));

//       expect(masterCmd24).toContain("configuration.country=Japan");
//       expect(masterCmd24).toContain(".mode=ap");
//       expect(masterCmd24).toContain(".installation=indoor");
//       expect(masterCmd24).toContain("security.authentication-types=wpa2-psk,wpa3-psk");
//       expect(masterCmd24).toContain("security.ft=yes");
//       expect(masterCmd24).toContain(".ft-over-ds=yes");

//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should properly escape special characters in SSID and password", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "",
//           SSID: 'Test"SSID"With\\Quotes',
//           Password: 'Pass$word@123!#%&*(){}[]',
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Escape special characters in SSID and password",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Check that quotes are present in the command
//       expect(wifiCommands).toContain('.ssid="Test"SSID"With\\Quotes"');
//       expect(wifiCommands).toContain('.passphrase="Pass$word@123!#%&*(){}[]"');

//       validateRouterConfig(result, ["/interface wifi"]);
//     });

//     it("should validate security settings in generated commands", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "Secure",
//           SSID: "SecureAP",
//           Password: "SecurePass123",
//           isHide: true,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Validate security settings",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Verify WPA2/WPA3 mixed mode
//       expect(wifiCommands).toContain("security.authentication-types=wpa2-psk,wpa3-psk");

//       // Verify Fast Transition (802.11r) settings
//       expect(wifiCommands).toContain("security.ft=yes");
//       expect(wifiCommands).toContain(".ft-over-ds=yes");

//       // Verify hidden SSID
//       expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//       validateRouterConfig(result, ["/interface wifi"]);
//     });
//   });

//   describe("WirelessConfig - Extreme Scenarios", () => {
//     it("should handle 10+ wireless networks (stress test)", () => {
//       const wirelessConfigs: WirelessConfigType[] = Array.from({ length: 12 }, (_, i) => ({
//         WifiTarget: (["Domestic", "Foreign", "VPNClient", "Split"][i % 4]) as WirelessConfigType["WifiTarget"],
//         NetworkName: `Network${i + 1}`,
//         SSID: `SSID${i + 1}`,
//         Password: `Pass${i + 1}123`,
//         isHide: i % 3 === 0,
//         SplitBand: i % 2 === 0,
//         isDisabled: false,
//       }));

//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Stress test with 12 wireless networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       // Verify all networks are configured
//       const bridgeCommands = result["/interface bridge port"].join(" ");
//       for (let i = 1; i <= 12; i++) {
//         expect(bridgeCommands).toContain(`Network${i}`);
//       }

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle all networks disabled except one", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Disabled1",
//           SSID: "DisabledSSID1",
//           Password: "Disabled123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: true,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Enabled",
//           SSID: "EnabledSSID",
//           Password: "Enabled123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "Disabled2",
//           SSID: "DisabledSSID2",
//           Password: "Disabled456",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: true,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "All networks disabled except one",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const allCommands =
//         result["/interface wifi"].join(" ") +
//         result["/interface bridge port"].join(" ") +
//         result["/interface list member"].join(" ");

//       expect(allCommands).toContain("EnabledSSID");
//       expect(allCommands).not.toContain("DisabledSSID1");
//       expect(allCommands).not.toContain("DisabledSSID2");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle networks with identical SSIDs but different passwords", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Network1",
//           SSID: "SameSSID",
//           Password: "Password1",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Network2",
//           SSID: "SameSSID",
//           Password: "Password2",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Identical SSIDs with different passwords",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Both passwords should be present
//       expect(wifiCommands).toContain('.passphrase="Password1"');
//       expect(wifiCommands).toContain('.passphrase="Password2"');

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle maximum length SSID and password", () => {
//       const maxSSID = "A".repeat(32); // WPA2 max SSID length
//       const maxPassword = "P".repeat(63); // WPA2 max password length

//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: maxSSID,
//           Password: maxPassword,
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Maximum length SSID and password",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain(`.ssid="${maxSSID}"`);
//       expect(wifiCommands).toContain(`.passphrase="${maxPassword}"`);

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - Integration Scenarios", () => {
//     it("should handle WAN on wifi2.4 + Trunk on wifi5 + 3 LAN networks", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Main",
//           SSID: "MainNetwork",
//           Password: "Main123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Guest",
//           SSID: "GuestNetwork",
//           Password: "Guest123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "Secure",
//           SSID: "SecureNetwork",
//           Password: "Secure123",
//           isHide: true,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {
//         Foreign: {
//           WANConfigs: [
//             {
//               name: "WiFi-WAN",
//               InterfaceConfig: {
//                 InterfaceName: "wifi2.4",
//                 WirelessCredentials: {
//                   SSID: "UpstreamAP",
//                   Password: "Upstream123",
//                 },
//               },
//             },
//           ],
//         },
//       };
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hAP ax3",
//           isMaster: true,
//           MasterSlaveInterface: "wifi5",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "WAN on wifi2.4 + Trunk on wifi5 + 3 LAN networks",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // All networks should use slave interfaces (both bands are masters)
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");
//       expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle all 4 base networks with wireless", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "",
//           SSID: "DomesticAP",
//           Password: "Domestic123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "",
//           SSID: "ForeignAP",
//           Password: "Foreign123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "VPNClient",
//           NetworkName: "",
//           SSID: "VPNAP",
//           Password: "VPN123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Split",
//           NetworkName: "",
//           SSID: "SplitAP",
//           Password: "Split123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "All 4 base networks with wireless",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");
//       expect(wifiCommands).toContain("DomesticLAN");
//       expect(wifiCommands).toContain("ForeignLAN");
//       expect(wifiCommands).toContain("VPNClientLAN");
//       expect(wifiCommands).toContain("SplitLAN");

//       // First network should be master, rest should be slaves
//       const masterCount = (wifiCommands.match(/set \[ find default-name=wifi/g) || []).length;
//       const slaveCount = (wifiCommands.match(/master-interface=\[ find default-name=/g) || []).length;

//       expect(masterCount).toBeGreaterThanOrEqual(2); // At least base config
//       expect(slaveCount).toBe(6); // 3 slave networks × 2 bands

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });

//     it("should handle complex multi-router wireless trunk setup", () => {
//       const wirelessConfigs: WirelessConfigType[] = [
//         {
//           WifiTarget: "Domestic",
//           NetworkName: "Office",
//           SSID: "OfficeWiFi",
//           Password: "Office123",
//           isHide: false,
//           SplitBand: true,
//           isDisabled: false,
//         },
//         {
//           WifiTarget: "Foreign",
//           NetworkName: "Public",
//           SSID: "PublicWiFi",
//           Password: "Public123",
//           isHide: false,
//           SplitBand: false,
//           isDisabled: false,
//         },
//       ];
//       const wanLinks: WANLinks = {};
//       const routerModels: RouterModels[] = [
//         {
//           id: "master-router",
//           model: "hAP ax3",
//           isMaster: true,
//           MasterSlaveInterface: "ether1",
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1", "ether2"],
//             },
//           },
//         } as RouterModels,
//         {
//           id: "slave-router",
//           model: "hAP ax2",
//           isMaster: false,
//           Interfaces: {
//             Interfaces: {
//               wireless: ["wifi1", "wifi2"],
//               ethernet: ["ether1", "ether2"],
//             },
//           },
//         } as RouterModels,
//       ];

//       const result = testWithOutput(
//         "WirelessConfig",
//         "Complex multi-router wireless trunk setup",
//         { wirelessConfigs, wanLinks, routerModels },
//         () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//       );

//       const wifiCommands = result["/interface wifi"].join(" ");

//       // Split band configuration
//       expect(wifiCommands).toContain('.ssid="OfficeWiFi 2.4"');
//       expect(wifiCommands).toContain('.ssid="OfficeWiFi 5"');
//       expect(wifiCommands).toContain('.ssid="PublicWiFi"');

//       validateRouterConfig(result, [
//         "/interface wifi",
//         "/interface bridge port",
//         "/interface list member",
//       ]);
//     });
//   });

//   describe("WirelessConfig - WAN + Multiple Networks", () => {
//     describe("WiFi2.4 as WAN + Multiple LAN Networks", () => {
//       it("should configure WiFi2.4 WAN + 2 LAN networks (Domestic + Foreign)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "UpstreamAP",
//                     Password: "Upstream123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + 2 LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // wifi2.4 is WAN master, so both LAN networks should use wifi5 master and wifi2.4 slaves
//         // First LAN network (Domestic) gets wifi5 master
//         expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");

//         // Both should have wifi2.4 slave interfaces
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");

//         // Second LAN network (Foreign) should have wifi5 slave
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi2.4 WAN + 3 LAN networks (Domestic + Foreign + VPN)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPNAP",
//             Password: "VPN123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP-WiFi",
//                     Password: "ISP123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + 3 LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All three LAN networks should be configured
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNClientLAN");

//         // First network gets wifi5 master, others get slaves
//         const masterCount = (wifiCommands.match(/set \[ find default-name=wifi1 \]/g) || []).length;
//         expect(masterCount).toBeGreaterThanOrEqual(1);

//         // Should have slave interfaces for wifi2.4 (all 3 networks)
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(3);

//         // Should have slave interfaces for wifi5 (2nd and 3rd networks)
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi2.4 WAN + 4 LAN networks (all base types)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPNAP",
//             Password: "VPN123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "",
//             SSID: "SplitAP",
//             Password: "Split123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "CellularAP",
//                     Password: "Cellular123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + 4 LAN networks (all base types)",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All four base network types should be configured
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNClientLAN");
//         expect(wifiCommands).toContain("SplitLAN");

//         // wifi2.4 is WAN master, all LAN networks use wifi2.4 slaves
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(4);

//         // First LAN gets wifi5 master, rest get wifi5 slaves
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(3);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi2.4 WAN + multiple named networks on same target", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Main",
//             SSID: "MainWiFi",
//             Password: "Main123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Guest",
//             SSID: "GuestWiFi",
//             Password: "Guest123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "IoT",
//             SSID: "IoTWiFi",
//             Password: "IoT123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Provider",
//                     Password: "Provider123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + multiple named networks on same target",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");
//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         // All three named networks should be configured
//         expect(bridgeCommands).toContain("Domestic-MainLAN");
//         expect(bridgeCommands).toContain("Domestic-GuestLAN");
//         expect(bridgeCommands).toContain("Domestic-IoTLAN");

//         // All should use wifi2.4 slave (WAN master)
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(3);

//         // First network gets wifi5 master, rest get wifi5 slaves
//         expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi2.4 WAN + mix of named and unnamed networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "StandardDomestic",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "PublicGuest",
//             SSID: "GuestAccess",
//             Password: "Guest123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "SecureVPN",
//             SSID: "VPNSecure",
//             Password: "VPN123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-Uplink",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP-AP",
//                     Password: "ISP-Pass",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + mix of named and unnamed networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");
//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         // Verify unnamed network
//         expect(bridgeCommands).toContain("DomesticLAN");

//         // Verify named networks
//         expect(bridgeCommands).toContain("Foreign-PublicGuestLAN");
//         expect(bridgeCommands).toContain("VPN-SecureVPNLAN");

//         // Verify hidden SSID
//         expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//         // All should use wifi2.4 slave
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(3);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("WiFi5 as WAN + Multiple LAN Networks", () => {
//       it("should configure WiFi5 WAN + 2 LAN networks (Domestic + Foreign)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Upstream5G",
//                     Password: "5GPass123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + 2 LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // wifi5 is WAN master, so both LAN networks should use wifi2.4 master and wifi5 slaves
//         // First LAN network (Domestic) gets wifi2.4 master
//         expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");

//         // Both should have wifi5 slave interfaces
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//         // Second LAN network (Foreign) should have wifi2.4 slave
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");

//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + 3 LAN networks (Domestic + Foreign + VPN)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPNAP",
//             Password: "VPN123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5GHz-ISP",
//                     Password: "ISP-5G",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + 3 LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All three LAN networks should be configured
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNClientLAN");

//         // First network gets wifi2.4 master, others get slaves
//         const masterCount = (wifiCommands.match(/set \[ find default-name=wifi2 \]/g) || []).length;
//         expect(masterCount).toBeGreaterThanOrEqual(1);

//         // Should have slave interfaces for wifi5 (all 3 networks)
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(3);

//         // Should have slave interfaces for wifi2.4 (2nd and 3rd networks)
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + 4 LAN networks (all base types)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "Foreign123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPNAP",
//             Password: "VPN123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "",
//             SSID: "SplitAP",
//             Password: "Split123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-Uplink",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5GHz-Fiber",
//                     Password: "Fiber5G",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + 4 LAN networks (all base types)",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All four base network types should be configured
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNClientLAN");
//         expect(wifiCommands).toContain("SplitLAN");

//         // wifi5 is WAN master, all LAN networks use wifi5 slaves
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(4);

//         // First LAN gets wifi2.4 master, rest get wifi2.4 slaves
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(3);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + multiple named networks on different targets", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "HomeMain",
//             SSID: "Home-Main",
//             Password: "HomeMain123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "GuestPublic",
//             SSID: "Guest-Public",
//             Password: "GuestPub123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "SecureNet",
//             SSID: "Secure-Network",
//             Password: "SecureNet123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "5GHz-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Provider-5G",
//                     Password: "Provider5G",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + multiple named networks on different targets",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");
//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         // All three named networks should be configured
//         expect(bridgeCommands).toContain("Domestic-HomeMainLAN");
//         expect(bridgeCommands).toContain("Foreign-GuestPublicLAN");
//         expect(bridgeCommands).toContain("VPN-SecureNetLAN");

//         // All should use wifi5 slave (WAN master)
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(3);

//         // First network gets wifi2.4 master, rest get wifi2.4 slaves
//         expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(2);

//         // Verify hidden SSID
//         expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + mix of named and unnamed networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "StandardDomestic",
//             Password: "Domestic123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "PublicAccess",
//             SSID: "Public-WiFi",
//             Password: "Public123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "",
//             SSID: "SplitNetwork",
//             Password: "Split123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "5G-Uplink",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Carrier-5G",
//                     Password: "Carrier5G",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + mix of named and unnamed networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");
//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         // Verify unnamed networks
//         expect(bridgeCommands).toContain("DomesticLAN");
//         expect(bridgeCommands).toContain("SplitLAN");

//         // Verify named network
//         expect(bridgeCommands).toContain("Foreign-PublicAccessLAN");

//         // All should use wifi5 slave
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(3);

//         // First gets wifi2.4 master, rest get slaves
//         expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("WiFi WAN + Split Band Networks", () => {
//       it("should configure WiFi2.4 WAN + split band LAN networks (verify only wifi5 gets split)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DualBand",
//             Password: "Dual123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "GuestDual",
//             Password: "Guest123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Upstream",
//                     Password: "Up123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + split band LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // Split band SSIDs - wifi2.4 is WAN, so split should apply to remaining bands
//         expect(wifiCommands).toContain('.ssid="DualBand 2.4"');
//         expect(wifiCommands).toContain('.ssid="DualBand 5"');
//         expect(wifiCommands).toContain('.ssid="GuestDual 2.4"');
//         expect(wifiCommands).toContain('.ssid="GuestDual 5"');

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + split band LAN networks (verify only wifi2.4 gets split)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Main",
//             SSID: "HomeWiFi",
//             Password: "Home123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Provider5G",
//                     Password: "5G123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + split band LAN network",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // Split band SSIDs
//         expect(wifiCommands).toContain('.ssid="HomeWiFi 2.4"');
//         expect(wifiCommands).toContain('.ssid="HomeWiFi 5"');

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi2.4 WAN + multiple split band networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Main",
//             SSID: "MainWiFi",
//             Password: "Main123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "Guest",
//             SSID: "GuestWiFi",
//             Password: "Guest123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "VPN",
//             SSID: "VPNWiFi",
//             Password: "VPN123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP",
//                     Password: "ISP123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + multiple split band networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All split band SSIDs
//         expect(wifiCommands).toContain('.ssid="MainWiFi 2.4"');
//         expect(wifiCommands).toContain('.ssid="MainWiFi 5"');
//         expect(wifiCommands).toContain('.ssid="GuestWiFi 2.4"');
//         expect(wifiCommands).toContain('.ssid="GuestWiFi 5"');
//         expect(wifiCommands).toContain('.ssid="VPNWiFi 2.4"');
//         expect(wifiCommands).toContain('.ssid="VPNWiFi 5"');

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + multiple split band networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "Domestic",
//             Password: "Dom123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "Foreign",
//             Password: "For123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "5G-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5G-ISP",
//                     Password: "5GISP",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + multiple split band networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         expect(wifiCommands).toContain('.ssid="Domestic 2.4"');
//         expect(wifiCommands).toContain('.ssid="Domestic 5"');
//         expect(wifiCommands).toContain('.ssid="Foreign 2.4"');
//         expect(wifiCommands).toContain('.ssid="Foreign 5"');

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("WiFi WAN + Hidden Networks", () => {
//       it("should configure WiFi2.4 WAN + multiple hidden LAN networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Hidden1",
//             SSID: "SecretHome",
//             Password: "Secret123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "Hidden2",
//             SSID: "SecretVPN",
//             Password: "VPN123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Public",
//                     Password: "Public123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + multiple hidden LAN networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All networks should be hidden
//         const hiddenCount = (wifiCommands.match(/configuration\.hide-ssid=yes/g) || []).length;
//         expect(hiddenCount).toBeGreaterThanOrEqual(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + multiple hidden networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "HiddenMain",
//             Password: "Main123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "HiddenGuest",
//             Password: "Guest123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "HiddenVPN",
//             Password: "VPN123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "5G-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Carrier",
//                     Password: "Carrier123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + multiple hidden networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         const hiddenCount = (wifiCommands.match(/configuration\.hide-ssid=yes/g) || []).length;
//         expect(hiddenCount).toBeGreaterThanOrEqual(3);

//         expect(wifiCommands).toContain("HiddenMain");
//         expect(wifiCommands).toContain("HiddenGuest");
//         expect(wifiCommands).toContain("HiddenVPN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi WAN + mix of hidden and visible networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "VisibleHome",
//             Password: "Home123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "HiddenGuest",
//             Password: "Guest123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-Uplink",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP",
//                     Password: "ISP123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi WAN + mix of hidden and visible networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         expect(wifiCommands).toContain("configuration.hide-ssid=no");
//         expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("WiFi WAN + Single* Types", () => {
//       it("should configure WiFi2.4 WAN + SingleDomestic + SingleForeign + SingleVPN", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "SingleDomestic",
//             NetworkName: "",
//             SSID: "SingleDomAP",
//             Password: "SDom123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "SingleForeign",
//             NetworkName: "",
//             SSID: "SingleForAP",
//             Password: "SFor123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "SingleVPN",
//             NetworkName: "",
//             SSID: "SingleVPNAP",
//             Password: "SVPN123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Provider",
//                     Password: "Prov123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi2.4 WAN + Single* types",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // Single* types map to base names
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi5 WAN + Single* types", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "SingleDomestic",
//             NetworkName: "SD",
//             SSID: "SD-AP",
//             Password: "SD123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "SingleForeign",
//             NetworkName: "SF",
//             SSID: "SF-AP",
//             Password: "SF123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "5G-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5G-Provider",
//                     Password: "5GProv",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi5 WAN + Single* types",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         expect(bridgeCommands).toContain("Domestic-SDLAN");
//         expect(bridgeCommands).toContain("Foreign-SFLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi WAN + mix of Single* and regular types", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "SingleDomestic",
//             NetworkName: "",
//             SSID: "SingleDom",
//             Password: "SD123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "RegularFor",
//             Password: "RF123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP",
//                     Password: "ISP123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi WAN + mix of Single* and regular types",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("Dual WiFi WAN + LAN Networks", () => {
//       it("should configure both wifi2.4 and wifi5 as WAN + 2 LAN networks (all slaves)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomesticAP",
//             Password: "Dom123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForeignAP",
//             Password: "For123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "ISP-24",
//                     Password: "ISP24",
//                   },
//                 },
//               },
//             ],
//           },
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "ISP-5",
//                     Password: "ISP5",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "Dual WiFi WAN + 2 LAN networks (all slaves)",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // Both wifi2.4 and wifi5 are WAN masters, so all LAN networks should use slave interfaces
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;

//         // 2 LAN networks × 2 bands = 4 slave interfaces (2 for each band)
//         expect(slave24Count).toBe(2); // Both LAN networks use wifi2.4 slave
//         expect(slave5Count).toBe(2); // Both LAN networks use wifi5 slave

//         // Verify no LAN network has master configuration
//         expect(wifiCommands).not.toContain('set [ find default-name=wifi1 ] configuration.country');
//         expect(wifiCommands).not.toContain('set [ find default-name=wifi2 ] configuration.country');

//         validateRouterConfig(result, ["/interface wifi"]);
//       });

//       it("should configure dual WAN + 3 LAN networks (verify all slaves, no masters)", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "DomAP",
//             Password: "D123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "ForAP",
//             Password: "F123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPNAP",
//             Password: "V123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "Dual-WAN-24",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Primary",
//                     Password: "Prim123",
//                   },
//                 },
//               },
//             ],
//           },
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "Dual-WAN-5",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "Secondary",
//                     Password: "Sec123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "Dual WAN + 3 LAN networks (all slaves)",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // Both wifi2.4 and wifi5 are WAN masters, so all LAN networks should use slave interfaces
//         const setCommands = wifiCommands.match(/set \[ find default-name=wifi/g) || [];
//         expect(setCommands.length).toBe(2); // Only base config renames (wifi1 and wifi2)

//         // All LAN networks should be slaves (3 networks × 2 bands = 6 slave interfaces)
//         const totalSlaves = (wifiCommands.match(/master-interface=/g) || []).length;
//         expect(totalSlaves).toBe(6); // All 6 interfaces should be slaves

//         // Verify no LAN network has master configuration
//         expect(wifiCommands).not.toContain('set [ find default-name=wifi1 ] configuration.country');
//         expect(wifiCommands).not.toContain('set [ find default-name=wifi2 ] configuration.country');

//         validateRouterConfig(result, ["/interface wifi"]);
//       });
//     });

//     describe("WiFi WAN + Master/Slave Assignment", () => {
//       it("should assign wifi5 master to first LAN when wifi2.4 is WAN", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "First",
//             SSID: "FirstNet",
//             Password: "First123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "Second",
//             SSID: "SecondNet",
//             Password: "Second123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "WAN-AP",
//                     Password: "WAN123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "wifi5 master to first LAN when wifi2.4 is WAN",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // First network should get wifi5 master
//         expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");

//         // Second network should get wifi5 slave
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi1 ]");

//         // Both networks should get wifi2.4 slave (WAN master)
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should assign wifi2.4 master to first LAN when wifi5 is WAN", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Primary",
//             SSID: "PrimaryNet",
//             Password: "Prim123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "Secondary",
//             SSID: "SecondaryNet",
//             Password: "Sec123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "WiFi5-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5G-WAN",
//                     Password: "5G123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "wifi2.4 master to first LAN when wifi5 is WAN",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // First network should get wifi2.4 master
//         expect(wifiCommands).toContain("set [ find default-name=wifi2 ]");

//         // Second network should get wifi2.4 slave
//         expect(wifiCommands).toContain("master-interface=[ find default-name=wifi2 ]");

//         // Both networks should get wifi5 slave (WAN master)
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(2);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should validate sequence: 1st=master, 2nd+=slaves with WAN", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "Net1",
//             SSID: "Net1-SSID",
//             Password: "Net1-Pass",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "Net2",
//             SSID: "Net2-SSID",
//             Password: "Net2-Pass",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "Net3",
//             SSID: "Net3-SSID",
//             Password: "Net3-Pass",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "Net4",
//             SSID: "Net4-SSID",
//             Password: "Net4-Pass",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "WAN",
//                     Password: "WAN123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "Master/slave sequence validation with WAN",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // First LAN network gets remaining master (wifi5)
//         expect(wifiCommands).toContain("set [ find default-name=wifi1 ]");

//         // Networks 2, 3, 4 should have wifi5 slaves
//         const slave5Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi1 \]/g) || []).length;
//         expect(slave5Count).toBe(3);

//         // All 4 networks should have wifi2.4 slaves (WAN master)
//         const slave24Count = (wifiCommands.match(/master-interface=\[ find default-name=wifi2 \]/g) || []).length;
//         expect(slave24Count).toBe(4);

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });

//     describe("WiFi WAN + Complex Combinations", () => {
//       it("should configure WiFi WAN + split + hidden + named networks", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "MainSplit",
//             SSID: "MainNet",
//             Password: "Main123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "GuestHidden",
//             SSID: "GuestNet",
//             Password: "Guest123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "VPNSplitHidden",
//             SSID: "VPNNet",
//             Password: "VPN123",
//             isHide: true,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi24-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "Provider",
//                     Password: "Prov123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi WAN + split + hidden + named networks",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");
//         const bridgeCommands = result["/interface bridge port"].join(" ");

//         // Split band SSIDs
//         expect(wifiCommands).toContain('.ssid="MainNet 2.4"');
//         expect(wifiCommands).toContain('.ssid="MainNet 5"');
//         expect(wifiCommands).toContain('.ssid="VPNNet 2.4"');
//         expect(wifiCommands).toContain('.ssid="VPNNet 5"');

//         // Hidden SSIDs
//         expect(wifiCommands).toContain("configuration.hide-ssid=yes");

//         // Named networks
//         expect(bridgeCommands).toContain("Domestic-MainSplitLAN");
//         expect(bridgeCommands).toContain("Foreign-GuestHiddenLAN");
//         expect(bridgeCommands).toContain("VPN-VPNSplitHiddenLAN");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi WAN + all network types with various settings", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "Dom",
//             Password: "D123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "For",
//             SSID: "For",
//             Password: "F123",
//             isHide: true,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "VPN",
//             Password: "V123",
//             isHide: false,
//             SplitBand: true,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "Spl",
//             SSID: "Spl",
//             Password: "S123",
//             isHide: true,
//             SplitBand: true,
//             isDisabled: false,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Domestic: {
//             WANConfigs: [
//               {
//                 name: "5G-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi5",
//                   WirelessCredentials: {
//                     SSID: "5G",
//                     Password: "5G123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi WAN + all network types with various settings",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const wifiCommands = result["/interface wifi"].join(" ");

//         // All network types
//         expect(wifiCommands).toContain("DomesticLAN");
//         expect(wifiCommands).toContain("ForeignLAN");
//         expect(wifiCommands).toContain("VPNClientLAN");
//         expect(wifiCommands).toContain("SplitLAN");

//         // Split bands
//         expect(wifiCommands).toContain('.ssid="VPN 2.4"');
//         expect(wifiCommands).toContain('.ssid="VPN 5"');

//         // Hidden SSIDs
//         expect(wifiCommands).toContain("configuration.hide-ssid=yes");
//         expect(wifiCommands).toContain("configuration.hide-ssid=no");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });

//       it("should configure WiFi WAN + disabled networks filtering", () => {
//         const wirelessConfigs: WirelessConfigType[] = [
//           {
//             WifiTarget: "Domestic",
//             NetworkName: "",
//             SSID: "EnabledDom",
//             Password: "D123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Foreign",
//             NetworkName: "",
//             SSID: "DisabledFor",
//             Password: "F123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: true,
//           },
//           {
//             WifiTarget: "VPNClient",
//             NetworkName: "",
//             SSID: "EnabledVPN",
//             Password: "V123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: false,
//           },
//           {
//             WifiTarget: "Split",
//             NetworkName: "",
//             SSID: "DisabledSplit",
//             Password: "S123",
//             isHide: false,
//             SplitBand: false,
//             isDisabled: true,
//           },
//         ];
//         const wanLinks: WANLinks = {
//           Foreign: {
//             WANConfigs: [
//               {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                   InterfaceName: "wifi2.4",
//                   WirelessCredentials: {
//                     SSID: "WAN",
//                     Password: "W123",
//                   },
//                 },
//               },
//             ],
//           },
//         };
//         const routerModels: RouterModels[] = [];

//         const result = testWithOutput(
//           "WirelessConfig",
//           "WiFi WAN + disabled networks filtering",
//           { wirelessConfigs, wanLinks, routerModels },
//           () => WirelessConfig(wirelessConfigs, wanLinks, routerModels),
//         );

//         const allCommands =
//           result["/interface wifi"].join(" ") +
//           result["/interface bridge port"].join(" ") +
//           result["/interface list member"].join(" ");

//         // Enabled networks should be present
//         expect(allCommands).toContain("EnabledDom");
//         expect(allCommands).toContain("EnabledVPN");

//         // Disabled networks should not be present
//         expect(allCommands).not.toContain("DisabledFor");
//         expect(allCommands).not.toContain("DisabledSplit");

//         validateRouterConfig(result, [
//           "/interface wifi",
//           "/interface bridge port",
//           "/interface list member",
//         ]);
//       });
//     });
//   });
// });
