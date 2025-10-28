import type { QRL } from "@builder.io/qwik";

export interface StateEntry {
  timestamp: string;
  state: any;
}

export interface ContextPasterProps {
  value: string;
  error: string;
  onPaste: QRL<(value: string) => void>;
  onGenerate: QRL<() => void>;
  onFileUpload: QRL<(file: File) => void>;
  uploadMode: "paste" | "upload";
  onModeChange: QRL<(mode: "paste" | "upload") => void>;
  routerOptions: RouterOption[];
  selectedRouter: string;
  onRouterChange: QRL<(routerId: string) => void>;
}

export interface SlaveRouterOption {
  id: string;
  name: string;
}

export interface RouterOption {
  id: string;
  name: string;
  type: 'master' | 'slave';
}

export interface StateHistoryProps {
  entries: StateEntry[];
  onCopy$?: QRL<(state: any) => void>;
  onCopyAll$: QRL<() => void>;
  onClearHistory$: QRL<() => void>;
  onRefresh$: QRL<() => void>;
  onGenerateConfig$: QRL<() => void>;
  onDownloadLatest$: QRL<() => void>;
  onGenerateSlaveConfig$: QRL<() => void>;
  slaveRouters: SlaveRouterOption[];
  selectedSlaveRouter: string;
  onSlaveRouterChange$: QRL<(routerId: string) => void>;
}

export interface ConfigViewerProps {
  currentConfig: string;
  pastedConfig: string;
  onDownloadPastedConfig$?: QRL<() => void>;
  onDownloadCurrentConfig$?: QRL<() => void>;
  slaveConfig: string;
  pastedSlaveConfig: string;
  onDownloadSlaveConfig$?: QRL<() => void>;
  onDownloadPastedSlaveConfig$?: QRL<() => void>;
  selectedSlaveRouterName: string;
}

export interface StateHeaderProps {
  onClose$: QRL<() => void>;
}

export interface StateEntryProps {
  entry: StateEntry;
  onCopy$: QRL<() => void>;
  onRefresh$: QRL<() => void>;
  onGenerateConfig$: QRL<() => void>;
}
