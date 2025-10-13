// import { describe, it, expect } from "vitest";
// import {
//     shouldSkipMangleRules,
//     extractBridgeNames,
//     extractTableNames,
//     mapNetworkToRoutingTable,
//     mapNetworkToBridgeName,
// } from "./NetworksUtil";
// import { testWithGenericOutput } from "~/test-utils/test-helpers";
// import type { WANLinks, VPNClient, Networks, Subnets } from "~/components/Star/StarContext";

// describe("NetworksUtil Module Tests", () => {

//     describe("shouldSkipMangleRules Function", () => {
//         it("should return true when Foreign WAN uses PCC load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "PCC",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on Foreign WAN",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when Foreign WAN uses NTH load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "NTH",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on Foreign WAN",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when Domestic WAN uses PCC load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "PCC",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on Domestic WAN",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when Domestic WAN uses NTH load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "NTH",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on Domestic WAN",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when VPN Client uses PCC load balancing", () => {
//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     loadBalanceMethod: "PCC",
//                     Links: [],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on VPN Client",
//                 { vpnClient },
//                 () => shouldSkipMangleRules(undefined, vpnClient),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when VPN Client uses NTH load balancing", () => {
//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     loadBalanceMethod: "NTH",
//                     Links: [],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on VPN Client",
//                 { vpnClient },
//                 () => shouldSkipMangleRules(undefined, vpnClient),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return false when using ECMP load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "ECMP",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip mangle rules with ECMP load balancing",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(false);
//         });

//         it("should return false when no load balancing is configured", () => {
//             const wanLinks: WANLinks = {};

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip mangle rules when no load balancing",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(false);
//         });

//         it("should return false when wanLinks and vpnClient are undefined", () => {
//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip mangle rules when both parameters undefined",
//                 { wanLinks: undefined, vpnClient: undefined },
//                 () => shouldSkipMangleRules(undefined, undefined),
//             );

//             expect(result).toBe(false);
//         });

//         it("should return true when multiple WAN links use PCC/NTH", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "PCC",
//                         Links: [],
//                     },
//                 },
//                 Domestic: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "NTH",
//                         Links: [],
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules when any WAN link uses PCC/NTH",
//                 { wanLinks },
//                 () => shouldSkipMangleRules(wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should prioritize first match when checking multiple configs", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "PCC",
//                         Links: [],
//                     },
//                 },
//             };

//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     loadBalanceMethod: "ECMP",
//                     Links: [],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should return true when Foreign WAN has PCC regardless of VPN Client",
//                 { wanLinks, vpnClient },
//                 () => shouldSkipMangleRules(wanLinks, vpnClient),
//             );

//             expect(result).toBe(true);
//         });
//     });

//     describe("extractBridgeNames Function", () => {
//         it("should extract bridge names from base networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                     Foreign: true,
//                     VPN: true,
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Extract all base network bridge names",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "LANBridgeSplit",
//                 "LANBridgeDomestic",
//                 "LANBridgeForeign",
//                 "LANBridgeVPN",
//             ]);
//         });

//         it("should extract bridge names from additional Foreign networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 ForeignNetworks: ["Foreign-Office", "Foreign-Guest"],
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                     { name: "Foreign-Guest", subnet: "192.168.32.0/24" },
//                 ],
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Extract bridge names from additional Foreign networks",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "LANBridgeForeign-Foreign-Office",
//                 "LANBridgeForeign-Foreign-Guest",
//             ]);
//         });

