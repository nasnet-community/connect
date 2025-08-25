import type { RouterConfig } from "../../ConfigGenerator";
import type {
  PptpServerConfig,
  L2tpServerConfig,
  SstpServerConfig,
  OpenVpnServerConfig,
  Ikev2ServerConfig,
  WireguardInterfaceConfig,
  // WireguardServerConfig,
  VPNServer,
} from "../../../StarContext/Utils/VPNServerType";
import {
  formatBooleanValue,
  formatArrayValue,
  generateIPPool,
  type IPPoolConfig,
} from "./VPNServerUtil";
import { calculateNetworkAddress } from "../../utils/IPAddress";
import {
  CommandShortner,
  mergeRouterConfigs,
} from "../../utils/ConfigGeneratorUtil";

// Wireguard Server

export const WireguardServer = (
  WireguardInterfaceConfig: WireguardInterfaceConfig,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface wireguard": [],
    "/ip address": [],
    "/interface list member": [],
    "/ip firewall address-list": [],
    "/ip firewall filter": [],
  };

  const {
    Name,
    PrivateKey,
    InterfaceAddress,
    ListenPort = 13231,
    Mtu = 1420,
  } = WireguardInterfaceConfig;

  // Create Wireguard interface
  const interfaceParams: string[] = [
    `name=${Name}`,
    `listen-port=${ListenPort}`,
    `mtu=${Mtu}`,
  ];

  if (PrivateKey) {
    interfaceParams.push(`private-key="${PrivateKey}"`);
  }

  config["/interface wireguard"].push(`add ${interfaceParams.join(" ")}`);

  // Add IP address to interface
  if (InterfaceAddress) {
    const [ip, prefix] = InterfaceAddress.split("/");
    const network = prefix ? calculateNetworkAddress(ip, prefix) : null;
    let addressCommand = `add address=${InterfaceAddress} interface=${Name}`;
    if (network) {
      addressCommand += ` network=${network}`;
    }
    config["/ip address"].push(addressCommand);
  }

  // Add interface list members
  config["/interface list member"].push(
    `add interface="${Name}" list="LAN"`,
    `add interface="${Name}" list="VPN-LAN"`,
  );

  // Add address list for VPN network
  if (InterfaceAddress) {
    config["/ip firewall address-list"].push(
      `add address="${InterfaceAddress}" list="VPN-LAN"`,
    );
  }

  // Add firewall filter rule for WireGuard handshake
  config["/ip firewall filter"].push(
    `add action=accept chain=input comment="WireGuard Handshake" dst-port=${ListenPort} in-interface-list=DOM-WAN protocol=udp`,
  );

  // Add comment about getting public key
  config["/interface wireguard"].push(
    `# To get the server's public key (needed for clients):`,
    `# /interface wireguard print detail where name=${Name}`,
  );

  return CommandShortner(config);
};

// OpenVPN Server

