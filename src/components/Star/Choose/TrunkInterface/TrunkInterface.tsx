import { $, component$, useContext, useSignal, useTask$, type PropFunction } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import { InterfaceSelector } from "./InterfaceSelector";
import { WirelessBandSelector } from "./WirelessBandSelector";
import { useInterfaceManagement } from "../../hooks/useInterfaceManagement";
import type { InterfaceType } from "../../StarContext/CommonType";
import { SelectionStepSection } from "../shared/SelectionStepSection";

interface TrunkInterfaceProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const TrunkInterface = component$((props: TrunkInterfaceProps) => {
  const starContext = useContext(StarContext);
  const interfaceManagement = useInterfaceManagement();
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

  const handleBandSelect = $(async (band: "2.4G" | "5G") => {
    // Update selected band
    selectedBand.value = band;

    // Map band to interface name
    const interfaceName = band === "2.4G" ? "wifi2.4" : "wifi5";

    // Clear any previously selected trunk interfaces (only from master router)
    const models = starContext.state.Choose.RouterModels;
    const masterModel = models.find(model => model.isMaster);

    if (masterModel?.MasterSlaveInterface) {
      await interfaceManagement.releaseInterface$(masterModel.MasterSlaveInterface as InterfaceType);
    }

    // Mark the new interface as occupied for Trunk (only for master router)
    // Note: In wireless mode, both routers use the same band, but we only track master's interface
    await interfaceManagement.markInterfaceAsOccupied$(interfaceName as InterfaceType, "Trunk");

    // Update all router models with the same wireless interface
    const updatedModels = models.map((model) => {
      return {
        ...model,
        MasterSlaveInterface: interfaceName as any,
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
    <SelectionStepSection
      title={$localize`Configure Router + Access Point Interface`}
      description={$localize`Select the specific interfaces for your trunk connection`}
    >
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
    </SelectionStepSection>
  );
});
