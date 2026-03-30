/**
 * Extrait le nombre d'un label de type "x1", "x2", etc.
 * Si le label n'est pas de cette forme, retourne NaN.
 */
function extractNumber(label) {
  const match = label.match(/x(\d+)/i);
  return match ? parseInt(match[1], 10) : NaN;
}

/**
 * Génère le code Mermaid à partir des nœuds et arêtes.
 * Utilise les labels comme identifiants.
 * Inverse le sens de la flèche (utilise <--) si le nœud source a un indice plus petit que le nœud cible.
 */
export function generateMermaidCode(nodes, edges) {
  if (!nodes.length) return '';

  let code = 'graph LR\n';

  // Définition des nœuds
  nodes.forEach(node => {
    const id = node.data.label;
    const label = node.data.label;
    code += `    ${id}((${label}))\n`;
  });

  // Définition des arêtes
  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    if (sourceNode && targetNode) {
      const sourceLabel = sourceNode.data.label;
      const targetLabel = targetNode.data.label;
      const sourceNum = extractNumber(sourceLabel);
      const targetNum = extractNumber(targetLabel);
      const edgeLabel = edge.data?.label || '';

      let first, second, arrow;
      if (!isNaN(sourceNum) && !isNaN(targetNum) && sourceNum < targetNum) {
        // Flèche inversée : on place la cible en premier, puis <--, puis la source
        first = targetLabel;
        second = sourceLabel;
        arrow = '<--';
      } else {
        first = sourceLabel;
        second = targetLabel;
        arrow = '-->';
      }

      if (edgeLabel) {
        code += `    ${first} ${arrow}|${edgeLabel}| ${second}\n`;
      } else {
        code += `    ${first} ${arrow} ${second}\n`;
      }
    }
  });

  return code;
}