export const OVPNServer = (config: OpenVpnServerConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip pool": [],
    "/ppp profile": [],
    "/interface ovpn-server server": [],
    "/ip firewall filter": [],
    "/ip firewall address-list": [],
  };

  const {
    name,
    enabled = true,
    Port = 1194,
    Protocol = "tcp",
    Mode = "ip",
    Certificate,
    Encryption,
    // IPV6,
    Address,
    DefaultProfile = "ovpn-profile",
    KeepaliveTimeout = 60,
    RedirectGetway = "disabled",
    PushRoutes,
  } = config;

  // // Determine the pool name to use consistently
  // const poolName = Address?.AddressPool || 'ovpn-pool';

  // // Create IP pool for OpenVPN clients - always create the pool
  // routerConfig["/ip pool"].push(
  //     `add name=${poolName} ranges=192.168.60.5-192.168.60.250`
  // );

  // // Create PPP profile
  // const profileParams: string[] = [
  //     // `name=${DefaultProfile}`,
  //     `name=ovpn-profile`,
  //     'dns-server=1.1.1.1',
  //     'local-address=192.168.60.1',
  //     `remote-address=${poolName}`,
  //     'use-encryption=yes'
  // ];

  // routerConfig["/ppp profile"].push(
  //     `add ${profileParams.join(' ')}`
  // );

  // Create OpenVPN server instance
  const serverParams: string[] = [
    `name=${name}`,
    // `certificate=${Certificate.Certificate}`,
    `default-profile=${DefaultProfile}`,
    `disabled=${formatBooleanValue(!enabled)}`,
    `port=${Port}`,
    `protocol=${Protocol}`,
    `mode=${Mode}`,
  ];

  if (Certificate.RequireClientCertificate !== undefined) {
    serverParams.push(
      `require-client-certificate=${formatBooleanValue(Certificate.RequireClientCertificate)}`,
    );
  }

  if (Encryption.Auth) {
    serverParams.push(`auth=${formatArrayValue(Encryption.Auth)}`);
  }

  if (Encryption.Cipher) {
    serverParams.push(`cipher=${formatArrayValue(Encryption.Cipher)}`);
  }

  if (Encryption.UserAuthMethod) {
    serverParams.push(`user-auth-method=${Encryption.UserAuthMethod}`);
  }

  if (RedirectGetway !== "disabled") {
    serverParams.push(`redirect-gateway=${RedirectGetway}`);
  }

  if (PushRoutes) {
    serverParams.push(`push-routes="${PushRoutes}"`);
  }

  if (KeepaliveTimeout) {
    serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
  }

  if (Address.MaxMtu) {
    serverParams.push(`max-mtu=${Address.MaxMtu}`);
  }

  routerConfig["/interface ovpn-server server"].push(
    `add ${serverParams.join(" ")}`,
  );

  // Add firewall rules
  routerConfig["/ip firewall filter"].push(
    `add action=accept chain=input comment="OpenVPN Server ${Protocol}" dst-port=${Port} in-interface-list=DOM-WAN protocol=${Protocol}`,
  );

  return CommandShortner(routerConfig);
};

// PPTP Server

export const PptpServer = (config: PptpServerConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip pool": [],
    "/ppp profile": [],
    "/interface pptp-server server": [],
    "/ip firewall filter": [],
    "/ip firewall address-list": [],
  };

  const {
    enabled,
    Authentication,
    DefaultProfile = "pptp-profile",
    KeepaliveTimeout = 30,
    PacketSize,
  } = config;

  // Create IP pool for PPTP clients
  routerConfig["/ip pool"].push(
    `add name=pptp-pool ranges=192.168.70.5-192.168.70.250`,
  );

  // Create PPP profile for PPTP
  const profileParams: string[] = [
    `name=pptp-profile`,
    "dns-server=1.1.1.1",
    "local-address=192.168.70.1",
    "remote-address=pptp-pool",
    "use-encryption=yes",
  ];

  routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

  // Configure PPTP server
  const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

  if (Authentication) {
    serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
  }

  if (DefaultProfile) {
    serverParams.push(`default-profile=${DefaultProfile}`);
  }

  if (KeepaliveTimeout) {
    serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
  }

  if (PacketSize?.MaxMtu) {
    serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
  }

  if (PacketSize?.MaxMru) {
    serverParams.push(`max-mru=${PacketSize.MaxMru}`);
  }

  if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
    serverParams.push(`mrru=${PacketSize.mrru}`);
  }

  routerConfig["/interface pptp-server server"].push(
    `set ${serverParams.join(" ")}`,
  );

  // Add firewall rule for PPTP
  routerConfig["/ip firewall filter"].push(
    `add action=accept chain=input comment="PPTP Server" dst-port=1723 in-interface-list=DOM-WAN protocol=tcp`,
  );

  // Add address list for PPTP network
  routerConfig["/ip firewall address-list"].push(
    "add address=192.168.70.0/24 list=VPN-LAN",
  );

  return CommandShortner(routerConfig);
};

// L2TP Server

