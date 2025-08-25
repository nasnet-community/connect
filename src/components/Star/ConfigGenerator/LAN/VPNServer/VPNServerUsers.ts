import type { RouterConfig } from "../../ConfigGenerator";
import type {
  Credentials,
  WireguardInterfaceConfig,
  VPNServer,
} from "../../../StarContext/Utils/VPNServerType";
import {
  CheckCGNAT,
  LetsEncrypt,
  PrivateCert,
  ExportCert,
  AddCert,
} from "../../utils/Certificate";
// import { OneTimeScript } from "../../utils/ScriptSchedule";
import {
  CommandShortner,
  mergeRouterConfigs,
} from "../../utils/ConfigGeneratorUtil";
import { WireguardPeerAddress } from "./VPNServerUtil";

// VPN Server Utils

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
    vpnServer.OpenVpnServer ? "# - OpenVPN Server requires certificates" : "",
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

export const VPNServerBinding = (credentials: Credentials[]): RouterConfig => {
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

// Wireguard Server Users

export const WireguardServerUsers = (
  serverConfig: WireguardInterfaceConfig,
  users: Credentials[],
): RouterConfig => {
  const config: RouterConfig = {
    "/interface wireguard peers": [],
  };

  if (!serverConfig.InterfaceAddress) {
    config["/interface wireguard peers"].push(
      "# Error: Server interface address is required to generate client peers",
    );
    return config;
  }

  // Extract network info from server address
  const [serverIP, prefixStr] = serverConfig.InterfaceAddress.split("/");
  const prefix = parseInt(prefixStr || "24");
  console.log(prefix);
  const baseNetwork = serverIP.split(".").slice(0, 3).join(".");

  // Filter users who have Wireguard in their VPNType array
  const wireguardUsers = users.filter((user) =>
    user.VPNType.includes("Wireguard"),
  );

  wireguardUsers.forEach((user, index) => {
    const clientIP = `${baseNetwork}.${index + 2}`;
    const clientAddress = `${clientIP}/32`;

    const peerParams: string[] = [
      `interface=${serverConfig.Name}`,
      `name="${user.Username}"`,
      `allowed-address=0.0.0.0/0`,
      `client-address=${clientAddress}`,
      `client-dns=${serverIP}`,
      `client-endpoint=""`,
      `client-keepalive=25s`,
      `client-listen-port=${serverConfig.ListenPort || 13231}`,
      `persistent-keepalive=25s`,
      `preshared-key=auto`,
      `private-key=auto`,
      `responder=yes`,
    ];

    config["/interface wireguard peers"].push(`add ${peerParams.join(" ")}`);
  });

  if (wireguardUsers.length === 0) {
    config["/interface wireguard peers"].push(
      "# No users configured for WireGuard VPN",
    );
    return CommandShortner(config);
  }

  // Generate WireGuard peer address update script
  const peerAddressScript = WireguardPeerAddress(
    serverConfig.Name,
    `WG-Peer-Update-${serverConfig.Name}`,
    "startup",
  );

  // Merge the peer configuration with the address update script
  const finalConfig = mergeRouterConfigs(config, peerAddressScript);

  return CommandShortner(finalConfig);
};

// OpenVPN Server Users

export const OVPNServerUsers = (users: Credentials[]): RouterConfig => {
  const config: RouterConfig = {
    "/ppp secret": [],
  };

  // Filter users who have OpenVPN in their VPNType array
  const ovpnUsers = users.filter((user) => user.VPNType.includes("OpenVPN"));

  ovpnUsers.forEach((user) => {
    const secretParams: string[] = [
      `name="${user.Username}"`,
      `password="${user.Password}"`,
      "profile=ovpn-profile",
      "service=ovpn",
    ];

    config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
  });

  if (ovpnUsers.length === 0) {
    config["/ppp secret"].push("# No users configured for OpenVPN");
  }

  return CommandShortner(config);
};

// PPTP Server Users

export const PptpServerUsers = (users: Credentials[]): RouterConfig => {
  const config: RouterConfig = {
    "/ppp secret": [],
  };

  // Filter users who have PPTP in their VPNType array
  const pptpUsers = users.filter((user) => user.VPNType.includes("PPTP"));

  pptpUsers.forEach((user) => {
    const secretParams: string[] = [
      `name="${user.Username}"`,
      `password="${user.Password}"`,
      "profile=pptp-profile",
      "service=pptp",
    ];

    config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
  });

  if (pptpUsers.length === 0) {
    config["/ppp secret"].push("# No users configured for PPTP");
  }

  return CommandShortner(config);
};

// L2TP Server Users

export const L2tpServerUsers = (users: Credentials[]): RouterConfig => {
  const config: RouterConfig = {
    "/ppp secret": [],
  };

  // Filter users who have L2TP in their VPNType array
  const l2tpUsers = users.filter((user) => user.VPNType.includes("L2TP"));

  l2tpUsers.forEach((user) => {
    const secretParams: string[] = [
      `name="${user.Username}"`,
      `password="${user.Password}"`,
      "profile=l2tp-profile",
      "service=l2tp",
    ];

    config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
  });

  if (l2tpUsers.length === 0) {
    config["/ppp secret"].push("# No users configured for L2TP");
  }

  return CommandShortner(config);
};

// SSTP Server Users

export const SstpServerUsers = (users: Credentials[]): RouterConfig => {
  const config: RouterConfig = {
    "/ppp secret": [],
  };

  // Filter users who have SSTP in their VPNType array
  const sstpUsers = users.filter((user) => user.VPNType.includes("SSTP"));

  sstpUsers.forEach((user) => {
    const secretParams: string[] = [
      `name="${user.Username}"`,
      `password="${user.Password}"`,
      "profile=sstp-profile",
      "service=sstp",
    ];

    config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
  });

  if (sstpUsers.length === 0) {
    config["/ppp secret"].push("# No users configured for SSTP");
  }

  return CommandShortner(config);
};

// IKEv2 Server Users

export const Ikev2ServerUsers = (
  users: Credentials[],
  ikev2Config?: any,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip ipsec identity": [],
    "/ip ipsec mode-config": [],
    "": [],
  };

  // Filter users who have IKeV2 in their VPNType array
  const ikev2Users = users.filter((user) => user.VPNType.includes("IKeV2"));

  if (ikev2Users.length === 0) {
    config[""].push("# No users configured for IKEv2");
    return CommandShortner(config);
  }

  // Configure IKEv2 users with pre-shared key authentication
  config[""].push(
    "# IKEv2 User Configuration with Pre-Shared Key Authentication",
    "# Each user gets individual IPsec identity and mode-config",
    "",
  );

  // Get configuration from ikev2Config or use defaults
  const peerName = ikev2Config?.peer?.name || "ike2";
  const authMethod = ikev2Config?.identities?.authMethod || "pre-shared-key";
  const generatePolicy =
    ikev2Config?.identities?.generatePolicy || "port-strict";
  const policyTemplateGroup =
    ikev2Config?.identities?.policyTemplateGroup || "ike2-policies";

  // Create individual mode-config for each user with specific IP assignment
  config[""].push("# Individual mode-config for specific user IP assignments");
  ikev2Users.forEach((user, index) => {
    const userIP = `192.168.77.${index + 10}`;
    config["/ip ipsec mode-config"].push(
      `add address=${userIP} address-prefix-length=32 name=ikev2-${user.Username} responder=yes static-dns=1.1.1.1,8.8.8.8 system-dns=no `,
    );
  });

  config[""].push("");

  // Create IPsec identities for each user based on auth method
  config[""].push(
    `# IPsec identities for individual user authentication (${authMethod})`,
  );
  ikev2Users.forEach((user) => {
    const identityParams: string[] = [
      `peer=${peerName}`,
      `auth-method=${authMethod}`,
    ];

    // Add authentication-specific parameters
    if (authMethod === "pre-shared-key") {
      const secret = ikev2Config?.identities?.secret || user.Password;
      identityParams.push(`secret="${secret}"`);
    } else if (authMethod === "digital-signature") {
      const certificate = ikev2Config?.identities?.certificate || "server1";
      identityParams.push(`certificate=${certificate}`);
    }

    // Add standard parameters
    identityParams.push(`generate-policy=${generatePolicy}`);
    identityParams.push(`mode-config=ikev2-${user.Username}`);
    identityParams.push(`policy-template-group=${policyTemplateGroup}`);
    identityParams.push(`my-id=user-fqdn:${user.Username}@ikev2.local`);
    identityParams.push(`remote-id=ignore`);
    identityParams.push(`comment="Identity for ${user.Username}"`);

    config["/ip ipsec identity"].push(`add ${identityParams.join(" ")}`);
  });

  // Add summary information
  config[""].push("");
  config[""].push("# IKEv2 User Configuration Summary:");
  config[""].push(`# Total IKEv2 users: ${ikev2Users.length}`);
  config[""].push(`# Authentication method: ${authMethod}`);
  config[""].push(`# Peer name: ${peerName}`);
  config[""].push("# Each user has individual IP assignment and identity");
  config[""].push("");
  config[""].push("# IKEv2 Users:");
  ikev2Users.forEach((user, index) => {
    const userIP = `192.168.77.${index + 10}`;
    if (authMethod === "pre-shared-key") {
      const secret = ikev2Config?.identities?.secret || user.Password;
      config[""].push(`#   ${user.Username} - IP: ${userIP} - PSK: ${secret}`);
    } else {
      config[""].push(`#   ${user.Username} - IP: ${userIP}`);
    }
  });

  config[""].push("");
  config[""].push("# Client Configuration Instructions:");
  config[""].push(
    "# 1. Set server address to your router's public IP or DDNS name",
  );
  config[""].push(`# 2. Use ${authMethod} authentication`);
  config[""].push(
    "# 3. Set user identity to: user@ikev2.local (e.g., user1@ikev2.local)",
  );
  if (authMethod === "pre-shared-key") {
    config[""].push("# 4. Use the corresponding user password as PSK");
  } else if (authMethod === "digital-signature") {
    config[""].push("# 4. Install the appropriate client certificate");
  }
  config[""].push("");
  config[""].push(
    `# Note: This configuration uses ${authMethod} authentication`,
  );

  return CommandShortner(config);
};

