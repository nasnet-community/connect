import type { RouterConfig } from "../ConfigGenerator";
import type { services, RouterIdentityRomon, AutoReboot, Update, GameConfig, ExtraConfigState } from "~/components/Star/StarContext/ExtraType";
import { PublicCert } from "../utils/Certificate";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";






export const IdentityRomon = (RouterIdentityRomon: RouterIdentityRomon): RouterConfig => {
  const config: RouterConfig = {
    "/system identity": [],
    "/tool romon": [],
  };

  const { RouterIdentity, isRomon } = RouterIdentityRomon;

  if (RouterIdentity) {
    config["/system identity"].push(`set name="${RouterIdentity}"`);
  }

  if (isRomon) {
    config["/tool romon"].push("set enabled=yes");
  }

  return config;
};

export const AccessServices = (Services: services): RouterConfig => {
  const config: RouterConfig = {
    "/ip service": [],
  };

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


    const setting = Services[serviceKey];

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

export const Timezone = (Timezone: string): RouterConfig => {
  const config: RouterConfig = {
    "/system clock": [],
  };

  config["/system clock"].push(
    `set time-zone-autodetect=no time-zone-name=${Timezone}`,
  );

  return config;
}

export const AReboot = (AReboot: AutoReboot): RouterConfig => {
  const config: RouterConfig = {
    "/system scheduler": [],
  };

  const { RebootTime } = AReboot;

  config["/system scheduler"].push(
    `add disabled=no interval=1d name=reboot-${RebootTime} on-event="/system reboot" \\
  policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \\
  start-date=2024-08-28 start-time=${RebootTime}:00`,
  );

  return config;
}

export const AUpdate = (Update: Update): RouterConfig => {
  const config: RouterConfig = {
    "/system scheduler": [],
  };

  const { UpdateTime, UpdateInterval } = Update;

  if (UpdateTime) {
    let interval = "";
    switch (UpdateInterval) {
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
    start-date=2024-08-28 start-time=${UpdateTime}:00`,
    );
  }

  return config;
}

export const Game = (Game: GameConfig[], DomesticLink: boolean): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall raw": [],
    "/ip firewall mangle": [],
  };

  // Check if Games array has any items
  if (!Game || Game.length === 0) {
    return config;
  }

  // Only add mangle rules if there are games configured
  const mangleRules = [
    // Split Game FRN Traffic
    `add action=mark-connection chain=prerouting comment=Split-Game-FRN dst-address-list=FRN-IP-Games \\
           new-connection-mark=conn-game-FRN passthrough=yes src-address-list=Split-LAN`,
    `add action=mark-routing chain=prerouting comment=Split-Game-FRN connection-mark=conn-game-FRN \\
           new-routing-mark=to-FRN passthrough=no src-address-list=Split-LAN`,
  ];

  // Only add DOM traffic rules if DomesticLink is true
  if (DomesticLink) {
    mangleRules.push(
      // Split Game DOM Traffic
      `add action=mark-connection chain=prerouting comment=Split-Game-DOM dst-address-list=DOM-IP-Games \\
             new-connection-mark=conn-game-DOM passthrough=yes src-address-list=Split-LAN`,
      `add action=mark-routing chain=prerouting comment=Split-Game-DOM connection-mark=conn-game-DOM \\
             new-routing-mark=to-DOM passthrough=no src-address-list=Split-LAN`
    );
  }

  // Add VPN traffic rules
  mangleRules.push(
    // Split Game VPN Traffic
    `add action=mark-connection chain=prerouting comment=Split-Game-VPN dst-address-list=VPN-IP-Games \\
           new-connection-mark=conn-game-VPN passthrough=yes src-address-list=Split-LAN`,
    `add action=mark-routing chain=prerouting comment=Split-Game-VPN connection-mark=conn-game-VPN \\
           new-routing-mark=to-VPN passthrough=no src-address-list=Split-LAN`
  );

  config["/ip firewall mangle"] = mangleRules;

  const Games = Game;

  type BaseLinkType = "foreign" | "domestic" | "vpn" | "none";
  type MappedLinkType = "FRN" | "DOM" | "VPN" | "NONE";

  const displayMapping: Record<BaseLinkType, MappedLinkType> = {
    foreign: "FRN",
    domestic: "DOM",
    vpn: "VPN",
    none: "NONE",
  };

  Games.forEach((game: GameConfig) => {
    // if (game.link === "none") return;

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

// export const Certificate = (isCertificate: boolean): RouterConfig => {
//   const config: RouterConfig = {
//     "/system script": [],
//     "/system scheduler": [],
//   };


//   if (!isCertificate) {
//     return config;
//   }

//   const scriptContent = `":delay 00:00:30 \\r\\n /tool \\r\\
//     \\nfetch url=https://cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem \\r\\
//     \\n\\r\\
//     \\n:delay 60\\r\\
//     \\n\\r\\
//     \\n/certificate import file-name=DigiCertGlobalRootCA.crt.pem\\r\\
//     \\n\\r\\
//     \\n:delay 30\\r\\
//     \\n\\r\\
//     \\n/tool fetch url=https://curl.se/ca/cacert.pem \\r\\
//     \\n\\r\\
//     \\n:delay 60\\r\\
//     \\n\\r\\
//     \\n/certificate import file-name=cacert.pem\\r\\
//     \\n\\r\\
//     \\n /system schedule remove [find name=Certificate-Script ] \\r\\n"`;

//   config["/system script"].push(
//     `add dont-require-permissions=yes name=Certificate-Script owner=admin\\
//          policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=${scriptContent}`,
//   );

//   config["/system scheduler"].push(
//     `add interval=00:00:00 name=Certificate-Script on-event="/system script run Certificate-Script" policy=\\
//     ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup`,
//   );

//   return config;
// };

export const Clock = (): RouterConfig => {

  const config: RouterConfig = {
    "/system clock": [
      `set date=${new Date()
        .toLocaleString("en", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/,\s|\s/g, "/")
        .replace(/\/\//g, "/")}`,
    ],
  }

  return config
}

export const NTP = (): RouterConfig => {
  const config: RouterConfig= {
    "/system ntp client": ["set enabled=yes"],
    "/system ntp server": [
      "set broadcast=yes enabled=yes manycast=yes multicast=yes",
    ],
    "/system ntp client servers": [
      "add address=ir.pool.ntp.org",
      "add address=time1.google.com",
      "add address=pool.ntp.org",
    ],
  }


  return config 
}

export const Graph = (): RouterConfig => {
  const config: RouterConfig = {
    "/tool graphing interface": ["add"],
    "/tool graphing queue": ["add"],
    "/tool graphing resource": ["add"],
  }

  return config
}

export const update = (): RouterConfig => {
  const config: RouterConfig = {
    "/system package update": ["set channel=stable"],
    "/system routerboard settings": ["set auto-upgrade=yes"],
  }


  return config
}

export const UPNP = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip upnp": ["set enabled=yes"],
  }

  return config
}

export const NATPMP = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip nat-pmp": ["set enabled=yes"],
  }

  return config
}

