import type { RouterConfig } from "../../ConfigGenerator";
import type { VPNServer } from "../../../StarContext/Utils/VPNServerType";
import { CommandShortner, mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil";
import {
    WireguardServer,
    OVPNServer,
    PptpServer,
    L2tpServer,
    SstpServer,
    Ikev2Server,
} from "./Protocols";


export const VPNServerInterfaceWrapper = (config: VPNServer): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Helper function to add configuration if it exists
    const addConfig = (routerConfig: RouterConfig) => {
        if (routerConfig && Object.keys(routerConfig).length > 0) {
            configs.push(routerConfig);
        }
    };

    // Check and generate WireGuard Server Interfaces
    if (config.WireguardServers && config.WireguardServers.length > 0) {
        config.WireguardServers.forEach((wireguardConfig) => {
            if (wireguardConfig.Interface) {
                console.log(
                    "Generating WireGuard server interface configuration",
                );
                addConfig(WireguardServer(wireguardConfig.Interface));
            }
        });
    }

    // Check and generate OpenVPN Server Interface
    if (config.OpenVpnServer && config.OpenVpnServer.length > 0) {
        console.log("Generating OpenVPN server interface configuration");
        config.OpenVpnServer.forEach((ovpnConfig) => {
            addConfig(OVPNServer(ovpnConfig));
        });
    }

    // Check and generate PPTP Server Interface
    if (config.PptpServer) {
        console.log("Generating PPTP server interface configuration");
        addConfig(PptpServer(config.PptpServer));
    }

    // Check and generate L2TP Server Interface
    if (config.L2tpServer) {
        console.log("Generating L2TP server interface configuration");
        addConfig(L2tpServer(config.L2tpServer));
    }

    // Check and generate SSTP Server Interface
    if (config.SstpServer) {
        console.log("Generating SSTP server interface configuration");
        addConfig(SstpServer(config.SstpServer));
    }

    // Check and generate IKEv2 Server Interface
    if (config.Ikev2Server) {
        console.log("Generating IKEv2 server interface configuration");
        addConfig(Ikev2Server(config.Ikev2Server));
    }

    // If no VPN protocols are configured, return empty config with message
    if (configs.length === 0) {
        return {
            "": ["# No VPN server protocols are configured"],
        };
    }

    // Merge all interface configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const configuredProtocols: string[] = [];
    if (config.WireguardServers && config.WireguardServers.length > 0)
        configuredProtocols.push("Wireguard");
    if (config.OpenVpnServer) configuredProtocols.push("OpenVPN");
    if (config.PptpServer) configuredProtocols.push("PPTP");
    if (config.L2tpServer) configuredProtocols.push("L2TP");
    if (config.SstpServer) configuredProtocols.push("SSTP");
    if (config.Ikev2Server) configuredProtocols.push("IKEv2");

    // finalConfig[""].unshift(
    //     "# VPN Server Interface Configuration Summary:",
    //     `# Configured protocols: ${configuredProtocols.join(', ')}`,
    //     `# Total configurations: ${configs.length}`,
    //     ""
    // );

    return CommandShortner(finalConfig);
};
