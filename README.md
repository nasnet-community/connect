# NASNET Connect 🌟

A powerful and modern mikrotik router configuration management system built with Qwik and TypeScript.

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
git clone https://github.com/nasnet-community/nasnet-connect.git

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

## 📄 License

© 2025 NASNET Connect. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

- Website: [nasnet-community.github.io](https://nasnet-community.github.io)
- GitHub: [@nasnet-community](https://github.com/nasnet-community)

## 🙏 Acknowledgments

- The Qwik team for their amazing framework
- All contributors who have helped this project grow

---

<div align="center">
Made with ❤️ by the NASNET Community
</div>