// import { describe, it, expect } from "vitest";
// import {
//     calculateNetworkAddress,
//     calculateSubnetInfo,
//     calculateSubnets,
//     isIPInSubnet,
//     generateIPRange,
//     findSmallestSubnet,
//     subnetMaskToCIDR,
//     calculateVLSM,
//     type SubnetInfo,
// } from "./IPAddress";

// // Helper function to display test results with formatted output
// const testWithOutput = (
//     functionName: string,
//     testCase: string,
//     inputs: Record<string, any>,
//     testFn: () => any,
// ) => {
//     console.log("\n" + "=".repeat(80));
//     console.log(`🧪 Testing: ${functionName}`);
//     console.log(`📝 Test Case: ${testCase}`);
//     console.log("📥 Input Parameters:");
//     Object.entries(inputs).forEach(([key, value]) => {
//         console.log(`   ${key}: ${JSON.stringify(value)}`);
//     });

//     const result = testFn();

//     console.log("\n📤 Function Output:");
//     console.log(JSON.stringify(result, null, 2));
//     console.log("─".repeat(40));

//     return result;
// };

// describe("IPAddress Utilities", () => {
//     describe("calculateNetworkAddress", () => {
//         it("should calculate network address for /24 subnet", () => {
//             const inputs = { ip: "192.168.1.100", prefix: "24" };
//             const result = testWithOutput(
//                 "calculateNetworkAddress",
//                 "/24 subnet calculation",
//                 inputs,
//                 () => calculateNetworkAddress("192.168.1.100", "24"),
//             );
//             expect(result).toBe("192.168.1.0");
//         });

//         it("should calculate network address for /16 subnet", () => {
//             const inputs = { ip: "172.16.50.100", prefix: "16" };
//             const result = testWithOutput(
//                 "calculateNetworkAddress",
//                 "/16 subnet calculation",
//                 inputs,
//                 () => calculateNetworkAddress("172.16.50.100", "16"),
//             );
//             expect(result).toBe("172.16.0.0");
//         });

//         it("should calculate network address for /8 subnet", () => {
//             const inputs = { ip: "10.20.30.40", prefix: "8" };
//             const result = testWithOutput(
//                 "calculateNetworkAddress",
//                 "/8 subnet calculation",
//                 inputs,
//                 () => calculateNetworkAddress("10.20.30.40", "8"),
//             );
//             expect(result).toBe("10.0.0.0");
//         });

//         it("should handle /30 subnet", () => {
//             const result = calculateNetworkAddress("192.168.1.5", "30");
//             expect(result).toBe("192.168.1.4");
//         });

//         it("should handle /32 subnet", () => {
//             const result = calculateNetworkAddress("192.168.1.1", "32");
//             expect(result).toBe("192.168.1.1");
//         });
//     });

//     describe("calculateSubnetInfo", () => {
//         it("should calculate complete subnet info for /24 network", () => {
//             const inputs = { ip: "192.168.1.100", prefix: 24 };
//             const result: SubnetInfo | null = testWithOutput(
//                 "calculateSubnetInfo",
//                 "Complete /24 subnet information",
//                 inputs,
//                 () => calculateSubnetInfo("192.168.1.100", 24),
//             );

//             expect(result).toBeTruthy();
//             expect(result!.networkAddress).toBe("192.168.1.0");
//             expect(result!.broadcastAddress).toBe("192.168.1.255");
//             expect(result!.subnetMask).toBe("255.255.255.0");
//             expect(result!.wildcardMask).toBe("0.0.0.255");
//             expect(result!.totalHosts).toBe(256);
//             expect(result!.usableHosts).toBe(254);
//             expect(result!.firstHostAddress).toBe("192.168.1.1");
//             expect(result!.lastHostAddress).toBe("192.168.1.254");
//             expect(result!.prefixLength).toBe(24);
//             expect(result!.cidrNotation).toBe("192.168.1.0/24");
//         });

//         it("should calculate subnet info for /30 network", () => {
//             const result = calculateSubnetInfo("192.168.1.5", 30);

