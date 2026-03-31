export default function Toolbar({ onAddNode, onDeleteSelected, onClear, variableType, onVariableTypeChange }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-100 border-b border-gray-200 items-center">
      <button
        onClick={onAddNode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Ajouter un cercle
      </button>
      <button
        onClick={onDeleteSelected}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Supprimer
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
      >
        Effacer tout
      </button>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm font-medium">Type de variable :</span>
        <select
          value={variableType}
          onChange={(e) => onVariableTypeChange(e.target.value)}
          className="px-2 py-1 border rounded bg-white"
        >
          <option value="x">x (x1, x2, ...)</option>
          <option value="y">y (y1, y2, ...)</option>
          <option value="alpha">Alphabet (a, b, c, ...)</option>
        </select>
      </div>
    </div>
  );
}