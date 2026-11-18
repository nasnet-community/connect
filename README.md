# NASNET Connect 🌟

> [!CAUTION]
>
> **This project is archived and no longer maintained.**
> NasNet Connect gets no more updates, bug fixes or support, and issues and pull requests are not reviewed. Use it at your own risk.
>
> To manage MikroTik routers, use **[NasNet Panel](https://www.joinnasnet.com/fa/products/nasnet-panel/)** instead.

NasNet Connect is a free, open-source networking tool built for the Iranian Starlink community, designed specifically to run on MikroTik routers. It automates complex configurations to protect user privacy by masking Starlink IPs, intelligently routing and managing traffic, enabling remote access over Iran’s internet, and supporting features like multiple SSIDs, public IP sharing, and gaming traffic optimization. Developed as a community-driven project, it provides a secure, censorship-resistant, and customizable gateway for Starlink users while remaining accessible and improved through open collaboration while it was maintained.

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

### Deploying

The site runs on Cloudflare Workers. `npm run build` produces `dist/_worker.js` plus the static files in `dist/`, and `wrangler.jsonc` deploys them together. Wrangler needs Node 22.12 or newer.

```bash
# Build and run the Worker locally (http://localhost:8787)
npm run preview.cf

# Build and deploy to Cloudflare
npx wrangler login
npm run deploy
```

The newsletter endpoint needs a SendGrid key, stored as a Worker secret:

```bash
npx wrangler secret put SENDGRID_API_KEY
```

## 🌍 Internationalization

The project supports multiple languages through semantic message catalogs in `messages/*.json`. To work with translations:

```bash
# Compile semantic catalogs
npm run i18n:compile

# Validate translation coverage
npm run i18n:validate
```

## 🧩 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   ├── i18n/           # Locale metadata and validation scripts
│   ├── routes/         # Application routes
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── messages/           # Semantic translation catalogs
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

This project is archived and no longer accepts contributions. Pull requests and issues are not reviewed. You are free to fork the code under the MIT license and maintain your own copy.

## 🐛 Issues

There is no support for NasNet Connect anymore, and nobody on the team will answer issues or questions about it. The [NasNet Telegram channel](https://t.me/joinnasnet) is a community resource, not project support. For a maintained way to manage MikroTik routers, use [NasNet Panel](https://www.joinnasnet.com/fa/products/nasnet-panel/).

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
