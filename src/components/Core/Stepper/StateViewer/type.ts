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
}

export interface StateHistoryProps {
  entries: StateEntry[];
  onCopy$?: QRL<(state: any) => void>;
  onCopyAll$: QRL<() => void>;
  onClearHistory$: QRL<() => void>;
  onRefresh$: QRL<() => void>;
  onGenerateConfig$: QRL<() => void>;
  onDownloadLatest$: QRL<() => void>;
}

export interface ConfigViewerProps {
  currentConfig: string;
  pastedConfig: string;
  onDownloadPastedConfig$?: QRL<() => void>;
  onDownloadCurrentConfig$?: QRL<() => void>;
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
