import { describe, it } from 'vitest';
// import type { RouterConfig } from '../ConfigGenerator';
import type { WANConfig, WANLink, WANState } from '../../StarContext/WANType';
// import type { VPNClient } from '../../StarContext/Utils/VPNClientType';

import {
  ForeignWAN,
  DomesticWAN,
  WANLinks,
  WANCG,
} from './WANCG';

import { DomesticAddresslist } from '../Choose/ChooseCG';

describe('WANCG Module', () => {
  describe('ForeignWAN', () => {
    it('should configure ethernet foreign WAN', () => {
      const wanConfig: WANConfig = {
        InterfaceName: 'ether1',
        WirelessCredentials: undefined,
      };

      const result = testWithOutput(
        'ForeignWAN',
        'Ethernet foreign WAN configuration',
        { wanConfig },
        () => ForeignWAN(wanConfig),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should configure wireless foreign WAN', () => {
      const wanConfig: WANConfig = {
        InterfaceName: 'wifi2.4',
        WirelessCredentials: {
          SSID: 'ForeignNetwork',
          Password: 'foreignpass123',
        },
      };

      const result = testWithOutput(
        'ForeignWAN',
        'Wireless foreign WAN configuration',
        { wanConfig },
        () => ForeignWAN(wanConfig),
      );

      validateRouterConfig(result, [
        '/interface wifi',
        '/ip dhcp-client',
        '/interface list member',
      ]);
    });
  });

  describe('DomesticWAN', () => {
    it('should configure ethernet domestic WAN', () => {
      const wanConfig: WANConfig = {
        InterfaceName: 'ether2',
        WirelessCredentials: undefined,
      };

      const result = testWithOutput(
        'DomesticWAN',
        'Ethernet domestic WAN configuration',
        { wanConfig },
        () => DomesticWAN(wanConfig),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should configure wireless domestic WAN', () => {
      const wanConfig: WANConfig = {
        InterfaceName: 'wifi5',
        WirelessCredentials: {
          SSID: 'DomesticNetwork',
          Password: 'domesticpass456',
        },
      };

      const result = testWithOutput(
        'DomesticWAN',
        'Wireless domestic WAN configuration',
        { wanConfig },
        () => DomesticWAN(wanConfig),
      );

      validateRouterConfig(result, [
        '/interface wifi',
        '/ip dhcp-client',
        '/interface list member',
      ]);
    });
  });

  describe('DomesticAddresslist', () => {
    it('should configure domestic IP address list', () => {
      const result = testWithOutput(
        'DomesticAddresslist',
        'Domestic IP address list generation',
        {},
        () => DomesticAddresslist(),
      );

      validateRouterConfig(result, ['/ip firewall address-list']);
    });
  });

  describe('WANLinks', () => {
    it('should configure both foreign and domestic WAN links', () => {
      const wanLink: WANLink = {
        Foreign: {
          InterfaceName: 'ether1',
          WirelessCredentials: undefined,
        },
        Domestic: {
          InterfaceName: 'ether2',
          WirelessCredentials: undefined,
        },
      };

      const result = testWithOutput(
        'WANLinks',
        'Both foreign and domestic WAN links',
        { wanLink },
        () => WANLinks(wanLink),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
        '/ip firewall address-list',
      ]);
    });

    it('should configure only foreign WAN when domestic is not provided', () => {
      const wanLink: WANLink = {
        Foreign: {
          InterfaceName: 'ether1',
          WirelessCredentials: undefined,
        },
      };

      const result = testWithOutput(
        'WANLinks',
        'Foreign WAN only, domestic not provided',
        { wanLink },
        () => WANLinks(wanLink),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should handle wireless configurations', () => {
      const wanLink: WANLink = {
        Foreign: {
          InterfaceName: 'wifi2.4',
          WirelessCredentials: {
            SSID: 'ForeignWiFi',
            Password: 'foreignwifi123',
          },
        },
        Domestic: {
          InterfaceName: 'wifi5',
          WirelessCredentials: {
            SSID: 'DomesticWiFi',
            Password: 'domesticwifi456',
          },
        },
      };

      const result = testWithOutput(
        'WANLinks',
        'Wireless WAN configurations for both foreign and domestic',
        { wanLink },
        () => WANLinks(wanLink),
      );

      validateRouterConfig(result, ['/interface wifi']);
    });
  });

  describe('WANCG', () => {
    it('should configure WAN with VPN client and domestic link', () => {
      const wanState: WANState = {
        WANLink: {
          Foreign: {
            InterfaceName: 'ether1',
            WirelessCredentials: undefined,
          },
          Domestic: {
            InterfaceName: 'ether2',
            WirelessCredentials: undefined,
          },
        },
        VPNClient: {
          Wireguard: {
            InterfacePrivateKey: 'privatekey123',
            InterfaceAddress: '10.0.0.2/24',
            InterfaceDNS: '8.8.8.8',
            PeerPublicKey: 'publickey123',
            PeerEndpointAddress: '1.2.3.4',
            PeerEndpointPort: 51820,
            PeerAllowedIPs: '0.0.0.0/0',
          },
        },
      };

      const result = testWithOutput(
        'WANCG',
        'WAN with VPN client and domestic link',
        { wanState, domesticLink: true },
        () => WANCG(wanState, true),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
        '/ip firewall address-list',
        '/interface wireguard',
        '/interface wireguard peers',
        '/ip address',
        '/ip firewall nat',
      ]);
    });

    it('should configure WAN without VPN client', () => {
      const wanState: WANState = {
        WANLink: {
          Foreign: {
            InterfaceName: 'ether1',
            WirelessCredentials: undefined,
          },
        },
      };

      const result = testWithOutput(
        'WANCG',
        'WAN without VPN client',
        { wanState, domesticLink: false },
        () => WANCG(wanState, false),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should configure WAN with PPTP VPN client', () => {
      const wanState: WANState = {
        WANLink: {
          Foreign: {
            InterfaceName: 'ether1',
            WirelessCredentials: undefined,
          },
        },
        VPNClient: {
          PPTP: {
            ConnectTo: 'pptp.example.com',
            Credentials: { Username: 'pptpuser', Password: 'pptppass' },
            AuthMethod: ['mschap2'],
          },
        },
      };

      const result = testWithOutput(
        'WANCG',
        'WAN with PPTP VPN client',
        { wanState, domesticLink: false },
        () => WANCG(wanState, false),
      );

      validateRouterConfig(result, [
        '/interface ethernet',
        '/ip dhcp-client',
        '/interface pptp-client',
        '/ip firewall nat',
        '/interface list member',
        '/ip route',
      ]);
    });

    it('should handle complex wireless and VPN configuration', () => {
      const wanState: WANState = {
        WANLink: {
          Foreign: {
            InterfaceName: 'wifi2.4',
            WirelessCredentials: {
              SSID: 'FreeWiFi',
              Password: 'password123',
            },
          },
          Domestic: {
            InterfaceName: 'wifi5',
            WirelessCredentials: {
              SSID: 'HomeInternet',
              Password: 'homepass456',
            },
          },
        },
        VPNClient: {
          OpenVPN: {
            Server: { Address: 'openvpn.example.com', Port: 1194 },
            AuthType: 'Credentials',
            Credentials: { Username: 'vpnuser', Password: 'vpnpass' },
            Auth: 'sha256',
            Protocol: 'udp',
          },
        },
      };

      const result = testWithOutput(
        'WANCG',
        'Complex wireless and OpenVPN configuration',
        { wanState, domesticLink: true },
        () => WANCG(wanState, true),
      );

      validateRouterConfig(result, [
        '/interface wifi',
        '/interface ovpn-client',
        '/ip firewall address-list',
        '/ip firewall nat',
      ]);
    });
  });
}); 