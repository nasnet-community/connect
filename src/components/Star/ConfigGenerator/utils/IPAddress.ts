interface SubnetInfoInterface {
    // Input values
    ipAddress: string;
    prefixLength: number;
    cidrNotation: string;

    // Network information
    networkAddress: string;
    broadcastAddress: string;
    subnetMask: string;
    wildcardMask: string;

    // Host information
    totalHosts: number;
    usableHosts: number;
    firstHostAddress: string;
    lastHostAddress: string;

    // Additional data
    networkClass: "A" | "B" | "C" | "D" | "E" | "Invalid";
    isPrivate: boolean;
    isLoopback: boolean;
    isMulticast: boolean;

    // Binary representations
    binaryIP: string;
    binaryMask: string;
    binaryNetwork: string;
    binaryBroadcast: string;

    // Subnetting information
    nextNetwork: string;
    previousNetwork: string;
    supernet: string | null;
}

/**
 * Advanced subnet calculator that provides comprehensive network information
 * @param ip - IPv4 address (e.g., "192.168.1.10")
 * @param prefix - Prefix length as string or number (e.g., "24" or 24)
 * @returns Complete subnet information or null if invalid input
 */
function calculateSubnetInfo(
    ip: string,
    prefix: string | number,
): SubnetInfoInterface | null {
    if (!ip || prefix === undefined || prefix === null) return null;

    try {
        // Parse and validate IP address
        const ipParts = ip.split(".").map(Number);
        if (
            ipParts.length !== 4 ||
            ipParts.some((part) => isNaN(part) || part < 0 || part > 255)
        ) {
            return null;
        }

        // Parse and validate prefix length
        const prefixLen =
            typeof prefix === "string" ? parseInt(prefix, 10) : prefix;
        if (isNaN(prefixLen) || prefixLen < 0 || prefixLen > 32) {
            return null;
        }

        // Convert IP to 32-bit integer
        let ipInt = 0;
        for (let i = 0; i < 4; i++) {
            ipInt = (ipInt << 8) | ipParts[i];
        }

        // Calculate subnet mask
        const maskInt = prefixLen === 0 ? 0 : (-1 << (32 - prefixLen)) >>> 0;
        const wildcardInt = ~maskInt >>> 0;

        // Calculate network and broadcast addresses
        const networkInt = (ipInt & maskInt) >>> 0;
        const broadcastInt = (networkInt | wildcardInt) >>> 0;

        // Convert integers back to dotted decimal
        const intToIP = (num: number): string =>
            `${(num >>> 24) & 0xff}.${(num >>> 16) & 0xff}.${(num >>> 8) & 0xff}.${num & 0xff}`;

        const networkAddress = intToIP(networkInt);
        const broadcastAddress = intToIP(broadcastInt);
        const subnetMask = intToIP(maskInt);
        const wildcardMask = intToIP(wildcardInt);

        // Calculate host information
        const totalHosts = Math.pow(2, 32 - prefixLen);
        const usableHosts = prefixLen === 31 ? 2 : Math.max(0, totalHosts - 2); // RFC 3021 for /31
        const firstHostAddress =
            prefixLen === 31 ? networkAddress : intToIP(networkInt + 1);
        const lastHostAddress =
            prefixLen === 31 ? broadcastAddress : intToIP(broadcastInt - 1);

        // Determine network class
        const getNetworkClass = (
            firstOctet: number,
        ): "A" | "B" | "C" | "D" | "E" | "Invalid" => {
            if (firstOctet >= 1 && firstOctet <= 126) return "A";
            if (firstOctet >= 128 && firstOctet <= 191) return "B";
            if (firstOctet >= 192 && firstOctet <= 223) return "C";
            if (firstOctet >= 224 && firstOctet <= 239) return "D";
            if (firstOctet >= 240 && firstOctet <= 255) return "E";
            return "Invalid";
        };

        // Check if IP is private, loopback, or multicast
        const isPrivate =
            ipParts[0] === 10 ||
            (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
            (ipParts[0] === 192 && ipParts[1] === 168) ||
            (ipParts[0] === 169 && ipParts[1] === 254); // Link-local

        const isLoopback = ipParts[0] === 127;
        const isMulticast = ipParts[0] >= 224 && ipParts[0] <= 239;

        // Binary representations
        const toBinary = (num: number): string =>
            num
                .toString(2)
                .padStart(32, "0")
                .replace(/(.{8})/g, "$1.")
                .slice(0, -1);

        const binaryIP = toBinary(ipInt);
        const binaryMask = toBinary(maskInt);
        const binaryNetwork = toBinary(networkInt);
        const binaryBroadcast = toBinary(broadcastInt);

        // Calculate next and previous networks
        const networkSize = Math.pow(2, 32 - prefixLen);
        const nextNetworkInt = (networkInt + networkSize) >>> 0;
        const prevNetworkInt = (networkInt - networkSize) >>> 0;

        const nextNetwork = intToIP(nextNetworkInt);
        const previousNetwork =
            networkInt === 0 ? "0.0.0.0" : intToIP(prevNetworkInt);

        // Calculate supernet (if possible)
        const supernet =
            prefixLen > 0
                ? `${intToIP(networkInt & ((-1 << (33 - prefixLen)) >>> 0))}/${prefixLen - 1}`
                : null;

        return {
            // Input values
            ipAddress: ip,
            prefixLength: prefixLen,
            cidrNotation: `${networkAddress}/${prefixLen}`,

            // Network information
            networkAddress,
            broadcastAddress,
            subnetMask,
            wildcardMask,

            // Host information
            totalHosts,
            usableHosts,
            firstHostAddress,
            lastHostAddress,

            // Additional data
            networkClass: getNetworkClass(ipParts[0]),
            isPrivate,
            isLoopback,
            isMulticast,

            // Binary representations
            binaryIP,
            binaryMask,
            binaryNetwork,
            binaryBroadcast,

            // Subnetting information
            nextNetwork,
            previousNetwork,
            supernet,
        };
    } catch (error) {
        console.error("Error calculating subnet info:", error);
        return null;
    }
}

/**
 * Calculate all possible subnets for a given network and new prefix length
 * @param networkIP - Base network IP (e.g., "192.168.1.0")
 * @param currentPrefix - Current prefix length
 * @param newPrefix - New prefix length for subnetting
 * @returns Array of subnet information
 */
function calculateSubnets(
    networkIP: string,
    currentPrefix: number,
    newPrefix: number,
): SubnetInfoInterface[] {
    if (newPrefix <= currentPrefix) {
        throw new Error(
            "New prefix must be larger than current prefix for subnetting",
        );
    }

    const baseNetwork = calculateSubnetInfo(networkIP, currentPrefix);
    if (!baseNetwork) {
        throw new Error("Invalid base network");
    }

    const subnets: SubnetInfoInterface[] = [];
    const subnetCount = Math.pow(2, newPrefix - currentPrefix);
    const subnetSize = Math.pow(2, 32 - newPrefix);

    // Parse base network to integer
    const baseParts = baseNetwork.networkAddress.split(".").map(Number);
    let baseInt = 0;
    for (let i = 0; i < 4; i++) {
        baseInt = (baseInt << 8) | baseParts[i];
    }

    for (let i = 0; i < subnetCount; i++) {
        const subnetInt = (baseInt + i * subnetSize) >>> 0;
        const subnetIP = `${(subnetInt >>> 24) & 0xff}.${(subnetInt >>> 16) & 0xff}.${(subnetInt >>> 8) & 0xff}.${subnetInt & 0xff}`;

        const subnetInfo = calculateSubnetInfo(subnetIP, newPrefix);
        if (subnetInfo) {
            subnets.push(subnetInfo);
        }
    }

    return subnets;
}

/**
 * Validate if an IP address is within a given subnet
 * @param ip - IP address to check
 * @param subnet - Subnet in CIDR notation (e.g., "192.168.1.0/24")
 * @returns Boolean indicating if IP is in subnet
 */
function isIPInSubnet(ip: string, subnet: string): boolean {
    const [subnetIP, prefixStr] = subnet.split("/");
    if (!subnetIP || !prefixStr) return false;

    const subnetInfo = calculateSubnetInfo(subnetIP, prefixStr);
    if (!subnetInfo) return false;

    const ipInfo = calculateSubnetInfo(ip, prefixStr);
    if (!ipInfo) return false;

    return ipInfo.networkAddress === subnetInfo.networkAddress;
}

/**
 * Generate a range of IP addresses within a subnet
 * @param networkIP - Network IP address
 * @param prefix - Prefix length
 * @param includeNetworkBroadcast - Whether to include network and broadcast addresses
 * @returns Array of IP addresses
 */
function generateIPRange(
    networkIP: string,
    prefix: number,
    includeNetworkBroadcast: boolean = false,
): string[] {
    const subnetInfo = calculateSubnetInfo(networkIP, prefix);
    if (!subnetInfo) return [];

    const ips: string[] = [];
    const networkParts = subnetInfo.networkAddress.split(".").map(Number);
    const broadcastParts = subnetInfo.broadcastAddress.split(".").map(Number);

    // Convert to integers for easier manipulation
    let networkInt = 0;
    let broadcastInt = 0;

    for (let i = 0; i < 4; i++) {
        networkInt = (networkInt << 8) | networkParts[i];
        broadcastInt = (broadcastInt << 8) | broadcastParts[i];
    }

    const startIP = includeNetworkBroadcast ? networkInt : networkInt + 1;
    const endIP = includeNetworkBroadcast ? broadcastInt : broadcastInt - 1;

    for (let ip = startIP; ip <= endIP; ip++) {
        const ipStr = `${(ip >>> 24) & 0xff}.${(ip >>> 16) & 0xff}.${(ip >>> 8) & 0xff}.${ip & 0xff}`;
        ips.push(ipStr);
    }

    return ips;
}

/**
 * Find the smallest subnet that can contain the specified number of hosts
 * @param hostCount - Number of hosts needed
 * @returns Prefix length for the smallest suitable subnet
 */
function findSmallestSubnet(hostCount: number): number {
    if (hostCount <= 0) return 32;

    // Account for network and broadcast addresses
    const totalAddresses = hostCount + 2;

    // Find the smallest power of 2 that can accommodate the addresses
    const bitsNeeded = Math.ceil(Math.log2(totalAddresses));

    return Math.max(0, 32 - bitsNeeded);
}

/**
 * Convert subnet mask to CIDR prefix length
 * @param subnetMask - Subnet mask in dotted decimal notation
 * @returns Prefix length or null if invalid
 */
function subnetMaskToCIDR(subnetMask: string): number | null {
    const parts = subnetMask.split(".").map(Number);
    if (
        parts.length !== 4 ||
        parts.some((part) => isNaN(part) || part < 0 || part > 255)
    ) {
        return null;
    }

    // Convert to 32-bit integer
    let maskInt = 0;
    for (let i = 0; i < 4; i++) {
        maskInt = (maskInt << 8) | parts[i];
    }

    // Count consecutive 1s from the left
    let prefixLength = 0;
    for (let i = 31; i >= 0; i--) {
        if ((maskInt >>> i) & 1) {
            prefixLength++;
        } else {
            break;
        }
    }

    // Verify it's a valid subnet mask (no gaps in the 1s)
    const expectedMask =
        prefixLength === 0 ? 0 : (-1 << (32 - prefixLength)) >>> 0;
    if (maskInt !== expectedMask) {
        return null; // Invalid subnet mask
    }

    return prefixLength;
}

/**
 * Calculate VLSM (Variable Length Subnet Masking) subnets
 * @param baseNetwork - Base network in CIDR notation
 * @param hostRequirements - Array of required host counts for each subnet
 * @returns Array of subnet information optimized for the given requirements
 */
function calculateVLSM(
    baseNetwork: string,
    hostRequirements: number[],
): SubnetInfoInterface[] {
    const [networkIP, prefixStr] = baseNetwork.split("/");
    const basePrefix = parseInt(prefixStr, 10);

    const baseSubnet = calculateSubnetInfo(networkIP, basePrefix);
    if (!baseSubnet) {
        throw new Error("Invalid base network");
    }

    // Sort requirements in descending order for optimal allocation
    const sortedRequirements = [...hostRequirements].sort((a, b) => b - a);

    const subnets: SubnetInfoInterface[] = [];
    const baseParts = baseSubnet.networkAddress.split(".").map(Number);
    let baseInt = 0;
    for (let i = 0; i < 4; i++) {
        baseInt = (baseInt << 8) | baseParts[i];
    }

    let currentNetworkInt = baseInt;

    for (const hostCount of sortedRequirements) {
        const requiredPrefix = findSmallestSubnet(hostCount);

        if (requiredPrefix < basePrefix) {
            throw new Error(
                `Required subnet size (/${requiredPrefix}) is larger than base network (/${basePrefix})`,
            );
        }

        const subnetIP = `${(currentNetworkInt >>> 24) & 0xff}.${(currentNetworkInt >>> 16) & 0xff}.${(currentNetworkInt >>> 8) & 0xff}.${currentNetworkInt & 0xff}`;
        const subnetInfo = calculateSubnetInfo(subnetIP, requiredPrefix);

        if (!subnetInfo) {
            throw new Error(`Failed to create subnet for ${hostCount} hosts`);
        }

        subnets.push(subnetInfo);

        // Move to the next available network
        const subnetSize = Math.pow(2, 32 - requiredPrefix);
        currentNetworkInt += subnetSize;
    }

    return subnets;
}

function calculateNetworkAddress(ip: string, prefix: string): string {
    const prefixNum = parseInt(prefix);
    const ipParts = ip.split(".").map(Number);
    const mask = (0xffffffff << (32 - prefixNum)) >>> 0;

    const ipNum =
        (ipParts[0] << 24) |
        (ipParts[1] << 16) |
        (ipParts[2] << 8) |
        ipParts[3];
    const networkNum = (ipNum & mask) >>> 0;

    return `${(networkNum >>> 24) & 0xff}.${(networkNum >>> 16) & 0xff}.${(networkNum >>> 8) & 0xff}.${networkNum & 0xff}`;
}

export {
    calculateNetworkAddress,
    calculateSubnetInfo,
    calculateSubnets,
    isIPInSubnet,
    generateIPRange,
    findSmallestSubnet,
    subnetMaskToCIDR,
    calculateVLSM,
    type SubnetInfoInterface,
};
