export default function Toolbar({ onAddNode, onGenerate, onClear }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-100 border-b border-gray-200">
      <button
        onClick={onAddNode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Ajouter un cercle
      </button>
      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Générer le code
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Effacer tout
      </button>
    </div>
  );
}