import type { Networks, Subnets, WANLinks, VPNClient } from "~/components/Star/StarContext";
import  { type RouterConfig, extractBridgeNames, DomesticCheckIPs, ForeignCheckIPs, mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";

export const BaseDNSSettins = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [
            "set allow-remote-requests=yes max-concurrent-queries=200 cache-size=51200KiB cache-max-ttl=7d",
        ],
    };

    return config;
};

export const DNSForwarders = (  networks?: Networks, wanLinks?: WANLinks, vpnClient?: VPNClient ): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns forwarders": [],
    };

    if (!networks || !networks.BaseNetworks) {
        return config;
    }

    // Create forwarders based on CheckIPs used in routing
    const forwarders: string[] = [];

    // Calculate counts for each interface type to match MainTableRoute CheckIP assignment
    const domesticWANCount = wanLinks?.Domestic?.WANConfigs.length || 0;
    const foreignWANCount = wanLinks?.Foreign?.WANConfigs.length || 0;
    
    // Count VPN clients across all VPN types
    let vpnClientCount = 0;
    if (vpnClient) {
        vpnClientCount += vpnClient.Wireguard?.length || 0;
        vpnClientCount += vpnClient.OpenVPN?.length || 0;
        vpnClientCount += vpnClient.PPTP?.length || 0;
        vpnClientCount += vpnClient.L2TP?.length || 0;
        vpnClientCount += vpnClient.SSTP?.length || 0;
        vpnClientCount += vpnClient.IKeV2?.length || 0;
    }

    // Generate DNS forwarders in the same order as MainTableRoute: VPN -> Domestic -> Foreign
    // This ensures CheckIP assignment matches exactly with routing configuration

    // 1. VPN Network - Use CheckIPs assigned to VPN clients (FIRST in MainTableRoute)
    // Matches the logic in combineMultiWANInterfaces: VPN uses Foreign CheckIPs with offset
    if (networks.BaseNetworks.VPN && vpnClientCount > 0) {
        // VPN clients use Foreign CheckIPs with offset based on foreign WAN count
        // This prevents overlap with Foreign WAN CheckIPs
        const vpnCheckIPOffset = foreignWANCount;
        const vpnDNSServers = ForeignCheckIPs.slice(vpnCheckIPOffset, vpnCheckIPOffset + vpnClientCount).join(",");
        forwarders.push(`add name=VPN dns-servers=${vpnDNSServers} verify-doh-cert=no`);
    } else if (networks.BaseNetworks.VPN) {
        // Fallback: Use CheckIP with offset if no VPN clients configured
        const vpnCheckIPOffset = foreignWANCount;
        const vpnDNSServers = ForeignCheckIPs.slice(vpnCheckIPOffset, vpnCheckIPOffset + 1).join(",");
        forwarders.push(`add name=VPN dns-servers=${vpnDNSServers} verify-doh-cert=no`);
    }

    // 2. Domestic Network - Use CheckIPs assigned to Domestic WAN interfaces (SECOND in MainTableRoute)
    // Matches the logic in convertWANLinkToMultiWAN for domestic links
    if (networks.BaseNetworks.Domestic && domesticWANCount > 0) {
        // Use exactly N CheckIPs based on domestic WAN count
        const domesticDNSServers = DomesticCheckIPs.slice(0, domesticWANCount).join(",");
        forwarders.push(`add name=Domestic dns-servers=${domesticDNSServers} verify-doh-cert=no`);
    } else if (networks.BaseNetworks.Domestic) {
        // Fallback: Use first CheckIP if no WAN configs
        const domesticDNSServers = DomesticCheckIPs.slice(0, 1).join(",");
        forwarders.push(`add name=Domestic dns-servers=${domesticDNSServers} verify-doh-cert=no`);
    }

    // 3. Foreign Network - Use CheckIPs assigned to Foreign WAN interfaces (THIRD in MainTableRoute)
    // Matches the logic in convertWANLinkToMultiWAN for foreign links
    // Foreign always starts from index 0 of ForeignCheckIPs
    if (networks.BaseNetworks.Foreign && foreignWANCount > 0) {
        // Use exactly N CheckIPs based on foreign WAN count
        const foreignDNSServers = ForeignCheckIPs.slice(0, foreignWANCount).join(",");
        forwarders.push(`add name=Foreign dns-servers=${foreignDNSServers} verify-doh-cert=no`);
    } else if (networks.BaseNetworks.Foreign) {
        // Fallback: Use first CheckIP if no WAN configs
        const foreignDNSServers = ForeignCheckIPs.slice(0, 1).join(",");
        forwarders.push(`add name=Foreign dns-servers=${foreignDNSServers} verify-doh-cert=no`);
    }

    // 4. General Forwarder - Combine all Check IPs from VPN, Domestic, and Foreign
    // This serves as a catch-all forwarder using all available Check IPs
    const allCheckIPs: string[] = [];
    
    // Collect VPN Check IPs (Foreign CheckIPs with offset)
    const vpnCheckIPOffset = foreignWANCount;
    const vpnCount = vpnClientCount > 0 ? vpnClientCount : 1;
    allCheckIPs.push(...ForeignCheckIPs.slice(vpnCheckIPOffset, vpnCheckIPOffset + vpnCount));
    
    // Collect Domestic Check IPs
    const domesticCount = domesticWANCount > 0 ? domesticWANCount : 1;
    allCheckIPs.push(...DomesticCheckIPs.slice(0, domesticCount));
    
    // Collect Foreign Check IPs
    const foreignCount = foreignWANCount > 0 ? foreignWANCount : 1;
    allCheckIPs.push(...ForeignCheckIPs.slice(0, foreignCount));
    
    // Create General forwarder with all Check IPs
    const generalDNSServers = allCheckIPs.join(",");
    forwarders.push(`add name=General dns-servers=${generalDNSServers} verify-doh-cert=no`);

    // Add DNS forwarders to configuration
    config["/ip dns forwarders"] = forwarders;

    return config;
};

