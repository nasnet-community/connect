import type { Game } from "./type";

export const games: Game[] = [
  {
    name: "Counter-Strike 2",
    tcp: ["27015-27030", "27036-27037"],
    udp: ["4380", "27000-27031", "27036"],
  },
  {
    name: "Dota 2",
    tcp: ["9100-9200", "8230-8250", "8110-8120"],
    udp: ["28010-28200", "27010-27200", "39000"],
  },
  { name: "PUBG", tcp: [], udp: ["7080-8000"] },
];
