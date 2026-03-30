import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import Toolbar from './components/Toolbar';
import CodePanel from './components/CodePanel';
import { generateMermaidCode } from './utils/mermaidGenerator';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
  customNode: CustomNode,
};

const defaultEdgeOptions = {
  type: 'straight',
  style: { stroke: '#3b82f6', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#3b82f6',
    width: 12,
    height: 12,
  },
  labelStyle: { fill: '#333', fontWeight: 500, fontSize: 12 },
  labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
  labelBgPadding: [4, 4],
  labelBgBorderRadius: 4,
};

const getInitialNodes = () => [
  {
    id: uuidv4(),
    type: 'customNode',
    position: { x: 100, y: 200 },
    data: { label: 'x1' },
  },
  {
    id: uuidv4(),
    type: 'customNode',
    position: { x: 500, y: 200 },
    data: { label: 'x2' },
  },
];

const getInitialEdges = (nodes) => {
  if (nodes.length < 2) return [];
  return [
    {
      id: uuidv4(),
      source: nodes[0].id,
      target: nodes[1].id,
      label: '10',
      data: { label: '10' },
    },
  ];
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(getInitialEdges(nodes));
  const [mermaidCode, setMermaidCode] = useState('');

  useEffect(() => {
    const code = generateMermaidCode(nodes, edges);
    setMermaidCode(code);
  }, [nodes, edges]);

  const handleAddNode = () => {
    const existingLabels = nodes.map(n => n.data.label);
    let newNumber = 1;
    while (existingLabels.includes(`x${newNumber}`)) {
      newNumber++;
    }
    const newLabel = `x${newNumber}`;

    const newNode = {
      id: uuidv4(),
      type: 'customNode',
      position: { x: 300 + Math.random() * 200, y: 100 + Math.random() * 300 },
      data: { label: newLabel },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params) => {
      const edgeValue = prompt('Valeur de la flèche (distance) :', '10');
      if (edgeValue === null) return;

      const newEdge = {
        ...params,
        id: uuidv4(),
        label: edgeValue,
        data: { label: edgeValue },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onEdgeDoubleClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      const newValue = prompt('Modifier la valeur de la flèche :', edge.data?.label || '');
      if (newValue !== null) {
        setEdges((eds) =>
          eds.map((e) =>
            e.id === edge.id
              ? {
                  ...e,
                  label: newValue,
                  data: { ...e.data, label: newValue },
                }
              : e
          )
        );
      }
    },
    [setEdges]
  );

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Delete') {
        const selectedNodes = nodes.filter((node) => node.selected);
        if (selectedNodes.length) {
          const idsToDelete = selectedNodes.map((n) => n.id);
          setNodes((nds) => nds.filter((n) => !idsToDelete.includes(n.id)));
          setEdges((eds) =>
            eds.filter((e) => !idsToDelete.includes(e.source) && !idsToDelete.includes(e.target))
          );
        } else {
          const selectedEdges = edges.filter((edge) => edge.selected);
          if (selectedEdges.length) {
            const idsToDelete = selectedEdges.map((e) => e.id);
            setEdges((eds) => eds.filter((e) => !idsToDelete.includes(e.id)));
          }
        }
      }
    },
    [nodes, edges, setNodes, setEdges]
  );

  const handleClear = () => {
    if (confirm('Supprimer tous les nœuds et arêtes ?')) {
      setNodes([]);
      setEdges([]);
    }
  };

  const handleGenerate = () => {
    alert('Code généré et affiché à droite');
  };

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        onAddNode={handleAddNode}
        onGenerate={handleGenerate}
        onClear={handleClear}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onKeyDown={onKeyDown}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            deleteKeyCode="Delete"
            selectionKeyCode="Shift"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className="w-96 border-l border-gray-200 bg-white">
          <CodePanel code={mermaidCode} />
        </div>
      </div>
    </div>
  );
}

export default App;