import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/utils/ConfigGenerator/ConfigGenerator";

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

  return {
    isOpen,
    stateHistory,
    configOutput,
    pastedContext,
    pastedContextConfig,
    pasteError,
    generateConfig$,
    handlePasteContext$,
    handleGenerateFromPaste$,
    refreshState$,
  };
}
