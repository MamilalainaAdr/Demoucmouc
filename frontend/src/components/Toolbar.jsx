export default function Toolbar({ onAddNode, onDeleteSelected, onClear, variableType, onVariableTypeChange }) {
  return (
    <div className="flex gap-2 p-2 bg-white border-b border-gray-200 items-center">
      <button
        onClick={onAddNode}
        title="Ajouter un cercle"
        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-lg"
      >
        ➕
      </button>
      <button
        onClick={onDeleteSelected}
        title="Supprimer l'élément sélectionné"
        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-lg"
      >
        🗑️
      </button>
      <button
        onClick={onClear}
        title="Tout effacer"
        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-lg"
      >
        ⟳
      </button>
      <div className="ml-auto flex items-center gap-2 text-sm">
        <span className="text-gray-600">Type :</span>
        <select
          value={variableType}
          onChange={(e) => onVariableTypeChange(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="x">x (x1, x2…)</option>
          <option value="y">y (y1, y2…)</option>
          <option value="alpha">a → z</option>
        </select>
      </div>
    </div>
  );
}