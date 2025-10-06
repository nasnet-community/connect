import type { VPNServer, VSCredentials, OpenVpnServerConfig } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { mergeRouterConfigs } from "~/components/Star/ConfigGenerator/";
import { CommandShortner } from "~/components/Star/ConfigGenerator/";
import { VSInboundTraffic } from "~/components/Star/ConfigGenerator/";
import { WireguardServerWrapper } from "~/components/Star/ConfigGenerator/";
import { OVPNServerWrapper } from "~/components/Star/ConfigGenerator/";
import { PptpServerWrapper } from "~/components/Star/ConfigGenerator/";
import { L2tpServerWrapper } from "~/components/Star/ConfigGenerator/";
import { SstpServerWrapper } from "~/components/Star/ConfigGenerator/";
import { Ikev2ServerWrapper } from "~/components/Star/ConfigGenerator/";
import { SSHServerWrapper } from "~/components/Star/ConfigGenerator/";



// export const VPNServerWrapper = (vpnServer: VPNServer): RouterConfig => {
//     const configs: RouterConfig[] = [];

//     // Check if VPN Server exists
//     if (!vpnServer) {
//         return {
//             "": ["# No VPN Server configuration provided"],
//         };
//     }

//     const { Users } = vpnServer;
//     if (!Users || Users.length === 0) {
//         return {
//             "": ["# No VPN users configured"],
//         };
//     }

//     // Helper function to add configuration if it exists
//     const addConfig = (config: RouterConfig) => {
//         if (config && Object.keys(config).length > 0) {
//             configs.push(config);
//         }
//     };

//     // Add VPN Server Certificate configuration first (required for certificate-based VPNs)
//     console.log("Generating VPN Server Certificate configuration");
//     addConfig(VPNServerCertificate(vpnServer));

//     // Add VPN Server Binding configuration for supported VPN types (L2TP, PPTP, SSTP, OpenVPN)
//     console.log("Generating VPN Server Binding configuration");
//     addConfig(VPNServerBinding(Users));

//     // Add Inbound Traffic Marking rules for VPN server protocols
//     console.log("Generating VPN Inbound Traffic Marking rules");
//     addConfig(VSInboundTraffic(vpnServer));

//     // Generate WireGuard Server configurations
//     if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
//         console.log("Generating WireGuard server configurations");
//         addConfig(WireguardServerWrapper(vpnServer.WireguardServers, Users));
//     }

//     // Generate OpenVPN Server configuration
//     if (vpnServer.OpenVpnServer && vpnServer.OpenVpnServer.length > 0) {
//         console.log("Generating OpenVPN server configuration");
//         addConfig(OVPNServerWrapper(vpnServer.OpenVpnServer, Users));
//     }

//     // Generate PPTP Server configuration
//     if (vpnServer.PptpServer) {
//         console.log("Generating PPTP server configuration");
//         addConfig(PptpServerWrapper(vpnServer.PptpServer, Users));
//     }

//     // Generate L2TP Server configuration
//     if (vpnServer.L2tpServer) {
//         console.log("Generating L2TP server configuration");
//         addConfig(L2tpServerWrapper(vpnServer.L2tpServer, Users));
//     }

//     // Generate SSTP Server configuration
//     if (vpnServer.SstpServer) {
//         console.log("Generating SSTP server configuration");
//         addConfig(SstpServerWrapper(vpnServer.SstpServer, Users));
//     }

//     // Generate IKEv2 Server configuration
//     if (vpnServer.Ikev2Server) {
//         console.log("Generating IKEv2 server configuration");
//         addConfig(Ikev2ServerWrapper(vpnServer.Ikev2Server, Users));
//     }

//     // Generate SSH Server configuration
//     if (vpnServer.SSHServer) {
//         console.log("Generating SSH server configuration");
//         addConfig(SSHServerWrapper(vpnServer.SSHServer, Users));
//     }

