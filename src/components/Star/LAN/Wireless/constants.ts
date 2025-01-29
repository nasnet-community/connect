import type { NetworkKey } from "./type";

export const NETWORK_KEYS: NetworkKey[] = [
  "starlink",
  "domestic",
  "split",
  "vpn",
];

export const NETWORK_DESCRIPTIONS: Record<NetworkKey, string> = {
  starlink: $localize`Dedicated network for Starlink internet traffic`,
  domestic: $localize`Local network for home devices`,
  split: $localize`Mixed network balancing traffic`,
  vpn: $localize`Secure network with VPN encryption`,
};
