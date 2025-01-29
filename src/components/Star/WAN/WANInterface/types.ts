import type { QRL } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";

export interface WANInterfaceProps extends StepProps {
  mode: "Foreign" | "Domestic";
}

export interface WirelessSettingsProps {
  ssid: string;
  password: string;
  onSSIDChange: QRL<(value: string) => void>;
  onPasswordChange: QRL<(value: string) => void>;
}

export interface FooterProps {
  isComplete: boolean;
  isValid: boolean;
  onComplete: QRL<() => void>;
}

export interface InterfaceSelectorProps {
  selectedInterface: string;
  availableInterfaces: string[];
  onSelect: QRL<(value: string) => void>;
  isInterfaceSelectedInOtherMode: QRL<(iface: string) => boolean>;
  mode: "Foreign" | "Domestic";
}
