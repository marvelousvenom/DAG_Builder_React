interface ControlsProps {
  onAdd: () => void;
  onValidate: () => void;
  onLayout: () => void;
}

export default function Controls({ onAdd, onValidate, onLayout }: ControlsProps) {
  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
      <button onClick={onAdd}>Add Node</button>
      <button onClick={onValidate}>Validate DAG</button>
      <button onClick={onLayout}>Auto Layout</button>
    </div>
  );
}