export const L2tpServer = (config: L2tpServerConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip pool": [],
    "/ppp profile": [],
    "/interface l2tp-server server": [],
    "/ip firewall filter": [],
    "/ip firewall address-list": [],
  };

  const {
    enabled,
    IPsec,
    Authentication,
    DefaultProfile = "l2tp-profile",
    KeepaliveTimeout = 30,
    PacketSize,
    allowFastPath,
    maxSessions,
    OneSessionPerHost,
    acceptProtoVersion,
    callerIdType,
    L2TPV3,
  } = config;

  // Create IP pool for L2TP clients
  routerConfig["/ip pool"].push(
    `add name=l2tp-pool ranges=192.168.80.5-192.168.80.250`,
  );

  // Create PPP profile for L2TP
  const profileParams: string[] = [
    `name=l2tp-profile`,
    "dns-server=1.1.1.1",
    "local-address=192.168.80.1",
    "remote-address=l2tp-pool",
    "use-encryption=yes",
  ];

  routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

  // Configure L2TP server
  const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

  if (IPsec.UseIpsec !== undefined) {
    serverParams.push(`use-ipsec=${IPsec.UseIpsec}`);
  }

  if (IPsec.IpsecSecret) {
    serverParams.push(`ipsec-secret="${IPsec.IpsecSecret}"`);
  }

  if (Authentication) {
    serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
  }

  if (DefaultProfile) {
    serverParams.push(`default-profile=${DefaultProfile}`);
  }

  if (KeepaliveTimeout) {
    serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
  }

  if (PacketSize?.MaxMtu) {
    serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
  }

  if (PacketSize?.MaxMru) {
    serverParams.push(`max-mru=${PacketSize.MaxMru}`);
  }

  if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
    serverParams.push(`mrru=${PacketSize.mrru}`);
  }

  if (allowFastPath !== undefined) {
    serverParams.push(`allow-fast-path=${formatBooleanValue(allowFastPath)}`);
  }

  if (maxSessions && maxSessions !== "unlimited") {
    serverParams.push(`max-sessions=${maxSessions}`);
  }

  if (OneSessionPerHost !== undefined) {
    serverParams.push(
      `one-session-per-host=${formatBooleanValue(OneSessionPerHost)}`,
    );
  }

  if (acceptProtoVersion) {
    serverParams.push(`accept-proto-version=${acceptProtoVersion}`);
  }

  if (callerIdType) {
    serverParams.push(`caller-id-type=${callerIdType}`);
  }

  if (L2TPV3.l2tpv3CircuitId) {
    serverParams.push(`l2tpv3-circuit-id=${L2TPV3.l2tpv3CircuitId}`);
  }

  if (L2TPV3.l2tpv3CookieLength !== undefined) {
    serverParams.push(
      `l2tpv3-cookie-length=${L2TPV3.l2tpv3CookieLength === 0 ? "0" : `${L2TPV3.l2tpv3CookieLength}-bytes`}`,
    );
  }

  if (L2TPV3.l2tpv3DigestHash) {
    serverParams.push(`l2tpv3-digest-hash=${L2TPV3.l2tpv3DigestHash}`);
  }

  routerConfig["/interface l2tp-server server"].push(
    `set ${serverParams.join(" ")}`,
  );

  // Add firewall rules for L2TP
  routerConfig["/ip firewall filter"].push(
    `add action=accept chain=input comment="L2TP Server" dst-port=1701 in-interface-list=DOM-WAN protocol=udp`,
  );

  // Add IPsec firewall rules if IPsec is enabled
  if (IPsec.UseIpsec !== "no") {
    routerConfig["/ip firewall filter"].push(
      `add action=accept chain=input comment="L2TP IPsec ESP" in-interface-list=DOM-WAN protocol=ipsec-esp`,
      `add action=accept chain=input comment="L2TP IPsec AH" in-interface-list=DOM-WAN protocol=ipsec-ah`,
      `add action=accept chain=input comment="L2TP IPsec UDP 500" dst-port=500 in-interface-list=DOM-WAN protocol=udp`,
      `add action=accept chain=input comment="L2TP IPsec UDP 4500" dst-port=4500 in-interface-list=DOM-WAN protocol=udp`,
    );
  }

  // Add address list for L2TP network
  routerConfig["/ip firewall address-list"].push(
    "add address=192.168.80.0/24 list=VPN-LAN",
  );

  return CommandShortner(routerConfig);
};

// SSTP Server

