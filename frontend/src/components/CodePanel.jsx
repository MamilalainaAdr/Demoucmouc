export default function CodePanel({ code }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copié dans le presse-papiers !');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Code Mermaid généré</h2>
      </div>
      <div className="flex-1 p-4">
        <textarea
          readOnly
          value={code}
          className="w-full h-[calc(100%-60px)] font-mono text-sm p-2 border rounded bg-gray-50 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Copier le code
        </button>
      </div>
    </div>
  );
}