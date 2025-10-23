import type { Networks, Subnets, WANLinks, VPNClient } from "~/components/Star/StarContext";
import  { type RouterConfig, extractBridgeNames, mergeMultipleConfigs, DomesticCheckIPs, ForeignCheckIPs, combineMultiWANInterfaces } from "~/components/Star/ConfigGenerator";

export const BaseDNSSettins = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [
            "set allow-remote-requests=yes  max-concurrent-queries=500 max-concurrent-tcp-sessions=50 cache-size=51200KiB cache-max-ttl=7d",
        ],
    };

    return config;
};

export const DNSNAT = ( networks: Networks, subnets?: Subnets , WANLinks?: WANLinks, VPNClient?: VPNClient): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall nat": []
    };

    const natRules = config["/ip firewall nat"];

    // Get the exact same interfaces with CheckIPs as used in routing logic
    const allInterfaces = combineMultiWANInterfaces(VPNClient, WANLinks);
    
    // Extract interfaces by network type
    const foreignInterfaces = allInterfaces.filter(i => i.network === "Foreign");
    const domesticInterfaces = allInterfaces.filter(i => i.network === "Domestic");
    const vpnInterfaces = allInterfaces.filter(i => i.network === "VPN");

    // Helper function to add DNS NAT rules for a network
    const addDNSNATRules = (networkName: string, addressListName: string, checkIP: string) => {
        natRules.push(
            `add action=dst-nat chain=dstnat comment="DNS ${networkName}" disabled=yes dst-port=53 protocol=udp src-address-list="${addressListName}" to-addresses=${checkIP}`
        );
        natRules.push(
            `add action=dst-nat chain=dstnat comment="DNS ${networkName}" disabled=yes dst-port=53 protocol=tcp src-address-list="${addressListName}" to-addresses=${checkIP}`
        );
    };

    // 1. Base Networks
    if (networks.BaseNetworks && subnets?.BaseSubnets) {
        // Split Network - uses same CheckIP as VPN network (routes to VPN)
        if (networks.BaseNetworks.Split && subnets.BaseSubnets.Split?.subnet) {
            const checkIP = vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
            addDNSNATRules("Split", "Split-LAN", checkIP);
        }

        // Domestic Network - uses first Domestic CheckIP from routing
        if (networks.BaseNetworks.Domestic && subnets.BaseSubnets.Domestic?.subnet) {
            const checkIP = domesticInterfaces[0]?.checkIP || DomesticCheckIPs[0];
            addDNSNATRules("Domestic", "Domestic-LAN", checkIP);
        }

        // Foreign Network - uses first Foreign CheckIP from routing
        if (networks.BaseNetworks.Foreign && subnets.BaseSubnets.Foreign?.subnet) {
            const checkIP = foreignInterfaces[0]?.checkIP || ForeignCheckIPs[0];
            addDNSNATRules("Foreign", "Foreign-LAN", checkIP);
        }

        // VPN Network - uses first VPN CheckIP from routing
        if (networks.BaseNetworks.VPN && subnets.BaseSubnets.VPN?.subnet) {
            const checkIP = vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
            addDNSNATRules("VPN", "VPN-LAN", checkIP);
        }
    }

    // 2. Additional Domestic Networks - map by index to Domestic WAN interfaces
    if (networks.DomesticNetworks && subnets?.DomesticSubnets) {
        subnets.DomesticSubnets.forEach((subnet, index) => {
            if (subnet.subnet) {
                const networkName = subnet.name || "Domestic";
                const addressListName = `Domestic-${networkName}-LAN`;
                // Use corresponding Domestic interface by index, fallback to first if index out of bounds
                const checkIP = domesticInterfaces[index]?.checkIP || domesticInterfaces[0]?.checkIP || DomesticCheckIPs[0];
                addDNSNATRules(`Domestic-${networkName}`, addressListName, checkIP);
            }
        });
    }

    // 3. VPN Client Networks - match by name to VPN interfaces
    if (networks.VPNClientNetworks && subnets?.VPNClientSubnets) {
        const vpnClientNetworks = networks.VPNClientNetworks;
        const vpnClientSubnets = subnets.VPNClientSubnets;

        // Wireguard
        if (vpnClientNetworks.Wireguard && vpnClientSubnets.Wireguard) {
            vpnClientSubnets.Wireguard.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "WG-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }

        // OpenVPN
        if (vpnClientNetworks.OpenVPN && vpnClientSubnets.OpenVPN) {
            vpnClientSubnets.OpenVPN.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "OVPN-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }

        // L2TP
        if (vpnClientNetworks.L2TP && vpnClientSubnets.L2TP) {
            vpnClientSubnets.L2TP.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "L2TP-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }

        // PPTP
        if (vpnClientNetworks.PPTP && vpnClientSubnets.PPTP) {
            vpnClientSubnets.PPTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "PPTP-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }

        // SSTP
        if (vpnClientNetworks.SSTP && vpnClientSubnets.SSTP) {
            vpnClientSubnets.SSTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "SSTP-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }

        // IKev2
        if (vpnClientNetworks.IKev2 && vpnClientSubnets.IKev2) {
            vpnClientSubnets.IKev2.forEach((subnet) => {
                if (subnet.subnet) {
                    const networkName = subnet.name || "IKev2-Client";
                    const addressListName = `VPN-${networkName}-LAN`;
                    // Find matching VPN interface by name
                    const vpnInterface = vpnInterfaces.find(i => i.name === networkName);
                    const checkIP = vpnInterface?.checkIP || vpnInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                    addDNSNATRules(`VPN-${networkName}`, addressListName, checkIP);
                }
            });
        }
    }

    // 4. Additional Foreign Networks - map by index to Foreign WAN interfaces
    if (networks.ForeignNetworks && subnets?.ForeignSubnets) {
        subnets.ForeignSubnets.forEach((subnet, index) => {
            if (subnet.subnet) {
                const networkName = subnet.name || "Foreign";
                const addressListName = `Foreign-${networkName}-LAN`;
                // Use corresponding Foreign interface by index, fallback to first if index out of bounds
                const checkIP = foreignInterfaces[index]?.checkIP || foreignInterfaces[0]?.checkIP || ForeignCheckIPs[0];
                addDNSNATRules(`Foreign-${networkName}`, addressListName, checkIP);
            }
        });
    }

    return config;
}

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

export const DNSV4 = (networks?: Networks, wanLinks?: WANLinks, vpnClient?: VPNClient): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [],
    };

    if (!networks || !networks.BaseNetworks) {
        return config;
    }

    // Calculate counts matching DNSForwarders logic (lines 198-210)
    const domesticWANCount = wanLinks?.Domestic?.WANConfigs.length || 0;
    const foreignWANCount = wanLinks?.Foreign?.WANConfigs.length || 0;
    
    let vpnClientCount = 0;
    if (vpnClient) {
        vpnClientCount += vpnClient.Wireguard?.length || 0;
        vpnClientCount += vpnClient.OpenVPN?.length || 0;
        vpnClientCount += vpnClient.PPTP?.length || 0;
        vpnClientCount += vpnClient.L2TP?.length || 0;
        vpnClientCount += vpnClient.SSTP?.length || 0;
        vpnClientCount += vpnClient.IKeV2?.length || 0;
    }

    // Collect CheckIPs in order: VPN -> Domestic -> Foreign
    const allCheckIPs: string[] = [];
    
    // 1. VPN CheckIPs (Foreign CheckIPs with offset)
    const vpnCheckIPOffset = foreignWANCount;
    const vpnCount = vpnClientCount > 0 ? vpnClientCount : 1;
    allCheckIPs.push(...ForeignCheckIPs.slice(vpnCheckIPOffset, vpnCheckIPOffset + vpnCount));
    
    // 2. Domestic CheckIPs
    const domesticCount = domesticWANCount > 0 ? domesticWANCount : 1;
    allCheckIPs.push(...DomesticCheckIPs.slice(0, domesticCount));
    
    // 3. Foreign CheckIPs
    const foreignCount = foreignWANCount > 0 ? foreignWANCount : 1;
    allCheckIPs.push(...ForeignCheckIPs.slice(0, foreignCount));
    
    // Create DNS servers command
    const dnsServers = allCheckIPs.join(",");
    config["/ip dns"].push(`set servers=${dnsServers}`);

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

    config["/ip dns static"].push(
        // Google
        `add address="8.8.8.8" name="dns.google" comment="DOH-Domain-Static-Entry"`,
        `add address="8.8.4.4" name="dns.google" comment="DOH-Domain-Static-Entry"`,
        `add address="2001:4860:4860::8888" name="dns.google" comment="DOH-Domain-Static-Entry"`,
        `add address="2001:4860:4860::8844" name="dns.google" comment="DOH-Domain-Static-Entry"`, 

        // Cloudflare
        `add address="1.1.1.1" name="cloudflare-dns.com" comment="DOH-Domain-Static-Entry"`,
        `add address="1.0.0.1" name="cloudflare-dns.com" comment="DOH-Domain-Static-Entry"`,
        `add address="2606:4700:4700::1111" name="cloudflare-dns.com" comment="DOH-Domain-Static-Entry"`,
        `add address="2606:4700:4700::1001" name="cloudflare-dns.com" comment="DOH-Domain-Static-Entry"`,

        // NextDNS
        `add address="45.90.28.140" name="dns.nextdns.io" comment="DOH-Domain-Static-Entry"`,
        `add address="45.90.30.140" name="dns.nextdns.io" comment="DOH-Domain-Static-Entry"`,
        `add address="2a07:a8c0::9d:4621" name="dns.nextdns.io" comment="DOH-Domain-Static-Entry"`,
        `add address="2a07:a8c1::9d:4621" name="dns.nextdns.io" comment="DOH-Domain-Static-Entry"`,

    );

    config["/ip dns"].push(
        // `set servers=8.8.8.8,8.8.4.4 use-doh-server="https://8.8.8.8/dns-query" verify-doh-cert=yes doh-max-concurrent-queries=100 doh-max-server-connections=10`,
        `set use-doh-server="https://8.8.8.8/dns-query" verify-doh-cert=no doh-max-concurrent-queries=500 doh-max-server-connections=50`,
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
        "cacerts.digicert.com",
        "crl.d-trust.net",
        "d-trust.net",
        "accv.es",
        "crl.certigna.fr",
        "crl.dhimyotis.com",
        "crl.securetrust.com",
        "crl.comodoca.com",
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
        DNSV4(networks, wanLinks, vpnClient),
        DNSNAT(networks, subnets, wanLinks, vpnClient),
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