export const SstpServer = (config: SstpServerConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip pool": [],
    "/ppp profile": [],
    "/interface sstp-server server": [],
    "/ip firewall filter": [],
    "/ip firewall address-list": [],
  };

  const {
    enabled,
    // Certificate,
    Port = 4443,
    Authentication,
    DefaultProfile = "sstp-profile",
    KeepaliveTimeout = 30,
    PacketSize,
    // ForceAes,
    Pfs,
    Ciphers,
    VerifyClientCertificate,
    TlsVersion,
  } = config;

  // Create IP pool for SSTP clients
  routerConfig["/ip pool"].push(
    `add name=sstp-pool ranges=192.168.90.5-192.168.90.250`,
  );

  // Create PPP profile for SSTP
  const profileParams: string[] = [
    `name=sstp-profile`,
    "dns-server=1.1.1.1",
    "local-address=192.168.90.1",
    "remote-address=sstp-pool",
    "use-encryption=yes",
  ];

  routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

  // Configure SSTP server
  const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

  // if (Certificate) {
  //     serverParams.push(`certificate=${Certificate}`);

  //     if (Certificate === 'none') {
  //         routerConfig["/interface sstp-server server"].push(
  //             "# WARNING: SSTP server configured with certificate=none is insecure and incompatible with Windows clients."
  //         );
  //     }
  // }

  if (Port) {
    serverParams.push(`port=${Port}`);
  }

  if (Authentication) {
    serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
  }

  if (DefaultProfile) {
    serverParams.push(`default-profile=${DefaultProfile}`);
  }

  if (KeepaliveTimeout) {
    serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
  }

  if (PacketSize?.MaxMtu) {
    serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
  }

  if (PacketSize?.MaxMru) {
    serverParams.push(`max-mru=${PacketSize.MaxMru}`);
  }

  if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
    serverParams.push(`mrru=${PacketSize.mrru}`);
  }

  // if (ForceAes !== undefined) {
  //     serverParams.push(`force-aes=${formatBooleanValue(ForceAes)}`);
  // }

  if (Pfs !== undefined) {
    serverParams.push(`pfs=${formatBooleanValue(Pfs)}`);
  }

  if (Ciphers) {
    serverParams.push(`ciphers=${Ciphers}`);
  }

  if (VerifyClientCertificate !== undefined) {
    serverParams.push(
      `verify-client-certificate=${formatBooleanValue(VerifyClientCertificate)}`,
    );

    if (VerifyClientCertificate) {
      routerConfig["/interface sstp-server server"].push(
        "# WARNING: SSTP verify-client-certificate=yes is incompatible with Windows clients.",
      );
    }
  }

  if (TlsVersion) {
    serverParams.push(`tls-version=${TlsVersion}`);
  }

  routerConfig["/interface sstp-server server"].push(
    `set ${serverParams.join(" ")}`,
  );

  // Add firewall rule for SSTP
  routerConfig["/ip firewall filter"].push(
    `add action=accept chain=input comment="SSTP Server" dst-port=${Port} in-interface-list=DOM-WAN protocol=tcp`,
  );

  // Add address list for SSTP network
  routerConfig["/ip firewall address-list"].push(
    "add address=192.168.90.0/24 list=VPN-LAN",
  );

  return CommandShortner(routerConfig);
};

// IKEv2 Server Helper Functions

const Ikev2ProfileConfig = (config: Ikev2ServerConfig): string[] => {
  // Use provided config or defaults following MikroTik documentation
  const profileName = config.profile.name || "ike2";
  const profileParams: string[] = [`name=${profileName}`];

  // Apply MikroTik best practices defaults if not specified
  const defaults = {
    hashAlgorithm: config.profile.hashAlgorithm || "sha1",
    encAlgorithm: config.profile.encAlgorithm || "aes-128",
    dhGroup: config.profile.dhGroup || "modp1024,modp2048",
    lifetime: config.profile.lifetime || "1d",
    natTraversal:
      config.profile.natTraversal !== undefined
        ? config.profile.natTraversal
        : true,
    dpdInterval: config.profile.dpdInterval || "8s",
    dpdMaximumFailures: config.profile.dpdMaximumFailures || 4,
    proposalCheck: config.profile.proposalCheck || "obey",
  };

  const optionalParams = [
    { key: "hash-algorithm", value: defaults.hashAlgorithm, isArray: true },
    { key: "enc-algorithm", value: defaults.encAlgorithm, isArray: true },
    { key: "dh-group", value: defaults.dhGroup, isArray: true },
    { key: "lifetime", value: defaults.lifetime },
    { key: "nat-traversal", value: defaults.natTraversal, isBoolean: true },
    { key: "dpd-interval", value: defaults.dpdInterval },
    { key: "dpd-maximum-failures", value: defaults.dpdMaximumFailures },
    { key: "proposal-check", value: defaults.proposalCheck },
  ];

  optionalParams.forEach((param) => {
    const formattedValue = param.isBoolean
      ? formatBooleanValue(param.value as boolean)
      : param.isArray
        ? formatArrayValue(param.value)
        : param.value;
    profileParams.push(`${param.key}=${formattedValue}`);
  });

  return [`add ${profileParams.join(" ")}`];
};

