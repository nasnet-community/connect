import type { NetworkKey } from "./type";

export const NETWORK_KEYS: NetworkKey[] = [
  "foreign",
  "domestic",
  "split",
  "vpn",
];

export const NETWORK_DESCRIPTIONS: Record<NetworkKey, string> = {
  foreign: $localize`Dedicated network for Foreign internet traffic`,
  domestic: $localize`Local network for home devices`,
  split: $localize`Mixed network balancing traffic`,
  vpn: $localize`Secure network with VPN encryption`,
};
