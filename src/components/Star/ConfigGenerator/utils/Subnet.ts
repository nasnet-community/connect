
/**
 * CIDR-aware Subnet Utility Functions
 * Handles proper subnet calculations for various CIDR block sizes
 */

/**
 * Convert IP address string to 32-bit integer
 */
const ipToInt = (ip: string): number => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

/**
 * Convert 32-bit integer to IP address string
 */
const intToIp = (int: number): string => {
    return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255
    ].join('.');
};

/**
 * Get subnet mask as integer from CIDR prefix
 */
const getSubnetMaskInt = (prefixLength: number): number => {
    return (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
};

/**
 * Get network address from subnet (CIDR-aware)
 */
const getNetworkAddress = (subnet: string): string => {
    const [network, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    const networkInt = ipToInt(network);
    const maskInt = getSubnetMaskInt(prefixLength);
    return intToIp(networkInt & maskInt);
};

/**
 * Get broadcast address from subnet
 */
export const SubnetToBroadcast = (subnet: string): string => {
    const [network, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    const networkInt = ipToInt(network);
    const maskInt = getSubnetMaskInt(prefixLength);
    const broadcastInt = (networkInt & maskInt) | (~maskInt >>> 0);
    return intToIp(broadcastInt);
};

/**
 * Get first usable IP (typically gateway) from subnet
 */
export const SubnetToFirstUsableIP = (subnet: string): string => {
    const networkAddress = getNetworkAddress(subnet);
    const networkInt = ipToInt(networkAddress);
    return intToIp(networkInt + 1);
};

/**
 * Get last usable IP from subnet
 */
export const SubnetToLastUsableIP = (subnet: string): string => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    
    if (prefixLength >= 31) {
        // /31 networks have no broadcast address (RFC 3021) - return second IP
        const networkAddress = getNetworkAddress(subnet);
        const networkInt = ipToInt(networkAddress);
        return intToIp(networkInt + 1);
    }
    
    const broadcastAddress = SubnetToBroadcast(subnet);
    const broadcastInt = ipToInt(broadcastAddress);
    return intToIp(broadcastInt - 1);
};

/**
 * Get DHCP range for subnet (excluding network, gateway, and broadcast)
 * Uses all available IPs except network address, gateway, and broadcast
 */
export const SubnetToDHCPRange = (subnet: string): string => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    
    // For very small subnets
    if (prefixLength >= 30) {
        if (prefixLength === 30) {
            // /30: Network .0, Gateway .1, Host .2, Broadcast .3
            // Only one IP available for DHCP
            const networkAddress = getNetworkAddress(subnet);
            const networkInt = ipToInt(networkAddress);
            const dhcpIP = intToIp(networkInt + 2);
            return dhcpIP; // Single IP, not a range
        }
        
        if (prefixLength === 31) {
            // /31: Two IPs, no broadcast (point-to-point links)
            // Not suitable for DHCP
            return "";
        }
        
        // /32: Single host - no DHCP
        return "";
    }
    
    // For all other subnets, use all available IPs except network, gateway, and broadcast
    const networkAddress = getNetworkAddress(subnet);
    const networkInt = ipToInt(networkAddress);
    
    // DHCP starts from .2 (skip network .0 and gateway .1)
    const dhcpStart = intToIp(networkInt + 2);
    
    // DHCP ends at last usable IP (before broadcast)
    const dhcpEnd = SubnetToLastUsableIP(subnet);
    
    return `${dhcpStart}-${dhcpEnd}`;
};

/**
 * Get gateway IP (first usable IP) from subnet
 */
export const SubnetToGateway = (subnet: string): string => {
    return SubnetToFirstUsableIP(subnet);
};

/**
 * Get subnet mask in dotted decimal notation
 */
export const SubnetToMask = (subnet: string): string => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    const maskInt = getSubnetMaskInt(prefixLength);
    return intToIp(maskInt);
};

/**
 * Get total number of IPs in subnet
 */
export const SubnetToTotalIPs = (subnet: string): number => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    return Math.pow(2, 32 - prefixLength);
};

/**
 * Get number of usable host IPs in subnet (excluding network and broadcast)
 */
export const SubnetToUsableIPs = (subnet: string): number => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    
    if (prefixLength >= 31) {
        // /31 networks have no broadcast address (RFC 3021) - 2 usable IPs
        // /32 networks have 1 usable IP (host route)
        return prefixLength === 31 ? 2 : 1;
    }
    
    return Math.max(0, Math.pow(2, 32 - prefixLength) - 2);
};

/**
 * Check if an IP address belongs to a subnet
 */
export const IsIPInSubnet = (ip: string, subnet: string): boolean => {
    const [, prefix] = subnet.split("/");
    const prefixLength = parseInt(prefix, 10);
    const ipInt = ipToInt(ip);
    const networkInt = ipToInt(getNetworkAddress(subnet));
    const maskInt = getSubnetMaskInt(prefixLength);
    
    return ((ipInt & maskInt) >>> 0) === ((networkInt & maskInt) >>> 0);
};

/**
 * Validate if a subnet string is properly formatted
 */