//     // If no VPN protocols are configured, return empty config with message
//     if (configs.length === 0) {
//         return {
//             "": [
//                 "# No VPN server protocols are configured",
//                 "# Available protocols: WireGuard, OpenVPN, PPTP, L2TP, SSTP, IKEv2, SSH",
//             ],
//         };
//     }

//     // Merge all configurations
//     const finalConfig = mergeRouterConfigs(...configs);

//     // Add comprehensive summary comments
//     if (!finalConfig[""]) {
//         finalConfig[""] = [];
//     }

//     // Determine which protocols are configured
//     const configuredProtocols: string[] = [];
//     const protocolStats: { [key: string]: number } = {};

//     if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
//         configuredProtocols.push("WireGuard");
//         const wireguardUsers = Users.filter((user) =>
//             user.VPNType.includes("Wireguard"),
//         );
//         protocolStats["WireGuard"] = wireguardUsers.length;
//     }

//     if (vpnServer.OpenVpnServer) {
//         configuredProtocols.push("OpenVPN");
//         const ovpnUsers = Users.filter((user) =>
//             user.VPNType.includes("OpenVPN"),
//         );
//         protocolStats["OpenVPN"] = ovpnUsers.length;
//     }

//     if (vpnServer.PptpServer) {
//         configuredProtocols.push("PPTP");
//         const pptpUsers = Users.filter((user) => user.VPNType.includes("PPTP"));
//         protocolStats["PPTP"] = pptpUsers.length;
//     }

//     if (vpnServer.L2tpServer) {
//         configuredProtocols.push("L2TP");
//         const l2tpUsers = Users.filter((user) => user.VPNType.includes("L2TP"));
//         protocolStats["L2TP"] = l2tpUsers.length;
//     }

//     if (vpnServer.SstpServer) {
//         configuredProtocols.push("SSTP");
//         const sstpUsers = Users.filter((user) => user.VPNType.includes("SSTP"));
//         protocolStats["SSTP"] = sstpUsers.length;
//     }

//     if (vpnServer.Ikev2Server) {
//         configuredProtocols.push("IKEv2");
//         const ikev2Users = Users.filter((user) =>
//             user.VPNType.includes("IKeV2"),
//         );
//         protocolStats["IKEv2"] = ikev2Users.length;
//     }

//     if (vpnServer.SSHServer) {
//         configuredProtocols.push("SSH");
//         const sshUsers = Users.filter((user) => user.VPNType.includes("SSH"));
//         protocolStats["SSH"] = sshUsers.length;
//     }

//     // Add comprehensive header
//     finalConfig[""].unshift(
//         "# ===============================================",
//         "# VPN Server Complete Configuration",
//         "# ===============================================",
//         `# Total VPN Users: ${Users.length}`,
//         `# Configured Protocols: ${configuredProtocols.join(", ")}`,
//         `# Generated Configurations: ${configs.length}`,
//         "",
//         "# Protocol Statistics:",
//         ...Object.entries(protocolStats).map(
//             ([protocol, count]) => `#   ${protocol}: ${count} users`,
//         ),
//         "",
//         "# Configuration Includes:",
//         "# 1. Certificate management (Let's Encrypt + Private certificates)",
//         "# 2. VPN server interface configurations",
//         "# 3. User authentication and management",
//         "# 4. Firewall rules and network segmentation",
//         "# 5. Address pools and routing configurations",
//         "",
//         "# Network Assignments:",
//         configuredProtocols.includes("WireGuard")
//             ? "#   WireGuard: 192.168.170.0/24"
//             : "",
//         configuredProtocols.includes("OpenVPN")
//             ? "#   OpenVPN: 192.168.60.0/24"
//             : "",
//         configuredProtocols.includes("PPTP") ? "#   PPTP: 192.168.70.0/24" : "",
//         configuredProtocols.includes("L2TP") ? "#   L2TP: 192.168.80.0/24" : "",
//         configuredProtocols.includes("SSTP") ? "#   SSTP: 192.168.90.0/24" : "",
//         configuredProtocols.includes("IKEv2")
//             ? "#   IKEv2: 192.168.77.0/24"
//             : "",
//         configuredProtocols.includes("SSH")
//             ? "#   SSH: Port forwarding via user-defined network"
//             : "",
//         "",
//         "# ===============================================",
//         "",
//     );

