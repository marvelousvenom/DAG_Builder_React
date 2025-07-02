
import { Node, Edge } from "reactflow";

export default function validateDAG(nodes: Node[], edges: Edge[]) {
  const graph: Record<string, string[]> = {};

  
  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  
  edges.forEach((edge) => {
    if (graph[edge.source]) {
      graph[edge.source].push(edge.target);
    }
  });

  const visited: Record<string, boolean> = {};
  const recStack: Record<string, boolean> = {};

  function hasCycle(v: string): boolean {
    if (!visited[v]) {
      visited[v] = true;
      recStack[v] = true;

      for (const neighbor of graph[v]) {
        if (!visited[neighbor] && hasCycle(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }

    recStack[v] = false;
    return false;
  }

  // Check all nodes
  for (const node of nodes) {
    if (hasCycle(node.id)) {
      return { valid: false, message: "Cycle detected!" };
    }
  }

  return { valid: true, message: "DAG is valid" };
}
