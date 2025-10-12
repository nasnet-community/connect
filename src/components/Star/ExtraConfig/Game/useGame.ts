import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { GameConfig } from "~/components/Star/StarContext/ExtraType";

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
      const serializedPorts = {
        tcp: game.tcp?.map(String),
        udp: game.udp?.map(String),
      };

      // Initialize the Games array if it doesn't exist
      if (!context.state.ExtraConfig.Games) {
        context.updateExtraConfig$({ Games: [] });
      }

      // If "none" is selected, remove the game from the list
      if (value === "none") {
        const updatedGames = (context.state.ExtraConfig.Games || []).filter(
          (g) => g.name !== game.name,
        );
        return context.updateExtraConfig$({ Games: updatedGames });
      }

      const newGame: GameConfig = {
        name: game.name,
        network: value,
        ports: serializedPorts,
      };

      const existingIndex = (context.state.ExtraConfig.Games || []).findIndex(
        (g) => g.name === game.name,
      );

      if (existingIndex !== -1) {
        const updatedGames = [...(context.state.ExtraConfig.Games || [])];
        updatedGames[existingIndex] = newGame;
        return context.updateExtraConfig$({ Games: updatedGames });
      }

      return context.updateExtraConfig$({
        Games: [...(context.state.ExtraConfig.Games || []), newGame],
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