//             expect(result).toBeTruthy();
//             expect(result!.networkAddress).toBe("192.168.1.4");
//             expect(result!.broadcastAddress).toBe("192.168.1.7");
//             expect(result!.totalHosts).toBe(4);
//             expect(result!.usableHosts).toBe(2);
//             expect(result!.firstHostAddress).toBe("192.168.1.5");
//             expect(result!.lastHostAddress).toBe("192.168.1.6");
//         });

//         it("should handle /31 network (RFC 3021)", () => {
//             const result = calculateSubnetInfo("192.168.1.0", 31);

//             expect(result).toBeTruthy();
//             expect(result!.usableHosts).toBe(2);
//             expect(result!.firstHostAddress).toBe("192.168.1.0");
//             expect(result!.lastHostAddress).toBe("192.168.1.1");
//         });

//         it("should determine network class correctly", () => {
//             const classA = calculateSubnetInfo("10.0.0.1", 8);
//             const classB = calculateSubnetInfo("172.16.0.1", 16);
//             const classC = calculateSubnetInfo("192.168.1.1", 24);

//             expect(classA!.networkClass).toBe("A");
//             expect(classB!.networkClass).toBe("B");
//             expect(classC!.networkClass).toBe("C");
//         });

//         it("should identify private IP addresses", () => {
//             const private10 = calculateSubnetInfo("10.0.0.1", 24);
//             const private172 = calculateSubnetInfo("172.16.0.1", 24);
//             const private192 = calculateSubnetInfo("192.168.1.1", 24);
//             const publicIP = calculateSubnetInfo("8.8.8.8", 24);

//             expect(private10!.isPrivate).toBe(true);
//             expect(private172!.isPrivate).toBe(true);
//             expect(private192!.isPrivate).toBe(true);
//             expect(publicIP!.isPrivate).toBe(false);
//         });

//         it("should identify loopback addresses", () => {
//             const loopback = calculateSubnetInfo("127.0.0.1", 8);
//             const regular = calculateSubnetInfo("192.168.1.1", 24);

//             expect(loopback!.isLoopback).toBe(true);
//             expect(regular!.isLoopback).toBe(false);
//         });

//         it("should handle invalid input", () => {
//             expect(calculateSubnetInfo("", 24)).toBeNull();
//             expect(calculateSubnetInfo("192.168.1.1", 33)).toBeNull();
//             expect(calculateSubnetInfo("192.168.1.256", 24)).toBeNull();
//             expect(calculateSubnetInfo("192.168.1.1", -1)).toBeNull();
//         });

//         it("should handle string prefix input", () => {
//             const result = calculateSubnetInfo("192.168.1.1", "24");
//             expect(result).toBeTruthy();
//             expect(result!.prefixLength).toBe(24);
//         });
//     });

//     describe("calculateSubnets", () => {
//         it("should calculate subnets for /24 to /26", () => {
//             const subnets = calculateSubnets("192.168.1.0", 24, 26);

//             expect(subnets).toHaveLength(4);
//             expect(subnets[0].networkAddress).toBe("192.168.1.0");
//             expect(subnets[1].networkAddress).toBe("192.168.1.64");
//             expect(subnets[2].networkAddress).toBe("192.168.1.128");
//             expect(subnets[3].networkAddress).toBe("192.168.1.192");

//             subnets.forEach((subnet) => {
//                 expect(subnet.prefixLength).toBe(26);
//                 expect(subnet.usableHosts).toBe(62);
//             });
//         });

//         it("should throw error for invalid subnetting", () => {
//             expect(() => calculateSubnets("192.168.1.0", 26, 24)).toThrow(
//                 "New prefix must be larger than current prefix",
//             );
//         });
//     });

//     describe("isIPInSubnet", () => {
//         it("should correctly identify IPs in subnet", () => {
//             expect(isIPInSubnet("192.168.1.100", "192.168.1.0/24")).toBe(true);
//             expect(isIPInSubnet("192.168.1.1", "192.168.1.0/24")).toBe(true);
//             expect(isIPInSubnet("192.168.1.254", "192.168.1.0/24")).toBe(true);
//         });

