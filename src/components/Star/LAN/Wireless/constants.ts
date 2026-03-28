import type { NetworkKey } from "./type";
import type { AppLocale } from "~/i18n/config";
import { semanticMessages } from "~/i18n/semantic";

export const NETWORK_KEYS: NetworkKey[] = [
  "foreign",
  "domestic",
  "split",
  "vpn",
];

export const getNetworkDisplayName = (
  networkKey: NetworkKey,
  locale: AppLocale,
): string => {
  switch (networkKey) {
    case "foreign":
      return semanticMessages.wireless_network_name_foreign({}, { locale });
    case "domestic":
      return semanticMessages.wireless_network_name_domestic({}, { locale });
    case "split":
      return semanticMessages.wireless_network_name_split({}, { locale });
    case "vpn":
      return semanticMessages.wireless_network_name_vpn({}, { locale });
  }
};

export const getNetworkDescription = (
  networkKey: NetworkKey,
  locale: AppLocale,
): string => {
  switch (networkKey) {
    case "foreign":
      return semanticMessages.wireless_network_description_foreign(
        {},
        { locale },
      );
    case "domestic":
      return semanticMessages.wireless_network_description_domestic(
        {},
        { locale },
      );
    case "split":
      return semanticMessages.wireless_network_description_split(
        {},
        { locale },
      );
    case "vpn":
      return semanticMessages.wireless_network_description_vpn({}, { locale });
  }
};
