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
}

export interface StateHistoryProps {
  entries: StateEntry[];
  onCopy$?: QRL<(state: any) => void>;
  onCopyAll$: QRL<() => void>;
  onClearHistory$: QRL<() => void>;
  onRefresh$: QRL<() => void>;
  onGenerateConfig$: QRL<() => void>;
}

export interface ConfigViewerProps {
  currentConfig: string;
  pastedConfig: string;
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