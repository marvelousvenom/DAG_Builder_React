import dagre from "dagre";
import { Node, Edge } from "reactflow";

export default function applyAutoLayout(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 150, height: 50 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const newNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - 75,
        y: pos.y - 25,
      },
    };
  });

  return { nodes: newNodes, edges };
}