const Ikev2ProposalConfig = (config: Ikev2ServerConfig): string[] => {
  // Use provided config or defaults following MikroTik documentation
  const proposalName = config.proposal.name || "ike2";
  const proposalParams: string[] = [`name=${proposalName}`];

  // Apply MikroTik best practices: pfs-group=none for road warrior as per documentation
  const defaults = {
    authAlgorithms: config.proposal.authAlgorithms || "sha1",
    encAlgorithms:
      config.proposal.encAlgorithms || "aes-256-cbc,aes-192-cbc,aes-128-cbc",
    lifetime: config.proposal.lifetime || "30m",
    pfsGroup: config.proposal.pfsGroup || "none", // Documentation recommends 'none' for road warrior
  };

  const optionalParams = [
    { key: "auth-algorithms", value: defaults.authAlgorithms, isArray: true },
    { key: "enc-algorithms", value: defaults.encAlgorithms, isArray: true },
    { key: "lifetime", value: defaults.lifetime },
    { key: "pfs-group", value: defaults.pfsGroup },
  ];

  optionalParams.forEach((param) => {
    const formattedValue = param.isArray
      ? formatArrayValue(param.value)
      : param.value;
    proposalParams.push(`${param.key}=${formattedValue}`);
  });

  return [`add ${proposalParams.join(" ")}`];
};

const Ikev2PolicyGroupConfig = (config: Ikev2ServerConfig): string[] => {
  if (!config.policyGroup) return [];

  const policyGroupParams: string[] = [`name=${config.policyGroup.name}`];

  if (config.policyGroup.comment) {
    policyGroupParams.push(`comment="${config.policyGroup.comment}"`);
  }

  return [`add ${policyGroupParams.join(" ")}`];
};

const Ikev2PolicyTemplateConfig = (config: Ikev2ServerConfig): string[] => {
  if (!config.policyTemplates) return [];

  const templateParams: string[] = [
    `group=${config.policyTemplates.group}`,
    `proposal=${config.policyTemplates.proposal}`,
    "template=yes",
  ];

  const optionalParams = [
    { key: "src-address", value: config.policyTemplates.srcAddress },
    { key: "dst-address", value: config.policyTemplates.dstAddress },
    { key: "protocol", value: config.policyTemplates.protocol },
    { key: "action", value: config.policyTemplates.action },
    { key: "level", value: config.policyTemplates.level },
  ];

  optionalParams.forEach((param) => {
    if (param.value !== undefined) {
      templateParams.push(`${param.key}=${param.value}`);
    }
  });

  return [`add ${templateParams.join(" ")}`];
};

const Ikev2PeerConfig = (config: Ikev2ServerConfig): string[] => {
  const peerParams: string[] = [
    `name=${config.peer.name}`,
    `profile=${config.peer.profile}`,
  ];

  const optionalParams = [
    { key: "address", value: config.peer.address },
    { key: "exchange-mode", value: config.peer.exchangeMode },
    { key: "passive", value: config.peer.passive, isBoolean: true },
    { key: "local-address", value: config.peer.localAddress },
    { key: "port", value: config.peer.port },
  ];

  optionalParams.forEach((param) => {
    if (param.value !== undefined) {
      const formattedValue = param.isBoolean
        ? formatBooleanValue(param.value as boolean)
        : param.value;
      peerParams.push(`${param.key}=${formattedValue}`);
    }
  });

  return [`add ${peerParams.join(" ")}`];
};

