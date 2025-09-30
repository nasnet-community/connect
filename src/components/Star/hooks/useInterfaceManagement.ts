import { $, useContext, type QRL } from "@builder.io/qwik";
import { StarContext } from "../StarContext/StarContext";
import type { InterfaceType } from "../StarContext/CommonType";
import type { OccupiedInterface } from "../StarContext/ChooseType";
import {
  addOccupiedInterface,
  removeOccupiedInterface,
  getMasterOccupiedInterfaces,
  isInterfaceOccupied,
  getInterfaceUsage,
} from "../utils/InterfaceManagementUtils";

export interface UseInterfaceManagementReturn {
  markInterfaceAsOccupied$: QRL<(
    interfaceName: InterfaceType,
    usedBy: "Trunk" | "WAN" | "VPN" | "LAN" | "Other"
  ) => Promise<void>>;
  releaseInterface$: QRL<(interfaceName: InterfaceType) => Promise<void>>;
  isInterfaceAvailable$: QRL<(interfaceName: string) => Promise<boolean>>;
  getInterfaceUsageInfo$: QRL<(interfaceName: string) => Promise<string | null>>;
  getAllOccupiedInterfacesList$: QRL<() => Promise<OccupiedInterface[]>>;
  updateInterfaceOccupation$: QRL<(
    oldInterface: InterfaceType | null,
    newInterface: InterfaceType | null,
    usedBy: "Trunk" | "WAN" | "VPN" | "LAN" | "Other"
  ) => Promise<void>>;
}

/**
 * Hook for centralized interface management across all router configuration components.
 * Ensures consistent tracking of occupied interfaces throughout the application.
 */
export function useInterfaceManagement(): UseInterfaceManagementReturn {
  const starContext = useContext(StarContext);

  /**
   * Mark an interface as occupied by a specific component
   */
  const markInterfaceAsOccupied$ = $(async (
    interfaceName: InterfaceType,
    usedBy: "Trunk" | "WAN" | "VPN" | "LAN" | "Other"
  ) => {
    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster
    );

    if (!masterRouter) {
      console.warn("No master router found to update occupied interfaces");
      return;
    }

    const updatedOccupiedInterfaces = addOccupiedInterface(
      masterRouter.Interfaces.OccupiedInterfaces,
      interfaceName,
      usedBy,
      masterRouter.Model
    );

    // Update the master router's occupied interfaces
    const updatedRouterModels = starContext.state.Choose.RouterModels.map((rm) =>
      rm.isMaster
        ? {
            ...rm,
            Interfaces: {
              ...rm.Interfaces,
              OccupiedInterfaces: updatedOccupiedInterfaces,
            },
          }
        : rm
    );

    await starContext.updateChoose$({
      RouterModels: updatedRouterModels,
    });
  });

  /**
   * Release an interface from occupation
   */
  const releaseInterface$ = $(async (interfaceName: InterfaceType) => {
    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster
    );

    if (!masterRouter) {
      console.warn("No master router found to update occupied interfaces");
      return;
    }

    const updatedOccupiedInterfaces = removeOccupiedInterface(
      masterRouter.Interfaces.OccupiedInterfaces,
      interfaceName
    );

    // Update the master router's occupied interfaces
    const updatedRouterModels = starContext.state.Choose.RouterModels.map((rm) =>
      rm.isMaster
        ? {
            ...rm,
            Interfaces: {
              ...rm.Interfaces,
              OccupiedInterfaces: updatedOccupiedInterfaces,
            },
          }
        : rm
    );

    await starContext.updateChoose$({
      RouterModels: updatedRouterModels,
    });
  });

  /**
   * Check if an interface is available (not occupied)
   * Only checks the master router's occupied interfaces
   */
  const isInterfaceAvailable$ = $(async (interfaceName: string): Promise<boolean> => {
    const masterOccupied = getMasterOccupiedInterfaces(starContext.state.Choose.RouterModels);
    return !isInterfaceOccupied(masterOccupied, interfaceName);
  });

  /**
   * Get usage information for an interface
   * Only checks the master router's occupied interfaces
   */
  const getInterfaceUsageInfo$ = $(async (interfaceName: string): Promise<string | null> => {
    const masterOccupied = getMasterOccupiedInterfaces(starContext.state.Choose.RouterModels);
    return getInterfaceUsage(masterOccupied, interfaceName);
  });

  /**
   * Get all occupied interfaces (from master router only by default)
   */
  const getAllOccupiedInterfacesList$ = $(async (): Promise<OccupiedInterface[]> => {
    return getMasterOccupiedInterfaces(starContext.state.Choose.RouterModels);
  });

  /**
   * Update interface occupation when switching from one interface to another.
   * This is useful when changing interface selection in forms.
   */
  const updateInterfaceOccupation$ = $(async (
    oldInterface: InterfaceType | null,
    newInterface: InterfaceType | null,
    usedBy: "Trunk" | "WAN" | "VPN" | "LAN" | "Other"
  ) => {
    // Release the old interface if it exists
    if (oldInterface && oldInterface !== newInterface) {
      await releaseInterface$(oldInterface);
    }

    // Mark the new interface as occupied if it exists
    if (newInterface) {
      await markInterfaceAsOccupied$(newInterface, usedBy);
    }
  });

  return {
    markInterfaceAsOccupied$,
    releaseInterface$,
    isInterfaceAvailable$,
    getInterfaceUsageInfo$,
    getAllOccupiedInterfacesList$,
    updateInterfaceOccupation$,
  };
}