//         it("should extract bridge names from additional Domestic networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 DomesticNetworks: ["Domestic-Main", "Domestic-IoT"],
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 DomesticNetworks: [
//                     { name: "Domestic-Main", subnet: "192.168.21.0/24" },
//                     { name: "Domestic-IoT", subnet: "192.168.22.0/24" },
//                 ],
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Extract bridge names from additional Domestic networks",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "LANBridgeDomestic-Domestic-Main",
//                 "LANBridgeDomestic-Domestic-IoT",
//             ]);
//         });

//         it("should extract bridge names from VPN Client networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US", "VPN-EU"],
//                     OpenVPN: ["VPN-Asia"],
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                         { name: "VPN-EU", subnet: "10.10.20.0/24" },
//                     ],
//                     OpenVPN: [
//                         { name: "VPN-Asia", subnet: "10.10.30.0/24" },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Extract bridge names from VPN Client networks",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "LANBridgeVPN-VPN-US",
//                 "LANBridgeVPN-VPN-EU",
//                 "LANBridgeVPN-VPN-Asia",
//             ]);
//         });

//         it("should return empty array when no networks are configured", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Return empty array for no networks",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([]);
//         });

//         it("should skip networks without subnets", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "" },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Skip networks with empty subnets",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual(["LANBridgeSplit"]);
//         });

//         it("should extract bridge names from complex multi-network configuration", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                 },
//                 ForeignNetworks: ["Foreign-Office"],
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US"],
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractBridgeNames",
//                 "Extract all bridge names from complex configuration",
//                 { networks, subnets },
//                 () => extractBridgeNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "LANBridgeSplit",
//                 "LANBridgeDomestic",
//                 "LANBridgeForeign-Foreign-Office",
//                 "LANBridgeVPN-VPN-US",
//             ]);
//         });
//     });

//     describe("extractTableNames Function", () => {
//         it("should extract routing table names from base networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                     Foreign: true,
//                     VPN: true,
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Extract all base network routing table names",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "to-Split",
//                 "to-Domestic",
//                 "to-Foreign",
//                 "to-VPN",
//             ]);
//         });

//         it("should extract table names from additional Foreign networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 ForeignNetworks: ["Foreign-Office", "Foreign-Guest"],
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                     { name: "Foreign-Guest", subnet: "192.168.32.0/24" },
//                 ],
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Extract routing table names from additional Foreign networks",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "to-Foreign-Foreign-Office",
//                 "to-Foreign-Foreign-Guest",
//             ]);
//         });

//         it("should extract table names from additional Domestic networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 DomesticNetworks: ["Domestic-Main", "Domestic-IoT"],
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 DomesticNetworks: [
//                     { name: "Domestic-Main", subnet: "192.168.21.0/24" },
//                     { name: "Domestic-IoT", subnet: "192.168.22.0/24" },
//                 ],
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Extract routing table names from additional Domestic networks",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "to-Domestic-Domestic-Main",
//                 "to-Domestic-Domestic-IoT",
//             ]);
//         });

//         it("should extract table names from VPN Client networks", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US", "VPN-EU"],
//                     OpenVPN: ["VPN-Asia"],
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                         { name: "VPN-EU", subnet: "10.10.20.0/24" },
//                     ],
//                     OpenVPN: [
//                         { name: "VPN-Asia", subnet: "10.10.30.0/24" },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Extract routing table names from VPN Client networks",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "to-VPN-VPN-US",
//                 "to-VPN-VPN-EU",
//                 "to-VPN-VPN-Asia",
//             ]);
//         });

//         it("should return empty array when no networks are configured", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {},
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Return empty array for no networks",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([]);
//         });

//         it("should skip networks without subnets", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "" },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Skip networks with empty subnets",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual(["to-Split"]);
//         });

//         it("should extract table names from complex multi-network configuration", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                 },
//                 ForeignNetworks: ["Foreign-Office"],
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US"],
//                 },
//             };

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "extractTableNames",
//                 "Extract all routing table names from complex configuration",
//                 { networks, subnets },
//                 () => extractTableNames(networks, subnets),
//             );

//             expect(result).toEqual([
//                 "to-Split",
//                 "to-Domestic",
//                 "to-Foreign-Foreign-Office",
//                 "to-VPN-VPN-US",
//             ]);
//         });
//     });

//     describe("mapNetworkToRoutingTable Function", () => {
//         it("should map Domestic base network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Domestic: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map Domestic to routing table",
//                 { networkName: "Domestic", networks },
//                 () => mapNetworkToRoutingTable("Domestic", networks),
//             );

//             expect(result).toBe("to-Domestic");
//         });

//         it("should map Foreign base network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Foreign: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map Foreign to routing table",
//                 { networkName: "Foreign", networks },
//                 () => mapNetworkToRoutingTable("Foreign", networks),
//             );

//             expect(result).toBe("to-Foreign");
//         });

//         it("should map VPN base network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     VPN: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map VPN to routing table",
//                 { networkName: "VPN", networks },
//                 () => mapNetworkToRoutingTable("VPN", networks),
//             );

//             expect(result).toBe("to-VPN");
//         });

//         it("should map additional Foreign network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 ForeignNetworks: ["Foreign-Office"],
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map additional Foreign network to routing table",
//                 { networkName: "Foreign-Office", networks },
//                 () => mapNetworkToRoutingTable("Foreign-Office", networks),
//             );

//             expect(result).toBe("to-Foreign-Foreign-Office");
//         });

//         it("should map additional Domestic network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 DomesticNetworks: ["Domestic-IoT"],
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map additional Domestic network to routing table",
//                 { networkName: "Domestic-IoT", networks },
//                 () => mapNetworkToRoutingTable("Domestic-IoT", networks),
//             );

//             expect(result).toBe("to-Domestic-Domestic-IoT");
//         });

//         it("should map VPN Client Wireguard network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US"],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map VPN Client Wireguard to routing table",
//                 { networkName: "VPN-US", networks },
//                 () => mapNetworkToRoutingTable("VPN-US", networks),
//             );

//             expect(result).toBe("to-VPN-VPN-US");
//         });

//         it("should map VPN Client OpenVPN network to routing table", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     OpenVPN: ["VPN-Europe"],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map VPN Client OpenVPN to routing table",
//                 { networkName: "VPN-Europe", networks },
//                 () => mapNetworkToRoutingTable("VPN-Europe", networks),
//             );

//             expect(result).toBe("to-VPN-VPN-Europe");
//         });

//         it("should return null for non-existent network name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Domestic: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Return null for non-existent network",
//                 { networkName: "NonExistent", networks },
//                 () => mapNetworkToRoutingTable("NonExistent", networks),
//             );

//             expect(result).toBeNull();
//         });

//         it("should return null for Split network (no routing table)", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Return null for Split network",
//                 { networkName: "Split", networks },
//                 () => mapNetworkToRoutingTable("Split", networks),
//             );

//             expect(result).toBeNull();
//         });

//         it("should handle all VPN Client protocol types", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     L2TP: ["VPN-L2TP"],
//                     PPTP: ["VPN-PPTP"],
//                     SSTP: ["VPN-SSTP"],
//                     IKev2: ["VPN-IKEv2"],
//                 },
//             };

//             const l2tpResult = mapNetworkToRoutingTable("VPN-L2TP", networks);
//             const pptpResult = mapNetworkToRoutingTable("VPN-PPTP", networks);
//             const sstpResult = mapNetworkToRoutingTable("VPN-SSTP", networks);
//             const ikev2Result = mapNetworkToRoutingTable("VPN-IKEv2", networks);

//             testWithGenericOutput(
//                 "mapNetworkToRoutingTable",
//                 "Map all VPN protocol types to routing tables",
//                 { networks },
//                 () => ({ l2tpResult, pptpResult, sstpResult, ikev2Result }),
//             );

//             expect(l2tpResult).toBe("to-VPN-VPN-L2TP");
//             expect(pptpResult).toBe("to-VPN-VPN-PPTP");
//             expect(sstpResult).toBe("to-VPN-VPN-SSTP");
//             expect(ikev2Result).toBe("to-VPN-VPN-IKEv2");
//         });
//     });

//     describe("mapNetworkToBridgeName Function", () => {
//         it("should map Split base network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map Split to bridge name",
//                 { networkName: "Split", networks },
//                 () => mapNetworkToBridgeName("Split", networks),
//             );

//             expect(result).toBe("LANBridgeSplit");
//         });

//         it("should map Domestic base network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Domestic: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map Domestic to bridge name",
//                 { networkName: "Domestic", networks },
//                 () => mapNetworkToBridgeName("Domestic", networks),
//             );

//             expect(result).toBe("LANBridgeDomestic");
//         });

//         it("should map Foreign base network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Foreign: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map Foreign to bridge name",
//                 { networkName: "Foreign", networks },
//                 () => mapNetworkToBridgeName("Foreign", networks),
//             );

//             expect(result).toBe("LANBridgeForeign");
//         });

//         it("should map VPN base network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     VPN: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map VPN to bridge name",
//                 { networkName: "VPN", networks },
//                 () => mapNetworkToBridgeName("VPN", networks),
//             );

//             expect(result).toBe("LANBridgeVPN");
//         });

//         it("should map additional Foreign network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 ForeignNetworks: ["Foreign-Office"],
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map additional Foreign network to bridge name",
//                 { networkName: "Foreign-Office", networks },
//                 () => mapNetworkToBridgeName("Foreign-Office", networks),
//             );

//             expect(result).toBe("LANBridgeForeign-Foreign-Office");
//         });

//         it("should map additional Domestic network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 DomesticNetworks: ["Domestic-IoT"],
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map additional Domestic network to bridge name",
//                 { networkName: "Domestic-IoT", networks },
//                 () => mapNetworkToBridgeName("Domestic-IoT", networks),
//             );

//             expect(result).toBe("LANBridgeDomestic-Domestic-IoT");
//         });

//         it("should map VPN Client Wireguard network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: ["VPN-US"],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map VPN Client Wireguard to bridge name",
//                 { networkName: "VPN-US", networks },
//                 () => mapNetworkToBridgeName("VPN-US", networks),
//             );

//             expect(result).toBe("LANBridgeVPN-VPN-US");
//         });

//         it("should map VPN Client OpenVPN network to bridge name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     OpenVPN: ["VPN-Europe"],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map VPN Client OpenVPN to bridge name",
//                 { networkName: "VPN-Europe", networks },
//                 () => mapNetworkToBridgeName("VPN-Europe", networks),
//             );

//             expect(result).toBe("LANBridgeVPN-VPN-Europe");
//         });

//         it("should return null for non-existent network name", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Domestic: true,
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Return null for non-existent network",
//                 { networkName: "NonExistent", networks },
//                 () => mapNetworkToBridgeName("NonExistent", networks),
//             );

//             expect(result).toBeNull();
//         });

//         it("should handle all VPN Client protocol types", () => {
//             const networks: Networks = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     L2TP: ["VPN-L2TP"],
//                     PPTP: ["VPN-PPTP"],
//                     SSTP: ["VPN-SSTP"],
//                     IKev2: ["VPN-IKEv2"],
//                 },
//             };

//             const l2tpResult = mapNetworkToBridgeName("VPN-L2TP", networks);
//             const pptpResult = mapNetworkToBridgeName("VPN-PPTP", networks);
//             const sstpResult = mapNetworkToBridgeName("VPN-SSTP", networks);
//             const ikev2Result = mapNetworkToBridgeName("VPN-IKEv2", networks);

//             testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map all VPN protocol types to bridge names",
//                 { networks },
//                 () => ({ l2tpResult, pptpResult, sstpResult, ikev2Result }),
//             );

//             expect(l2tpResult).toBe("LANBridgeVPN-VPN-L2TP");
//             expect(pptpResult).toBe("LANBridgeVPN-VPN-PPTP");
//             expect(sstpResult).toBe("LANBridgeVPN-VPN-SSTP");
//             expect(ikev2Result).toBe("LANBridgeVPN-VPN-IKEv2");
//         });

//         it("should handle all base network types", () => {
//             const networks: Networks = {
//                 BaseNetworks: {
//                     Split: true,
//                     Domestic: true,
//                     Foreign: true,
//                     VPN: true,
//                 },
//             };

//             const splitResult = mapNetworkToBridgeName("Split", networks);
//             const domesticResult = mapNetworkToBridgeName("Domestic", networks);
//             const foreignResult = mapNetworkToBridgeName("Foreign", networks);
//             const vpnResult = mapNetworkToBridgeName("VPN", networks);

//             testWithGenericOutput(
//                 "mapNetworkToBridgeName",
//                 "Map all base network types to bridge names",
//                 { networks },
//                 () => ({ splitResult, domesticResult, foreignResult, vpnResult }),
//             );

//             expect(splitResult).toBe("LANBridgeSplit");
//             expect(domesticResult).toBe("LANBridgeDomestic");
//             expect(foreignResult).toBe("LANBridgeForeign");
//             expect(vpnResult).toBe("LANBridgeVPN");
//         });
//     });
// });
