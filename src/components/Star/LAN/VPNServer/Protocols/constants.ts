import type { VPNType } from "../../../StarContext/CommonType";

export const VPN_PROTOCOLS: { id: VPNType; name: string; logo: string; description: string }[] = [
    {
      id: "Wireguard",
      name: "WireGuard",
      logo: "/images/vpn/wireguard.svg",
      description: "Modern, efficient, and secure VPN protocol with excellent performance"
    },
    {
      id: "OpenVPN",
      name: "OpenVPN",
      logo: "/images/vpn/openvpn.svg",
      description: "Versatile and widely-supported VPN protocol with robust security features"
    },
    {
      id: "PPTP",
      name: "PPTP",
      logo: "/images/vpn/pptp.svg",
      description: "Legacy protocol with broad compatibility but weaker security"
    },
    {
      id: "L2TP",
      name: "L2TP/IPsec",
      logo: "/images/vpn/l2tp.svg",
      description: "Improved security over PPTP with wide device compatibility"
    },
    {
      id: "SSTP",
      name: "SSTP",
      logo: "/images/vpn/sstp.svg",
      description: "Microsoft-developed protocol that works well through firewalls"
    },
    {
      id: "IKeV2",
      name: "IKEv2",
      logo: "/images/vpn/ikev2.svg",
      description: "Fast, secure, and stable protocol with excellent reconnection capabilities"
    }
  ];