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
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "PCC",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on Foreign WAN",
//                 { networkType: "Foreign", wanLinks },
//                 () => shouldSkipMangleRules("Foreign", wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when Foreign WAN uses NTH load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "NTH",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on Foreign WAN",
//                 { networkType: "Foreign", wanLinks },
//                 () => shouldSkipMangleRules("Foreign", wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return false when Foreign WAN uses ECMP load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "ECMP",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip mangle rules with ECMP on Foreign WAN",
//                 { networkType: "Foreign", wanLinks },
//                 () => shouldSkipMangleRules("Foreign", wanLinks),
//             );

//             expect(result).toBe(false);
//         });

//         it("should return false when Foreign network is checked but Domestic WAN uses NTH", () => {
//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "NTH",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip Foreign mangle rules when only Domestic uses NTH",
//                 { networkType: "Foreign", wanLinks },
//                 () => shouldSkipMangleRules("Foreign", wanLinks),
//             );

//             expect(result).toBe(false);
//         });

//         it("should return true when Domestic WAN uses PCC load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "PCC",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on Domestic WAN",
//                 { networkType: "Domestic", wanLinks },
//                 () => shouldSkipMangleRules("Domestic", wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when Domestic WAN uses NTH load balancing", () => {
//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     WANConfigs: [],
//                     MultiLinkConfig: {
//                         strategy: "LoadBalance",
//                         loadBalanceMethod: "NTH",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on Domestic WAN",
//                 { networkType: "Domestic", wanLinks },
//                 () => shouldSkipMangleRules("Domestic", wanLinks),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when VPN Client uses PCC load balancing", () => {
//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     strategy: "LoadBalance",
//                     loadBalanceMethod: "PCC",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with PCC on VPN Client",
//                 { networkType: "VPN", vpnClient },
//                 () => shouldSkipMangleRules("VPN", undefined, vpnClient),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return true when VPN Client uses NTH load balancing", () => {
//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     strategy: "LoadBalance",
//                     loadBalanceMethod: "NTH",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should skip mangle rules with NTH on VPN Client",
//                 { networkType: "VPN", vpnClient },
//                 () => shouldSkipMangleRules("VPN", undefined, vpnClient),
//             );

//             expect(result).toBe(true);
//         });

//         it("should return false when no load balancing is configured", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "shouldSkipMangleRules",
//                 "Should not skip mangle rules when no load balancing is configured",
//                 { networkType: "Foreign", wanLinks },
//                 () => shouldSkipMangleRules("Foreign", wanLinks),
//             );

//             expect(result).toBe(false);
//         });
//     });

//     // Other utility function tests remain commented out for now
//     // extractBridgeNames, extractTableNames, mapNetworkToRoutingTable, mapNetworkToBridgeName
// });
