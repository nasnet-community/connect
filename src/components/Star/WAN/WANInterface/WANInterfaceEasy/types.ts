import type { QRL } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import type { RouterInterfaces } from "../../../StarContext/ChooseType";

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
  selectedInterfaceType: string;
  availableInterfaces: RouterInterfaces;
  onSelect: QRL<(value: string) => void>;
  isInterfaceSelectedInOtherMode: QRL<(iface: string) => boolean>;
  mode: "Foreign" | "Domestic";
}