export const MDNS = ( networks: Networks, subnets?: Subnets ): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [],
    };

    // Extract all bridge names from the Networks structure
    const bridgeInterfaces = extractBridgeNames(networks, subnets);

    if (bridgeInterfaces.length === 0) {
        return config;
    }

    // Join all bridge names with commas
    const mdnsInterfaces = bridgeInterfaces.join(",");
    config["/ip dns"].push(`set mdns-repeat-ifaces="${mdnsInterfaces}"`);

    return config;
};

export const IRTLDRegex = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns static": [
            `add type=FWD regexp="\\\\.ir" forward-to=Domestic comment="Forward .ir TLD queries via domestic DNS"`,
        ],
    };

    return config;
};

export const BlockWANDNS = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [
            `add chain=input dst-port="53" in-interface-list="WAN" protocol="tcp" action=drop comment="Block Open Recursive DNS"`,
            `add chain=input dst-port="53" in-interface-list="WAN" protocol="udp" action=drop comment="Block Open Recursive DNS"`,
        ],
    };

    return config;
};

export const RedirectDNS = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall nat": [
            `add chain=dstnat action=redirect protocol=tcp dst-port=53 comment="Redirect DNS"`,
            `add chain=dstnat action=redirect protocol=udp dst-port=53 comment="Redirect DNS"`,
        ],
    };

    return config;
};

export const DOH = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns static": [],
        "/ip dns": [],
    };

    // config["/ip dns static"].push(
    //     `add address=8.8.8.8 name="google.com" comment="DOH-Domain-Static-Entry"`,
    // );

    config["/ip dns"].push(
        `set use-doh-server="https://8.8.8.8/dns-query" verify-doh-cert=no`,
    );

    return config;
};

export const DNSForeward = ( address: string, network: "Domestic" | "Foreign" | "VPN" | "General", matchSubdomain?: boolean, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns static": [],
    };

    // Build the FWD entry using the named forwarder from DNSForwarders
    let fwdCommand = `add name=${address} type=FWD forward-to=${network}`;
    
    if (matchSubdomain !== undefined) {
        fwdCommand += ` match-subdomain=${matchSubdomain ? "yes" : "no"}`;
    }
    
    if (comment) {
        fwdCommand += ` comment="${comment}"`;
    }

    config["/ip dns static"].push(fwdCommand);

    return config;
};

export const FRNDNSFWD = (): RouterConfig => {
    const Domains = [
        "s4i.co",
        "starlink4iran.com",
        // "curl.se",
        // "pki.goog",
    ];

    // Create DNS forward entries for all domains through Foreign forwarder
    const configs: RouterConfig[] = Domains.map(domain => 
        DNSForeward(domain, "Foreign", true, `Forward ${domain} via Foreign DNS`)
    );

    // Merge all DNS forward configurations
    return mergeMultipleConfigs(...configs);
}

export const GeneralFWD = (): RouterConfig => {
    const Domains = [
        "curl.se",
        "pki.goog",
    ];

    // Create DNS forward entries for all domains through General forwarder
    const configs: RouterConfig[] = Domains.map(domain => 
        DNSForeward(domain, "General", false,`Forward ${domain} via General DNS`)
    );

    // Merge all DNS forward configurations
    return mergeMultipleConfigs(...configs);
}

export const DNS = ( networks: Networks,  subnets?: Subnets, wanLinks?: WANLinks, vpnClient?: VPNClient ): RouterConfig => {
    return mergeMultipleConfigs(
        BaseDNSSettins(),
        DNSForwarders(networks, wanLinks, vpnClient),
        MDNS(networks, subnets),
        IRTLDRegex(),
        BlockWANDNS(),
        DOH(),
        FRNDNSFWD(),
        GeneralFWD(),
        RedirectDNS(),
    );
};

