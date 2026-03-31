import { Copy } from 'lucide-react';

export default function CodePanel({ code }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copié dans le presse-papiers !');
  };

  return (
    <div className="h-1/2 flex flex-col">
      <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Code Mermaid</h2>
        <button
          onClick={copyToClipboard}
          title="Copier le code"
          className="p-1.5 text-gray-600 rounded hover:bg-gray-200/50 transition-colors"
        >
          <Copy size={18} />
        </button>
      </div>
      <div className="flex-1 p-4">
        <textarea
          readOnly
          value={code}
          className="w-full h-full font-mono text-sm p-3 border rounded bg-gray-50 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}