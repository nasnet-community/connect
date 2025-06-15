import { describe, it, expect } from 'vitest';
import type { RouterConfig } from '../../ConfigGenerator';
import type {
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
  VPNClient
} from '../../../StarContext/Utils/VPNClientType';

import {
  isFQDN,
  RouteToVPN,
  InterfaceList,
  DNSVPN,
  BaseVPNConfig,
  WireguardClient,
  OpenVPNClient,
  PPTPClient,
  L2TPClient,
  SSTPClient,
  IKeV2Client,
  IKeV2Profile,
  IKeV2Proposal,
  IKeV2Peer,
  IKeV2Identity,
  IKeV2Policy,
  IKeV2ModeConfig,
  VPNClientWrapper
} from './VPNClientCG';

describe('VPNClientCG Module', () => {
  describe('isFQDN Utility Function', () => {
    it('should validate valid FQDNs', () => {
      const validFQDNs = [
        'example.com',
        'subdomain.example.com',
        'vpn.server.example.com',
        'test-server.company.org',
        'api.service.co.uk',
        'mail.google.com',
        'secure-vpn.provider.net',
        'server123.hosting.io',
        'a.b.c.d.e.com',
        'www.example-site.info'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Validate valid FQDN addresses',
        { validFQDNs },
        () => {
          const results = validFQDNs.map(fqdn => ({
            fqdn,
            isValid: isFQDN(fqdn)
          }));
          
          const allValid = results.every(result => result.isValid);
          const failedValidations = results.filter(result => !result.isValid);
          
          return {
            totalTested: validFQDNs.length,
            allValid,
            failedValidations,
            results
          };
        }
      );

      validFQDNs.forEach(fqdn => {
        expect(isFQDN(fqdn)).toBe(true);
      });
    });

    it('should reject invalid FQDNs (IP addresses)', () => {
      const ipAddresses = [
        '192.168.1.1',
        '10.0.0.1',
        '172.16.0.1',
        '8.8.8.8',
        '1.1.1.1',
        '255.255.255.255',
        '0.0.0.0',
        '127.0.0.1'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Reject IP addresses as FQDNs',
        { ipAddresses },
        () => {
          const results = ipAddresses.map(ip => ({
            ip,
            isValid: isFQDN(ip)
          }));
          
          const allInvalid = results.every(result => !result.isValid);
          const incorrectValidations = results.filter(result => result.isValid);
          
          return {
            totalTested: ipAddresses.length,
            allInvalid,
            incorrectValidations,
            results
          };
        }
      );

      ipAddresses.forEach(ip => {
        expect(isFQDN(ip)).toBe(false);
      });
    });

    it('should reject malformed domain names', () => {
      const malformedDomains = [
        'localhost',
        'single-word',
        '.example.com',
        'example.com.',
        'example..com',
        'example.c',
        'example.123',
        'example-.com',
        '-example.com',
        'example.co-m',
        'example.c-om',
        'example.c',
        'ex@mple.com',
        'example.com:8080',
        'https://example.com',
        'example.com/path',
        'example com',
        'example,com'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Reject malformed domain names',
        { malformedDomains },
        () => {
          const results = malformedDomains.map(domain => ({
            domain,
            isValid: isFQDN(domain)
          }));
          
          const allInvalid = results.every(result => !result.isValid);
          const incorrectValidations = results.filter(result => result.isValid);
          
          return {
            totalTested: malformedDomains.length,
            allInvalid,
            incorrectValidations,
            results
          };
        }
      );

      malformedDomains.forEach(domain => {
        expect(isFQDN(domain)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      const edgeCases = [
        '',
        ' ',
        '   ',
        'a.bb',
        'example.toolongextension123456789',
        '123.456.789',
        'test.123abc',
        'very-long-subdomain-name-that-exceeds-normal-limits.example.com',
        'normal.subdomain.example.verylongtldthatexceedslimits'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Handle edge cases and boundary conditions',
        { edgeCases },
        () => {
          const results = edgeCases.map(testCase => ({
            testCase,
            isValid: isFQDN(testCase)
          }));
          
          const validCount = results.filter(result => result.isValid).length;
          const invalidCount = results.filter(result => !result.isValid).length;
          
          return {
            totalTested: edgeCases.length,
            validCount,
            invalidCount,
            results
          };
        }
      );

      // Most edge cases should be invalid
      expect(isFQDN('')).toBe(false);
      expect(isFQDN(' ')).toBe(false);
      expect(isFQDN('   ')).toBe(false);
      expect(isFQDN('a.bb')).toBe(true); // This should be valid - 2 letter TLD is ok
    });

    it('should validate international domain names', () => {
      const internationalDomains = [
        'example.co.uk',
        'test.com.au',
        'server.org.za',
        'vpn.co.jp',
        'secure.com.br',
        'api.gov.in'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Validate international domain names',
        { internationalDomains },
        () => {
          const results = internationalDomains.map(domain => ({
            domain,
            isValid: isFQDN(domain)
          }));
          
          const allValid = results.every(result => result.isValid);
          const failedValidations = results.filter(result => !result.isValid);
          
          return {
            totalTested: internationalDomains.length,
            allValid,
            failedValidations,
            results
          };
        }
      );

      internationalDomains.forEach(domain => {
        expect(isFQDN(domain)).toBe(true);
      });
    });

    it('should validate domains with numbers and hyphens', () => {
      const mixedDomains = [
        'server1.example.com',
        'test-server.example.com',
        'api-v2.service123.org',
        'mail-server-01.company.net',
        '123server.example.com',
        'test123-server.example.com'
      ];

      testWithGenericOutput(
        'isFQDN',
        'Validate domains with numbers and hyphens',
        { mixedDomains },
        () => {
          const results = mixedDomains.map(domain => ({
            domain,
            isValid: isFQDN(domain)
          }));
          
          const allValid = results.every(result => result.isValid);
          const failedValidations = results.filter(result => !result.isValid);
          
          return {
            totalTested: mixedDomains.length,
            allValid,
            failedValidations,
            results
          };
        }
      );

      mixedDomains.forEach(domain => {
        expect(isFQDN(domain)).toBe(true);
      });
    });

    it('should test function behavior in VPN context', () => {
      const vpnEndpoints = [
        { address: 'vpn.example.com', expected: true, type: 'FQDN' },
        { address: '192.168.1.100', expected: false, type: 'IP' },
        { address: 'secure-vpn.provider.net', expected: true, type: 'FQDN' },
        { address: '10.0.0.1', expected: false, type: 'IP' },
        { address: 'server.company.org', expected: true, type: 'FQDN' },
        { address: '172.16.100.1', expected: false, type: 'IP' }
      ];

      testWithGenericOutput(
        'isFQDN',
        'Test function behavior with typical VPN endpoints',
        { vpnEndpoints },
        () => {
          const results = vpnEndpoints.map(endpoint => ({
            address: endpoint.address,
            expected: endpoint.expected,
            actual: isFQDN(endpoint.address),
            type: endpoint.type,
            correct: isFQDN(endpoint.address) === endpoint.expected
          }));
          
          const allCorrect = results.every(result => result.correct);
          const incorrectResults = results.filter(result => !result.correct);
          
          return {
            totalTested: vpnEndpoints.length,
            allCorrect,
            incorrectResults,
            fqdnCount: results.filter(r => r.type === 'FQDN').length,
            ipCount: results.filter(r => r.type === 'IP').length,
            results
          };
        }
      );

      vpnEndpoints.forEach(endpoint => {
        expect(isFQDN(endpoint.address)).toBe(endpoint.expected);
      });
    });
  });

  describe('RouteToVPN', () => {
    it('should generate VPN routing configuration with Wireguard interface', () => {
      const interfaceName = 'wireguard-client';
      const endpointAddress = '1.2.3.4';

      const result: RouterConfig = testWithOutput(
        'RouteToVPN',
        'VPN routing configuration for Wireguard',
        { interfaceName, endpointAddress },
        () => RouteToVPN(interfaceName, endpointAddress),
      );

      validateRouterConfig(result, ['/ip route']);
      
      // Verify specific route configurations
      expect(result['/ip route']).toHaveLength(2);
      
      // Find the VPN route and endpoint route
      const vpnRoute = result['/ip route'].find(route => route.includes('dst-address=0.0.0.0/0'));
      const endpointRoute = result['/ip route'].find(route => route.includes(`dst-address=${endpointAddress}`));
      
      expect(vpnRoute).toBeDefined();
      expect(vpnRoute).toContain(`gateway=${interfaceName}`);
      expect(vpnRoute).toContain('routing-table=to-VPN');
      
      expect(endpointRoute).toBeDefined();
      expect(endpointRoute).toContain('gateway=192.168.1.1');
    });

    it('should generate VPN routing configuration with OpenVPN interface', () => {
      const interfaceName = 'ovpn-client';
      const endpointAddress = 'vpn.example.com';

      const result = testWithOutput(
        'RouteToVPN',
        'VPN routing configuration for OpenVPN',
        { interfaceName, endpointAddress },
        () => RouteToVPN(interfaceName, endpointAddress),
      );

      validateRouterConfig(result, ['/ip route']);
      
      // Verify route is created (only one route for FQDN endpoints)
      expect(result['/ip route']).toHaveLength(1);
      expect(result['/ip route'][0]).toContain('comment="Route-to-VPN"');
    });

    it('should handle different interface types', () => {
      const testCases = [
        { interface: 'pptp-client', endpoint: '192.168.100.1' },
        { interface: 'l2tp-client', endpoint: '10.0.0.1' },
        { interface: 'sstp-client', endpoint: 'sstp.server.com' },
        { interface: 'ike2-client', endpoint: '172.16.0.1' }
      ];

      testCases.forEach(({ interface: interfaceName, endpoint }) => {
        const result = testWithOutput(
          'RouteToVPN',
          `VPN routing for ${interfaceName}`,
          { interfaceName, endpoint },
          () => RouteToVPN(interfaceName, endpoint),
        );

        validateRouterConfig(result, ['/ip route']);
        expect(result['/ip route']).toBeDefined();
        
        // Find VPN route and endpoint route (if exists)
        const vpnRoute = result['/ip route'].find(route => route.includes('dst-address=0.0.0.0/0'));
        expect(vpnRoute).toBeDefined();
        expect(vpnRoute).toContain(`gateway=${interfaceName}`);
        
        // Endpoint route only exists for IP addresses, not FQDNs
        const endpointRoute = result['/ip route'].find(route => route.includes(`dst-address=${endpoint}`));
        if (!endpoint.match(/^[a-zA-Z]/)) { // If it's an IP address
          expect(endpointRoute).toBeDefined();
        }
      });
    });
  });

  describe('InterfaceList', () => {
    it('should add VPN interface to WAN and FRN-WAN lists', () => {
      const interfaceName = 'wireguard-client';

      const result = testWithOutput(
        'InterfaceList',
        'Add Wireguard interface to WAN lists',
        { interfaceName },
        () => InterfaceList(interfaceName),
      );

      validateRouterConfig(result, ['/interface list member']);
      
      // Verify both interface list memberships
      expect(result['/interface list member']).toHaveLength(2);
      expect(result['/interface list member'][0]).toContain(`interface="${interfaceName}"`);
      expect(result['/interface list member'][0]).toContain('list="WAN"');
      expect(result['/interface list member'][1]).toContain(`interface="${interfaceName}"`);
      expect(result['/interface list member'][1]).toContain('list="FRN-WAN"');
    });

    it('should handle different VPN interface types', () => {
      const interfaceTypes = [
        'ovpn-client',
        'pptp-client', 
        'l2tp-client',
        'sstp-client',
        'ike2-client'
      ];

      interfaceTypes.forEach(interfaceName => {
        const result = testWithOutput(
          'InterfaceList',
          `Add ${interfaceName} to interface lists`,
          { interfaceName },
          () => InterfaceList(interfaceName),
        );

        validateRouterConfig(result, ['/interface list member']);
        expect(result['/interface list member']).toHaveLength(2);
        
        // Verify the interface name is used in both commands
        result['/interface list member'].forEach(command => {
          expect(command).toContain(`interface="${interfaceName}"`);
        });
      });
    });

    it('should use proper command structure', () => {
      const interfaceName = 'test-vpn-interface';

      const result = testWithOutput(
        'InterfaceList',
        'Verify interface list command structure',
        { interfaceName },
        () => InterfaceList(interfaceName),
      );

      validateRouterConfig(result, ['/interface list member']);
      
      // Check command format
      expect(result['/interface list member'][0]).toMatch(/^add interface="[^"]+" list="WAN"$/);
      expect(result['/interface list member'][1]).toMatch(/^add interface="[^"]+" list="FRN-WAN"$/);
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
    it('should combine all base VPN configurations with domestic link', () => {
      const interfaceName = 'wireguard-client';
      const endpointAddress = '1.2.3.4';
      const dns = '8.8.8.8';
      const domesticLink = true;

      const result = testWithOutput(
        'BaseVPNConfig',
        'Complete base VPN configuration with domestic link',
        { interfaceName, endpointAddress, dns, domesticLink },
        () => BaseVPNConfig(interfaceName, endpointAddress, dns, domesticLink),
      );

      validateRouterConfig(result, [
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
        '/ip firewall address-list',
        '/ip firewall mangle',
      ]);

      // Verify DNS NAT rules for domestic link (should have 4 rules)
      expect(result['/ip firewall nat']).toHaveLength(4);
      expect(result['/ip firewall nat'].filter(rule => rule.includes('VPN-LAN'))).toHaveLength(2);
      expect(result['/ip firewall nat'].filter(rule => rule.includes('Split-LAN'))).toHaveLength(2);
      
      // Verify interface list memberships
      expect(result['/interface list member']).toHaveLength(2);
      expect(result['/interface list member'][0]).toContain('list="WAN"');
      expect(result['/interface list member'][1]).toContain('list="FRN-WAN"');
      
      // Verify routing configuration
      expect(result['/ip route']).toHaveLength(2);
      expect(result['/ip route'][0]).toContain('routing-table=to-VPN');
      expect(result['/ip route'][1]).toContain('gateway=192.168.1.1');
    });

    it('should combine all base VPN configurations without domestic link', () => {
      const interfaceName = 'ovpn-client';
      const endpointAddress = 'vpn.example.com';
      const dns = '1.1.1.1';
      const domesticLink = false;

      const result = testWithOutput(
        'BaseVPNConfig',
        'Complete base VPN configuration without domestic link',
        { interfaceName, endpointAddress, dns, domesticLink },
        () => BaseVPNConfig(interfaceName, endpointAddress, dns, domesticLink),
      );

      validateRouterConfig(result, [
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
        '/ip firewall address-list',
        '/ip firewall mangle',
      ]);

      // Verify DNS NAT rules without domestic link (should have 2 rules)
      expect(result['/ip firewall nat']).toHaveLength(2);
      expect(result['/ip firewall nat'].filter(rule => rule.includes('VPN-LAN'))).toHaveLength(2);
      expect(result['/ip firewall nat'].filter(rule => rule.includes('Split-LAN'))).toHaveLength(0);
    });

    it('should handle different DNS servers', () => {
      const testCases = [
        { dns: '8.8.8.8', name: 'Google DNS' },
        { dns: '1.1.1.1', name: 'Cloudflare DNS' },
        { dns: '208.67.222.222', name: 'OpenDNS' },
        { dns: '192.168.1.1', name: 'Local DNS' }
      ];

      testCases.forEach(({ dns, name }) => {
        const result = testWithOutput(
          'BaseVPNConfig',
          `Base VPN config with ${name}`,
          { interfaceName: 'test-client', endpointAddress: '1.2.3.4', dns, domesticLink: false },
          () => BaseVPNConfig('test-client', '1.2.3.4', dns, false),
        );

        validateRouterConfig(result, ['/ip firewall nat', '/ip firewall address-list', '/ip firewall mangle']);
        
        // Verify DNS server is used in NAT rules
        result['/ip firewall nat'].forEach(rule => {
          expect(rule).toContain(`to-addresses=${dns}`);
        });
      });
    });

    it('should use correct interface names for different VPN types', () => {
      const vpnTypes = [
        { interface: 'wireguard-client', type: 'Wireguard' },
        { interface: 'ovpn-client', type: 'OpenVPN' },
        { interface: 'pptp-client', type: 'PPTP' },
        { interface: 'l2tp-client', type: 'L2TP' },
        { interface: 'sstp-client', type: 'SSTP' },
        { interface: 'ike2-client', type: 'IKeV2' }
      ];

      vpnTypes.forEach(({ interface: interfaceName, type }) => {
        const result = testWithOutput(
          'BaseVPNConfig',
          `Base config for ${type} interface`,
          { interfaceName, endpointAddress: 'test.example.com', dns: '8.8.8.8', domesticLink: true },
          () => BaseVPNConfig(interfaceName, 'test.example.com', '8.8.8.8', true),
        );

        validateRouterConfig(result, [
          '/ip firewall nat',
          '/interface list member',
          '/ip route',
          '/ip firewall address-list',
          '/ip firewall mangle',
        ]);

        // Verify interface name is used correctly
        expect(result['/interface list member'][0]).toContain(`interface="${interfaceName}"`);
        expect(result['/ip route'][0]).toContain(`gateway=${interfaceName}`);
      });
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
        DialOnDemand: false
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
      expect(result['/interface sstp-client'][0]).toContain(`user="${config.Credentials.Username}"`);
    });
  });

  describe('IKeV2 Utility Functions', () => {
    const baseConfig: Ike2ClientConfig = {
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
      ProposalLifetime: '30m'
    };

    describe('IKeV2Profile', () => {
      it('should generate IPsec profile with default parameters', () => {
        const profileName = 'test-profile';
        
        const result = testWithGenericOutput(
          'IKeV2Profile',
          'IPsec profile with default parameters',
          { config: baseConfig, profileName },
          () => IKeV2Profile(baseConfig, profileName)
        );

        expect(result).toContain(`name=${profileName}`);
        expect(result).toContain('enc-algorithm=aes-256,aes-128');
        expect(result).toContain('hash-algorithm=sha256,sha1');
        expect(result).toContain('dh-group=modp2048,modp1536');
        expect(result).toContain('lifetime=8h');
        expect(result).toContain('nat-traversal=yes');
        expect(result).toContain('dpd-interval=10m');
      });

      it('should generate profile with minimal configuration', () => {
        const minimalConfig: Ike2ClientConfig = {
          ServerAddress: 'minimal.example.com',
          AuthMethod: 'pre-shared-key',
          PresharedKey: 'key123'
        };
        
        const result = testWithGenericOutput(
          'IKeV2Profile',
          'IPsec profile with minimal configuration',
          { config: minimalConfig, profileName: 'minimal-profile' },
          () => IKeV2Profile(minimalConfig, 'minimal-profile')
        );

        expect(result).toContain('name=minimal-profile');
        expect(result).toContain('enc-algorithm=aes-256,aes-192,aes-128'); // defaults
        expect(result).toContain('nat-traversal=yes'); // default true
      });
    });

    describe('IKeV2Proposal', () => {
      it('should generate IPsec proposal for Phase 2', () => {
        const proposalName = 'test-proposal';
        
        const result = testWithGenericOutput(
          'IKeV2Proposal',
          'IPsec proposal for Phase 2 parameters',
          { config: baseConfig, proposalName },
          () => IKeV2Proposal(baseConfig, proposalName)
        );

        expect(result).toContain(`name=${proposalName}`);
        expect(result).toContain('pfs-group=modp2048');
        expect(result).toContain('enc-algorithms=aes-256-cbc,aes-128-cbc');
        expect(result).toContain('auth-algorithms=sha256,sha1');
        expect(result).toContain('lifetime=30m');
      });
    });

    describe('IKeV2Peer', () => {
      it('should generate IPsec peer configuration', () => {
        const peerName = 'test-peer';
        const profileName = 'test-profile';
        
        const result = testWithGenericOutput(
          'IKeV2Peer',
          'IPsec peer configuration',
          { config: baseConfig, peerName, profileName },
          () => IKeV2Peer(baseConfig, peerName, profileName)
        );

        expect(result).toContain(`name=${peerName}`);
        expect(result).toContain(`address=${baseConfig.ServerAddress}`);
        expect(result).toContain(`profile=${profileName}`);
        expect(result).toContain('exchange-mode=ike2');
        expect(result).toContain('send-initial-contact=yes');
      });

      it('should handle custom port and local address', () => {
        const configWithPort: Ike2ClientConfig = {
          ...baseConfig,
          Port: 4500,
          LocalAddress: '192.168.1.100'
        };
        
        const result = testWithGenericOutput(
          'IKeV2Peer',
          'IPsec peer with custom port and local address',
          { config: configWithPort },
          () => IKeV2Peer(configWithPort, 'peer-with-port', 'profile')
        );

        expect(result).toContain('port=4500');
        expect(result).toContain('local-address=192.168.1.100');
      });
    });

    describe('IKeV2Identity', () => {
      it('should generate identity with pre-shared key', () => {
        const peerName = 'test-peer';
        const modeConfigName = 'test-modeconf';
        const policyGroupName = 'test-policies';
        
        const result = testWithGenericOutput(
          'IKeV2Identity',
          'IPsec identity with pre-shared key authentication',
          { config: baseConfig, peerName, modeConfigName, policyGroupName },
          () => IKeV2Identity(baseConfig, peerName, modeConfigName, policyGroupName)
        );

        expect(result).toContain(`peer=${peerName}`);
        expect(result).toContain('auth-method=pre-shared-key');
        expect(result).toContain('secret="shared-secret-key"');
        expect(result).toContain(`mode-config=${modeConfigName}`);
        expect(result).toContain(`policy-template-group=${policyGroupName}`);
      });

      it('should generate identity with EAP authentication', () => {
        const eapConfig: Ike2ClientConfig = {
          ServerAddress: 'eap.example.com',
          AuthMethod: 'eap',
          Credentials: { Username: 'testuser', Password: 'testpass' },
          EapMethods: ['eap-mschapv2'],
          ClientCertificateName: 'client-cert'
        };
        
        const result = testWithGenericOutput(
          'IKeV2Identity',
          'IPsec identity with EAP authentication',
          { config: eapConfig },
          () => IKeV2Identity(eapConfig, 'eap-peer', 'eap-modeconf', 'eap-policies')
        );

        expect(result).toContain('auth-method=eap');
        expect(result).toContain('eap-methods=eap-mschapv2');
        expect(result).toContain('username="testuser"');
        expect(result).toContain('password="testpass"');
        expect(result).toContain('certificate=client-cert');
      });

      it('should generate identity with digital signature', () => {
        const certConfig: Ike2ClientConfig = {
          ServerAddress: 'cert.example.com',
          AuthMethod: 'digital-signature',
          ClientCertificateName: 'my-client-cert'
        };
        
        const result = testWithGenericOutput(
          'IKeV2Identity',
          'IPsec identity with digital signature',
          { config: certConfig },
          () => IKeV2Identity(certConfig, 'cert-peer', 'cert-modeconf', 'cert-policies')
        );

        expect(result).toContain('auth-method=digital-signature');
        expect(result).toContain('certificate=my-client-cert');
      });
    });

    describe('IKeV2Policy', () => {
      it('should generate IPsec policy template', () => {
        const policyGroupName = 'test-policies';
        const proposalName = 'test-proposal';
        
        const result = testWithGenericOutput(
          'IKeV2Policy',
          'IPsec policy template',
          { config: baseConfig, policyGroupName, proposalName },
          () => IKeV2Policy(baseConfig, policyGroupName, proposalName)
        );

        expect(result).toContain(`group=${policyGroupName}`);
        expect(result).toContain('template=yes');
        expect(result).toContain('src-address=0.0.0.0/0');
        expect(result).toContain('dst-address=0.0.0.0/0');
        expect(result).toContain(`proposal=${proposalName}`);
        expect(result).toContain('action=encrypt');
        expect(result).toContain('level=require');
      });

      it('should handle custom policy addresses', () => {
        const customPolicyConfig: Ike2ClientConfig = {
          ...baseConfig,
          PolicySrcAddress: '192.168.1.0/24',
          PolicyDstAddress: '10.0.0.0/8',
          PolicyAction: 'none',
          PolicyLevel: 'use'
        };
        
        const result = testWithGenericOutput(
          'IKeV2Policy',
          'IPsec policy with custom addresses',
          { config: customPolicyConfig },
          () => IKeV2Policy(customPolicyConfig, 'custom-policies', 'custom-proposal')
        );

        expect(result).toContain('src-address=192.168.1.0/24');
        expect(result).toContain('dst-address=10.0.0.0/8');
        expect(result).toContain('action=none');
        expect(result).toContain('level=use');
      });
    });

    describe('IKeV2ModeConfig', () => {
      it('should generate mode config when enabled', () => {
        const modeConfigName = 'test-modeconf';
        
        const result = testWithGenericOutput(
          'IKeV2ModeConfig',
          'IPsec mode config when enabled',
          { config: baseConfig, modeConfigName },
          () => IKeV2ModeConfig(baseConfig, modeConfigName)
        );

        expect(result).toContain(`name=${modeConfigName}`);
        expect(result).toContain('responder=no');
      });

      it('should return null when mode config disabled', () => {
        const disabledConfig: Ike2ClientConfig = {
          ...baseConfig,
          EnableModeConfig: false
        };
        
        const result = testWithGenericOutput(
          'IKeV2ModeConfig',
          'IPsec mode config when disabled',
          { config: disabledConfig },
          () => IKeV2ModeConfig(disabledConfig, 'disabled-modeconf')
        );

        expect(result).toBeNull();
      });

      it('should include optional parameters', () => {
        const configWithOptions: Ike2ClientConfig = {
          ...baseConfig,
          SrcAddressList: 'vpn-clients',
          ConnectionMark: 'vpn-mark'
        };
        
        const result = testWithGenericOutput(
          'IKeV2ModeConfig',
          'IPsec mode config with optional parameters',
          { config: configWithOptions },
          () => IKeV2ModeConfig(configWithOptions, 'full-modeconf')
        );

        expect(result).toContain('src-address-list=vpn-clients');
        expect(result).toContain('connection-mark=vpn-mark');
      });
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
        '/ip ipsec policy group',
        '/ip ipsec mode-config'
      ]);

      // Verify command structure contains key elements
      expect(result['/ip ipsec profile'][0]).toContain('name=ike2-profile');
      expect(result['/ip ipsec proposal'][0]).toContain('name=ike2-proposal');
      expect(result['/ip ipsec peer'][0]).toContain('name=ike2-peer');
      expect(result['/ip ipsec identity'][0]).toContain('auth-method=pre-shared-key');
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
      
      // Verify EAP-specific configuration
      expect(result['/ip ipsec identity'][0]).toContain('auth-method=eap');
      expect(result['/ip ipsec identity'][0]).toContain('eap-methods=eap-mschapv2');
      expect(result['/ip ipsec identity'][0]).toContain('username="eapuser"');
    });

    it('should configure IKeV2 client with digital signature', () => {
      const config: Ike2ClientConfig = {
        ServerAddress: 'ikev2-cert.example.com',
        AuthMethod: 'digital-signature',
        ClientCertificateName: 'my-client-certificate',
        EncAlgorithm: ['aes-256'],
        HashAlgorithm: ['sha256'],
        DhGroup: ['modp2048']
      };

      const result = testWithOutput(
        'IKeV2Client',
        'IKeV2 client with digital signature',
        { config },
        () => IKeV2Client(config),
      );

      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity',
        '/ip ipsec policy'
      ]);

      // Verify certificate-based authentication
      expect(result['/ip ipsec identity'][0]).toContain('auth-method=digital-signature');
      expect(result['/ip ipsec identity'][0]).toContain('certificate=my-client-certificate');
    });

    it('should use custom component names when provided', () => {
      const config: Ike2ClientConfig = {
        ServerAddress: 'custom.example.com',
        AuthMethod: 'pre-shared-key',
        PresharedKey: 'custom-key',
        ProfileName: 'custom-profile',
        PeerName: 'custom-peer',
        ProposalName: 'custom-proposal',
        PolicyGroupName: 'custom-policies',
        ModeConfigName: 'custom-modeconf'
      };

      const result = testWithOutput(
        'IKeV2Client',
        'IKeV2 client with custom component names',
        { config },
        () => IKeV2Client(config),
      );

      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity',
        '/ip ipsec policy group'
      ]);

      // Verify custom names are used
      expect(result['/ip ipsec profile'][0]).toContain('name=custom-profile');
      expect(result['/ip ipsec proposal'][0]).toContain('name=custom-proposal');
      expect(result['/ip ipsec peer'][0]).toContain('name=custom-peer');
      expect(result['/ip ipsec policy group'][0]).toContain('name=custom-policies');
    });

    it('should handle minimal configuration with defaults', () => {
      const config: Ike2ClientConfig = {
        ServerAddress: 'minimal.example.com',
        AuthMethod: 'pre-shared-key',
        PresharedKey: 'minimal-key'
      };

      const result = testWithOutput(
        'IKeV2Client',
        'IKeV2 client with minimal configuration',
        { config },
        () => IKeV2Client(config),
      );

      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity'
      ]);

      // Verify defaults are applied
      expect(result['/ip ipsec profile'][0]).toContain('enc-algorithm=aes-256,aes-192,aes-128');
      expect(result['/ip ipsec profile'][0]).toContain('hash-algorithm=sha256,sha1');
      expect(result['/ip ipsec profile'][0]).toContain('lifetime=8h');
    });
  });

  describe('VPNClientWrapper', () => {
    it('should configure Wireguard VPN with base config and domestic link', () => {
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
        'Wireguard VPN with base config and domestic link',
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

      // Verify Wireguard-specific configuration
      expect(result['/interface wireguard'][0]).toContain('name=wireguard-client');
      expect(result['/interface wireguard peers'][0]).toContain('interface=wireguard-client');
      
      // Verify custom DNS is used
      expect(result['/ip firewall nat'].some(rule => rule.includes('to-addresses=8.8.8.8'))).toBe(true);
      
      // Verify domestic link configuration (4 DNS NAT rules)
      expect(result['/ip firewall nat']).toHaveLength(4);
    });

    it('should configure OpenVPN with base config without domestic link', () => {
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
        'OpenVPN with base config without domestic link',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, [
        '/interface ovpn-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);

      // Verify OpenVPN-specific configuration
      expect(result['/interface ovpn-client'][0]).toContain('name=ovpn-client');
      expect(result['/interface ovpn-client'][0]).toContain('connect-to=vpn.example.com');
      
      // Verify default DNS is used (1.1.1.1)
      expect(result['/ip firewall nat'].some(rule => rule.includes('to-addresses=1.1.1.1'))).toBe(true);
      
      // Verify no domestic link configuration (2 DNS NAT rules)
      expect(result['/ip firewall nat']).toHaveLength(2);
    });

    it('should configure PPTP VPN with base config', () => {
      const vpnClient: VPNClient = {
        PPTP: {
          ConnectTo: 'pptp.example.com',
          Credentials: { Username: 'pptpuser', Password: 'pptppass' },
          AuthMethod: ['mschap2']
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'PPTP VPN with base config',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      validateRouterConfig(result, [
        '/interface pptp-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);

      // Verify PPTP-specific configuration
      expect(result['/interface pptp-client'][0]).toContain('name=pptp-client');
      expect(result['/interface pptp-client'][0]).toContain('connect-to=pptp.example.com');
      
      // Verify interface name and endpoint are used correctly
      expect(result['/interface list member'].some(rule => rule.includes('interface="pptp-client"'))).toBe(true);
      // PPTP connects to FQDN so no endpoint route is created
      expect(result['/ip route'].some(rule => rule.includes('gateway=pptp-client'))).toBe(true);
    });

    it('should configure L2TP VPN with base config', () => {
      const vpnClient: VPNClient = {
        L2TP: {
          Server: { Address: 'l2tp.example.com', Port: 1701 },
          Credentials: { Username: 'l2tpuser', Password: 'l2tppass' },
          UseIPsec: true,
          IPsecSecret: 'sharedsecret'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'L2TP VPN with base config',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, [
        '/interface l2tp-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);

      // Verify L2TP-specific configuration
      expect(result['/interface l2tp-client'][0]).toContain('name=l2tp-client');
      expect(result['/interface l2tp-client'][0]).toContain('connect-to=l2tp.example.com');
      expect(result['/interface l2tp-client'][0]).toContain('use-ipsec=yes');
    });

    it('should configure SSTP VPN with base config', () => {
      const vpnClient: VPNClient = {
        SSTP: {
          Server: { Address: 'sstp.example.com', Port: 443 },
          Credentials: { Username: 'sstpuser', Password: 'sstppass' },
          AuthMethod: ['mschap2']
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'SSTP VPN with base config',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      validateRouterConfig(result, [
        '/interface sstp-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);

      // Verify SSTP-specific configuration
      expect(result['/interface sstp-client'][0]).toContain('name=sstp-client');
      expect(result['/interface sstp-client'][0]).toContain('connect-to=sstp.example.com');
    });

    it('should configure IKeV2 VPN with base config', () => {
      const vpnClient: VPNClient = {
        IKeV2: {
          ServerAddress: 'ikev2.example.com',
          AuthMethod: 'pre-shared-key',
          PresharedKey: 'sharedsecret123'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'IKeV2 VPN with base config',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity',
        '/ip ipsec policy',
        '/ip firewall nat',
        '/ip firewall address-list',
        '/ip firewall mangle',
      ]);

      // Verify IKeV2-specific configuration
      expect(result['/ip ipsec peer'][0]).toContain('address=ikev2.example.com');
      expect(result['/ip ipsec identity'][0]).toContain('auth-method=pre-shared-key');
      
      // IKeV2 also gets base config with interface list and routes
      expect(result['/interface list member']).toBeDefined();
      expect(result['/ip route']).toBeDefined();
      
      // Verify address-list and mangle rules are present
      expect(result['/ip firewall address-list']?.some(rule => rule.includes('list=VPNE'))).toBe(true);
      expect(result['/ip firewall mangle']?.length).toBeGreaterThan(0);
    });

    it('should return empty config for undefined VPN', () => {
      const vpnClient: VPNClient = {};

      const result = testWithOutput(
        'VPNClientWrapper',
        'Empty config for undefined VPN',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      // Empty config should still be a valid RouterConfig object
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      
      // Should have no configuration sections
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle all VPN types with proper interface mapping', () => {
      const vpnTypes = [
        { 
          config: { Wireguard: { InterfacePrivateKey: 'key', InterfaceAddress: '10.0.0.1/24', PeerPublicKey: 'pubkey', PeerEndpointAddress: '1.1.1.1', PeerEndpointPort: 51820, PeerAllowedIPs: '0.0.0.0/0' } },
          expectedInterface: 'wireguard-client',
          type: 'Wireguard'
        },
        {
          config: { OpenVPN: { Server: { Address: 'ovpn.test.com' }, AuthType: 'Credentials' as const, Credentials: { Username: 'user', Password: 'pass' }, Auth: 'sha256' as const } },
          expectedInterface: 'ovpn-client',
          type: 'OpenVPN'
        },
        {
          config: { PPTP: { ConnectTo: 'pptp.test.com', Credentials: { Username: 'user', Password: 'pass' } } },
          expectedInterface: 'pptp-client',
          type: 'PPTP'
        },
        {
          config: { L2TP: { Server: { Address: 'l2tp.test.com' }, Credentials: { Username: 'user', Password: 'pass' } } },
          expectedInterface: 'l2tp-client',
          type: 'L2TP'
        },
        {
          config: { SSTP: { Server: { Address: 'sstp.test.com' }, Credentials: { Username: 'user', Password: 'pass' } } },
          expectedInterface: 'sstp-client',
          type: 'SSTP'
        },
        {
          config: { IKeV2: { ServerAddress: 'ikev2.test.com', AuthMethod: 'pre-shared-key' as const, PresharedKey: 'secret' } },
          expectedInterface: 'ike2-client',
          type: 'IKeV2'
        }
      ];

      vpnTypes.forEach(({ config, expectedInterface, type }) => {
        const result = testWithOutput(
          'VPNClientWrapper',
          `${type} interface mapping verification`,
          { vpnClient: config, domesticLink: false },
          () => VPNClientWrapper(config, false),
        );

        // Verify correct interface name is used in base configuration
        if (type !== 'IKeV2') {
          expect(result['/interface list member']?.some(rule => rule.includes(`interface="${expectedInterface}"`))).toBe(true);
          expect(result['/ip route']?.some(rule => rule.includes(`gateway=${expectedInterface}`) || rule.includes('routing-table=to-VPN'))).toBe(true);
        }
        // All VPN types now get base configuration including interface lists and routes
      });
    });

    it('should duplicate routes with main table when DomesticLink is false', () => {
      const vpnClient: VPNClient = {
        Wireguard: {
          InterfacePrivateKey: 'test-private-key',
          InterfaceAddress: '10.0.0.2/24',
          InterfaceDNS: '8.8.8.8',
          PeerPublicKey: 'test-public-key',
          PeerEndpointAddress: '1.2.3.4',
          PeerEndpointPort: 51820,
          PeerAllowedIPs: '0.0.0.0/0'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'Route duplication with main table when DomesticLink is false',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, ['/ip route']);
      
      // Should have original routes plus duplicated routes with main table
      expect(result['/ip route']).toBeDefined();
      expect(result['/ip route'].length).toBeGreaterThan(2);
      
      // Check for original routes with to-VPN table
      const vpnTableRoutes = result['/ip route'].filter(route => 
        route.includes('routing-table=to-VPN')
      );
      expect(vpnTableRoutes.length).toBeGreaterThan(0);
      
      // Check for duplicated routes with main table
      const mainTableRoutes = result['/ip route'].filter(route => 
        route.includes('routing-table=main')
      );
      expect(mainTableRoutes.length).toBeGreaterThan(0);
      
      // Verify that main table routes are duplicates (same content except table)
      vpnTableRoutes.forEach(vpnRoute => {
        const expectedMainRoute = vpnRoute.replace('routing-table=to-VPN', 'routing-table=main');
        expect(mainTableRoutes).toContain(expectedMainRoute);
      });
    });

    it('should not duplicate routes when DomesticLink is true', () => {
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
        'No route duplication when DomesticLink is true',
        { vpnClient, domesticLink: true },
        () => VPNClientWrapper(vpnClient, true),
      );

      validateRouterConfig(result, ['/ip route']);
      
      // Should have only original routes, no duplicates
      const allRoutes = result['/ip route'] || [];
      const vpnTableRoutes = allRoutes.filter(route => 
        route.includes('routing-table=to-VPN')
      );
      const mainTableRoutes = allRoutes.filter(route => 
        route.includes('routing-table=main')
      );
      
      // Should have VPN table routes but no main table routes
      expect(vpnTableRoutes.length).toBeGreaterThan(0);
      expect(mainTableRoutes.length).toBe(0);
    });

    it('should duplicate routes correctly for all VPN types when DomesticLink is false', () => {
      const vpnTypes = [
        {
          name: 'Wireguard',
          config: { 
            Wireguard: { 
              InterfacePrivateKey: 'key', 
              InterfaceAddress: '10.0.0.1/24', 
              PeerPublicKey: 'pubkey', 
              PeerEndpointAddress: '1.1.1.1', 
              PeerEndpointPort: 51820, 
              PeerAllowedIPs: '0.0.0.0/0' 
            } 
          }
        },
        {
          name: 'OpenVPN',
          config: { 
            OpenVPN: { 
              Server: { Address: 'ovpn.test.com' }, 
              AuthType: 'Credentials' as const, 
              Credentials: { Username: 'user', Password: 'pass' }, 
              Auth: 'sha256' as const 
            } 
          }
        },
        {
          name: 'PPTP',
          config: { 
            PPTP: { 
              ConnectTo: 'pptp.test.com', 
              Credentials: { Username: 'user', Password: 'pass' } 
            } 
          }
        },
        {
          name: 'L2TP',
          config: { 
            L2TP: { 
              Server: { Address: 'l2tp.test.com' }, 
              Credentials: { Username: 'user', Password: 'pass' } 
            } 
          }
        },
        {
          name: 'SSTP',
          config: { 
            SSTP: { 
              Server: { Address: 'sstp.test.com' }, 
              Credentials: { Username: 'user', Password: 'pass' } 
            } 
          }
        }
      ];

      vpnTypes.forEach(({ name, config }) => {
        const result = testWithOutput(
          'VPNClientWrapper',
          `Route duplication for ${name} when DomesticLink is false`,
          { vpnClient: config, domesticLink: false },
          () => VPNClientWrapper(config, false),
        );

        if (result['/ip route']) {
          // Check for both VPN table and main table routes
          const vpnTableRoutes = result['/ip route'].filter(route => 
            route.includes('routing-table=to-VPN')
          );
          const mainTableRoutes = result['/ip route'].filter(route => 
            route.includes('routing-table=main')
          );
          
          expect(vpnTableRoutes.length).toBeGreaterThan(0);
          expect(mainTableRoutes.length).toBeGreaterThan(0);
          
          // Verify route duplication
          vpnTableRoutes.forEach(vpnRoute => {
            const expectedMainRoute = vpnRoute.replace('routing-table=to-VPN', 'routing-table=main');
            expect(mainTableRoutes).toContain(expectedMainRoute);
          });
        }
      });
    });

    it('should handle IKeV2 correctly without route duplication', () => {
      const vpnClient: VPNClient = {
        IKeV2: {
          ServerAddress: 'ikev2.test.com',
          AuthMethod: 'pre-shared-key',
          PresharedKey: 'secret'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'IKeV2 should not have route duplication (no interface-based routes)',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      // IKeV2 also gets base config with routes and interface lists
      expect(result['/ip route']).toBeDefined();
      expect(result['/interface list member']).toBeDefined();
      
      // But should have other IKeV2-specific configuration
      expect(result['/ip ipsec peer']).toBeDefined();
      expect(result['/ip ipsec identity']).toBeDefined();
    });

    it('should preserve original routes and add duplicates when DomesticLink is false', () => {
      const vpnClient: VPNClient = {
        Wireguard: {
          InterfacePrivateKey: 'preservation-test-key',
          InterfaceAddress: '10.0.0.5/24',
          PeerPublicKey: 'preservation-pub-key',
          PeerEndpointAddress: 'preserve.test.com',
          PeerEndpointPort: 51820,
          PeerAllowedIPs: '0.0.0.0/0'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'Preserve original routes and add duplicates',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, ['/ip route']);
      
      const allRoutes = result['/ip route'];
      expect(allRoutes).toBeDefined();
      expect(allRoutes.length).toBeGreaterThanOrEqual(3); // At least 1 original + 2 duplicated (no endpoint route for FQDN)
      
      // Should have original Wireguard routes
      const originalWgRoute = allRoutes.find(route => 
        route.includes('dst-address=0.0.0.0/0') && 
        route.includes('gateway=wireguard-client') &&
        route.includes('routing-table=to-VPN')
      );
      expect(originalWgRoute).toBeDefined();
      
      // Should have duplicated route with main table
      const duplicatedWgRoute = allRoutes.find(route => 
        route.includes('dst-address=0.0.0.0/0') && 
        route.includes('gateway=wireguard-client') &&
        route.includes('routing-table=main')
      );
      expect(duplicatedWgRoute).toBeDefined();
      
      // Note: preserve.test.com is a FQDN, so no endpoint route is created
      // (endpoint routes are only created for IP addresses)
    });

    it('should handle empty VPN configuration gracefully', () => {
      const vpnClient: VPNClient = {};

      const result = testWithOutput(
        'VPNClientWrapper',
        'Handle empty VPN configuration',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      // Should return empty config without errors
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should verify route table replacement regex works correctly', () => {
      // Test the regex replacement logic directly through the wrapper
      const vpnClient: VPNClient = {
        OpenVPN: {
          Server: { Address: 'regex.test.com' },
          AuthType: 'Credentials',
          Credentials: { Username: 'user', Password: 'pass' },
          Auth: 'sha256'
        }
      };

      const result = testWithOutput(
        'VPNClientWrapper',
        'Verify routing table regex replacement',
        { vpnClient, domesticLink: false },
        () => VPNClientWrapper(vpnClient, false),
      );

      validateRouterConfig(result, ['/ip route']);
      
      const allRoutes = result['/ip route'];
      
      // Find routes that should have been converted
      const mainTableRoutes = allRoutes.filter(route => 
        route.includes('routing-table=main')
      );
      
      // Verify no route has malformed table names from regex replacement
      mainTableRoutes.forEach(route => {
        expect(route).not.toMatch(/routing-table=to-VPNmain/); // Should not have concatenated names
        expect(route).not.toMatch(/routing-table=mainVPN/);    // Should not have partial replacements
        expect(route).toMatch(/routing-table=main(\s|$)/);     // Should have clean 'main' table
      });
      
      // Verify original routes still exist with correct table names
      const vpnTableRoutes = allRoutes.filter(route => 
        route.includes('routing-table=to-VPN')
      );
      
      vpnTableRoutes.forEach(route => {
        expect(route).toMatch(/routing-table=to-VPN(\s|$)/);   // Should have clean 'to-VPN' table
        expect(route).not.toMatch(/routing-table=to-VPNmain/); // Should not be corrupted
      });
    });
  });
}); 