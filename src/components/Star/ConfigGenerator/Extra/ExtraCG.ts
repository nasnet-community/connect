import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type {
    services,
    RouterIdentityRomon,
    GameConfig,
    ExtraConfigState,
    RUIConfig,
    UsefulServicesConfig,
} from "~/components/Star/StarContext";
import {
    Timezone,
    AReboot,
    AUpdate,
    IPAddressUpdateFunc,
    Clock,
    update,
    // NTP,
    // Graph,
    // DDNS,
} from "./ExtraUtil";
import { PublicCert } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";

export const BaseExtra = (): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Add base system clock configuration
    configs.push(Clock());

    // Add system update configuration
    configs.push(update());

    // Add public certificate configuration
    configs.push(PublicCert());

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

export const IdentityRomon = (
    RouterIdentityRomon: RouterIdentityRomon,
): RouterConfig => {
    const config: RouterConfig = {
        "/system identity": [],
        "/tool romon": [],
    };

    const { RouterIdentity, isRomon } = RouterIdentityRomon;

    if (RouterIdentity) {
        config["/system identity"].push(`set name="${RouterIdentity}"`);
    }

    if (isRomon) {
        config["/tool romon"].push("set enabled=yes");
    }

    return config;
};

export const AccessServices = (Services: services): RouterConfig => {
    const config: RouterConfig = {
        "/ip service": [],
    };

    const serviceNames = [
        "api",
        "api-ssl",
        "ftp",
        "ssh",
        "telnet",
        "winbox",
        "www",
        "www-ssl",
    ] as const;

    serviceNames.forEach((service) => {
        const serviceKey = service
            .replace("-ssl", "ssl")
            .replace("www", "web") as keyof services;

        const serviceConfig = Services[serviceKey];
        const setting =
            typeof serviceConfig === "string"
                ? serviceConfig
                : serviceConfig.type || "Disable";
        const port =
            typeof serviceConfig === "object" ? serviceConfig.port : undefined;

        let command = "";

        if (setting === "Disable") {
            command = `set ${service} disabled=yes`;
        } else if (setting === "Local") {
            command = `set ${service} address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8`;
        } else if (setting === "Enable") {
            command = `set ${service} disabled=no`;
        }

        // Add port configuration if specified
        if (port && command) {
            command += ` port=${port}`;
        }

        if (command) {
            config["/ip service"].push(command);
        }
    });

    return config;
};

export const RUI = (ruiConfig: RUIConfig): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Handle timezone configuration
    if (ruiConfig.Timezone) {
        configs.push(Timezone(ruiConfig.Timezone));
    }

    // Handle auto-reboot scheduler
    if (ruiConfig.Reboot) {
        configs.push(AReboot(ruiConfig.Reboot));
    }

    // Handle auto-update scheduler
    if (ruiConfig.Update) {
        configs.push(AUpdate(ruiConfig.Update));
    }

    // Handle IP Address update script and scheduler
    if (ruiConfig.IPAddressUpdate) {
        configs.push(IPAddressUpdateFunc(ruiConfig.IPAddressUpdate));
    }

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

export const UsefulServices = (
    _usefulServicesConfig: UsefulServicesConfig,
): RouterConfig => {
    const config: RouterConfig = {};

    return config;
};

export const Game = (
    Game: GameConfig[],
    DomesticLink: boolean,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall raw": [],
        "/ip firewall mangle": [],
    };

    // Check if Games array has any items
    if (!Game || Game.length === 0) {
        return config;
    }

    // Only add mangle rules if there are games configured
    const mangleRules = [
        // Split Game FRN Traffic
        `add action=mark-connection chain=prerouting comment=Split-Game-FRN dst-address-list=FRN-IP-Games \\
           new-connection-mark=conn-game-FRN passthrough=yes src-address-list=Split-LAN`,
        `add action=mark-routing chain=prerouting comment=Split-Game-FRN connection-mark=conn-game-FRN \\
           new-routing-mark=to-FRN passthrough=no src-address-list=Split-LAN`,
    ];

    // Only add DOM traffic rules if DomesticLink is true
    if (DomesticLink) {
        mangleRules.push(
            // Split Game DOM Traffic
            `add action=mark-connection chain=prerouting comment=Split-Game-DOM dst-address-list=DOM-IP-Games \\
             new-connection-mark=conn-game-DOM passthrough=yes src-address-list=Split-LAN`,
            `add action=mark-routing chain=prerouting comment=Split-Game-DOM connection-mark=conn-game-DOM \\
             new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`,
        );
    }

    // Add VPN traffic rules
    mangleRules.push(
        // Split Game VPN Traffic
        `add action=mark-connection chain=prerouting comment=Split-Game-VPN dst-address-list=VPN-IP-Games \\
           new-connection-mark=conn-game-VPN passthrough=yes src-address-list=Split-LAN`,
        `add action=mark-routing chain=prerouting comment=Split-Game-VPN connection-mark=conn-game-VPN \\
           new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`,
    );

    config["/ip firewall mangle"] = mangleRules;

    const Games = Game;

    type BaseLinkType = "foreign" | "domestic" | "vpn" | "none";
    type MappedLinkType = "FRN" | "DOM" | "VPN" | "NONE";

    const displayMapping: Record<BaseLinkType, MappedLinkType> = {
        foreign: "FRN",
        domestic: "DOM",
        vpn: "VPN",
        none: "NONE",
    };

    Games.forEach((game: GameConfig) => {
        // if (game.link === "none") return;

        if (
            game.ports.tcp?.length &&
            game.ports.tcp.some((port) => port !== "")
        ) {
            config["/ip firewall raw"].push(
                `add action=add-dst-to-address-list address-list="${displayMapping[game.link]}-IP-Games" address-list-timeout=1d chain=prerouting comment="${game.name}" dst-address-list=!LOCAL-IP dst-port=${game.ports.tcp.join(",")} protocol=tcp`,
            );
        }

        if (
            game.ports.udp?.length &&
            game.ports.udp.some((port) => port !== "")
        ) {
            config["/ip firewall raw"].push(
                `add action=add-dst-to-address-list address-list="${displayMapping[game.link]}-IP-Games" address-list-timeout=1d chain=prerouting comment="${game.name}" dst-address-list=!LOCAL-IP dst-port=${game.ports.udp.join(",")} protocol=udp`,
            );
        }
    });

    return config;
};

export const Firewall = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [
            `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=udp`,
            `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=tcp`,
        ],
    };

    return config;
};

export const ExtraCG = (
    ExtraConfigState: ExtraConfigState,
    DomesticLink: boolean,
): RouterConfig => {
    const configs: RouterConfig[] = [
        BaseExtra(),
        // PublicCert(),
    ];

    // Add conditional configurations
    if (ExtraConfigState.RouterIdentityRomon) {
        configs.push(IdentityRomon(ExtraConfigState.RouterIdentityRomon));
    }

    if (ExtraConfigState.services) {
        configs.push(AccessServices(ExtraConfigState.services));
    }

    if (ExtraConfigState.RUI) {
        configs.push(RUI(ExtraConfigState.RUI));
    }

    if (ExtraConfigState.Games) {
        configs.push(Game(ExtraConfigState.Games, DomesticLink));
    }

    if (ExtraConfigState.usefulServices?.certificate !== undefined) {
        configs.push(PublicCert());
    }

    return mergeMultipleConfigs(...configs);
};
