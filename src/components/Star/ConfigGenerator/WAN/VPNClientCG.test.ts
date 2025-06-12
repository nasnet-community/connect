import { describe, it } from 'vitest';
// import type { RouterConfig } from '../ConfigGenerator';
import type {
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
  VPNClient
} from '../../StarContext/Utils/VPNClientType';

import {
  RouteToVPN,
  InterfaceList,
  AddressList,
  DNSVPN,
  BaseVPNConfig,
  WireguardClient,
  OpenVPNClient,
  PPTPClient,
  L2TPClient,
  SSTPClient,
  IKeV2Client,
  VPNClientWrapper
} from './VPNClientCG';

describe('VPNClientCG Module', () => {
  describe('RouteToVPN', () => {
    it('should generate VPN routing configuration', () => {
      const interfaceName = 'wireguard-client';
      const endpointAddress = '1.2.3.4';

      const result = testWithOutput(
        'RouteToVPN',
        'VPN routing configuration',
        { interfaceName, endpointAddress },
        () => RouteToVPN(interfaceName, endpointAddress),
      );

      validateRouterConfig(result, ['/ip route']);
    });
  });

  describe('InterfaceList', () => {
    it('should add interface to WAN lists', () => {
      const interfaceName = 'vpn-client';

      const result = testWithOutput(
        'InterfaceList',
        'Add interface to WAN lists',
        { interfaceName },
        () => InterfaceList(interfaceName),
      );

      validateRouterConfig(result, ['/interface list member']);
    });
  });

  describe('AddressList', () => {
    it('should assign IP address to interface', () => {
      const interfaceName = 'wireguard-client';
      const address = '10.0.0.2/24';

      const result = testWithOutput(
        'AddressList',
        'Assign IP address to interface',
        { interfaceName, address },
        () => AddressList(interfaceName, address),
      );

      validateRouterConfig(result, ['/ip address']);
    });
  });

  describe('DNSVPN', () => {
    it('should configure DNS for VPN with domestic link', () => {
      const dns = '8.8.8.8';
      const domesticLink = true;

      const result = testWithOutput(
        'DNSVPN',
        'DNS for VPN with domestic link',
        { dns, domesticLink },
        () => DNSVPN(dns, domesticLink),
      );

      validateRouterConfig(result, ['/ip firewall nat']);
    });

    it('should configure DNS for VPN without domestic link', () => {
      const dns = '1.1.1.1';
      const domesticLink = false;

      const result = testWithOutput(
        'DNSVPN',
        'DNS for VPN without domestic link',
        { dns, domesticLink },
        () => DNSVPN(dns, domesticLink),
      );

      validateRouterConfig(result, ['/ip firewall nat']);
    });
  });

  describe('BaseVPNConfig', () => {
    it('should combine all base VPN configurations', () => {
      const interfaceName = 'wireguard-client';
      const endpointAddress = '1.2.3.4';
      const dns = '8.8.8.8';
      const domesticLink = true;

      const result = testWithOutput(
        'BaseVPNConfig',
        'Combine all base VPN configurations',
        { interfaceName, endpointAddress, dns, domesticLink },
        () => BaseVPNConfig(interfaceName, endpointAddress, dns, domesticLink),
      );

      validateRouterConfig(result, [
        '/ip address',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);
    });
  });

  describe('WireguardClient', () => {
    it('should configure complete Wireguard client', () => {
      const config: WireguardClientConfig = {
        InterfacePrivateKey: 'KJFHGFKHJGfkjhgfkjhgfkjhgfkjhgfKJGFKJGHFKJG=',
        InterfaceAddress: '10.0.0.2/24',
        InterfaceListenPort: 51820,
        InterfaceMTU: 1420,
        PeerPublicKey: 'LKJHGFDSALKJHGFDSlkjhgfdsalkjhgfdsa+LKJHGFDS=',
        PeerEndpointAddress: '1.2.3.4',
        PeerEndpointPort: 51820,
        PeerAllowedIPs: '0.0.0.0/0',
        PeerPresharedKey: 'presharedkey12345678901234567890123456789012',
        PeerPersistentKeepalive: 25
      };

      const result = testWithOutput(
        'WireguardClient',
        'Complete Wireguard client configuration',
        { config },
        () => WireguardClient(config),
      );

      validateRouterConfig(result, [
        '/interface wireguard',
        '/interface wireguard peers',
        '/ip address',
        '/ip route',
      ]);
    });

    it('should configure minimal Wireguard client', () => {
      const config: WireguardClientConfig = {
        InterfacePrivateKey: 'privatekey123',
        InterfaceAddress: '10.0.0.2/24',
        PeerPublicKey: 'publickey123',
        PeerEndpointAddress: '1.2.3.4',
        PeerEndpointPort: 51820,
        PeerAllowedIPs: '0.0.0.0/0'
      };

      const result = testWithOutput(
        'WireguardClient',
        'Minimal Wireguard client configuration',
        { config },
        () => WireguardClient(config),
      );

      validateRouterConfig(result, [
        '/interface wireguard',
        '/interface wireguard peers',
        '/ip address',
        '/ip route',
      ]);
    });
  });

  describe('OpenVPNClient', () => {
    it('should configure OpenVPN client with credentials', () => {
      const config: OpenVpnClientConfig = {
        Server: { Address: 'vpn.example.com', Port: 1194 },
        Mode: 'ip',
        Protocol: 'udp',
        Credentials: { Username: 'testuser', Password: 'testpass' },
        AuthType: 'Credentials',
        Auth: 'sha256',
        Cipher: 'aes256-cbc',
        TlsVersion: 'only-1.2',
        VerifyServerCertificate: true,
        RouteNoPull: false
      };

      const result = testWithOutput(
        'OpenVPNClient',
        'OpenVPN client with credentials',
        { config },
        () => OpenVPNClient(config),
      );

      validateRouterConfig(result, ['/interface ovpn-client']);
    });
  });

  describe('PPTPClient', () => {
    it('should configure PPTP client', () => {
      const config: PptpClientConfig = {
        ConnectTo: 'pptp.example.com',
        Credentials: { Username: 'pptpuser', Password: 'pptppass' },
        AuthMethod: ['mschap2', 'chap'],
        KeepaliveTimeout: 60,
        DialOnDemand: false,
        KeepAlive: 30
      };

      const result = testWithOutput(
        'PPTPClient',
        'PPTP client configuration',
        { config },
        () => PPTPClient(config),
      );

      validateRouterConfig(result, ['/interface pptp-client']);
    });
  });

  describe('L2TPClient', () => {
    it('should configure L2TP client with IPsec', () => {
      const config: L2tpClientConfig = {
        Server: { Address: 'l2tp.example.com', Port: 1701 },
        Credentials: { Username: 'l2tpuser', Password: 'l2tppass' },
        UseIPsec: true,
        IPsecSecret: 'shared-secret',
        AuthMethod: ['mschap2'],
        ProtoVersion: 'l2tpv2',
        FastPath: true,
        keepAlive: '30',
        DialOnDemand: false,
        CookieLength: 4,
        DigestHash: 'sha1',
        CircuitId: 'circuit123'
      };

      const result = testWithOutput(
        'L2TPClient',
        'L2TP client with IPsec',
        { config },
        () => L2TPClient(config),
      );

      validateRouterConfig(result, ['/interface l2tp-client']);
    });
  });

  describe('SSTPClient', () => {
    it('should configure SSTP client', () => {
      const config: SstpClientConfig = {
        Server: { Address: 'sstp.example.com', Port: 443 },
        Credentials: { Username: 'sstpuser', Password: 'sstppass' },
        AuthMethod: ['mschap2'],
        Ciphers: ['aes256-sha'],
        TlsVersion: 'only-1.2',
        Proxy: { Address: 'proxy.example.com', Port: 8080 },
        SNI: true,
        PFS: 'yes',
        DialOnDemand: false,
        KeepAlive: 30,
        VerifyServerCertificate: true,
        VerifyServerAddressFromCertificate: false,
        ClientCertificateName: 'client-cert'
      };

      const result = testWithOutput(
        'SSTPClient',
        'SSTP client configuration',
        { config },
        () => SSTPClient(config),
      );

      validateRouterConfig(result, ['/interface sstp-client']);
    });
  });

  describe('IKeV2Client', () => {
    it('should configure IKeV2 client with pre-shared key', () => {
      const config: Ike2ClientConfig = {
        ServerAddress: 'ikev2.example.com',
        AuthMethod: 'pre-shared-key',
        PresharedKey: 'shared-secret-key',
        EncAlgorithm: ['aes-256', 'aes-128'],
        HashAlgorithm: ['sha256', 'sha1'],
        DhGroup: ['modp2048', 'modp1536'],
        Lifetime: '8h',
        NatTraversal: true,
        DpdInterval: '10m',
        PfsGroup: 'modp2048',
        ProposalLifetime: '30m',
        PolicySrcAddress: '0.0.0.0/0',
        PolicyDstAddress: '0.0.0.0/0',
        PolicyAction: 'encrypt',
        PolicyLevel: 'require',
        GeneratePolicy: 'port-strict'
      };

      const result = testWithOutput(
        'IKeV2Client',
        'IKeV2 client with pre-shared key',
        { config },
        () => IKeV2Client(config),
      );

      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity',
        '/ip ipsec policy',
      ]);
    });

    it('should configure IKeV2 client with EAP authentication', () => {
      const config: Ike2ClientConfig = {
        ServerAddress: 'ikev2-eap.example.com',
        AuthMethod: 'eap',
        Credentials: { Username: 'eapuser', Password: 'eappass' },
        EapMethods: ['eap-mschapv2'],
        ClientCertificateName: 'client-eap-cert'
      };

      const result = testWithOutput(
        'IKeV2Client',
        'IKeV2 client with EAP authentication',
        { config },
        () => IKeV2Client(config),
      );

      validateRouterConfig(result, ['/ip ipsec identity']);
    });
  });

  describe('VPNClientWrapper', () => {
    it('should configure Wireguard VPN with base config', () => {
      const vpnClient: VPNClient = {
        Wireguard: {
          InterfacePrivateKey: 'privatekey123',
          InterfaceAddress: '10.0.0.2/24',
          InterfaceDNS: '8.8.8.8',
          PeerPublicKey: 'publickey123',
          PeerEndpointAddress: '1.2.3.4',
          PeerEndpointPort: 51820,
          PeerAllowedIPs: '0.0.0.0/0'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'Wireguard VPN with base config',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      validateRouterConfig(result, [
        '/interface wireguard',
        '/interface wireguard peers',
        '/ip address',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should configure OpenVPN with base config', () => {
      const vpnClient: VPNClient = {
        OpenVPN: {
          Server: { Address: 'vpn.example.com' },
          AuthType: 'Credentials',
          Credentials: { Username: 'user', Password: 'pass' },
          Auth: 'sha256'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'OpenVPN with base config',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, [
        '/interface ovpn-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should return empty config for undefined VPN', () => {
      const vpnClient: VPNClient = {};

      const result = testWithOutput(
        'VPNClientWrapper',
        'Empty config for undefined VPN',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      validateRouterConfig(result, []);
    });
  });
}); 