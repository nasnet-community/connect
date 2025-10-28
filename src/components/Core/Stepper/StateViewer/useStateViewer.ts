import { $, useSignal, useTask$ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/components/Star/ConfigGenerator/ConfigGenerator";
import { SlaveCG } from "~/components/Star/ConfigGenerator/Trunk/Slave";
import { extractStateFromConfig } from "./configParser";
import type { SlaveRouterOption, RouterOption } from "./type";
import type { RouterModels } from "~/components/Star/StarContext";

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
  
  // Slave router config state
  const slaveConfigOutput = useSignal("");
  const pastedSlaveConfig = useSignal("");
  const selectedSlaveRouter = useSignal("");
  const slaveRouters = useSignal<SlaveRouterOption[]>([]);

  // Router options for Context Input dropdown (Master + Slaves)
  const selectedRouterForPaste = useSignal("master");
  const routerOptions = useSignal<RouterOption[]>([]);

  // Extract slave routers from state
  useTask$(({ track }) => {
    const state = track(() => initialState);
    if (state?.Choose?.RouterModels) {
      const slaves = (state.Choose.RouterModels as RouterModels[])
        .filter((router) => !router.isMaster)
        .map((router, index) => ({
          id: `slave-${index}`,
          name: router.Model || `Slave Router ${index + 1}`,
        }));
      
      slaveRouters.value = slaves;
      
      // Set first slave as default if available
      if (slaves.length > 0 && !selectedSlaveRouter.value) {
        selectedSlaveRouter.value = slaves[0].id;
      }
    }
  });

  // Build router options for Context Input dropdown (Master + Slaves)
  useTask$(({ track }) => {
    const state = track(() => initialState);
    const options: RouterOption[] = [];
    
    if (state?.Choose?.RouterModels && Array.isArray(state.Choose.RouterModels) && state.Choose.RouterModels.length > 0) {
      const routers = state.Choose.RouterModels as RouterModels[];
      
      // Add master router
      const master = routers.find((r) => r.isMaster);
      if (master) {
        options.push({
          id: 'master',
          name: `Master Router - ${master.Model}`,
          type: 'master'
        });
      }
      
      // Add slave routers
      const slaves = routers.filter((r) => !r.isMaster);
      slaves.forEach((slave, index) => {
        options.push({
          id: `slave-${index}`,
          name: `Slave ${index + 1} - ${slave.Model}`,
          type: 'slave'
        });
      });
      
      routerOptions.value = options;
      
      // Set default to master if not set
      if (!selectedRouterForPaste.value && options.length > 0) {
        selectedRouterForPaste.value = 'master';
      }
    }
  });

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

  const generateSlaveConfig$ = $(() => {
    if (!initialState || Object.keys(initialState).length === 0) {
      slaveConfigOutput.value = "No valid state available";
      return;
    }

    if (!selectedSlaveRouter.value) {
      slaveConfigOutput.value = "No slave router selected";
      return;
    }

    try {
      // Extract slave router index from ID
      const slaveIndex = parseInt(selectedSlaveRouter.value.split('-')[1]);
      const slaveRouterModel = (initialState.Choose?.RouterModels as RouterModels[])
        ?.filter((r) => !r.isMaster)[slaveIndex];

      if (!slaveRouterModel) {
        slaveConfigOutput.value = "Selected slave router not found";
        return;
      }

      // Generate slave configuration (returns string directly)
      const config = SlaveCG(initialState, slaveRouterModel);

      slaveConfigOutput.value = config || "No configuration generated";
    } catch (error) {
      console.error("Slave config generation error:", error);
      slaveConfigOutput.value = `Error generating slave configuration: ${error}`;
    }
  });

  const handlePasteContext$ = $((value: string) => {
    pastedContext.value = value;
    pasteError.value = "";
    
    // Try to extract routers from pasted context
    if (value) {
      try {
        const parsedContext = JSON.parse(value);
        if (parsedContext?.Choose?.RouterModels && Array.isArray(parsedContext.Choose.RouterModels)) {
          const routers = parsedContext.Choose.RouterModels as RouterModels[];
          const options: RouterOption[] = [];
          
          // Add master router
          const master = routers.find((r) => r.isMaster);
          if (master) {
            options.push({
              id: 'master',
              name: `Master Router - ${master.Model}`,
              type: 'master'
            });
          }
          
          // Add slave routers
          const slaves = routers.filter((r) => !r.isMaster);
          slaves.forEach((slave, index) => {
            options.push({
              id: `slave-${index}`,
              name: `Slave ${index + 1} - ${slave.Model}`,
              type: 'slave'
            });
          });
          
          // Update router options from pasted context
          if (options.length > 0) {
            routerOptions.value = options;
            // Set default to master
            if (!selectedRouterForPaste.value || selectedRouterForPaste.value === '') {
              selectedRouterForPaste.value = 'master';
            }
          }
        }
      } catch (error) {
        // Invalid JSON, will be handled by generate function
      }
    }
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

      // Find selected router option to determine type
      const selectedOption = routerOptions.value.find(
        opt => opt.id === selectedRouterForPaste.value
      );

      if (!selectedOption) {
        pasteError.value = "No router selected";
        return;
      }

      // Clear previous configs
      pastedContextConfig.value = "";
      pastedSlaveConfig.value = "";

      // Generate config based on selected router type
      if (selectedOption.type === 'master') {
        // Generate master config only
        const config = ConfigGenerator(parsedContext);
        pastedContextConfig.value = config || "No configuration generated";
      } else {
        // Generate slave config only
        if (parsedContext.Choose?.RouterModels) {
          try {
            const slaveIndex = parseInt(selectedRouterForPaste.value.split('-')[1]);
            const slaveRouterModel = (parsedContext.Choose.RouterModels as RouterModels[])
              ?.filter((r: RouterModels) => !r.isMaster)[slaveIndex];

            if (slaveRouterModel) {
              // Generate slave configuration (returns string directly)
              const slaveConfig = SlaveCG(parsedContext, slaveRouterModel);

              pastedSlaveConfig.value = slaveConfig || "No configuration generated";
            } else {
              pasteError.value = "Selected slave router not found in context";
            }
          } catch (slaveError) {
            console.error("Slave config generation error:", slaveError);
            pastedSlaveConfig.value = `Error generating slave configuration: ${slaveError}`;
          }
        }
      }
      
      pasteError.value = "";
    } catch (error) {
      pasteError.value = "Invalid JSON format";
      pastedContextConfig.value = "";
      pastedSlaveConfig.value = "";
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
        const stateString = JSON.stringify(result.state, null, 2);
        pastedContext.value = stateString;
        pasteError.value = "";
        
        // Extract routers from uploaded file
        if (result.state?.Choose?.RouterModels && Array.isArray(result.state.Choose.RouterModels)) {
          const routers = result.state.Choose.RouterModels as RouterModels[];
          const options: RouterOption[] = [];
          
          // Add master router
          const master = routers.find((r) => r.isMaster);
          if (master) {
            options.push({
              id: 'master',
              name: `Master Router - ${master.Model}`,
              type: 'master'
            });
          }
          
          // Add slave routers
          const slaves = routers.filter((r) => !r.isMaster);
          slaves.forEach((slave, index) => {
            options.push({
              id: `slave-${index}`,
              name: `Slave ${index + 1} - ${slave.Model}`,
              type: 'slave'
            });
          });
          
          // Update router options from uploaded file
          if (options.length > 0) {
            routerOptions.value = options;
            // Set default to master
            if (!selectedRouterForPaste.value || selectedRouterForPaste.value === '') {
              selectedRouterForPaste.value = 'master';
            }
          }
        }
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

  const downloadSlaveConfig$ = $(() => {
    if (!slaveConfigOutput.value) {
      console.warn("No slave configuration available to download");
      return;
    }

    try {
      const blob = new Blob([slaveConfigOutput.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const slaveName = slaveRouters.value.find(r => r.id === selectedSlaveRouter.value)?.name || 'slave';
      link.download = `${slaveName.replace(/\s+/g, '-')}-config-${timestamp}.rsc`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading slave config:", error);
    }
  });

  const downloadPastedSlaveConfig$ = $(() => {
    if (!pastedSlaveConfig.value) {
      console.warn("No pasted slave configuration available to download");
      return;
    }

    try {
      const blob = new Blob([pastedSlaveConfig.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const slaveName = slaveRouters.value.find(r => r.id === selectedSlaveRouter.value)?.name || 'slave';
      link.download = `${slaveName.replace(/\s+/g, '-')}-pasted-config-${timestamp}.rsc`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading pasted slave config:", error);
    }
  });

  const handleSlaveRouterChange$ = $((routerId: string) => {
    selectedSlaveRouter.value = routerId;
    // Clear previous slave configs when changing router
    slaveConfigOutput.value = "";
    pastedSlaveConfig.value = "";
  });

  const handlePasteRouterChange$ = $((routerId: string) => {
    selectedRouterForPaste.value = routerId;
    // Clear previous pasted configs when changing router
    pastedContextConfig.value = "";
    pastedSlaveConfig.value = "";
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
    // Slave config additions
    slaveConfigOutput,
    pastedSlaveConfig,
    selectedSlaveRouter,
    slaveRouters,
    generateSlaveConfig$,
    downloadSlaveConfig$,
    downloadPastedSlaveConfig$,
    handleSlaveRouterChange$,
    // Router options for Context Input
    routerOptions,
    selectedRouterForPaste,
    handlePasteRouterChange$,
  };
}