// VPN Server Users Wrapper

export const VPNServerUsersWrapper = (
  credentials: Credentials[],
  vpnServer: VPNServer,
): RouterConfig => {
  const configs: RouterConfig[] = [];

  // Helper function to add configuration if it exists
  const addConfig = (routerConfig: RouterConfig) => {
    if (routerConfig && Object.keys(routerConfig).length > 0) {
      configs.push(routerConfig);
    }
  };

  // Always include VPN Server Certificate configuration
  console.log("Generating VPN Server Certificate configuration");
  addConfig(VPNServerCertificate(vpnServer));

  // Always include VPN Server Binding configuration
  console.log("Generating VPN Server Binding configuration");
  addConfig(VPNServerBinding(credentials));

  // Check which VPN types are used by the users
  const usedVpnTypes = [
    ...new Set(credentials.flatMap((user) => user.VPNType)),
  ];

  if (usedVpnTypes.length === 0) {
    return {
      "": [
        "# No VPN types found in user credentials",
        "# VPN Server Certificate and Binding configurations included above",
      ],
    };
  }

  // Generate user configurations for each used VPN protocol
  if (
    usedVpnTypes.includes("Wireguard") &&
    vpnServer.WireguardServers &&
    vpnServer.WireguardServers.length > 0
  ) {
    console.log("Generating WireGuard users configuration");
    vpnServer.WireguardServers.forEach((wireguardConfig) => {
      if (wireguardConfig.Interface) {
        addConfig(WireguardServerUsers(wireguardConfig.Interface, credentials));
      }
    });
  }

  if (usedVpnTypes.includes("OpenVPN")) {
    console.log("Generating OpenVPN users configuration");
    addConfig(OVPNServerUsers(credentials));
  }

  if (usedVpnTypes.includes("PPTP")) {
    console.log("Generating PPTP users configuration");
    addConfig(PptpServerUsers(credentials));
  }

  if (usedVpnTypes.includes("L2TP")) {
    console.log("Generating L2TP users configuration");
    addConfig(L2tpServerUsers(credentials));
  }

  if (usedVpnTypes.includes("SSTP")) {
    console.log("Generating SSTP users configuration");
    addConfig(SstpServerUsers(credentials));
  }

  if (usedVpnTypes.includes("IKeV2")) {
    console.log("Generating IKEv2 users configuration");
    addConfig(Ikev2ServerUsers(credentials, vpnServer.Ikev2Server));
  }

  // If no valid configurations were generated, return minimal config
  if (configs.length === 0) {
    return {
      "": [
        "# No VPN server configurations generated",
        `# Users configured for: ${usedVpnTypes.join(", ")}`,
        "# Check VPN server interface configurations",
      ],
    };
  }

  // Merge all configurations
  const finalConfig = mergeRouterConfigs(...configs);

  // Add summary comments
  if (!finalConfig[""]) {
    finalConfig[""] = [];
  }

  finalConfig[""].unshift(
    "# VPN Server Users Configuration Summary:",
    `# Total users: ${credentials.length}`,
    `# Used VPN types: ${usedVpnTypes.join(", ")}`,
    `# Generated configurations: ${configs.length}`,
    "",
  );

  // Add user breakdown by VPN type
  usedVpnTypes.forEach((vpnType) => {
    const userCount = credentials.filter((user) =>
      user.VPNType.includes(vpnType),
    ).length;
    const usernames = credentials
      .filter((user) => user.VPNType.includes(vpnType))
      .map((user) => user.Username)
      .join(", ");
    finalConfig[""].push(`# ${vpnType}: ${userCount} users (${usernames})`);
  });

  finalConfig[""].push("");

  return CommandShortner(finalConfig);
};
