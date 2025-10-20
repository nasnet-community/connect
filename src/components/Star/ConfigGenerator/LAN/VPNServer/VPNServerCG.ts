import type { VPNServer, VPNServerSubnets, RouterModels } from "~/components/Star/StarContext";

import { 
    type RouterConfig,
    WireguardServerWrapper,
    OVPNServerWrapper,
    PptpServerWrapper,
    L2tpServerWrapper,
    SstpServerWrapper,
    Ikev2ServerWrapper,
    SSHServerWrapper,
    Scoks5ServerWrapper,
    WebProxyServerWrapper,
    ZeroTierServerWrapper,
    BTHServerWrapper,
    CheckCGNAT,
    LetsEncrypt,
    PrivateCert,
    ExportCert,
    AddCert,
    mergeRouterConfigs,
    CommandShortner,
    VSInboundTraffic,
} from "~/components/Star/ConfigGenerator/";

// Helper function to check if master router is CHR
const isMasterCHR = (routerModels?: RouterModels[]): boolean => {
    if (!routerModels) return false;
    const masterRouter = routerModels.find(r => r.isMaster);
    return masterRouter?.isCHR === true;
};





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


export const VPNServerWrapper = ( vpnServer: VPNServer, subnetConfigs: VPNServerSubnets, routerModels?: RouterModels[] ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const enabledServers: string[] = [];

    // Extract users from VPN server configuration
    const users = vpnServer.Users;

    // 1. PPTP Server
    if (vpnServer.PptpServer?.enabled) {
        configs.push(
            PptpServerWrapper(
                vpnServer.PptpServer,
                users,
                subnetConfigs.PPTP
            )
        );
        enabledServers.push("PPTP");
    }

    // 2. L2TP Server
    if (vpnServer.L2tpServer?.enabled) {
        configs.push(
            L2tpServerWrapper(
                vpnServer.L2tpServer,
                users,
                subnetConfigs.L2TP
            )
        );
        enabledServers.push("L2TP");
    }

    // 3. SSTP Server
    if (vpnServer.SstpServer?.enabled) {
        configs.push(
            SstpServerWrapper(
                vpnServer.SstpServer,
                users,
                subnetConfigs.SSTP
            )
        );
        enabledServers.push("SSTP");
    }

    // 4. IKEv2 Server
    if (vpnServer.Ikev2Server) {
        configs.push(
            Ikev2ServerWrapper(
                vpnServer.Ikev2Server,
                users,
                subnetConfigs.IKev2
            )
        );
        enabledServers.push("IKEv2");
    }

    // 5. OpenVPN Server(s)
    if (vpnServer.OpenVpnServer && vpnServer.OpenVpnServer.length > 0) {
        const enabledOvpnServers = vpnServer.OpenVpnServer.filter(
            (server) => server.enabled
        );
        if (enabledOvpnServers.length > 0) {
            configs.push(
                OVPNServerWrapper(
                    enabledOvpnServers,
                    users,
                    subnetConfigs.OpenVPN || []
                )
            );
            enabledServers.push(`OpenVPN (${enabledOvpnServers.length} servers)`);
        }
    }

    // 6. WireGuard Server(s)
    if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        configs.push(
            WireguardServerWrapper(
                vpnServer.WireguardServers,
                users,
                subnetConfigs.Wireguard || []
            )
        );
        enabledServers.push(`WireGuard (${vpnServer.WireguardServers.length} servers)`);
    }

    // 7. SSH Server
    if (vpnServer.SSHServer?.enabled) {
        configs.push(
            SSHServerWrapper(vpnServer.SSHServer, users)
        );
        enabledServers.push("SSH");
    }

    // 8. Socks5 Server
    if (vpnServer.Socks5Server?.enabled) {
        configs.push(Scoks5ServerWrapper());
        enabledServers.push("Socks5");
    }

    // 9. HTTP Proxy Server
    if (vpnServer.HTTPProxyServer?.enabled) {
        configs.push(WebProxyServerWrapper());
        enabledServers.push("HTTP Proxy");
    }

    // 10. ZeroTier Server
    if (vpnServer.ZeroTierServer?.enabled) {
        configs.push(ZeroTierServerWrapper());
        enabledServers.push("ZeroTier");
    }

    // 11. Back-to-Home VPN - skip if master is CHR
    if (vpnServer.BackToHomeServer?.enabled && !isMasterCHR(routerModels)) {
        configs.push(BTHServerWrapper());
        enabledServers.push("Back-to-Home");
    }

    // 12. VPN Inbound Traffic Management
    configs.push(VSInboundTraffic(vpnServer));

    // If no VPN servers are enabled, return empty configuration
    if (enabledServers.length === 0) {
        return {
            "": [
                "# No VPN servers configured",
                "# Enable at least one VPN server in your configuration"
            ],
        };
    }

    // Merge all VPN server configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary header
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    return CommandShortner(finalConfig);
};



