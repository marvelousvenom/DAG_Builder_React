import React from "react";

export default function ValidationStatus({ status }: any) {
  return (
    <div style={{ color: status.valid ? "green" : "red", marginLeft: "auto", fontWeight: "bold" }}>
      {status.message} 
    </div>
  );
}
