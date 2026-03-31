import { Handle, Position } from 'reactflow';

export default function CustomNode({ data, selected }) {
  const numPoints = 8;
  const radius = 45; // exactement sur le bord du cercle (diamètre 90)

  const handles = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 360) / numPoints;
    const radian = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(radian);
    const y = 50 + radius * Math.sin(radian);

    let position;
    if (angle >= 315 || angle < 45) position = Position.Right;
    else if (angle >= 45 && angle < 135) position = Position.Bottom;
    else if (angle >= 135 && angle < 225) position = Position.Left;
    else position = Position.Top;

    handles.push(
      <Handle
        key={`source-${i}`}
        type="source"
        position={position}
        id={`source-${i}`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: 12,
          height: 12,
          background: '#3b82f6',
          border: '2px solid white',
          transform: 'translate(-50%, -50%)',
          zIndex: 200,
        }}
        isConnectable={true}
      />
    );
    handles.push(
      <Handle
        key={`target-${i}`}
        type="target"
        position={position}
        id={`target-${i}`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: 12,
          height: 12,
          background: '#3b82f6',
          border: '2px solid white',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
        }}
        isConnectable={true}
      />
    );
  }

  return (
    <div
      style={{
        width: 90,
        height: 90,
        borderRadius: '50%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: selected ? '3px solid #1d4ed8' : '2px solid #3b82f6',
        backgroundColor: selected ? '#93c5fd' : '#e2e8f0',
        userSelect: 'none',
      }}
    >
      {handles}
      {data.label}
    </div>
  );
}