//         it("should correctly identify IPs not in subnet", () => {
//             expect(isIPInSubnet("192.168.2.100", "192.168.1.0/24")).toBe(false);
//             expect(isIPInSubnet("10.0.0.1", "192.168.1.0/24")).toBe(false);
//         });

//         it("should handle edge cases", () => {
//             expect(isIPInSubnet("192.168.1.0", "192.168.1.0/24")).toBe(true); // Network address
//             expect(isIPInSubnet("192.168.1.255", "192.168.1.0/24")).toBe(true); // Broadcast address
//         });

//         it("should handle invalid input", () => {
//             expect(isIPInSubnet("192.168.1.1", "invalid")).toBe(false);
//             expect(isIPInSubnet("invalid", "192.168.1.0/24")).toBe(false);
//         });
//     });

//     describe("generateIPRange", () => {
//         it("should generate usable IP range by default", () => {
//             const ips = generateIPRange("192.168.1.0", 30);

//             expect(ips).toHaveLength(2);
//             expect(ips[0]).toBe("192.168.1.1");
//             expect(ips[1]).toBe("192.168.1.2");
//         });

//         it("should include network and broadcast when requested", () => {
//             const ips = generateIPRange("192.168.1.0", 30, true);

//             expect(ips).toHaveLength(4);
//             expect(ips[0]).toBe("192.168.1.0");
//             expect(ips[3]).toBe("192.168.1.3");
//         });

//         it("should handle /31 networks", () => {
//             const ips = generateIPRange("192.168.1.0", 31, false);
//             expect(ips).toHaveLength(0); // No usable hosts in /31 with standard calculation

//             const ipsIncludeAll = generateIPRange("192.168.1.0", 31, true);
//             expect(ipsIncludeAll).toHaveLength(2);
//         });

//         it("should handle /32 networks", () => {
//             const ips = generateIPRange("192.168.1.1", 32, true);
//             expect(ips).toHaveLength(1);
//             expect(ips[0]).toBe("192.168.1.1");
//         });

//         it("should return empty array for invalid input", () => {
//             const ips = generateIPRange("invalid", 24);
//             expect(ips).toHaveLength(0);
//         });
//     });

//     describe("findSmallestSubnet", () => {
//         it("should find correct prefix for various host counts", () => {
//             expect(findSmallestSubnet(2)).toBe(30); // /30 has 2 usable hosts
//             expect(findSmallestSubnet(6)).toBe(29); // /29 has 6 usable hosts
//             expect(findSmallestSubnet(14)).toBe(28); // /28 has 14 usable hosts
//             expect(findSmallestSubnet(30)).toBe(27); // /27 has 30 usable hosts
//             expect(findSmallestSubnet(62)).toBe(26); // /26 has 62 usable hosts
//             expect(findSmallestSubnet(254)).toBe(24); // /24 has 254 usable hosts
//         });

//         it("should handle edge cases", () => {
//             expect(findSmallestSubnet(0)).toBe(32);
//             expect(findSmallestSubnet(1)).toBe(30);
//         });

//         it("should handle large host counts", () => {
//             expect(findSmallestSubnet(1000)).toBe(22); // Needs at least /22
//             expect(findSmallestSubnet(65534)).toBe(16); // Needs /16
//         });
//     });

//     describe("subnetMaskToCIDR", () => {
//         it("should convert standard subnet masks", () => {
//             expect(subnetMaskToCIDR("255.255.255.0")).toBe(24);
//             expect(subnetMaskToCIDR("255.255.0.0")).toBe(16);
//             expect(subnetMaskToCIDR("255.0.0.0")).toBe(8);
//             expect(subnetMaskToCIDR("255.255.255.252")).toBe(30);
//             expect(subnetMaskToCIDR("255.255.255.128")).toBe(25);
//         });

//         it("should handle edge cases", () => {
//             expect(subnetMaskToCIDR("0.0.0.0")).toBe(0);
//             expect(subnetMaskToCIDR("255.255.255.255")).toBe(32);
//         });

