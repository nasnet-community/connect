// import { describe, it, expect } from "vitest";
// import { testWithOutput } from "../../../../test-utils/test-helpers";
// import { SubnetIPConfigurations } from "../../ConfigGenerator/LAN/LANCG";

// describe("🧪 Testing: SubnetIPConfigurations", () => {
//   describe("📝 Test Case: Basic subnet IP configuration", () => {
//     it("⚙️ Function: should generate IP addresses for base networks", () => {
//       const subnets = {
//         Foreign: "192.168.30.0/24",
//         Domestic: "192.168.20.0/24",
//         VPN: "192.168.40.0/24",
//         Split: "192.168.10.0/24",
//       };

//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Generate IP addresses for base networks",
//         { subnets },
//         () => SubnetIPConfigurations(subnets),
//       );

//       // Check Foreign network
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.30.1/24 interface=LANBridgeFRN network=192.168.30.0",
//       );

//       // Check Domestic network
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.20.1/24 interface=LANBridgeDOM network=192.168.20.0",
//       );

//       // Check VPN network
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.40.1/24 interface=LANBridgeVPN network=192.168.40.0",
//       );

//       // Check Split network
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.10.1/24 interface=LANBridgeSplit network=192.168.10.0",
//       );
//     });
//   });

//   describe("📝 Test Case: Empty or undefined subnets", () => {
//     it("⚙️ Function: should return empty config for undefined subnets", () => {
//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Handle undefined subnets",
//         { subnets: undefined },
//         () => SubnetIPConfigurations(undefined),
//       );

//       expect(result).toEqual({});
//     });

//     it("⚙️ Function: should return empty arrays for empty subnets object", () => {
//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Handle empty subnets object",
//         { subnets: {} },
//         () => SubnetIPConfigurations({}),
//       );

//       expect(result["/ip address"]).toEqual([]);
//     });
//   });

//   describe("📝 Test Case: Custom subnet configurations", () => {
//     it("⚙️ Function: should handle custom subnet masks", () => {
//       const subnets = {
//         Foreign: "10.0.0.0/16",
//         Domestic: "172.16.0.0/12",
//       };

//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Generate IP addresses with custom subnet masks",
//         { subnets },
//         () => SubnetIPConfigurations(subnets),
//       );

//       // Check Foreign network with /16
//       expect(result["/ip address"]).toContain(
//         "add address=10.0.0.1/16 interface=LANBridgeFRN network=10.0.0.0",
//       );

//       // Check Domestic network with /12
//       expect(result["/ip address"]).toContain(
//         "add address=172.16.0.1/12 interface=LANBridgeDOM network=172.16.0.0",
//       );
//     });
//   });

//   describe("📝 Test Case: Invalid subnet handling", () => {
//     it("⚙️ Function: should skip invalid subnet entries", () => {
//       const subnets = {
//         Foreign: "invalid-subnet",
//         Domestic: "192.168.20.0/24",
//       };

//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Skip invalid subnet entries",
//         { subnets },
//         () => SubnetIPConfigurations(subnets),
//       );

//       // Should only have the valid Domestic network
//       expect(result["/ip address"].length).toBe(1);
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.20.1/24 interface=LANBridgeDOM network=192.168.20.0",
//       );
//     });
//   });

//   describe("📝 Test Case: Non-base network types", () => {
//     it("⚙️ Function: should ignore non-base network types", () => {
//       const subnets = {
//         Foreign: "192.168.30.0/24",
//         Wireguard: "192.168.50.0/24", // VPN server subnet, should be ignored
//         Tunnel1: "192.168.60.0/24", // Tunnel subnet, should be ignored
//       };

//       const result = testWithOutput(
//         "SubnetIPConfigurations",
//         "Ignore non-base network types",
//         { subnets },
//         () => SubnetIPConfigurations(subnets),
//       );

//       // Should only have Foreign network
//       expect(result["/ip address"].length).toBe(1);
//       expect(result["/ip address"]).toContain(
//         "add address=192.168.30.1/24 interface=LANBridgeFRN network=192.168.30.0",
//       );
//     });
//   });
// });