export const Firewall = (): RouterConfig => {

  const config: RouterConfig = {
    "/ip firewall filter": [
      `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=udp`,
      `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=tcp`,
    ],
  }

  return config
}

export const DDNS = (): RouterConfig => {
  const config: RouterConfig = {
    "/ip cloud": ["set ddns-enabled=yes ddns-update-interval=1m"],
    "/ip firewall address-list": [
      `add list=MikroTik-Cloud-Services address=cloud2.mikrotik.com \\
       comment="Dynamic list for MikroTik Cloud DDNS"`,
      `add list=MikroTik-Cloud-Services address=cloud.mikrotik.com \\
       comment="Legacy endpoint for completeness"`,
    ],
    "/ip firewall mangle": [
      `add action=mark-routing chain=output dst-address-list=MikroTik-Cloud-Services \\
       new-routing-mark=to-DOM passthrough=no \\
       comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
      `add action=mark-routing chain=output dst-address-list=MikroTik-Cloud-Services \\
       protocol=udp dst-port=15252 new-routing-mark=to-DOM passthrough=no \\
       comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
    ],
  }

  return config
}



export const ExtraCG = (ExtraConfigState: ExtraConfigState, DomesticLink: boolean): RouterConfig => {
  const configs: RouterConfig[] = [
    Clock(),
    NTP(),
    Graph(),
    update(),
    DDNS(),
    // PublicCert(),
  ];

  // Add conditional configurations
  if (ExtraConfigState.RouterIdentityRomon) {
    configs.push(IdentityRomon(ExtraConfigState.RouterIdentityRomon));
  }

  if (ExtraConfigState.services) {
    configs.push(AccessServices(ExtraConfigState.services));
  }

  if (ExtraConfigState.Timezone) {
    configs.push(Timezone(ExtraConfigState.Timezone));
  }

  if (ExtraConfigState.AutoReboot) {
    configs.push(AReboot(ExtraConfigState.AutoReboot));
  }

  if (ExtraConfigState.Update) {
    configs.push(AUpdate(ExtraConfigState.Update));
  }

  if (ExtraConfigState.Games) {
    configs.push(Game(ExtraConfigState.Games, DomesticLink));
  }

  if (ExtraConfigState.isCertificate !== undefined) {
    configs.push(PublicCert());
  }

  return mergeMultipleConfigs(...configs);
}













