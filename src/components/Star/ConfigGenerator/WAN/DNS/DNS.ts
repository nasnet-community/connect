import type { DNSConfig } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { Networks } from "~/components/Star/StarContext";

export const BaseDNSSettins = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [
            "set allow-remote-requests=yes max-concurrent-queries=200 cache-size=51200KiB cache-max-ttl=7d",
        ],
    };

    return config;
};

export const DNSForwarders = (
    DNSConfig: DNSConfig,
    baseNetworks: Networks[] = [],
): RouterConfig => {
    const { ForeignDNS, VPNDNS, DomesticDNS, SplitDNS, DOH } = DNSConfig;
    const config: RouterConfig = {
        "/ip dns forwarders": [],
    };

    // Create forwarders based on available DNS configurations and base networks
    const forwarders: string[] = [];

    // Map DNS configurations to network names
    const dnsMapping: Record<Networks, string | undefined> = {
        Foreign: ForeignDNS,
        VPN: VPNDNS,
        Domestic: DomesticDNS,
        Split: SplitDNS,
    };

    baseNetworks.forEach((network) => {
        const dnsServer = dnsMapping[network];

        // Only create forwarders for valid DNS servers (not empty, not whitespace)
        if (dnsServer && dnsServer.trim() !== "") {
            let forwarderCmd = `add name=${network.toUpperCase()} dns-servers=${dnsServer}`;

            // Add DOH configuration for Domestic network if available
            if (network === "Domestic" && DOH?.domain) {
                const dohDomain = DOH.domain.startsWith("http")
                    ? DOH.domain
                    : `https://${DOH.domain}`;
                const dohUrl = dohDomain.endsWith("/dns-query")
                    ? dohDomain
                    : `${dohDomain}/dns-query`;
                forwarderCmd += ` doh-servers=${dohUrl} verify-doh-cert=yes`;
            }

            forwarders.push(forwarderCmd);
        }
    });

    // Add DNS forwarders to configuration
    config["/ip dns forwarders"] = forwarders;

    return config;
};

export const DNSmDNSRepeater = (
    baseNetworks: Networks[] = [],
): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [],
    };

    if (baseNetworks.length === 0) {
        return config;
    }

    const networkNameMapping: Record<Networks, string> = {
        Domestic: "DOM",
        Foreign: "FRN",
        Split: "Split",
        VPN: "VPN",
    };

    const bridgeInterfaces: string[] = baseNetworks.map(
        (network) => `LANBridge${networkNameMapping[network]}`,
    );

    if (bridgeInterfaces.length > 0) {
        const mdnsInterfaces = bridgeInterfaces.join(",");
        config["/ip dns"].push(`set mdns-repeat-ifaces=${mdnsInterfaces}`);
    }

    return config;
};

export const IRTLDRegex = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns static": [
            `add name=IRTLD type=FWD regexp=".*\\\\.ir\\$" forward-to=DomesticDNS match-subdomain=yes comment="Forward .ir TLD queries via domestic DNS"`,
        ],
    };

    return config;
};

export const BlockWANDNS = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [
            `add chain=input dst-port=53 in-interface-list=WAN protocol=tcp action=drop comment="Block Open Recursive DNS"`,
            `add chain=input dst-port=53 in-interface-list=WAN protocol=udp action=drop comment="Block Open Recursive DNS"`,
        ],
    };

    return config;
};

export const DOH = (DNSConfig: DNSConfig): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns static": [],
        "/ip dns": [],
    };

    // Check if DOH configuration exists
    if (!DNSConfig.DOH?.domain || !DNSConfig.DOH.bindingIP) {
        return config;
    }

    const { domain, bindingIP } = DNSConfig.DOH;
    const stripedDomain = domain.replace(/^https?:\/\//, "");

    config["/ip dns static"].push(
        `add address=${bindingIP} name="${stripedDomain}" comment="DOH-Domain-Static-Entry"`,
    );

    config["/ip dns"].push(
        `set use-doh-server="${domain}" verify-doh-cert=yes`,
    );

    return config;
};
