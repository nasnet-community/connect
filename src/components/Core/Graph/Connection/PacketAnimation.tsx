import { component$ } from "@builder.io/qwik";
import type { GraphConnection } from "../types";

/**
 * Component that renders animated packets moving along connections
 */
export const PacketAnimation = component$<{
  connection: GraphConnection;
  pathD: string;
}>((props) => {
  const { connection, pathD } = props;

  // Don't render if animation is disabled
  if (!connection.animated) {
    return null;
  }

  const id = connection.id || `${connection.from}-${connection.to}`;
  const color = connection.color || "#94a3b8"; // Default: slate-400
  const packetCount = connection.packetColors?.length || 1;
  const packetColors = connection.packetColors || [color];
  const packetSizes = connection.packetSize || Array(packetCount).fill(4);
  const packetDelays = connection.packetDelay || Array(packetCount).fill(0);

  return (
    <>
      {Array.from({ length: packetCount }).map((_, i) => {
        const packetColor = packetColors[i % packetColors.length];
        const packetSize = packetSizes[i % packetSizes.length];
        const packetDelay = packetDelays[i % packetDelays.length];

        return (
          <circle
            key={`packet-${id}-${i}`}
            r={packetSize}
            fill={packetColor}
            opacity="0.8"
          >
            <animateMotion
              path={pathD}
              dur="1.5s"
              begin={`${packetDelay}s`}
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
        );
      })}
    </>
  );
});

export default PacketAnimation;