//     // Filter out empty comment lines
//     finalConfig[""] = finalConfig[""].filter((line) => line !== "");

//     // Add final summary at the end
//     if (!finalConfig["# Summary"]) {
//         finalConfig["# Summary"] = [];
//     }

//     finalConfig["# Summary"].push(
//         "",
//         "# VPN Server Configuration Summary:",
//         `# Successfully configured ${configuredProtocols.length} VPN protocol(s)`,
//         `# Total user accounts: ${Users.length}`,
//         `# Certificate management: Enabled (Let's Encrypt + Private fallback)`,
//         `# Network segmentation: Enabled with dedicated subnets`,
//         `# Firewall rules: Applied for secure access`,
//         `# User authentication: Configured per protocol requirements`,
//         "",
//         "# Next Steps:",
//         "# 1. Review and apply configuration to router",
//         "# 2. Verify certificate generation and assignment",
//         "# 3. Test VPN connections with configured users",
//         "# 4. Monitor firewall logs for connection attempts",
//         "",
//     );

//     return CommandShortner(finalConfig);
// };

// export const TempOVPNServer = (OpenVpnServerConfig: OpenVpnServerConfig): RouterConfig => {
//     const config: RouterConfig = {
//         "/system script": [],
//         "/system scheduler": [],
//     };

//     const { VPNServer } = state.LAN;

//     if (!VPNServer.OpenVPN) return config;

//     // Generate the script content with proper escaping
//     const scriptContent = `":delay 00:00:30 \\r\\n /ip pool\\r\\
//       \\nadd name=OpenVPN ranges=192.168.60.5-192.168.60.250\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=ca-template common-name=CA organization=NasNet days-valid=3650 key-usage=crl-sign,key-cert-sign\\r\\
//       \\nsign ca-template ca-crl-host=127.0.0.1 name=CA\\r\\
//       \\n:delay 7\\r\\
//       \\nset CA trusted=yes\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=server-template common-name=Server organization=NasNet days-valid=3650 key-usage=digital-signature,key-encipherment,tls-server\\r\\
//       \\nsign server-template ca=CA name=Server\\r\\
//       \\n:delay 7\\r\\
//       \\nset Server trusted=yes\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=client-template common-name=Client organization=NasNet days-valid=3650 key-usage=tls-client\\r\\
//       \\nsign client-template ca=CA name=Client\\r\\
//       \\n:delay 7\\r\\
//       \\nset Client trusted=yes\\r\\
//       \\n\\r\\
//       \\n/ppp profile\\r\\
//       \\nadd dns-server=1.1.1.1 local-address=192.168.60.1 name=VPN-PROFILE remote-address=OpenVPN use-encryption=yes use-ipv6=no\\r\\
//       \\n\\r\\
//       \\n /interface ovpn-server server \\r\\
//       \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
//       disabled name=ovpn-server-tcp port=443 redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
//       \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
//       disabled name=ovpn-server-udp port=4443 protocol=udp redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
//       \\n\\r\\
//       \\n/ppp secret\\r\\
//   ${VPNServer.Users.map((user) => `    \\nadd name=\\"${user.Username}\\" password=\\"${user.Password}\\" profile=VPN-PROFILE service=ovpn\\r\\`).join("")}
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nexport-certificate CA type=pem export-passphrase=\\r\\
//       \\nexport-certificate Client type=pem export-passphrase=\\"${VPNServer.OpenVPNConfig.Passphrase}\\"\\r\\
//       \\n\\r\\
//       \\n/ip firewall address-list\\r\\
//       \\nadd address=192.168.60.0/24 list=VPN-Local \\r\\
//       \\n/ip firewall filter\\r\\
//       \\nadd action=accept chain=input comment=\\"OpenVPN Server udp\\" dst-port=4443 in-interface-list=DOM-WAN protocol=udp \\r\\
//       \\nadd action=accept chain=input comment=\\"OpenVPN Server tcp\\" dst-port=4443 in-interface-list=DOM-WAN protocol=tcp \\r\\
//       \\n\\r\\
//       \\n /system schedule remove [find name=OVPN-Script ] \\r\\n"`;

