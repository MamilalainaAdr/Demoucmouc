import { Plus, Trash2, RotateCcw } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Toolbar({ onAddNode, onDeleteSelected, onClear, variableType, onVariableTypeChange }) {
  return (
    <div className="flex gap-2 p-2 bg-white border-b border-gray-200 items-center">
      {/* Section gauche : logo + titre */}
      <div className="flex items-center gap-1">
        <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
        <span className="font-bold text-gray-800">Demoucmouc</span>
      </div>

      {/* Séparateur visuel */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Boutons d'actions */}
      <button
        onClick={onAddNode}
        title="Ajouter un cercle"
        className="p-1.5 text-gray-600 rounded hover:bg-gray-200/50 transition-colors"
      >
        <Plus size={18} />
      </button>
      <button
        onClick={onDeleteSelected}
        title="Supprimer l'élément sélectionné"
        className="p-1.5 text-red-600 rounded hover:bg-red-200/50  transition-colors"
      >
        <Trash2 size={18} />
      </button>
      <button
        onClick={onClear}
        title="Tout effacer"
        className="p-1.5 text-green-600 rounded hover:bg-green-200/50 transition-colors"
      >
        <RotateCcw size={18} />
      </button>

      {/* Sélecteur de type (poussé à droite) */}
      <div className="ml-auto flex items-center gap-2 text-sm">
        <span className="text-gray-500">Type :</span>
        <select
          value={variableType}
          onChange={(e) => onVariableTypeChange(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        >
          <option value="x">x (x1, x2…)</option>
          <option value="y">y (y1, y2…)</option>
          <option value="alpha">a → z</option>
        </select>
      </div>
    </div>
  );
}