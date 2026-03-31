import { Copy } from 'lucide-react';

export default function VectorPanel({ nodes, edges }) {
  const generateVectorDescription = () => {
    if (!nodes.length) return '';
    
    const n = nodes.length;
    
    // Créer une map des labels vers indices
    const labelToIndex = new Map();
    nodes.forEach((node, idx) => {
      const label = node.data.label;
      let index;
      if (/^[a-z]$/.test(label)) {
        // Alpha: a=1, b=2, etc.
        index = label.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      } else {
        // Numérique: x1=1, x2=2, etc.
        const match = label.match(/(\d+)/);
        index = match ? parseInt(match[1], 10) : idx + 1;
      }
      labelToIndex.set(label, index);
    });

    // Générer les vecteurs D1
    const vectors = edges.map(edge => {
      const sourceLabel = nodes.find(n => n.id === edge.source)?.data.label;
      const targetLabel = nodes.find(n => n.id === edge.target)?.data.label;
      const value = edge.data?.label || '0';
      
      const sourceIdx = labelToIndex.get(sourceLabel) || '?';
      const targetIdx = labelToIndex.get(targetLabel) || '?';
      
      return `[${sourceIdx}, ${targetIdx}, ${value}]`;
    });

    let result = `n = ${n}\n`;
    result += `D1 = [`;
    if (vectors.length) {
      result += '\n';
      vectors.forEach((v, i) => {
        result += `    ${v}${i < vectors.length - 1 ? ',' : ''}\n`;
      });
      result += `]`;
    } else {
      result += `]`;
    }
    
    return result;
  };

  const vectorText = generateVectorDescription();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vectorText);
    alert('Description copiée dans le presse-papiers !');
  };

  return (
    <div className="h-1/2 flex flex-col border-t border-gray-200">
      <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Description</h2>
        <button
          onClick={copyToClipboard}
          title="Copier la description"
          className="p-1.5 text-gray-600 rounded hover:bg-gray-200/50 transition-colors"
        >
          <Copy size={18} />
        </button>
      </div>
      <div className="flex-1 p-4">
        <textarea
          readOnly
          value={vectorText}
          className="w-full h-full font-mono text-sm p-3 border rounded bg-gray-50 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}