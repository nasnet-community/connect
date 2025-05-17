# Graph Component

A flexible, responsive, and interactive graph visualization component for Qwik applications. Perfect for displaying network topologies, relationships, or any node-based visualization.

## Features

- Rich network node types (User, Router, WAN, VPN Server, etc.)
- Animated connections with customizable packet animations
- Predefined traffic types (Domestic, Foreign, Game, VPN)
- Physical connection types (Ethernet, Wireless, LTE, Satellite, DSL, Fiber)
- Expand on hover for detailed viewing
- Dark and light mode support
- Responsive design
- Interactive nodes and connections
- Custom node icons and types
- Support for curved connections
- Legend with customizable items

## Basic Usage

```tsx
import { component$ } from "@builder.io/qwik";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphConnection } from "~/components/Core/Graph";

export default component$(() => {
  // Create nodes
  const nodes = [
    createNode("User", "user1", 50, 100),
    createNode("WirelessRouter", "router", 180, 100),
    createNode("DomesticWAN", "domestic", 310, 100)
  ];

  // Create connections
  const connections: GraphConnection[] = [
    { 
      from: "user1", 
      to: "router",
      color: "#f59e0b",
      animated: true,
      packetColors: ["#f59e0b"]
    },
    { 
      from: "router", 
      to: "domestic",
      color: "#84cc16",
      animated: true,
      packetColors: ["#84cc16"]
    }
  ];

  return (
    <Graph 
      nodes={nodes}
      connections={connections}
      title="Simple Network Graph"
    />
  );
});
```

## Using Traffic Types

The Graph component supports predefined traffic types for easier styling of connections:

```tsx
import { component$ } from "@builder.io/qwik";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphConnection } from "~/components/Core/Graph";

export default component$(() => {
  // Create nodes
  const nodes = [
    createNode("User", "user", 50, 100),
    createNode("WirelessRouter", "router", 180, 100),
    createNode("VPNServer", "vpn", 310, 100)
  ];

  // Create connections with traffic types
  const connections: GraphConnection[] = [
    { 
      from: "user", 
      to: "router",
      trafficType: "Domestic",
      animated: true
    },
    { 
      from: "router", 
      to: "vpn",
      trafficType: "VPN",
      animated: true
    }
  ];

  return (
    <Graph 
      nodes={nodes}
      connections={connections}
      title="Traffic Types Example"
    />
  );
});
```

## Using Connection Types

The Graph component also supports physical connection types that define the visual style and appearance:

```tsx
import { component$ } from "@builder.io/qwik";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphConnection } from "~/components/Core/Graph";

export default component$(() => {
  // Create nodes
  const nodes = [
    createNode("User", "user", 50, 100),
    createNode("WirelessRouter", "router", 180, 100),
    createNode("EthernetRouter", "isp", 310, 100),
    createNode("ForeignWAN", "internet", 440, 100)
  ];

  // Create connections with connection types
  const connections: GraphConnection[] = [
    { 
      from: "user", 
      to: "router",
      connectionType: "Wireless",
      animated: true
    },
    { 
      from: "router", 
      to: "isp",
      connectionType: "Ethernet",
      animated: true
    },
    { 
      from: "isp", 
      to: "internet",
      connectionType: "Fiber",
      animated: true
    }
  ];

  return (
    <Graph 
      nodes={nodes}
      connections={connections}
      title="Connection Types Example"
    />
  );
});
```

## Available Network Node Types

The Graph component includes the following predefined network node types:

- `WirelessUser` - A wireless/mobile device user
- `EthernetUser` - A wired/ethernet device user
- `User` - A generic user
- `ForeignWAN` - Foreign/international WAN connection
- `DomesticWAN` - Domestic/local WAN connection
- `VPNClient` - VPN client
- `VPNServer` - VPN server
- `EthernetRouter` - Wired router
- `WirelessRouter` - Wireless router
- `AP` - Access point
- `GamingConsole` - Gaming device/console
- `LTEUser` - Mobile/LTE user
- `DomesticService` - Local network service
- `ForeignService` - External network service
- `DomesticWebsite` - Local website
- `ForeignWebsite` - External website
- `GameServer` - Game server

## Supported Traffic Types

The component supports the following traffic types which automatically apply the appropriate styling:

- `Domestic` - Traffic to/from domestic (local) networks or services (#84cc16)
- `Foreign` - Traffic to/from foreign (international) networks or services (#9333ea)
- `Game` - Gaming-related traffic (#ef4444)
- `VPN` - VPN tunnel traffic (#6366f1)

## Supported Connection Types

The component supports these physical connection types with distinct visual styles:

- `Ethernet` - Wired ethernet connections - solid blue lines (#3b82f6)
- `Wireless` - WiFi or other wireless connections - dashed purple lines (#8b5cf6)
- `LTE` - Cellular/mobile connections - dashed pink lines (#ec4899)
- `Satellite` - Satellite connections - thin dashed cyan lines (#06b6d4)
- `DSL` - Digital Subscriber Line connections - medium orange lines (#f97316)
- `Fiber` - Fiber optic connections - thick green lines (#22c55e)

## API Reference

### Graph Component Props

| Prop | Type | Description |
|------|------|-------------|
| `nodes` | `GraphNode[]` | Array of nodes to display in the graph |
| `connections` | `GraphConnection[]` | Array of connections between nodes |
| `title` | `string` | Title displayed in the expanded view |
| `config` | `GraphConfig` | Optional configuration for the graph |
| `onNodeClick$` | `QRL<(node: GraphNode) => void>` | Event handler for node clicks |
| `onConnectionClick$` | `QRL<(connection: GraphConnection) => void>` | Event handler for connection clicks |

### GraphNode Interface

```ts
interface GraphNode {
  id: string | number;  // Unique identifier
  type: string;         // Node type (e.g., 'User', 'Router')
  x: number;            // X-coordinate position
  y: number;            // Y-coordinate position
  label: string;        // Display label
  color?: string;       // Optional color override
  size?: number;        // Optional size override
}
```

### GraphConnection Interface

```ts
interface GraphConnection {
  id?: string | number;         // Optional unique identifier
  from: number | string;        // Source node ID
  to: number | string;          // Target node ID
  color?: string;               // Line color (optional if trafficType or connectionType is used)
  trafficType?: GraphTrafficType; // "Domestic", "Foreign", "Game", or "VPN"
  connectionType?: ConnectionType; // "Ethernet", "Wireless", "LTE", "Satellite", "DSL", or "Fiber"
  animated?: boolean;           // Whether to animate the connection
  dashed?: boolean;             // Whether to use dashed line style
  width?: number;               // Line width
  arrowHead?: boolean;          // Whether to show arrow head
  packetColors?: string[];      // Colors for animated packets
  packetSize?: number[];        // Sizes for animated packets
  packetDelay?: number[];       // Delay times for animated packets
  label?: string;               // Optional label for the connection
  type?: string;                // Optional connection type
}
```

### GraphConfig Interface

```ts
interface GraphConfig {
  width?: number | string;          // Graph width
  height?: number | string;         // Graph height
  backgroundColor?: string;         // Background color (light mode)
  darkBackgroundColor?: string;     // Background color (dark mode)
  expandOnHover?: boolean;          // Whether to expand on hover
  maxExpandedWidth?: string;        // Maximum width when expanded
  maxExpandedHeight?: string;       // Maximum height when expanded
  animationDuration?: number;       // Animation duration in ms
  zoomable?: boolean;               // Whether zooming is enabled
  draggable?: boolean;              // Whether nodes are draggable
  showLegend?: boolean;             // Whether to show the legend
  legendItems?: LegendItem[];       // Custom legend items
  viewBox?: string;                 // SVG viewBox
  preserveAspectRatio?: string;     // SVG preserveAspectRatio
}
```

## Helper Functions

### createNode

Creates a graph node with predefined settings based on the node type.

```ts
createNode(
  nodeType: NetworkNodeType,
  id: string | number,
  x: number,
  y: number,
  overrides?: Partial<GraphNode>
): GraphNode
```

## Examples

- See `Example.tsx` for a complete example showing a dual WAN network topology.
- See `TrafficExample.tsx` for a demonstration of all traffic types.
- See `ConnectionTypeExample.tsx` for a demonstration of all connection types.

## Styling

The Graph component is designed to work well with both light and dark modes. It uses TailwindCSS for styling and includes appropriate dark mode variants. 