//         it("should return null for invalid masks", () => {
//             expect(subnetMaskToCIDR("255.255.255.1")).toBeNull(); // Invalid mask
//             expect(subnetMaskToCIDR("255.255.0.255")).toBeNull(); // Gap in mask
//             expect(subnetMaskToCIDR("invalid")).toBeNull();
//             expect(subnetMaskToCIDR("256.255.255.0")).toBeNull();
//         });
//     });

//     describe("calculateVLSM", () => {
//         it("should calculate VLSM subnets optimally", () => {
//             const hostRequirements = [100, 50, 25, 10];
//             const subnets = calculateVLSM("192.168.1.0/24", hostRequirements);

//             expect(subnets).toHaveLength(4);

//             // Should be sorted by size (largest first)
//             expect(subnets[0].usableHosts).toBeGreaterThanOrEqual(100);
//             expect(subnets[1].usableHosts).toBeGreaterThanOrEqual(50);
//             expect(subnets[2].usableHosts).toBeGreaterThanOrEqual(25);
//             expect(subnets[3].usableHosts).toBeGreaterThanOrEqual(10);

//             // Should be contiguous and non-overlapping
//             expect(subnets[0].networkAddress).toBe("192.168.1.0");
//         });

//         it("should handle small host requirements", () => {
//             const hostRequirements = [2, 2, 2];
//             const subnets = calculateVLSM("192.168.1.0/24", hostRequirements);

//             expect(subnets).toHaveLength(3);
//             subnets.forEach((subnet) => {
//                 expect(subnet.usableHosts).toBeGreaterThanOrEqual(2);
//             });
//         });

//         it("should throw error for oversized requirements", () => {
//             const hostRequirements = [300]; // Too big for /24
//             expect(() =>
//                 calculateVLSM("192.168.1.0/24", hostRequirements),
//             ).toThrow();
//         });

//         it("should handle empty requirements", () => {
//             const subnets = calculateVLSM("192.168.1.0/24", []);
//             expect(subnets).toHaveLength(0);
//         });

//         it("should throw error for invalid base network", () => {
//             expect(() => calculateVLSM("invalid/24", [10])).toThrow(
//                 "Invalid base network",
//             );
//         });
//     });

//     describe("Binary representations", () => {
//         it("should include binary representations in subnet info", () => {
//             const result = calculateSubnetInfo("192.168.1.1", 24);

//             expect(result!.binaryIP).toMatch(
//                 /^[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}$/,
//             );
//             expect(result!.binaryMask).toMatch(
//                 /^[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}$/,
//             );
//             expect(result!.binaryNetwork).toMatch(
//                 /^[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}$/,
//             );
//             expect(result!.binaryBroadcast).toMatch(
//                 /^[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}$/,
//             );

//             // Verify binary IP is correct for 192.168.1.1
//             expect(result!.binaryIP).toBe(
//                 "11000000.10101000.00000001.00000001",
//             );
//         });
//     });

//     describe("Next and Previous networks", () => {
//         it("should calculate next and previous networks", () => {
//             const result = calculateSubnetInfo("192.168.1.0", 24);

//             expect(result!.nextNetwork).toBe("192.168.2.0");
//             expect(result!.previousNetwork).toBe("192.168.0.0");
//         });

//         it("should handle edge cases for network boundaries", () => {
//             const result = calculateSubnetInfo("0.0.0.0", 24);
//             expect(result!.previousNetwork).toBe("0.0.0.0");
//         });
//     });

//     describe("Supernet calculations", () => {
//         it("should calculate supernet correctly", () => {
//             const result = calculateSubnetInfo("192.168.1.0", 24);
//             expect(result!.supernet).toBe("192.168.0.0/23");

//             const result16 = calculateSubnetInfo("172.16.0.0", 16);
//             expect(result16!.supernet).toBe("172.0.0.0/15");
//         });

//         it("should handle /0 supernet edge case", () => {
//             const result = calculateSubnetInfo("0.0.0.0", 0);
//             expect(result!.supernet).toBeNull();
//         });
//     });
// });
