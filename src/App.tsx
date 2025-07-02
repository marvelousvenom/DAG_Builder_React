import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/CustomNode";
import validateDAG from "./utils/validateDAG";
import applyAutoLayout from "./utils/layout";
import ValidationStatus from "./components/ValidationStatus";

const nodeTypes = { custom: CustomNode };

function App() {
  const initialNodes: Node[] = [
    {
      id: "1",
      data: { label: "Node 1" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "2",
      data: { label: "Node 2" },
      position: { x: 200, y: 0 },
      type: "custom",
    },
  ];

  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dagStatus, setDagStatus] = useState({ valid: true, message: "DAG is valid" });

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      type: "custom",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const validate = () => {
    const result = validateDAG(nodes, edges);
    setDagStatus(result);
  };

  const layout = () => {
    const { nodes: newNodes, edges: newEdges } = applyAutoLayout(nodes, edges);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#111" }}>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <button onClick={addNode}>Add Node</button>
        <button onClick={validate}>Validate DAG</button>
        <button onClick={layout}>Auto Layout</button>
        <ValidationStatus status={dagStatus} />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
