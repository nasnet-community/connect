import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { LTESettings, PPPoEConfig, StaticIPConfig } from "~/components/Star/StarContext";





// LTE
export const LTE = (LTESettings: LTESettings): RouterConfig => {
    const config: RouterConfig = {
        "/interface lte": [],
        "/interface lte apn": [],
    };
    const { apn } = LTESettings;

    config["/interface lte"].push(
        `set [ find default-name=lte1 ] allow-roaming=yes apn-profiles=${apn} band=""`,
    );
    config["/interface lte apn"].push(
        `add add-default-route=no apn=${apn} name=${apn} use-network-apn=yes use-peer-dns=no`,
    );

    return config;
};

// DHCPClient
export const DHCPClient = ( name: string, Network: string, Interface: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip dhcp-client": [],
    };

    config["/ip dhcp-client"].push(
        `add add-default-route=no comment="${name} to ${Network}" interface=${Interface} script=":if (\\$bound=1) do={\\r\\
            \\n:local gw (\\$\\"gateway-address\\" . \\"%\\" . \\$interface)\\r\\
            \\n:local routeCount [/ip route print count-only where comment=\\"Route-to-${Network}-${name}\\"]\\r\\
            \\n:if (\\$routeCount > 0) do={\\r\\
            \\n    /ip route set [ find comment=\\"Route-to-${Network}-${name}\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
            \\n} else={\\r\\
            \\n    /ip route add dst-address=0.0.0.0/0 gateway=\\$gw comment=\\"Route-to-${Network}-${name}\\"\\r\\
            \\n}\\r\\
            \\n} else={\\r\\
            \\n/ip route remove [ find comment=\\"Route-to-${Network}-${name}\\" ]\\r\\
            \\n}" use-peer-dns=no use-peer-ntp=no`,
    );

    return config;
};

// PPPOEClient
export const PPPOEClient = ( name: string, interfaceName: string, pppoeConfig: PPPoEConfig ): RouterConfig => {
    const config: RouterConfig = {
        "/interface pppoe-client": [],
    };
    const { username, password } = pppoeConfig;

    config["/interface pppoe-client"].push(
        `add name="pppoe-client-${name}" comment="PPPoE client for ${name}" interface=${interfaceName} user=${username} \\
        password=${password} dial-on-demand=yes add-default-route=no allow=chap,pap,mschap1,mschap2 disabled=no`,
    );

    return config;
};

export function calculateCIDR(subnet: string): number {
    const subnetParts = subnet.split(".").map(Number);
    let cidr = 0;

    for (let i = 0; i < 4; i++) {
        const octet = subnetParts[i];
        if (octet === 255) {
            cidr += 8;
        } else if (octet === 0) {
            break;
        } else {
            // Convert octet to binary and count consecutive 1s from left
            let temp = octet;
            while (temp & 0x80) {
                // Check if leftmost bit is 1
                cidr++;
                temp <<= 1;
            }
            break;
        }
    }

    return cidr;
}

// StaticIP
export const StaticIP = ( name: string, interfaceName: string, staticIPConfig: StaticIPConfig ): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    const { ipAddress, subnet } = staticIPConfig;

    const cidr = calculateCIDR(subnet);

    config["/ip address"].push(
        `add address=${ipAddress}/${cidr} interface=${interfaceName} comment="${name}"`,
    );

    return config;
};