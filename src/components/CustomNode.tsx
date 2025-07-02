import React from "react";
import { Handle, Position } from "reactflow";

export default function CustomNode({ data }: any) {
  return (
    <div style={{ padding: 10, border: "2px solid #0041d0", borderRadius: 5, background: "#fff" }}>
      <Handle type="target" position={Position.Left} style={{ background: "red" }} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ background: "green" }} />
    </div>
  );
}
