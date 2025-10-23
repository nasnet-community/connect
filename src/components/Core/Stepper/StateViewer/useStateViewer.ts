import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/components/Star/ConfigGenerator/ConfigGenerator";
import { extractStateFromConfig } from "./configParser";

export interface StateEntry {
  timestamp: string;
  state: any;
}

export function useStateViewer(initialState: any) {
  const isOpen = useSignal(false);
  const stateHistory = useSignal<StateEntry[]>([]);
  const configOutput = useSignal("");
  const pastedContext = useSignal("");
  const pastedContextConfig = useSignal("");
  const pasteError = useSignal("");
  const uploadMode = useSignal<"paste" | "upload">("paste");

  useTask$(({ track }) => {
    const state = track(() => initialState);
    if (Object.keys(state).length > 0) {
      const newState = JSON.parse(JSON.stringify(state));
      const lastEntry = stateHistory.value[stateHistory.value.length - 1];

      if (
        !lastEntry ||
        JSON.stringify(lastEntry.state) !== JSON.stringify(newState)
      ) {
        stateHistory.value = [
          ...stateHistory.value,
          {
            timestamp: new Date().toISOString(),
            state: newState,
          },
        ];
      }
    }
  });

  const generateConfig$ = $(() => {
    if (!initialState || Object.keys(initialState).length === 0) {
      configOutput.value = "No valid state available";
      return;
    }

    try {
      const config = ConfigGenerator(initialState);
      configOutput.value = config || "No configuration generated";
    } catch (error) {
      console.error("Config generation error:", error);
      configOutput.value = "Error generating configuration";
    }
  });

  const handlePasteContext$ = $((value: string) => {
    pastedContext.value = value;
    pasteError.value = "";
  });

  const handleGenerateFromPaste$ = $(() => {
    if (!pastedContext.value) {
      pasteError.value = "Please paste a context first";
      return;
    }

    try {
      const parsedContext = JSON.parse(pastedContext.value);
      if (!parsedContext || Object.keys(parsedContext).length === 0) {
        pasteError.value = "Invalid context structure";
        return;
      }

      const config = ConfigGenerator(parsedContext);
      pastedContextConfig.value = config || "No configuration generated";
      pasteError.value = "";
    } catch (error) {
      pasteError.value = "Invalid JSON format";
      pastedContextConfig.value = "";
    }
  });

  const refreshState$ = $(() => {
    const newEntry = {
      timestamp: new Date().toISOString(),
      state: JSON.parse(JSON.stringify(initialState)),
    };

    if (stateHistory.value.length === 0) {
      stateHistory.value = [newEntry];
    } else {
      stateHistory.value = [...stateHistory.value.slice(0, -1), newEntry];
    }
  });

  const downloadLatest$ = $(() => {
    if (!initialState || Object.keys(initialState).length === 0) {
      console.warn("No current state available to download");
      return;
    }

    try {
      // Get the current state directly from StarContext
      const currentState = JSON.parse(JSON.stringify(initialState));
      
      // Format the state as a readable JSON string
      const stateContent = JSON.stringify(currentState, null, 2);
      
      // Create a blob with the state content
      const blob = new Blob([stateContent], { type: 'text/plain' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with current timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `router-state-${timestamp}.txt`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading current state:", error);
    }
  });

  const downloadPastedConfig$ = $(() => {
    if (!pastedContextConfig.value) {
      console.warn("No pasted context config available to download");
      return;
    }

    try {
      // Create a blob with the pasted config content
      const blob = new Blob([pastedContextConfig.value], { type: 'text/plain' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `router-config-${timestamp}.rsc`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading pasted config:", error);
    }
  });

  const downloadCurrentConfig$ = $(() => {
    if (!configOutput.value) {
      console.warn("No current configuration available to download");
      return;
    }

    try {
      // Create a blob with the current config content
      const blob = new Blob([configOutput.value], { type: 'text/plain' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `current-router-config-${timestamp}.rsc`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading current config:", error);
    }
  });

  const handleFileUpload$ = $(async (file: File) => {
    try {
      const content = await file.text();
      const result = extractStateFromConfig(content);
      
      if (result.error) {
        pasteError.value = result.error;
        pastedContext.value = "";
      } else {
        pastedContext.value = JSON.stringify(result.state, null, 2);
        pasteError.value = "";
      }
    } catch (error) {
      pasteError.value = "Failed to read file";
      pastedContext.value = "";
    }
  });

  const handleModeChange$ = $((mode: "paste" | "upload") => {
    uploadMode.value = mode;
    // Clear errors when switching modes
    pasteError.value = "";
  });

  return {
    isOpen,
    stateHistory,
    configOutput,
    pastedContext,
    pastedContextConfig,
    pasteError,
    uploadMode,
    generateConfig$,
    handlePasteContext$,
    handleGenerateFromPaste$,
    refreshState$,
    downloadLatest$,
    downloadPastedConfig$,
    downloadCurrentConfig$,
    handleFileUpload$,
    handleModeChange$,
  };
}