const Ikev2ModeConfig = (config: Ikev2ServerConfig): string[] => {
  if (!config.modeConfigs) return [];

  const modeConfigParams: string[] = [`name=${config.modeConfigs.name}`];

  const optionalParams = [
    { key: "address-pool", value: config.modeConfigs.addressPool },
    { key: "address", value: config.modeConfigs.address },
    {
      key: "address-prefix-length",
      value: config.modeConfigs.addressPrefixLength,
    },
    { key: "responder", value: config.modeConfigs.responder, isBoolean: true },
    { key: "static-dns", value: config.modeConfigs.staticDns },
    { key: "split-include", value: config.modeConfigs.splitInclude },
    { key: "system-dns", value: config.modeConfigs.systemDns, isBoolean: true },
  ];

  optionalParams.forEach((param) => {
    if (param.value !== undefined) {
      const formattedValue = param.isBoolean
        ? formatBooleanValue(param.value as boolean)
        : param.value;
      modeConfigParams.push(`${param.key}=${formattedValue}`);
    }
  });

  return [`add ${modeConfigParams.join(" ")}`];
};

// Note: This function is now handled in VPNServerUsers.ts for per-user identity configuration
// const Ikev2IdentityConfig = (config: Ikev2ServerConfig): string[] => {
//     // Use provided config or defaults following MikroTik documentation
//     const peerName = config.peer?.name || 'ike2';
//     const authMethod = config.identities?.authMethod || 'pre-shared-key';

//     const identityParams: string[] = [
//         `peer=${peerName}`,
//         `auth-method=${authMethod}`
//     ];

//     // Apply MikroTik best practices defaults following documentation
//     const defaults = {
//         certificate: config.identities?.certificate || 'server1',
//         generatePolicy: config.identities?.generatePolicy || 'port-strict',
//         modeConfig: config.identities?.modeConfig || 'ike2-conf',
//         policyTemplateGroup: config.identities?.policyTemplateGroup || 'ike2-policies'
//     };

//     // Add required parameters based on auth method
//     if (authMethod === 'digital-signature') {
//         // identityParams.push(`certificate=${defaults.certificate}`);
//     } else if (authMethod === 'pre-shared-key' && config.identities?.secret) {
//         identityParams.push(`secret="${config.identities.secret}"`);
//     }

//     // Add standard parameters for server configuration
//     identityParams.push(`generate-policy=${defaults.generatePolicy}`);
//     identityParams.push(`mode-config=${defaults.modeConfig}`);
//     identityParams.push(`policy-template-group=${defaults.policyTemplateGroup}`);

//     // Add optional EAP methods if specified
//     if (config.identities?.eapMethods) {
//         identityParams.push(`eap-methods=${config.identities.eapMethods}`);
//     }

//     return [`add ${identityParams.join(' ')}`];
// };

// Main IKEv2 Server Function

