import { describe, it, expect } from "vitest";
import {
  WireguardServer,
  OVPNServer,
  PptpServer,
  L2tpServer,
  SstpServer,
  Ikev2Server,
  VPNServerInterfaceWrapper,
} from "./VPNServerInterfaces";
import type {
  WireguardInterfaceConfig,
  OpenVpnServerConfig,
  PptpServerConfig,
  L2tpServerConfig,
  SstpServerConfig,
  Ikev2ServerConfig,
  VPNServer,
} from "~/components/Star/StarContext/Utils/VPNServerType";
import type { NetworkProtocol } from "~/components/Star/StarContext/CommonType";

describe("VPN Server Interfaces Tests", () => {
  describe("WireguardServer", () => {
    it("should generate WireGuard server interface configuration", () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: "wireguard-server",
        PrivateKey: "privatekey123",
        InterfaceAddress: "192.168.170.1/24",
        ListenPort: 13231,
        Mtu: 1420,
      };

      testWithOutput(
        "WireguardServer",
        "Basic WireGuard server configuration",
        { wireguardConfig },
        () => WireguardServer(wireguardConfig),
      );

      const result = WireguardServer(wireguardConfig);
      validateRouterConfig(result, [
        "/interface wireguard",
        "/ip address",
        "/interface list member",
      ]);

      // Check WireGuard interface creation
      const wireguardCommands = result["/interface wireguard"] || [];
      expect(
        wireguardCommands.some((cmd: string) =>
          cmd.includes("name=wireguard-server"),
        ),
      ).toBe(true);
      expect(
        wireguardCommands.some((cmd: string) =>
          cmd.includes("listen-port=13231"),
        ),
      ).toBe(true);
      expect(
        wireguardCommands.some((cmd: string) => cmd.includes("mtu=1420")),
      ).toBe(true);

      // Check IP address assignment
      const ipCommands = result["/ip address"] || [];
      expect(
        ipCommands.some((cmd: string) =>
          cmd.includes("address=192.168.170.1/24"),
        ),
      ).toBe(true);
      expect(
        ipCommands.some((cmd: string) =>
          cmd.includes("interface=wireguard-server"),
        ),
      ).toBe(true);
    });

    it("should handle WireGuard server with minimal configuration", () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: "wg-minimal",
        PrivateKey: "minimalkey",
        InterfaceAddress: "10.0.0.1/24",
      };

      testWithOutput(
        "WireguardServer",
        "Minimal WireGuard server configuration",
        { wireguardConfig },
        () => WireguardServer(wireguardConfig),
      );

      const result = WireguardServer(wireguardConfig);
      validateRouterConfig(result, ["/interface wireguard", "/ip address"]);

      const wireguardCommands = result["/interface wireguard"] || [];
      expect(
        wireguardCommands.some((cmd: string) =>
          cmd.includes("name=wg-minimal"),
        ),
      ).toBe(true);
    });
  });

  describe("OVPNServer", () => {
    it("should generate OpenVPN server configuration", () => {
      const ovpnConfig: OpenVpnServerConfig = {
        name: "openvpn-server",
        enabled: true,
        Port: 1194,
        Protocol: "udp" as NetworkProtocol,
        Mode: "ip",
        DefaultProfile: "ovpn-profile",
        Encryption: {
          Auth: ["sha256"],
          Cipher: ["aes256-cbc"],
          UserAuthMethod: "mschap2",
        },
        IPV6: {
          EnableTunIPv6: false,
        },
        Certificate: {
          Certificate: "server-cert",
          RequireClientCertificate: true,
        },
        Address: {
          AddressPool: "ovpn-pool",
          MaxMtu: 1500,
        },
      };

      testWithOutput(
        "OVPNServer",
        "OpenVPN server configuration",
        { config: ovpnConfig },
        () => OVPNServer(ovpnConfig),
      );

      const result = OVPNServer(ovpnConfig);
      validateRouterConfig(result, [
        "/ip pool",
        "/ppp profile",
        "/interface ovpn-server server",
      ]);

      // Check IP pool creation
      const poolCommands = result["/ip pool"] || [];
      expect(
        poolCommands.some((cmd: string) => cmd.includes("name=ovpn-pool")),
      ).toBe(true);

      // Check PPP profile
      const profileCommands = result["/ppp profile"] || [];
      expect(
        profileCommands.some((cmd: string) =>
          cmd.includes("name=ovpn-profile"),
        ),
      ).toBe(true);

      // Check OpenVPN server
      const serverCommands = result["/interface ovpn-server server"] || [];
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("name=openvpn-server"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("port=1194")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("protocol=udp")),
      ).toBe(true);
    });

    it("should handle OpenVPN server with TCP protocol", () => {
      const ovpnConfig: OpenVpnServerConfig = {
        name: "ovpn-tcp",
        enabled: true,
        Port: 443,
        Protocol: "tcp" as NetworkProtocol,
        Mode: "ip",
        Encryption: {},
        IPV6: {},
        Certificate: { Certificate: "cert" },
        Address: {},
      };

      testWithOutput(
        "OVPNServer",
        "OpenVPN server with TCP",
        { config: ovpnConfig },
        () => OVPNServer(ovpnConfig),
      );

      const result = OVPNServer(ovpnConfig);
      const serverCommands = result["/interface ovpn-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("protocol=tcp")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("port=443")),
      ).toBe(true);
    });
  });

  describe("PptpServer", () => {
    it("should generate PPTP server configuration", () => {
      const pptpConfig: PptpServerConfig = {
        enabled: true,
        Authentication: ["mschap2"],
        DefaultProfile: "pptp-profile",
        KeepaliveTimeout: 30,
        PacketSize: {
          MaxMtu: 1460,
          MaxMru: 1460,
        },
      };

      testWithOutput(
        "PptpServer",
        "PPTP server configuration",
        { config: pptpConfig },
        () => PptpServer(pptpConfig),
      );

      const result = PptpServer(pptpConfig);
      validateRouterConfig(result, ["/interface pptp-server server"]);

      const serverCommands = result["/interface pptp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("enabled=yes")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("authentication=mschap2"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("default-profile=pptp-profile"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("keepalive-timeout=30"),
        ),
      ).toBe(true);
    });

    it("should handle disabled PPTP server", () => {
      const pptpConfig: PptpServerConfig = {
        enabled: false,
      };

      testWithOutput(
        "PptpServer",
        "Disabled PPTP server",
        { config: pptpConfig },
        () => PptpServer(pptpConfig),
      );

      const result = PptpServer(pptpConfig);
      const serverCommands = result["/interface pptp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("enabled=no")),
      ).toBe(true);
    });
  });

  describe("L2tpServer", () => {
    it("should generate L2TP server configuration with IPsec", () => {
      const l2tpConfig: L2tpServerConfig = {
        enabled: true,
        IPsec: {
          UseIpsec: "required",
          IpsecSecret: "sharedsecret123",
        },
        Authentication: ["mschap2"],
        DefaultProfile: "l2tp-profile",
        KeepaliveTimeout: 30,
        allowFastPath: false,
        maxSessions: 100,
        OneSessionPerHost: true,
        L2TPV3: {
          l2tpv3EtherInterfaceList: "LAN",
        },
        PacketSize: {
          MaxMtu: 1460,
          MaxMru: 1460,
        },
      };

      testWithOutput(
        "L2tpServer",
        "L2TP server configuration with IPsec",
        { config: l2tpConfig },
        () => L2tpServer(l2tpConfig),
      );

      const result = L2tpServer(l2tpConfig);
      validateRouterConfig(result, ["/interface l2tp-server server"]);

      const serverCommands = result["/interface l2tp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("enabled=yes")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("use-ipsec=required"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("ipsec-secret=sharedsecret123"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("max-sessions=100")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("one-session-per-host=yes"),
        ),
      ).toBe(true);
    });

    it("should handle L2TP server without IPsec", () => {
      const l2tpConfig: L2tpServerConfig = {
        enabled: true,
        IPsec: {
          UseIpsec: "no",
        },
        L2TPV3: {
          l2tpv3EtherInterfaceList: "LAN",
        },
      };

      testWithOutput(
        "L2tpServer",
        "L2TP server without IPsec",
        { config: l2tpConfig },
        () => L2tpServer(l2tpConfig),
      );

      const result = L2tpServer(l2tpConfig);
      const serverCommands = result["/interface l2tp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("use-ipsec=no")),
      ).toBe(true);
    });
  });

  describe("SstpServer", () => {
    it("should generate SSTP server configuration", () => {
      const sstpConfig: SstpServerConfig = {
        enabled: true,
        Certificate: "server-cert",
        Port: 443,
        Authentication: ["mschap2"],
        DefaultProfile: "sstp-profile",
        KeepaliveTimeout: 30,
        ForceAes: true,
        Pfs: true,
        TlsVersion: "only-1.2",
        PacketSize: {
          MaxMtu: 1460,
        },
      };

      testWithOutput(
        "SstpServer",
        "SSTP server configuration",
        { config: sstpConfig },
        () => SstpServer(sstpConfig),
      );

      const result = SstpServer(sstpConfig);
      validateRouterConfig(result, [
        "/interface sstp-server server",
        "/ip firewall filter",
      ]);

      const serverCommands = result["/interface sstp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("enabled=yes")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) =>
          cmd.includes("certificate=server-cert"),
        ),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("port=443")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("force-aes=yes")),
      ).toBe(true);
      expect(
        serverCommands.some((cmd: string) => cmd.includes("pfs=yes")),
      ).toBe(true);

      // Check firewall rule
      const firewallCommands = result["/ip firewall filter"] || [];
      expect(
        firewallCommands.some((cmd: string) => cmd.includes("dst-port=443")),
      ).toBe(true);
    });

    it("should handle SSTP server with custom port", () => {
      const sstpConfig: SstpServerConfig = {
        enabled: true,
        Certificate: "custom-cert",
        Port: 8443,
      };

      testWithOutput(
        "SstpServer",
        "SSTP server with custom port",
        { config: sstpConfig },
        () => SstpServer(sstpConfig),
      );

      const result = SstpServer(sstpConfig);
      const serverCommands = result["/interface sstp-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("port=8443")),
      ).toBe(true);

      const firewallCommands = result["/ip firewall filter"] || [];
      expect(
        firewallCommands.some((cmd: string) => cmd.includes("dst-port=8443")),
      ).toBe(true);
    });
  });

  describe("Ikev2Server", () => {
    it("should generate IKEv2 server configuration", () => {
      const ikev2Config: Ikev2ServerConfig = {
        ipPools: {
          Name: "ikev2-pool",
          Ranges: "192.168.77.10-192.168.77.100",
          comment: "IKEv2 client pool",
        },
        profile: {
          name: "ikev2-profile",
          hashAlgorithm: "sha256",
          encAlgorithm: "aes-256",
          dhGroup: "modp2048",
          lifetime: "8h",
          natTraversal: true,
        },
        proposal: {
          name: "ikev2-proposal",
          authAlgorithms: "sha256",
          encAlgorithms: "aes-256-cbc",
          lifetime: "1h",
          pfsGroup: "modp2048",
        },
        peer: {
          name: "ikev2-peer",
          profile: "ikev2-profile",
          exchangeMode: "ike2",
          passive: true,
        },
        identities: {
          authMethod: "pre-shared-key",
          secret: "preshared123",
          generatePolicy: "port-strict",
          peer: "ikev2-peer",
        },
      };

      testWithOutput(
        "Ikev2Server",
        "IKEv2 server configuration",
        { config: ikev2Config },
        () => Ikev2Server(ikev2Config),
      );

      const result = Ikev2Server(ikev2Config);
      validateRouterConfig(result, [
        "/ip pool",
        "/ip ipsec profile",
        "/ip ipsec proposal",
        "/ip ipsec peer",
        "/ip ipsec identity",
        "/ip firewall filter",
      ]);

      // Check IP pool
      const poolCommands = result["/ip pool"] || [];
      expect(
        poolCommands.some((cmd: string) => cmd.includes("name=ikev2-pool")),
      ).toBe(true);
      expect(
        poolCommands.some((cmd: string) =>
          cmd.includes("ranges=192.168.77.10-192.168.77.100"),
        ),
      ).toBe(true);

      // Check IPsec profile
      const profileCommands = result["/ip ipsec profile"] || [];
      expect(
        profileCommands.some((cmd: string) =>
          cmd.includes("name=ikev2-profile"),
        ),
      ).toBe(true);
      expect(
        profileCommands.some((cmd: string) =>
          cmd.includes("hash-algorithm=sha256"),
        ),
      ).toBe(true);

      // Check IPsec proposal
      const proposalCommands = result["/ip ipsec proposal"] || [];
      expect(
        proposalCommands.some((cmd: string) =>
          cmd.includes("name=ikev2-proposal"),
        ),
      ).toBe(true);

      // Check IPsec peer
      const peerCommands = result["/ip ipsec peer"] || [];
      expect(
        peerCommands.some((cmd: string) => cmd.includes("name=ikev2-peer")),
      ).toBe(true);
      expect(
        peerCommands.some((cmd: string) => cmd.includes("passive=yes")),
      ).toBe(true);

      // Check IPsec identity
      const identityCommands = result["/ip ipsec identity"] || [];
      expect(
        identityCommands.some((cmd: string) =>
          cmd.includes("auth-method=pre-shared-key"),
        ),
      ).toBe(true);
      expect(
        identityCommands.some((cmd: string) =>
          cmd.includes("secret=preshared123"),
        ),
      ).toBe(true);

      // Check firewall rules
      const firewallCommands = result["/ip firewall filter"] || [];
      expect(
        firewallCommands.some((cmd: string) => cmd.includes("dst-port=500")),
      ).toBe(true);
      expect(
        firewallCommands.some((cmd: string) => cmd.includes("dst-port=4500")),
      ).toBe(true);
    });

    it("should handle IKEv2 server with certificate authentication", () => {
      const ikev2Config: Ikev2ServerConfig = {
        profile: {
          name: "ikev2-cert-profile",
          hashAlgorithm: "sha256",
          encAlgorithm: "aes-256",
          dhGroup: "modp2048",
        },
        proposal: {
          name: "ikev2-cert-proposal",
          authAlgorithms: "sha256",
          encAlgorithms: "aes-256-cbc",
        },
        peer: {
          name: "ikev2-cert-peer",
          profile: "ikev2-cert-profile",
        },
        identities: {
          authMethod: "digital-signature",
          certificate: "server-cert",
          peer: "ikev2-cert-peer",
        },
      };

      testWithOutput(
        "Ikev2Server",
        "IKEv2 server with certificate authentication",
        { config: ikev2Config },
        () => Ikev2Server(ikev2Config),
      );

      const result = Ikev2Server(ikev2Config);
      const identityCommands = result["/ip ipsec identity"] || [];
      expect(
        identityCommands.some((cmd: string) =>
          cmd.includes("auth-method=digital-signature"),
        ),
      ).toBe(true);
      expect(
        identityCommands.some((cmd: string) =>
          cmd.includes("certificate=server-cert"),
        ),
      ).toBe(true);
    });
  });

  describe("VPNServerInterfaceWrapper", () => {
    it("should generate complete VPN server interface configuration", () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [
          {
            Interface: {
              Name: "wireguard-server",
              PrivateKey: "privatekey123",
              InterfaceAddress: "192.168.170.1/24",
              ListenPort: 13231,
            },
            Peers: [],
          },
        ],
        OpenVpnServer: [
          {
            name: "openvpn-server",
            enabled: true,
            Port: 1194,
            Protocol: "udp",
            Encryption: {},
            IPV6: {},
            Certificate: { Certificate: "server-cert" },
            Address: {},
          },
        ],
        PptpServer: {
          enabled: true,
          Authentication: ["mschap2"],
        },
        L2tpServer: {
          enabled: true,
          IPsec: { UseIpsec: "required", IpsecSecret: "secret123" },
          L2TPV3: { l2tpv3EtherInterfaceList: "LAN" },
        },
        SstpServer: {
          enabled: true,
          Certificate: "server-cert",
        },
        Ikev2Server: {
          profile: { name: "ikev2-profile" },
          proposal: { name: "ikev2-proposal" },
          peer: { name: "ikev2-peer", profile: "ikev2-profile" },
          identities: { authMethod: "pre-shared-key", peer: "ikev2-peer" },
        },
      };

      testWithOutput(
        "VPNServerInterfaceWrapper",
        "Complete VPN server interface configuration",
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer),
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result);

      // Check that all VPN types are configured
      const comments = result[""] || [];
      expect(
        comments.some((c: string) =>
          c.includes("VPN Server Interface Configuration Summary"),
        ),
      ).toBe(true);
      expect(
        comments.some((c: string) => c.includes("WireGuard: 1 server(s)")),
      ).toBe(true);
      expect(comments.some((c: string) => c.includes("OpenVPN: Enabled"))).toBe(
        true,
      );
      expect(comments.some((c: string) => c.includes("PPTP: Enabled"))).toBe(
        true,
      );
      expect(comments.some((c: string) => c.includes("L2TP: Enabled"))).toBe(
        true,
      );
      expect(comments.some((c: string) => c.includes("SSTP: Enabled"))).toBe(
        true,
      );
      expect(comments.some((c: string) => c.includes("IKEv2: Enabled"))).toBe(
        true,
      );
    });

    it("should handle VPN server with only WireGuard configured", () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [
          {
            Interface: {
              Name: "wg-only",
              PrivateKey: "key123",
              InterfaceAddress: "10.0.0.1/24",
            },
            Peers: [],
          },
        ],
      };

      testWithOutput(
        "VPNServerInterfaceWrapper",
        "VPN server with only WireGuard",
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer),
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result);

      const comments = result[""] || [];
      expect(
        comments.some((c: string) => c.includes("WireGuard: 1 server(s)")),
      ).toBe(true);
      expect(
        comments.some((c: string) => c.includes("OpenVPN: Not configured")),
      ).toBe(true);
    });

    it("should handle empty VPN server configuration", () => {
      const vpnServer: VPNServer = {
        Users: [],
      };

      testWithOutput(
        "VPNServerInterfaceWrapper",
        "Empty VPN server configuration",
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer),
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(
        comments.some((c: string) =>
          c.includes("No VPN server interfaces configured"),
        ),
      ).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle WireGuard server without listen port", () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: "wg-no-port",
        PrivateKey: "key123",
        InterfaceAddress: "10.0.0.1/24",
      };

      testWithOutput(
        "WireguardServer",
        "WireGuard without listen port",
        { wireguardConfig },
        () => WireguardServer(wireguardConfig),
      );

      const result = WireguardServer(wireguardConfig);
      const wireguardCommands = result["/interface wireguard"] || [];
      // Should use default port or not specify port
      expect(
        wireguardCommands.some((cmd: string) =>
          cmd.includes("name=wg-no-port"),
        ),
      ).toBe(true);
    });

    it("should handle OpenVPN server with minimal configuration", () => {
      const ovpnConfig: OpenVpnServerConfig = {
        name: "ovpn-minimal",
        enabled: true,
        Encryption: {},
        IPV6: {},
        Certificate: { Certificate: "cert" },
        Address: {},
      };

      testWithOutput(
        "OVPNServer",
        "OpenVPN minimal configuration",
        { config: ovpnConfig },
        () => OVPNServer(ovpnConfig),
      );

      const result = OVPNServer(ovpnConfig);
      const serverCommands = result["/interface ovpn-server server"] || [];
      expect(
        serverCommands.some((cmd: string) => cmd.includes("name=ovpn-minimal")),
      ).toBe(true);
    });

    it("should handle IKEv2 server without optional configurations", () => {
      const ikev2Config: Ikev2ServerConfig = {
        profile: { name: "minimal-profile" },
        proposal: { name: "minimal-proposal" },
        peer: { name: "minimal-peer", profile: "minimal-profile" },
        identities: { authMethod: "pre-shared-key", peer: "minimal-peer" },
      };

      testWithOutput(
        "Ikev2Server",
        "IKEv2 minimal configuration",
        { config: ikev2Config },
        () => Ikev2Server(ikev2Config),
      );

      const result = Ikev2Server(ikev2Config);
      validateRouterConfig(result);

      const profileCommands = result["/ip ipsec profile"] || [];
      expect(
        profileCommands.some((cmd: string) =>
          cmd.includes("name=minimal-profile"),
        ),
      ).toBe(true);
    });
  });
});
