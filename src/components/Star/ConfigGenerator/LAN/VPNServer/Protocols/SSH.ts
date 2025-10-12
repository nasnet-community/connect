import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type {
    SSHServerConfig,
    VSCredentials,
    VSNetwork
} from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";


export const SSHServer = (config: SSHServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip ssh": [
            "set forwarding-enabled=both"
        ],
    };

    return routerConfig;
};


export const SSHServerUsers = ( users: VSCredentials[], _config?: SSHServerConfig ): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/user group": [],
        "/user": [],
    };

    // Filter users that have SSH in their VPNType array
    const sshUsers = users.filter((user) =>
        user.VPNType.includes("SSH")
    );

    // Only add group if there are SSH users
    if (sshUsers.length === 0) {
        return {};
    }

    // Create SSH user group with SSH-only permissions
    routerConfig["/user group"].push(
        `add name=SSH policy="ssh,!local,!telnet,!ftp,!reboot,!read,!write,!policy,!test,!winbox,!password,!web,!sniff,!sensitive,!api,!romon,!rest-api" \\
    comment="SSH Server Users Group - SSH access only"`
    );

    // Add each SSH user
    sshUsers.forEach((user) => {
        routerConfig["/user"].push(
            `add group=SSH inactivity-timeout=1d name="${user.Username}" password="${user.Password}" \\
    comment="SSH Server User - ${user.Username}"`
        );
    });

    return routerConfig;
};

export const SSHServerFirewall = ( config: SSHServerConfig ): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip firewall mangle": [],
        "/ip firewall raw": [],
    };

    // Map network types to bridge/interface names
    const networkToBridge: Record<VSNetwork, string> = {
        "VPN": "LANBridgeVPN",
        "Domestic": "LANBridgeDOM",
        "Foreign": "LANBridgeFRN",
        "Split": "LANBridgeSplit",
    };

    const bridgeInterface = networkToBridge[config.Network!];

    // Mangle rules for connection marking and routing
    routerConfig["/ip firewall mangle"].push(
        "",
        "# SSH Server - Mark incoming SSH connections",
        `add action=mark-connection chain=input comment="Mark incoming SSH connections from ${config.Network} Network" \\
    connection-state=new dst-port=22 in-interface=${bridgeInterface} \\
    new-connection-mark=ssh-conn-foreign passthrough=yes protocol=tcp`
    );

    routerConfig["/ip firewall mangle"].push(
        "",
        "# SSH Server - Route SSH traffic via Foreign WAN",
        `add action=mark-routing chain=forward comment="Route SSH traffic via Foreign WAN" \\
    connection-mark=ssh-conn-foreign new-routing-mark=to-FRN passthrough=no`,
        `add action=mark-routing chain=output comment="Route SSH replies via Foreign WAN" \\
    connection-mark=ssh-conn-foreign new-routing-mark=to-FRN passthrough=no`
    );

    // Raw rules for auto-tracking SSH clients
    routerConfig["/ip firewall raw"].push(
        "",
        "# SSH Server - Auto-add SSH clients to foreign routing list",
        `add action=add-src-to-address-list address-list=ssh-foreign-clients \\
    address-list-timeout=8h chain=prerouting comment="Auto-add SSH clients to foreign routing" \\
    connection-state=new dst-port=22 in-interface=${bridgeInterface} protocol=tcp`
    );

    return routerConfig;
};

export const SSHServerWrapper = ( serverConfig: SSHServerConfig, users: VSCredentials[] ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Add base SSH server configuration
    configs.push(SSHServer(serverConfig));

    // Add SSH users if any
    if (users.length > 0) {
        configs.push(SSHServerUsers(users, serverConfig));
    }

    // Add SSH firewall rules
    configs.push(SSHServerFirewall(serverConfig));

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

