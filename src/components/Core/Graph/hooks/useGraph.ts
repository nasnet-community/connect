import { $, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { GraphConfig, GraphNode, GraphConnection } from "../types";

export interface UseGraphResult {
  isExpanded: { value: boolean };
  toggleExpand: () => void;
  containerRef: { value: HTMLDivElement | undefined };
  svgRef: { value: SVGSVGElement | undefined };
}

export const useGraph = (
  nodes: GraphNode[],
  connections: GraphConnection[],
  config?: GraphConfig,
): UseGraphResult => {
  // Validate inputs to avoid unused parameter warnings
  if (nodes.length === 0) {
    console.warn("Graph has no nodes");
  }

  if (connections.length === 0 && nodes.length > 1) {
    console.warn("Graph has multiple nodes but no connections");
  }

  const expandOnHover = config?.expandOnHover ?? true;

  const isExpanded = useSignal(false);
  const containerRef = useSignal<HTMLDivElement>();
  const svgRef = useSignal<SVGSVGElement>();

  const state = useStore({
    initialDimensions: { width: 0, height: 0 },
    position: { x: 0, y: 0 },
  });

  // Toggle expanded state
  const toggleExpand = $(() => {
    if (!expandOnHover) return;

    isExpanded.value = !isExpanded.value;

    if (isExpanded.value && containerRef.value) {
      // Save the initial position for when we collapse
      const rect = containerRef.value.getBoundingClientRect();
      state.position.x = rect.left;
      state.position.y = rect.top;
      state.initialDimensions.width = rect.width;
      state.initialDimensions.height = rect.height;

      // Apply expanded positioning
      document.body.style.overflow = "hidden";
    } else {
      // Restore normal flow
      document.body.style.overflow = "";
    }
  });

  // Ensure we clean up when the component unmounts
  useVisibleTask$(({ cleanup }) => {
    // Handle ESC key to close expanded graph
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded.value) {
        toggleExpand();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    cleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    });
  });

  return {
    isExpanded,
    toggleExpand,
    containerRef,
    svgRef,
  };
};

/**
 * Helper functions for graph rendering
 * Note: JSX in Qwik hooks is not meant to be used directly, but rather passed to components.
 * This hook only returns functions that generate JSX to be used later in components.
 */
export interface GraphHelpers {
  nodeRefs: { value: Map<string | number, SVGGElement> };
  renderNodeIcon: Function;
  calculatePath: Function;
  createPacketAnimation: Function;
}

/**
 * Hook that provides helper methods for working with graph nodes and connections
 * NOTE: This hook is currently unused as we've implemented the NodeRenderer component instead
 */
export const useGraphHelpers = (): GraphHelpers => {
  const nodeRefs = useSignal<Map<string | number, SVGGElement>>(new Map());

  // Just a placeholder to avoid linting errors - actual rendering is done in NodeRenderer
  const renderNodeIcon = $(() => {
    // Just to satisfy lint
    return null;
  });

  /**
   * Calculates the best path between two nodes
   */
  const calculatePath = $(
    (from: GraphNode, to: GraphNode, offset: number = 0) => {
      const x1 = from.x;
      const y1 = from.y;
      const x2 = to.x;
      const y2 = to.y;

      // Direct line with optional curve
      if (offset === 0) {
        return `M${x1},${y1} L${x2},${y2}`;
      }

      // Curved path
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate control points for the curve
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      // Perpendicular offset
      const nx = -dy / distance;
      const ny = dx / distance;

      const cpX = midX + nx * offset;
      const cpY = midY + ny * offset;

      return `M${x1},${y1} Q${cpX},${cpY} ${x2},${y2}`;
    },
  );

  /**
   * Generate connection animation frames
   */
  const createPacketAnimation = $(() => {
    // Just to satisfy lint
    return [];
  });

  return {
    nodeRefs,
    renderNodeIcon,
    calculatePath,
    createPacketAnimation,
  };
};
