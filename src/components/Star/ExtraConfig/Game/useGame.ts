import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { GameConfig } from "~/components/Star/StarContext";

export const useGameLogic = () => {
  const searchQuery = useSignal("");
  const currentPage = useSignal(1);
  const itemsPerPage = 5;
  const context = useContext(StarContext);

  const handleGameSelection = $(
    (
      game: {
        name: string;
        tcp?: (string | number)[];
        udp?: (string | number)[];
      },
      value: string,
    ) => {
      // Validate link type
      if (!["foreign", "domestic", "vpn", "none"].includes(value)) {
        console.error("Invalid link type");
        return;
      }

      if (value === "none") return;

      // Check for duplicate
      const exists = context.state.ExtraConfig.Games.some(
        (g) => g.name === game.name,
      );
      if (exists) {
        console.warn("Game already exists in configuration");
        return;
      }

      // Convert ports to strings
      const serializedPorts = {
        tcp: game.tcp?.map(String),
        udp: game.udp?.map(String),
      };

      // Create new game config
      const newGame: GameConfig = {
        name: game.name,
        link: value as "foreign" | "domestic" | "vpn" | "none",
        ports: serializedPorts,
      };

      // Update context
      context.updateExtraConfig$({
        Games: [...context.state.ExtraConfig.Games, newGame],
      });
    },
  );

  return {
    searchQuery,
    currentPage,
    itemsPerPage,
    context,
    handleGameSelection,
  };
};
