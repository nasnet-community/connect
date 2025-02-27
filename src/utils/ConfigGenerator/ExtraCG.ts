import type { StarState, GameConfig } from "~/components/Star/StarContext";
import type { RouterConfig } from "./ConfigGenerator";

type ServiceState = "Enable" | "Disable" | "Local";

interface services {
  api: ServiceState;
  apissl: ServiceState;
  ftp: ServiceState;
  ssh: ServiceState;
  telnet: ServiceState;
  winbox: ServiceState;
  web: ServiceState;
  webssl: ServiceState;
  [key: string]: ServiceState;
}

export const RouterIdentityRomon = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/system identity": [],
    "/tool romon": [],
  };

  const { RouterIdentity, isRomon } = state.ExtraConfig;

  if (RouterIdentity) {
    config["/system identity"].push(`set name="${RouterIdentity}"`);
  }

  if (isRomon) {
    config["/tool romon"].push("set enabled=yes");
  }

  return config;
};

export const Services = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/ip service": [],
  };

  const { services } = state.ExtraConfig;
  const serviceNames = [
    "api",
    "api-ssl",
    "ftp",
    "ssh",
    "telnet",
    "winbox",
    "www",
    "www-ssl",
  ] as const;

  serviceNames.forEach((service) => {
    const serviceKey = service
      .replace("-ssl", "ssl")
      .replace("www", "web") as keyof services;

    const setting = services[serviceKey];

    if (setting === "Disable") {
      config["/ip service"].push(`set ${service} disabled=yes`);
    } else if (setting === "Local") {
      config["/ip service"].push(
        `set ${service} address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8`,
      );
    }
  });

  return config;
};

export const RebootUpdate = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/system clock": [],
    "/system scheduler": [],
  };

  const { Timezone, AutoReboot, Update } = state.ExtraConfig;

  if (Timezone) {
    config["/system clock"].push(
      `set time-zone-autodetect=no time-zone-name=${Timezone}`,
    );
  }

  if (AutoReboot.isAutoReboot && AutoReboot.RebootTime) {
    config["/system scheduler"].push(
      `add disabled=no interval=1d name=reboot-${AutoReboot.RebootTime} on-event="/system reboot" \\
    policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \\
    start-date=2024-08-28 start-time=${AutoReboot.RebootTime}:00`,
    );
  }

  if (Update.isAutoReboot && Update.UpdateTime) {
    let interval = "";
    switch (Update.UpdateInterval) {
      case "Daily":
        interval = "1d";
        break;
      case "Weekly":
        interval = "1w";
        break;
      case "Monthly":
        interval = "30d";
        break;
      default:
        interval = "1w";
    }

    config["/system scheduler"].push(
      `add disabled=no interval=${interval} name=update on-event="/system package update\\r\\
    \\ncheck-for-updates once\\r\\
    \\n:delay 9s;\\r\\
    \\n:if ( [get status] = \\"New version is available\\") do={ install }" \\
    policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \\
    start-date=2024-08-28 start-time=${Update.UpdateTime}:00`,
    );
  }

  return config;
};

export const Game = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall raw": [],
    "/ip firewall mangle": [],
  };

  const { Games } = state.ExtraConfig;

  type BaseLinkType = "foreign" | "domestic" | "vpn" | "none";
  type MappedLinkType = "FRN" | "DOM" | "VPN" | "NONE";

  const displayMapping: Record<BaseLinkType, MappedLinkType> = {
    foreign: "FRN",
    domestic: "DOM",
    vpn: "VPN",
    none: "NONE",
  };

  Games.forEach((game: GameConfig) => {
    if (game.link === "none") return;

    if (game.ports.tcp?.length && game.ports.tcp.some((port) => port !== "")) {
      config["/ip firewall raw"].push(
        `add action=add-dst-to-address-list address-list="${displayMapping[game.link]}-IP-Games" address-list-timeout=1d chain=prerouting comment="${game.name}" dst-address-list=!LOCAL-IP dst-port=${game.ports.tcp.join(",")} protocol=tcp`,
      );
    }

    if (game.ports.udp?.length && game.ports.udp.some((port) => port !== "")) {
      config["/ip firewall raw"].push(
        `add action=add-dst-to-address-list address-list="${displayMapping[game.link]}-IP-Games" address-list-timeout=1d chain=prerouting comment="${game.name}" dst-address-list=!LOCAL-IP dst-port=${game.ports.udp.join(",")} protocol=udp`,
      );
    }
  });

  return config;
};

export const Certificate = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
    "/system scheduler": [],
  };

  const { isCertificate } = state.ExtraConfig;

  if (!isCertificate) {
    return config;
  }

  const scriptContent = `":delay 00:00:30 \\r\\n /tool \\r\\
    \\nfetch url=https://cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem \\r\\
    \\n\\r\\
    \\n:delay 60\\r\\
    \\n\\r\\
    \\n/certificate import file-name=DigiCertGlobalRootCA.crt.pem\\r\\
    \\n\\r\\
    \\n:delay 30\\r\\
    \\n\\r\\
    \\n/tool fetch url=https://curl.se/ca/cacert.pem \\r\\
    \\n\\r\\
    \\n:delay 60\\r\\
    \\n\\r\\
    \\n/certificate import file-name=cacert.pem\\r\\
    \\n\\r\\
    \\n /system schedule remove [find name=Certificate-Script ] \\r\\n"`;

  config["/system script"].push(
    `add dont-require-permissions=yes name=Certificate-Script owner=admin\\
         policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=${scriptContent}`,
  );

  config["/system scheduler"].push(
    `add interval=00:00:00 name=Certificate-Script on-event="/system script run Certificate-Script" policy=\\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup`,
  );

  return config;
};
