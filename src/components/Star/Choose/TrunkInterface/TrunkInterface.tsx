import { $, component$, useContext, useSignal, useTask$, type PropFunction } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import { InterfaceSelector } from "./InterfaceSelector";
import { WirelessBandSelector } from "./WirelessBandSelector";
import { addOccupiedInterface } from "../../utils/InterfaceManagementUtils";
import type { InterfaceType } from "../../StarContext/CommonType";

interface TrunkInterfaceProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const TrunkInterface = component$((props: TrunkInterfaceProps) => {
  const starContext = useContext(StarContext);
  const selectedBand = useSignal<"2.4G" | "5G" | null>(null);

  // Get interface type from context (set by InterfaceType component)
  const interfaceType = starContext.state.Choose.TrunkInterfaceType || "wired";

  // Initialize selectedBand from existing state using useTask$
  useTask$(({ track }) => {
    // Track router models to re-initialize when they change
    track(() => starContext.state.Choose.RouterModels);

    const models = starContext.state.Choose.RouterModels;
    if (models.length === 0) {
      selectedBand.value = null;
      return;
    }

    const firstModel = models[0];
    if (firstModel.MasterSlaveInterface === "wifi2.4") {
      selectedBand.value = "2.4G";
    } else if (firstModel.MasterSlaveInterface === "wifi5") {
      selectedBand.value = "5G";
    } else {
      selectedBand.value = null;
    }
  });

  const handleInterfaceSelectorComplete = $(() => {
    if (props.onComplete$) {
      props.onComplete$();
    }
  });

  const handleBandSelect = $((band: "2.4G" | "5G") => {
    // Update selected band
    selectedBand.value = band;

    // Map band to interface name
    const interfaceName = band === "2.4G" ? "wifi2.4" : "wifi5";

    // Update all router models with the same wireless interface
    const updatedModels = starContext.state.Choose.RouterModels.map((model) => {
      // Use the utility to properly add the occupied interface
      const occupiedInterfaces = addOccupiedInterface(
        [], // Start with clean array to avoid duplicates
        interfaceName as InterfaceType,
        "Trunk",
        model.isMaster ? "Master" : "Slave"
      );

      return {
        ...model,
        MasterSlaveInterface: interfaceName as any,
        Interfaces: {
          ...model.Interfaces,
          OccupiedInterfaces: occupiedInterfaces
        }
      };
    });

    starContext.updateChoose$({
      RouterModels: updatedModels,
    });

    // Complete the configuration
    if (props.onComplete$) {
      props.onComplete$();
    }
  });

  return (
    <div class="space-y-8">
      {/* Header section */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Configure Trunk Interface`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-3 max-w-2xl">
          {$localize`Select the specific interfaces for your trunk connection`}
        </p>
      </div>

      {/* Conditionally show WirelessBandSelector for wireless or InterfaceSelector for wired */}
      {interfaceType === "wireless" ? (
        <WirelessBandSelector
          selectedBand={selectedBand.value}
          onBandSelect$={handleBandSelect}
          routerModels={starContext.state.Choose.RouterModels}
          isVisible={true}
        />
      ) : (
        <InterfaceSelector
          interfaceType={interfaceType}
          onComplete$={handleInterfaceSelectorComplete}
        />
      )}
    </div>
  );
});