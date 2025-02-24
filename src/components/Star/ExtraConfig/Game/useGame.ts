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
      if (!["foreign", "domestic", "vpn", "none"].includes(value)) {
        console.error("Invalid link type");
        return;
      }
  
      const serializedPorts = {
        tcp: game.tcp?.map(String),
        udp: game.udp?.map(String),
      };
  
      if (value === "none") {
        const updatedGames = context.state.ExtraConfig.Games.filter(
          (g) => g.name !== game.name
        );
        return context.updateExtraConfig$({ Games: updatedGames });
      }
  
      const newGame: GameConfig = {
        name: game.name,
        link: value as "foreign" | "domestic" | "vpn",
        ports: serializedPorts,
      };
  
      const existingIndex = context.state.ExtraConfig.Games.findIndex(
        (g) => g.name === game.name
      );
  
      if (existingIndex !== -1) {
        const updatedGames = [...context.state.ExtraConfig.Games];
        updatedGames[existingIndex] = newGame;
        return context.updateExtraConfig$({ Games: updatedGames });
      }
  
      return context.updateExtraConfig$({
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