//     // Add the script to configuration
//     config["/system script"].push(
//         `add dont-require-permissions=no name=OVPN-Script owner=admin\\
//            policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=${scriptContent}`,
//     );

//     // Add scheduler to run script at startup
//     config["/system scheduler"].push(
//         `add interval=00:00:00 name=OVPN-Script on-event="/system script run OVPN-Script" policy=\\
//       ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup`,
//     );

//     return config;
// };

export const VPNServerCertificate = (vpnServer: VPNServer): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Check if any certificate-requiring VPN servers are configured
    const requiresCertificates = !!(
        vpnServer.SstpServer ||
        vpnServer.OpenVpnServer ||
        vpnServer.Ikev2Server
    );

    if (!requiresCertificates) {
        return {
            "": ["# No VPN servers requiring certificates are configured"],
        };
    }

    // Get certificate password from first OpenVPN server if available
    const certPassword =
        vpnServer.OpenVpnServer?.[0]?.Certificate?.CertificateKeyPassphrase ||
        "client-cert-password";

    // Certificate parameters
    const certParams = {
        wanInterfaceName: "ether1", // WAN interface name for CGNAT check
        certNameToRenew: "MikroTik-LE-Cert", // Certificate name for Let's Encrypt
        daysBeforeExpiryToRenew: 30, // Days before expiration to renew certificate
        renewalStartTime: "03:00:00", // Time to start renewal process
        keySize: 2048, // Key size for private certificate
        daysValid: 3650, // Days for certificate validity
        certPassword: certPassword, // Password for exported certificate from OpenVPN config
    };

    // Add certificate-related configurations

    // 1. Check CGNAT configuration (important for Let's Encrypt)
    configs.push(CheckCGNAT(certParams.wanInterfaceName));

    // 2. Generate Let's Encrypt certificate configuration
    configs.push(
        LetsEncrypt(
            certParams.certNameToRenew,
            certParams.daysBeforeExpiryToRenew,
            certParams.renewalStartTime,
        ),
    );

    // 3. Generate private certificate configuration as fallback
    configs.push(PrivateCert(certParams.keySize, certParams.daysValid));

    // 4. Export certificates for client use
    configs.push(ExportCert(certParams.certPassword));

    // 5. Add certificate assignment script for VPN servers
    // Use the private certificate name that matches the PrivateCert function default
    configs.push(AddCert("MikroTik-Private-Cert"));

    // Merge all certificate configurations
    const finalConfig: RouterConfig = {};

    configs.forEach((config) => {
        Object.keys(config).forEach((section) => {
            if (!finalConfig[section]) {
                finalConfig[section] = [];
            }
            finalConfig[section].push(...config[section]);
        });
    });

    // Add informational comments about which VPN servers require certificates
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    // Ensure the /certificate section exists before trying to use unshift
    if (!finalConfig["/certificate"]) {
        finalConfig["/certificate"] = [];
    }

    finalConfig["/certificate"].unshift(
        "# Certificate configuration for VPN servers:",
        vpnServer.SstpServer ? "# - SSTP Server requires certificates" : "",
        vpnServer.OpenVpnServer
            ? "# - OpenVPN Server requires certificates"
            : "",
        vpnServer.Ikev2Server ? "# - IKEv2 Server requires certificates" : "",
        "# Certificate configurations include:",
        "# 1. CGNAT check for Let's Encrypt compatibility",
        "# 2. Let's Encrypt certificate generation",
        "# 3. Private certificate generation as fallback",
        "# 4. Certificate export for client configuration",
        "# 5. Automatic certificate assignment to VPN servers",
        certPassword !== "client-cert-password"
            ? `# Certificate password from OpenVPN config: ${certPassword}`
            : "",
        "",
    );

    // Remove empty comment lines
    finalConfig[""] = finalConfig[""].filter((line) => line !== "");

    return finalConfig;
};

