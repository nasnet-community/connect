import type { StarState } from "~/components/Star/StarContext/StarContext";
import { ChooseCG } from "./Choose/ChooseCG";
import { WANCG } from "./WAN/WANCG";
import { LANCG } from "./LAN/LANCG";
import { ExtraCG } from "./Extra/ExtraCG";
import { ShowCG } from "./Show/ShowCG";
import {
    mergeMultipleConfigs,
    // mergeConfigurations,
    removeEmptyArrays,
    removeEmptyLines,
    formatConfig,
} from "./utils/ConfigGeneratorUtil";

export interface RouterConfig {
    [key: string]: string[];
}

export const generateAPConfig = (state: StarState): string => {
    // Generate simplified AP configuration for Trunk Mode
    const config: RouterConfig = {
        "/interface bridge": ["add name=bridge1"],
        "/interface wireless": [],
        "/interface list": [],
        "/ip settings": [
            "set accept-redirects=yes accept-source-route=yes tcp-syncookies=yes",
        ],
        "/ipv6 settings": [
            "set accept-redirects=yes accept-router-advertisements=yes",
        ],
        "/interface list member": [],
        "/ip address": [],
        "/ip dhcp-client": [],
        "/ip firewall filter": [],
        "/ip firewall nat": [],
        "/ip service": [],
        "/system identity": [],
        "/system clock": [],
        "/system ntp client": [],
    };

    try {
        // Basic identity
        if (state.ExtraConfig.RouterIdentityRomon?.RouterIdentity) {
            config["/system identity"].push(
                `set name="${state.ExtraConfig.RouterIdentityRomon.RouterIdentity}-AP"`,
            );
        }

        // Configure interfaces based on RouterModels MasterSlaveInterface for Trunk Mode
        if (state.Choose.RouterMode === "Trunk Mode") {
            const routerModels = state.Choose.RouterModels;
            // Check if any router has wireless MasterSlaveInterface
            for (const model of routerModels) {
                if (
                    model.MasterSlaveInterface &&
                    (model.MasterSlaveInterface.includes("wifi") ||
                        model.MasterSlaveInterface.includes("wlan"))
                ) {
                    config["/interface wireless"].push(
                        "set [ find default-name=wlan1 ] mode=station-bridge ssid=TrunkLink disabled=no",
                    );
                    break;
                }
            }
        }

        // Bridge all interfaces
        config["/interface bridge port"] = [
            "add bridge=bridge1 interface=ether1",
            "add bridge=bridge1 interface=wlan1",
        ];

        // Basic firewall rules
        config["/ip firewall filter"] = [
            'add action=accept chain=input comment="Accept established,related" connection-state=established,related',
            'add action=accept chain=input comment="Accept from bridge" in-interface=bridge1',
            'add action=drop chain=input comment="Drop all other input"',
        ];

        // Minimal services
        config["/ip service"] = [
            "set telnet disabled=yes",
            "set ftp disabled=yes",
            "set www disabled=yes",
            "set api disabled=yes",
            "set api-ssl disabled=yes",
        ];

        // DHCP client on bridge
        config["/ip dhcp-client"] = ["add interface=bridge1 disabled=no"];

        // Format and return the config
        const removedEmptyArrays = removeEmptyArrays(config);
        const formattedConfig = formatConfig(removedEmptyArrays);
        const finalConfig = removeEmptyLines(formattedConfig);

        return `${finalConfig}\n\n:delay 60\n\n/system reboot`;
    } catch (error) {
        console.error("Error generating AP config:", error);
        return "";
    }
};

export const ConfigGenerator = (state: StarState): string => {
    const config: RouterConfig = {
        "/disk": [],
        "/interface bridge": [],
        "/interface pptp-client": [],
        "/interface sstp-client": [],
        "/interface ovpn-client": [],
        "/interface l2tp-client": [],
        "/interface ethernet": [],
        "/interface veth": [],
        "/interface wireguard": [],
        "/interface wireguard peers": [],
        "/interface list": [],
        "/ip ipsec policy group": [],
        "/ip ipsec profile": [],
        "/ip ipsec peer": [],
        "/ip ipsec proposal": [],
        "/interface vlan": [],
        "/interface wifi security": [],
        "/interface wifi": [
            "set [ find default-name=wifi2 ] name=wifi2.4 disabled=no",
            "set [ find default-name=wifi1 ] name=wifi5 disabled=no",
        ],
        "/interface macvlan": [],
        "/interface pppoe-client": [],
        // '/interface list': [],
        "/ip pool": [],
        "/ppp profile": [],
        "/interface l2tp-server server": [],
        "/interface sstp-server server": [],
        "/interface pptp-server server": [],
        "/interface ovpn-server server": [],
        "/interface pptp-server": [],
        "/interface sstp-server": [],
        "/interface ovpn-server": [],
        "/interface l2tp-server": [],
        "/ip dhcp-server": [],
        "/routing table": [],
        "/interface bridge port": [],
        "/ip settings": [],
        "/ipv6 settings": [],
        "/interface list member": [],
        "/ip address": [],
        "/ip cloud": [],
        "/ip dhcp-client": [],
        "/ip dhcp-server lease": [],
        "/ip dhcp-server network": [],
        "/ip dns": [],
        "/ip firewall address-list": [],
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
        "/ip firewall nat": [],
        "/ip firewall raw": [],
        "/ip nat-pmp": [],
        "/ip nat-pmp interfaces": [],
        "/ip route": [],
        "/ip ipsec mode-config": [],
        "/ip ipsec policy": [],
        "/ip ipsec identity": [],
        "/ip service": [],
        "/ip upnp": [],
        "/ip upnp interfaces": [],
        "/ipv6 firewall filter": [],
        "/ppp secret": [],
        "/system clock": [],
        "/system identity": [],
        "/system logging": [],
        "/system note": [],
        "/system ntp client": [],
        "/system ntp server": [],
        "/system ntp client servers": [],
        "/system package update": [],
        "/system routerboard settings": [],
        "/system scheduler": [],
        "/system script": [],
        "/certificate": [],
        "/tool graphing interface": [],
        "/tool graphing queue": [],
        "/tool graphing resource": [],
        "/tool romon": [],
        "/tool sniffer": [],
    };

    try {
        // Use helper function for backwards compatibility
        const domesticLinkEnabled =
            state.Choose.WANLinkType === "domestic" ||
            state.Choose.WANLinkType === "both";

        // Generate configurations from each module
        const chooseConfig = ChooseCG();
        const wanConfig = WANCG(state.WAN, domesticLinkEnabled);
        const lanConfig = LANCG(state);
        const extraConfig = ExtraCG(
            state.ExtraConfig,
            domesticLinkEnabled,
            state.Choose.WANLinkType,
            state.LAN.Subnets,
            state.WAN.WANLink,
            state.WAN.VPNClient
        );
        const showConfig = ShowCG(state);

        // Merge all configurations
        const finalConfig = mergeMultipleConfigs(
            config,
            chooseConfig,
            wanConfig,
            lanConfig,
            extraConfig,
            showConfig,
        );

        const removedEmptyArrays = removeEmptyArrays(finalConfig);
        const ELConfig = formatConfig(removedEmptyArrays);
        const formattedConfigEL = removeEmptyLines(ELConfig);
        return `${formattedConfigEL} \n\n:delay 60 \n\n/system reboot`;
    } catch (error) {
        console.error("Error generating config:", error);
        return "";
    }
};
