import { Handle, Position } from 'reactflow';

export default function CustomNode({ data }) {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: '#e2e8f0',
        border: '2px solid #3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        wordBreak: 'break-word',
        padding: '8px',
        position: 'relative',
      }}
    >
      {/* 4 Handles à gauche (entrée) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-1"
        style={{ top: '20%', background: '#3b82f6' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-2"
        style={{ top: '40%', background: '#3b82f6' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-3"
        style={{ top: '60%', background: '#3b82f6' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-4"
        style={{ top: '80%', background: '#3b82f6' }}
      />

      {/* 4 Handles à droite (sortie) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-1"
        style={{ top: '20%', background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-2"
        style={{ top: '40%', background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-3"
        style={{ top: '60%', background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-4"
        style={{ top: '80%', background: '#3b82f6' }}
      />

      {data.label}
    </div>
  );
}