export const Ikev2Server = (config: Ikev2ServerConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip pool": [],
    "/ip ipsec profile": [],
    "/ip ipsec proposal": [],
    "/ip ipsec policy group": [],
    "/ip ipsec policy": [],
    "/ip ipsec peer": [],
    "/ip ipsec mode-config": [],
    "/ip ipsec identity": [],
    "/ip firewall filter": [],
    "/ip firewall address-list": [],
    "": [],
  };

  // Add configuration order comments following MikroTik best practices
  routerConfig[""].push(
    "# IKEv2 Server Configuration following MikroTik best practices:",
    "# 1. IP Pool for client addresses",
    "# 2. IPsec Profile (Phase 1 parameters)",
    "# 3. IPsec Proposal (Phase 2 parameters) with pfs-group=none",
    "# 4. Policy Group and Policy Template",
    "# 5. Mode Config for address distribution",
    "# 6. IPsec Peer (passive=yes for server)",
    "# 7. IPsec Identity for authentication",
    "# 8. Firewall rules for IKE and ESP",
    "",
  );

  // 1. Build IP Pool configuration - Following MikroTik documentation pattern
  if (config.ipPools) {
    const poolConfig: IPPoolConfig = {
      name: config.ipPools.Name,
      ranges: config.ipPools.Ranges,
      nextPool: config.ipPools.NextPool,
      comment: config.ipPools.comment,
    };
    routerConfig["/ip pool"].push(...generateIPPool(poolConfig));
  } else {
    // Default pool following documentation example
    routerConfig["/ip pool"].push(
      `add name=ike2-pool ranges=192.168.77.2-192.168.77.254`,
    );
  }

  // 2. Build IPsec Profile (Phase 1) - Following documentation
  routerConfig["/ip ipsec profile"].push(...Ikev2ProfileConfig(config));

  // 3. Build IPsec Proposal (Phase 2) with pfs-group=none as per documentation
  const proposalConfig = Ikev2ProposalConfig(config);
  if (proposalConfig.length === 0) {
    // Default proposal following documentation with pfs-group=none
    routerConfig["/ip ipsec proposal"].push(`add name=ike2 pfs-group=none`);
  } else {
    routerConfig["/ip ipsec proposal"].push(...proposalConfig);
  }

  // 4. Build Policy Group and Policy Template - Following documentation pattern
  if (config.policyGroup) {
    routerConfig["/ip ipsec policy group"].push(
      ...Ikev2PolicyGroupConfig(config),
    );
  } else {
    // Default policy group following documentation
    routerConfig["/ip ipsec policy group"].push(`add name=ike2-policies`);
  }

  if (config.policyTemplates) {
    routerConfig["/ip ipsec policy"].push(...Ikev2PolicyTemplateConfig(config));
  } else {
    // Default policy template following documentation
    const groupName = config.policyGroup?.name || "ike2-policies";
    const proposalName = config.proposal.name || "ike2";
    routerConfig["/ip ipsec policy"].push(
      `add dst-address=192.168.77.0/24 group=${groupName} proposal=${proposalName} src-address=0.0.0.0/0 template=yes`,
    );
  }

  // 5. Build Mode Config for address distribution - Following documentation
  if (config.modeConfigs) {
    routerConfig["/ip ipsec mode-config"].push(...Ikev2ModeConfig(config));
  } else {
    // Default mode config following documentation
    const poolName = config.ipPools?.Name || "ike2-pool";
    routerConfig["/ip ipsec mode-config"].push(
      `add address-pool=${poolName} address-prefix-length=32 name=ike2-conf`,
    );
  }

  // 6. Build IPsec Peer (passive=yes for server) - Following documentation
  if (config.peer) {
    routerConfig["/ip ipsec peer"].push(...Ikev2PeerConfig(config));
  } else {
    // Default peer following documentation
    const profileName = config.profile.name || "ike2";
    routerConfig["/ip ipsec peer"].push(
      `add exchange-mode=ike2 name=ike2 passive=yes profile=${profileName}`,
    );
  }

  // 7. Build IPsec Identity for authentication - Following documentation
  // Note: IPsec Identity configuration is now handled in VPNServerUsers.ts
  // routerConfig["/ip ipsec identity"].push(...Ikev2IdentityConfig(config));

  // 8. Add firewall rules for IKEv2 and ESP - Following documentation requirements
  routerConfig["/ip firewall filter"].push(
    `add action=accept chain=input comment="Allow IKE" dst-port=500 in-interface-list=DOM-WAN protocol=udp`,
    `add action=accept chain=input comment="Allow IKE NAT-T" dst-port=4500 in-interface-list=DOM-WAN protocol=udp`,
    `add action=accept chain=input comment="Allow ESP" in-interface-list=DOM-WAN protocol=ipsec-esp`,
  );

  // Add address list for IKEv2 network
  const poolNetwork =
    config.ipPools?.Ranges.split("-")[0]?.replace(/\.\d+$/, ".0/24") ||
    "192.168.77.0/24";
  routerConfig["/ip firewall address-list"].push(
    `add address=${poolNetwork} list=VPN-LAN comment="IKEv2 clients network"`,
  );

  // Add best practices notes
  routerConfig[""].push(
    "# IKEv2 Server Configuration Notes:",
    "# - Uses exchange-mode=ike2 and passive=yes for server operation",
    "# - PFS group set to 'none' in proposal as recommended for road warrior setup",
    "# - Mode config provides address pool and DNS configuration to clients",
    "# - Policy template allows traffic from any source to IKEv2 network",
    "# - Separate firewall rules for IKE (500), NAT-T (4500), and ESP protocols",
    "# - Network added to VPN-LAN address list for firewall rules",
    "",
  );

  return CommandShortner(routerConfig);
};

// VPN Server Interfaces Wrapper

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
        console.log("Generating WireGuard server interface configuration");
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
