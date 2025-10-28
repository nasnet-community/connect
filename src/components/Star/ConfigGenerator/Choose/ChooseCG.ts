import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { mergeRouterConfigs } from "~/components/Star/ConfigGenerator";

export const BaseConfig = (): RouterConfig => {
    const config: RouterConfig = {
        "/interface list": [
            `add name="WAN"`, 
            `add name="LAN"`,
        ],
        "/ip firewall address-list": [
            `add comment="LOCAL-IP" address="192.168.0.0/16" list="LOCAL-IP"`,
            `add comment="LOCAL-IP" address="172.16.0.0/12" list="LOCAL-IP"`,
            `add comment="LOCAL-IP" address="10.0.0.0/8" list="LOCAL-IP"`,
        ],
        "/ip firewall mangle": [
            `add action=accept chain=prerouting comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"`,
            `add action=accept chain=postrouting comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"`,
            `add action=accept chain=output comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"`,
            `add action=accept chain=input comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"`,
            `add action=accept chain=forward comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"`,
        ],
        "/ip firewall nat": [
            `add action=masquerade chain=srcnat out-interface-list="WAN" comment="MASQUERADE the traffic go to WAN Interfaces"`,
        ],
    };

    return config;
};

export const ChooseCG = (): RouterConfig => {
    const baseConfig = BaseConfig();

    const config: RouterConfig = {
        "/ip firewall mangle": [],
        "/ip route": [],
    };

    return mergeRouterConfigs(baseConfig, config);
};