export const VPNServerBinding = (credentials: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface l2tp-server": [],
        "/interface pptp-server": [],
        "/interface sstp-server": [],
        "/interface ovpn-server": [],
        "/interface list member": [],
        "": [],
    };

    if (!credentials || credentials.length === 0) {
        config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ["L2TP", "PPTP", "SSTP", "OpenVPN"];
    const filteredCredentials = credentials.filter((user) =>
        user.VPNType.some((vpnType) => supportedVpnTypes.includes(vpnType)),
    );

    if (filteredCredentials.length === 0) {
        config[""].push(
            "# No users configured for supported VPN binding types (L2TP, PPTP, SSTP, OpenVPN)",
        );
        return config;
    }

    // Group users by VPN type
    const usersByVpnType: { [key: string]: Credentials[] } = {};

    filteredCredentials.forEach((user) => {
        user.VPNType.forEach((vpnType: string) => {
            if (supportedVpnTypes.includes(vpnType)) {
                if (!usersByVpnType[vpnType]) {
                    usersByVpnType[vpnType] = [];
                }
                usersByVpnType[vpnType].push(user);
            }
        });
    });

    // Add general comments
    config[""].push(
        "# VPN Server Binding Configuration",
        `# Total users: ${filteredCredentials.length}`,
        `# Supported VPN types: ${Object.keys(usersByVpnType).join(", ")}`,
        "# Each binding interface is added to LAN and VPN-LAN interface lists for proper network management",
        "",
    );

    // Keep track of created interfaces for interface list membership
    const createdInterfaces: string[] = [];

    // L2TP Static Interface Bindings
    if (usersByVpnType["L2TP"]) {
        config[""].push("# L2TP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each L2TP user for advanced firewall/queue rules",
        );

        usersByVpnType["L2TP"].forEach((user) => {
            const staticBindingName = `l2tp-${user.Username}`;

            config["/interface l2tp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // PPTP Static Interface Bindings
    if (usersByVpnType["PPTP"]) {
        config[""].push("# PPTP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each PPTP user for advanced firewall/queue rules",
        );

        usersByVpnType["PPTP"].forEach((user) => {
            const staticBindingName = `pptp-${user.Username}`;

            config["/interface pptp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // SSTP Static Interface Bindings
    if (usersByVpnType["SSTP"]) {
        config[""].push("# SSTP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each SSTP user for advanced firewall/queue rules",
        );

        usersByVpnType["SSTP"].forEach((user) => {
            const staticBindingName = `sstp-${user.Username}`;

            config["/interface sstp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // OpenVPN Static Interface Bindings
    if (usersByVpnType["OpenVPN"]) {
        config[""].push("# OpenVPN Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each OpenVPN user for advanced firewall/queue rules",
        );

        usersByVpnType["OpenVPN"].forEach((user) => {
            const staticBindingName = `ovpn-${user.Username}`;

            config["/interface ovpn-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // Add all created interfaces to LAN and VPN-LAN interface lists
    if (createdInterfaces.length > 0) {
        config[""].push("# Adding VPN binding interfaces to interface lists");
        config[""].push(
            "# This enables proper network segmentation and management",
        );

        createdInterfaces.forEach((interfaceName) => {
            // Add to LAN interface list
            config["/interface list member"].push(
                `add interface="${interfaceName}" list="LAN" comment="VPN binding interface for network management"`,
            );

            // Add to VPN-LAN interface list
            config["/interface list member"].push(
                `add interface="${interfaceName}" list="VPN-LAN" comment="VPN binding interface for VPN-specific rules"`,
            );
        });
        config[""].push("");
    }

    // Advanced Binding Information
    config[""].push("# Static Interface Binding Benefits:");
    config[""].push("# 1. Predictable interface names for firewall rules");
    config[""].push("# 2. Per-user queue management capabilities");
    config[""].push("# 3. Individual user traffic monitoring");
    config[""].push("# 4. User-specific interface list assignments");
    config[""].push("# 5. Proper network segmentation through interface lists");
    config[""].push("# 6. Simplified management via LAN and VPN-LAN lists");
    config[""].push("");
    config[""].push(
        "# Note: Users must still be configured in /ppp secret for authentication",
    );
    config[""].push("");

    // Summary
    config[""].push("# VPN Server Binding Summary:");
    Object.entries(usersByVpnType).forEach(([vpnType, users]) => {
        config[""].push(
            `# ${vpnType}: ${users.length} users - ${users.map((u) => u.Username).join(", ")}`,
        );
    });

    if (createdInterfaces.length > 0) {
        config[""].push("");
        config[""].push("# Interface List Memberships:");
        config[""].push(
            `# ${createdInterfaces.length} interfaces added to both LAN and VPN-LAN lists`,
        );
        config[""].push(`# Interface names: ${createdInterfaces.join(", ")}`);
    }

    return config;
};

// export const VPNServerUsersWrapper = (
//     credentials: Credentials[],
//     vpnServer: VPNServer,
// ): RouterConfig => {
//     const configs: RouterConfig[] = [];

//     // Helper function to add configuration if it exists
//     const addConfig = (routerConfig: RouterConfig) => {
//         if (routerConfig && Object.keys(routerConfig).length > 0) {
//             configs.push(routerConfig);
//         }
//     };

//     // Always include VPN Server Certificate configuration
//     console.log("Generating VPN Server Certificate configuration");
//     addConfig(VPNServerCertificate(vpnServer));

//     // Always include VPN Server Binding configuration
//     console.log("Generating VPN Server Binding configuration");
//     addConfig(VPNServerBinding(credentials));

//     // Check which VPN types are used by the users
//     const usedVpnTypes = [
//         ...new Set(credentials.flatMap((user) => user.VPNType)),
//     ];

//     if (usedVpnTypes.length === 0) {
//         return {
//             "": [
//                 "# No VPN types found in user credentials",
//                 "# VPN Server Certificate and Binding configurations included above",
//             ],
//         };
//     }

//     // Generate user configurations for each used VPN protocol
//     if (
//         usedVpnTypes.includes("Wireguard") &&
//         vpnServer.WireguardServers &&
//         vpnServer.WireguardServers.length > 0
//     ) {
//         console.log("Generating WireGuard users configuration");
//         vpnServer.WireguardServers.forEach((wireguardConfig) => {
//             if (wireguardConfig.Interface) {
//                 addConfig(
//                     WireguardServerUsers(
//                         wireguardConfig.Interface,
//                         credentials,
//                     ),
//                 );
//             }
//         });
//     }

//     if (usedVpnTypes.includes("OpenVPN")) {
//         console.log("Generating OpenVPN users configuration");
//         addConfig(OVPNServerUsers(credentials));
//     }

//     if (usedVpnTypes.includes("PPTP")) {
//         console.log("Generating PPTP users configuration");
//         addConfig(PptpServerUsers(credentials));
//     }

//     if (usedVpnTypes.includes("L2TP")) {
//         console.log("Generating L2TP users configuration");
//         addConfig(L2tpServerUsers(credentials));
//     }

//     if (usedVpnTypes.includes("SSTP")) {
//         console.log("Generating SSTP users configuration");
//         addConfig(SstpServerUsers(credentials));
//     }

//     if (usedVpnTypes.includes("IKeV2")) {
//         console.log("Generating IKEv2 users configuration");
//         addConfig(Ikev2ServerUsers(credentials, vpnServer.Ikev2Server));
//     }

//     // If no valid configurations were generated, return minimal config
//     if (configs.length === 0) {
//         return {
//             "": [
//                 "# No VPN server configurations generated",
//                 `# Users configured for: ${usedVpnTypes.join(", ")}`,
//                 "# Check VPN server interface configurations",
//             ],
//         };
//     }

//     // Merge all configurations
//     const finalConfig = mergeRouterConfigs(...configs);

//     // Add summary comments
//     if (!finalConfig[""]) {
//         finalConfig[""] = [];
//     }

//     finalConfig[""].unshift(
//         "# VPN Server Users Configuration Summary:",
//         `# Total users: ${credentials.length}`,
//         `# Used VPN types: ${usedVpnTypes.join(", ")}`,
//         `# Generated configurations: ${configs.length}`,
//         "",
//     );

//     // Add user breakdown by VPN type
//     usedVpnTypes.forEach((vpnType) => {
//         const userCount = credentials.filter((user) =>
//             user.VPNType.includes(vpnType),
//         ).length;
//         const usernames = credentials
//             .filter((user) => user.VPNType.includes(vpnType))
//             .map((user) => user.Username)
//             .join(", ");
//         finalConfig[""].push(`# ${vpnType}: ${userCount} users (${usernames})`);
//     });

//     finalConfig[""].push("");

//     return CommandShortner(finalConfig);
// };

// export const VPNServerInterfaceWrapper = (config: VPNServer): RouterConfig => {
//     const configs: RouterConfig[] = [];

//     // Helper function to add configuration if it exists
//     const addConfig = (routerConfig: RouterConfig) => {
//         if (routerConfig && Object.keys(routerConfig).length > 0) {
//             configs.push(routerConfig);
//         }
//     };

//     // Check and generate WireGuard Server Interfaces
//     if (config.WireguardServers && config.WireguardServers.length > 0) {
//         config.WireguardServers.forEach((wireguardConfig) => {
//             if (wireguardConfig.Interface) {
//                 console.log(
//                     "Generating WireGuard server interface configuration",
//                 );
//                 addConfig(WireguardServer(wireguardConfig.Interface));
//             }
//         });
//     }

//     // Check and generate OpenVPN Server Interface
//     if (config.OpenVpnServer && config.OpenVpnServer.length > 0) {
//         console.log("Generating OpenVPN server interface configuration");
//         config.OpenVpnServer.forEach((ovpnConfig) => {
//             addConfig(OVPNServer(ovpnConfig));
//         });
//     }

//     // Check and generate PPTP Server Interface
//     if (config.PptpServer) {
//         console.log("Generating PPTP server interface configuration");
//         addConfig(PptpServer(config.PptpServer));
//     }

//     // Check and generate L2TP Server Interface
//     if (config.L2tpServer) {
//         console.log("Generating L2TP server interface configuration");
//         addConfig(L2tpServer(config.L2tpServer));
//     }

//     // Check and generate SSTP Server Interface
//     if (config.SstpServer) {
//         console.log("Generating SSTP server interface configuration");
//         addConfig(SstpServer(config.SstpServer));
//     }

//     // Check and generate IKEv2 Server Interface
//     if (config.Ikev2Server) {
//         console.log("Generating IKEv2 server interface configuration");
//         addConfig(Ikev2Server(config.Ikev2Server));
//     }

//     // If no VPN protocols are configured, return empty config with message
//     if (configs.length === 0) {
//         return {
//             "": ["# No VPN server protocols are configured"],
//         };
//     }

//     // Merge all interface configurations
//     const finalConfig = mergeRouterConfigs(...configs);

//     // Add summary comments
//     if (!finalConfig[""]) {
//         finalConfig[""] = [];
//     }

//     const configuredProtocols: string[] = [];
//     if (config.WireguardServers && config.WireguardServers.length > 0)
//         configuredProtocols.push("Wireguard");
//     if (config.OpenVpnServer) configuredProtocols.push("OpenVPN");
//     if (config.PptpServer) configuredProtocols.push("PPTP");
//     if (config.L2tpServer) configuredProtocols.push("L2TP");
//     if (config.SstpServer) configuredProtocols.push("SSTP");
//     if (config.Ikev2Server) configuredProtocols.push("IKEv2");

//     // finalConfig[""].unshift(
//     //     "# VPN Server Interface Configuration Summary:",
//     //     `# Configured protocols: ${configuredProtocols.join(', ')}`,
//     //     `# Total configurations: ${configs.length}`,
//     //     ""
//     // );

//     return CommandShortner(finalConfig);
// };
