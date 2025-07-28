# NASNET Connect 🌟

NasNet Connect is a free, open-source networking tool built for the Iranian Starlink community, designed specifically to run on MikroTik routers. It automates complex configurations to protect user privacy by masking Starlink IPs, intelligently routing and managing traffic, enabling remote access over Iran’s internet, and supporting features like multiple SSIDs, public IP sharing, and gaming traffic optimization. Developed as a community-driven project, it provides a secure, censorship-resistant, and customizable gateway for Starlink users while remaining accessible and constantly improved through open collaboration.

https://connect.starlink4iran.com/


<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.17.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.1.6-blue)
![Qwik](https://img.shields.io/badge/qwik-latest-purple)

</div>

## ✨ Features

- 🌐 Multi-language support (en, ar, fa, it, ru, sk, zh)
- 🔒 Secure router management and configuration
- 🎮 Game-specific port forwarding database
- 🔄 Automatic system updates scheduling
- 📊 Network performance visualization
- 🛡️ SSL/TLS certificate management
- ⚡ VPN server configuration
- 🕒 NTP synchronization
- ☁️ DDNS support
- 🌓 Dark/Light theme support

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nasnet-community/connect.git

# Navigate to project directory
cd nasnet-connect

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Start development server in debug mode
pnpm dev.debug
```

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🌍 Internationalization

The project supports multiple languages. To work with translations:

```bash
# Extract messages for translation
pnpm i18n-extract

# Translate extracted messages
pnm i18n-translate
```

## 🧩 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   ├── locales/        # Translation files
│   ├── routes/         # Application routes
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
└── package.json
```

## 🔧 Configuration

The application can be configured through environment variables:

```env
VITE_API_URL=your_api_url
VITE_APP_VERSION=your_app_version
```

## 🛠️ Built With

- [Qwik](https://qwik.dev/) - High-performance web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📡 Router Configuration Generator

<div align="center">
<img src="https://i.imgur.com/XXXXXX.png" alt="NASNET Router Configuration" width="800"/>

_NASNET Smart Router Configuration System_

</div>

### 🌐 Network Architecture

```ascii
                                    INTERNET
                                       ⬆
                                       |
                    +------------------+------------------+
                    |                  |                 |
              DOMESTIC WAN       FOREIGN WAN        VPN CLIENT
                    |                  |                 |
                    |        NASNET ROUTER              |
                    |     +-----------------+           |
                    +---->|    FIREWALL    |<----------+
                          |     Rules      |
                          +-----------------+
                                 |
                          +-----------------+
                          |      NAT       |
                          |   Masquerade   |
                          +-----------------+
                                 |
            +------------------+-----------------+------------------+
            |                  |                |                   |
      SPLIT LAN          DOMESTIC LAN        FOREIGN LAN         VPN LAN
   192.168.10.0/24      192.168.20.0/24     192.168.30.0/24    192.168.40.0/24
   Smart Routing        DOMESTIC Traffic    FOREIGN Traffic    Secure Tunnel
```

### 🔀 Traffic Management

- **Split LAN**: Smart routing based on destination
- **Domestic LAN**: for only Domestic Link traffic
- **Foreign LAN**: for only Foreign Link traffic
- **VPN LAN**: VPN-tunneled traffic

### 🔀 Traffic Flow Management

```ascii
         +----------------------+
         |    Incoming Packet   |
         +----------------------+
                    |
          +---------+---------+
          |     Route Match    |
          +---------+---------+
                    |
         +----------+---------+
         |          |         |
    Domestic    Foreign      VPN
    Traffic     Traffic    Traffic
         |          |         |
   Local DNS    Global DNS  VPN DNS
   Servers      Servers     Tunnel
   (8.8.8.8)   (1.1.1.1)   (Custom)
```

### 🌟 Key Components

1. **Multi-WAN Setup**

   - Domestic connection
   - Foreign connection
   - Automatic failover

2. **VPN Services**

   - WireGuard server/client
   - OpenVPN server
   - Multi-client support

3. **Wireless Networks**

   - Multi-SSID support
   - Band steering (2.4/5 GHz)
   - Isolated network segments

4. **Gaming Features**

```ascii
                     ┌─────────────┐
                     │ Game Traffic│
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │    Route    │
                     │  Detection  │
                     └──────┬──────┘
                            │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │   Local   │   │  foreign  │   │ Protected │
    │    link   │   │  Server   │   │  VPN Link │
    └───────────┘   └───────────┘   └───────────┘
```

### 📊 Network Segments

| Network      | IP Range        | Purpose               |
| ------------ | --------------- | --------------------- |
| Split LAN    | 192.168.10.0/24 | Smart-routed traffic  |
| Domestic LAN | 192.168.20.0/24 | Local traffic only    |
| Foreign LAN  | 192.168.30.0/24 | International traffic |
| VPN LAN      | 192.168.40.0/24 | VPN-protected traffic |

### 🔧 Auto-Configuration

1. **Initial Setup**

```ascii
    ┌─────┐          ┌──────────┐          ┌────────┐
    │User │          │Generator │          │Router  │
    └──┬──┘          └────┬─────┘          └───┬────┘
       │                  │                     │
       │ Input Requirements                     │
       │─────────────────>│                     │
       │                  │                     │
       │                  │   Generate Config   │
       │                  │───────────┐        │
       │                  │           │        │
       │                  │<──────────┘        │
       │                  │                     │
       │                  │   Apply Settings    │
       │                  │────────────────────>│
       │                  │                     │
       │                  │                     │
       │      Ready to Use                      │
       │<─────────────────────────────────────────│
    ┌──┴──┐          ┌────┴─────┐          ┌───┴────┐
    │User │          │Generator │          │Router  │
    └─────┘          └──────────┘          └────────┘
```

2. **Maintenance**
   - Automatic updates
   - Scheduled reboots
   - Certificate management
   - Performance monitoring

> **💡 Tip**: Use our web interface to generate configurations without manual scripting!

### 🎮 Gaming Optimization

- Automatic port forwarding
- Game-specific routing rules
- Low-latency paths

```ascii
Game Traffic
     |
     v
+----------------+
| Traffic Type   |
+----------------+
         |
   +-----+-----+
   |     |     |
   v     v     v
Local  Int'l  VPN
Game   Game   Game
   |     |     |
   v     v     v
+----------------+
| Route Selection|
+----------------+
   |     |     |
   v     v     v
DOM   FRN   VPN
WAN   WAN   WAN
   |     |     |
   v     v     v
+----------------+
| QoS Priority  |
+----------------+
```

### 📊 Network Management Flow

```ascii
+---------------+  Auto Updates  +----------------+
|   System      |<------------->| Package Mgmt   |
| Maintenance   |               |    System      |
+---------------+               +----------------+
       ^                              ^
       |                              |
       v                              v
+---------------+               +----------------+
|  Scheduled    |<------------->|  Certificate   |
|   Tasks       |  SSL Renewal  |  Management   |
+---------------+               +----------------+
       ^                              ^
       |                              |
       v                              v
+---------------+               +----------------+
|  Performance  |<------------->|   Logging &    |
|  Monitoring   |  Stats Sync   |  Debugging    |
+---------------+               +----------------+
```

---

## 📄 License

© 2025 NASNET Connect. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

We welcome bug reports, feature requests, and questions! You can submit issues in two ways:

### GitHub Issues

1. Visit our [GitHub Issues page](https://github.com/nasnet-community/connect/issues)
2. Click on "New Issue"
3. Choose the appropriate issue template
4. Fill in the required information
5. Submit your issue

### Telegram Support

For immediate support or questions:

1. Join our [Telegram channel](https://t.me/joinnasnet)
2. Send your question or issue description
3. Our team will respond as soon as possible

When reporting issues, please include:

- Description of the problem
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Your environment details (OS, browser, etc.)
- router configuration file (with sensitive data removed)
- State History log from the Debug Tools panel (with sensitive data removed)

> **Note**: Before submitting configuration files or logs, ensure you've removed all sensitive information such as passwords, IP addresses, and personal data.

## 📧 Contact

- Email: [joinnasnet@gmail.com](mailto:joinnasnet@gmail.com)
- Twitter: [@joinNASNET](https://x.com/joinNASNET)
- GitHub: [@nasnet-community](https://github.com/nasnet-community)
- YouTube: [@JoinNASNET](https://www.youtube.com/@JoinNASNET)
- Telegram: [joinnasnet](https://t.me/joinnasnet)
- Instagram: [@joinnasnet](https://www.instagram.com/joinnasnet)
- Website: [starlink4iran.com](https://www.starlink4iran.com/)

Join our community and stay updated with the latest news and updates!

---

## 🙏 Acknowledgments

- The Qwik team for their amazing framework
- All contributors who have helped this project grow

---

<div align="center">
Made with ❤️ by the NASNET Community
</div>