export const ValidateSubnet = (subnet: string): boolean => {
    const parts = subnet.split("/");
    if (parts.length !== 2) return false;
    
    const [network, prefix] = parts;
    const prefixLength = parseInt(prefix, 10);
    
    // Check prefix length
    if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) {
        return false;
    }
    
    // Check IP format
    const ipParts = network.split(".");
    if (ipParts.length !== 4) return false;
    
    for (const part of ipParts) {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 0 || num > 255) {
            return false;
        }
    }
    
    return true;
};

/**
 * Get subnet information summary
 */
export const SSubnetInfo = (subnet: string) => {
    if (!ValidateSubnet(subnet)) {
        throw new Error(`Invalid subnet format: ${subnet}`);
    }
    
    return {
        subnet: subnet,
        network: getNetworkAddress(subnet),
        broadcast: SubnetToBroadcast(subnet),
        mask: SubnetToMask(subnet),
        gateway: SubnetToGateway(subnet),
        firstUsable: SubnetToFirstUsableIP(subnet),
        lastUsable: SubnetToLastUsableIP(subnet),
        dhcpRange: SubnetToDHCPRange(subnet),
        totalIPs: SubnetToTotalIPs(subnet),
        usableIPs: SubnetToUsableIPs(subnet),
    };
};

// Legacy function names maintained for backward compatibility with Networks.ts

/**
 * Get network address for a subnet (CIDR-aware)
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns Network address (e.g., "192.168.10.0")
 */
export const SubnetToNetwork = (Subnet: string): string => {
    if (!ValidateSubnet(Subnet)) {
        console.warn(`Invalid subnet format: ${Subnet}, falling back to simple calculation`);
        // Fallback to old logic for invalid format
        const [network, _mask] = Subnet.split("/");
        return network;
    }
    
    return getNetworkAddress(Subnet);
};

/**
 * Get DHCP IP range for a subnet (CIDR-aware)
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns DHCP range string (e.g., "192.168.10.2-192.168.10.254")
 */
export const SubnetToRange = (Subnet: string): string => {
    if (!ValidateSubnet(Subnet)) {
        console.warn(`Invalid subnet format: ${Subnet}, falling back to simple calculation`);
        // Fallback to old logic for invalid format
        const [network, _mask] = Subnet.split("/");
        const networkParts = network.split(".");
        const baseNetwork = networkParts.slice(0, 3).join(".");
        return `${baseNetwork}.2-${baseNetwork}.254`;
    }
    
    return SubnetToDHCPRange(Subnet);
};

/**
 * Get gateway IP address for a subnet (CIDR-aware)
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns Gateway IP address (e.g., "192.168.10.1")
 */
export const SubnetToFirstIP = (Subnet: string): string => {
    if (!ValidateSubnet(Subnet)) {
        console.warn(`Invalid subnet format: ${Subnet}, falling back to simple calculation`);
        // Fallback to old logic for invalid format
        const [network, _mask] = Subnet.split("/");
        const networkParts = network.split(".");
        return `${networkParts.slice(0, 3).join(".")}.1`;
    }

    return SubnetToGateway(Subnet);
};

/**
 * Tunnel Network Specific Functions
 * For tunnel networks, we reserve .1-.3 and use .4 as gateway, .5+ for DHCP
 */

/**
 * Get tunnel gateway IP (4th usable IP) with CIDR notation
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns Tunnel gateway IP with CIDR (e.g., "192.168.10.4/24")
 */
export const SubnetToTunnelGateway = (Subnet: string): string => {
    const [, prefix] = Subnet.split("/");
    const networkAddress = getNetworkAddress(Subnet);
    const networkInt = ipToInt(networkAddress);
    // Use .4 (network is .0, so offset by 4)
    const gatewayIP = intToIp(networkInt + 4);
    return `${gatewayIP}/${prefix}`;
};

/**
 * Get tunnel gateway IP (4th usable IP) without CIDR notation
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns Tunnel gateway IP without CIDR (e.g., "192.168.10.4")
 */
export const SubnetToTunnelGatewayIP = (Subnet: string): string => {
    const networkAddress = getNetworkAddress(Subnet);
    const networkInt = ipToInt(networkAddress);
    // Use .4 (network is .0, so offset by 4)
    return intToIp(networkInt + 4);
};

/**
 * Get DHCP range for tunnel networks (starting from 5th usable IP)
 * @param Subnet - Subnet in CIDR notation (e.g., "192.168.10.0/24")
 * @returns DHCP range string (e.g., "192.168.10.5-192.168.10.254")
 */
export const SubnetToTunnelDHCPRange = (Subnet: string): string => {
    const [, prefix] = Subnet.split("/");
    const prefixLength = parseInt(prefix, 10);

    // Handle very small subnets
    if (prefixLength >= 30) {
        if (prefixLength === 30) {
            // /30: Only 4 IPs total - not suitable for tunnel with reserved IPs
            return "";
        }
        // /31 and /32: Not suitable for DHCP
        return "";
    }

    const networkAddress = getNetworkAddress(Subnet);
    const networkInt = ipToInt(networkAddress);

    // DHCP starts from .5 (skip network .0, reserved .1-.3, and gateway .4)
    const dhcpStart = intToIp(networkInt + 5);

    // DHCP ends at last usable IP (before broadcast)
    const dhcpEnd = SubnetToLastUsableIP(Subnet);

    return `${dhcpStart}-${dhcpEnd}`;
};
